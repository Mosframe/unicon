// -----------------------------------------------------------------------------
// mesh-renderer.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {GameObject  } from '../engine/game-object';
import {Geometry    } from '../engine/geometry';
import {Material    } from '../engine/material';
import {Mesh        } from '../engine/mesh';
import {MeshFilter  } from '../engine/mesh-filter';
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

    get core() : GL.Mesh { return <GL.Mesh>this.gameObject.core; }

    /*
    additionalVertexStreams	Vertex attributes in this mesh will override or add attributes of the primary mesh in the MeshRenderer.
    */

    // [ Constructors ]

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
