// -----------------------------------------------------------------------------
// config.ts
// -----------------------------------------------------------------------------
/**
 * Config data
 *
 * [save/load] localStorage
 *
 * JSON format
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Config
 */
export class Config {

    // [ Public Delegates ]

    // [ Public Static Variables ]

    // [ Public Variables ]

    /**
     * get value
     *
     * @param {string} key
     * @returns
     *
     * @memberof Config
     */
    getKey ( key:string ) { return this._storage[ key ]; }
    /**
     * set value
     *
     * @param {...any[]} args key, value, key, value ...
     *
     * @memberof Config
     */
    setKey ( ...args:any[] ) {

        for( var i = 0, l = args.length; i < l; i += 2 ) {
            this._storage[ args[ i ] ] = args[ i + 1 ];
        }

        window.localStorage[ this._name ] = JSON.stringify( this._storage );

        let header = '';
        let dateString = /\d\d\:\d\d\:\d\d/.exec( Date.now().toString() );
        if( dateString ) header = dateString[0];
        console.log( '[' + header + ']', 'Saved config to LocalStorage.' );
    }
    /**
     * clear localStorage
     *
     *
     * @memberof Config
     */
    clear () {
        delete window.localStorage[ this._name ];
    }

    // [ Constructors ]

    /**
     * Creates an instance of Config.
     * @param {string} name config name
     *
     * @memberof Config
     */
    constructor( name:string ) {

        this._name = name;
        if ( window.localStorage[ name ] === undefined ) {
            window.localStorage[ name ] = JSON.stringify( this._storage );
        } else {
            var data = JSON.parse( window.localStorage[ name ] );
            for ( var key in data ) {
                this._storage[ key ] = data[ key ];
            }
        }
    }

    // [ Public Static Functions ]

    // [ Public Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    protected _name : string;

    protected _storage = {
		'autosave': true,
		'theme': 'css/dark.css',

		'project/renderer': 'WebGLRenderer',
		'project/renderer/antialias': true,
		'project/renderer/gammaInput': false,
		'project/renderer/gammaOutput': false,
		'project/renderer/shadows': true,
		'project/vr': false,

		'settings/history': false
	};

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
