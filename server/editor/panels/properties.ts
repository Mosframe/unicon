// -----------------------------------------------------------------------------
// properties.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
import { Panel      as UIPanel      }   from '../../editor/gui/panel';
import { Button     as UIButton     }   from '../../editor/gui/button';
import { Number     as UINumber     }   from '../../editor/gui/number';
import { Div        as UIDiv        }   from '../../editor/gui/div';
import { Span       as UISpan       }   from '../../editor/gui/span';
import { Row        as UIRow        }   from '../../editor/gui/row';
import { Color      as UIColor      }   from '../../editor/gui/color';
import { Text       as UIText       }   from '../../editor/gui/text';
import { Break      as UIBreak      }   from '../../editor/gui/break';
import { Select     as UISelect     }   from '../../editor/gui/select';
import { Boolean    as UIBoolean    }   from '../../editor/gui/boolean';
import { Outliner   as UIOutliner   }   from '../../editor/gui/outliner';
import { IEditor                    }   from '../interface';
import { EditorPanel                }   from '../editor-panel';


/**
 * properties panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class PropertiesPanel
 * @extends {EditorPanel}
 */
export class PropertiesPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'properties' );

        var signals = editor.signals;

        var container = new UISpan();

        var objectTab = new UIText( 'OBJECT' ).onClick( onClick );
        var geometryTab = new UIText( 'GEOMETRY' ).onClick( onClick );
        var materialTab = new UIText( 'MATERIAL' ).onClick( onClick );

        var tabs = new UIDiv();
        tabs.setId( 'tabs' );
        tabs.add( objectTab, geometryTab, materialTab );
        container.add( tabs );

        function onClick( event ) {

            select( event.target.textContent );

        }

        //

        var object = new UISpan().add(
            //new Sidebar.Object( editor )
        );
        container.add( object );

        var geometry = new UISpan().add(
            //new Sidebar.Geometry( editor )
        );
        container.add( geometry );

        var material = new UISpan().add(
            //new Sidebar.Material( editor )
        );
        container.add( material );

        //

        function select( section ) {

            objectTab.setClass( '' );
            geometryTab.setClass( '' );
            materialTab.setClass( '' );

            object.setDisplay( 'none' );
            geometry.setDisplay( 'none' );
            material.setDisplay( 'none' );

            switch ( section ) {
                case 'OBJECT':
                    objectTab.setClass( 'selected' );
                    object.setDisplay( '' );
                    break;
                case 'GEOMETRY':
                    geometryTab.setClass( 'selected' );
                    geometry.setDisplay( '' );
                    break;
                case 'MATERIAL':
                    materialTab.setClass( 'selected' );
                    material.setDisplay( '' );
                    break;
            }

        }

        select( 'OBJECT' );

    }
}
