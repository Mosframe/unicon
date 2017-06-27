// -----------------------------------------------------------------------------
// shader.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {ShaderType  } from '../engine/shader-type';
import {Ubject      } from '../engine/ubject';

/**
 * Shader scripts used for all rendering.
 * Most of the advanced rendering is controlled via Material class.
 * Shader class is mostly used just to check whether a shader can run on the user's hardware (isSupported property), setting up global shader properties and keywords, and finding shaders by name (Find method).
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Shader
 * @extends {Ubject}
 */
export class Shader extends Ubject {

    // [ Public Static Variables ]

    /*
    static globalMaximumLOD	Shader LOD level for all shaders.
    static globalRenderPipeline	Render pipeline currently in use.
    */

    // [ Public Variables ]

    /*
    isSupported	Can this shader run on the end-users graphics card? (Read Only)
    maximumLOD	Shader LOD level for this shader.
    renderQueue	Render queue of this shader. (Read Only)
    */

    // [ Constructors ]

    /**
     * Creates an instance of Shader.
     *
     * @memberof Shader
     */
    constructor() {
        super();
    }

    // [ Public Functions ]

    // [ Public Static Functions ]

    /*
    static DisableKeyword	Unset a global shader keyword.
    static EnableKeyword	Set a global shader keyword.
    */
    /**
     * Finds a shader with the given name.
     *
     * @static
     * @param {string} name
     * @returns {Shader}
     *
     * @memberof Shader
     */
    //static find( name : ShaderType ) : Shader {
    //    let shader = new Shader();
    //    return shader;
    //}
    /*
    static GetGlobalColor	Gets a global color property for all shaders previously set using SetGlobalColor.
    static GetGlobalFloat	Gets a global float property for all shaders previously set using SetGlobalFloat.
    static GetGlobalFloatArray	Gets a global float array for all shaders previously set using SetGlobalFloatArray.
    static GetGlobalInt	Gets a global int property for all shaders previously set using SetGlobalInt.
    static GetGlobalMatrix	Gets a global matrix property for all shaders previously set using SetGlobalMatrix.
    static GetGlobalMatrixArray	Gets a global matrix array for all shaders previously set using SetGlobalMatrixArray.
    static GetGlobalTexture	Gets a global texture property for all shaders previously set using SetGlobalTexture.
    static GetGlobalVector	Gets a global vector property for all shaders previously set using SetGlobalVector.
    static GetGlobalVectorArray	Gets a global vector array for all shaders previously set using SetGlobalVectorArray.
    static IsKeywordEnabled	Is global shader keyword enabled?
    static PropertyToID	Gets unique identifier for a shader property name.
    static SetGlobalBuffer	Sets a global compute buffer property for all shaders.
    static SetGlobalColor	Sets a global color property for all shaders.
    static SetGlobalFloat	Sets a global float property for all shaders.
    static SetGlobalFloatArray	Sets a global float array property for all shaders.
    static SetGlobalInt	Sets a global int property for all shaders.
    static SetGlobalMatrix	Sets a global matrix property for all shaders.
    static SetGlobalMatrixArray	Sets a global matrix array property for all shaders.
    static SetGlobalTexture	Sets a global texture property for all shaders.
    static SetGlobalVector	Sets a global vector property for all shaders.
    static SetGlobalVectorArray	Sets a global vector array property for all shaders.
    static WarmupAllShaders	Fully load all shaders to prevent future performance hiccups.
    */

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
