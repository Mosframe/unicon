// -----------------------------------------------------------------------------
// unicon.ts
// -----------------------------------------------------------------------------
import {app             } from 'electron';
import {BrowserWindow   } from 'electron';
import * as index         from './index';

const path      = require( 'path' );
const url       = require( 'url' );
const datGUI    = require('../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.
const detector  = require('../lib/three.js/examples/js/Detector'); // @types/three/detactor를 사용하는 방법을 몰라서 추가함

/**
 * unicon
 *
 * @author mosframe ( https://github.com/mosframe )
 *
 * @export
 * @class Unicon
 */
export class Unicon {

    // [ Public Variables ]

    // [ Constructors ]

    /**
     * Creates an instance of Unicon.
     *
     * @memberof Unicon
     */
    constructor() {

        // [ main window ]

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

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

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
        //this._mainWindow.setMenu( new Electron.Menu() );
        //this._mainWindow.loadURL(
        //    url.format( {
        //        pathname: path.join( __dirname, 'index.html' ),
        //        protocol: 'file:',
        //        slashes: true
        //    } )
        //);
        this._mainWindow.on( 'closed', function () {
            this._mainWindow = null;
        } );
    }

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}

let unicon = new Unicon();
