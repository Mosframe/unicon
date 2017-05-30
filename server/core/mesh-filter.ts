// -----------------------------------------------------------------------------
// mesh-filter.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
import {Component   } from './component';
import {Scene       } from './scene';


/**
 * A class to access the {Mesh} of the mesh filter.
 *
 * Use this with a procedural mesh interface. See Also: {Mesh} class.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class MeshFilter
 * @extends {Component}
 */
export class MeshFilter extends Component {


    mesh:any; // Returns the instantiated Mesh assigned to the mesh filter.
    sharedMesh:any;//	Returns the shared mesh of the mesh filter.

    constructor() {
        super();
    }

    // [ private ] --------------------------------------------------------------------------------------------------
}

