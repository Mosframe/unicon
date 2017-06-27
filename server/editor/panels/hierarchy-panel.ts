// -----------------------------------------------------------------------------
// hierarchy-panel.ts
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
 * scene hierarchy panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class HierarchyPanel
 * @extends {EditorPanel}
 */
export class HierarchyPanel extends EditorPanel {

    // [ Constructor ]

    constructor ( editor:IEditor ) {
        super( 'hierarchy' );

        var signals = editor.signals;

        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );

        // outliner

        function buildOption( object, draggable ) {

            var option = document.createElement( 'div' );
            option.draggable = draggable;
            option.innerHTML = buildHTML( object );
            option['value'] = object.id;

            return option;
        }

        function getMaterialName( material ) {

            if ( Array.isArray( material ) ) {

                var array:any = [];

                for ( var i = 0; i < material.length; i ++ ) {

                    array.push( material[ i ].name );

                }

                return array.join( ',' );

            }

            return material.name;

        }

        function buildHTML( object ) {

            var html = '<span class="type ' + object.type + '"></span> ' + object.name;

            if ( object instanceof THREE.Mesh ) {

                var geometry = object.geometry;
                var material = object.material;

                html += ' <span class="type ' + geometry.type + '"></span> ' + geometry.name;
                html += ' <span class="type ' + material.type + '"></span> ' + getMaterialName( material );

            }

            html += getScript( object.uuid );

            return html;

        }

        function getScript( uuid ) {

            if ( editor.scripts[ uuid ] !== undefined ) {

                return ' <span class="type Script"></span>';

            }

            return '';

        }

        var ignoreObjectSelectedSignal = false;

        var outliner = new UIOutliner( editor );
        outliner.setId( 'outliner' );
        outliner.onChange( function () {

            ignoreObjectSelectedSignal = true;

            editor.selectById( parseInt( outliner.getValue() ) );

            ignoreObjectSelectedSignal = false;

        } );
        outliner.onDblClick( function () {

            editor.focusById( parseInt( outliner.getValue() ) );

        } );
        this.add( outliner );
        this.add( new UIBreak() );

        // background

        let backgroundRow = new UIRow();

        backgroundRow.add( new UIText( 'Background' ).setWidth( '90px' ) );
        let backgroundColor = new UIColor().setValue( '#aaaaaa' ).onChange( () => {
            signals.sceneBackgroundChanged.dispatch( backgroundColor.getHexValue() );
        });
        backgroundRow.add( backgroundColor );
        this.add( backgroundRow );

        // fog

        function onFogChanged() {

            signals.sceneFogChanged.dispatch(
                fogType.getValue(),
                fogColor.getHexValue(),
                fogNear.getValue(),
                fogFar.getValue(),
                fogDensity.getValue()
            );
        }

        var fogTypeRow = new UIRow();
        var fogType = new UISelect().setOptions( {

            'None': 'None',
            'Fog': 'Linear',
            'FogExp2': 'Exponential'

        } ).setWidth( '150px' );
        fogType.onChange( () => {
            onFogChanged();
            refreshFogUI();
        });

        fogTypeRow.add( new UIText( 'Fog' ).setWidth( '90px' ) );
        fogTypeRow.add( fogType );

        this.add( fogTypeRow );

        // fog color

        var fogPropertiesRow = new UIRow();
        fogPropertiesRow.setDisplay( 'none' );
        fogPropertiesRow.setMarginLeft( '90px' );
        this.add( fogPropertiesRow );

        var fogColor = new UIColor().setValue( '#aaaaaa' );
        fogColor.onChange( onFogChanged );
        fogPropertiesRow.add( fogColor );

        // fog near

        var fogNear = new UINumber( 0.1 ).setWidth( '40px' ).setRange( 0, Infinity ).onChange( onFogChanged );
        fogPropertiesRow.add( fogNear );

        // fog far

        var fogFar = new UINumber( 50 ).setWidth( '40px' ).setRange( 0, Infinity ).onChange( onFogChanged );
        fogPropertiesRow.add( fogFar );

        // fog density

        var fogDensity = new UINumber( 0.05 ).setWidth( '40px' ).setRange( 0, 0.1 ).setPrecision( 3 ).onChange( onFogChanged );
        fogPropertiesRow.add( fogDensity );

        //

        function refreshUI() {

            var camera = editor.camera;
            var scene = editor.scene;

            var options:any = [];

            options.push( buildOption( camera, false ) );
            options.push( buildOption( scene, false ) );

            ( function addObjects( objects, pad ) {

                for ( var i = 0, l = objects.length; i < l; i ++ ) {

                    var object = objects[ i ];

                    var option = buildOption( object, true );
                    option.style.paddingLeft = ( pad * 10 ) + 'px';
                    options.push( option );

                    addObjects( object.children, pad + 1 );

                }

            } )( scene.children, 1 );

            outliner.setOptions( options );

            if ( editor.selected !== null ) {

                outliner.setValue( editor.selected.id );

            }

            if ( scene.background ) {

                backgroundColor.setHexValue( scene.background.getHex() );

            }

            if ( scene.fog ) {

                fogColor.setHexValue( scene.fog.color.getHex() );

                if ( scene.fog instanceof THREE.Fog ) {

                    fogType.setValue( "Fog" );
                    fogNear.setValue( scene.fog.near );
                    fogFar.setValue( scene.fog.far );

                } else if ( scene.fog instanceof THREE.FogExp2 ) {

                    fogType.setValue( "FogExp2" );
                    fogDensity.setValue( scene.fog.density );

                }

            } else {

                fogType.setValue( "None" );

            }

            refreshFogUI();

        }

        function refreshFogUI() {

            var type = fogType.getValue();

            fogPropertiesRow.setDisplay( type === 'None' ? 'none' : '' );
            fogNear.setDisplay( type === 'Fog' ? '' : 'none' );
            fogFar.setDisplay( type === 'Fog' ? '' : 'none' );
            fogDensity.setDisplay( type === 'FogExp2' ? '' : 'none' );

        }

        refreshUI();

        // events

        signals.editorCleared.add( refreshUI );

        signals.sceneGraphChanged.add( refreshUI );

        signals.objectChanged.add( function ( object ) {

            var options = outliner.options;

            for ( var i = 0; i < options.length; i ++ ) {

                var option = options[ i ];

                if ( option.value === object.id ) {

                    option.innerHTML = buildHTML( object );
                    return;

                }

            }

        } );

        signals.objectSelected.add( function ( object ) {

            if ( ignoreObjectSelectedSignal === true ) return;

            outliner.setValue( object !== null ? object.id : null );

        });
    }
}
