// -----------------------------------------------------------------------------
// renderer.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Component   } from '../engine/component';
import {Material    } from '../engine/material';
import {ShaderType  } from '../engine/shader-type';


/**
 * General functionality for all renderers.
 * A renderer is what makes an object appear on the screen.
 * Use this class to access the renderer of any object, mesh or particle system.
 * Renderers can be disabled to make objects invisible (see enabled), and the materials can be accessed and modified through them (see material).
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Renderer
 * @extends {Component}
 */
export class Renderer extends Component {

    // [ Public Variables ]

    /*
    bounds	The bounding volume of the renderer (Read Only).
    enabled	Makes the rendered 3D object visible if enabled.
    isPartOfStaticBatch	Has this renderer been statically batched with any other renderers?
    isVisible	Is this renderer visible in any camera? (Read Only)
    lightmapIndex	The index of the baked lightmap applied to this renderer.
    lightmapScaleOffset	The UV scale & offset used for a lightmap.
    lightProbeProxyVolumeOverride	If set, the Renderer will use the Light Probe Proxy Volume component attached to the source GameObject.
    lightProbeUsage	The light probe interpolation type.
    localToWorldMatrix	Matrix that transforms a point from local space into world space (Read Only).
    */
    /**
     * Returns the first instantiated Material assigned to the renderer.
     * Modifying material will change the material for this object only.
     * If the material is used by any other renderers, this will clone the shared material and start using it from now on.
     *
     * @type {Material}
     * @memberof Renderer
     */
    get material() : Material {
        if( this.materials.length === 0 ) {
            let mtrl = new Material( ShaderType.MeshLambert );
            this.materials.push(mtrl);
        }
        return this.materials[0];
    }
    set material( value:Material ) {
        if( this.materials.length === 0 ) {
            this.materials.push(value);
        } else {
            this.materials[0] = value;
        }
    }
    /**
     * Returns all the instantiated materials of this object.
     *
     * @type {Material[]}
     * @memberof Renderer
     */
    materials : Material[] = [];
    /*
    motionVectorGenerationMode	Specifies the mode for motion vector rendering.
    probeAnchor	If set, Renderer will use this Transform's position to find the light or reflection probe.
    realtimeLightmapIndex	The index of the realtime lightmap applied to this renderer.
    realtimeLightmapScaleOffset	The UV scale & offset used for a realtime lightmap.
    receiveShadows	Does this object receive shadows?
    reflectionProbeUsage	Should reflection probes be used for this Renderer?
    shadowCastingMode	Does this object cast shadows?
    */
    /**
     * The shared material of this object.
     *
     * @type {Material}
     * @memberof Renderer
     */
    get sharedMaterial() : Material {
        if( this.sharedMaterials.length === 0 ) {
            let mtrl = new Material( ShaderType.MeshLambert );
            this.sharedMaterials.push(mtrl);
        }
        return this.sharedMaterials[0];
    }
    set sharedMaterial( value:Material ) {
        if( this.sharedMaterials.length === 0 ) {
            this.sharedMaterials.push(value);
        } else {
            this.sharedMaterials[0] = value;
        }
    }
    /**
     * All the shared materials of this object.
     *
     * @type {Material[]}
     * @memberof Renderer
     */
    sharedMaterials : Material[];
    /*
    sortingLayerID	Unique ID of the Renderer's sorting layer.
    sortingLayerName	Name of the Renderer's sorting layer.
    sortingOrder	Renderer's order within a sorting layer.
    worldToLocalMatrix	Matrix that transforms a point from world space into local space (Read Only).
    */

    // [ Constructors ]

    // [ Public Functions ]

    /*
    GetClosestReflectionProbes	Returns an array of closest reflection probes with weights, weight shows how much influence the probe has on the renderer, this value is also used when blending between reflection probes occur.
    GetPropertyBlock	Get per-renderer material property block.
    SetPropertyBlock	Lets you add per-renderer material parameters without duplicating a material.
    */

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    /*
    OnBecameInvisible	OnBecameInvisible is called when the object is no longer visible by any camera.
    OnBecameVisible	OnBecameVisible is called when the object became visible by any camera.
    */

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
