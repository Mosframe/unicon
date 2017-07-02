// -----------------------------------------------------------------------------
// set-scale-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetScaleCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetScaleCommand
 * @extends {Command}
 */
export class SetScaleCommand extends Command {

    // [ Public ]

    execute () {
		this.object.scale.copy( this._newScale );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }

    undo () {
		this.object.scale.copy( this._oldScale );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }

	update ( command:SetScaleCommand ) {
		this._newScale.copy( command._newScale );
	}

    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldScale     = this._oldScale.toArray();
		output.newScale     = this._newScale.toArray();
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object     = this._editor.objectByUuid( json.objectUuid );
		this._oldScale  = new THREE.Vector3().fromArray( json.oldScale );
		this._newScale  = new THREE.Vector3().fromArray( json.newScale );
	}

    // [ Constructor ]

    constructor( object:THREE.Object3D, newScale:THREE.Vector3, optionalOldScale?:THREE.Vector3 ) {
        super();

        this.type       = 'SetScaleCommand';
        this.name       = 'Set Scale';
        this.updatable  = true;
        this.object     = object;

        if ( object !== undefined && newScale !== undefined ) {
            this._oldScale = object.scale.clone();
            this._newScale = newScale.clone();
        }

        if ( optionalOldScale !== undefined ) {
            this._oldScale = optionalOldScale.clone();
        }
    }

    // [ Private ]

    private _oldScale    : THREE.Vector3;
    private _newScale    : THREE.Vector3;
}
