// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import {Vector3     } from './vector3';
import {Quaternion  } from './quaternion';
import {UObject     } from './object';
import {Transform   } from './transform';
import {Scene       } from './scene';

/**
 * GameObject
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class GameObject
 * @extends {Object}
 */
export class GameObject extends UObject {

    activeInHierarchy   : boolean;
    activeSelf          : boolean;
    isStatic            : boolean;
    layer               : string;
    scene               : Scene;
    tag                 : string;
    transform           : Transform;

    constructor(){
        super();

    }

    addComponent() {

    }

    broadcastMessage() {

    }

    compareTag() {

    }

    getComponent() {

    }
    getComponentInChildren() {

    }
    getComponentInParent() {

    }
    getComponents() {

    }
    getComponentsInChildren() {

    }
    getComponentsInParent() {

    }

    sendMessage () {

    }
    sendMessageUpwards() {

    }
    setActive() {

    }

    static createPrimitive() {

    }

    static Find() {

    }
    static FindGameObjectsWithTag() {

    }
    static FindWithTag() {

    }

    // [ private ] --------------------------------------------------------------------------------------------------
}

