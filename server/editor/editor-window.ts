// -----------------------------------------------------------------------------
// editor-window.ts
// -----------------------------------------------------------------------------
import {IType           }  from '../engine/interfaces/type';
import {Resources       }  from '../engine/resources';
import {ScriptableObject}  from '../engine/scriptable-object';
import {Ubject          }  from '../engine/ubject';

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

    /**
     * Does the window automatically repaint whenever the scene has changed?
     *
     * @type {boolean}
     * @memberof EditorWindow
     */
    //autoRepaintOnSceneChange : boolean;
    /**
     * Is this window maximized.
     *
     * @type {boolean}
     * @memberof EditorWindow
     */
    //get maximized() : boolean {
    //    return true; //WindowLayout.IsMaximized(this);
    //}
    /**
     * Is this window maximized.
     *
     * @type {boolean}
     * @memberof EditorWindow
     */
    //set maximized( value ) : boolean {
    //   let flag = WindowLayout.IsMaximized(this);
    //    if (value == flag)
    //      return;
    //    if (value)
    //      WindowLayout.Maximize(this);
    //    else
    //      WindowLayout.Unmaximize(this);
    //}
    /**
     * The maximum size of this window.
     *
     * @readonly
     * @type {Vector2}
     * @memberof EditorWindow
     */
    //get maxSize() : Vector2 {
    //    return this._maxSize;
    //}
    /**
     * The maximum size of this window.
     *
     * @type {Vector2}
     * @memberof EditorWindow
     */
    //set maxSize( value ) : Vector2 {
    //    this._maxSize = value;
    //    this.makeParentsSettingsMatchMe();
    //}
    /**
     * The minimum size of this window
     *
     * @type {Vector2}
     * @memberof EditorWindow
     */
    //get minSize() : Vector2 {
    //    return this._minSize;
    //}
    /**
     * The minimum size of this window
     *
     * @type {Vector2}
     * @memberof EditorWindow
     */
    //set minSize( value ) : Vector2 {
    //    this._ninSize = value;
    //    this.makeParentsSettingsMatchMe();
    //}
    /**
     * The position of the window in screen space.
     *
     * @type {Rect}
     * @memberof EditorWindow
     */
    //get position() : Rect {
    //    return this._pos;
    //}
    /**
     * The position of the window in screen space.
     *
     *
     * @memberof EditorWindow
     */
    //set position( value:Rect ) {
    //    this._pos = value;
    //    if (!this._parent )
    //      return;
    //    parent:DockArea = <DockArea>this._parent;
    //    if (!parent)
    //      this._parent.window.position = value;
    //    else if( parent.parent && parent._panes.Count == 1 && ! parent.parent.parent )
    //    {
    //      rect:Rect = parent.borderSize.Add(value);
    //      if (parent.background != null)
    //        rect.y -= parseFloat(parent.background.margin.top);
    //      parent.window.position = rect;
    //    }
    //    else
    //    {
    //      parent.RemoveTab(this);
    //      EditorWindow.createNewWindowForEditorWindow(this, true, true);
    //    }
    //}
    /**
     * The GUIContent used for drawing the title of EditorWindows.
     *
     * @type {GUIContext}
     * @memberof EditorWindow
     */
    //titleContent : GUIContext;
    /*
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
    repaint() : void {


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
    static FocusWindowIfItsOpen	Focuses the first found EditorWindow of specified type if it is open.
    */

    /**  <para>Returns the first EditorWindow of type t which is currently on the screen.</para> */
    //static getWindow ( t:type, utility:boolean, title:string) {
    //  let focus = true;
    //  return EditorWindow.GetWindow(t, utility, title, focus);
    //}

    //static getWindow<T extends EditorWindow>() : T
    //{
    //    let type:{new():T};
    //
    //    Ubject.findObjectOfType()
    //
    //    return <T>Ubject._instances[type.toString()];
    //}//	Returns the first EditorWindow of type t which is currently on the screen.
    /*
    static GetWindowWithRect	Returns the first EditorWindow of type t which is currently on the screen.
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


    //private static _getWindow<T extends EditorWindow>( t:IType<T>, utility:boolean, title:string, focus:boolean ) {
    //    let objectsOfTypeAll = <EditorWindow[]>Resources.findObjectsOfTypeAll(t);
    //    let editorWindow:EditorWindow|null = objectsOfTypeAll.length <= 0 ? null : <EditorWindow>objectsOfTypeAll[0];
    //    if( !editorWindow )
    //    {
    //        editorWindow = <EditorWindow>ScriptableObject.createInstance(t);
    //        if( title )
    //            editorWindow.titleContent = new GUIContent(title);
    //        if( utility )
    //            editorWindow.ShowUtility();
    //        else
    //            editorWindow.Show();
    //    }
    //    else if (focus)
    //    {
    //        editorWindow.Show();
    //        editorWindow.Focus();
    //    }
    //    return editorWindow;
    //}

}
