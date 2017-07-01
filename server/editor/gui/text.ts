// -----------------------------------------------------------------------------
// text.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Text
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Text
 * @extends {Element}
 */
export class Text extends Element {

    // [ Public Variables ]

    getValue () : string|null      { return this.core.textContent; }
    setValue ( value:string|null ) { if( value !== undefined ) this.core.textContent = value; return this; }

    // [ Constructors ]

    constructor ( text:string='' ) {

        let element = document.createElement( 'span' );
        element.className             = 'Text';
        element.style.cursor          = 'default';
        element.style.display         = 'inline-block';
        element.style.verticalAlign   = 'middle';

        super( element );

        this.setValue( text );
    }

    // [ core ]

    get core() : HTMLSpanElement { return <HTMLSpanElement>this._core; }
}
