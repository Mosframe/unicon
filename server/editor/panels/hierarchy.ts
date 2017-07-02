// -----------------------------------------------------------------------------
// hierarchy.ts
// -----------------------------------------------------------------------------
import *            as THREE            from 'three';
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
import { Outliner   as UIOutliner   }   from '../gui/outliner';
import { IEditor                    }   from '../interface';
import { ISignals                   }   from '../interface';
import { EditorPanel                }   from './editor';


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

        this._editor     = editor;
        this._signals    = editor.signals;
        this.setBorderTop( '0' );
        this.setPaddingTop( '20px' );

        this._ignoreObjectSelectedSignal = false;

        // [ outliner ]

        this._outliner = new UIOutliner( editor );
        this._outliner.setId( 'outliner' );
        this._outliner.onChange( () => {
            this._ignoreObjectSelectedSignal = true;
            this._editor.selectById( parseInt( this._outliner.getValue() ) );
            this._ignoreObjectSelectedSignal = false;
        });
        this._outliner.onDblClick( () => {
            this._editor.focusById( parseInt( this._outliner.getValue() ) );
        });
        this.add( this._outliner );
        this.add( new UIBreak() );

        // [ background ]

        let backgroundRow = new UIRow();

        backgroundRow.add( new UIText( 'Background' ).setWidth( '90px' ) );
        this._backgroundColor = new UIColor();
        this._backgroundColor.setValue( '#aaaaaa' ).onChange( () => {
            this._signals.sceneBackgroundChanged.dispatch( this._backgroundColor.getHexValue() );
        });
        backgroundRow.add( this._backgroundColor );
        this.add( backgroundRow );

        // [ fog ]

        this._fogTypeRow  = new UIRow();
        this._fogType     = new UISelect().setOptions( {
            'None'      : 'None',
            'Fog'       : 'Linear',
            'FogExp2'   : 'Exponential'
        }).setWidth( '150px' );
        this._fogType.onChange( () => {
            this._onFogChanged();
            this._refreshFogUI();
        });
        this._fogTypeRow.add( new UIText( 'Fog' ).setWidth( '90px' ) );
        this._fogTypeRow.add( this._fogType );
        this.add( this._fogTypeRow );

        // fog color

        this._fogPropertiesRow = new UIRow();
        this._fogPropertiesRow.setDisplay( 'none' );
        this._fogPropertiesRow.setMarginLeft( '90px' );
        this.add( this._fogPropertiesRow );

        this._fogColor = new UIColor().setValue( '#aaaaaa' );
        this._fogColor.onChange( this._onFogChanged );
        this._fogPropertiesRow.add( this._fogColor );

        // fog near

        this._fogNear = new UINumber( 0.1 ).setWidth( '40px' ).setRange( 0, Infinity ).onChange( this._onFogChanged );
        this._fogPropertiesRow.add( this._fogNear );

        // fog far

        this._fogFar = new UINumber( 50 ).setWidth( '40px' ).setRange( 0, Infinity ).onChange( this._onFogChanged );
        this._fogPropertiesRow.add( this._fogFar );

        // fog density

        this._fogDensity = new UINumber( 0.05 ).setWidth( '40px' ).setRange( 0, 0.1 ).setPrecision( 3 ).onChange( this._onFogChanged );
        this._fogPropertiesRow.add( this._fogDensity );

        //
        this._refreshUI();

        // events

        this._signals.editorCleared.add( this._refreshUI );
        this._signals.sceneGraphChanged.add( this._refreshUI );
        this._signals.objectChanged.add( ( object ) => {

            let options = this._outliner.options;

            for ( let i = 0; i < options.length; i ++ ) {
                let option = options[ i ];
                if ( option.value === object.id ) {
                    option.innerHTML = this._buildHTML( object );
                    return;
                }
            }
        });

        this._signals.objectSelected.add( ( object ) => {
            if ( this._ignoreObjectSelectedSignal === true ) return;
            this._outliner.setValue( object !== null ? object.id : null );
        });
    }


    // [ Private ]

    private _editor                     : IEditor;
    private _signals                    : ISignals;
    private _ignoreObjectSelectedSignal : boolean;

    private _outliner                   : UIOutliner;

    private _backgroundColor            : UIColor;

    private _fogTypeRow                 : UIRow;
    private _fogType                    : UISelect;
    private _fogPropertiesRow           : UIRow;
    private _fogColor                   : UIColor;
    private _fogNear                    : UINumber;
    private _fogFar                     : UINumber;
    private _fogDensity                 : UINumber;

    private _buildOption ( object, draggable ) {

        let option = document.createElement( 'div' );
        option.draggable = draggable;
        option.innerHTML = this._buildHTML( object );
        option['value'] = object.id;

        return option;
    }

    private _getMaterialName ( material ) {

        if ( Array.isArray( material ) ) {
            let array:any = [];
            for ( let i = 0; i < material.length; i ++ ) {
                array.push( material[ i ].name );
            }
            return array.join( ',' );
        }
        return material.name;
    }

    private _buildHTML ( object ) {

        let html = '<span class="type ' + object.type + '"></span> ' + object.name;

        if ( object instanceof THREE.Mesh ) {

            let geometry = object.geometry;
            let material = object.material;

            html += ' <span class="type ' + geometry.type + '"></span> ' + geometry.name;
            html += ' <span class="type ' + material.type + '"></span> ' + this._getMaterialName( material );

        }

        html += this._getScript( object.uuid );

        return html;

    }

    private _getScript ( uuid ) {

        if ( this._editor.scripts[ uuid ] !== undefined ) {
            return ' <span class="type Script"></span>';
        }
        return '';
    }


    private _onFogChanged = () => {

        this._signals.sceneFogChanged.dispatch(
            this._fogType.getValue(),
            this._fogColor.getHexValue(),
            this._fogNear.getValue(),
            this._fogFar.getValue(),
            this._fogDensity.getValue()
        );
    }

    private _addObjects = ( options, objects, pad ) => {

        for ( let i = 0, l = objects.length; i < l; i ++ ) {

            let object = objects[ i ];
            let option = this._buildOption( object, true );
            option.style.paddingLeft = ( pad * 10 ) + 'px';
            options.push( option );

            this._addObjects( options, object.children, pad + 1 );
        }
    }

    private _refreshUI = () => {

        let camera = this._editor.camera;
        let scene = this._editor.scene;

        let options:any = [];

        options.push( this._buildOption( camera, false ) );
        options.push( this._buildOption( scene, false ) );

        this._addObjects( options, scene.children, 1 );

        this._outliner.setOptions( options );

        if ( this._editor.selected !== null ) {

            this._outliner.setValue( this._editor.selected.id );
        }

        if ( scene.background ) {
            this._backgroundColor.setHexValue( scene.background.getHex() );
        }

        if ( scene.fog ) {

            this._fogColor.setHexValue( scene.fog.color.getHex() );

            if ( scene.fog instanceof THREE.Fog ) {

                this._fogType.setValue( "Fog" );
                this._fogNear.setValue( scene.fog.near );
                this._fogFar.setValue( scene.fog.far );

            } else if ( scene.fog instanceof THREE.FogExp2 ) {

                this._fogType.setValue( "FogExp2" );
                this._fogDensity.setValue( scene.fog.density );

            }

        } else {
            this._fogType.setValue( "None" );
        }

        this._refreshFogUI();

    }

    private _refreshFogUI = () => {

        let type = this._fogType.getValue();
        this._fogPropertiesRow.setDisplay( type === 'None' ? 'none' : '' );
        this._fogNear.setDisplay( type === 'Fog' ? '' : 'none' );
        this._fogFar.setDisplay( type === 'Fog' ? '' : 'none' );
        this._fogDensity.setDisplay( type === 'FogExp2' ? '' : 'none' );
    }
}
