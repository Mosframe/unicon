// -----------------------------------------------------------------------------
// remove-script-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * RemoveScriptCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class RemoveScriptCommand
 * @extends {Command}
 */
export class RemoveScriptCommand extends Command {

    // [ Public Variables ]

    index  : number;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof RemoveScriptCommand
     */
    execute () {
		if ( this._editor.scripts[ this.object.uuid ] === undefined ) return;
		if ( this.index !== - 1 ) {
			this._editor.scripts[ this.object.uuid ].splice( this.index, 1 );
		}
        this._editor.signals.scriptRemoved.dispatch( this.script );
    }
    /**
     * undo
     *
     * @memberof RemoveScriptCommand
     */
	undo () {
		if ( this._editor.scripts[ this.object.uuid ] === undefined ) {
			this._editor.scripts[ this.object.uuid ] = [];
		}
		this._editor.scripts[ this.object.uuid ].splice( this.index, 0, this.script );
		this._editor.signals.scriptAdded.dispatch( this.script );
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof RemoveScriptCommand
     */
    toJSON () : any {
		let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.script       = this.script;
		output.index        = this.index;
		return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof RemoveScriptCommand
     */
	fromJSON ( json:any ) {
		super.fromJSON( json );
		this.script     = json.script;
		this.index      = json.index;
		this.object     = this._editor.objectByUuid( json.objectUuid );
	}

    // [ Constructors ]

    /**
     * Creates an instance of RemoveScriptCommand.
     * @param {THREE.Object3D} object
     * @param {object} script
     * @memberof RemoveScriptCommand
     */
    constructor( object:THREE.Object3D, script:object ) {
        super();

        this.type   = 'RemoveScriptCommand';
        this.name   = 'Remove Script';
        this.object = object;
        this.script = script;
        if ( this.object && this.script ) {
    		this.index = this._editor.scripts[ this.object.uuid ].indexOf( this.script );
        }
    }
}
