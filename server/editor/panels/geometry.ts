// -----------------------------------------------------------------------------
// geometry.ts
// -----------------------------------------------------------------------------
import *            as THREE                from 'three';
import { Panel      as UIPanel          }   from '../gui/panel';
import { Button     as UIButton         }   from '../gui/button';
import { Number     as UINumber         }   from '../gui/number';
import { Div        as UIDiv            }   from '../gui/div';
import { Span       as UISpan           }   from '../gui/span';
import { Row        as UIRow            }   from '../gui/row';
import { Color      as UIColor          }   from '../gui/color';
import { Text       as UIText           }   from '../gui/text';
import { Break      as UIBreak          }   from '../gui/break';
import { Select     as UISelect         }   from '../gui/select';
import { Boolean    as UIBoolean        }   from '../gui/boolean';
import { Input      as UIInput          }   from '../gui/input';
import { Checkbox   as UICheckbox       }   from '../gui/checkbox';
import { TextArea   as UITextArea       }   from '../gui/text-area';
import { Outliner   as UIOutliner       }   from '../gui/outliner';
import { SetGeometryValueCommand        }   from '../commands/set-geometry-value-command';
import { GeometryRow                    }   from '../rows/geometry';
import { BufferGeometryRow              }   from '../rows/buffer-geometry';
import { GeometryModifiersRow           }   from '../rows/geometry-modifiers';
import { BoxGeometryRow                 }   from '../rows/box-geometry';
import { BoxBufferGeometryRow           }   from '../rows/box-buffer-geometry';
import { CircleGeometryRow              }   from '../rows/circle-geometry';
import { CircleBufferGeometryRow        }   from '../rows/circle-buffer-geometry';
import { CylinderGeometryRow            }   from '../rows/cylinder-geometry';
import { CylinderBufferGeometryRow      }   from '../rows/cylinder-buffer-geometry';
import { IcosahedronGeometryRow         }   from '../rows/icosahedron-geometry';
import { IcosahedronBufferGeometryRow   }   from '../rows/icosahedron-buffer-geometry';
import { LatheGeometryRow               }   from '../rows/lathe-geometry';
import { LatheBufferGeometryRow         }   from '../rows/lathe-buffer-geometry';
import { PlaneGeometryRow               }   from '../rows/plane-geometry';
import { PlaneBufferGeometryRow         }   from '../rows/plane-buffer-geometry';
import { SphereGeometryRow              }   from '../rows/sphere-geometry';
import { SphereBufferGeometryRow        }   from '../rows/sphere-buffer-geometry';
import { TorusGeometryRow               }   from '../rows/torus-geometry';
import { TorusBufferGeometryRow         }   from '../rows/torus-buffer-geometry';
import { TorusKnotGeometryRow           }   from '../rows/torus-knot-geometry';
import { TorusKnotBufferGeometryRow     }   from '../rows/torus-knot-buffer-geometry';
import { IEditor                        }   from '../interface';
import { ISignals                       }   from '../interface';
import { EditorPanel                    }   from './editor';


/**
 * geometry panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class GeometryPanel
 * @extends {EditorPanel}
 */
export class GeometryPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'geometry' );

        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );
        this.setPaddingRight( '0px' );

        let geometryTypeRow = new UIRow();
        let geometryType = new UIText();

        geometryTypeRow.add( new UIText( 'Type' ).setWidth( '90px' ) );
        geometryTypeRow.add( geometryType );

        this.add( geometryTypeRow );

        // uuid

        let geometryUUIDRow = new UIRow();
        let geometryUUID = new UIInput().setWidth( '102px' ).setFontSize( '12px' ).setDisabled( true );
        let geometryUUIDRenew = new UIButton( 'New' ).setMarginLeft( '7px' ).onClick( function () {

            geometryUUID.setValue( THREE.Math.generateUUID() );

            editor.execute( new SetGeometryValueCommand( editor.selected, 'uuid', geometryUUID.getValue() ) );

        } );

        geometryUUIDRow.add( new UIText( 'UUID' ).setWidth( '90px' ) );
        geometryUUIDRow.add( geometryUUID );
        geometryUUIDRow.add( geometryUUIDRenew );

        this.add( geometryUUIDRow );

        // name

        let geometryNameRow = new UIRow();
        let geometryName = new UIInput().setWidth( '150px' ).setFontSize( '12px' ).onChange( function () {

            editor.execute( new SetGeometryValueCommand( editor.selected, 'name', geometryName.getValue() ) );

        } );

        geometryNameRow.add( new UIText( 'Name' ).setWidth( '90px' ) );
        geometryNameRow.add( geometryName );

        this.add( geometryNameRow );

        // geometry

        this.add( new GeometryRow( editor ) );

        // buffergeometry

        this.add( new BufferGeometryRow( editor ) );

        // parameters

        let parameters = new UISpan();
        this.add( parameters );


        let build = () => {

            let object = <any>editor.selected;
            if ( object && object.geometry ) {

                let geometry:THREE.Geometry = object.geometry;

                this.setDisplay( 'block' );

                geometryType.setValue( geometry.type );
                geometryUUID.setValue( geometry.uuid );
                geometryName.setValue( geometry.name );

                //
                parameters.clear();

                switch( geometry.type ) {

                case 'Geometry'                     : parameters.add( new GeometryModifiersRow         ( editor, object ) ); break;
                case 'BoxGeometry'                  : parameters.add( new BoxGeometryRow               ( editor, object ) ); break;
                case 'CircleGeometry'               : parameters.add( new CircleGeometryRow            ( editor, object ) ); break;
                case 'CylinderGeometry'             : parameters.add( new CylinderGeometryRow          ( editor, object ) ); break;
                case 'IcosahedronGeometry'          : parameters.add( new IcosahedronGeometryRow       ( editor, object ) ); break;
                case 'LatheGeometry'                : parameters.add( new LatheGeometryRow             ( editor, object ) ); break;
                case 'PlaneGeometry'                : parameters.add( new PlaneGeometryRow             ( editor, object ) ); break;
                case 'SphereGeometry'               : parameters.add( new SphereGeometryRow            ( editor, object ) ); break;
                case 'TorusGeometry'                : parameters.add( new TorusGeometryRow             ( editor, object ) ); break;
                case 'TorusKnotGeometry'            : parameters.add( new TorusKnotGeometryRow         ( editor, object ) ); break;

                case 'BufferGeometry'               : parameters.add( new GeometryModifiersRow         ( editor, object ) ); break;
                case 'BoxBufferGeometry'            : parameters.add( new BoxBufferGeometryRow         ( editor, object ) ); break;
                case 'CircleBufferGeometry'         : parameters.add( new CircleBufferGeometryRow      ( editor, object ) ); break;
                case 'CylinderBufferGeometry'       : parameters.add( new CylinderBufferGeometryRow    ( editor, object ) ); break;
                case 'IcosahedronBufferGeometry'    : parameters.add( new IcosahedronBufferGeometryRow ( editor, object ) ); break;
                case 'LatheBufferGeometry'          : parameters.add( new LatheBufferGeometryRow       ( editor, object ) ); break;
                case 'PlaneBufferGeometry'          : parameters.add( new PlaneBufferGeometryRow       ( editor, object ) ); break;
                case 'SphereBufferGeometry'         : parameters.add( new SphereBufferGeometryRow      ( editor, object ) ); break;
                case 'TorusBufferGeometry'          : parameters.add( new TorusBufferGeometryRow       ( editor, object ) ); break;
                case 'TorusKnotBufferGeometry'      : parameters.add( new TorusKnotBufferGeometryRow   ( editor, object ) ); break;
                }

            } else {
                this.setDisplay( 'none' );
            }
        }

        editor.signals.objectSelected.add( build );
        editor.signals.geometryChanged.add( build );

    }
}
