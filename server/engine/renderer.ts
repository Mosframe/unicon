// -----------------------------------------------------------------------------
// renderer.ts
// -----------------------------------------------------------------------------
import * as GL        from './graphic';
import {Vector3     } from './vector3';
import {Quaternion  } from './quaternion';
import {UObject     } from './object';
import {Component   } from './component';
import {Camera      } from './camera';
import {Scene       } from './scene';

/**
 * Renderer : General functionality for all renderers.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @class Renderer
 * @extends {Component}
 */
export class Renderer extends Component {

    // [ Variables ]

    /**
     * core
     *
     * @type {GL.WebGLRenderer}
     * @memberof Renderer
     */
    core : GL.WebGLRenderer;

    /*
    /*
    bounds:any;//	The bounding volume of the renderer (Read Only).
    enabled:any;//	Makes the rendered 3D object visible if enabled.
    isPartOfStaticBatch:any;//	Has this renderer been statically batched with any other renderers?
    isVisible:any;//	Is this renderer visible in any camera? (Read Only)
    lightmapIndex:any;//	The index of the baked lightmap applied to this renderer.
    lightmapScaleOffset:any;//	The UV scale & offset used for a lightmap.
    lightProbeProxyVolumeOverride:any;//	If set, the Renderer will use the Light Probe Proxy Volume component attached to the source GameObject.
    lightProbeUsage:any;//	The light probe interpolation type.
    localToWorldMatrix:any;//	Matrix that transforms a point from local space into world space (Read Only).
    material:any;//	Returns the first instantiated Material assigned to the renderer.
    materials:any;//	Returns all the instantiated materials of this object.
    motionVectorGenerationMode:any;//	Specifies the mode for motion vector rendering.
    probeAnchor:any;//	If set, Renderer will use this Transform's position to find the light or reflection probe.
    realtimeLightmapIndex:any;//	The index of the realtime lightmap applied to this renderer.
    realtimeLightmapScaleOffset:any;//	The UV scale & offset used for a realtime lightmap.
    receiveShadows:any;//	Does this object receive shadows?
    reflectionProbeUsage:any;//	Should reflection probes be used for this Renderer?
    shadowCastingMode:any;//	Does this object cast shadows?
    sharedMaterial:any;//	The shared material of this object.
    sharedMaterials:any;//	All the shared materials of this object.
    sortingLayerID:any;//	Unique ID of the Renderer's sorting layer.
    sortingLayerName:any;//	Name of the Renderer's sorting layer.
    sortingOrder:any;//	Renderer's order within a sorting layer.
    worldToLocalMatrix:any;//	Matrix that transforms a point from world space into local space (Read Only).

    getClosestReflectionProbes(){}//	Returns an array of closest reflection probes with weights, weight shows how much influence the probe has on the renderer, this value is also used when blending between reflection probes occur.
    getPropertyBlock(){}//	Get per-renderer material property block.
    setPropertyBlock(){}//	Lets you add per-renderer material parameters without duplicating a material.
    */

    // [ Constructors ]

    /**
     * Creates an instance of Renderer.
     * @param {HTMLElement} container
     *
     * @memberof Renderer
     */
    constructor( container:HTMLElement ) {
        super();

        this.core = new GL.WebGLRenderer();
        this.core.setSize( window.innerWidth, window.innerHeight );
        this.core.setClearColor(0xdddddd);
        this.core.shadowMap.enabled = true;
        this.core.shadowMap.type = GL.PCFShadowMap;
        container.appendChild( this.core.domElement );
    }

    // [ Public Functions ]

    /**
     * render
     *
     * @param {Scene} scene
     * @param {Camera} camera
     *
     * @memberof Renderer
     */
    render( scene:Scene, camera:Camera ) {
        this.core.render( scene.core, camera.core );
    }

    // [ Messages ]

    /*
    onBecameInvisible(){}//	OnBecameInvisible is called when the object is no longer visible by any camera.
    onBecameVisible(){}//	OnBecameVisible is called when the object became visible by any camera.
    */
}
