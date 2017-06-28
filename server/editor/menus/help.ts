// -----------------------------------------------------------------------------
// help.ts
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
import { Menu                               }   from './menu'                                   ;


/**
 * help menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class HelpMenu
 * @extends {Menu}
 */
export class HelpMenu extends Menu {

    constructor( editor:IEditor ) {
        super('help');

        // [ Title ]
        let title = new UIPanel();
        title.setClass( 'title' );
        title.setTextContent( 'Help' );
        this.add( title );

        // [ Options ]
        let options = new UIPanel();
        options.setClass( 'options' );
        this.add( options );

        // [ Source code - three.js ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Source code (three.js)' );
            option.onClick( () => {

                window.open( 'https://github.com/mrdoob/three.js/tree/master/editor', '_blank' )
            });
            options.add( option );
        }
        // [ Source code - Unicon ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'Source code (Unicon)' );
            option.onClick( () => {

                window.open( 'https://github.com/mosframe/unicon/tree/master/server/unicon-editor', '_blank' )
            });
            options.add( option );
        }

        // [ About ]
        {
            let option = new UIRow();
            option.setClass( 'option' );
            option.setTextContent( 'About (three.js)' );
            option.onClick( () => {

                window.open( 'http://threejs.org', '_blank' );
            });
            options.add( option );
        }
    }
}
