// -----------------------------------------------------------------------------
// light.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
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

    /**
     * light
     *
     * @type {THREE.Light}
     * @memberof Light
     */
    light : THREE.Light;

    /**
     * Creates an instance of Camera.
     *
     * @memberof Camera
     */
    constructor( scene:Scene, camera:Camera ) {
        super();
        this.light = new THREE.SpotLight(0xffffff);
        this.light.castShadow = true;
        this.light.position.set(15,30,50);
        if( this.light.shadow.camera.type === typeof(THREE.PerspectiveCamera) ) {
            if( camera.camera instanceof THREE.PerspectiveCamera ) {
                (<THREE.PerspectiveCamera>this.light.shadow.camera).fov = (<THREE.PerspectiveCamera>camera.camera).fov;
            }
        }
        this.light.shadow.bias = 0.0001;
        this.light.shadow.mapSize.width = 2048;
        this.light.shadow.mapSize.height = 2048;
        scene.scene.add(this.light);
    }

    // [ private ] --------------------------------------------------------------------------------------------------
}

