// -----------------------------------------------------------------------------
// light.ts
// -----------------------------------------------------------------------------
import * as GL        from './graphic';
import {Component   } from './component';
import {Camera      } from './camera';
import {Scene       } from './scene';


/**
 * Light
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class Light
 * @extends {Component}
 */
export class Light extends Component {

    // [ Variables ]

    /**
     * light
     *
     * @type {GL.Light}
     * @memberof Light
     */
    core : GL.Light;

    // [ Constructors ]

    /**
     * Creates an instance of Camera.
     *
     * @memberof Camera
     */
    constructor( scene:Scene, camera:Camera ) {
        super();
        this.core = new GL.SpotLight(0xffffff);
        this.core.castShadow = true;
        this.core.position.set(15,30,50);
        if( this.core.shadow.camera.type === typeof(GL.PerspectiveCamera) ) {
            if( camera.core instanceof GL.PerspectiveCamera ) {
                (<GL.PerspectiveCamera>this.core.shadow.camera).fov = (<GL.PerspectiveCamera>camera.core).fov;
            }
        }
        this.core.shadow.bias = 0.0001;
        this.core.shadow.mapSize.width = 2048;
        this.core.shadow.mapSize.height = 2048;
        scene.core.add(this.core);
    }
}

