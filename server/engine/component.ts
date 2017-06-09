// -----------------------------------------------------------------------------
// component.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {GameObject  } from '../engine/game-object';
import {Ubject      } from '../engine/object';

/**
 * Base class for everything attached to GameObjects.
 *
 * Note that your code will never directly create a Component.
 * Instead, you write script code, and attach the script to a GameObject.
 * See Also: ScriptableObject as a way to create scripts that do not attach to any GameObject.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Temp
 * @extends {Ubject}
 */
export class Component extends Ubject {

    // [ Public Variables ]

    /**
     * The game object this component is attached to. A component is always attached to a game object.
     *
     * @type {GameObject}
     * @memberof Component
     */
    gameObject : GameObject;
    /*
    tag	The tag of this game object.
    transform	The Transform attached to this GameObject.
    */

    // [ Constructors ]

    /**
     * Creates an instance of Component.
     * @param {GameObject} gameObject
     *
     * @memberof Component
     */
    constructor( gameObject:GameObject ) {
        super();
        this.gameObject = gameObject;
    }

    // [ Public Functions ]

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
    */

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
