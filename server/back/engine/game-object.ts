// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import deprecated         from 'deprecated-decorator';

import * as GL            from '../engine/graphic';

import {IType           } from '../engine/interfaces/type';

import {PrimitiveType   } from '../engine/primitive-type';
import {Vector3         } from '../engine/vector3';
import {Quaternion      } from '../engine/quaternion';
import {Ubject          } from '../engine/ubject';
import {Component       } from '../engine/component';
import {Transform       } from '../engine/transform';
import {Geometry        } from '../engine/geometry';
import {Material        } from '../engine/material';
import {Mesh            } from '../engine/mesh';
import {MeshFilter      } from '../engine/mesh-filter';
import {MeshRenderer    } from '../engine/mesh-renderer';
import {Scene           } from '../engine/scene';
import {SceneManager    } from '../engine/scene-manager';


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
    */
    /*
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
        this.transform = this.addComponent(Transform);
        this.scene = SceneManager.current;
        this.scene._core.add(this._core);
        this.scene._gameObjects.push(this);
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
    addComponent <T extends Component> (type:IType<T>) : T {
        let component = new type();
        component.gameObject = this;

        if( this.transform ) {
            component.transform = this.transform;
        } else {
            class t extends Transform {
                constructor( inner:GL.Object3D ) {
                    super();
                    this._inner = inner;
                }
            }
            component.transform = new t(this._core);
        }

        this._components.push(component);
        return component;
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
    getComponent<T extends Component>( type:IType<T> ) : T|null {

        for( let c in this._components ) {
            let component = this._components[c];
            if( component ) {
                if( component instanceof type ) {
                    return <T>component;
                }
            }
        }
        return null;
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
        gameObject._components.push( meshFilter );

        // [ MeshRenderer ]
        let meshRenderer = new MeshRenderer();
        gameObject._components.push( meshRenderer );

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

    public _core : GL.Object3D;
    public _components : Component[];

}

