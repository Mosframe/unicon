// -----------------------------------------------------------------------------
// text.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Text
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Text
 * @extends {Element}
 */
export class Text extends Element {

    // [ Public Variables ]

    /**
     * value
     *
     * @type {string}
     * @memberof Text
     */
    get value () : string        { return this.core.textContent; }
    set value ( value:string )   { if( value !== undefined ) this.core.textContent = value; }

    // [ Constructors ]

    /**
     * Creates an instance of Text.
     * @param {string} text
     *
     * @memberof Text
     */
    constructor ( text:string ) {
        super( document.createElement( 'span' ) );
        this.core.className             = 'Text';
        this.core.style.cursor          = 'default';
        this.core.style.display         = 'inline-block';
        this.core.style.verticalAlign   = 'middle';

        this.value = text;
    }
}
