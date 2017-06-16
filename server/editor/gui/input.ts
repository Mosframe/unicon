// -----------------------------------------------------------------------------
// input.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Input
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Input
 * @extends {Element}
 */
export class Input extends Element {

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
     * Creates an instance of Input.
     * @param {string} Input
     *
     * @memberof Input
     */
    constructor ( text:string ) {
        let element = document.createElement( 'input' );
        element.className         = 'Input';
        element.style.padding     = '2px';
        element.style.border      = '1px solid transparent';

        element.addEventListener( 'keydown', ( event:KeyboardEvent ) =>{
            event.stopPropagation();
        }, false );

        super( element );

        this.value = text;
    }

    // [ core ]

    get core() : HTMLInputElement { return <HTMLInputElement>this._core; }
}
