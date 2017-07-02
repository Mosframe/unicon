// -----------------------------------------------------------------------------
// cylinder-geometry.ts
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
 * cylinder geometry row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class CylinderGeometryRow
 * @extends {EditorRow}
 */
export class CylinderGeometryRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor, object:any ) {
        super();

        let signals = editor.signals;

        let geometry = object.geometry;
        let parameters = geometry.parameters;

        // radiusTop

        let radiusTopRow = new UIRow();
        let radiusTop = new UINumber( parameters.radiusTop ).onChange( update );

        radiusTopRow.add( new UIText( 'Radius top' ).setWidth( '90px' ) );
        radiusTopRow.add( radiusTop );

        this.add( radiusTopRow );

        // radiusBottom

        let radiusBottomRow = new UIRow();
        let radiusBottom = new UINumber( parameters.radiusBottom ).onChange( update );

        radiusBottomRow.add( new UIText( 'Radius bottom' ).setWidth( '90px' ) );
        radiusBottomRow.add( radiusBottom );

        this.add( radiusBottomRow );

        // height

        let heightRow = new UIRow();
        let height = new UINumber( parameters.height ).onChange( update );

        heightRow.add( new UIText( 'Height' ).setWidth( '90px' ) );
        heightRow.add( height );

        this.add( heightRow );

        // radialSegments

        let radialSegmentsRow = new UIRow();
        let radialSegments = new UIInteger( parameters.radialSegments ).setRange( 1, Infinity ).onChange( update );

        radialSegmentsRow.add( new UIText( 'Radial segments' ).setWidth( '90px' ) );
        radialSegmentsRow.add( radialSegments );

        this.add( radialSegmentsRow );

        // heightSegments

        let heightSegmentsRow = new UIRow();
        let heightSegments = new UIInteger( parameters.heightSegments ).setRange( 1, Infinity ).onChange( update );

        heightSegmentsRow.add( new UIText( 'Height segments' ).setWidth( '90px' ) );
        heightSegmentsRow.add( heightSegments );

        this.add( heightSegmentsRow );

        // openEnded

        let openEndedRow = new UIRow();
        let openEnded = new UICheckbox( parameters.openEnded ).onChange( update );

        openEndedRow.add( new UIText( 'Open ended' ).setWidth( '90px' ) );
        openEndedRow.add( openEnded );

        this.add( openEndedRow );

        //

        function update() {

            editor.execute( new SetGeometryCommand( object, new THREE[ geometry.type ](
                radiusTop.getValue(),
                radiusBottom.getValue(),
                height.getValue(),
                radialSegments.getValue(),
                heightSegments.getValue(),
                openEnded.getValue()
            ) ) );

        }

    }
}
