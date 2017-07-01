// -----------------------------------------------------------------------------
// storage.ts
// -----------------------------------------------------------------------------
import {Signal      } from 'signals';
import {Debug       } from '../engine/debug';
import {IStorage    } from './interface';
import {Config      } from './config';
import {Editor      } from './editor';

/**
 * Storage
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Command
 */
export class Storage implements IStorage {

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
     * get data
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
    /**
     * set data
     *
     * @param {*} data
     * @param {Function} callback
     *
     * @memberof Storage
     */
    set ( data:any, callback:Function ) {

        let start = performance.now();

        let transaction = this.database.transaction( [ 'states' ], 'readwrite' );
        let objectStore = transaction.objectStore( 'states' );
        let request     = objectStore.put( data, 0 );

        request.onsuccess = ( event:any ) => {
            Debug.log( 'Saved state to IndexedDB. ' + ( performance.now() - start ).toFixed( 2 ) + 'ms' );
        };

    }
    /**
     * clear data
     *
     * @returns
     *
     * @memberof Storage
     */
    clear () {

        if ( this.database === undefined ) return;

        let transaction = this.database.transaction( [ 'states' ], 'readwrite' );
        let objectStore = transaction.objectStore( 'states' );
        let request = objectStore.clear();
        request.onsuccess = function ( event ) {
            Debug.log( 'Cleared IndexedDB.' );
        };
    }
}
