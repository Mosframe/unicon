// -----------------------------------------------------------------------------
// set-material-color-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetMaterialColorCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetMaterialColorCommand
 * @extends {Command}
 */
export class SetMaterialColorCommand extends Command {

    // [ Public Variables ]

    object      : THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject;
    oldValue    : number;
    newValue    : number;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetMaterialColorCommand
     */
    execute () {
		this.object.material[ this.attributeName ].setHex( this.newValue );
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }
    /**
     * undo
     *
     * @memberof SetMaterialColorCommand
     */
    undo () {
		this.object.material[ this.attributeName ].setHex( this.oldValue );
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }
    /**
     * update
     *
     * @param {SetMaterialColorCommand} cmd
     * @memberof SetMaterialColorCommand
     */
    update ( cmd:SetMaterialColorCommand ) {
		this.newValue = cmd.newValue;
    }
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetMaterialColorCommand
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
     * @memberof SetMaterialColorCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object         = <THREE.Mesh>this._editor.objectByUuid( json.objectUuid );
		this.attributeName  = json.attributeName;
		this.oldValue       = json.oldValue;
		this.newValue       = json.newValue;
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetMaterialColorCommand.
     * @param {THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject} object
     * @param {string} attributeName
     * @param {number} newValue
     * @memberof SetMaterialColorCommand
     */
    constructor( object:THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject, attributeName:string, newValue:number ) {
        super();

        this.type           = 'SetMaterialColorCommand';
        this.name           = 'Set Material.' + attributeName;
        this.updatable      = true;
        this.object         = object;
        this.attributeName  = attributeName;
        this.oldValue       = ( object !== undefined ) ? this.object.material[ this.attributeName ].getHex() : undefined;
        this.newValue       = newValue;
    }
}
