// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import * as THREE         from 'three';
import {PrimitiveType   } from './primitive-type';
import {Vector3         } from './vector3';
import {Quaternion      } from './quaternion';
import {UObject         } from './object';
import {Component       } from './component';
import {Transform       } from './transform';
import {Scene           } from './scene';

/**
 * GameObject
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class GameObject
 * @extends {Object}
 */
export class GameObject extends UObject {

    /*
    activeInHierarchy   : boolean;
    activeSelf          : boolean;
    isStatic            : boolean;
    layer               : string;
    scene               : Scene;
    tag                 : string;
    */
    transform           : Transform;

    components : {[id:string]:Component}

    /**
     * Creates an instance of GameObject.
     *
     * @memberof GameObject
     */
    constructor(){
        super();
        this.transform = new Transform();
        this.components[this.transform.getInstanceID()] = this.transform;
    }

    /*
    addComponent() {

    }

    broadcastMessage() {

    }

    compareTag() {

    }

    getComponent() {

    }
    getComponentInChildren() {

    }
    getComponentInParent() {

    }
    getComponents() {

    }
    getComponentsInChildren() {

    }
    getComponentsInParent() {

    }

    sendMessage () {

    }
    sendMessageUpwards() {

    }
    setActive() {

    }
    */

    // [ Static Function ] --------------------------------------------------------------------------------------------------

    static createPrimitive( type:PrimitiveType ) : GameObject {
        let gameObject = new GameObject();

        let geometry    = new THREE.PlaneGeometry( 1, 1, 1 );
        let material    = new THREE.MeshLambertMaterial({color:0xffffff});
        let mesh        = new THREE.Mesh( geometry, material );
        this.mesh.rotation.x = -0.5 * Math.PI;
        this.mesh.receiveShadow = true;
        sceneView.add( this.mesh );

        THREE.CubeGeometry()
        this.components[this.transform.getInstanceID()] = this.transform;


        return gameObject;
    }

    /*
    static Find() {

    }
    static FindGameObjectsWithTag() {

    }
    static FindWithTag() {

    }
    */

    // [ private ] --------------------------------------------------------------------------------------------------

}

