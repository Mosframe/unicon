/**
 * transform.ts
 *
 * @author jonghwa lee
 */

import {Component} from './component';

/**
 * Transform
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

