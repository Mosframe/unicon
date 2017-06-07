// -----------------------------------------------------------------------------
// scene-view.ts
// -----------------------------------------------------------------------------
import deprecated     from 'deprecated-decorator';
import {GameObject  } from '../engine/game-object';
import * as GL        from '../engine/graphic';
import {EditorWindow} from '../editor/editor-window';

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

    constructor() {
        super();

        this.scene = new GL.Scene();
        this.camera = new GL.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.scene.add( this.camera );


    }

    // [ Public Functions ]

    render() {
        super.render();
    }

    update() {
        super.update();
    }


    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Protected Variables ]

    protected scene : GL.Scene;
    protected camera : GL.Camera;

    protected plane : GameObject;
    protected cube  : GameObject;


    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
