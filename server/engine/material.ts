// -----------------------------------------------------------------------------
// material.ts
// -----------------------------------------------------------------------------
import * as GL            from './graphic';
import {PrimitiveType   } from './primitive-type';
import {UObject         } from './object';


/**
 * The material class.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class Material
 * @extends {Component}
 */
export class Material extends UObject {

    // [ Variables ]

    /**
     * core
     *
     * @type {GL.Material}
     * @memberof Material
     */
    core : GL.Material;

    /*
    color	The main material's color.
    enableInstancing	Gets and sets whether GPU instancing is enabled for this material.
    globalIlluminationFlags	Defines how the material should interact with lightmaps and lightprobes.
    mainTexture	The material's texture.
    mainTextureOffset	The texture offset of the main texture.
    mainTextureScale	The texture scale of the main texture.
    passCount	How many passes are in this material (Read Only).
    renderQueue	Render queue of this material.
    shader	The shader used by the material.
    shaderKeywords	Additional shader keywords set by this material.
    */

    // [ Constructors ]

    /**
     * Creates an instance of Geometry.
     *
     * @memberof Material
     */
    constructor() {
        super();
        this.core = new GL.MeshLambertMaterial({color:0xffffff});
    }

    // [ Public Functions ]

    /*
    CopyPropertiesFromMaterial	Copy properties from other material into this material.
    DisableKeyword	Unset a shader keyword.
    EnableKeyword	Sets a shader keyword that is enabled by this material.
    FindPass	Returns the index of the pass passName.
    GetColor	Get a named color value.
    GetColorArray	Get a named color array.
    GetFloat	Get a named float value.
    GetFloatArray	Get a named float array.
    GetInt	Get a named integer value.
    GetMatrix	Get a named matrix value from the shader.
    GetMatrixArray	Get a named matrix array.
    GetPassName	Returns the name of the shader pass at index pass.
    GetShaderPassEnabled	Checks whether a given Shader pass is enabled on this Material.
    GetTag	Get the value of material's shader tag.
    GetTexture	Get a named texture.
    GetTextureOffset	Gets the placement offset of texture propertyName.
    GetTextureScale	Gets the placement scale of texture propertyName.
    GetVector	Get a named vector value.
    GetVectorArray	Get a named vector array.
    HasProperty	Checks if material's shader has a property of a given name.
    IsKeywordEnabled	Is the shader keyword enabled on this material?
    Lerp	Interpolate properties between two materials.
    SetBuffer	Sets a named ComputeBuffer value.
    SetColor	Sets a named color value.
    SetColorArray	Sets a color array property.
    SetFloat	Sets a named float value.
    SetFloatArray	Sets a float array property.
    SetInt	Sets a named integer value.
    SetMatrix	Sets a named matrix for the shader.
    SetMatrixArray	Sets a matrix array property.
    SetOverrideTag	Sets an override tag/value on the material.
    SetPass	Activate the given pass for rendering.
    SetShaderPassEnabled	Enables or disables a Shader pass on a per-Material level.
    SetTexture	Sets a named texture.
    SetTextureOffset	Sets the placement offset of texture propertyName.
    SetTextureScale	Sets the placement scale of texture propertyName.
    SetVector	Sets a named vector value.
    SetVectorArray	Sets a vector array property.
    */
}

