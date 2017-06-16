// -----------------------------------------------------------------------------
// span.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Span
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Span
 * @extends {Element}
 */
export class Span extends Element {

    // [ Constructors ]

    /**
     * Creates an instance of Span.
     *
     * @memberof Span
     */
    constructor() {
        super( document.createElement( 'span' ) );
    }

    // [ core ]

    get core() : HTMLSpanElement { return <HTMLSpanElement>this._core; }
}
