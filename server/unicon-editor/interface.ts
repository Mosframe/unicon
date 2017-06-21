// -----------------------------------------------------------------------------
// interface.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';
import {Signal  } from 'signals';


export interface IEditorSignals {
    // script
    editScript              : Signal,
    // player
    startPlayer             : Signal,
    stopPlayer              : Signal,
    // vr
    enterVR                 : Signal,
    enteredVR               : Signal,
    exitedVR                : Signal,
    // actions
    showModal               : Signal,
    // notifications
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

/**
 * Editor interface
 *
 * @author mrdoob ( http://mrdoob.com )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @interface IEditor
 */
export interface IEditor {

    /**
     * scripts
     *
     * @type {{[uuid:string]:object[]}}@memberof IEditor
     */
	scripts : {[uuid:string]:object[]};
    /**
     * signals
     *
     * @type {IEditorSignals}@memberof IEditor
     */
    signals : IEditorSignals;

    /**
     * add object
     *
     * @param {THREE.Object3D} object
     * @memberof IEditor
     */
    addObject ( object:THREE.Object3D );
    /**
     * deselect
     *
     * @memberof IEditor
     */
    deselect();
    /**
     * get object by uuid
     *
     * @param {string} uuid
     * @returns {THREE.Object3D}
     * @memberof IEditor
     */
	objectByUuid ( uuid:string ) : THREE.Object3D;
    /**
     * remove object
     *
     * @param {THREE.Object3D} object
     * @memberof IEditor
     */
    removeObject ( object:THREE.Object3D );

}