// -----------------------------------------------------------------------------
// checkbox.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Checkbox
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Checkbox
 * @extends {Element}
 */
export class Checkbox extends Element {

    // [ Public Variables ]

    /**
     * value
     *
     * @type {boolean}
     * @memberof Checkbox
     */
    getValue () : boolean      { return this.core.checked; }
    setValue ( value:boolean ) { if( value !== undefined ) this.core.checked = value; return this; }

    // [ Constructors ]

    /**
     * Creates an instance of Checkbox.
     * @param {boolean} checked
     *
     * @memberof Checkbox
     */
    constructor ( checked:boolean ) {

        let element = document.createElement( 'input' );
        element.className   = 'Checkbox';
        element.type        = 'checkbox';

        super( element );

        this.setValue( checked );
    }

    // [ core ]

    get core() : HTMLInputElement { return <HTMLInputElement>this._core; }
}
