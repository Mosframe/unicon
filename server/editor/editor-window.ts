// -----------------------------------------------------------------------------
// editor-window.ts
// -----------------------------------------------------------------------------
/**
 * EditorWindow
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class EditorWindow
 */
export class EditorWindow {

    // [ Public Properties ]

    // [ Public Functions ]

    constructor( titleName:string='EditorWindow' ) {
        let datGUI = require('../lib/dat.gui/build/dat.gui');
        this._core = new datGUI.GUI({ width:300 });
        this._root = this._core.addFolder(titleName);
        this._root.open();

        datGUI.GUI.prototype.removeFolder = function(name) {
            let folder = this.__folders[name];
            if (!folder) {
                return;
            }
            folder.close();
            this.__ul.removeChild(folder.domElement.parentNode);
            delete this.__folders[name];
            this.onResize();
        }
    }

    // [ Protected Members ]

    protected _core : any;
    protected _root : any;
}
