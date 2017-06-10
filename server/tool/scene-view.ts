// -----------------------------------------------------------------------------
// scene-view.ts
// -----------------------------------------------------------------------------
import deprecated         from 'deprecated-decorator';
import * as GL            from '../engine/graphic';
import {EditorWindow    } from '../editor/editor-window';
import {Camera          } from '../engine/camera';
import {GameObject      } from '../engine/game-object';
import {PrimitiveType   } from '../engine/primitive-type';
import {MeshRenderer    } from '../engine/mesh-renderer';
import {Scene           } from '../engine/scene';
import {SceneManager    } from '../engine/scene-manager';



/**
 * The Scene View is your interactive view into the world you are creating.
 * You will use the Scene View to select and position scenery, characters, cameras, lights, and all other types of Game Object.
 * Being able to Select, manipulate and modify objects in the Scene View are some of the first skills you must learn to begin working in Unicon.
 *
 * @author mosframe / https://github.com/mosframe
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

        let go = new GameObject();
        this._camera = go.addComponent( Camera );
        let trans = this._camera.transform;
        if( trans ) trans.lookAt2( this._scene.core.position );

        this._light = new GL.SpotLight(0xffffff);
        this._light.castShadow = true;
        this._light.position.set(15,30,50);
        this._scene.core.add( this._light );


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

        //this._plane = GameObject.createPrimitive( PrimitiveType.plane );
        this._cube  = GameObject.createPrimitive( PrimitiveType.cube );
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
    protected _light    : GL.Light;
    protected _plane    : GameObject;
    protected _cube     : GameObject;


    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
