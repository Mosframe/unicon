// -----------------------------------------------------------------------------
// unicon.ts
// -----------------------------------------------------------------------------
import * as GL            from '../engine/graphic';
import {OrbitControls   } from '../editor/orbit-controls';
import {Vector3         } from '../engine/vector3';
import {Behaviour       } from '../engine/behaviour';
import {MeshRenderer    } from '../engine/mesh-renderer';
import {PrimitiveType   } from '../engine/primitive-type';
import {Camera          } from '../engine/camera';
import {Light           } from '../engine/light';
import {GameObject      } from '../engine/game-object';
import {Renderer        } from '../engine/renderer';
import {Scene           } from '../engine/scene';
import {SceneView       } from './scene-view';

let Detector        = require('../../lib/three.js/examples/js/Detector'); // @types/three/detactor를 사용하는 방법을 몰라서 추가함
let DatGUI          = require('../../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.


let container = document.createElement( 'div' );
document.body.appendChild( container );


/**
 * unicon
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class SceneView
 */
export class Unicon {

    // [ Public Variables ]

    sceneView : SceneView;

    // [ Constructors ]

    constructor() {
        this.sceneView = new SceneView( container );
    }

    tick() {
        requestAnimationFrame( this.tick );
        this.sceneView.tick();
    }
}

let unicon = new Unicon();
unicon.tick();