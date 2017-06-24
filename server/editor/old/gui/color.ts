// -----------------------------------------------------------------------------
// color.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Color
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Color
 * @extends {Element}
 */
export class Color extends Element {

    // [ Public Variables ]

    /**
     * value
     *
     * @type {string}
     * @memberof Color
     */
    get value () : string           { return this.core.value; }
    set value ( value:string )      { if( value !== undefined ) this.core.value = value; }
    /**
     * hexa value
     *
     * @type {number}
     * @memberof Color
     */
    get hexValue () : number        { return parseInt(this.core.value.substr(1), 16); }
    set hexValue ( value:number )   { this.core.value = '#' + ('000000'+value.toString(16)).slice(-6); }

    // [ Constructors ]

    /**
     * Creates an instance of Color.
     *
     * @memberof Color
     */
    constructor () {

        let element = document.createElement( 'input' );
        element.className               = 'Color'       ;
        element.style.width             = '64px'        ;
        element.style.height            = '17px'        ;
        element.style.border            = '0px'         ;
        element.style.padding           = '2px'         ;
        element.style.backgroundColor   = 'transparent' ;
        element.type                    = 'color'       ;
        element.value                   = '#ffffff'     ;

        super( element );
    }

    // [ core ]

    get core() : HTMLInputElement { return <HTMLInputElement>this._core; }
}
