// -----------------------------------------------------------------------------
// editor-window.ts
// -----------------------------------------------------------------------------
import {ScriptableObject}  from '../engine/scriptable-object';
import {Tool            }  from './tool';
import {ViewTool        }  from './view-tool';

/**
 * Derive from this class to create an editor window.
 *
 * Create your own custom editor window that can float free or be docked as a tab, just like the native windows in the Unity interface.
 *
 * Editor windows are typically opened using a menu item.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class EditorWindow
 * @extends {ScriptableObject}
 */
export class EditorWindow extends ScriptableObject {

    // [ Public Static Variables ]

    /**
     * The EditorWindow which currently has keyboard focus. (Read Only)
     *
     * @readonly
     * @static
     *
     * @memberof EditorWindow
     */
    static get focusedWindow() { return this._focusedWindow; }
    /**
     * The EditorWindow currently under the mouse cursor. (Read Only)
     *
     * @readonly
     * @static
     *
     * @memberof EditorWindow
     */
    static get mouseOverWindow() { return this._mouseOverWindow; }

    // [ Public Variables ]

    /*
    autoRepaintOnSceneChange	Does the window automatically repaint whenever the scene has changed?
    maximized	Is this window maximized.
    maxSize	The maximum size of this window.
    minSize	The minimum size of this window.
    position	The position of the window in screen space.
    titleContent	The GUIContent used for drawing the title of EditorWindows.
    wantsMouseEnterLeaveWindow	Checks whether MouseEnterWindow and MouseLeaveWindow events are received in the GUI in this Editor window.
    wantsMouseMove	Checks whether MouseMove events are received in the GUI in this Editor window.
    */

    // [ Public Functions ]

    /*
    BeginWindows	Mark the beginning area of all popup windows.
    Close	Close the editor window.
    EndWindows	Close a window group started with EditorWindow.BeginWindows.
    Focus	Moves keyboard focus to this EditorWindow.
    RemoveNotification	Stop showing notification message.
    */
    /**
     * Make the window repaint.
     *
     *
     * @memberof EditorWindow
     */
    repaint(){

    }
    /*
    SendEvent	Sends an Event to a window.
    Show	Show the EditorWindow.
    ShowAsDropDown	Shows a window with dropdown behaviour and styling.
    ShowAuxWindow	Show the editor window in the auxiliary window.
    ShowNotification	Show a notification message.
    ShowPopup	Shows an Editor window using popup-style framing.
    ShowUtility	Show the EditorWindow as a floating utility window.
    */

    // [ Public Static Functions ]

    /*
    FocusWindowIfItsOpen	Focuses the first found EditorWindow of specified type if it is open.
    GetWindow	Returns the first EditorWindow of type t which is currently on the screen.
    GetWindowWithRect	Returns the first EditorWindow of type t which is currently on the screen.
    */

    // [ Public Messages ]

    /*
    Awake	Called as the new window is opened.
    OnDestroy	OnDestroy is called when the EditorWindow is closed.
    */

    /**
     * Called when the window gets keyboard focus.
     *
     *
     * @memberof EditorWindow
     */
    onFocus(){
        EditorWindow._focusedWindow = this;
    }
    /*
    OnGUI	Implement your own editor GUI here.
    OnHierarchyChange	Called whenever the scene hierarchy has changed.
    */

    /**
     * onInspectorUpdate is called at 10 frames per second to give the inspector a chance to update.
     *
     *
     * @memberof EditorWindow
     */
    onInspectorUpdate() {
        this.repaint();
    }

    /**
     * Called when the window loses keyboard focus.
     *
     *
     * @memberof EditorWindow
     */
    onLostFocus(){
        EditorWindow._focusedWindow = null;
    }
    /*
    OnProjectChange	Called whenever the project has changed.
    */
    /**
     * Called whenever the selection has changed.
     *
     *
     * @memberof EditorWindow
     */
    onSelectionChange(){
        // selectionIDs = Selection.instanceIDs;
    }
    /**
     * Called multiple times per second on all visible windows.
     *
     *
     * @memberof EditorWindow
     */
    update() {

    }


    // [ Private Static Variables ]

    private static _focusedWindow   : EditorWindow;
    private static _mouseOverWindow : EditorWindow;
}
