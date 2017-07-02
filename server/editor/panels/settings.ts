// -----------------------------------------------------------------------------
// settings.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { System                     }   from '../../engine/system';
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
import { Checkbox   as UICheckbox   }   from '../gui/checkbox';
import { IEditor                    }   from '../interface';
import { EditorPanel                }   from './editor';


/**
 * settings panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SettingsPanel
 * @extends {EditorPanel}
 */
export class SettingsPanel extends EditorPanel {

    constructor( editor:IEditor ) {
        super('settings');

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