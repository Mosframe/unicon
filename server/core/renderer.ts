// -----------------------------------------------------------------------------
// renderer.ts
// -----------------------------------------------------------------------------
import * as THREE     from 'three';
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
 * @class Component
 * @extends {Component}
 */
export class Renderer extends Component {

    // [ Public Variables ] --------------------------------------------------------------------------------------------------

    /**
     * renderer
     *
     * @type {THREE.WebGLRenderer}
     * @memberof Renderer
     */
    renderer : THREE.WebGLRenderer;
    /**
     * Creates an instance of Renderer.
     * @param {HTMLElement} container
     *
     * @memberof Renderer
     */
    constructor( container:HTMLElement ) {
        super();

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0xdddddd);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        container.appendChild( this.renderer.domElement );
    }

    // [ Public Functions ] --------------------------------------------------------------------------------------------------

    /**
     * render
     *
     * @param {Scene} scene
     * @param {Camera} camera
     *
     * @memberof Renderer
     */
    render( scene:Scene, camera:Camera ) {
        this.renderer.render( scene.scene, camera.camera );
    }


    // [ Public Variables ] --------------------------------------------------------------------------------------------------

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

    // [ Messages ] --------------------------------------------------------------------------------------------------

    onBecameInvisible(){}//	OnBecameInvisible is called when the object is no longer visible by any camera.
    onBecameVisible(){}//	OnBecameVisible is called when the object became visible by any camera.

    // [ private ] --------------------------------------------------------------------------------------------------
    */
}

