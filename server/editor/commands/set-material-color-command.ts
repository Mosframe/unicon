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
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetMaterialColorCommand
 * @extends {Command}
 */
export class SetMaterialColorCommand extends Command {

    // [ Public ]

    object : any;

    execute () {
		this.object.material[ this.attributeName ].setHex( this._newValue );
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }

    undo () {
		this.object.material[ this.attributeName ].setHex( this._oldValue );
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }

    update ( cmd:SetMaterialColorCommand ) {
		this._newValue = cmd._newValue;
    }

    toJSON () : any {
        let output              = super.toJSON();
		output.objectUuid       = this.object.uuid;
		output.attributeName    = this.attributeName;
		output.oldValue         = this._oldValue;
		output.newValue         = this._newValue;
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object         = this._editor.objectByUuid( json.objectUuid );
		this.attributeName  = json.attributeName;
		this._oldValue      = json.oldValue;
		this._newValue      = json.newValue;
	}

    // [ Constructor ]

    constructor( object:any, attributeName:string, newValue:number ) {
        super();

        this.type           = 'SetMaterialColorCommand';
        this.name           = 'Set Material.' + attributeName;
        this.updatable      = true;
        this.object         = object;
        this.attributeName  = attributeName;
        this._oldValue      = ( object !== undefined ) ? this.object.material[ this.attributeName ].getHex() : undefined;
        this._newValue      = newValue;
    }

    // [ Private ]

    private _oldValue    : number;
    private _newValue    : number;
}
