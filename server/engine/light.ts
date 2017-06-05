// -----------------------------------------------------------------------------
// light.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Component   } from '../engine/component';
import {Transform   } from '../engine/transform';
import {Camera      } from '../engine/camera';
import {SceneManager} from '../engine/scene-manager';


/**
 * Light
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Light
 * @extends {Component}
 */
export class Light extends Component {

    // [ Variables ]

    /**
     * core light
     *
     * @type {GL.Light}
     * @memberof Light
     */
    core : GL.Light;

    // [ Constructors ]

    /**
     * Creates an instance of Light.
     *
     * @memberof Light
     */
    constructor() {
        super();

        this.core = new GL.SpotLight(0xffffff);
        this.core.castShadow = true;
        this.core.position.set(15,30,50);
        this.core.shadow.bias = 0.0001;
        this.core.shadow.mapSize.width = 2048;
        this.core.shadow.mapSize.height = 2048;
        /*
        if( this.core.shadow.camera.type === typeof(GL.PerspectiveCamera) ) {
            if( camera instanceof GL.PerspectiveCamera ) {
                (<GL.PerspectiveCamera>this.core.shadow.camera).fov = (<GL.PerspectiveCamera>camera).fov;
            }
        }
        */

        SceneManager.current._core.add(this.core);
    }

    // [ Static Functions ]

}

