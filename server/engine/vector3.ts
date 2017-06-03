// -----------------------------------------------------------------------------
// vector3.ts
// -----------------------------------------------------------------------------
import * as GL from './graphic';

/**
 * Representation of 3D vectors and points.
 *
 * This structure is used throughout Unity to pass 3D positions and directions around. It also contains functions for doing common vector operations.
 *
 * Besides the functions listed below, other classes can be used to manipulate vectors and points as well. For example the Quaternion and the Matrix4x4 classes are useful for rotating or transforming vectors and points.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Vector3
 * @extends {GL.Quaternion}
 */
export class Vector3 extends GL.Vector3 {

    // [ Static Variables ]

    /*
    static back	    Shorthand for writing Vector3(0, 0, -1).
    static down	    Shorthand for writing Vector3(0, -1, 0).
    static forward	Shorthand for writing Vector3(0, 0, 1).
    static left	    Shorthand for writing Vector3(-1, 0, 0).
    static one	    Shorthand for writing Vector3(1, 1, 1).
    static right	Shorthand for writing Vector3(1, 0, 0).
    static up	    Shorthand for writing Vector3(0, 1, 0).
    */

    /**
     * Shorthand for writing Vector3(0, 0, 0).
     *
     * @type {Vector3}
     * @memberof Vector3
     */
    static get zero() : Vector3{ return new Vector3(0,0,0); }

    // [ Public Variables ]

    /*
    magnitude	    Returns the length of this vector (Read Only).
    normalized	    Returns this vector with a magnitude of 1 (Read Only).
    sqrMagnitude	Returns the squared length of this vector (Read Only).
    this[int]	    Access the x, y, z components using [0], [1], [2] respectively.
    */

    /*
    x: number; // super
    y: number; // super
    z: number; // super
    */

    // [ Public Functions ]

    /*
    Equals	    Returns true if the given vector is exactly equal to this vector.
    Set	        Set x, y and z components of an existing Vector3.
    ToString	Returns a nicely formatted string for this vector.
    */

    // [ Static Functions ]

    /*
    static Angle	Returns the angle in degrees between from and to.
    static ClampMagnitude	Returns a copy of vector with its magnitude clamped to maxLength.
    static Cross	Cross Product of two vectors.
    static Distance	Returns the distance between a and b.
    static Dot	Dot Product of two vectors.
    static Lerp	Linearly interpolates between two vectors.
    static LerpUnclamped	Linearly interpolates between two vectors.
    static Max	Returns a vector that is made from the largest components of two vectors.
    static Min	Returns a vector that is made from the smallest components of two vectors.
    static MoveTowards	Moves a point current in a straight line towards a target point.
    static Normalize
    static OrthoNormalize	Makes vectors normalized and orthogonal to each other.
    static Project	Projects a vector onto another vector.
    static ProjectOnPlane	Projects a vector onto a plane defined by a normal orthogonal to the plane.
    static Reflect	Reflects a vector off the plane defined by a normal.
    static RotateTowards	Rotates a vector current towards target.
    static Scale	Multiplies two vectors component-wise.
    static Slerp	Spherically interpolates between two vectors.
    static SlerpUnclamped	Spherically interpolates between two vectors.
    static SmoothDamp	Gradually changes a vector towards a desired goal over time.
    */

    // [ Operators ]

    /*
    operator -	Subtracts one vector from another.
    operator *	Multiplies a vector by a number.
    operator /	Divides a vector by a number.
    operator +	Adds two vectors.
    operator ==	Returns true if two vectors are approximately equal.
    */

}

