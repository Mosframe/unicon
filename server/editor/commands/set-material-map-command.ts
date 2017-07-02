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
 * @author dforrer / https://github.com/dforrer
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SetMaterialMapCommand
 * @extends {Command}
 */
export class SetMaterialMapCommand extends Command {

    // [ Public ]

    object : any;

    execute () {
		this.object.material[ this._mapName ] = this._newMap;
		this.object.material.needsUpdate = true;
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }

    undo () {
		this.object.material[ this._mapName ] = this._oldMap;
		this.object.material.needsUpdate = true;
		this._editor.signals.materialChanged.dispatch( this.object.material );
    }

    toJSON () : any {
        let output          = super.toJSON();
		output.objectUuid   = this.object.uuid;
		output.mapName      = this._mapName;
		output.newMap       = this._serializeMap( this._newMap );
		output.oldMap       = this._serializeMap( this._oldMap );
        return output;
    }

	fromJSON ( json:any ) {
        super.fromJSON( json );
		this.object     = this._editor.objectByUuid( json.objectUuid );
		this._mapName   = json.mapName;
		this._oldMap    = this._parseTexture( json.oldMap );
		this._newMap    = this._parseTexture( json.newMap );
	}

    // [ Constructor ]

    constructor( object:any, mapName:string, newMap:THREE.Texture ) {
        super();

        this.type       = 'SetMaterialMapCommand';
        this.name       = 'Set Material.' + mapName;
        this.object     = object;
        this._mapName   = mapName;
        this._oldMap    = ( object !== undefined ) ? object.material[ mapName ] : undefined;
        this._newMap    = newMap;
    }

    // [ Private ]

    private _serializeMap ( map:any ) {

        if ( map === null || map === undefined ) return null;

        let meta = {
            geometries  : {},
            materials   : {},
            textures    : {},
            images      : {}
        };

        let json = map.toJSON( meta );
        let images = this._extractFromCache( meta.images );
        if ( images.length > 0 ) json.images = images;
        json.sourceFile = map.sourceFile;

        return json;
    }

    private _mapName    : string;
    private _oldMap     : THREE.Texture;
    private _newMap     : THREE.Texture;

    // Note: The function 'extractFromCache' is copied from Object3D.toJSON()

    // extract data from the cache hash
    // remove metadata on each item
    // and return as array
    private _extractFromCache = ( cache:any ) => {

        let values : any = [];
        for ( let key in cache ) {

            let data = cache[ key ];
            delete data.metadata;
            values.push( data );
        }
        return values;
    }

    private _parseTexture = ( json:any ) => {

        let map : any = null;
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
