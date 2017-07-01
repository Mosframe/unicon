// -----------------------------------------------------------------------------
// mesh-lambert-material.ts
// -----------------------------------------------------------------------------
import * as GL                from '../engine/graphic';
import {Material            } from '../engine/material';
import {Color               } from '../engine/color';
import {ShaderType          } from '../engine/shader-type';
import {Ubject              } from '../engine/ubject';

/**
 * The MeshLambertMaterial class.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class MeshLambertMaterial
 * @extends {Material}
 */
export class MeshLambertMaterial extends Material {

    // [ Public Variables ]

    /**
     * get GL.Material
     *
     * @readonly
     *
     * @memberof Material
     */
    get core() : GL.MeshLambertMaterial { return <GL.MeshLambertMaterial>this._core; }

    /**
     * The main material's color.
     *
     * @readonly
     * @type {Color}
     * @memberof MeshLambertMaterial
     */
    get color() : Color         { return <Color>this.core.color; }
    set color( value:Color )    { this.core.color = value; }
    /*
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

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Functions ]
    protected create() {
        this._core = new GL.MeshLambertMaterial({color:0xffffff});
    }

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
