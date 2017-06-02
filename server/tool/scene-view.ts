// -----------------------------------------------------------------------------
// scene-view.ts
// -----------------------------------------------------------------------------
import * as GL             from '../engine/graphic';
import {PrimitiveType   }  from '../engine/primitive-type';
import {GameObject      }  from '../engine/game-object';
import {Light           }  from '../engine/light';
import {Camera          }  from '../engine/camera';
import {Renderer        }  from '../engine/renderer';
import {MeshRenderer    }  from '../engine/mesh-renderer';
import {Scene           }  from '../engine/scene';
import {Tools           }  from '../editor/tools';
import {ViewTool        }  from '../editor/view-tool';
import {OrbitControls   }  from '../editor/orbit-controls';

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
        // axis
        {
            let axis = new GL.AxisHelper(10);
            //axis.position.set(-60,0,-60);
            this.scene.core.add( axis );
        }
        // grids
        {
            // y
            let grid = new GL.GridHelper(100,20,0xffff00,0x000000);
            this.scene.core.add( grid );
            // z
            //let grid2 = new GL.GridHelper(100,20,0xffff00,0x000000);
            //grid2.rotation.x = -0.5 * Math.PI;
            //this.scene.core.add( grid2 );
            // x
            //let grid3 = new GL.GridHelper(100,20,0xffff00,0x000000);
            //grid3.rotation.x = -0.5 * Math.PI;
            //grid3.rotation.z = -0.5 * Math.PI;
            //this.scene.core.add( grid3 );
        }

        // cube (임시)
        GameObject.createPrimitive( PrimitiveType.cube );
        // Plane (임시)
        GameObject.createPrimitive( PrimitiveType.plane );

        // camera controll
        {
            let cameraControls = new OrbitControls( this.camera.core, this.renderer.core.domElement );
            cameraControls.mouseButtons.PAN = GL.MOUSE.MIDDLE;
            cameraControls.mouseButtons.ZOOM = GL.MOUSE.RIGHT;
            cameraControls.addEventListener( 'change', (event:Event)=>{} );
        }
    }

    // [ Private Functions ]

    update() {

        let objects = this.scene.getRootGameObjects();
        for( let object of objects ) {
            let components = object.getComponents();
            for( let component of components ) {
                component.update();
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

    tick() {
        this.update();
        this.renderer.render( this.scene, this.camera );
    }

}
