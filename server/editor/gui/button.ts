// -----------------------------------------------------------------------------
// button.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Button
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Button
 * @extends {Element}
 */
export class Button extends Element {

    // [ Public Variables ]

    getLabel() : string|null       { return this.core.textContent; }
    setLabel( value:string|null )  { this.core.textContent = value; return this; }

    // [ Constructors ]

    constructor( value:string ) {
        let element = document.createElement( 'button' );
        element.className   = 'Button';
        element.textContent = value;
        super( element );
    }

    // [ core ]

    get core() : HTMLButtonElement { return <HTMLButtonElement>this._core; }
}
