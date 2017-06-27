// -----------------------------------------------------------------------------
// horizontal-rule.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * HorizontalRule
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class HorizontalRule
 * @extends {Element}
 */
export class HorizontalRule extends Element {

    // [ Constructors ]

    constructor() {
        let element = document.createElement( 'hr' );
        element.className = 'HorizontalRule';
        super( element );
    }

    // [ core ]

    get core() : HTMLHRElement { return <HTMLHRElement>this._core; }
}
