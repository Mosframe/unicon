// -----------------------------------------------------------------------------
// mesh-filter.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Mesh        } from '../engine/mesh';
import {Component   } from '../engine/component';

/**
 * A class to access the Mesh of the mesh filter.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class MeshFilter
 * @extends {Component}
 */
export class MeshFilter extends Component {

    // [ Public Variables ]

    /**
     * Returns the instantiated Mesh assigned to the mesh filter.
     *
     * @type {Mesh}
     * @memberof MeshFilter
     */
    get mesh() : Mesh {
        return <Mesh>Component.instantiate( this.sharedMesh );
    }
    set mesh( value : Mesh ) {
        this.sharedMesh = value;
    }
    /**
     * Returns the shared mesh of the mesh filter.
     *
     *
     * @memberof MeshFilter
     */
    sharedMesh : Mesh;

    // [ Constructors ]

    /**
     * Creates an instance of MeshFilter.
     *
     * @memberof MeshFilter
     */
    constructor() {
        super();
    }

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
