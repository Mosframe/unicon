/**
 * component.ts
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
export class Component extends UObject {

    gameObject  : GameObject;
    tag         : string;
    transform   : Transform;

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

    // [ private ] --------------------------------------------------------------------------------------------------
}

