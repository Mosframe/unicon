// -----------------------------------------------------------------------------
// editor-scene.ts
// -----------------------------------------------------------------------------
import * as GL             from '../engine/graphic';
import {PrimitiveType   }  from '../engine/primitive-type';
import {GameObject      }  from '../engine/game-object';
import {Light           }  from '../engine/light';
import {Camera          }  from '../engine/camera';
import {Renderer        }  from '../engine/renderer';
import {MeshRenderer    }  from '../engine/mesh-renderer';
import {Scene           }  from '../engine/scene';

import {OrbitControls   }  from '../editor/orbit-controls';
import {Selection       }  from '../editor/selection';
import {Tools           }  from '../editor/tools';
import {ViewTool        }  from '../editor/view-tool';


/**
 * Scene View.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class SceneView
 */
export class EditorScene extends Scene {

    // [ Public Variables ]

    addAxisHelper( size?:number ) {
        let axis = new GL.AxisHelper(size);
        //axis.position.set(-60,0,-60);
        this._core.add( axis );
    }

    addGridHelper( size:number, divisions:number, color1?:number|GL.Color, color2?:number|GL.Color ) {

        // y
        let grid = new GL.GridHelper(size,divisions,color1,color2);
        if( grid ) {
            this._core.add( grid );
        }
        // z
        //let grid2 = new GL.GridHelper(100,20,0xffff00,0x000000);
        //grid2.rotation.x = -0.5 * Math.PI;
        //this.scene.inner.add( grid2 );
        // x
        //let grid3 = new GL.GridHelper(100,20,0xffff00,0x000000);
        //grid3.rotation.x = -0.5 * Math.PI;
        //grid3.rotation.z = -0.5 * Math.PI;
        //this.scene.inner.add( grid3 );
    }
}
