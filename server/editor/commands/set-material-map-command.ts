// -----------------------------------------------------------------------------
// set-material-map-command.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {ICommand    } from '../interface';
import {IEditor     } from '../interface';
import {Command     } from '../command';

/**
 * SetMaterialMapCommand
 *
 * Developed as part of a project at University of Applied Sciences and Arts Northwestern Switzerland (www.fhnw.ch)
 *
 * @author dforrer ( https://github.com/dforrer )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class SetMaterialMapCommand
 * @extends {Command}
 */
export class SetMaterialMapCommand extends Command {

    // [ Public Variables ]

    object      : THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject;
    mapName     : string;
    oldMap      : THREE.Texture;
    newMap      : THREE.Texture;

    // [ Public Functions ]

    /**
     * execute
     *
     * @memberof SetMaterialMapCommand
     */
    execute () {
		this.object.material[ this.mapName ] = this.newMap;
		this.object.material.needsUpdate = true;
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }
    /**
     * undo
     *
     * @memberof SetMaterialMapCommand
     */
    undo () {
		this.object.material[ this.mapName ] = this.oldMap;
		this.object.material.needsUpdate = true;
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }
    /**
     * to JSON
     *
     * @returns {*}
     * @memberof SetMaterialMapCommand
     */
    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.mapName      = this.mapName;
		output.newMap       = this.serializeMap( this.newMap );
		output.oldMap       = this.serializeMap( this.oldMap );
        return output;
    }
    /**
     * from JSON
     *
     * @param {*} json
     * @memberof SetMaterialMapCommand
     */
	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object     = <THREE.Mesh>this._editor.objectByUuid( json.objectUuid );
		this.mapName    = json.mapName;
		this.oldMap     = this.parseTexture( json.oldMap );
		this.newMap     = this.parseTexture( json.newMap );
	}

    // [ Constructors ]

    /**
     * Creates an instance of SetMaterialMapCommand.
     * @param {(THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject)} object
     * @param {string} mapName
     * @param {THREE.Texture} newMap
     * @memberof SetMaterialMapCommand
     */
    constructor( object:THREE.Line|THREE.Mesh|THREE.Points|THREE.Sprite|THREE.ImmediateRenderObject, mapName:string, newMap:THREE.Texture ) {
        super();

        this.type       = 'SetMaterialMapCommand';
        this.name       = 'Set Material.' + mapName;
        this.object     = object;
        this.mapName    = mapName;
        this.oldMap     = ( object !== undefined ) ? object.material[ mapName ] : undefined;
        this.newMap     = newMap;
    }

    // [ Protected Functions ]

    protected serializeMap ( map:any ) {

        if ( map === null || map === undefined ) return null;

        let meta = {
            geometries  : {},
            materials   : {},
            textures    : {},
            images      : {}
        };

        let json = map.toJSON( meta );
        let images = this.extractFromCache( meta.images );
        if ( images.length > 0 ) json.images = images;
        json.sourceFile = map.sourceFile;

        return json;
    }

    // Note: The function 'extractFromCache' is copied from Object3D.toJSON()

    // extract data from the cache hash
    // remove metadata on each item
    // and return as array
    protected extractFromCache ( cache:any ) {

        let values = [];
        for ( let key in cache ) {

            let data = cache[ key ];
            delete data.metadata;
            values.push( data );
        }
        return values;
    }

    protected parseTexture ( json:any ) {

        let map = null;
        if ( json !== null ) {
            let loader      = new THREE.ObjectLoader();
            let images      = loader.parseImages( json.images, ()=>{} );
            let textures    = loader.parseTextures( [ json ], images );
            map = textures[ json.uuid ];
            map.sourceFile = json.sourceFile;
        }
        return map;
    }

}
