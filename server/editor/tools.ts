// -----------------------------------------------------------------------------
// tools.ts
// -----------------------------------------------------------------------------
import {ScriptableObject}  from '../engine/scriptable-object';
import {Tool            }  from './tool';
import {ViewTool        }  from './view-tool';

/**
 * Class used to manipulate the tools used in Unicon's Scene View.
 *
 * The View tool has options for Orbit, Pan, Zoom and FPS, depending on which combination mouse buttons and modifier keys is used. This property reports which option is currently active.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Tools
 * @extends {ScriptableObject}
 */
export class Tools extends ScriptableObject {

    // [ Static Variables ]

    /**
     * The tool that is currently selected for the Scene View.
     *
     * @type {Tool}
     * @memberof Tools
     */
    static current	: Tool;

    /*
    static handlePosition	The position of the tool handle in world space.
    static handleRect	The rectangle used for the rect tool.
    static handleRectRotation	The rotation of the rect tool handle in world space.
    static handleRotation	The rotation of the tool handle in world space.
    static hidden	Hides the Tools(Move, Rotate, Resize) on the Scene view.
    static pivotMode	Are we in Center or Pivot mode.
    static pivotRotation	What's the rotation of the tool handle.
    static rectBlueprintMode	Is the rect handle in blueprint mode?
    */

    /**
     * The option that is currently active for the View tool in the Scene view.
     *
     * @static
     * @type {ViewTool}
     * @memberof Tools
     */
    static viewTool : ViewTool;

    /*
    static visibleLayers	Which layers are visible in the scene view.
    */

}
