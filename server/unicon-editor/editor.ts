// -----------------------------------------------------------------------------
// editor.ts
// -----------------------------------------------------------------------------
import * as signals       from 'signals';
import * as THREE         from 'three';
import {Signal          } from 'signals';
import {				} from './date';
import {ICommand        } from './interface';
import {IEditor         } from './interface';
import {ISignals        } from './interface';
import {Command         } from './command';
import {Config          } from './config';
import {History         } from './history';
import {Loader          } from './loader';
import {Storage         } from './storage';


/**
 * Editor
 *
 * @author mrdoob ( http://mrdoob.com )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Editor
 * @implements {IEditor}
 */
export class Editor implements IEditor {

    // [ Public Variables ]

    config          : Config;
    signals         : ISignals;
    DEFAULT_CAMERA  : THREE.PerspectiveCamera;
	history         : History;
    storage         : Storage;
	loader          : Loader;
	camera          : THREE.Camera;
	scene           : THREE.Scene;
	sceneHelpers    : THREE.Scene;
	object          : {[uuid:string]:THREE.Object3D};
	geometries      : {[uuid:string]:THREE.Geometry|THREE.BufferGeometry};
	materials       : {[uuid:string]:THREE.Material};
	textures        : {[uuid:string]:THREE.Texture};
	scripts         : {[uuid:string]:object[]};
	selected        : THREE.Object3D | null;
	helpers         : {[uuid:string]:THREE.Object3D};

    // [ Public Functions ]

    setTheme ( value:string ) {
        let theme = <HTMLLinkElement>document.getElementById( 'theme' );
		theme.href = value;
		this.signals.themeChanged.dispatch( value );
    }

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

	nameObject ( object:THREE.Object3D, name:string ) {
		object.name = name;
		this.signals.sceneGraphChanged.dispatch();
	}

    removeObject ( object:THREE.Object3D ) {

		if( object.parent === null ) return; // avoid deleting the camera or scene

		object.traverse( ( child:THREE.Object3D ) => {
			this.removeHelper( child );
		});

		object.parent.remove( object );

		this.signals.objectRemoved.dispatch( object );
		this.signals.sceneGraphChanged.dispatch();
	}

	addGeometry ( geometry:THREE.Geometry|THREE.BufferGeometry ) {
		this.geometries[ geometry.uuid ] = geometry;
	}

	setGeometryName ( geometry:THREE.Geometry|THREE.BufferGeometry, name:string ) {
		geometry.name = name;
		this.signals.sceneGraphChanged.dispatch();
	}

	addMaterial ( material:THREE.Material ) {
		this.materials[ material.uuid ] = material;
	}

	setMaterialName ( material:THREE.Material, name:string ) {
		material.name = name;
		this.signals.sceneGraphChanged.dispatch();
	}

	addTexture ( texture:THREE.Texture ) {
		this.textures[ texture.uuid ] = texture;
	}

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

	removeHelper ( object:THREE.Object3D ) {

		if( this.helpers[ object.id ] !== undefined ) {

			var helper = this.helpers[ object.id ];
			helper.parent.remove( helper );

			delete this.helpers[ object.id ];

			this.signals.helperRemoved.dispatch( helper );
		}
	}

	addScript ( object:THREE.Object3D, script:object ) {

		if( this.scripts[ object.uuid ] === undefined ) {
			this.scripts[ object.uuid ] = [];
		}

		this.scripts[ object.uuid ].push( script );
		this.signals.scriptAdded.dispatch( script );
	}

	removeScript ( object:THREE.Object3D, script:object ) {

		if( this.scripts[ object.uuid ] === undefined ) return;

		let index = this.scripts[ object.uuid ].indexOf( script );

		if( index !== - 1 ) {
			this.scripts[ object.uuid ].splice( index, 1 );
		}

		this.signals.scriptRemoved.dispatch( script );
	}

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

	selectById ( id:number ) {
		if( id === this.camera.id ) {
			this.select( this.camera );
			return;
		}
		this.select( this.scene.getObjectById( id ) );
	}

	selectByUuid ( uuid:string ) {
		this.scene.traverse( ( child ) => {
			if( child.uuid === uuid ) {
				this.select( child );
			}
		});
	}

	deselect () {
		this.select( null );
	}

	focus ( object:THREE.Object3D ) {

		this.signals.objectFocused.dispatch( object );
	}

	focusById ( id:number ) {

		this.focus( this.scene.getObjectById( id ) );
	}

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

	fromJSON ( json:any ) {

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

	toJSON () : any {

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

	objectByUuid ( uuid:string ) : THREE.Object3D {
		return this.scene.getObjectByProperty( 'uuid', uuid );
	}

    execute ( cmd:ICommand, optionalName?:string ) {
		this.history.execute( cmd, optionalName );
	}

	undo () {
		this.history.undo();
	}

	redo () {
		this.history.redo();
	}

    // [ Constructors ]

    constructor() {

        // [ Signals ]
        this.signals = {
            editScript              : new Signal(),
            startPlayer             : new Signal(),
            stopPlayer              : new Signal(),
            enterVR                 : new Signal(),
            enteredVR               : new Signal(),
            exitedVR                : new Signal(),
            showModal               : new Signal(),
            editorCleared           : new Signal(),
            savingStarted           : new Signal(),
            savingFinished          : new Signal(),
            themeChanged            : new Signal(),
            transformModeChanged    : new Signal(),
            snapChanged             : new Signal(),
            spaceChanged            : new Signal(),
            rendererChanged         : new Signal(),
            sceneBackgroundChanged  : new Signal(),
            sceneFogChanged         : new Signal(),
            sceneGraphChanged       : new Signal(),
            cameraChanged           : new Signal(),
            geometryChanged         : new Signal(),
            objectSelected          : new Signal(),
            objectFocused           : new Signal(),
            objectAdded             : new Signal(),
            objectChanged           : new Signal(),
            objectRemoved           : new Signal(),
            helperAdded             : new Signal(),
            helperRemoved           : new Signal(),
            materialChanged         : new Signal(),
            scriptAdded             : new Signal(),
            scriptChanged           : new Signal(),
            scriptRemoved           : new Signal(),
            windowResize            : new Signal(),
            showGridChanged         : new Signal(),
            refreshSidebarObject3D  : new Signal(),
            historyChanged          : new Signal(),
        };

		this.DEFAULT_CAMERA         = new THREE.PerspectiveCamera( 50, 1, 0.1, 10000 );
        this.DEFAULT_CAMERA.name    = 'Camera';
        this.DEFAULT_CAMERA.position.set( 20, 10, 20 );
        this.DEFAULT_CAMERA.lookAt( new THREE.Vector3() );

        this.camera                 = this.DEFAULT_CAMERA.clone();
        this.config                 = new Config( 'unicon-editor' );
        this.history                = new History( this );
        this.storage                = new Storage();
        this.loader                 = new Loader( this );

        this.scene                  = new THREE.Scene();
        this.scene.name             = 'Scene';
        this.scene.background       = new THREE.Color( 0xaaaaaa );

        this.sceneHelpers           = new THREE.Scene();

        this.object                 = {};
        this.geometries             = {};
        this.materials              = {};
        this.textures               = {};
        this.scripts                = {};
        this.helpers                = {};

        this.selected               = null;
    }
}
