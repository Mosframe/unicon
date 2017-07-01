// -----------------------------------------------------------------------------
// model.ts
// -----------------------------------------------------------------------------
import {Element } from './element';
import {Panel   } from './panel';

/**
 * Modal
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Modal
 * @extends {Element}
 */
export class Modal extends Element {

    // [ Public Variables ]

    container : Panel;

    // [ Public Functions ]

    show ( content:Element ) {
        this.container.clear();
        this.container.add( content );
        this.core.style.display = 'flex';
        return this;
    }

    hide () {
        this.core.style.display = 'none';
        return this;
    }

    // [ Constructors ]

    /**
     * Creates an instance of Model.
     *
     * @memberof Model
     */
    constructor( value?:string ) {

        let element = document.createElement( 'div' );
        element.style.position          = 'absolute';
        element.style.width             = '100%';
        element.style.height            = '100%';
        element.style.backgroundColor   = 'rgba(0,0,0,0.5)';
        element.style.display           = 'none';
        element.style.alignItems        = 'center';
        element.style.justifyContent    = 'center';
        element.addEventListener( 'click', ( event:MouseEvent ) => {
            this.hide();
        });

        super( element );

        this.container = new Panel();
        this.container.core.style.width             = '200px';
        this.container.core.style.padding           = '20px';
        this.container.core.style.backgroundColor   = '#ffffff';
        this.container.core.style.boxShadow         = '0px 5px 10px rgba(0,0,0,0.5)';

        this.add( this.container );
    }

    // [ core ]

    get core() : HTMLDivElement { return <HTMLDivElement>this._core; }

}
