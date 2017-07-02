// -----------------------------------------------------------------------------
// animation.ts
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
import { AnimationPanel             }   from '../panels/animation';
import { PropertiesPanel            }   from '../panels/properties';
import { EditorWindow               }   from './editor';
/**
 * animation window
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class AnimationWindow
 * @extends {EditorWindow}
 */
export class AnimationWindow extends EditorWindow {

    // [ Constructor ]

    constructor ( editor:IEditor ) {

        super( 'animation',
            new AnimationPanel( editor ),
        );
    }
}
