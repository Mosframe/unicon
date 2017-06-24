// -----------------------------------------------------------------------------
// set-value-command.ts
// -----------------------------------------------------------------------------
import * as THREE             from 'three';
import {                    } from '../../engine/object';
import {ICommand            } from '../interface';
import {IEditor             } from '../interface';
import {Command             } from '../command';

/**
 * SetValueCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetValueCommand
 * @extends {Command}
 */
export class SetValueCommand extends Command {

    // [ Public Variables ]

    oldValue    : number|string|boolean|object;
    newValue    : number|string|boolean|object;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetValueCommand
     */
    execute () {
		this.object[ this.attributeName ] = this.newValue;
		this._editor.signals.objectChanged.dispatch( this.object );
		//this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof SetValueCommand
     */
    undo () {
		this.object[ this.attributeName ] = this.oldValue;
		this._editor.signals.objectChanged.dispatch( this.object );
		// this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * update
     *
     * @param {SetValueCommand} cmd
     * @memberof SetValueCommand
     */
	update ( cmd:SetValueCommand ) {
		this.newValue = cmd.newValue;
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetValueCommand
     */
    toJSON () : any {
        let output              = super.toJSON();
		output.objectUuid       = this.object.uuid;
		output.attributeName    = this.attributeName;
		output.oldValue         = this.oldValue;
		output.newValue         = this.newValue;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetValueCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.attributeName  = json.attributeName;
		this.oldValue       = json.oldValue;
		this.newValue       = json.newValue;
		this.object         = this._editor.objectByUuid( json.objectUuid );
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetValueCommand.
     * @param {THREE.Object3D} object
     * @param {string} attributeName
     * @param {(number|string|boolean|object)} newValue
     * @memberof SetValueCommand
     */
    constructor( object:THREE.Object3D, attributeName:string, newValue:number|string|boolean|object ) {
        super();
        this.type           = 'SetValueCommand';
        this.name           = 'Set ' + attributeName;
        this.updatable      = true;
        this.object         = object;
        this.attributeName  = attributeName;
        this.oldValue       = ( object !== undefined ) ? object[ attributeName ] : undefined;
        this.newValue       = newValue;
    }
}
