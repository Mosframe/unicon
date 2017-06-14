// -----------------------------------------------------------------------------
// storage.ts
// -----------------------------------------------------------------------------
import {Signal  } from 'signals';
import {Config  } from './config';
import {Editor  } from './editor';

/**
 * Storage
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Command
 */
export class Storage {

    // [ Public Variables ]

	name        : string;
	version     : number;
	indexedDB   : IDBFactory;
	database    : any;

    // [ Constructors ]

    constructor() {

        this.indexedDB = window.indexedDB;
        if( indexedDB === undefined ) {
            console.warn( 'Storage: IndexedDB not available.' );
            return;
        }

        this.name = 'UniconEditor';
        this.version = 1;
    }

    // [ Public Functions ]

    /**
     * init
     *
     * @param {Function} callback
     *
     * @memberof Storage
     */
	init ( callback:Function ) {

        let request = indexedDB.open( name, this.version );

        request.onupgradeneeded = ( event:any ) => {
            let db = event.target.result;
            if( db.objectStoreNames.contains( 'states' ) === false ) {
                db.createObjectStore( 'states' );
            }
        };
        request.onsuccess = ( event:any ) => {
            this.database = event.target.result;
            callback();
        };
        request.onerror = ( event ) => {
            console.error( 'IndexedDB', event );
        };
    };

    /**
     * get
     *
     * @param {Function} callback
     *
     * @memberof Storage
     */
    get ( callback:Function ) {

        let transaction = this.database.transaction( [ 'states' ], 'readwrite' );
        let objectStore = transaction.objectStore( 'states' );
        let request = objectStore.get( 0 );
        request.onsuccess = ( event ) => {
            callback( event.target.result );
        };
    }

    set ( data:any, callback:Function ) {

        let start = performance.now();

        let transaction = this.database.transaction( [ 'states' ], 'readwrite' );
        let objectStore = transaction.objectStore( 'states' );
        let request     = objectStore.put( data, 0 );

        request.onsuccess = ( event:any ) => {
            console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Saved state to IndexedDB. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );
        };

    }

    clear () {

        if ( database === undefined ) return;

        var transaction = database.transaction( [ 'states' ], 'readwrite' );
        var objectStore = transaction.objectStore( 'states' );
        var request = objectStore.clear();
        request.onsuccess = function ( event ) {

            console.log( '[' + /\d\d\:\d\d\:\d\d/.exec( new Date() )[ 0 ] + ']', 'Cleared IndexedDB.' );

        };

    }

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
