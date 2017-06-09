// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import {Component       } from '../engine/component';
import {Geometry        } from '../engine/geometry';
import * as GL            from '../engine/graphic';
import {Material        } from '../engine/material';
import {Mesh            } from '../engine/mesh';
import {MeshFilter      } from '../engine/mesh-filter';
import {MeshRenderer    } from '../engine/mesh-renderer';
import {PrimitiveType   } from '../engine/primitive-type';
import {ShaderType      } from '../engine/shader-type';
import {Type            } from '../engine/type';
import {Ubject          } from '../engine/object';


export interface ComponentType<T> {
    new(gameObject:GameObject):T;
}


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

    /*
    activeInHierarchy	Is the GameObject active in the scene?
    activeSelf	The local active state of this GameObject. (Read Only)
    isStatic	Editor only API that specifies if a game object is static.
    layer	The layer the game object is in. A layer is in the range [0...31].
    scene	Scene that the GameObject is part of.
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
     * @param {...string[]} componentNames
     *
     * @memberof GameObject
     */
    constructor( name?:string, ...componentNames : string[] ) {
        super();

        if( name ) {
            this.name = name;
        } else {
            this.name = 'GameObject';
        }

        for( let componentName of componentNames ) {
            if(componentName) {
                this.addComponent2( componentName );
            }
        }
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

        return <T>instance;
    }
    /**
     * Adds a component class of type componentType to the game object.
     *
     * @param {string} componentName
     * @returns {Component}
     *
     * @memberof GameObject
     */
    addComponent2( componentName:string ) : Component {
        let instance = <Component>new window[componentName](this);
        this._components.push( instance );

        let tc = this._typeComponents[componentName];
        if( !tc ) {
            tc = this._typeComponents[componentName] = [];
        }
        tc.push( instance );

        return instance;
    }
    /*
    BroadcastMessage	Calls the method named methodName on every MonoBehaviour in this game object or any of its children.
    CompareTag	Is this game object tagged with tag ?
    */
    /**
     * Returns the component of Type type if the game object has one attached, null if it doesn't.
     *
     * @template T
     * @param {Type<T>} type
     * @returns {T}
     *
     * @memberof GameObject
     */
    getComponent<T extends Component>( type:Type<T> ) : T {
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
    getComponent2( componentName:string ) : Component {
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

    //Creates a game object with a primitive mesh renderer and appropriate collider.
    static createPrimitive( type:PrimitiveType ) : GameObject {

        /*
        let geometry    = new THREE.PlaneGeometry( 30, 30, 30 );
        let material    = new THREE.MeshLambertMaterial({color:0xffffff});
        var mesh        = new THREE.Mesh( geometry, material );

        mesh.rotation.x = -0.5 * Math.PI;
        mesh.receiveShadow = true;
        */


        // [ GameObject ]
        let gameObject  = new GameObject( type.toString() );

        // [ Geometry ]
        let geometry    = new Geometry(type);

        // [ Mesh ]
        let mesh        = new Mesh();

        switch(type) {
        case PrimitiveType.cube:
            break;
        case PrimitiveType.plane:
            break;
        }

        //scene.add( mesh );
        //
        //    mesh.core.rotation.x = -0.5 * Math.PI;
        //    mesh.core.receiveShadow = true;
        //    break;
        //}

        // [ MeshRenderer ]
        let renderer = gameObject.addComponent( MeshRenderer );
        //renderer.getComponent

        return gameObject;
    }

    /*
    static Find	Finds a GameObject by name and returns it.
    static FindGameObjectsWithTag	Returns a list of active GameObjects tagged tag. Returns empty array if no GameObject was found.
    static FindWithTag	Returns one active GameObject tagged tag. Returns null if no GameObject was found.
    */

    // [ Public Operators ]

    // [ Public Events ]

    // [ Protected Variables ]

    protected _components       : Component[] = [];
    protected _typeComponents   : {[type:string]:Component[]} = {};

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
