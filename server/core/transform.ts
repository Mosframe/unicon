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

    parent:Transform;

    setParent( parent:Transform ) {
        this.parent = parent;
    }
    // [ private ] -----------------------------------------------------------------------------
}

