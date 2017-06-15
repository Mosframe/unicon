// -----------------------------------------------------------------------------
// row.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Row
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Row
 * @extends {Element}
 */
export class Row extends Element {

    // [ Constructors ]

    /**
     * Creates an instance of Row.
     *
     * @memberof Row
     */
    constructor() {
        super( document.createElement( 'div' ) );
        this.core.className = 'Row';
    }
}
