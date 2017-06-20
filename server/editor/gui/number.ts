// -----------------------------------------------------------------------------
// number.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Number
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Number
 * @extends {Element}
 */
export class Number extends Element {

    // [ Public Variables ]

    /**
     * min
     *
     * @type {number}
     * @memberof Number
     */
    min         : number;
    /**
     * max
     *
     * @type {number}
     * @memberof Number
     */
    max         : number;
    /**
     * precision
     *
     * @type {number}
     * @memberof Number
     */
    precision   : number;
    /**
     * step
     *
     * @type {number}
     * @memberof Number
     */
    step        : number;
    /**
     * unit
     *
     * @type {string}
     * @memberof Number
     */
    unit        : string;

    /**
     * value
     *
     * @type {number}
     * @memberof Number
     */
    get value () : number        { return this._value; }
    set value ( value:number )   {
        if( value !== undefined ) {

            value = parseFloat( value.toString() );

            if( value < this.min ) value = this.min;
            if( value > this.max ) value = this.max;

            this._value = value;
            this.core.value = value.toFixed( this.precision );

            if( this.unit !== '' ) this.core.value += ' ' + this.unit;
        }
    }

    // [ Public Functions ]

    setRange( min:number, max:number ) {
        this.min = min;
        this.max = max;
    }

    // [ Constructors ]

    /**
     * Creates an instance of Number.
     * @param {number} number
     *
     * @memberof Number
     */
    constructor ( number:number ) {

        let element = document.createElement( 'input' );
        element.className   = 'Number'  ;
        element.value       = '0.00'    ;

        element.addEventListener( 'keydown', ( event:KeyboardEvent ) => {
            event.stopPropagation();
            if( event.keyCode === 13 ) element.blur();
        }, false );

        super( element );

        this._value     = 0;
        this.min        =-Infinity;
        this.max        = Infinity;
        this.precision  = 2;
        this.step       = 1;
        this.unit       = '';

        this.value = number;

        this._changeEvent = document.createEvent( 'HTMLEvents' );
        this._changeEvent.initEvent( 'change', true, true );

        this._distance          = 0;
        this._onMouseDownValue  = 0;
        this._pointer           = [ 0, 0 ];
        this._prevPointer       = [ 0, 0 ];

        this._onBlur(null);

        this._core.addEventListener( 'mousedown', this._onMouseDown  , false );
        this._core.addEventListener( 'focus'    , this._onFocus      , false );
        this._core.addEventListener( 'blur'     , this._onBlur       , false );
        this._core.addEventListener( 'change'   , this._onChange     , false );
    }


    // [ Protected Variables ]

    protected _value                : number;
    protected _changeEvent          : Event;
    protected _distance             : number;
    protected _onMouseDownValue     : number;
    protected _pointer              : number[];
    protected _prevPointer          : number[];

    // [ core ]

    get core() : HTMLInputElement { return <HTMLInputElement>this._core; }

    // [ Protected Events ]

	protected _onMouseDown ( event:MouseEvent ) {

		event.preventDefault();

		this._distance          = 0;
		this._onMouseDownValue  = this._value;
		this._prevPointer       = [ event.clientX, event.clientY ];

		document.addEventListener( 'mousemove'  , this._onMouseMove   , false );
		document.addEventListener( 'mouseup'    , this._onMouseUp     , false );
	}

	protected _onMouseMove( event:MouseEvent ) {

		let currentValue = this._value;

		this._pointer = [ event.clientX, event.clientY ];
		this._distance += ( this._pointer[ 0 ] - this._prevPointer[ 0 ] ) - ( this._pointer[ 1 ] - this._prevPointer[ 1 ] );

		let value = this._onMouseDownValue + ( this._distance / ( event.shiftKey ? 5 : 50 ) ) * this.step;
		value = Math.min( this.max, Math.max( this.min, value ) );

		if( currentValue !== value ) {
			this.value = value;
			this.core.dispatchEvent( this._changeEvent );
		}

		this._prevPointer = [ event.clientX, event.clientY ];
	}

	protected _onMouseUp( event:MouseEvent ) {
		document.removeEventListener( 'mousemove'   , this._onMouseMove  , false );
		document.removeEventListener( 'mouseup'     , this._onMouseUp    , false );

		if( Math.abs( this._distance ) < 2 ) {
			this.core.focus();
			this.core.select();
		}
	}
    protected _onChange( event:Event ) {
        this.value = parseInt( this.core.value );
    }
	protected _onFocus( event:FocusEvent ) {
		this._core.style.backgroundColor    = '';
		this._core.style.cursor             = '';
	}
	protected _onBlur( event:FocusEvent ) {
		this._core.style.backgroundColor    = 'transparent';
		this._core.style.cursor             = 'col-resize';
	}
}