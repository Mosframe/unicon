// -----------------------------------------------------------------------------
// material.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from '../../editor/gui/panel';
import { Button     as UIButton     }   from '../../editor/gui/button';
import { Number     as UINumber     }   from '../../editor/gui/number';
import { Div        as UIDiv        }   from '../../editor/gui/div';
import { Span       as UISpan       }   from '../../editor/gui/span';
import { Row        as UIRow        }   from '../../editor/gui/row';
import { Color      as UIColor      }   from '../../editor/gui/color';
import { Text       as UIText       }   from '../../editor/gui/text';
import { Break      as UIBreak      }   from '../../editor/gui/break';
import { Select     as UISelect     }   from '../../editor/gui/select';
import { Boolean    as UIBoolean    }   from '../../editor/gui/boolean';
import { Outliner   as UIOutliner   }   from '../../editor/gui/outliner';
import { IEditor                    }   from '../interface';
import { MaterialPanel              }   from '../panels/material';
import { EditorWindow               }   from './editor';


/**
 * material window
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class MaterialWindow
 * @extends {EditorWindow}
 */
export class MaterialWindow extends EditorWindow {

    // [ Constructor ]

    constructor ( editor:IEditor ) {

        super( 'material',
            new MaterialPanel( editor ),
        );
    }
}
