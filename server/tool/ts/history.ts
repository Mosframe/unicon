// -----------------------------------------------------------------------------
// history.ts
// -----------------------------------------------------------------------------
import {Editor  } from './editor';
import {Config  } from './config';
import {Command } from './command';

/**
 * History
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class History
 */
export class History {

    // [ Public Variables ]

    editor          : Editor;
    undos           : any[];
    redos           : any[];
    lastCmdTime     : Date;
    idCounter       : number;
    historyDisabled : boolean;
    config          : Config;

    // [ Constructors ]

    constructor ( editor:Editor ) {

        this.editor             = editor;
        this.undos              = [];
        this.redos              = [];
        this.lastCmdTime        = new Date();
        this.idCounter          = 0;
        this.historyDisabled    = false;
        this.config             = editor.config;

        //Set editor-reference in Command
        Command.create( editor );

        // signals
        this.editor.signals.startPlayer.add( ()=> {
            this.historyDisabled = true;
        });
        this.editor.signals.stopPlayer.add( ()=> {
            this.historyDisabled = false;
        });
    }
}
