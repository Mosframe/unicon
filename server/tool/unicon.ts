// -----------------------------------------------------------------------------
// unicon.ts
// -----------------------------------------------------------------------------
import * as GL                from '../engine/graphic';
//import {Behaviour           } from '../engine/behaviour';
//import {Camera              } from '../engine/camera';
//import {EditorApplication   } from '../editor/editor-application';
//import {GameObject          } from '../engine/game-object';
//import {Light               } from '../engine/light';
//import {MeshRenderer        } from '../engine/mesh-renderer';
//import {OrbitControls       } from '../editor/orbit-controls';
//import {PrimitiveType       } from '../engine/primitive-type';
//import {Renderer            } from '../engine/renderer';
//import {Scene               } from '../engine/scene';
//import {Time                } from '../engine/time';
//import {Vector3             } from '../engine/vector3';
//import {Windows             } from './windows';
//
import {GameView        } from './game-view';
import {HierarchyWindow } from './hierarchy-window';
import {InspectorWindow } from './inspector-window';
import {ProjectWindow   } from './project-window';
import {SceneView       } from './scene-view';
import {Toolbar         } from './toolbar';

let DatGUI      = require('../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.
let Detector    = require('../lib/three.js/examples/js/Detector'); // @types/three/detactor를 사용하는 방법을 몰라서 추가함

let container = document.createElement( 'div' );
document.body.appendChild( container );

/**
 * unicon
 *
 * @author mosframe / https://github.com/mosframe
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
    public tick() {
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

    protected _render() {
    }

    protected _update() {
    }

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}

let unicon = new Unicon();
let interval = setInterval( unicon.tick, 1000/30 );