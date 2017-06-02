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
import {SceneManager    } from './scene-manager';


interface IActivatable<T> {new():T;}

/**
 * GameObject
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class GameObject
 * @extends {UObject}
 */
export class GameObject extends UObject {

    // [ Public Variables ]

    /*
    activeInHierarchy	Is the GameObject active in the scene?
    activeSelf	The local active state of this GameObject. (Read Only)
    isStatic	Editor only API that specifies if a game object is static.
    layer	The layer the game object is in. A layer is in the range [0...31].
    */

    /**
     * Scene that the GameObject is part of.
     *
     * @type {Scene}
     * @memberof GameObject
     */
    scene : Scene;

    /*
    tag  The tag of this game object.
    */

    /**
     * The Transform attached to this GameObject.
     *
     * @type {Transform}
     * @memberof GameObject
     */
    transform : Transform;

    // [ Constructors ]

    /**
     * Creates an instance of GameObject.
     *
     * @memberof GameObject
     */
    constructor(){
        super();
        this._core = new GL.Object3D();
        this.transform = this.addComponent<Transform>();
        this.scene = SceneManager.current;
        this.scene.core.add( this._core );
    }

    // [ Public Functions ]

     /**
      * Adds a component class named className to the game object.
      *
      * @template T
      * @returns {T}
      *
      * @memberof GameObject
      */
    addComponent <T extends Component> () : T {
        let type:{new():T};
        let component = new type();
        component.gameObject = this;

        if( this.transform ) {
            component.transform = this.transform;
        } else {
            component.transform = new Transform();
        }

        //this._components.push(component); return component;
        return this._components[component.getInstanceID()] = component;
    }

    /*
    BroadcastMessage	Calls the method named methodName on every MonoBehaviour in this game object or any of its children.
    CompareTag	Is this game object tagged with tag ?
    */

    /**
     * Returns the component of Type type if the game object has one attached, null if it doesn't.
     *
     * @template T
     * @returns {T}
     *
     * @memberof GameObject
     */
    getComponent<T extends Component>() : T {

        let type:{new():T};

        for( let c in this._components ) {
            let component = this._components[c];
            if( component ) {
                if( component instanceof type ) {
                    return <T>component;
                }
            }
        }
    }

    /*
    GetComponentInChildren	Returns the component of Type type in the GameObject or any of its children using depth first search.
    GetComponentInParent	Returns the component of Type type in the GameObject or any of its parents.
    */


    /**
     * Returns all components of Type type in the GameObject.
     *
     * @returns {Component[]}
     *
     * @memberof GameObject
     */
    getComponents() : Component[] {
        return this._components;
    }

    /*
    GetComponentsInChildren	Returns all components of Type type in the GameObject or any of its children.
    GetComponentsInParent	Returns all components of Type type in the GameObject or any of its parents.
    SendMessage	Calls the method named methodName on every MonoBehaviour in this game object.
    SendMessageUpwards	Calls the method named methodName on every MonoBehaviour in this game object and on every ancestor of the behaviour.
    SetActive	Activates/Deactivates the GameObject.
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

    private _core : GL.Object3D;
    private _components : Component[];

}

