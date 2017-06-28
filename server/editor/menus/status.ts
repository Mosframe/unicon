// -----------------------------------------------------------------------------
// status.ts
// -----------------------------------------------------------------------------
import *                as THREE                from 'three'                                    ;
import { Panel          as UIPanel          }   from '../../editor/gui/panel'                   ;
import { Row            as UIRow            }   from '../../editor/gui/row'                     ;
import { Button         as UIButton         }   from '../../editor/gui/button'                  ;
import { Number         as UINumber         }   from '../../editor/gui/number'                  ;
import { Text           as UIText           }   from '../../editor/gui/text'                    ;
import { Boolean        as UIBoolean        }   from '../../editor/gui/boolean'                 ;
import { HorizontalRule as UIHorizontalRule }   from '../../editor/gui/horizontal-rule'         ;
import { IEditor                            }   from '../interface'                             ;
import { AddObjectCommand                   }   from '../commands/add-object-command'           ;
import { RemoveObjectCommand                }   from '../commands/remove-object-command'        ;
import { SetMaterialValueCommand            }   from '../commands/set-material-value-command'   ;
import { MultiCmdsCommand                   }   from '../commands/multi-cmds-command'           ;
import { Menu                               }   from './menu'                                   ;


/**
 * status menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class StatusMenu
 * @extends {Menu}
 */
export class StatusMenu extends Menu {

    constructor( editor:IEditor ) {
        super('status');
        this.setClass( 'menu right' );

        let autosave = new UIBoolean( editor.config.getKey( 'autosave' ), 'autosave' );
        autosave.text.setColor( '#888' );
        autosave.onChange( () => {

            let value = autosave.getValue();
            editor.config.setKey( 'autosave', value );
            if ( value ) {
                editor.signals.sceneGraphChanged.dispatch();
            }
        });
        this.add( autosave );

        editor.signals.savingStarted.add( () => {

            autosave.text.setTextDecoration( 'underline' );
        });

        editor.signals.savingFinished.add( () => {

            autosave.text.setTextDecoration( 'none' );
        });

        let version = new UIText( 'r' + THREE.REVISION );
        version.setClass( 'title' );
        version.setOpacity( '0.5' );
        this.add( version );
    }
}
