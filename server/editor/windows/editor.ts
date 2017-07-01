// -----------------------------------------------------------------------------
// editor.ts
// -----------------------------------------------------------------------------
import { Panel      as UIPanel      }   from '../gui/panel';
import { Span       as UISpan       }   from '../gui/span';
import { EditorPanel                }   from '../panels/editor';
/**
 * window
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Window
 * @extends {UISpan}
 */
export class EditorWindow extends UISpan {

    getPanel ( title:string ) : EditorPanel {
        return this._panels[title];
    }

    // [ Constructor ]

    constructor ( title:string, ...panels:EditorPanel[] ) {
        super();

        this.setTitle( title );

        for( let panel of panels ) {
            this._panels[panel.getTitle()] = panel;
            this.add( panel );
        }
    }

    protected _panels : {[title:string]:EditorPanel} = {}
}
