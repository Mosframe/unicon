// -----------------------------------------------------------------------------
// editor-window.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from './gui/panel';
import { Button     as UIButton     }   from './gui/button';
import { Number     as UINumber     }   from './gui/number';
import { Div        as UIDiv        }   from './gui/div';
import { Span       as UISpan       }   from './gui/span';
import { Row        as UIRow        }   from './gui/row';
import { Color      as UIColor      }   from './gui/color';
import { Text       as UIText       }   from './gui/text';
import { Break      as UIBreak      }   from './gui/break';
import { Select     as UISelect     }   from './gui/select';
import { Boolean    as UIBoolean    }   from './gui/boolean';
import { Outliner   as UIOutliner   }   from './gui/outliner';
import { IEditor                    }   from './interface';
import { EditorPanel                }   from './editor-panel';

/**
 * editor window
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class EditorWindow
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
