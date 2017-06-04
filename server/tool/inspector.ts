// -----------------------------------------------------------------------------
// inspector.ts
// -----------------------------------------------------------------------------
import * as GL            from '../engine/graphic';

import {Camera          } from '../engine/camera';
import {GameObject      } from '../engine/game-object';
import {PrimitiveType   } from '../engine/primitive-type';
import {Light           } from '../engine/light';
import {MeshRenderer    } from '../engine/mesh-renderer';
import {Renderer        } from '../engine/renderer';
import {Scene           } from '../engine/scene';
import {Transform       } from '../engine/transform';

import {EditorWindow    } from '../editor/editor-window';
import {OrbitControls   } from '../editor/orbit-controls';
import {Selection       } from '../editor/selection';
import {Tools           } from '../editor/tools';
import {ViewTool        } from '../editor/view-tool';

import {Window          } from './window';


/**
 * inspector window
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Inspector
 * @extends {EditorWindow}
 */
export class Inspector extends Window {

    // [ Public Functions ]

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
        //EditorPrefs.SetString("SelectedIDs", saveStr);
    }
    /**
     *
     *
     *
     * @memberof Inspector
     */
    loadSelection(){
        //let strIDs:string[] = EditorPrefs.GetString("_selectionIDs").Split(char.Parse(";"));

        //let ids:number[] = [strIDs.length];
        //
        //for( let i=0; i < strIDs.length; ++i ) {
        //   ids[i] = Number.parseInt( strIDs[i] );
        //}
        //Selection.instanceIDs = ids;
    }

    onInspectorUpdate() {
        //super.onInspectorUpdate();

        if( Selection.activeContext )
        {
            if( Selection.activeContext instanceof Transform ) {
                let transform = <Transform>Selection.activeContext;
                transform.rotation.x += 0.1;
            }
        }

        this.repaint();
    }

    /**
     * render
     *
     *
     * @memberof Unicon
     */
    render() {
    }

    onSelectionChange() {
        super.onSelectionChange();
        this._selectionIDs = Selection.instanceIDs;
    }

    // [ Private Variables ]

    private _selectionIDs : string[] = [];

    // [ Private Functions ]
}
