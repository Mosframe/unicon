// -----------------------------------------------------------------------------
// editor.ts
// -----------------------------------------------------------------------------
import * as signals   from 'signals';
import {Signal      } from 'signals';
import * as THREE     from 'three';

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

        this.DEFAULT_CAMERA.name = 'Camera';
        this.DEFAULT_CAMERA.position.set( 20, 10, 20 );
        this.DEFAULT_CAMERA.lookAt( new THREE.Vector3() );
    }

    // [ Public Static Functions ]

    // [ Public Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    protected signals = {

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

    protected DEFAULT_CAMERA = new THREE.PerspectiveCamera( 50, 1, 0.1, 10000 );

	protected config = new Config( 'threejs-editor' );
	protected history = new History( this );
	protected storage = new Storage();
	protected loader = new Loader( this );

	protected camera = this.DEFAULT_CAMERA.clone();

	protected scene = new THREE.Scene();
	protected scene.name = 'Scene';
	protected scene.background = new THREE.Color( 0xaaaaaa );

	protected sceneHelpers = new THREE.Scene();

	protected object = {};
	protected geometries = {};
	protected materials = {};
	protected textures = {};
	protected scripts = {};

	protected selected = null;
	protected helpers = {};


    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
