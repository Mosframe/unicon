// -----------------------------------------------------------------------------
// menu.ts
// -----------------------------------------------------------------------------
import * as THREE       from 'three'            ;
import { EditorPanel }  from '../editor-panel'  ;
/**
 * editor panel
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class EditorPanel
 * @extends {UIPanel}
 */
export class Menu extends EditorPanel {

    constructor( title:string ) {
        super( title );
        this.setClass( 'menu' );
    }
}