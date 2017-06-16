// -----------------------------------------------------------------------------
// panel.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Panel
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Panel
 * @extends {Element}
 */
export class Panel extends Element {

    // [ Constructors ]

    /**
     * Creates an instance of Panel.
     *
     * @memberof Panel
     */
    constructor() {
        let element = document.createElement( 'div' );
        element.className = 'Panel';
        super( element );
    }

    // [ core ]

    get core() : HTMLDivElement { return <HTMLDivElement>this._core; }
}
