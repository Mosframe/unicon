// -----------------------------------------------------------------------------
// settings.ts
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
import { SettingsPanel              }   from '../panels/settings';
import { HistoryPanel               }   from '../panels/history';
import { EditorWindow               }   from './editor';
/**
 * settings window
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SettingWindow
 * @extends {UIPanel}
 */
export class SettingsWindow extends EditorWindow {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'settings',
            new SettingsPanel( editor ),
            new HistoryPanel( editor ),
        );
    }
}
