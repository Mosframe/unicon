// -----------------------------------------------------------------------------
// main.ts
// -----------------------------------------------------------------------------
import {app             } from 'electron';
import {BrowserWindow   } from 'electron';

const path  = require( 'path' );
const url   = require( 'url' );

/**
 * Main
 *
 * @author mosframe ( https://github.com/mosframe )
 *
 * @export
 * @class Main
 */
export class Main {

    // [ Public Functions ]

    run() : void {

        app.on( 'ready', this._createWindow );

        app.on( 'window-all-closed', function() {
            if( process.platform !== 'darwin' ) {
                app.quit();
            }
        } );

        app.on( 'activate', function() {
            if ( this._mainWindow === null ) {
                this.createWindow();
            }
        } );
    }

    // [ Constructors ]

    // [ Protected Variables ]

    protected _mainWindow : Electron.BrowserWindow;

    // [ Protected Functions ]

    protected _createWindow() {
        this._mainWindow = new BrowserWindow( {
            webPreferences:{
                nodeIntegration: false
            }
        } );
        this._mainWindow.maximize();
        this._mainWindow.setMenu( new Electron.Menu() );
        this._mainWindow.loadURL(
            url.format({
                pathname: path.join( __dirname, '../client/assets/editor/index.html' ),
                protocol: 'file:',
                slashes: true
            })
        );
        this._mainWindow.on( 'closed', function () {
            this._mainWindow = null;
        } );
    }
}

let main = new Main();
main.run();
