// -----------------------------------------------------------------------------
// quaternion.ts
// -----------------------------------------------------------------------------
import * as GL  from '../engine/graphic';

/**
 * Quaternion
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Quaternion
 * @extends {GL.Quaternion}
 */
export class Quaternion extends GL.Quaternion {

    // [ Public Delegates ]

    // [ Public Static Variables ]

    /**
     * The identity rotation (Read Only).
     *
     * @readonly
     * @static
     * @type {Quaternion}
     * @memberof Quaternion
     */
    static get identity() : Quaternion { return new Quaternion(); }

    // [ Public Variables ]

    /*
    eulerAngles	Returns the euler angle representation of the rotation.
    this[int]	Access the x, y, z, w components using [0], [1], [2], [3] respectively.
    */

    // [ Constructors ]

    // [ Public Static Functions ]

    /*
    static Angle	Returns the angle in degrees between two rotations a and b.
    static AngleAxis	Creates a rotation which rotates angle degrees around axis.
    static Dot	The dot product between two rotations.
    static Euler	Returns a rotation that rotates z degrees around the z axis, x degrees around the x axis, and y degrees around the y axis (in that order).
    static FromToRotation	Creates a rotation which rotates from fromDirection to toDirection.
    static Inverse	Returns the Inverse of rotation.
    static Lerp	Interpolates between a and b by t and normalizes the result afterwards. The parameter t is clamped to the range [0, 1].
    static LerpUnclamped	Interpolates between a and b by t and normalizes the result afterwards. The parameter t is not clamped.
    static LookRotation	Creates a rotation with the specified forward and upwards directions.
    static RotateTowards	Rotates a rotation from towards to.
    static Slerp	Spherically interpolates between a and b by t. The parameter t is clamped to the range [0, 1].
    static SlerpUnclamped	Spherically interpolates between a and b by t. The parameter t is not clamped.
    */

    // [ Public Functions ]

    /*
    Set	Set x, y, z and w components of an existing Quaternion.
    SetFromToRotation	Creates a rotation which rotates from fromDirection to toDirection.
    SetLookRotation	Creates a rotation with the specified forward and upwards directions.
    ToAngleAxis	Converts a rotation to angle-axis representation (angles in degrees).
    ToString	Returns a nicely formatted string of the Quaternion.
    */

    // [ Public Operators ]

    /*
    operator *	Combines rotations lhs and rhs.
    operator ==	Are two quaternions equal to each other?
    */

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
