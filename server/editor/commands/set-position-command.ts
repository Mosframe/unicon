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
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetPositionCommand
 * @extends {Command}
 */
export class SetPositionCommand extends Command {

    // [ Public Variables ]

    oldPosition    : THREE.Vector3;
    newPosition    : THREE.Vector3;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetPositionCommand
     */
    execute () {
		this.object.position.copy( this.newPosition );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * undo
     *
     * @memberof SetPositionCommand
     */
    undo () {
		this.object.position.copy( this.oldPosition );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * update
     *
     * @param {SetPositionCommand} command
     * @memberof SetPositionCommand
     */
	update ( command:SetPositionCommand ) {
		this.newPosition.copy( command.newPosition );
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetPositionCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldPosition  = this.oldPosition.toArray();
		output.newPosition  = this.newPosition.toArray();
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetPositionCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object         = this._editor.objectByUuid( json.objectUuid );
		this.oldPosition    = new THREE.Vector3().fromArray( json.oldPosition );
		this.newPosition    = new THREE.Vector3().fromArray( json.newPosition );
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetPositionCommand.
     * @param {THREE.Object3D} object
     * @param {THREE.Vector3} newPosition
     * @param {THREE.Vector3} optionalOldPosition
     * @memberof SetPositionCommand
     */
    constructor( object:THREE.Object3D, newPosition:THREE.Vector3, optionalOldPosition:THREE.Vector3 ) {
        super();

        this.type       = 'SetPositionCommand';
        this.name       = 'Set Position';
        this.updatable  = true;
        this.object     = object;

        if ( object !== undefined && newPosition !== undefined ) {
            this.oldPosition = object.position.clone();
            this.newPosition = newPosition.clone();
        }

        if ( optionalOldPosition !== undefined ) {
            this.oldPosition = optionalOldPosition.clone();
        }
    }
}
