// -----------------------------------------------------------------------------
// renderer.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Component   } from '../engine/component';

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
    material	Returns the first instantiated Material assigned to the renderer.
    materials	Returns all the instantiated materials of this object.
    motionVectorGenerationMode	Specifies the mode for motion vector rendering.
    probeAnchor	If set, Renderer will use this Transform's position to find the light or reflection probe.
    realtimeLightmapIndex	The index of the realtime lightmap applied to this renderer.
    realtimeLightmapScaleOffset	The UV scale & offset used for a realtime lightmap.
    receiveShadows	Does this object receive shadows?
    reflectionProbeUsage	Should reflection probes be used for this Renderer?
    shadowCastingMode	Does this object cast shadows?
    sharedMaterial	The shared material of this object.
    sharedMaterials	All the shared materials of this object.
    sortingLayerID	Unique ID of the Renderer's sorting layer.
    sortingLayerName	Name of the Renderer's sorting layer.
    sortingOrder	Renderer's order within a sorting layer.
    worldToLocalMatrix	Matrix that transforms a point from world space into local space (Read Only).
    */

    // [ Constructors ]

    /**
     * Creates an instance of Renderer.
     *
     * @memberof Renderer
     */
    constructor() {
        super();
    }

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
