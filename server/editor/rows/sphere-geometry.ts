// -----------------------------------------------------------------------------
// sphere-geometry.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { toString                   }   from '../../engine/number';
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
import { Input      as UIInput      }   from '../gui/input';
import { Checkbox   as UICheckbox   }   from '../gui/checkbox';
import { TextArea   as UITextArea   }   from '../gui/text-area';
import { Outliner   as UIOutliner   }   from '../gui/outliner';
import { Integer    as UIInteger    }   from '../gui/integer';
import { SetGeometryCommand         }   from '../commands/set-geometry-command';
import { IEditor                    }   from '../interface';
import { ISignals                   }   from '../interface';
import { EditorRow                  }   from './editor';
/**
 * sphere geometry row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SphereGeometryRow
 * @extends {EditorRow}
 */
export class SphereGeometryRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor, object:any ) {
        super();

        let signals = editor.signals;
        let geometry = object.geometry;
        let parameters = geometry.parameters;

        // radius

        let radiusRow = new UIRow();
        let radius = new UINumber( parameters.radius ).onChange( update );

        radiusRow.add( new UIText( 'Radius' ).setWidth( '90px' ) );
        radiusRow.add( radius );

        this.add( radiusRow );

        // widthSegments

        let widthSegmentsRow = new UIRow();
        let widthSegments = new UIInteger( parameters.widthSegments ).setRange( 1, Infinity ).onChange( update );

        widthSegmentsRow.add( new UIText( 'Width segments' ).setWidth( '90px' ) );
        widthSegmentsRow.add( widthSegments );

        this.add( widthSegmentsRow );

        // heightSegments

        let heightSegmentsRow = new UIRow();
        let heightSegments = new UIInteger( parameters.heightSegments ).setRange( 1, Infinity ).onChange( update );

        heightSegmentsRow.add( new UIText( 'Height segments' ).setWidth( '90px' ) );
        heightSegmentsRow.add( heightSegments );

        this.add( heightSegmentsRow );

        // phiStart

        let phiStartRow = new UIRow();
        let phiStart = new UINumber( parameters.phiStart ).onChange( update );

        phiStartRow.add( new UIText( 'Phi start' ).setWidth( '90px' ) );
        phiStartRow.add( phiStart );

        this.add( phiStartRow );

        // phiLength

        let phiLengthRow = new UIRow();
        let phiLength = new UINumber( parameters.phiLength ).onChange( update );

        phiLengthRow.add( new UIText( 'Phi length' ).setWidth( '90px' ) );
        phiLengthRow.add( phiLength );

        this.add( phiLengthRow );

        // thetaStart

        let thetaStartRow = new UIRow();
        let thetaStart = new UINumber( parameters.thetaStart ).onChange( update );

        thetaStartRow.add( new UIText( 'Theta start' ).setWidth( '90px' ) );
        thetaStartRow.add( thetaStart );

        this.add( thetaStartRow );

        // thetaLength

        let thetaLengthRow = new UIRow();
        let thetaLength = new UINumber( parameters.thetaLength ).onChange( update );

        thetaLengthRow.add( new UIText( 'Theta length' ).setWidth( '90px' ) );
        thetaLengthRow.add( thetaLength );

        this.add( thetaLengthRow );


        //

        function update() {

            editor.execute( new SetGeometryCommand( object, new THREE[ geometry.type ](
                radius.getValue(),
                widthSegments.getValue(),
                heightSegments.getValue(),
                phiStart.getValue(),
                phiLength.getValue(),
                thetaStart.getValue(),
                thetaLength.getValue()
            ) ) );
        }
    }
}
