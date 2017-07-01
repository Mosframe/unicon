// -----------------------------------------------------------------------------
// shadow-casting-mode.ts
// -----------------------------------------------------------------------------
/**
 * How shadows are cast from this object.
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @enum {number}
 */
export enum ShadowCastingMode {

    /** No shadows are cast from this object. */
    off         ,
    /**	Shadows are cast from this object. */
    on          ,
    /**	Shadows are cast from this object, treating it as two-sided. */
    twoSided    ,
    /**	Object casts shadows, but is otherwise invisible in the scene. */
    shadowsOnly ,
}
