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

    // [ Constructors ]

    /**
     * Creates an instance of Light.
     *
     * @memberof Light
     */
    constructor() {
        super();

        this._core = new GL.SpotLight(0xffffff);
        this._core.castShadow = true;
        this._core.position.set(15,30,50);
        this._core.shadow.bias = 0.0001;
        this._core.shadow.mapSize.width = 2048;
        this._core.shadow.mapSize.height = 2048;
        /*
        if( this.core.shadow.camera.type === typeof(GL.PerspectiveCamera) ) {
            if( camera instanceof GL.PerspectiveCamera ) {
                (<GL.PerspectiveCamera>this.core.shadow.camera).fov = (<GL.PerspectiveCamera>camera).fov;
            }
        }
        */

        SceneManager.current.addLight(this);
    }

    // [ Static Functions ]

    /**
     * core light
     *
     * @type {GL.Light}
     * @memberof Light
     */
    _core : GL.Light;
}

