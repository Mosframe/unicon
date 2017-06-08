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
import {Type            } from '../engine/type';
import {Ubject          } from '../engine/object';



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
     * @param {...typeof Component[]} components
     *
     * @memberof GameObject
     */
    constructor( name?:string, ...components : typeof Component[] ) {
        super();

        if( name ) {
            this.name = name;
        } else {
            this.name = 'GameObject';
        }

        for( let component of components ) {
            if(component) {
                this.addComponent( component );
            }
        }
    }

    // [ Public Functions ]

    /**
     * Adds a component class of type componentType to the game object.
     *
     * @param {typeof Component} componentType
     * @returns {Component}
     *
     * @memberof GameObject
     */
    addComponent( componentType : typeof Component ) : Component {
        let instance = new componentType();
        this._components.push( instance );
        return instance;
    }
    /**
     * Adds a component class of type componentType to the game object.
     * Generic version.
     *
     * @template T
     * @param {Type<T>} type
     * @returns {T}
     *
     * @memberof GameObject
     */
    addComponentT<T extends Component>( type:Type<T> ) : T {
        let instance = new type();
        this._components.push( instance );
        return <T>instance;
    }
    /*
    BroadcastMessage	Calls the method named methodName on every MonoBehaviour in this game object or any of its children.
    CompareTag	Is this game object tagged with tag ?
    GetComponent	Returns the component of Type type if the game object has one attached, null if it doesn't.
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


        scene.add( mesh );

            mesh.core.rotation.x = -0.5 * Math.PI;
            mesh.core.receiveShadow = true;
            break;
        }

        // [ MeshFilter ]
        let meshFilter  = new MeshFilter();
        meshFilter.mesh = mesh;
        gameObject._components.push( meshFilter );

        // [ MeshRenderer ]
        let meshRenderer = new MeshRenderer();
        meshRenderer.material = new Material();
        gameObject._components.push( meshRenderer );

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

    protected _components : Component[] = [];

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
