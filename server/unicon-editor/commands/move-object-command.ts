// -----------------------------------------------------------------------------
// move-object-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * MoveObjectCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class MoveObjectCommand
 * @extends {Command}
 */
export class MoveObjectCommand extends Command {

    // [ Public Variables ]

     oldParent  : THREE.Object3D;
     newParent  : THREE.Object3D;
     newBefore  : THREE.Object3D;
     oldIndex   : number;
     newIndex   : number;


    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof MoveObjectCommand
     */
    execute () {
		this.oldParent.remove( this.object );
		let children = this.newParent.children;
		children.splice( this.newIndex, 0, this.object );
		this.object.parent = this.newParent;
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof MoveObjectCommand
     */
	undo () {
		this.newParent.remove( this.object );
		let children = this.oldParent.children;
		children.splice( this.oldIndex, 0, this.object );
		this.object.parent = this.oldParent;
		this._editor.signals.sceneGraphChanged.dispatch();
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof MoveObjectCommand
     */
    toJSON () : any {
		let output              = super.toJSON();
		output.objectUuid       = this.object.uuid;
		output.newParentUuid    = this.newParent.uuid;
		output.oldParentUuid    = this.oldParent.uuid;
		output.newIndex         = this.newIndex;
		output.oldIndex         = this.oldIndex;
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof MoveObjectCommand
     */
	fromJSON ( json:any ) {
		super.fromJSON( json );
		this.object     = this._editor.objectByUuid( json.objectUuid );
		this.oldParent  = this._editor.objectByUuid( json.oldParentUuid );
		if ( this.oldParent === undefined ) {
			this.oldParent = this._editor.scene;
		}
		this.newParent = this._editor.objectByUuid( json.newParentUuid );
		if ( this.newParent === undefined ) {
			this.newParent = this._editor.scene;
		}
		this.newIndex = json.newIndex;
		this.oldIndex = json.oldIndex;
	}

    // [ Constructors ]

    /**
     * Creates an instance of MoveObjectCommand.
     * @param {THREE.Object3D} object
     * @param {THREE.Object3D} newParent
     * @param {THREE.Object3D} newBefore
     * @memberof MoveObjectCommand
     */
    constructor( object:THREE.Object3D, newParent:THREE.Object3D, newBefore:THREE.Object3D ) {
        super();

        this.type       = 'MoveObjectCommand';
        this.name       = 'Move Object';
        this.object     = object;
        this.oldParent  = ( object !== undefined ) ? object.parent : undefined;
        this.oldIndex   = ( this.oldParent !== undefined ) ? this.oldParent.children.indexOf( this.object ) : undefined;
        this.newParent  = newParent;

        if ( newBefore !== undefined ) {
            this.newIndex = ( newParent !== undefined ) ? newParent.children.indexOf( newBefore ) : undefined;
        } else {
            this.newIndex = ( newParent !== undefined ) ? newParent.children.length : undefined;
        }

        if ( this.oldParent === this.newParent && this.newIndex > this.oldIndex ) {
            this.newIndex --;
        }

        this.newBefore = newBefore;
    }


}
