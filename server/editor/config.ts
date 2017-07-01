// -----------------------------------------------------------------------------
// config.ts
// -----------------------------------------------------------------------------
import {Debug   } from '../engine/debug';
/**
 * config
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Config
 */
export class Config {

    // [ public ]

    getKey ( key:string ) { return this._storage[ key ]; }

    setKey ( ...args:any[] ) {

        for( var i = 0, l = args.length; i < l; i += 2 ) {
            this._storage[ args[ i ] ] = args[ i + 1 ];
        }

        window.localStorage[ this._name ] = JSON.stringify( this._storage );

        Debug.log( 'Saved config to LocalStorage.' );
    }

    clear () {
        delete window.localStorage[ this._name ];
    }

    // [ constructor ]

    constructor( name:string ) {

        this._name = name;
        if ( window.localStorage[ name ] === undefined ) {
            window.localStorage[ name ] = JSON.stringify( this._storage );
        } else {
            let data = JSON.parse( window.localStorage[ name ] );
            for ( let key in data ) {
                this._storage[ key ] = data[ key ];
            }
        }
    }

    // [ private ]

    private _name : string;
    private _storage = {
		'autosave'                      : true,
		'theme'                         : 'css/light.css',
		'project/renderer'              : 'WebGLRenderer',
		'project/renderer/antialias'    : true,
		'project/renderer/gammaInput'   : false,
		'project/renderer/gammaOutput'  : false,
		'project/renderer/shadows'      : true,
		'project/vr'                    : false,
		'settings/history'              : false
	};
}
