// -----------------------------------------------------------------------------
// transform.ts
// -----------------------------------------------------------------------------
import {Component} from './component';

/**
 * Transform
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class Transform
 * @extends {Component}
 */
export class Transform extends Component {

    // [ Variables ]

    /**
     * parent transform
     *
     * @type {Transform}
     * @memberof Transform
     */
    parent:Transform;

    // [ Public Functions ]

    /**
     *
     *
     * @param {Transform} parent
     *
     * @memberof Transform
     */
    setParent( parent:Transform ) {
        this.parent = parent;
    }
}

