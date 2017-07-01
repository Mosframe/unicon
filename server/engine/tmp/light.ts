// -----------------------------------------------------------------------------
// light.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Behaviour   } from '../engine/behaviour';
import {GameObject  } from '../engine/game-Object';

/**
 * Script interface for light components.
 *
 * Use this to control all aspects of Unicon's lights. The properties are an exact match for the values shown in the Inspector.
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Light
 * @extends {Behaviour}
 */
export class Light extends Behaviour {

    // [ Public Delegates ]

    // [ Public Static Variables ]

    // [ Public Variables ]

    /**
     * get GL.Light
     *
     * @readonly
     * @type {GL.Light}
     * @memberof Light
     */
    get core() : GL.Light { return <GL.Light>this.gameObject.core; }

    /*
    areaSize	The size of the area light.
    bounceIntensity	The multiplier that defines the strength of the bounce lighting.
    color	The color of the light.
    colorTemperature	The color temperature of the light. Correlated Color Temperature (abbreviated as CCT) is multiplied with the color filter when calculating the final color of a light source. The color temperature of the electromagnetic radiation emitted from an ideal black body is defined as its surface temperature in Kelvin. White is 6500K according to the D65 standard. Candle light is 1800K. If you want to use lightsUseCCT, lightsUseLinearIntensity has to be enabled to ensure physically correct output. See Also: GraphicsSettings.lightsUseLinearIntensity, GraphicsSettings.lightsUseCCT.
    commandBufferCount	Number of command buffers set up on this light (Read Only).
    cookie	The cookie texture projected by the light.
    cookieSize	The size of a directional light's cookie.
    cullingMask	This is used to light certain objects in the scene selectively.
    flare	The flare asset to use for this light.
    intensity	The Intensity of a light is multiplied with the Light color.
    isBaked	Is the light contribution already stored in lightmaps and/or lightprobes (Read Only).
    lightmapBakeType	This property describes what part of a light's contribution can be baked.
    range	The range of the light.
    renderMode	How to render the light.
    shadowBias	Shadow mapping constant bias.
    shadowCustomResolution	The custom resolution of the shadow map.
    shadowNearPlane	Near plane value to use for shadow frustums.
    shadowNormalBias	Shadow mapping normal-based bias.
    shadowResolution	The resolution of the shadow map.
    shadows	How this light casts shadows
    shadowStrength	Strength of light's shadows.
    spotAngle	The angle of the light's spotlight cone in degrees.
    type	The type of the light.
    */

    // [ Constructors ]

    /**
     * Creates an instance of Light.
     * @param {GameObject} gameObject
     *
     * @memberof Light
     */
    constructor( gameObject:GameObject ) {
        super( gameObject );

        this.gameObject.core = new GL.SpotLight(0xffffff);
        this.gameObject.core.castShadow = true;
        this.gameObject.core.position.set(0,10,0);
    }

    // [ Public Static Functions ]

    // [ Public Functions ]

    /*
    AddCommandBuffer	Add a command buffer to be executed at a specified place.
    GetCommandBuffers	Get command buffers to be executed at a specified place.
    RemoveAllCommandBuffers	Remove all command buffers set on this light.
    RemoveCommandBuffer	Remove command buffer from execution at a specified place.
    RemoveCommandBuffers	Remove command buffers from execution at a specified place.
    */

    // [ Public Operators ]

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
