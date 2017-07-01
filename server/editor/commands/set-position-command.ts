// -----------------------------------------------------------------------------
// set-position-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetPositionCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetPositionCommand
 * @extends {Command}
 */
export class SetPositionCommand extends Command {

    // [ Public ]

    execute () {
		this.object.position.copy( this._newPosition );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }

    undo () {
		this.object.position.copy( this._oldPosition );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }

	update ( command:SetPositionCommand ) {
		this._newPosition.copy( command._newPosition );
	}

    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldPosition  = this._oldPosition.toArray();
		output.newPosition  = this._newPosition.toArray();
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object         = this._editor.objectByUuid( json.objectUuid );
		this._oldPosition    = new THREE.Vector3().fromArray( json.oldPosition );
		this._newPosition    = new THREE.Vector3().fromArray( json.newPosition );
	}

    // [ Constructor ]

    constructor( object:THREE.Object3D, newPosition:THREE.Vector3, optionalOldPosition?:THREE.Vector3 ) {
        super();

        this.type       = 'SetPositionCommand';
        this.name       = 'Set Position';
        this.updatable  = true;
        this.object     = object;

        if ( object !== undefined && newPosition !== undefined ) {
            this._oldPosition = object.position.clone();
            this._newPosition = newPosition.clone();
        }

        if ( optionalOldPosition !== undefined ) {
            this._oldPosition = optionalOldPosition.clone();
        }
    }

    // [ Private ]

    private _oldPosition    : THREE.Vector3;
    private _newPosition    : THREE.Vector3;
}
