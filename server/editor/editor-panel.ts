// -----------------------------------------------------------------------------
// editor-panel.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from '../editor/gui/panel';
/**
 * editor panel
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class EditorPanel
 * @extends {UIPanel}
 */
export class EditorPanel extends UIPanel {

    constructor( title:string ) {
        super();
        this.setTitle( title );
    }
}