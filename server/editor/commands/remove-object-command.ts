// -----------------------------------------------------------------------------
// remove-object-command.ts
// -----------------------------------------------------------------------------
import * as THREE           from 'three';
import { hasProperty    }   from '../../engine/object';
import { IEditor        }   from '../interface';
import { Command        }   from '../command';

/**
 * RemoveObjectCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class RemoveObjectCommand
 * @extends {Command}
 */
export class RemoveObjectCommand extends Command {

    // [ Public ]

    execute () {
		this.object.traverse( ( child:THREE.Object3D ) => {
			this._editor.removeHelper( child );
		});

		this._parent.remove( this.object );
		this._editor.select( this._parent );

		this._editor.signals.objectRemoved.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }

	undo () {
		this.object.traverse( ( child:THREE.Object3D ) => {
            if( hasProperty( child, 'geometry' ) ) this._editor.addGeometry( child['geometry'] );
            if( hasProperty( child, 'material' ) ) this._editor.addMaterial( child['material'] );
			this._editor.addHelper( child );
		});

		this._parent.children.splice( this._index, 0, this.object );
		this.object.parent = this._parent;
		this._editor.select( this.object );

		this._editor.signals.objectAdded.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
	}

    toJSON () : any {
		let output          = super.toJSON();
		output.object       = this.object.toJSON();
		output.index        = this._index;
		output.parentUuid   = this._parent.uuid;
		return output;
    }

	fromJSON ( json:any ) {
		super.fromJSON( json );
		this._parent = this._editor.objectByUuid( json.parentUuid );
		if ( this._parent === undefined ) {
			this._parent = this._editor.scene;
		}
		this._index = json.index;
		this.object = this._editor.objectByUuid( json.object.object.uuid );
		if ( this.object === undefined ) {
			let loader = new THREE.ObjectLoader();
			this.object = loader.parse( json.object );
		}
	}

    // [ Constructor ]

    constructor( object:THREE.Object3D ) {
        super();

        this.type   = 'RemoveObjectCommand';
        this.name   = 'Remove Object';
        this.object = object;
        this._parent = object.parent;
        if ( this._parent !== undefined ) {
            this._index = this._parent.children.indexOf( this.object );
        }
    }

	// [ Private ]

    private _parent	: THREE.Object3D;
    private _index 	: number;
}
