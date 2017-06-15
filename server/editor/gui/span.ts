// -----------------------------------------------------------------------------
// span.ts
// -----------------------------------------------------------------------------
namespace UniconEditor.GUI {

    /**
     * Span
     *
     * @author mrdoob ( http://mrdoob.com/ )
     * @author mosframe ( https://github.com/mosframe )
     * @export
     * @class Span
     * @extends {Element}
     */
    export class Span extends Element {

        // [ Constructors ]

        /**
         * Creates an instance of Span.
         *
         * @memberof Span
         */
        constructor() {
            super( document.createElement( 'span' ) );
        }
    }
}
