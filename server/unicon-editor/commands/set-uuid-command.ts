// -----------------------------------------------------------------------------
// set-uuid-command.ts
// -----------------------------------------------------------------------------
import * as THREE             from 'three';
import {                    } from '../../engine/object';
import {ICommand            } from '../interface';
import {IEditor             } from '../interface';
import {Command             } from '../command';

/**
 * SetUuidCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetUuidCommand
 * @extends {Command}
 */
export class SetUuidCommand extends Command {

    // [ Public Variables ]

    oldUuid    : string;
    newUuid    : string;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetUuidCommand
     */
    execute () {
		this.object.uuid = this.newUuid;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof SetUuidCommand
     */
    undo () {
		this.object.uuid = this.oldUuid;
		this._editor.signals.objectChanged.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * update
     *
     * @param {SetUuidCommand} cmd
     * @memberof SetUuidCommand
     */
	update ( cmd:SetUuidCommand ) {
        super.update(cmd);
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetUuidCommand
     */
    toJSON () : any {
        let output = super.toJSON();
		output.oldUuid = this.oldUuid;
		output.newUuid = this.newUuid;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetUuidCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.oldUuid = json.oldUuid;
		this.newUuid = json.newUuid;
		this.object = this._editor.objectByUuid( json.oldUuid );
		if ( this.object === undefined ) {
			this.object = this._editor.objectByUuid( json.newUuid );
		}
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetUuidCommand.
     * @param {THREE.Object3D} object
     * @param {string} newUuid
     * @memberof SetUuidCommand
     */
    constructor( object:THREE.Object3D, newUuid:string ) {
        super();
        this.type       = 'SetUuidCommand';
        this.name       = 'Update UUID'
        this.object     = object;
        this.oldUuid    = ( object !== undefined ) ? object.uuid : undefined;
        this.newUuid    = newUuid;
    }
}
