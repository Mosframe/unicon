// -----------------------------------------------------------------------------
// editor.ts
// -----------------------------------------------------------------------------
import * as signals   from 'signals';
import {Signal      } from 'signals';
import * as THREE     from 'three';
import {Command     } from './command';
import {Config      } from './config';
import {History     } from './history';
import {Loader      } from './loader';
import {Storage     } from './storage';


export interface IEditor {
	scene       : any;
    camera      : any;
    history     : any;
    scripts     : any;
    metadata    : any;
    project     : any;
}

/**
 * Editor
 *
 * @author mrdoob ( http://mrdoob.com )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Editor
 */
export class Editor {

    /**
     * config
     *
     * @type {Config}
     * @memberof Editor
     */
    config : Config;
    /**
     * signals
     *
     * @memberof Editor
     */
    signals = {

        // script

        editScript: new Signal(),

        // player

        startPlayer: new Signal(),
        stopPlayer: new Signal(),

        // vr

        enterVR: new Signal(),

        enteredVR: new Signal(),
        exitedVR: new Signal(),

        // actions

        showModal: new Signal(),

        // notifications

        editorCleared: new Signal(),

        savingStarted: new Signal(),
        savingFinished: new Signal(),

        themeChanged: new Signal(),

        transformModeChanged: new Signal(),
        snapChanged: new Signal(),
        spaceChanged: new Signal(),
        rendererChanged: new Signal(),

        sceneBackgroundChanged: new Signal(),
        sceneFogChanged: new Signal(),
        sceneGraphChanged: new Signal(),

        cameraChanged: new Signal(),

        geometryChanged: new Signal(),

        objectSelected: new Signal(),
        objectFocused: new Signal(),

        objectAdded: new Signal(),
        objectChanged: new Signal(),
        objectRemoved: new Signal(),

        helperAdded: new Signal(),
        helperRemoved: new Signal(),

        materialChanged: new Signal(),

        scriptAdded: new Signal(),
        scriptChanged: new Signal(),
        scriptRemoved: new Signal(),

        windowResize: new Signal(),

        showGridChanged: new Signal(),
        refreshSidebarObject3D: new Signal(),
        historyChanged: new Signal()
    };
    /**
     * default camera
     *
     * @type {THREE.PerspectiveCamera}
     * @memberof Editor
     */
    DEFAULT_CAMERA : THREE.PerspectiveCamera;
    /**
     * History
     *
     * @type {History}
     * @memberof Editor
     */
	history : History;
    /**
     * Storage
     *
     * @type {Storage}
     * @memberof Editor
     */
	storage : Storage;
    /**
     * Loader
     *
     * @type {Loader}
     * @memberof Editor
     */
	loader : Loader;
    /**
     * Camera
     *
     * @type {THREE.Camera}
     * @memberof Editor
     */
	camera : THREE.Camera;
    /**
     * Scene
     *
     * @type {THREE.Scene}
     * @memberof Editor
     */
	scene : THREE.Scene;
    /**
     * Scene Helpers
     *
     * @type {THREE.Scene}
     * @memberof Editor
     */
	sceneHelpers : THREE.Scene;
    /**
     * objects
     *
     * @type {{[uuid:string]:THREE.Object3D}}
     * @memberof Editor
     */
	object : {[uuid:string]:THREE.Object3D};
    /**
     * geometries
     *
     * @type {{[uuid:string]:THREE.Geometry|THREE.BufferGeometry}}
     * @memberof Editor
     */
	geometries : {[uuid:string]:THREE.Geometry|THREE.BufferGeometry};
    /**
     * materials
     *
     * @type {{[uuid:string]:THREE.Material}}
     * @memberof Editor
     */
	materials : {[uuid:string]:THREE.Material};
    /**
     * textures
     *
     * @type {{[uuid:string]:THREE.Texture}}
     * @memberof Editor
     */
	textures : {[uuid:string]:THREE.Texture};
    /**
     * scripts
     *
     * @type {{[uuid:string]:string[]}}
     * @memberof Editor
     */
	scripts : {[uuid:string]:string[]};
    /**
     * selected
     *
     * @type {THREE.Object3D}
     * @memberof Editor
     */
	selected : THREE.Object3D | null;
    /**
     * helpers
     *
     * @type {{[uuid:string]:THREE.Object3D}}
     * @memberof Editor
     */
	helpers : {[uuid:string]:THREE.Object3D};

    // [ Public Functions ]

    /**
     * set theme
     *
     * @param {any} value
     *
     * @memberof Editor
     */
    setTheme ( value:any ) {
        let theme = <HTMLLinkElement>document.getElementById( 'theme' );
		theme.href = value;
		this.signals.themeChanged.dispatch( value );
    }
    /**
     * set scene
     *
     * @param {THREE.Scene} scene
     *
     * @memberof Editor
     */
	setScene ( scene:THREE.Scene ) {

		this.scene.uuid = scene.uuid;
		this.scene.name = scene.name;

		if ( scene.background !== null ) this.scene.background = scene.background.clone();
		if ( scene.fog !== null ) this.scene.fog = scene.fog.clone();

		this.scene.userData = JSON.parse( JSON.stringify( scene.userData ) );

		// avoid render per object

		this.signals.sceneGraphChanged.active = false;

		while( scene.children.length > 0 ) {
			this.addObject( scene.children[ 0 ] );
		}

		this.signals.sceneGraphChanged.active = true;
		this.signals.sceneGraphChanged.dispatch();
	}
    /**
     * add object
     *
     * @param {THREE.Object3D} object
     *
     * @memberof Editor
     */
	addObject ( object:THREE.Object3D ) {

		object.traverse( ( child:THREE.Object3D ) => {

			if( child instanceof THREE.Mesh ){
                this.addGeometry( child.geometry );
                this.addMaterial( child.material );
            }

			this.addHelper( child );
		});

		this.scene.add( object );

		this.signals.objectAdded.dispatch( object );
		this.signals.sceneGraphChanged.dispatch();
	}
    /**
     * move object
     *
     * @type null
     * @memberof Editor
     */
	moveObject ( object:THREE.Object3D, parent:THREE.Object3D, before:THREE.Object3D ) {

		if( parent === undefined ) {
			parent = this.scene;
		}

		parent.add( object );

		// sort children array

		if( before !== undefined ) {
			var index = parent.children.indexOf( before );
			parent.children.splice( index, 0, object );
			parent.children.pop();
		}

		this.signals.sceneGraphChanged.dispatch();
	}
    /**
     * set object name
     *
     * @param {THREE.Object3D} object
     * @param {string} name
     *
     * @memberof Editor
     */
	nameObject ( object:THREE.Object3D, name:string ) {
		object.name = name;
		this.signals.sceneGraphChanged.dispatch();
	}
    /**
     * remove object
     *
     * @param {THREE.Object3D} object
     * @returns
     *
     * @memberof Editor
     */
    removeObject ( object:THREE.Object3D ) {

		if( object.parent === null ) return; // avoid deleting the camera or scene

		object.traverse( ( child:THREE.Object3D ) => {
			this.removeHelper( child );
		});

		object.parent.remove( object );

		this.signals.objectRemoved.dispatch( object );
		this.signals.sceneGraphChanged.dispatch();
	}
    /**
     * add geometry
     *
     * @param {(THREE.Geometry|THREE.BufferGeometry)} geometry
     *
     * @memberof Editor
     */
	addGeometry ( geometry:THREE.Geometry|THREE.BufferGeometry ) {
		this.geometries[ geometry.uuid ] = geometry;
	}
    /**
     * set geometry name
     *
     * @param {(THREE.Geometry|THREE.BufferGeometry)} geometry
     * @param {string} name
     *
     * @memberof Editor
     */
	setGeometryName ( geometry:THREE.Geometry|THREE.BufferGeometry, name:string ) {
		geometry.name = name;
		this.signals.sceneGraphChanged.dispatch();
	}
    /**
     * add material
     *
     * @param {THREE.Material} material
     *
     * @memberof Editor
     */
	addMaterial ( material:THREE.Material ) {
		this.materials[ material.uuid ] = material;
	}
    /**
     * set material name
     *
     * @param {THREE.Material} material
     * @param {string} name
     *
     * @memberof Editor
     */
	setMaterialName ( material:THREE.Material, name:string ) {
		material.name = name;
		this.signals.sceneGraphChanged.dispatch();
	}
    /**
     * add texture
     *
     * @param {THREE.Texture} texture
     *
     * @memberof Editor
     */
	addTexture ( texture:THREE.Texture ) {
		this.textures[ texture.uuid ] = texture;
	}
    /**
     * add helper
     *
     * @returns
     *
     * @memberof Editor
     */
	addHelper ( object:THREE.Object3D ) {

        let helper : THREE.Object3D;

        if( object instanceof THREE.Camera ) {

            helper = new THREE.CameraHelper( object );

        } else if ( object instanceof THREE.PointLight ) {

            helper = new THREE.PointLightHelper( object, 1 );

        } else if ( object instanceof THREE.DirectionalLight ) {

            helper = new THREE.DirectionalLightHelper( object, 1 );

        } else if ( object instanceof THREE.SpotLight ) {

            helper = new THREE.SpotLightHelper( object );

        } else if ( object instanceof THREE.HemisphereLight ) {

            helper = new THREE.HemisphereLightHelper( object, 1 );

        } else if ( object instanceof THREE.SkinnedMesh ) {

            helper = new THREE.SkeletonHelper( object );

        } else {
            // no helper for this object type
            return;
        }

		let geometry = new THREE.SphereBufferGeometry( 2, 4, 2 );
		let material = new THREE.MeshBasicMaterial( { color:0xff0000, visible:false } );

        let picker = new THREE.Mesh( geometry, material );
        picker.name = 'picker';
        picker.userData.object = object;
        helper.add( picker );

        this.sceneHelpers.add( helper );
        this.helpers[ object.id ] = helper;

        this.signals.helperAdded.dispatch( helper );
	}
    /**
     * remove helper
     *
     * @param {THREE.Object3D} object
     *
     * @memberof Editor
     */
	removeHelper ( object:THREE.Object3D ) {

		if( this.helpers[ object.id ] !== undefined ) {

			var helper = this.helpers[ object.id ];
			helper.parent.remove( helper );

			delete this.helpers[ object.id ];

			this.signals.helperRemoved.dispatch( helper );
		}
	}
    /**
     * add script
     *
     * @param {THREE.Object3D} object
     * @param {string} script
     *
     * @memberof Editor
     */
	addScript ( object:THREE.Object3D, script:string ) {

		if( this.scripts[ object.uuid ] === undefined ) {
			this.scripts[ object.uuid ] = [];
		}

		this.scripts[ object.uuid ].push( script );
		this.signals.scriptAdded.dispatch( script );
	}
    /**
     * remove script
     *
     * @param {THREE.Object3D} object
     * @param {string} script
     * @returns
     *
     * @memberof Editor
     */
	removeScript ( object:THREE.Object3D, script:string ) {

		if( this.scripts[ object.uuid ] === undefined ) return;

		let index = this.scripts[ object.uuid ].indexOf( script );

		if( index !== - 1 ) {
			this.scripts[ object.uuid ].splice( index, 1 );
		}

		this.signals.scriptRemoved.dispatch( script );
	}
    /**
     * select object
     *
     * @param {(THREE.Object3D|null)} object
     * @returns
     *
     * @memberof Editor
     */
	select ( object:THREE.Object3D|null ) {

		if( this.selected === object ) return;

		let uuid : string|null = null;

		if( object !== null ) {
			uuid = object.uuid;
		}

		this.selected = object;

		this.config.setKey( 'selected', uuid );
		this.signals.objectSelected.dispatch( object );
	}
    /**
     * select object by id
     *
     * @param {number} id
     * @returns
     *
     * @memberof Editor
     */
	selectById ( id:number ) {
		if( id === this.camera.id ) {
			this.select( this.camera );
			return;
		}
		this.select( this.scene.getObjectById( id ) );
	}
    /**
     * select object by uuid
     *
     * @param {string} uuid
     *
     * @memberof Editor
     */
	selectByUuid ( uuid:string ) {
		this.scene.traverse( ( child ) => {
			if( child.uuid === uuid ) {
				this.select( child );
			}
		});
	}
    /**
     * deselect
     *
     *
     * @memberof Editor
     */
	deselect () {

		this.select( null );
	}
    /**
     * focus object
     *
     * @param {THREE.Object3D} object
     *
     * @memberof Editor
     */
	focus ( object:THREE.Object3D ) {

		this.signals.objectFocused.dispatch( object );
	}
    /**
     * focus by object id
     *
     * @param {number} id
     *
     * @memberof Editor
     */
	focusById ( id:number ) {

		this.focus( this.scene.getObjectById( id ) );
	}
    /**
     * clear
     *
     *
     * @memberof Editor
     */
	clear () {

		this.history.clear();
		this.storage.clear();

		this.camera.copy( this.DEFAULT_CAMERA );
		this.scene.background.setHex( 0xaaaaaa );
		this.scene.fog = new THREE.Fog(0);

		let objects = this.scene.children;

		while( objects.length > 0 ) {
			this.removeObject( objects[ 0 ] );
		}

		this.geometries = {};
		this.materials  = {};
		this.textures   = {};
		this.scripts    = {};

		this.deselect();

		this.signals.editorCleared.dispatch();
	}
    /**
     * load from json
     *
     * @param {IEditor} json
     * @returns
     *
     * @memberof Editor
     */
	fromJSON ( json:IEditor ) {

		let loader = new THREE.ObjectLoader();

		// backwards

		if ( json.scene === undefined ) {

			this.setScene( <THREE.Scene>loader.parse( json ) );
			return;
		}

		let camera = <THREE.Camera>loader.parse( json.camera );

		this.camera.copy( camera );
        if( this.camera instanceof THREE.PerspectiveCamera ) {
            this.camera.aspect = this.DEFAULT_CAMERA.aspect;
            this.camera.updateProjectionMatrix();
        }

		this.history.fromJSON( json.history );
		this.scripts = json.scripts;

		this.setScene( <THREE.Scene>loader.parse( json.scene ) );
	}
    /**
     * editor to json
     *
     * @returns {IEditor}
     *
     * @memberof Editor
     */
	toJSON () : IEditor {

		// scripts clean up

		let scene   = this.scene;
		let scripts = this.scripts;

		for( let key in scripts ) {
			let script = scripts[ key ];
			if ( script.length === 0 || scene.getObjectByProperty( 'uuid', key ) === undefined ) {
				delete scripts[ key ];
			}
		}

		//
		return {

			metadata: {},
			project : {
				gammaInput  : this.config.getKey( 'project/renderer/gammaInput' ),
				gammaOutput : this.config.getKey( 'project/renderer/gammaOutput' ),
				shadows     : this.config.getKey( 'project/renderer/shadows' ),
				vr          : this.config.getKey( 'project/vr' )
			},
			camera  : this.camera.toJSON(),
			scene   : this.scene.toJSON(),
			scripts : this.scripts,
			history : this.history.toJSON()
		};
	}
    /**
     * get object by uuid
     *
     * @param {string} uuid
     * @returns
     *
     * @memberof Editor
     */
	objectByUuid ( uuid:string ) {
		return this.scene.getObjectByProperty( 'uuid', uuid );
	}
    /**
     * execute command
     *
     * @param {Command} cmd
     * @param {string} optionalName
     *
     * @memberof Editor
     */
    execute ( cmd:Command, optionalName:string ) {
		this.history.execute( cmd, optionalName );
	}
    /**
     * undo
     *
     *
     * @memberof Editor
     */
	undo () {
		this.history.undo();
	}
    /**
     * redo
     *
     *
     * @memberof Editor
     */
	redo () {
		this.history.redo();
	}

    // [ Constructors ]

    constructor() {

        this.DEFAULT_CAMERA     = new THREE.PerspectiveCamera( 50, 1, 0.1, 10000 );
        this.DEFAULT_CAMERA.name= 'Camera';
        this.DEFAULT_CAMERA.position.set( 20, 10, 20 );
        this.DEFAULT_CAMERA.lookAt( new THREE.Vector3() );

        this.camera             = this.DEFAULT_CAMERA.clone();
        this.config             = new Config( 'unicon-editor' );
        this.history            = new History( this );
        this.storage            = new Storage();
        this.loader             = new Loader( this );

        this.scene              = new THREE.Scene();
        this.scene.name         = 'Scene';
        this.scene.background   = new THREE.Color( 0xaaaaaa );

        this.sceneHelpers       = new THREE.Scene();

        this.object             = {};
        this.geometries         = {};
        this.materials          = {};
        this.textures           = {};
        this.scripts            = {};
        this.helpers            = {};

        this.selected           = null;
    }
}
