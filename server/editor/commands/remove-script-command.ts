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
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class RemoveScriptCommand
 * @extends {Command}
 */
export class RemoveScriptCommand extends Command {

    // [ Public ]

    execute () {
		if ( this._editor.scripts[ this.object.uuid ] === undefined ) return;
		if ( this._index !== - 1 ) {
			this._editor.scripts[ this.object.uuid ].splice( this._index, 1 );
		}
        this._editor.signals.scriptRemoved.dispatch( this.script );
    }

	undo () {
		if ( this._editor.scripts[ this.object.uuid ] === undefined ) {
			this._editor.scripts[ this.object.uuid ] = [];
		}
		this._editor.scripts[ this.object.uuid ].splice( this._index, 0, this.script );
		this._editor.signals.scriptAdded.dispatch( this.script );
	}

    toJSON () : any {
		let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.script       = this.script;
		output.index        = this._index;
		return output;
    }

	fromJSON ( json:any ) {
		super.fromJSON( json );
		this.script     = json.script;
		this._index     = json.index;
		this.object     = this._editor.objectByUuid( json.objectUuid );
	}

    // [ Constructor ]

    constructor( object:THREE.Object3D, script:any ) {
        super();

        this.type   = 'RemoveScriptCommand';
        this.name   = 'Remove Script';
        this.object = object;
        this.script = script;
        if ( object && script ) {
    		this._index = this._editor.scripts[ this.object.uuid ].indexOf( this.script );
        }
    }

	// [ Private ]

    private _index  : number;
}
