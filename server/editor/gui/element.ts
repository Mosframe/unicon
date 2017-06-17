// -----------------------------------------------------------------------------
// element.ts
// -----------------------------------------------------------------------------
import {} from '../../engine/object';

/**
 * Element
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Element
 */
export class Element {

    // [ Public Functions ]

    /**
     * append child elements
     *
     * @param {...Element[]} elements
     * @returns
     *
     * @memberof Element
     */
    add ( ...elements:Element[] ) {

        for( let i=0; i < elements.length; ++i ) {
            this._core.appendChild( elements[i].core );
        }
        return this;
    }
    /**
     * remove child elements
     *
     * @param {...any[]} elements
     * @returns
     *
     * @memberof Element
     */
    remove ( ...elements:Element[] ) {

        for( let i=0; i < elements.length; ++i ) {
            this._core.removeChild( elements[i].core );
        }

        return this;
    }
    /**
     * clear children elements
     *
     *
     * @memberof Element
     */
    clear () {

        while( this._core.children.length ) {
            this._core.removeChild( this._core.lastChild );
        }
    }
    /**
     * set id
     *
     * @param {string} id
     * @returns
     *
     * @memberof Element
     */
    setId ( id:string ) {

        this._core.id = id;
        return this;
    }
    /**
     * set class
     *
     * @param {string} name
     * @returns
     *
     * @memberof Element
     */
    setClass ( name:string ) {

        this._core.className = name;
        return this;
    }
    /**
     * set style
     *
     * @param {string} style
     * @param {string[]} values
     * @returns
     *
     * @memberof Element
     */
    setStyle ( style:string, values:string[] ) {

        for( let i = 0; i < values.length; ++i ) {
            this._core.style[style] = values[i];
        }
        return this;
    }
    /**
     * set disabled
     *
     * @param {boolean} value
     * @returns
     *
     * @memberof Element
     */
    setDisabled ( value:boolean ) {

        if( Object.existProterty( this._core, 'disabled' ) ) this._core['disabled'] = value;
        return this;
    }
    /**
     * set text content
     *
     * @param {string} value
     * @returns
     *
     * @memberof Element
     */
    setTextContent ( value:string ) {

        this._core.textContent = value;
        return this;
    }

    // [ Public Functions - Styles ]

    setBackground       ( ...values:string[] ) { this.setStyle('background'        ,values); }
    setBackgroundColor  ( ...values:string[] ) { this.setStyle('backgroundColor'   ,values); }
    setBorder           ( ...values:string[] ) { this.setStyle('border'            ,values); }
    setBorderLeft       ( ...values:string[] ) { this.setStyle('borderLeft'        ,values); }
    setBorderTop        ( ...values:string[] ) { this.setStyle('borderTop'         ,values); }
    setBorderRight      ( ...values:string[] ) { this.setStyle('borderRight'       ,values); }
    setBorderBottom     ( ...values:string[] ) { this.setStyle('borderBottom'      ,values); }
    setBorderColor      ( ...values:string[] ) { this.setStyle('borderColor'       ,values); }
    setBottom           ( ...values:string[] ) { this.setStyle('bottom'            ,values); }
    setColor            ( ...values:string[] ) { this.setStyle('color'             ,values); }
    setCursor           ( ...values:string[] ) { this.setStyle('cursor'            ,values); }
    setDisplay          ( ...values:string[] ) { this.setStyle('display'           ,values); }
    setFontSize         ( ...values:string[] ) { this.setStyle('fontSize'          ,values); }
    setFontWeight       ( ...values:string[] ) { this.setStyle('fontWeight'        ,values); }
    setHeight           ( ...values:string[] ) { this.setStyle('height'            ,values); }
    setLeft             ( ...values:string[] ) { this.setStyle('left'              ,values); }
    setMargin           ( ...values:string[] ) { this.setStyle('margin'            ,values); }
    setMarginBottom     ( ...values:string[] ) { this.setStyle('marginBottom'      ,values); }
    setMarginLeft       ( ...values:string[] ) { this.setStyle('marginLeft'        ,values); }
    setMarginRight      ( ...values:string[] ) { this.setStyle('marginRight'       ,values); }
    setMarginTop        ( ...values:string[] ) { this.setStyle('marginTop'         ,values); }
    setOpacity          ( ...values:string[] ) { this.setStyle('opacity'           ,values); }
    setOverflow         ( ...values:string[] ) { this.setStyle('overflow'          ,values); }
    setPadding          ( ...values:string[] ) { this.setStyle('padding'           ,values); }
    setPaddingBottom    ( ...values:string[] ) { this.setStyle('paddingBottom'     ,values); }
    setPaddingLeft      ( ...values:string[] ) { this.setStyle('paddingLeft'       ,values); }
    setPaddingRight     ( ...values:string[] ) { this.setStyle('paddingRight'      ,values); }
    setPaddingTop       ( ...values:string[] ) { this.setStyle('paddingTop'        ,values); }
    setPosition         ( ...values:string[] ) { this.setStyle('position'          ,values); }
    setRight            ( ...values:string[] ) { this.setStyle('right'             ,values); }
    setTextAlign        ( ...values:string[] ) { this.setStyle('textAlign'         ,values); }
    setTextDecoration   ( ...values:string[] ) { this.setStyle('textDecoration'    ,values); }
    setTextTransform    ( ...values:string[] ) { this.setStyle('textTransform'     ,values); }
    setTop              ( ...values:string[] ) { this.setStyle('top'               ,values); }
    setWidth            ( ...values:string[] ) { this.setStyle('width'             ,values); }
    setZIndex           ( ...values:string[] ) { this.setStyle('zIndex'            ,values); }

    // [ Constructors ]

    /**
     * Creates an instance of Element.
     * @param {HTMLElement} element
     *
     * @memberof Element
     */
    constructor ( element:HTMLElement ) {
        this._core = element;
    };


    // [ Events ]

    onKeyUp     ( callback:Function ) { this._core.addEventListener( 'keyup'      , callback.bind( this ), false ); }
    onKeyDown   ( callback:Function ) { this._core.addEventListener( 'keyuown'    , callback.bind( this ), false ); }
    onMouseOver ( callback:Function ) { this._core.addEventListener( 'mouseover'  , callback.bind( this ), false ); }
    onMouseOut  ( callback:Function ) { this._core.addEventListener( 'mouseout'   , callback.bind( this ), false ); }
    onClick     ( callback:Function ) { this._core.addEventListener( 'click'      , callback.bind( this ), false ); }
    onDblClick  ( callback:Function ) { this._core.addEventListener( 'dblclick'   , callback.bind( this ), false ); }
    onChange    ( callback:Function ) { this._core.addEventListener( 'change'     , callback.bind( this ), false ); }

    // [ core ]

    get core() : HTMLElement { return this._core; }
    protected _core : HTMLElement;
}
