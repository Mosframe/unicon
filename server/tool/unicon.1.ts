// -----------------------------------------------------------------------------
// unicon.ts
// -----------------------------------------------------------------------------
import * as GL            from '../engine/graphic';
import {GameView        } from './game-view';
import {HierarchyWindow } from './hierarchy-window';
import {InspectorWindow } from './inspector-window';
import {ProjectWindow   } from './project-window';
import {SceneView       } from './scene-view';
import {Toolbar         } from './toolbar';

let datGUI      = require('../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.
let detector    = require('../lib/three.js/examples/js/Detector'); // @types/three/detactor를 사용하는 방법을 몰라서 추가함

let container = document.createElement( 'div' );
document.body.appendChild( container );

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
        this._gameView        = new GameView();
        this._hierarchyWindow = new HierarchyWindow();
        this._inspectorWindow = new InspectorWindow();
        this._projectWindow   = new ProjectWindow();
        this._sceneView       = new SceneView( container );
        this._toolbar         = new Toolbar();
    }

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    /**
     * tick
     *
     *
     * @memberof Unicon
     */
    public tick() : void {
        this._update();
        this._render();
    }

    // [ Protected Variables ]

    protected _gameView         : GameView
    protected _hierarchyWindow  : HierarchyWindow
    protected _inspectorWindow  : InspectorWindow
    protected _projectWindow    : ProjectWindow
    protected _sceneView        : SceneView
    protected _toolbar          : Toolbar

    // [ Protected Functions ]

    protected _render() : void {
        this._gameView.render();
        this._sceneView.render();
        this._hierarchyWindow.render();
        this._inspectorWindow.render();
        this._projectWindow.render();
        this._toolbar.render();
    }

    protected _update() : void {
        this._gameView.update();
        this._sceneView.update();
        this._hierarchyWindow.update();
        this._inspectorWindow.update();
        this._projectWindow.update();
        this._toolbar.update();
    }

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}

let unicon = new Unicon();
let interval = setInterval( unicon.tick(), 1000/30 );