// -----------------------------------------------------------------------------
// setting-panel.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { System                     }   from '../../engine/system';
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
import { Checkbox   as UICheckbox   }   from '../../editor/gui/checkbox';
import { IEditor                    }   from '../interface';


/**
 * setting panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SettingPanel
 * @extends {UIPanel}
 */
export class SettingPanel extends UIPanel {

    constructor( editor:IEditor ) {
        super();

        let config = editor.config;

        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );

        // [ Theme Type ]
        let options = {
            'css/light.css' : 'light',
            'css/dark.css'  : 'dark'
        };

        // [ Theme ]
        let theme = new UISelect().setWidth( '150px' );
        theme.setOptions( options );
        if( config.getKey( 'theme' ) !== undefined ) {
            theme.setValue( config.getKey( 'theme' ) );
        }
        theme.onChange( () => {
            let value = theme.getValue();
            editor.setTheme( value );
            editor.config.setKey( 'theme', value );
        });

        let themeRow = new UIRow();
        themeRow.add( new UIText( 'Theme' ).setWidth( '90px' ) );
        themeRow.add( theme );

        this.add( themeRow );
    }
}