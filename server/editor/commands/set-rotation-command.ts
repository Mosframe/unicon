// -----------------------------------------------------------------------------
// set-rotation-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetRotationCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetRotationCommand
 * @extends {Command}
 */
export class SetRotationCommand extends Command {

    // [ Public Variables ]

    oldRotation    : THREE.Euler;
    newRotation    : THREE.Euler;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetRotationCommand
     */
    execute () {
		this.object.rotation.copy( this.newRotation );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * undo
     *
     * @memberof SetRotationCommand
     */
    undo () {
		this.object.rotation.copy( this.oldRotation );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * update
     *
     * @param {SetRotationCommand} command
     * @memberof SetRotationCommand
     */
	update ( command:SetRotationCommand ) {
		this.newRotation.copy( command.newRotation );
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetRotationCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldRotation  = this.oldRotation.toArray();
		output.newRotation  = this.newRotation.toArray();
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetRotationCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object         = this._editor.objectByUuid( json.objectUuid );
		this.oldRotation    = new THREE.Euler().fromArray( json.oldRotation );
		this.newRotation    = new THREE.Euler().fromArray( json.newRotation );
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetRotationCommand.
     * @param {THREE.Object3D} object
     * @param {THREE.Euler} newRotation
     * @param {THREE.Euler} optionalOldRotation
     * @memberof SetRotationCommand
     */
    constructor( object:THREE.Object3D, newRotation:THREE.Euler, optionalOldRotation:THREE.Euler ) {
        super();

        this.type       = 'SetRotationCommand';
        this.name       = 'Set Rotation';
        this.updatable  = true;
        this.object     = object;

        if ( object !== undefined && newRotation !== undefined ) {
            this.oldRotation = object.rotation.clone();
            this.newRotation = newRotation.clone();
        }

        if ( optionalOldRotation !== undefined ) {
            this.oldRotation = optionalOldRotation.clone();
        }
    }
}
