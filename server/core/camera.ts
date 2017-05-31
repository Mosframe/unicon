// -----------------------------------------------------------------------------
// camera.ts
// -----------------------------------------------------------------------------
import * as GL        from './graphic';
import {Component   } from './component';
import {Scene       } from './scene';


/**
 * Camera
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class Camera
 * @extends {Component}
 */
export class Camera extends Component {

    // [ Variables ]

    /**
     * camera
     *
     * @type {GL.Camera}
     * @memberof Camera
     */
    core : GL.Camera;

    // [ Constructors ]

    /**
     * Creates an instance of Camera.
     *
     * @memberof Camera
     */
    constructor( scene:Scene ) {
        super();
        this.core = new GL.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.core.position.set( 40, 40, 40);
        //this.camera.lookAt( new GL.Vector3(0,0,0) );
        this.core.lookAt( scene.core.position );
    }
}

