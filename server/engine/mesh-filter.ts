// -----------------------------------------------------------------------------
// mesh-filter.ts
// -----------------------------------------------------------------------------
import * as GL        from './graphic';
import {Vector3     } from './vector3';
import {Component   } from './component';
import {Mesh        } from './mesh';
import {Scene       } from './scene';


/**
 * A class to access the {Mesh} of the mesh filter.
 *
 * Use this with a procedural mesh interface. See Also: {Mesh} class.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class MeshFilter
 * @extends {Component}
 */
export class MeshFilter extends Component {

    // [ Variables ]

    /**
     * Returns the instantiated Mesh assigned to the mesh filter.
     *
     * @type {Mesh}
     * @memberof MeshFilter
     */
    mesh        : Mesh;
    /**
     * Returns the shared mesh of the mesh filter.
     *
     * @type {Mesh}
     * @memberof MeshFilter
     */
    sharedMesh  : Mesh;

    // [ Constructors ]

    /**
     * Creates an instance of MeshFilter.
     * @param {Mesh} mesh
     *
     * @memberof MeshFilter
     */
    constructor( mesh:Mesh ) {
        super();

        let v = new Vector3(0,0,0);
    }
}

