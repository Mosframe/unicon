// -----------------------------------------------------------------------------
// mesh.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Ubject      } from '../engine/ubject';
import {Geometry    } from '../engine/geometry';
import {Material    } from '../engine/material';


/**
 * A class that allows creating or modifying meshes from scripts.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class MeshFilter
 * @extends {Component}
 */
export class Mesh extends Ubject {

    // [ Variables ]

    /**
     * core
     *
     * @type {GL.Mesh}
     * @memberof Mesh
     */
    core    : GL.Mesh;

    /*
    bindposes:any;//	The bind poses. The bind pose at each index refers to the bone with the same index.
    blendShapeCount:any;//	Returns BlendShape count on this mesh.
    boneWeights:any;//	The bone weights of each vertex.
    bounds:any;//	The bounding volume of the mesh.
    colors:any;//	Vertex colors of the Mesh.
    colors32:any;//	Vertex colors of the Mesh.
    isReadable:any;//	Returns state of the Read/Write Enabled checkbox when model was imported.
    normals:any;//	The normals of the Mesh.
    subMeshCount:any;//	The number of sub-Meshes. Every Material has a separate triangle list.
    tangents:any;//	The tangents of the Mesh.
    triangles:any;//	An array containing all triangles in the Mesh.
    uv:any;//	The base texture coordinates of the Mesh.
    uv2:any;//	The second texture coordinate set of the mesh, if present.
    uv3:any;//	The third texture coordinate set of the mesh, if present.
    uv4:any;//	The fourth texture coordinate set of the mesh, if present.
    vertexBufferCount:any;//	Get the number of vertex buffers present in the Mesh. (Read Only)
    vertexCount:any;//	Returns the number of vertices in the Mesh (Read Only).
    vertices:any;//	Returns a copy of the vertex positions or assigns a new vertex positions array.
    */

    // [ Constructors ]

    /**
     * Creates an instance of Mesh.
     * @param {GL.Geometry} geometry
     * @param {GL.Material} material
     *
     * @memberof Mesh
     */
    constructor( geometry:Geometry ) {
        super();

        let material = new Material();
        this.core = new GL.Mesh( geometry.core, material.core );
        this.core.rotation.x    = -0.5 * Math.PI;
        this.core.receiveShadow = true;
    }

    // [ Public Functions ]

    /*
    AddBlendShapeFrame(){};//	Adds a new blend shape frame.
    Clear(){};//	Clears all vertex data and all triangle indices.
    ClearBlendShapes(){};//	Clears all blend shapes from Mesh.
    CombineMeshes(){};//	Combines several Meshes into this Mesh.
    GetBindposes(){};//	Gets the bind poses for this instance.
    GetBlendShapeFrameCount(){};//	Returns the frame count for a blend shape.
    GetBlendShapeFrameVertices(){};//	Retreives deltaVertices, deltaNormals and deltaTangents of a blend shape frame.
    GetBlendShapeFrameWeight(){};//	Returns the weight of a blend shape frame.
    GetBlendShapeIndex(){};//	Returns index of BlendShape by given name.
    GetBlendShapeName(){};//	Returns name of BlendShape by given index.
    GetBoneWeights(){};//	Gets the bone weights for this instance.
    GetColors(){};//	Gets the vertex colors for this instance.
    GetIndexCount(){};//	Gets the index count of the given submesh.
    GetIndexStart(){};//	Gets the starting index location within the Mesh's index buffer, for the given submesh.
    GetIndices(){};//	Gets the index buffer for the specified sub mesh on this instance.
    GetNativeIndexBufferPtr(){};//	Retrieves a native (underlying graphics API) pointer to the index buffer.
    GetNativeVertexBufferPtr(){};//	Retrieves a native (underlying graphics API) pointer to the vertex buffer.
    GetNormals(){};//	Gets the vertex normals for this instance.
    GetTangents(){};//	Gets the tangents for this instance.
    GetTopology(){};//	Gets the topology of a sub-Mesh.
    GetTriangles(){};//	Gets the triangle list for the specified sub mesh on this instance.
    GetUVs(){};//	Get the UVs for a given chanel.
    GetVertices(){};//	Gets the vertex positions for this instance.
    MarkDynamic(){};//	Optimize mesh for frequent updates.
    RecalculateBounds(){};//	Recalculate the bounding volume of the Mesh from the vertices.
    RecalculateNormals(){};//	Recalculates the normals of the Mesh from the triangles and vertices.
    RecalculateTangents(){};//	Recalculates the tangents of the Mesh from the normals and texture coordinates.
    SetColors(){};//	Vertex colors of the Mesh.
    SetIndices(){};//	Sets the index buffer for the sub-Mesh.
    SetNormals(){};//	Set the normals of the Mesh.
    SetTangents(){};//	Set the tangents of the Mesh.
    SetTriangles(){};//	Sets the triangle list for the sub-Mesh.
    SetUVs(){};//	Set the UVs for a given chanel.
    SetVertices(){};//	Assigns a new vertex positions array.
    UploadMeshData(){};//	Upload previously done Mesh modifications to the graphics API.
    */
}

