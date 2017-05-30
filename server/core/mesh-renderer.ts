// -----------------------------------------------------------------------------
// mesh-renderer.ts
// -----------------------------------------------------------------------------
import {Renderer} from './renderer';

/**
 * MeshRenderer : Renders meshes inserted by the {MeshFilter} or {TextMesh}.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class Component
 * @extends {Renderer}
 */
export class MeshRenderer extends Renderer {

    additionalVertexStreams:any;//	Vertex attributes in this mesh will override or add attributes of the primary mesh in the MeshRenderer.

    // [ private ] --------------------------------------------------------------------------------------------------
}

