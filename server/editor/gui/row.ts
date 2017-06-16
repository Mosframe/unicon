// -----------------------------------------------------------------------------
// row.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Row
 *
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
        let element = document.createElement( 'div' );
        element.className = 'Row';
        super( element );
    }

    // [ core ]

    get core() : HTMLDivElement { return <HTMLDivElement>this._core; }
}
