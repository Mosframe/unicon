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

import {OrbitControls   }  from '../editor/orbit-controls';
import {Selection       }  from '../editor/selection';
import {Tools           }  from '../editor/tools';
import {ViewTool        }  from '../editor/view-tool';

import {EditorScene     }  from '../tool/editor-scene';


/**
 * Scene View.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class SceneView
 */
export class SceneView {

    // [ Public Variables ]

    /**
     * renderer
     *
     * @type {GL.WebGLRenderer}
     * @memberof Renderer
     */
    renderer    : GL.WebGLRenderer;

    camera      : Camera; // editor camera
    light       : Light;  // editor light
    scene       : EditorScene;  // current scene

    // [ Constructors ]

    /**
     * Creates an instance of SceneView.
     * @param {HTMLElement} container
     *
     * @memberof SceneView
     */
    constructor( container:HTMLElement ) {

        // renderer setting
        this.renderer = new GL.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0xdddddd);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = GL.PCFShadowMap;
        container.appendChild( this.renderer.domElement );

        // scene setting
        this.scene = new EditorScene();
        // camera setting
        this.camera = new Camera();
        // light setting
        this.light = new Light();
        // axis
        this.scene.addAxisHelper( 10 );
        // grids
        this.scene.addGridHelper( 100, 20, 0xffff00, 0x000000 );

        // cube (임시)
        let cube = GameObject.createPrimitive( PrimitiveType.cube );
        // Plane (임시)
        GameObject.createPrimitive( PrimitiveType.plane );

        // 오브젝트 선택
        Selection.setActiveObjectWithContext( cube, cube.transform );

        // camera controll
        {
            let cameraControls = new OrbitControls( this.camera._core, this.renderer.domElement );
            cameraControls.mouseButtons.PAN = GL.MOUSE.MIDDLE;
            cameraControls.mouseButtons.ZOOM = GL.MOUSE.RIGHT;
            cameraControls.addEventListener( 'change', (event:Event)=>{} );
        }
    }

    // [ Public Functions ]

    /**
     * render
     *
     * @memberof Renderer
     */
    render() {
        this.renderer.render( this.scene._core, this.camera._core );
    }

    /**
     * update
     *
     *
     * @memberof SceneView
     */
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
            //if( cube.controller ) {
            //    cube.mesh.rotation.x += cube.controller.rotSpeed.x;
            //    cube.mesh.rotation.y += cube.controller.rotSpeed.y;
            //    cube.mesh.rotation.z += cube.controller.rotSpeed.z;
            //}
        }
    }
}