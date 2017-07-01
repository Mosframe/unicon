// -----------------------------------------------------------------------------
// input.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Input
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Input
 * @extends {Element}
 */
export class Input extends Element {

    // [ Public Variables ]

    getValue () : string        { return this.core.value; }
    setValue ( value:string )   { if( value !== undefined ) this.core.value = value; return this; }

    // [ Constructors ]

    constructor ( text?:string ) {
        let element = document.createElement( 'input' );
        element.className         = 'Input';
        element.style.padding     = '2px';
        element.style.border      = '1px solid transparent';
        element.addEventListener( 'keydown', ( event:KeyboardEvent ) =>{
            event.stopPropagation();
        }, false );

        super( element );

        this.setValue( text );
    }

    // [ core ]

    get core() : HTMLInputElement { return <HTMLInputElement>this._core; }
}
