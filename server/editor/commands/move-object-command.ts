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
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class MoveObjectCommand
 * @extends {Command}
 */
export class MoveObjectCommand extends Command {

    // [ Public ]

    execute () {
		if( this._oldParent ) this._oldParent.remove( this.object );
        if( this._newParent && this._newIndex ) {
            let children = this._newParent.children;
            children.splice( this._newIndex, 0, this.object );
            this.object.parent = this._newParent;
        }
        this._editor.signals.sceneGraphChanged.dispatch();
    }

	undo () {
        if( this._newParent ) this._newParent.remove( this.object );
		if( this._oldParent && this._oldIndex ) {
            let children = this._oldParent.children;
            children.splice( this._oldIndex, 0, this.object );
            this.object.parent = this._oldParent;
        }
		this._editor.signals.sceneGraphChanged.dispatch();
	}

    toJSON () : any {
		let output              = super.toJSON();
		output.objectUuid       = this.object.uuid;
		output.newParentUuid    = this._newParent ? this._newParent.uuid : undefined;
		output.oldParentUuid    = this._oldParent ? this._oldParent.uuid : undefined;
		output.newIndex         = this._newIndex;
		output.oldIndex         = this._oldIndex;
        return output;
    }

	fromJSON ( json:any ) {
		super.fromJSON( json );
		this.object     = this._editor.objectByUuid( json.objectUuid );
		this._oldParent  = this._editor.objectByUuid( json.oldParentUuid );
		if ( this._oldParent === undefined ) {
			this._oldParent = this._editor.scene;
		}
		this._newParent = this._editor.objectByUuid( json.newParentUuid );
		if ( this._newParent === undefined ) {
			this._newParent = this._editor.scene;
		}
		this._newIndex = json.newIndex;
		this._oldIndex = json.oldIndex;
	}

    // [ Constructor ]

    constructor( object:THREE.Object3D, newParent?:THREE.Object3D, newBefore?:THREE.Object3D ) {
        super();

        this.type       = 'MoveObjectCommand';
        this.name       = 'Move Object';
        this.object     = object;
        this._oldParent = ( object !== undefined ) ? object.parent : undefined;
        this._oldIndex  = ( this._oldParent !== undefined ) ? this._oldParent.children.indexOf( this.object ) : undefined;
        this._newParent = newParent;

        if ( newBefore !== undefined ) {
            this._newIndex = ( newParent !== undefined ) ? newParent.children.indexOf( newBefore ) : undefined;
        } else {
            this._newIndex = ( newParent !== undefined ) ? newParent.children.length : undefined;
        }

        if( this._newIndex && this._oldIndex) {
            if ( this._oldParent === this._newParent && this._newIndex > this._oldIndex ) {
                this._newIndex --;
            }
        }

        if( newBefore ) this._newBefore = newBefore;
    }

    // [ Private ]

     private _oldParent  ?: THREE.Object3D;
     private _newParent  ?: THREE.Object3D;
     private _newBefore  ?: THREE.Object3D;
     private _oldIndex   ?: number;
     private _newIndex   ?: number;
}
