// -----------------------------------------------------------------------------
// inspector.ts
// -----------------------------------------------------------------------------
import * as GL             from '../engine/graphic';
import {PrimitiveType   }  from '../engine/primitive-type';
import {GameObject      }  from '../engine/game-object';
import {Light           }  from '../engine/light';
import {Camera          }  from '../engine/camera';
import {Renderer        }  from '../engine/renderer';
import {MeshRenderer    }  from '../engine/mesh-renderer';
import {Scene           }  from '../engine/scene';
import {Tools           }  from '../editor/tools';
import {ViewTool        }  from '../editor/view-tool';
import {OrbitControls   }  from '../editor/orbit-controls';
import {Window          }  from './window';

/**
 * inspector window
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Inspector
 * @extends {Window}
 */
export class Inspector extends Window {

    // [ Public Functions ]

    static init() {
        let window = <Inspector>GetWindow(typeof(Inspector));
        window.Show();
    }
    /**
     * open window
     *
     *
     * @memberof Inspector
     */
    open() {
        this._selectionIDs = Selection.instanceIDs;
        this.saveSelection();
    }
    /**
     * save Selection
     *
     *
     * @memberof Inspector
     */
    saveSelection(){
        let saveStr = "";
        for ( let selectionID of this._selectionIDs )
        {
            saveStr += selectionID.toString() + ";";
        }
        EditorPrefs.SetString("SelectedIDs", saveStr);
    }
    /**
     *
     *
     *
     * @memberof Inspector
     */
    loadSelection(){
        let strIDs:string[] = EditorPrefs.GetString("_selectionIDs").Split(char.Parse(";"));

        let ids:number[] = [strIDs.length];

        for( let i=0; i < strIDs.length; ++i ) {
           ids[i] = Number.parseInt( strIDs[i] );
        }
        Selection.instanceIDs = ids;
    }

    /**
     * render
     *
     *
     * @memberof Unicon
     */
    render() {
        super.render();
    }

    onSelectionChange() {
        super.onSelectionChange();

        this._selectionIDs = Selection.instanceIDs;
    }

    // [ Private Variables ]

    private _selectionIDs : number[];

    // [ Private Functions ]
}
