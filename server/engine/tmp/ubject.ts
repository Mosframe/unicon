// -----------------------------------------------------------------------------
// uobject.ts
// -----------------------------------------------------------------------------
import deprecated   from 'deprecated-decorator';
import * as GL      from '../engine/graphic';
import {Util}       from '../engine/util';



/**
 * Base class for all objects Unicon can reference.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class UObject
 */
export class Ubject {

    // [ Public Variables ]

    /*
    hideFlags	Should the object be hidden, saved with the scene or modifiable by the user?
    */
    /**
     * The name of the object.
     *
     * @type {string}
     * @memberof Ubject
     */
    name : string;

    // [ Constructors ]

    /**
     * Creates an instance of Ubject.
     *
     * @memberof Ubject
     */
    constructor() {
    }

    // [ Public Functions ]

    /*
    GetInstanceID	Returns the instance id of the object.
    ToString	Returns the name of the game object.
    */

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    /*
    static Destroy	Removes a gameobject, component or asset.
    static DestroyImmediate	Destroys the object obj immediately. You are strongly recommended to use Destroy instead.
    static DontDestroyOnLoad	Makes the object target not be destroyed automatically when loading a new scene.
    static FindObjectOfType	Returns the first active loaded object of Type type.
    static FindObjectsOfType	Returns a list of all active loaded objects of Type type.
    */

    /**
     * Clones the object original and returns the clone.
     *
     * @static
     * @param {Ubject} original
     *
     * @memberof Ubject
     */
    static instantiate( original : Ubject ) : Ubject {
        return <Ubject>Util.clone( original );
    }

    // [ Public Operators ]

    /*
    bool	Does the object exist?
    operator !=	Compares if two objects refer to a different object.
    operator ==	Compares two object references to see if they refer to the same object.
    */

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}

