// -----------------------------------------------------------------------------
// buffer-geometry.ts
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
 * buffer geometry row
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class BufferGeometryRow
 * @extends {EditorRow}
 */
export class BufferGeometryRow extends EditorRow {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super();

        let update = ( object ) => {

            if ( object === null ) return; // objectSelected.dispatch( null )
            if ( object === undefined ) return;

            let geometry = object.geometry;
            if ( geometry instanceof THREE.BufferGeometry ) {

                this.clear();
                this.setDisplay( 'block' );

                let index = geometry.index;
                if ( index !== null ) {

                    let panel = new UIRow();
                    panel.add( new UIText( 'index' ).setWidth( '90px' ) );
                    panel.add( new UIText( toString( index.count ) ).setFontSize( '12px' ) );
                    this.add( panel );
                }

                let attributes = geometry.attributes;

                for ( let name in attributes ) {

                    let attribute = attributes[ name ];

                    let panel = new UIRow();
                    panel.add( new UIText( name ).setWidth( '90px' ) );
                    panel.add( new UIText( toString( attribute.count ) + ' (' + attribute.itemSize + ')' ).setFontSize( '12px' ) );
                    this.add( panel );
                }
            } else {
                this.setDisplay( 'none' );
            }
        }

        editor.signals.objectSelected.add( update );
        editor.signals.geometryChanged.add( update );
    }
}
