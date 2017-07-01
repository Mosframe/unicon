// -----------------------------------------------------------------------------
// game-object.ts
// -----------------------------------------------------------------------------
import {UObject     } from './uobject';
import {Component   } from './component';

/**
 * GameObject
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class GameObject
 * @extends {UObject}
 */
export class GameObject extends UObject {

    // [ Public Properties ]

    components : {[uuid:string]:Component} = {};

    // [ Public Functions ]

    addComponent( component:Component ) {
        this.components[component.uuid] = component;
    }

    // [ Protected Members ]
}
