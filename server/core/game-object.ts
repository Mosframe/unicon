// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import deprecated         from 'deprecated-decorator';
import * as GL            from './graphic';
import {PrimitiveType   } from './primitive-type';
import {Vector3         } from './vector3';
import {Quaternion      } from './quaternion';
import {UObject         } from './object';
import {Geometry        } from './geometry';
import {Component       } from './component';
import {Transform       } from './transform';
import {Mesh            } from './mesh';
import {MeshFilter      } from './mesh-filter';
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

    // [ Variables ]

    /*
    activeInHierarchy   : boolean;
    activeSelf          : boolean;
    isStatic            : boolean;
    layer               : string;
    scene               : Scene;
    tag                 : string;
    */
    transform           : Transform;


    // [ Constructors ]

    /**
     * Creates an instance of GameObject.
     *
     * @memberof GameObject
     */
    constructor(){
        super();
        this.transform = new Transform();
        this.addComponent( this.transform );
    }

    // [ Public Functions ]

    /**
     * Adds a component class named className to the game object.
     *
     * @param {Component} component
     * @returns {Component}
     *
     * @memberof GameObject
     */
    addComponent(component:Component):Component {
        return this._components[component.getInstanceID()] = component;
    }

    /*
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

    // [ Static Functions ]

    static createPrimitive( type:PrimitiveType ) : GameObject {
        let gameObject = new GameObject();

        let geometry    = new Geometry( type );
        let material    = new GL.MeshLambertMaterial({color:0xffffff});
        let mesh        = new Mesh( geometry, material );
        let meshFilter  = new MeshFilter(mesh);

        //gameObject.components[mesh.getInstanceID()] = mesh;

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

    // [ Private Variables ]

    private _components : {[id:string]:Component}

}

