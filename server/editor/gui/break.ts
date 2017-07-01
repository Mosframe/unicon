// -----------------------------------------------------------------------------
// break.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Break
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Break
 * @extends {Element}
 */
export class Break extends Element {

    // [ Constructors ]

    constructor() {
        let element = document.createElement( 'br' );
        element.className = 'Break';
        super( element );
    }

    // [ core ]

    get core() : HTMLBRElement { return <HTMLBRElement>this._core; }
}
