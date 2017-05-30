// -----------------------------------------------------------------------------
// camera.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
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

    /**
     * camera
     *
     * @type {THREE.Camera}
     * @memberof Camera
     */
    camera : THREE.Camera;

    /**
     * Creates an instance of Camera.
     *
     * @memberof Camera
     */
    constructor( scene:Scene ) {
        super();
        this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
        this.camera.position.set( 40, 40, 40);
        //this.camera.lookAt( new THREE.Vector3(0,0,0) );
        this.camera.lookAt( scene.scene.position );
    }

    // [ private ] --------------------------------------------------------------------------------------------------
}

