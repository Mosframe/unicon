// -----------------------------------------------------------------------------
// component.ts
// -----------------------------------------------------------------------------
import * as GL        from './graphic';
import {Ubject      } from './ubject';
import {GameObject  } from './game-object';
import {Transform   } from './transform';

/**
 * Component
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Component
 * @extends {Ubject}
 */
export class Component extends Ubject {

    // [ Variables ]

    /**
     * GameObject
     *
     * @type {GL.Object3D}
     * @memberof GameObject
     */
    gameObject  : GameObject;

    //tag         : string;

    /**
     * Transform
     *
     * @type {Transform}
     * @memberof GameObject
     */
    transform   : Transform;

    // [ Constructors ]

    // [ Public Functions ]

    /*
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
    */

    update() : void {

    }
}

