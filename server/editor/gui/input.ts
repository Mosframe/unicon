// -----------------------------------------------------------------------------
// input.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Input
 *
 * @author mrdoob ( http://mrdoob.com/ )
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
        super( document.createElement( 'input' ) );
        this.core.className         = 'Input';
        this.core.style.padding     = '2px';
        this.core.style.border      = '1px solid transparent';

        this.core.addEventListener( 'keydown', ( event ) =>{
            event.stopPropagation();
        }, false );

        this.value = text;
    }

    // [ core ]

    get core() : HTMLInputElement { return <HTMLInputElement>this._core; }
}
