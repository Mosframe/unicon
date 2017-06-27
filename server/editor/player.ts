// -----------------------------------------------------------------------------
// player.ts
// -----------------------------------------------------------------------------
import * as THREE               from 'three';
import { Panel as UIPanel   }   from '../editor/gui/panel';
import { AppPlayer          }   from './app-player';
import { IEditor            }   from './interface';
/**
 * player
 *
 * @export
 * @class Player
 * @extends {UIPanel}
 */
export class Player extends UIPanel {

    constructor( editor:IEditor ) {
        super();

        this.setId( 'player' );
        this.setPosition( 'absolute' );
        this.setDisplay( 'none' );

        let signals = editor.signals;

        //

        let player = new AppPlayer();
        this.core.appendChild( player.core );

        window.addEventListener( 'resize', () => {
            player.setSize( this.core.clientWidth, this.core.clientHeight );
        });

        signals.startPlayer.add( () => {
            this.setDisplay( '' );
            player.load( editor.toJSON() );
            player.setSize( this.core.clientWidth, this.core.clientHeight );
            player.play();
        });

        signals.stopPlayer.add( () => {
            this.setDisplay( 'none' );
            player.stop();
            player.dispose();
        });
    }
}
