// -----------------------------------------------------------------------------
// set-color-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {            } from '../../engine/object';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetColorCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetColorCommand
 * @extends {Command}
 */
export class SetColorCommand extends Command {

    // [ Public Variables ]

    oldValue : number;
    newValue : number;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetColorCommand
     */
    execute () {
        this.object[ this.attributeName ].setHex( this.newValue );
        this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * undo
     *
     * @memberof SetColorCommand
     */
    undo () {
        this.object[ this.attributeName ].setHex( this.oldValue );
        this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * update
     *
     * @param {SetColorCommand} cmd
     * @memberof SetColorCommand
     */
    update ( cmd:SetColorCommand ) {
        this.newValue = cmd.newValue;
    }
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetColorCommand
     */
    toJSON () : any {
        let output            = super.toJSON();
        output.objectUuid     = this.object.uuid;
        output.attributeName  = this.attributeName;
        output.oldValue       = this.oldValue;
        output.newValue       = this.newValue;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetColorCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object = this._editor.objectByUuid( json.objectUuid );
		this.attributeName = json.attributeName;
		this.oldValue = json.oldValue;
		this.newValue = json.newValue;
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetColorCommand.
     * @param {THREE.Object3D} object
     * @param {string} attributeName
     * @param {number} newValue
     * @memberof SetColorCommand
     */
    constructor( object:THREE.Object3D, attributeName:string, newValue:number ) {
        super();

        this.type = 'SetColorCommand';
        this.name = 'Set ' + attributeName;
        this.updatable = true;

        this.object = object;
        this.attributeName = attributeName;
        this.oldValue = ( object !== undefined ) ? this.object[ this.attributeName ].getHex() : undefined;
        this.newValue = newValue;
    }
}
