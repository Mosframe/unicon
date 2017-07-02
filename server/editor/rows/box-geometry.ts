// -----------------------------------------------------------------------------
// box-geometry.ts
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
 * box geometry row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class BoxGeometryRow
 * @extends {EditorRow}
 */
export class BoxGeometryRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor, object:any ) {
        super();

        let geometry    = object.geometry;
        let parameters  = geometry.parameters;

        // width

        let widthRow = new UIRow();
        let width = new UINumber( parameters.width ).onChange( update );
        widthRow.add( new UIText( 'Width' ).setWidth( '90px' ) );
        widthRow.add( width );
        this.add( widthRow );

        // height

        let heightRow = new UIRow();
        let height = new UINumber( parameters.height ).onChange( update );
        heightRow.add( new UIText( 'Height' ).setWidth( '90px' ) );
        heightRow.add( height );
        this.add( heightRow );

        // depth

        let depthRow = new UIRow();
        let depth = new UINumber( parameters.depth ).onChange( update );
        depthRow.add( new UIText( 'Depth' ).setWidth( '90px' ) );
        depthRow.add( depth );
        this.add( depthRow );

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

        // depthSegments

        let depthSegmentsRow = new UIRow();
        let depthSegments = new UIInteger( parameters.depthSegments ).setRange( 1, Infinity ).onChange( update );
        depthSegmentsRow.add( new UIText( 'Depth segments' ).setWidth( '90px' ) );
        depthSegmentsRow.add( depthSegments );
        this.add( depthSegmentsRow );

        function update () {

            editor.execute( new SetGeometryCommand( object, new THREE[ geometry.type ](
                width.getValue(),
                height.getValue(),
                depth.getValue(),
                widthSegments.getValue(),
                heightSegments.getValue(),
                depthSegments.getValue()
            )));
        }
    }
}
