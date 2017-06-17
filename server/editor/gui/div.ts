// -----------------------------------------------------------------------------
// div.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Div
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Div
 * @extends {Element}
 */
export class Div extends Element {

    // [ Constructors ]

    /**
     * Creates an instance of Div.
     *
     * @memberof Div
     */
    constructor() {
        super( document.createElement( 'div' ) );
    }

    // [ core ]

    get core() : HTMLDivElement { return <HTMLDivElement>this._core; }

}
