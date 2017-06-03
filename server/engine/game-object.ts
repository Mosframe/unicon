// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import deprecated         from 'deprecated-decorator';
import * as GL            from './graphic';
import {PrimitiveType   } from './primitive-type';
import {Vector3         } from './vector3';
import {Quaternion      } from './quaternion';
import {Ubject          } from './ubject';
import {Component       } from './component';
import {Transform       } from './transform';
import {Geometry        } from './geometry';
import {Material        } from './material';
import {Mesh            } from './mesh';
import {MeshFilter      } from './mesh-filter';
import {MeshRenderer    } from './mesh-renderer';
import {Scene           } from './scene';
import {SceneManager    } from './scene-manager';


interface IActivatable<T> {new():T;}

/**
 * GameObject
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class GameObject
 * @extends {Ubject}
 */
export class GameObject extends Ubject {

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

        // [ GameObject ]
        let gameObject = new GameObject();

        // [ Geometry ]
        let geometry    = new Geometry( type );

        // [ Mesh ]
        let mesh        = new Mesh( geometry );
        switch(type) {
        case PrimitiveType.cube:
            break;
        case PrimitiveType.plane:
            mesh.core.rotation.x = -0.5 * Math.PI;
            mesh.core.receiveShadow = true;
            break;
        }

        // [ MeshFilter ]
        let meshFilter  = new MeshFilter(mesh);
        //gameObject._components.push( meshFilter );
        gameObject._components[meshFilter.getInstanceID()] = meshFilter;

        // [ MeshRenderer ]
        let meshRenderer = new MeshRenderer();
        //gameObject._components.push( meshRenderer );
        gameObject._components[meshRenderer.getInstanceID()] = meshRenderer;

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

