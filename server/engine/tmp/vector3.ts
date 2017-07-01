// -----------------------------------------------------------------------------
// vector3.ts
// -----------------------------------------------------------------------------
import * as GL  from '../engine/graphic';
import {Ubject} from '../engine/ubject';

/**
 * Vector3
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Vector3
 * @extends {GL.Vector3}
 */
export class Vector3 extends GL.Vector3 {

    // [ Public Delegates ]

    // [ Public Static Variables ]

    /*
    static back	Shorthand for writing Vector3(0, 0, -1).
    static down	Shorthand for writing Vector3(0, -1, 0).
    static forward	Shorthand for writing Vector3(0, 0, 1).
    static left	Shorthand for writing Vector3(-1, 0, 0).
    static negativeInfinity	Shorthand for writing Vector3(float.NegativeInfinity, float.NegativeInfinity, float.NegativeInfinity).
    static one	Shorthand for writing Vector3(1, 1, 1).
    static positiveInfinity	Shorthand for writing Vector3(float.PositiveInfinity, float.PositiveInfinity, float.PositiveInfinity).
    static right	Shorthand for writing Vector3(1, 0, 0).
    */

    /**
     * Shorthand for writing Vector3(0, 1, 0).
     *
     * @readonly
     * @type {Vector3}
     * @memberof Vector3
     */
    static get up() : Vector3 { return new Vector3(0,1,0); }

    /**
     * Shorthand for writing Vector3(0, 0, 0).
     *
     * @readonly
     * @static
     * @type {Vector3}
     * @memberof Vector3
     */
    static get zero() : Vector3 { return new Vector3(0,0,0); }

    // [ Public Variables ]

    //magnitude	//Returns the length of this vector (Read Only).
    //normalized 	//Returns this vector with a magnitude of 1 (Read Only).
    //sqrMagnitude	//Returns the squared length of this vector (Read Only).
    //this[int]	//Access the x, y, z components using [0], [1], [2] respectively.


    // [ Constructors ]

    // [ Public Static Functions ]

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
    static SignedAngle	Returns the signed angle in degrees between from and to.
    static Slerp	Spherically interpolates between two vectors.
    static SlerpUnclamped	Spherically interpolates between two vectors.
    static SmoothDamp	Gradually changes a vector towards a desired goal over time.
    */

    // [ Public Functions ]

    // [ Public Operators ]

    /*
    operator -	Subtracts one vector from another.
    operator !=	Returns true if vectors different.
    operator *	Multiplies a vector by a number.
    operator /	Divides a vector by a number.
    operator +	Adds two vectors.
    operator ==	Returns true if two vectors are approximately equal.
    */


    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
