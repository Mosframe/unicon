// -----------------------------------------------------------------------------
// editor-application.ts
// -----------------------------------------------------------------------------
import {delegate                } from "../engine/delegate";
import {ScriptableObject        } from '../engine/scriptable-object';
import {Rect                    } from '../engine/rect';
import {SerializedProperty      } from '../editor/serialized-property';
import {GenericMenu             } from '../editor/generic-menu';
import {Tool                    } from '../editor/tool';
import {ViewTool                } from '../editor/view-tool';


/**
 * Main Application class.
 *
 * The View tool has options for Orbit, Pan, Zoom and FPS, depending on which combination mouse buttons and modifier keys is used. This property reports which option is currently active.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Tools
 * @extends {ScriptableObject}
 */
export class EditorApplication {

    // [ Static Variables ]
    /*
    applicationContentsPath	Path to the Unicon editor contents folder. (Read Only)
    applicationPath	Returns the path to the Unicon editor application. (Read Only)
    contextualPropertyMenu	Callback raised whenever the user contex-clicks on a property in an Inspector.
    delayCall	Delegate which is called once after all inspectors update.
    hierarchyWindowChanged	A callback to be raised when an object in the hierarchy changes.Each time an object is (or a group of objects are) created, renamed, parented, unparented or destroyed this callback is raised.
    hierarchyWindowItemOnGUI	Delegate for OnGUI events for every visible list item in the HierarchyWindow.
    isCompiling	Is editor currently compiling scripts? (Read Only)
    isPaused	Is editor currently paused?
    isPlaying	Is editor currently in play mode?
    isPlayingOrWillChangePlaymode	Is editor either currently in play mode, or about to switch to it? (Read Only)
    isRemoteConnected	Is editor currently connected to Unicon Remote 4 client app.
    isTemporaryProject	Returns true if the current project was created as a temporary project.
    isUpdating	True if the Editor is currently refreshing the AssetDatabase.
    modifierKeysChanged	Delegate for changed keyboard modifier keys.
    playmodeStateChanged	Delegate for play mode state changes.
    projectWindowChanged	Callback raised whenever the state of the Project window changes.
    projectWindowItemOnGUI	Delegate for OnGUI events for every visible list item in the ProjectWindow.
    searchChanged	Callback raised whenever the contents of a window's search box are changed.
    timeSinceStartup	The time since the editor was started. (Read Only)
    update	Delegate for generic updates.
    */

    // [ Static Functions ]

    /*
    Beep	Plays system beep sound.
    DirtyHierarchyWindowSorting	Set the hierarchy sorting method as dirty.
    ExecuteMenuItem	Invokes the menu item in the specified path.
    Exit	Exit the Unicon editor application.
    LoadLevelAdditiveAsyncInPlayMode	Load the given level additively in play mode asynchronously
    LoadLevelAdditiveInPlayMode	Load the given level additively in play mode.
    LoadLevelAsyncInPlayMode	Load the given level in play mode asynchronously.
    LoadLevelInPlayMode	Load the given level in play mode.
    LockReloadAssemblies	Prevents loading of assemblies when it is inconvenient.
    OpenProject	Open another project.
    RepaintHierarchyWindow	Can be used to ensure repaint of the HierarchyWindow.
    RepaintProjectWindow	Can be used to ensure repaint of the ProjectWindow.
    SetTemporaryProjectKeepPath	Sets the path that Unicon should store the current temporary project at, when the project is closed.
    Step	Perform a single frame step.
    UnlockReloadAssemblies	Must be called after LockReloadAssemblies, to reenable loading of assemblies.
    */

    // [ Constructors ]

    constructor() {
        //this.callbackFunction = this.doSomthing;
    }

    // [ Delegates ]

    /**
     * Delegate to be called from EditorApplication callbacks.
     *
     *
     * @memberof EditorApplication
     */
    callbackFunction : () => Function;
    /**
     * Delegate to be called for every visible list item in the HierarchyWindow on every OnGUI event.
     *
     *
     * @memberof EditorApplication
     */
    hierarchyWindowItemCallback : (instanceID:number,selectionRect:Rect) => Function;

    /**
     * Delegate to be called for every visible list item in the ProjectWindow on every OnGUI event.
     *
     *
     * @memberof EditorApplication
     */
    ProjectWindowItemCallback : (guid:string, selectionRect:Rect) => Function;
    /**
     * Delegate to be called from EditorApplication contextual inspector callbacks.
     *
     *
     * @memberof EditorApplication
     */
    SerializedPropertyCallbackFunction : (menu:GenericMenu, property:SerializedProperty) => Function;

}
