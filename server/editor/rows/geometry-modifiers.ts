// -----------------------------------------------------------------------------
// geometry-modifiers.ts
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
import { IEditor                    }   from '../interface';
import { ISignals                   }   from '../interface';
import { EditorRow                  }   from './editor';
/**
 * geometry modifiers row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class GeometryModifiersRow
 * @extends {EditorRow}
 */
export class GeometryModifiersRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor, object:any ) {
        super();

        let signals = editor.signals;

        this.setPaddingLeft( '90px' );

        let geometry = object.geometry;

        // Compute Vertex Normals

        let button = new UIButton( 'Compute Vertex Normals' );
        button.onClick( () => {

            geometry.computeVertexNormals();

            if ( geometry instanceof THREE.BufferGeometry ) {
                let attributes:any = geometry.attributes;
                attributes.normal.needsUpdate = true;

            } else {

                geometry.normalsNeedUpdate = true;

            }

            signals.geometryChanged.dispatch( object );

        });

        this.add( button );
    }
}
