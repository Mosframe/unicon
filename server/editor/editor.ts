// -----------------------------------------------------------------------------
// editor.ts
// -----------------------------------------------------------------------------
import {Ubject          } from '../engine/ubject';
import {ScriptableObject} from '../engine/scriptable-object';

import {SerializedObject} from '../editor/serialized-object';

let DatGUI = require('../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.

// TODO : VSCore 1.12.2에서 Decorator를 사용하면 컴파일은 되지만 코딩할때
// 경고가 발생하여 인텐리센스기능을 쓸수가 없고 오류로 표기된다.
function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

/**
 * Base class to derive custom Editors from. Use this to create your own custom inspectors and editors for your objects.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Editor
 * @extends {ScriptableObject}
 */
//@classDecorator
export class Editor extends ScriptableObject {

    // [ Public Variables ]

    /**
     * A SerializedObject representing the object or objects being inspected.
     *
     * @type {ScriptableObject}
     * @memberof Editor
     */
    serializedObject : ScriptableObject;
    /**
     * The object being inspected.
     *
     * @type {Ubject}
     * @memberof Editor
     */
    target : Ubject;
    /**
     * An array of all the object being inspected.
     *
     * @type {Ubject[]}
     * @memberof Editor
     */
    targets : Ubject[];

    // [ Public Functions ]

    /**
     * Draw the built-in inspector.
     *
     *
     * @memberof Editor
     */
    drawDefaultInspector() {
        //this.target
    }
    /*
    DrawHeader	Call this function to draw the header of the editor.
    DrawPreview	The first entry point for Preview Drawing.
    GetInfoString	Implement this method to show asset information on top of the asset preview.
    GetPreviewTitle	Override this method if you want to change the label of the Preview area.
    HasPreviewGUI	Override this method in subclasses if you implement OnPreviewGUI.
    */
    /**
     * Implement this function to make a custom inspector.
     *
     *
     * @memberof Editor
     */
    onInspectorGUI() { this.drawDefaultInspector(); }
    /*
    OnInteractivePreviewGUI	Implement to create your own interactive custom preview. Interactive custom previews are used in the preview area of the inspector and the object selector.
    OnPreviewGUI	Implement to create your own custom preview for the preview area of the inspector, primary editor headers and the object selector.
    OnPreviewSettings	Override this method if you want to show custom controls in the preview header.
    RenderStaticPreview	Override this method if you want to render a static preview that shows.
    Repaint	Repaint any inspectors that shows this editor.
    RequiresConstantRepaint	Does this edit require to be repainted constantly in its current state?
    UseDefaultMargins	Override this method in subclasses to return false if you don't want default margins.
    */

    // [ Constructors ]

    // [ Static Functions ]

    /*
    CreateCachedEditor	On return previousEditor is an editor for targetObject or targetObjects. The function either returns if the editor is already tracking the objects, or Destroys the previous editor and creates a new one.
    CreateCachedEditorWithContext	Creates a cached editor using a context object.
    CreateEditor	Make a custom editor for targetObject or targetObjects.
    CreateEditorWithContext	Make a custom editor for targetObject or targetObjects with a context object.
    */

    // [ Messages ]

    /*
    OnSceneGUI	Enables the Editor to handle an event in the scene view.
    */

}
