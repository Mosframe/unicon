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
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetScriptValueCommand
 * @extends {Command}
 */
export class SetScriptValueCommand extends Command {

    // [ Public Variables ]

    oldValue    : string|object;
    newValue    : string|object;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetScriptValueCommand
     */
    execute () {
		this.script[ this.attributeName ] = this.newValue;
		this._editor.signals.scriptChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof SetScriptValueCommand
     */
    undo () {
		this.script[ this.attributeName ] = this.oldValue;
		this._editor.signals.scriptChanged.dispatch();
    }
    /**
     * update
     *
     * @param {SetScriptValueCommand} command
     * @memberof SetScriptValueCommand
     */
	update ( command:SetScriptValueCommand ) {
		this.newValue = command.newValue;
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetScriptValueCommand
     */
    toJSON () : any {
        let output = super.toJSON();
		output.objectUuid       = this.object.uuid;
		output.index            = this._editor.scripts[ this.object.uuid ].indexOf( this.script );
		output.attributeName    = this.attributeName;
		output.oldValue         = this.oldValue;
		output.newValue         = this.newValue;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetScriptValueCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.oldValue       = json.oldValue;
		this.newValue       = json.newValue;
		this.attributeName  = json.attributeName;
		this.object         = this._editor.objectByUuid( json.objectUuid );
		this.script         = this._editor.scripts[ json.objectUuid ][ json.index ];
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetScriptValueCommand.
     * @param {THREE.Object3D} object
     * @param {object} script
     * @param {string} attributeName
     * @param {(string|object)} newValue
     * @memberof SetScriptValueCommand
     */
    constructor( object:THREE.Object3D, script:object, attributeName:string, newValue:string|object ) {
        super();

        this.type           = 'SetScriptValueCommand';
        this.name           = 'Set Script.' + attributeName;
        this.updatable      = true;
        this.object         = object;
        this.script         = script;
        this.attributeName  = attributeName;
        this.oldValue       = ( script !== undefined ) ? script[ this.attributeName ] : undefined;
        this.newValue       = newValue;
    }
}
