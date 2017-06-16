// -----------------------------------------------------------------------------
// select.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Select
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Select
 * @extends {Element}
 */
export class Select extends Element {

    // [ Public Variables ]

    /**
     * value
     *
     * @type {string}
     * @memberof Select
     */
    get value () : string        { return this.core.value; }
    set value ( value:string )   { this.core.value = value; }
    /**
     * multiple
     *
     * @type {boolean}
     * @memberof Select
     */
    get multiple () : boolean       { return this.core.multiple; }
    set multiple ( value:boolean )  { this.core.multiple = value; }
    /**
     * options
     *
     * @type {string[]}
     * @memberof Select
     */
    get options () : string[] {
        let options:string[] = [];

        for( let key in this._core.children ) {
            let child = this._core.children[key];
            if( child instanceof HTMLOptionElement ) {
                options.push( child.innerHTML );
            }
        }
        return options;
    }
    set options ( options:string[] ) {

    	let selected = this.core.value;

        while( this._core.children.length > 0 ) {
            this._core.removeChild( this._core.firstChild );
        }

        for( let key in options ) {

            let option = document.createElement( 'option' );
            option.value = key;
            option.innerHTML = options[ key ];
            this._core.appendChild( option );

        }

        this.core.value = selected;
    }

    // [ Constructors ]

    /**
     * Creates an instance of Select.
     *
     * @memberof Select
     */
    constructor () {

        let element = document.createElement( 'select' );
        element.className       = 'Select';
        element.style.padding   = '2px';

        super( element );
    }

    // [ core ]

    get core() : HTMLSelectElement { return <HTMLSelectElement>this._core; }
}
