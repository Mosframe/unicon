// -----------------------------------------------------------------------------
// span.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Span
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Span
 * @extends {Element}
 */
export class Span extends Element {

    // [ Constructors ]

    constructor() {
        super( document.createElement( 'span' ) );
    }

    // [ core ]

    get core() : HTMLSpanElement { return <HTMLSpanElement>this._core; }
}
