// -----------------------------------------------------------------------------
// editor.ts
// -----------------------------------------------------------------------------
import * as signals   from 'signals';
import {Signal      } from 'signals';
import * as THREE     from 'three';
import {Config      } from './config';
import {History     } from './history';
import {Loader      } from './loader';
import {Storage     } from './storage';

/**
 * Editor
 *
 * @author mrdoob ( http://mrdoob.com )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Editor
 */
export class Editor {

    // [ Public Delegates ]

    // [ Public Static Variables ]

    // [ Public Variables ]

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

    // [ Public Static Functions ]

    // [ Public Functions ]

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
     * @type {{}}
     * @memberof Editor
     */
	object : {};
    /**
     * geometries
     *
     * @type {{}}
     * @memberof Editor
     */
	geometries : {};
    /**
     * materials
     *
     * @type {{}}
     * @memberof Editor
     */
	materials : {};
    /**
     * textures
     *
     * @type {{}}
     * @memberof Editor
     */
	textures : {};
    /**
     * scripts
     *
     * @type {{}}
     * @memberof Editor
     */
	scripts : {};
    /**
     * selected
     *
     * @type {*}
     * @memberof Editor
     */
	selected : any;
    /**
     * helpers
     *
     * @type {{}}
     * @memberof Editor
     */
	helpers : {};

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
