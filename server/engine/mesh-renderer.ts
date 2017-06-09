// -----------------------------------------------------------------------------
// mesh-renderer.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Mesh        } from '../engine/mesh';
import {MeshFilter  } from '../engine/mesh-filter';
import {Material    } from '../engine/material';
import {Renderer    } from '../engine/renderer';
import {ShaderType  } from '../engine/shader-type';

/**
 * Renders meshes inserted by the MeshFilter or TextMesh.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class MeshRenderer
 * @extends {Renderer}
 */
export class MeshRenderer extends Renderer {

    // [ Public Variables ]

    /*
    additionalVertexStreams	Vertex attributes in this mesh will override or add attributes of the primary mesh in the MeshRenderer.
    */

    // [ Constructors ]

    /**
     * Creates an instance of MeshRenderer.
     *
     * @memberof MeshRenderer
     */
    constructor() {
        super();

        // [ Mesh ]
        let meshFilter  = this.gameObject.getComponent( MeshFilter );
        if( !meshFilter ) meshFilter = this.gameObject.addComponent( MeshFilter );
        let mesh        = new Mesh();
        this.material   = new Material( ShaderType.MeshLambert );

        meshFilter.mesh = mesh;
    }

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
