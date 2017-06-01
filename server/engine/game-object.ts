// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import deprecated         from 'deprecated-decorator';
import * as GL            from './graphic';
import {PrimitiveType   } from './primitive-type';
import {Vector3         } from './vector3';
import {Quaternion      } from './quaternion';
import {UObject         } from './object';
import {Component       } from './component';
import {Transform       } from './transform';
import {Geometry        } from './geometry';
import {Material        } from './material';
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
 * @extends {GL.Object3D}
 */
export class GameObject extends GL.Object3D {

    // [ Variables ]

    /*
    activeInHierarchy   : boolean;
    activeSelf          : boolean;
    isStatic            : boolean;
    layer               : string;
    scene               : Scene;
    tag                 : string;
    */

    /**
     * Transform
     *
     * @type {Transform}
     * @memberof GameObject
     */
    transform   : Transform;

    // [ Constructors ]

    /**
     * Creates an instance of GameObject.
     *
     * @memberof GameObject
     */
    constructor(){
        super();

        this.transform = new Transform();
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
    addComponent<T>( componentType:T ):Component {
        let component = new Component();
        component.gameObject = this;

        if( this.transform ) {
            component.transform = this.transform;
        } else {
            component.transform = new Transform();
        }

        // Scene.add()
        this.core.add( );

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
        let mesh        = new Mesh( geometry );
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

