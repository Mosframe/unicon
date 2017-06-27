// -----------------------------------------------------------------------------
// add-object-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * AddObjectCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class AddObjectCommand
 * @extends {Command}
 */
export class AddObjectCommand extends Command {

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof AddObjectCommand
     */
    execute () {
        this._editor.addObject( this.object );
    }
    /**
     * undo
     *
     * @memberof AddObjectCommand
     */
	undo () {
		this._editor.removeObject( this.object );
		this._editor.deselect();
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof AddObjectCommand
     */
    toJSON () : any {
		let output = super.toJSON();
		output.object = this.object.toJSON();
		return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof AddObjectCommand
     */
	fromJSON ( json:any ) {
		super.fromJSON( json );
		this.object = this._editor.objectByUuid( json.object.object.uuid );
		if ( this.object === undefined ) {
			let loader = new THREE.ObjectLoader();
			this.object = loader.parse( json.object );
		}
	}

    // [ Constructors ]

    /**
     * Creates an instance of AddObjectCommand.
     * @param {THREE.Object3D} object
     * @memberof AddObjectCommand
     */
    constructor( object:THREE.Object3D ) {
        super();

        this.type   = 'AddObjectCommand';
        this.object = object;
        if( object !== undefined ) {
            this.name = 'Add Object: ' + object.name;
        }
    }
}