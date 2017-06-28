// -----------------------------------------------------------------------------
// examples.ts
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
 * examples menu
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class ExamplesMenu
 * @extends {Menu}
 */
export class ExamplesMenu extends Menu {

    constructor( editor:IEditor ) {
        super('examples');


    }
}
