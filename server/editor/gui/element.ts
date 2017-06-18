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
            if( this._core.lastChild ) {
                this._core.removeChild( this._core.lastChild );
            }
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

        if( Object.hasProterty( this._core, 'disabled' ) ) this._core['disabled'] = value;
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

    setBackground       ( ...values:string[] ) { return this.setStyle('background'        ,values); }
    setBackgroundColor  ( ...values:string[] ) { return this.setStyle('backgroundColor'   ,values); }
    setBorder           ( ...values:string[] ) { return this.setStyle('border'            ,values); }
    setBorderLeft       ( ...values:string[] ) { return this.setStyle('borderLeft'        ,values); }
    setBorderTop        ( ...values:string[] ) { return this.setStyle('borderTop'         ,values); }
    setBorderRight      ( ...values:string[] ) { return this.setStyle('borderRight'       ,values); }
    setBorderBottom     ( ...values:string[] ) { return this.setStyle('borderBottom'      ,values); }
    setBorderColor      ( ...values:string[] ) { return this.setStyle('borderColor'       ,values); }
    setBottom           ( ...values:string[] ) { return this.setStyle('bottom'            ,values); }
    setColor            ( ...values:string[] ) { return this.setStyle('color'             ,values); }
    setCursor           ( ...values:string[] ) { return this.setStyle('cursor'            ,values); }
    setDisplay          ( ...values:string[] ) { return this.setStyle('display'           ,values); }
    setFontSize         ( ...values:string[] ) { return this.setStyle('fontSize'          ,values); }
    setFontWeight       ( ...values:string[] ) { return this.setStyle('fontWeight'        ,values); }
    setHeight           ( ...values:string[] ) { return this.setStyle('height'            ,values); }
    setLeft             ( ...values:string[] ) { return this.setStyle('left'              ,values); }
    setMargin           ( ...values:string[] ) { return this.setStyle('margin'            ,values); }
    setMarginBottom     ( ...values:string[] ) { return this.setStyle('marginBottom'      ,values); }
    setMarginLeft       ( ...values:string[] ) { return this.setStyle('marginLeft'        ,values); }
    setMarginRight      ( ...values:string[] ) { return this.setStyle('marginRight'       ,values); }
    setMarginTop        ( ...values:string[] ) { return this.setStyle('marginTop'         ,values); }
    setOpacity          ( ...values:string[] ) { return this.setStyle('opacity'           ,values); }
    setOverflow         ( ...values:string[] ) { return this.setStyle('overflow'          ,values); }
    setPadding          ( ...values:string[] ) { return this.setStyle('padding'           ,values); }
    setPaddingBottom    ( ...values:string[] ) { return this.setStyle('paddingBottom'     ,values); }
    setPaddingLeft      ( ...values:string[] ) { return this.setStyle('paddingLeft'       ,values); }
    setPaddingRight     ( ...values:string[] ) { return this.setStyle('paddingRight'      ,values); }
    setPaddingTop       ( ...values:string[] ) { return this.setStyle('paddingTop'        ,values); }
    setPosition         ( ...values:string[] ) { return this.setStyle('position'          ,values); }
    setRight            ( ...values:string[] ) { return this.setStyle('right'             ,values); }
    setTextAlign        ( ...values:string[] ) { return this.setStyle('textAlign'         ,values); }
    setTextDecoration   ( ...values:string[] ) { return this.setStyle('textDecoration'    ,values); }
    setTextTransform    ( ...values:string[] ) { return this.setStyle('textTransform'     ,values); }
    setTop              ( ...values:string[] ) { return this.setStyle('top'               ,values); }
    setWidth            ( ...values:string[] ) { return this.setStyle('width'             ,values); }
    setZIndex           ( ...values:string[] ) { return this.setStyle('zIndex'            ,values); }

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
