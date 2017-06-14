// -----------------------------------------------------------------------------
// scene-view.ts
// -----------------------------------------------------------------------------
import deprecated             from 'deprecated-decorator';
import * as GL                from '../engine/graphic';
import {EditorWindow        } from '../editor/editor-window';
import {Camera              } from '../engine/camera';
import {Color               } from '../engine/color';
import {GameObject          } from '../engine/game-object';
import {PrimitiveType       } from '../engine/primitive-type';
import {Light               } from '../engine/light';
import {MeshRenderer        } from '../engine/mesh-renderer';
import {Renderer            } from '../engine/renderer';
import {ShadowCastingMode   } from '../engine/rendering/shadow-casting-mode';
import {Scene               } from '../engine/scene-management/scene';
import {SceneManager        } from '../engine/scene-management/scene-manager';
import {Vector3             } from '../engine/vector3';



/**
 * The Scene View is your interactive view into the world you are creating.
 * You will use the Scene View to select and position scenery, characters, cameras, lights, and all other types of Game Object.
 * Being able to Select, manipulate and modify objects in the Scene View are some of the first skills you must learn to begin working in Unicon.
 *
 * @author mosframe ( https://github.com/mosframe )
 *
 * @export
 * @class SceneView
 * @extends {EditorWindow}
 */
export class SceneView extends EditorWindow {

    // [ Public Variables ]

    // [ Constructors ]

    constructor( container:HTMLDivElement ) {
        super();

        this._renderer = new GL.WebGLRenderer();
        this._renderer.setSize( window.innerWidth, window.innerHeight );
        this._renderer.setClearColor(0xdddddd);
        this._renderer.shadowMap.enabled = true;
        container.appendChild( this._renderer.domElement );

        this._scene = new Scene();
        SceneManager.loadScene2( this._scene );

        {
            let go = new GameObject();
            this._camera = go.addComponent( Camera );
            this._camera.transform.lookAt2( this._scene.core.position );
        }

        {
            let go = new GameObject();
            this._light = go.addComponent( Light );
            console.log( go.transform );
            go.transform.position.set( 15, 30, 50 );
        }


        /*
        {
            let geometry    = new GL.BoxGeometry( 5, 5, 5 );
            let material    = new GL.MeshLambertMaterial({color:0xff3300});
            var mesh        = new GL.Mesh( geometry, material );
            mesh.position.x = 2.5;
            mesh.position.y = 2.5;
            mesh.position.z = 2.5;
            mesh.castShadow = true;
            this._scene.core.add( mesh );
        }
        */

        this._plane = GameObject.createPrimitive( PrimitiveType.plane );
        this._cube  = GameObject.createPrimitive( PrimitiveType.cube );

        this._cube.transform.localScale = new Vector3(5,5,5);
        this._cube.transform.position.y += 6;
        this._plane.transform.localScale = new Vector3(5,5,5);

        let cubeRenderer = this._cube.getComponent(Renderer);
        if( cubeRenderer ) {
            cubeRenderer.receiveShadows = true;
            cubeRenderer.shadowCastingMode = ShadowCastingMode.on;
            cubeRenderer.material.color = new Color(1,0,0,1);
        }

        let planeRenderer = this._plane.getComponent(Renderer);
        if( planeRenderer ) {
            planeRenderer.receiveShadows = true;
            planeRenderer.shadowCastingMode = ShadowCastingMode.on;
        }

    }

    // [ Public Functions ]

    render() {
        super.render();

        this._renderer.render( this._scene.core, this._camera.core );
    }

    update() {
        super.update();
    }


    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Protected Variables ]

    protected _renderer : GL.WebGLRenderer;
    protected _scene    : Scene;
    protected _camera   : Camera;
    protected _light    : Light;
    protected _plane    : GameObject;
    protected _cube     : GameObject;


    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
