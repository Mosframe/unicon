// -----------------------------------------------------------------------------
// geometry.ts
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
import { SetGeometryValueCommand    }   from '../commands/set-geometry-value-command';
import { IEditor                    }   from '../interface';
import { ISignals                   }   from '../interface';
import { EditorRow                  }   from './editor';


/**
 * geometry row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class GeometryRow
 * @extends {EditorRow}
 */
export class GeometryRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super();

        let signals = editor.signals;

        // vertices

        let verticesRow = new UIRow();
        let vertices = new UIText();

        verticesRow.add( new UIText( 'Vertices' ).setWidth( '90px' ) );
        verticesRow.add( vertices );

        this.add( verticesRow );

        // faces

        let facesRow = new UIRow();
        let faces = new UIText();

        facesRow.add( new UIText( 'Faces' ).setWidth( '90px' ) );
        facesRow.add( faces );

        this.add( facesRow );

        //

        let update = ( object ) => {

            if ( object === null ) return; // objectSelected.dispatch( null )
            if ( object === undefined ) return;

            let geometry = object.geometry;

            if ( geometry instanceof THREE.Geometry ) {

                this.setDisplay( 'block' );

                vertices.setValue( toString( geometry.vertices.length ) );
                faces.setValue( toString( geometry.faces.length ) );

            } else {

                this.setDisplay( 'none' );

            }

        }

        signals.objectSelected.add( update );
        signals.geometryChanged.add( update );
    }
}
