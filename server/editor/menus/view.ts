// -----------------------------------------------------------------------------
// view.ts
// -----------------------------------------------------------------------------
import *                as THREE                from 'three'                                    ;
import { WebVR                              }   from '../../engine/vr/web-vr'                   ;
import { Panel          as UIPanel          }   from '../../editor/gui/panel'                   ;
import { Row            as UIRow            }   from '../../editor/gui/row'                     ;
import { Button         as UIButton         }   from '../../editor/gui/button'                  ;
import { Number         as UINumber         }   from '../../editor/gui/number'                  ;
import { Text           as UIText           }   from '../../editor/gui/text'                    ;
import { Boolean        as UIBoolean        }   from '../../editor/gui/boolean'                 ;
import { HorizontalRule as UIHorizontalRule }   from '../../editor/gui/horizontal-rule'         ;
import { IEditor                            }   from '../interface'                             ;
import { Menu                               }   from './menu'                                   ;
/**
 * view menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class ViewMenu
 * @extends {Menu}
 */
export class ViewMenu extends Menu {

    constructor( editor:IEditor ) {
        super('view');

        let title = new UIPanel();
        title.setClass( 'title' );
        title.setTextContent( 'View' );
        this.add( title );

        let options = new UIPanel();
        options.setClass( 'options' );
        this.add( options );

        // [ VR mode ]

        let option = new UIRow();
        option.setClass( 'option' );
        option.setTextContent( 'VR mode' );
        option.onClick( () => {

            if ( WebVR.isAvailable() ) {
                editor.signals.enterVR.dispatch();
            } else {
                alert( 'WebVR not available' );
            }
        });
        options.add( option );

    }
}
