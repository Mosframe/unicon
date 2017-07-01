// -----------------------------------------------------------------------------
// geometry.ts
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
import { Input      as UIInput      }   from '../../editor/gui/input';
import { Checkbox   as UICheckbox   }   from '../../editor/gui/checkbox';
import { TextArea   as UITextArea   }   from '../../editor/gui/text-area';
import { Outliner   as UIOutliner   }   from '../../editor/gui/outliner';
import { SetPositionCommand         }   from '../../editor/commands/set-position-command';
import { SetRotationCommand         }   from '../../editor/commands/set-rotation-command';
import { SetScaleCommand            }   from '../../editor/commands/set-scale-command';
import { SetUuidCommand             }   from '../../editor/commands/set-uuid-command';
import { SetValueCommand            }   from '../../editor/commands/set-value-command';
import { SetColorCommand            }   from '../../editor/commands/set-color-command';

import { IEditor                    }   from '../interface';
import { ISignals                   }   from '../interface';
import { EditorPanel                }   from './editor';


/**
 * geometry panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class GeometryPanel
 * @extends {EditorPanel}
 */
export class GeometryPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'geometry' );

        this._editor     = editor;
        this._signals    = editor.signals;

    }

    // [ Private ]

    private _editor     : IEditor;
    private _signals    : ISignals;
}
