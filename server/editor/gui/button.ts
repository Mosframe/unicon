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

    /**
     *
     *
     * @type {string}
     * @memberof Button
     */
    get label() : string        { return this.core.textContent; }
    set label( value:string )   { this.core.textContent = value; }

    // [ Constructors ]

    /**
     * Creates an instance of Button.
     * @param {string} value
     *
     * @memberof Button
     */
    constructor( value:string ) {
        let element = document.createElement( 'button' );
        element.className   = 'Button';
        element.textContent = value;
        super( element );
    }

    // [ core ]

    get core() : HTMLButtonElement { return <HTMLButtonElement>this._core; }
}
