// -----------------------------------------------------------------------------
// plane-geometry.ts
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
 * plane geometry row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class PlaneGeometryRow
 * @extends {EditorRow}
 */
export class PlaneGeometryRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor, object:any ) {
        super();

        let signals = editor.signals;
        let geometry = object.geometry;
        let parameters = geometry.parameters;

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


        //

        function update() {

            editor.execute( new SetGeometryCommand( object, new THREE[ geometry.type ](
                width.getValue(),
                height.getValue(),
                widthSegments.getValue(),
                heightSegments.getValue()
            ) ) );
        }
    }
}
