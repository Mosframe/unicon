// -----------------------------------------------------------------------------
// scriptable-object.ts
// -----------------------------------------------------------------------------
import {IType   } from '../engine/interfaces/type';
import {Ubject  } from '../engine/ubject';

/**
 * Component
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Component
 * @extends {Ubject}
 */
export class ScriptableObject extends Ubject {

    // [ Static Functions ]

    /**
     * Creates an instance of a scriptable object.
     *
     * @static
     * @template T
     * @param {IType<T>} type The type of the ScriptableObject to create, as a System.Type instance.
     * @returns {ScriptableObject} The created ScriptableObject.
     *
     * @memberof ScriptableObject
     */
    public static createInstance<T extends ScriptableObject>(type:IType<T>) : ScriptableObject
    {
        return new type();
    }
    /**
     * Creates an instance of a scriptable object.
     *
     * @static
     * @param {string} className The type of the ScriptableObject to create, as the name of the type.
     * @returns {ScriptableObject} The created ScriptableObject.
     *
     * @memberof ScriptableObject
     */
    public static createInstance2( className:string ) : ScriptableObject|null
    {
        let r = eval('new ' + className + '();');
        if( r instanceof ScriptableObject ) {
            return r;
        }
        return null;
    }

    // [ Messages ]

    /*
    // This function is called when the ScriptableObject script is started.
    onAwake() {

    }

    // This function is called when the scriptable object will be destroyed.
    onDestroy() {

    }

    // This function is called when the scriptable object goes out of scope.
    onDisable() {

    }

    // 	This function is called when the object is loaded.
    onEnable() {

    }
    */
}

