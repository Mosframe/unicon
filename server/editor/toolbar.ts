// -----------------------------------------------------------------------------
// toolbar.ts
// -----------------------------------------------------------------------------
import {Panel   as UIPanel      }   from '../editor/gui/panel';
import {Button  as UIButton     }   from '../editor/gui/button';
import {Number  as UINumber     }   from '../editor/gui/number';
import {Text    as UIText       }   from '../editor/gui/text';
import {Boolean as UIBoolean    }   from '../editor/gui/boolean';

/**
 * @author mrdoob / http://mrdoob.com/
 */

export class Toolbar  {

    container : UIPanel;

    constructor( editor ) {

        let signals = editor.signals;
        let container = new UIPanel();
        container.setId( 'toolbar' );

        let buttons = new UIPanel();
        container.add( buttons );

        // translate / rotate / scale

        let translate = new UIButton( 'translate' );
        translate.core.title = 'W';
        translate.core.className = 'Button selected';
        translate.onClick( function () {

            signals.transformModeChanged.dispatch( 'translate' );

        } );
        buttons.add( translate );

        let rotate = new UIButton( 'rotate' );
        rotate.core.title = 'E';
        rotate.onClick( function () {

            signals.transformModeChanged.dispatch( 'rotate' );

        } );
        buttons.add( rotate );

        let scale = new UIButton( 'scale' );
        scale.core.title = 'R';
        scale.onClick( function () {

            signals.transformModeChanged.dispatch( 'scale' );

        } );
        buttons.add( scale );

        signals.transformModeChanged.add( function ( mode ) {

            translate.core.classList.remove( 'selected' );
            rotate.core.classList.remove( 'selected' );
            scale.core.classList.remove( 'selected' );

            switch ( mode ) {

                case 'translate': translate.core.classList.add( 'selected' ); break;
                case 'rotate': rotate.core.classList.add( 'selected' ); break;
                case 'scale': scale.core.classList.add( 'selected' ); break;

            }

        });

        // grid

        let grid = new UINumber( 25 ).setWidth( '40px' ).onChange( update );
        buttons.add( new UIText( 'grid: ' ) );
        buttons.add( grid );

        let snap = new UIBoolean( false, 'snap' ).onChange( update );
        buttons.add( snap );

        let local = new UIBoolean( false, 'local' ).onChange( update );
        buttons.add( local );

        let showGrid = new UIBoolean( true, 'show' ).onChange( update );
        buttons.add( showGrid );

        function update() {

            signals.snapChanged.dispatch( snap.getValue() === true ? grid.getValue() : null );
            signals.spaceChanged.dispatch( local.getValue() === true ? "local" : "world" );
            signals.showGridChanged.dispatch( showGrid.getValue() );
        }

        this.container = container;
    }
}
