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

    getValue () : string            { return this.core.value; }
    setValue ( value:string )       { this.core.value=value; return this; }
    getHexValue () : number         { return parseInt(this.core.value.substr(1), 16); }
    setHexValue ( value:number )    { this.core.value = '#' + ('000000'+value.toString(16)).slice(-6); return this }

    // [ Constructors ]

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
