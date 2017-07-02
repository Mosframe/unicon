// -----------------------------------------------------------------------------
// lathe-geometry.ts
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
 * lathe geometry row
 *
 * @author rfm1201
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class LatheGeometryRow
 * @extends {EditorRow}
 */
export class LatheGeometryRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor, object:any ) {
        super();

        let signals = editor.signals;
        let geometry = object.geometry;
        let parameters = geometry.parameters;

        // segments

        let segmentsRow = new UIRow();
        let segments = new UIInteger( parameters.segments ).onChange( update );

        segmentsRow.add( new UIText( 'Segments' ).setWidth( '90px' ) );
        segmentsRow.add( segments );

        this.add( segmentsRow );

        // phiStart

        let phiStartRow = new UIRow();
        let phiStart = new UINumber( parameters.phiStart * 180 / Math.PI ).onChange( update );

        phiStartRow.add( new UIText( 'Phi start (°)' ).setWidth( '90px' ) );
        phiStartRow.add( phiStart );

        this.add( phiStartRow );

        // phiLength

        let phiLengthRow = new UIRow();
        let phiLength = new UINumber( parameters.phiLength * 180 / Math.PI ).onChange( update );

        phiLengthRow.add( new UIText( 'Phi length (°)' ).setWidth( '90px' ) );
        phiLengthRow.add( phiLength );

        this.add( phiLengthRow );

        // points

        let lastPointIdx = 0;
        let pointsUI : any = [];

        let pointsRow = new UIRow();
        pointsRow.add( new UIText( 'Points' ).setWidth( '90px' ) );

        let points = new UISpan().setDisplay( 'inline-block' );
        pointsRow.add( points );

        let pointsList = new UIDiv();
        points.add( pointsList );

        for ( let i = 0; i < parameters.points.length; i ++ ) {

            let point = parameters.points[ i ];
            pointsList.add( createPointRow( point.x, point.y ) );

        }

        let addPointButton = new UIButton( '+' ).onClick( function() {

            if( pointsUI.length === 0 ){

                pointsList.add( createPointRow( 0, 0 ) );

            } else {

                let point = pointsUI[ pointsUI.length - 1 ];

                pointsList.add( createPointRow( point.x.getValue(), point.y.getValue() ) );

            }

            update();

        });
        points.add( addPointButton );

        this.add( pointsRow );

        //

        function createPointRow( x, y ) {

            let pointRow = new UIDiv();
            let lbl = new UIText( (lastPointIdx + 1).toString() ).setWidth( '20px' );
            let txtX = new UINumber( x ).setRange( 0, Infinity ).setWidth( '40px' ).onChange( update );
            let txtY = new UINumber( y ).setWidth( '40px' ).onChange( update );
            let idx = lastPointIdx;
            let btn = new UIButton( '-' ).onClick( function() {

                deletePointRow( idx );

            } );

            pointsUI.push( { row: pointRow, lbl: lbl, x: txtX, y: txtY } );
            lastPointIdx ++;
            pointRow.add( lbl, txtX, txtY, btn );

            return pointRow;

        }

        function deletePointRow( idx ) {

            if ( ! pointsUI[ idx ] ) return;

            pointsList.remove( pointsUI[ idx ].row );
            pointsUI[ idx ] = null;

            update();

        }

        function update() {

            let points : any = [];
            let count = 0;

            for ( let i = 0; i < pointsUI.length; i ++ ) {

                let pointUI = pointsUI[ i ];

                if ( ! pointUI ) continue;

                points.push( new THREE.Vector2( pointUI.x.getValue(), pointUI.y.getValue() ) );
                count ++;
                pointUI.lbl.setValue( count );
            }

            editor.execute( new SetGeometryCommand( object, new THREE[ geometry.type ](
                points,
                segments.getValue(),
                phiStart.getValue() / 180 * Math.PI,
                phiLength.getValue() / 180 * Math.PI
            )));
        }
    }
}
