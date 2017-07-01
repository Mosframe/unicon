// -----------------------------------------------------------------------------
// panel.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Panel
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Panel
 * @extends {Element}
 */
export class Panel extends Element {

    // [ Constructors ]

    constructor() {
        let element = document.createElement( 'div' );
        element.className = 'Panel';
        super( element );
    }

    // [ core ]

    get core() : HTMLDivElement { return <HTMLDivElement>this._core; }
}
