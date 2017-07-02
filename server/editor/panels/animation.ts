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
import { EditorPanel                }   from './editor';


/**
 * animation panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class AnimationPanel
 * @extends {EditorPanel}
 */
export class AnimationPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'animation' );

        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );
        this.setPaddingRight( '0px' );

        let options = {};
        let possibleAnimations = {};

        this.setDisplay( 'none' );

        this.add( new UIText( 'Animation' ).setTextTransform( 'uppercase' ) );
        this.add( new UIBreak() );
        this.add( new UIBreak() );

        let animationsRow = new UIRow();
        this.add( animationsRow );
    }
}
