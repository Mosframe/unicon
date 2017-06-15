// -----------------------------------------------------------------------------
// panel.ts
// -----------------------------------------------------------------------------
import {Element} from './element';

/**
 * Panel
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Panel
 * @extends {Element}
 */
export class Panel extends Element {

    // [ Constructors ]

    /**
     * Creates an instance of Panel.
     *
     * @memberof Panel
     */
    constructor() {
        super( document.createElement( 'div' ) );
        this.core.className = 'Panel';
    }
}
