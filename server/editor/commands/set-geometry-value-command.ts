// -----------------------------------------------------------------------------
// set-geometry-value-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetGeometryValueCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetGeometryValueCommand
 * @extends {Command}
 */
export class SetGeometryValueCommand extends Command {

    // [ Public ]

    object : any;

    execute () {
		this.object.geometry[ this.attributeName ] = this._newValue;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.geometryChanged.dispatch();
		this._editor.signals.sceneGraphChanged.dispatch();
    }

    undo () {
		this.object.geometry[ this.attributeName ] = this._oldValue;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.geometryChanged.dispatch();
		this._editor.signals.sceneGraphChanged.dispatch();
    }

    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.attributeName= this.attributeName;
		output.oldValue     = this._oldValue;
		output.newValue     = this._newValue;
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object          = this._editor.objectByUuid( json.objectUuid );
		this.attributeName   = json.attributeName;
		this._oldValue       = json.oldValue;
		this._newValue       = json.newValue;
	}

    // [ Constructor ]

    constructor( object:any, attributeName:string, newValue:any ) {
        super();

        this.type           = 'SetGeometryValueCommand';
        this.name           = 'Set Geometry.' + attributeName;
        this.object         = object;
        this.attributeName  = attributeName;
        this._oldValue      = ( object !== undefined ) ? object.geometry[ attributeName ] : undefined;
        this._newValue      = newValue;
    }

    // [ Private ]

    private _oldValue   : any;
    private _newValue   : any;
}
