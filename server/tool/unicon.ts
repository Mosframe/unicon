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
//import {SceneView           } from './scene-view';

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


    /**
     * render
     *
     *
     * @memberof Unicon
     */
    render() {
    }
    /**
     * tick
     *
     *
     * @memberof Unicon
     */
    tick() {
        //Time._tick();
        this.update();
        this.render();
    }
    /**
     * update
     *
     *
     * @memberof Unicon
     */
    update() {
    }
}

let unicon = new Unicon();
let interval = setInterval( unicon.tick, 1000/30 );