// -----------------------------------------------------------------------------
// add-script-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * AddScriptCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class AddScriptCommand
 * @extends {Command}
 */
export class AddScriptCommand extends Command {

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof AddObjectCommand
     */
    execute () {
		if ( this._editor.scripts[ this.object.uuid ] === undefined ) {
			this._editor.scripts[ this.object.uuid ] = [];
		}

		this._editor.scripts[ this.object.uuid ].push( this.script );
		this._editor.signals.scriptAdded.dispatch( this.script );
    }
    /**
     * undo
     *
     * @memberof AddObjectCommand
     */
	undo () {
		if ( this._editor.scripts[ this.object.uuid ] === undefined ) return;
		let index = this._editor.scripts[ this.object.uuid ].indexOf( this.script );
		if ( index !== - 1 ) {
			this._editor.scripts[ this.object.uuid ].splice( index, 1 );
		}
		this._editor.signals.scriptRemoved.dispatch( this.script );
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof AddObjectCommand
     */
    toJSON () : any {
		let output = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.script       = this.script;
		return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof AddObjectCommand
     */
	fromJSON ( json:any ) {
		super.fromJSON( json );
		this.script = json.script;
		this.object = this._editor.objectByUuid( json.objectUuid );
	}

    // [ Constructors ]

    /**
     * Creates an instance of AddScriptCommand.
     * @param {THREE.Object3D} object
     * @param {object} script
     * @memberof AddScriptCommand
     */
    constructor( object:THREE.Object3D, script:object ) {
        super();

        this.type   = 'AddScriptCommand';
        this.name   = 'Add Script';

        this.object = object;
        this.script = script;
    }

}
