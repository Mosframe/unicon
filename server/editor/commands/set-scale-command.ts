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

    // [ Public Variables ]

    oldScale    : THREE.Vector3;
    newScale    : THREE.Vector3;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetScaleCommand
     */
    execute () {
		this.object.scale.copy( this.newScale );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * undo
     *
     * @memberof SetScaleCommand
     */
    undo () {
		this.object.scale.copy( this.oldScale );
		this.object.updateMatrixWorld( true );
		this._editor.signals.objectChanged.dispatch( this.object );
    }
    /**
     * update
     *
     * @param {SetScaleCommand} command
     * @memberof SetScaleCommand
     */
	update ( command:SetScaleCommand ) {
		this.newScale.copy( command.newScale );
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetScaleCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldScale     = this.oldScale.toArray();
		output.newScale     = this.newScale.toArray();
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetScaleCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object     = this._editor.objectByUuid( json.objectUuid );
		this.oldScale   = new THREE.Vector3().fromArray( json.oldScale );
		this.newScale   = new THREE.Vector3().fromArray( json.newScale );
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetScaleCommand.
     * @param {THREE.Object3D} object
     * @param {THREE.Vector3} newScale
     * @param {THREE.Vector3} optionalOldScale
     * @memberof SetScaleCommand
     */
    constructor( object:THREE.Object3D, newScale:THREE.Vector3, optionalOldScale:THREE.Vector3 ) {
        super();

        this.type       = 'SetScaleCommand';
        this.name       = 'Set Scale';
        this.updatable  = true;
        this.object     = object;

        if ( object !== undefined && newScale !== undefined ) {
            this.oldScale = object.scale.clone();
            this.newScale = newScale.clone();
        }

        if ( optionalOldScale !== undefined ) {
            this.oldScale = optionalOldScale.clone();
        }
    }
}
