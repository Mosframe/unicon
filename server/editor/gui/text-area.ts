// -----------------------------------------------------------------------------
// text-area.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * TextArea
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class TextArea
 * @extends {Element}
 */
export class TextArea extends Element {

    // [ Public Variables ]

    /**
     * value
     *
     * @type {string}
     * @memberof Text
     */
    get value () : string        { return this.core.value; }
    set value ( value:string )   { if( value !== undefined ) this.core.value = value; }

    // [ Constructors ]

    /**
     * Creates an instance of TextArea.
     *
     * @memberof TextArea
     */
    constructor () {
        let element = document.createElement( 'textarea' );
        element.className         = 'TextArea';
        element.style.padding     = '2px';
        element.spellcheck        = false;

        element.addEventListener( 'keydown', ( event:KeyboardEvent ) =>{
            event.stopPropagation();

            if ( event.keyCode === 9 ) {

                event.preventDefault();

                let cursor = element.selectionStart;
                element.value = element.value.substring( 0, cursor ) + '\t' + element.value.substring( cursor );
                element.selectionStart = cursor + 1;
                element.selectionEnd = element.selectionStart;
            }
        }, false );

        super( element );
    }

    // [ core ]

    get core() : HTMLTextAreaElement { return <HTMLTextAreaElement>this._core; }
}
