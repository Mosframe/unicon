// -----------------------------------------------------------------------------
// hierarchy.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from '../gui/panel';
import { Button     as UIButton     }   from '../gui/button';
import { Number     as UINumber     }   from '../gui/number';
import { Div        as UIDiv        }   from '../gui/div';
import { Span       as UISpan       }   from '../gui/span';
import { Row        as UIRow        }   from '../gui/row';
import { Color      as UIColor      }   from '../gui/color';
import { Text       as UIText       }   from '../gui/text';
import { Break      as UIBreak      }   from '../gui/break';
import { Select     as UISelect     }   from '../gui/select';
import { Boolean    as UIBoolean    }   from '../gui/boolean';
import { Outliner   as UIOutliner   }   from '../gui/outliner';
import { IEditor                    }   from '../interface';
import { HierarchyPanel             }   from '../panels/hierarchy';
import { PropertiesPanel            }   from '../panels/properties';
import { AnimationPanel             }   from '../panels/animation';
import { ScriptPanel                }   from '../panels/script';
import { EditorWindow               }   from './editor';
/**
 * scene hierarchy window
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class HierarchyWindow
 * @extends {EditorWindow}
 */
export class HierarchyWindow extends EditorWindow {

    // [ Constructor ]

    constructor ( editor:IEditor ) {

        super( 'hierarchy',
            new HierarchyPanel( editor ),
            new PropertiesPanel( editor ),
            new AnimationPanel( editor ),
            new ScriptPanel( editor ),
        );
    }
}
