// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
//import {Type            } from 'typescript-dotnet-es6/System/Types';

import {Component       } from '../engine/component';
import {ComponentType   } from '../engine/component';
import {Geometry        } from '../engine/geometry';
import * as GL            from '../engine/graphic';
import {Material        } from '../engine/material';
import {Mesh            } from '../engine/mesh';
import {MeshFilter      } from '../engine/mesh-filter';
import {MeshRenderer    } from '../engine/mesh-renderer';
import {PrimitiveType   } from '../engine/primitive-type';
import {Scene           } from '../engine/scene';
import {SceneManager    } from '../engine/scene-manager';
import {ShaderType      } from '../engine/shader-type';
import {Type            } from '../engine/type';
import {Ubject          } from '../engine/ubject';

/**
 * Base class for all entities in Unicon scenes.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class GameObject
 * @extends {Ubject}
 */
export class GameObject extends Ubject {

    // [ Public Variables ]

    /**
     * get GL.Object3D
     *
     * @readonly
     * @type {GL.Object3D}
     * @memberof GameObject
     */
    get core() : GL.Object3D        { return this._core; }
    set core( value:GL.Object3D )   {
        if( this._scene ) {
            this._scene.core.remove( this._core );
            this._scene.core.add( value );
        }
        this._core = value;
    }

    /*
    activeInHierarchy	Is the GameObject active in the scene?
    activeSelf	The local active state of this GameObject. (Read Only)
    isStatic	Editor only API that specifies if a game object is static.
    layer	The layer the game object is in. A layer is in the range [0...31].
    */
    /**
     * Scene that the GameObject is part of.
     *
     * @readonly
     * @type {Scene}
     * @memberof GameObject
     */
    get scene() : Scene { return this._scene; }
    /*
    tag	The tag of this game object.
    transform	The Transform attached to this GameObject.
    */

    // [ Constructors ]

    /**
     * Creates an instance of GameObject.
     *
     * Transform is always added to the GameObject that is being created.
     * The creation of a GameObject with no script arguments will add the Transform but nothing else.
     * Similarly, the version with just a single string argument just adds this and the Transform.
     * Finally, the third version allows the name to be specified but also components to be passed in as an array.
     *
     * @param {string} [name]
     * @param {GL.Object3D} [core]
     *
     * @memberof GameObject
     */
    constructor( name?:string, core?:GL.Object3D ) {
        super();

        if( name ) {
            this.name = name;
        } else {
            this.name = 'GameObject';
        }

        if(core) this._core = core;
        else     this._core = new GL.Object3D();

        this._scene = SceneManager.getActiveScene();
        this._scene.core.add( this._core );
    }

    // [ Public Functions ]

    /**
     * Adds a component class of type componentType to the game object.
     *
     * @template T
     * @param {ComponentType<T>} type
     * @returns {T}
     *
     * @memberof GameObject
     */
    addComponent<T extends Component>( type:ComponentType<T> ) : T {
        let instance = new type(this);
        this._components.push( instance );

        let tc = this._typeComponents[type.toString()];
        if( !tc ) {
            tc = this._typeComponents[type.toString()] = [];
        }
        tc.push( instance );

        instance.gameObject = this;
        this._core = instance.core;

        return <T>instance;
    }
    /*
    BroadcastMessage	Calls the method named methodName on every MonoBehaviour in this game object or any of its children.
    CompareTag	Is this game object tagged with tag ?
    */
    /**
     * Returns the component of Type type if the game object has one attached, null if it doesn't.
     *
     * @template T
     * @param {ComponentType<T>} type
     * @returns {T}
     *
     * @memberof GameObject
     */
    getComponent<T extends Component>( type:ComponentType<T> ) : T|undefined {
        let components = this._typeComponents[type.toString()];
        if( components ) {
            return <T>components[0];
        }
    }
    /**
     * Returns the component of Type type if the game object has one attached, null if it doesn't.
     *
     * @param {string} componentName
     * @returns {Component}
     *
     * @memberof GameObject
     */
    getComponent2( componentName:string ) : Component|undefined {
        let components = this._typeComponents[componentName];
        if( components ) {
            return components[0];
        }
    }
    /*
    GetComponentInChildren	Returns the component of Type type in the GameObject or any of its children using depth first search.
    GetComponentInParent	Returns the component of Type type in the GameObject or any of its parents.
    GetComponents	Returns all components of Type type in the GameObject.
    GetComponentsInChildren	Returns all components of Type type in the GameObject or any of its children.
    GetComponentsInParent	Returns all components of Type type in the GameObject or any of its parents.
    SendMessage	Calls the method named methodName on every MonoBehaviour in this game object.
    SendMessageUpwards	Calls the method named methodName on every MonoBehaviour in this game object and on every ancestor of the behaviour.
    SetActive	Activates/Deactivates the GameObject.
    */

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    /**
     * Creates a game object with a primitive mesh renderer and appropriate collider.
     *
     * @static
     * @param {PrimitiveType} type
     * @returns {GameObject}
     *
     * @memberof GameObject
     */
    static createPrimitive( type:PrimitiveType ) : GameObject {

        let gameObject  = new GameObject( PrimitiveType[type] );
        let geometry    = new Geometry( type );
        let material    = new Material( ShaderType.MeshLambert );
        let mesh        = new Mesh( geometry, material );

        console.log( mesh );

        // Y축이 위로 향하도록 축을 회전
        if( type === PrimitiveType.plane ) {
            mesh.core.rotation.x = -0.5 * Math.PI;
            mesh.core.receiveShadow = true;
        }

        let meshFiler = gameObject.addComponent( MeshFilter );
        meshFiler.mesh = mesh;
        let renderer = gameObject.addComponent( MeshRenderer );

        return gameObject;
    }

    /*
    static Find	Finds a GameObject by name and returns it.
    static FindGameObjectsWithTag	Returns a list of active GameObjects tagged tag. Returns empty array if no GameObject was found.
    static FindWithTag	Returns one active GameObject tagged tag. Returns null if no GameObject was found.
    */

    // [ Public Operators ]

    // [ Public Events ]

    // [ public Messages ]

    // [ Protected Variables ]

    protected _components       : Component[] = [];
    protected _typeComponents   : {[type:string]:Component[]} = {};
    protected _scene            : Scene;
    protected _core             : GL.Object3D;

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
