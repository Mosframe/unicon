// -----------------------------------------------------------------------------
// set-material-value-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetMaterialValueCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetMaterialValueCommand
 * @extends {Command}
 */
export class SetMaterialValueCommand extends Command {

    // [ Public Variables ]

    object      : any;
    oldValue    : THREE.Material;
    newValue    : THREE.Material;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetMaterialValueCommand
     */
    execute () {
		this.object.material[ this.attributeName ] = this.newValue;
		this.object.material.needsUpdate = true;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }
    /**
     * undo
     *
     * @memberof SetMaterialValueCommand
     */
    undo () {
		this.object.material[ this.attributeName ] = this.oldValue;
		this.object.material.needsUpdate = true;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }
	update ( cmd:SetMaterialValueCommand ) {
		this.newValue = cmd.newValue;
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetMaterialValueCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.attributeName= this.attributeName;
		output.oldValue     = this.oldValue;
		output.newValue     = this.newValue;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetMaterialValueCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.attributeName  = json.attributeName;
		this.oldValue       = json.oldValue;
		this.newValue       = json.newValue;
		this.object         = <THREE.Mesh>this._editor.objectByUuid( json.objectUuid );
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetMaterialValueCommand.
     * @param {*} object
     * @param {string} attributeName
     * @param {THREE.Material} newValue
     * @memberof SetMaterialValueCommand
     */
    constructor( object:any, attributeName:string, newValue:THREE.Material ) {
        super();

        this.type           = 'SetMaterialValueCommand';
        this.name           = 'Set Material.' + attributeName;
        this.updatable      = true;
        this.object         = object;
        this.oldValue       = ( object !== undefined ) ? object.material[ attributeName ] : undefined;
        this.newValue       = newValue;
        this.attributeName  = attributeName;
    }
}
