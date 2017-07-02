// -----------------------------------------------------------------------------
// interface.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';
import {Signal  } from 'signals';
import {Config  } from './config';


/**
 * Command interface
 *
 * @author mrdoob ( http://mrdoob.com )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @interface ICommand
 */
export interface ICommand {

	id              : number;
	type            : string;
	name            : string;
	inMemory        : boolean;
	updatable       : boolean;
    object          : THREE.Object3D;
    script          : object;
    attributeName   : string;
    json            : any;

    execute         ();
    undo            ();
    toJSON          () : any;
    fromJSON        ( json:any );
    update          ( cmd:ICommand );
}

/**
 * Editor interface
 *
 * @author mrdoob ( http://mrdoob.com )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @interface IEditor
 */
export interface IEditor {

    config          : Config;
    signals         : ISignals;
    DEFAULT_CAMERA  : THREE.PerspectiveCamera;
	history         : IHistory;
    storage         : IStorage;
	loader          : ILoader;
	camera          : THREE.Camera;
	scene           : THREE.Scene;
	sceneHelpers    : THREE.Scene;
	object          : {[uuid:string]:THREE.Object3D};
	geometries      : {[uuid:string]:THREE.Geometry|THREE.BufferGeometry};
	materials       : {[uuid:string]:THREE.Material};
	textures        : {[uuid:string]:THREE.Texture};
	scripts         : {[uuid:string]:any[]};
	selected        : THREE.Object3D | null;
	helpers         : {[uuid:string]:THREE.Object3D};

    setTheme        ( value:string );
	setScene        ( scene:THREE.Scene );
    addObject       ( object:THREE.Object3D );
	moveObject      ( object:THREE.Object3D, parent:THREE.Object3D, before:THREE.Object3D );
	nameObject      ( object:THREE.Object3D, name:string );
    removeObject    ( object:THREE.Object3D );
	addGeometry     ( geometry:THREE.Geometry|THREE.BufferGeometry );
	setGeometryName ( geometry:THREE.Geometry|THREE.BufferGeometry, name:string );
	addMaterial     ( material:THREE.Material );
	setMaterialName ( material:THREE.Material, name:string );
	addTexture      ( texture:THREE.Texture );
	addHelper       ( object:THREE.Object3D );
	removeHelper    ( object:THREE.Object3D );
	addScript       ( object:THREE.Object3D, script:object );
	removeScript    ( object:THREE.Object3D, script:object );
	select          ( object:THREE.Object3D|null );
	selectById      ( id:number );
	selectByUuid    ( uuid:string );
    deselect        ();
	focus           ( object:THREE.Object3D );
	focusById       ( id:number );
	clear           ();
	fromJSON        ( json:any );
	toJSON          () : any;
	objectByUuid    ( uuid:string ) : THREE.Object3D;
    execute         ( cmd:ICommand, optionalName?:string );
	undo            ();
	redo            ();
}

export interface IHistory {
    undos           : ICommand[];
    redos           : ICommand[];

    lastCmdTime     : Date;
    idCounter       : number;
    historyDisabled : boolean;

	execute ( cmd:ICommand, optionalName?:string );
	undo () : ICommand|undefined;
	redo () : ICommand|undefined;
	toJSON () : any;
	fromJSON ( json:any );
	clear ();
	goToState ( id:number );
	enableSerialization ( id:number );
}

export interface ILoader {
    loadFile ( file:File );
}

/**
 * Editor Signals interface
 *
 * @author mrdoob ( http://mrdoob.com )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @interface ISignals
 */
export interface ISignals {
    // [ script ]
    editScript              : Signal,
    // [ player ]
    startPlayer             : Signal,
    stopPlayer              : Signal,
    // [ VR ]
    enterVR                 : Signal,
    enteredVR               : Signal,
    exitedVR                : Signal,
    // [ actions ]
    showModal               : Signal,
    // [ notifications ]
    editorCleared           : Signal,
    savingStarted           : Signal,
    savingFinished          : Signal,
    themeChanged            : Signal,
    transformModeChanged    : Signal,
    snapChanged             : Signal,
    spaceChanged            : Signal,
    rendererChanged         : Signal,
    sceneBackgroundChanged  : Signal,
    sceneFogChanged         : Signal,
    sceneGraphChanged       : Signal,
    cameraChanged           : Signal,
    geometryChanged         : Signal,
    objectSelected          : Signal,
    objectFocused           : Signal,
    objectAdded             : Signal,
    objectChanged           : Signal,
    objectRemoved           : Signal,
    helperAdded             : Signal,
    helperRemoved           : Signal,
    materialChanged         : Signal,
    scriptAdded             : Signal,
    scriptChanged           : Signal,
    scriptRemoved           : Signal,
    windowResize            : Signal,
    showGridChanged         : Signal,
    refreshSidebarObject3D  : Signal,
    historyChanged          : Signal,
}

export interface IStorage {

}

