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
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class RemoveObjectCommand
 * @extends {Command}
 */
export class RemoveObjectCommand extends Command {

    // [ Public Variables ]

     parent     : THREE.Object3D;
     index      : number;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof RemoveObjectCommand
     */
    execute () {
		this.object.traverse( ( child:THREE.Object3D ) => {
			this._editor.removeHelper( child );
		});

		this.parent.remove( this.object );
		this._editor.select( this.parent );

		this._editor.signals.objectRemoved.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
    }
    /**
     * undo
     *
     * @memberof RemoveObjectCommand
     */
	undo () {
		this.object.traverse( ( child:THREE.Object3D ) => {
            if( hasProperty( child, 'geometry' ) ) this._editor.addGeometry( child['geometry'] );
            if( hasProperty( child, 'material' ) ) this._editor.addMaterial( child['material'] );
			this._editor.addHelper( child );
		});

		this.parent.children.splice( this.index, 0, this.object );
		this.object.parent = this.parent;
		this._editor.select( this.object );

		this._editor.signals.objectAdded.dispatch( this.object );
		this._editor.signals.sceneGraphChanged.dispatch();
	}
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof RemoveObjectCommand
     */
    toJSON () : any {
		let output          = super.toJSON();
		output.object       = this.object.toJSON();
		output.index        = this.index;
		output.parentUuid   = this.parent.uuid;
		return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof RemoveObjectCommand
     */
	fromJSON ( json:any ) {
		super.fromJSON( json );
		this.parent = this._editor.objectByUuid( json.parentUuid );
		if ( this.parent === undefined ) {
			this.parent = this._editor.scene;
		}
		this.index = json.index;
		this.object = this._editor.objectByUuid( json.object.object.uuid );
		if ( this.object === undefined ) {
			let loader = new THREE.ObjectLoader();
			this.object = loader.parse( json.object );
		}
	}

    // [ Constructors ]

    /**
     * Creates an instance of RemoveObjectCommand.
     * @param {THREE.Object3D} object
     * @memberof RemoveObjectCommand
     */
    constructor( object:THREE.Object3D ) {
        super();

        this.type   = 'RemoveObjectCommand';
        this.name   = 'Remove Object';
        this.object = object;
        this.parent = object.parent;
        if ( this.parent !== undefined ) {
            this.index = this.parent.children.indexOf( this.object );
        }
    }
}
