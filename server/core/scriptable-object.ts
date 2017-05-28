/**
 * scriptable-object.ts
 *
 * @author jonghwa lee
 */

import {UObject}    from './object';
import {GameObject} from './game-object';
import {Transform}  from './transform';

/**
 * Component
 *
 * @export
 * @class Component
 * @extends {UObject}
 */
export class ScriptableObject extends UObject {

    // Creates an instance of a scriptable object.
    static createInstance() {

    }

    // [ messages ] --------------------------------------------------------------------------------------------------

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

    // [ private ] --------------------------------------------------------------------------------------------------
}

