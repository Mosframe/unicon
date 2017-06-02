// -----------------------------------------------------------------------------
// scene-view.ts
// -----------------------------------------------------------------------------
import {PrimitiveType   }  from '../engine/primitive-type';
import {GameObject      }  from '../engine/game-object';
import {Light           }  from '../engine/light';
import {Camera          }  from '../engine/camera';
import {Renderer        }  from '../engine/renderer';
import {MeshRenderer    }  from '../engine/mesh-renderer';
import {Scene           }  from '../engine/scene';
import {Tools           }  from '../editor/tools';
import {ViewTool        }  from '../editor/view-tool';

/**
 * Scene View.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class SceneView
 */
export class SceneView {

    // [ Public Variables ]

    renderer    : Renderer;
    camera      : Camera;   // editor camera
    light       : Light;    // editor light
    scene       : Scene;    // current scene

    // [ Constructors ]

    /**
     * Creates an instance of SceneView.
     * @param {HTMLElement} container
     *
     * @memberof SceneView
     */
    constructor( container:HTMLElement ) {
        // scene setting
        this.scene = new Scene();
        // renderer setting
        this.renderer = new MeshRenderer( container );
        // camera setting
        this.camera = new Camera();
        // light setting
        this.light = new Light();

        // 임시로 큐브 생성
        GameObject.createPrimitive( PrimitiveType.cube );

    }

    // [ Private Functions ]

    update() {

        let objects = this.scene.getRootGameObjects();
        for( let object of objects ) {
            let components = object.getComponents();
            for( let component of components ) {

            }
        }

        // cube animation
        {
            if( cube.controller ) {
                cube.mesh.rotation.x += cube.controller.rotSpeed.x;
                cube.mesh.rotation.y += cube.controller.rotSpeed.y;
                cube.mesh.rotation.z += cube.controller.rotSpeed.z;
            }
        }
    }

}
