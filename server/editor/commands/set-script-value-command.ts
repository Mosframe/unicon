// -----------------------------------------------------------------------------
// set-script-value-command.ts
// -----------------------------------------------------------------------------
import * as THREE             from 'three';
import {ICommand            } from '../interface';
import {IEditor             } from '../interface';
import {Command             } from '../command';

/**
 * SetScriptValueCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetScriptValueCommand
 * @extends {Command}
 */
export class SetScriptValueCommand extends Command {

    // [ Public ]

    execute () {
		this.script[ this.attributeName ] = this._newValue;
		this._editor.signals.scriptChanged.dispatch();
    }

    undo () {
		this.script[ this.attributeName ] = this._oldValue;
		this._editor.signals.scriptChanged.dispatch();
    }

	update ( command:SetScriptValueCommand ) {
		this._newValue = command._newValue;
	}

    toJSON () : any {
        let output = super.toJSON();
		output.objectUuid       = this.object.uuid;
		output.index            = this._editor.scripts[ this.object.uuid ].indexOf( this.script );
		output.attributeName    = this.attributeName;
		output.oldValue         = this._oldValue;
		output.newValue         = this._newValue;
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		this._oldValue      = json.oldValue;
		this._newValue      = json.newValue;
		this.attributeName  = json.attributeName;
		this.object         = this._editor.objectByUuid( json.objectUuid );
		this.script         = this._editor.scripts[ json.objectUuid ][ json.index ];
	}

    // [ Constructor ]

    constructor( object:THREE.Object3D, script:object, attributeName:string, newValue:any ) {
        super();

        this.type           = 'SetScriptValueCommand';
        this.name           = 'Set Script.' + attributeName;
        this.updatable      = true;
        this.object         = object;
        this.script         = script;
        this.attributeName  = attributeName;
        this._oldValue      = ( script !== undefined ) ? script[ this.attributeName ] : undefined;
        this._newValue      = newValue;
    }

    // [ Private ]

    private _oldValue   : any;
    private _newValue   : any;
}
