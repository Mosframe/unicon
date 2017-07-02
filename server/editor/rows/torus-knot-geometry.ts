// -----------------------------------------------------------------------------
// torus-knot-geometry.ts
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
 * torus knot geometry row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class TorusKnotGeometryRow
 * @extends {EditorRow}
 */
export class TorusKnotGeometryRow extends EditorRow {

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

        // tube

        let tubeRow = new UIRow();
        let tube = new UINumber( parameters.tube ).onChange( update );

        tubeRow.add( new UIText( 'Tube' ).setWidth( '90px' ) );
        tubeRow.add( tube );

        this.add( tubeRow );

        // tubularSegments

        let tubularSegmentsRow = new UIRow();
        let tubularSegments = new UIInteger( parameters.tubularSegments ).setRange( 1, Infinity ).onChange( update );

        tubularSegmentsRow.add( new UIText( 'Tubular segments' ).setWidth( '90px' ) );
        tubularSegmentsRow.add( tubularSegments );

        this.add( tubularSegmentsRow );

        // radialSegments

        let radialSegmentsRow = new UIRow();
        let radialSegments = new UIInteger( parameters.radialSegments ).setRange( 1, Infinity ).onChange( update );

        radialSegmentsRow.add( new UIText( 'Radial segments' ).setWidth( '90px' ) );
        radialSegmentsRow.add( radialSegments );

        this.add( radialSegmentsRow );

        // p

        let pRow = new UIRow();
        let p = new UINumber( parameters.p ).onChange( update );

        pRow.add( new UIText( 'P' ).setWidth( '90px' ) );
        pRow.add( p );

        this.add( pRow );

        // q

        let qRow = new UIRow();
        let q = new UINumber( parameters.q ).onChange( update );

        pRow.add( new UIText( 'Q' ).setWidth( '90px' ) );
        pRow.add( q );

        this.add( qRow );


        //

        function update() {

            editor.execute( new SetGeometryCommand( object, new THREE[ geometry.type ](
                radius.getValue(),
                tube.getValue(),
                tubularSegments.getValue(),
                radialSegments.getValue(),
                p.getValue(),
                q.getValue()
            ) ) );

        }
    }
}
