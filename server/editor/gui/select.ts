// -----------------------------------------------------------------------------
// select.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Select
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Select
 * @extends {Element}
 */
export class Select extends Element {

    // [ Public Variables ]

    getValue () : string            { return this.core.value; }
    setValue ( value:string )       { if( value !== undefined ) this.core.value = value; return this; }

    getMultiple () : boolean        { return this.core.multiple; }
    setMultiple ( value:boolean )   { this.core.multiple = value; return this; }

    getOptions () : string[] {
        let options:string[] = [];

        for( let key in this._core.children ) {
            let child = this._core.children[key];
            if( child instanceof HTMLOptionElement ) {
                options.push( child.innerHTML );
            }
        }
        return options;
    }
    setOptions ( options:{} ) {

    	let selected = this.core.value;

        while( this._core.children.length > 0 ) {
            if( this._core.firstChild ) this._core.removeChild( this._core.firstChild );
        }

        for( let key in options ) {
            let option = document.createElement( 'option' );
            option.value = key;
            option.innerHTML = options[ key ];
            this._core.appendChild( option );
        }

        this.core.value = selected;
        return this;
    }

    // [ Constructors ]

    constructor () {

        let element = document.createElement( 'select' );
        element.className       = 'Select';
        element.style.padding   = '2px';

        super( element );
    }

    // [ core ]

    get core() : HTMLSelectElement { return <HTMLSelectElement>this._core; }
}
