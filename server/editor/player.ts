// -----------------------------------------------------------------------------
// player.ts
// -----------------------------------------------------------------------------
import {}          from '../engine/object';
import *      as THREE          from 'three';
import {Panel as UIPanel    }   from '../editor/gui/panel';
import {AppPlayer   }   from './app';

export class Player {

    container : UIPanel;

    constructor( editor:any ) {
        var signals = editor.signals;

        var container = new UIPanel();
        container.setId( 'player' );
        container.setPosition( 'absolute' );
        container.setDisplay( 'none' );

        //

        var player :any = new AppPlayer();
        container.core.appendChild( player.dom );

        window.addEventListener( 'resize', function () {

            player.setSize( container.core.clientWidth, container.core.clientHeight );

        } );

        signals.startPlayer.add( function () {

            container.setDisplay( '' );

            player.load( editor.toJSON() );
            player.setSize( container.core.clientWidth, container.core.clientHeight );
            player.play();

        } );

        signals.stopPlayer.add( function () {

            container.setDisplay( 'none' );

            player.stop();
            player.dispose();

        } );

        this.container = container;
    }
}
