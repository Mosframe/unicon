// -----------------------------------------------------------------------------
// tool.ts
// -----------------------------------------------------------------------------

/**
 * Which tool is active in the editor.
 *
 * @author mosframe / https://github.com/Mosframe
 *
 * @export
 * @enum {number}
 */
export enum Tool {
    /** No tool is active. Set this to implement your own in-inspector toolbar (like the terrain editor does). */
    None,
    /** The view tool is active - Use Tools.viewTool to find out which view tool we're talking about. */
    View,
    /** The move tool is active. */
    Move,
    /** The rotate tool is active. */
    Rotate,
    /** The scale tool is active. */
    Scale,
    /** The rect tool is active. */
    Rect,
}
