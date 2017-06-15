// -----------------------------------------------------------------------------
// element.ts
// -----------------------------------------------------------------------------
//import {} from '../../engine/object';

namespace UniconEditor.GUI {

    /**
     * Element
     *
     * @author mrdoob ( http://mrdoob.com/ )
     * @author mosframe ( https://github.com/mosframe )
     * @export
     * @class Element
     */
    export class Element {

        // [ Public Variables ]

        setBackground       ( ...values:any[] ) { this.setStyle('background'        ,values); }
        setBackgroundColor  ( ...values:any[] ) { this.setStyle('backgroundColor'   ,values); }
        setBorder           ( ...values:any[] ) { this.setStyle('border'            ,values); }
        setBorderLeft       ( ...values:any[] ) { this.setStyle('borderLeft'        ,values); }
        setBorderTop        ( ...values:any[] ) { this.setStyle('borderTop'         ,values); }
        setBorderRight      ( ...values:any[] ) { this.setStyle('borderRight'       ,values); }
        setBorderBottom     ( ...values:any[] ) { this.setStyle('borderBottom'      ,values); }
        setBorderColor      ( ...values:any[] ) { this.setStyle('borderColor'       ,values); }
        setBottom           ( ...values:any[] ) { this.setStyle('bottom'            ,values); }
        setColor            ( ...values:any[] ) { this.setStyle('color'             ,values); }
        setCursor           ( ...values:any[] ) { this.setStyle('cursor'            ,values); }
        setDisplay          ( ...values:any[] ) { this.setStyle('display'           ,values); }
        setFontSize         ( ...values:any[] ) { this.setStyle('fontSize'          ,values); }
        setFontWeight       ( ...values:any[] ) { this.setStyle('fontWeight'        ,values); }
        setHeight           ( ...values:any[] ) { this.setStyle('height'            ,values); }
        setLeft             ( ...values:any[] ) { this.setStyle('left'              ,values); }
        setMargin           ( ...values:any[] ) { this.setStyle('margin'            ,values); }
        setMarginBottom     ( ...values:any[] ) { this.setStyle('marginBottom'      ,values); }
        setMarginLeft       ( ...values:any[] ) { this.setStyle('marginLeft'        ,values); }
        setMarginRight      ( ...values:any[] ) { this.setStyle('marginRight'       ,values); }
        setMarginTop        ( ...values:any[] ) { this.setStyle('marginTop'         ,values); }
        setOpacity          ( ...values:any[] ) { this.setStyle('opacity'           ,values); }
        setOverflow         ( ...values:any[] ) { this.setStyle('overflow'          ,values); }
        setPadding          ( ...values:any[] ) { this.setStyle('padding'           ,values); }
        setPaddingBottom    ( ...values:any[] ) { this.setStyle('paddingBottom'     ,values); }
        setPaddingLeft      ( ...values:any[] ) { this.setStyle('paddingLeft'       ,values); }
        setPaddingRight     ( ...values:any[] ) { this.setStyle('paddingRight'      ,values); }
        setPaddingTop       ( ...values:any[] ) { this.setStyle('paddingTop'        ,values); }
        setPosition         ( ...values:any[] ) { this.setStyle('position'          ,values); }
        setRight            ( ...values:any[] ) { this.setStyle('right'             ,values); }
        setTextAlign        ( ...values:any[] ) { this.setStyle('textAlign'         ,values); }
        setTextDecoration   ( ...values:any[] ) { this.setStyle('textDecoration'    ,values); }
        setTextTransform    ( ...values:any[] ) { this.setStyle('textTransform'     ,values); }
        setTop              ( ...values:any[] ) { this.setStyle('top'               ,values); }
        setWidth            ( ...values:any[] ) { this.setStyle('width'             ,values); }
        setZIndex           ( ...values:any[] ) { this.setStyle('zIndex'            ,values); }


        // [ Constructors ]

        /**
         * Creates an instance of Element.
         * @param {any} dom
         *
         * @memberof Element
         */
        constructor ( dom ) {
            this.core = dom;
        };

        // [ Public Functions ]

        /**
         * add property
         *
         * @param {...any[]} args arguments
         * @returns
         *
         * @memberof Element
         */
        add ( ...args:any[] ) {

            for ( let i = 0; i < args.length; i ++ ) {

                let argument = args[ i ];

                if ( argument instanceof UI.Element ) {

                    this.core.appendChild( argument.dom );

                } else {

                    console.error( 'UI.Element:', argument, 'is not an instance of UI.Element.' );

                }

            }

            return this;
        }
        /**
         * remove property
         *
         * @param {...any[]} args arguments
         * @returns
         *
         * @memberof Element
         */
        remove ( ...args:any[] ) {

            for ( let i = 0; i < args.length; i ++ ) {

                var argument = args[ i ];

                if ( argument instanceof UI.Element ) {

                    this.core.removeChild( argument.dom );

                } else {

                    console.error( 'UI.Element:', argument, 'is not an instance of UI.Element.' );

                }

            }

            return this;
        }
        /**
         * clear properties
         *
         *
         * @memberof Element
         */
        clear () {

            while( this.core.children.length ) {
                this.core.removeChild( this.core.lastChild );
            }
        }
        /**
         * set id
         *
         * @param {any} id
         * @returns
         *
         * @memberof Element
         */
        setId ( id ) {

            this.core.id = id;
            return this;
        }
        /**
         * set class
         *
         * @param {any} name
         * @returns
         *
         * @memberof Element
         */
        setClass ( name ) {

            this.core.className = name;
            return this;
        }
        /**
         * set style
         *
         * @param {string} style
         * @param {any[]} values
         * @returns
         *
         * @memberof Element
         */
        setStyle ( style:string, values:any[] ) {

            for ( var i = 0; i < values.length; i ++ ) {
                this.core.style[ style ] = values[ i ];
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

            if( Object.existProterty( this.core, 'disabled' ) ) this.core['disabled'] = value;
           return this;
        }
        /**
         * set text content
         *
         * @param {any} value
         * @returns
         *
         * @memberof Element
         */
        setTextContent ( value ) {

            this.core.textContent = value;
            return this;
        }

        // [ Events ]

        onKeyUp     ( callback:Function ) { this.core.addEventListener( 'keyup'      , callback.bind( this ), false ); }
        onKeyDown   ( callback:Function ) { this.core.addEventListener( 'keyuown'    , callback.bind( this ), false ); }
        onMouseOver ( callback:Function ) { this.core.addEventListener( 'mouseover'  , callback.bind( this ), false ); }
        onMouseOut  ( callback:Function ) { this.core.addEventListener( 'mouseout'   , callback.bind( this ), false ); }
        onClick     ( callback:Function ) { this.core.addEventListener( 'click'      , callback.bind( this ), false ); }
        onDblClick  ( callback:Function ) { this.core.addEventListener( 'dblclick'   , callback.bind( this ), false ); }
        onChange    ( callback:Function ) { this.core.addEventListener( 'change'     , callback.bind( this ), false ); }

        // [ cores ]

        core : HTMLElement;
    }
}
