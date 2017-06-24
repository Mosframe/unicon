// -----------------------------------------------------------------------------
// set-material-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {            } from '../../engine/object';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetMaterialCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetMaterialCommand
 * @extends {Command}
 */
export class SetMaterialCommand extends Command {

    // [ Public Variables ]

    object      : THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject;
    oldMaterial : THREE.Material;
    newMaterial : THREE.Material;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetMaterialCommand
     */
    execute () {
		this.object.material = this.newMaterial;
		this._editor.signals.materialChanged.dispatch( this.newMaterial );
    }
    /**
     * undo
     *
     * @memberof SetMaterialCommand
     */
    undo () {
		this.object.material = this.oldMaterial;
		this._editor.signals.materialChanged.dispatch( this.oldMaterial );
    }
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetMaterialCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.oldMaterial  = this.oldMaterial.toJSON();
		output.newMaterial  = this.newMaterial.toJSON();
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetMaterialCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );

		this.object         = <THREE.Mesh>this._editor.objectByUuid( json.objectUuid );
		this.oldMaterial    = this.parseMaterial( json.oldMaterial );
		this.newMaterial    = this.parseMaterial( json.newMaterial );
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetMaterialCommand.
     * @param {THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject} object
     * @param {THREE.Material} newMaterial
     * @memberof SetMaterialCommand
     */
    constructor( object:THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject, newMaterial:THREE.Material ) {
        super();

        this.type           = 'SetMaterialCommand';
        this.name           = 'New Material';
        this.object         = object;
        this.oldMaterial    = ( object !== undefined ) ? object.material : undefined;
        this.newMaterial    = newMaterial;
    }

    protected parseMaterial ( json:any ) {

        let loader      = new THREE.ObjectLoader();
        let images      = loader.parseImages( json.images, () => {} );
        let textures    = loader.parseTextures( json.textures, images );
        let materials   = loader.parseMaterials( [ json ], textures );
        return materials[ json.uuid ];
    }
}
