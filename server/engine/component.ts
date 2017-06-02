// -----------------------------------------------------------------------------
// component.ts
// -----------------------------------------------------------------------------
import * as GL        from './graphic';
import {UObject     } from './object';
import {GameObject  } from './game-object';
import {Transform   } from './transform';

/**
 * Component
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class Component
 * @extends {UObject}
 */
export class Component extends UObject {

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

    //constructor() {
    //    super();
    //    //this.gameObject = gameObject;
    //    //this.transform = new Transform(gameObject);
    //}

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

