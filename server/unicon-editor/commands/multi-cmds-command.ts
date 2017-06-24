// -----------------------------------------------------------------------------
// multi-comds-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * MultiCmdsCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class MultiCmdsCommand
 * @extends {Command}
 */
export class MultiCmdsCommand extends Command {

    // [ Public Variables ]

    cmdArray : ICommand[];

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof MultiCmdsCommand
     */
    execute () {
		this._editor.signals.sceneGraphChanged.active = false;

		for ( let i = 0; i < this.cmdArray.length; i ++ ) {
			this.cmdArray[ i ].execute();
		}

		this._editor.signals.sceneGraphChanged.active = true;
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof MultiCmdsCommand
     */
	undo () {
		this._editor.signals.sceneGraphChanged.active = false;

		for ( let i = this.cmdArray.length - 1; i >= 0; i -- ) {
			this.cmdArray[ i ].undo();
		}

		this._editor.signals.sceneGraphChanged.active = true;
		this._editor.signals.sceneGraphChanged.dispatch();
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof MultiCmdsCommand
     */
    toJSON () : any {
		let output = super.toJSON();
		let cmds = [];
		for ( let i = 0; i < this.cmdArray.length; i ++ ) {
			cmds.push( this.cmdArray[ i ].toJSON() );
		}
		output.cmds = cmds;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof MultiCmdsCommand
     */
	fromJSON ( json:any ) {
		super.fromJSON( json );
		let cmds = json.cmds;
		for ( let i = 0; i < cmds.length; i ++ ) {
			let cmd = new window[ cmds[ i ].type ]();	// creates a new object of type "json.type"
			cmd.fromJSON( cmds[ i ] );
			this.cmdArray.push( cmd );
		}
	}

    // [ Constructors ]

    /**
     * Creates an instance of MultiCmdsCommand.
     * @param {ICommand[]} [cmdArray]
     * @memberof MultiCmdsCommand
     */
    constructor( cmdArray?:ICommand[] ) {
        super();

        this.type       = 'MultiCmdsCommand';
        this.name       = 'Multiple Changes';
        this.cmdArray   = ( cmdArray !== undefined ) ? cmdArray : [];
    }
}
