// -----------------------------------------------------------------------------
// history.ts
// -----------------------------------------------------------------------------
import {ICommand 	} from './interface';
import {IEditor  	} from './interface';
import {Command 	} from './command';
import {Config  	} from './config';


/**
 * History
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class History
 */
export class History {

    // [ Public Variables ]

    undos           : ICommand[];
    redos           : ICommand[];
    editor          : IEditor;
    lastCmdTime     : Date;
    idCounter       : number;
    historyDisabled : boolean;
    config          : Config;

    // [ Public Functions ]

	execute ( cmd:ICommand, optionalName?:string ) {

		let lastCmd = this.undos[ this.undos.length - 1 ];
		let timeDifference = new Date().getTime() - this.lastCmdTime.getTime();

		let isUpdatableCmd   = lastCmd
							&& lastCmd.updatable
							&& cmd.updatable
							&& lastCmd.object 			=== cmd.object
							&& lastCmd.type 			=== cmd.type
							&& lastCmd.script 			=== cmd.script
							&& lastCmd.attributeName 	=== cmd.attributeName;

		if( isUpdatableCmd && cmd.type === "SetScriptValueCommand" ) {

			// When the cmd.type is "SetScriptValueCommand" the timeDifference is ignored
			lastCmd.update( cmd );
			cmd = lastCmd;

		} else if ( isUpdatableCmd && timeDifference < 500 ) {

			lastCmd.update( cmd );
			cmd = lastCmd;

		} else {

			// the command is not updatable and is added as a new part of the history

			this.undos.push( cmd );
			cmd.id = ++ this.idCounter;
		}
		cmd.name = ( optionalName !== undefined ) ? optionalName : cmd.name;
		cmd.execute();
		cmd.inMemory = true;

		if ( this.config.getKey( 'settings/history' ) ) {
			cmd.json = cmd.toJSON();	// serialize the cmd immediately after execution and append the json to the cmd
		}
		this.lastCmdTime = new Date();

		// clearing all the redo-commands

		this.redos = [];
		this.editor.signals.historyChanged.dispatch( cmd );
	}

	undo () : ICommand|undefined {

		let cmd:ICommand|undefined;

		if ( this.historyDisabled ) {

			alert( "Undo/Redo disabled while scene is playing." );
			return cmd;
		}

		if ( this.undos.length > 0 ) {

			cmd = this.undos.pop();
			if ( cmd && cmd.inMemory === false ) {
				cmd.fromJSON( cmd.json );
			}
		}

		if ( cmd ) {
			cmd.undo();
			this.redos.push( cmd );
			this.editor.signals.historyChanged.dispatch( cmd );
		}

		return cmd;
	}

	redo () : ICommand|undefined {

		let cmd:ICommand|undefined;

		if ( this.historyDisabled ) {
			alert( "Undo/Redo disabled while scene is playing." );
			return cmd;
		}

		if( this.redos.length > 0 ) {

			cmd = this.redos.pop();
			if( cmd && cmd.inMemory === false ) {
				cmd.fromJSON( cmd.json );
			}
		}
		if( cmd ) {
			cmd.execute();
			this.undos.push( cmd );
			this.editor.signals.historyChanged.dispatch( cmd );
			return cmd;
		}
	}

	toJSON () : any {

		let history : any = {
			undos : [],
			redos : [],
		};

		if ( ! this.config.getKey( 'settings/history' ) ) {
			return history;
		}

		// Append Undos to History

		for ( let i = 0 ; i < this.undos.length; i ++ ) {
			if ( this.undos[ i ].hasOwnProperty( "json" ) ) {
				history.undos.push( this.undos[ i ].json );
			}
		}

		// Append Redos to History

		for ( let i = 0 ; i < this.redos.length; i ++ ) {
			if ( this.redos[ i ].hasOwnProperty( "json" ) ) {
				history.redos.push( this.redos[ i ].json );
			}
		}

		return history;
	}

	fromJSON ( json:any ) {

		if ( json === undefined ) return;

		for ( let i = 0; i < json.undos.length; i ++ ) {

			let cmdJSON = json.undos[ i ];
			let cmd = new window[ cmdJSON.type ]();	// creates a new object of type "json.type"
			cmd.json = cmdJSON;
			cmd.id = cmdJSON.id;
			cmd.name = cmdJSON.name;
			this.undos.push( cmd );
			this.idCounter = ( cmdJSON.id > this.idCounter ) ? cmdJSON.id : this.idCounter; // set last used idCounter
		}

		for ( let i = 0; i < json.redos.length; i ++ ) {

			let cmdJSON = json.redos[ i ];
			let cmd = new window[ cmdJSON.type ]();	// creates a new object of type "json.type"
			cmd.json = cmdJSON;
			cmd.id = cmdJSON.id;
			cmd.name = cmdJSON.name;
			this.redos.push( cmd );
			this.idCounter = ( cmdJSON.id > this.idCounter ) ? cmdJSON.id : this.idCounter; // set last used idCounter

		}

		// Select the last executed undo-command
		this.editor.signals.historyChanged.dispatch( this.undos[ this.undos.length - 1 ] );
	}

	clear () {
		this.undos = [];
		this.redos = [];
		this.idCounter = 0;
		this.editor.signals.historyChanged.dispatch();
	}

	goToState ( id:number ) {

		if ( this.historyDisabled ) {

			alert( "Undo/Redo disabled while scene is playing." );
			return;

		}

		this.editor.signals.sceneGraphChanged.active = false;
		this.editor.signals.historyChanged.active = false;

		let cmd = this.undos.length > 0 ? this.undos[ this.undos.length - 1 ] : undefined;	// next cmd to pop

		if ( cmd === undefined || id > cmd.id ) {

			cmd = this.redo();
			while ( cmd !== undefined && id > cmd.id ) {

				cmd = this.redo();
			}

		} else {

			while ( true ) {

				cmd = this.undos[ this.undos.length - 1 ];	// next cmd to pop

				if ( cmd === undefined || id === cmd.id ) break;

				this.undo();
			}
		}

		this.editor.signals.sceneGraphChanged.active = true;
		this.editor.signals.historyChanged.active = true;

		this.editor.signals.sceneGraphChanged.dispatch();
		this.editor.signals.historyChanged.dispatch( cmd );

	}

	enableSerialization ( id:number ) {

		/**
		 * because there might be commands in this.undos and this.redos
		 * which have not been serialized with .toJSON() we go back
		 * to the oldest command and redo one command after the other
		 * while also calling .toJSON() on them.
		 */

		this.goToState( - 1 );

		this.editor.signals.sceneGraphChanged.active = false;
		this.editor.signals.historyChanged.active = false;

		let cmd = this.redo();
		while ( cmd !== undefined ) {

			if ( ! cmd.hasOwnProperty( "json" ) ) {

				cmd.json = cmd.toJSON();

			}
			cmd = this.redo();

		}

		this.editor.signals.sceneGraphChanged.active = true;
		this.editor.signals.historyChanged.active = true;

		this.goToState( id );

	}

    // [ Constructors ]

    constructor ( editor:IEditor ) {

        this.editor             = editor;
        this.undos              = [];
        this.redos              = [];
        this.lastCmdTime        = new Date();
        this.idCounter          = 0;
        this.historyDisabled    = false;
        this.config             = editor.config;

        //Set editor-reference in Command
        let cmd = new Command( editor );

        // signals
        this.editor.signals.startPlayer.add( ()=> {
            this.historyDisabled = true;
        });
        this.editor.signals.stopPlayer.add( ()=> {
            this.historyDisabled = false;
        });
    }
}
