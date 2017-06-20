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
     * @type {(string|null)}
     * @memberof Text
     */
    get value () : string|null      { return this.core.textContent; }
    set value ( value:string|null ) { if( value !== undefined ) this.core.textContent = value; }

    // [ Constructors ]

    /**
     * Creates an instance of Text.
     * @param {string} text
     *
     * @memberof Text
     */
    constructor ( text:string ) {

        let element = document.createElement( 'span' );
        element.className             = 'Text';
        element.style.cursor          = 'default';
        element.style.display         = 'inline-block';
        element.style.verticalAlign   = 'middle';

        super( element );

        this.value = text;
    }

    // [ core ]

    get core() : HTMLSpanElement { return <HTMLSpanElement>this._core; }
}