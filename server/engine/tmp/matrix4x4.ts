// -----------------------------------------------------------------------------
// mattrix4x4.ts
// -----------------------------------------------------------------------------
import * as GL  from '../engine/graphic';
import {Ubject} from '../engine/ubject';

/**
 * A standard 4x4 transformation matrix.
 *
 * A transformation matrix can perform arbitrary linear 3D transformations (i.e. translation, rotation, scale, shear etc.) and perspective transformations using homogenous coordinates.
 * You rarely use matrices in scripts; most often using Vector3s, Quaternions and functionality of Transform class is more straightforward.
 * Plain matrices are used in special cases like setting up nonstandard camera projection.
 *
 * Consult any graphics textbook for in depth explanation of transformation matrices.
 *
 * In Unicon, Matrix4x4 is used by several Transform, Camera, Material and GL functions.
 *
 * Matrices in Unicon are column major. Data is accessed as: row + (column*4).
 * Matrices can be indexed like 2D arrays but in an expression like mat[a, b], a refers to the row index, while b refers to the column index (note that this is the opposite way round to Cartesian coordinates).
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Matrix4x4
 * @extends {GL.Matrix4}
 */
export class Matrix4x4 extends GL.Matrix4 {

    // [ Public Delegates ]

    // [ Public Static Variables ]

    /*
    static identity	Returns the identity matrix (Read Only).
    static zero	Returns a matrix with all elements set to zero (Read Only).
    */

    // [ Public Variables ]

    /*
    determinant	The determinant of the matrix.
    inverse	The inverse of this matrix (Read Only).
    isIdentity	Is this the identity matrix?
    this[int,int]	Access element at [row, column].
    transpose	Returns the transpose of this matrix (Read Only).
    */

    // [ Constructors ]

    // [ Public Static Functions ]

    /*
    static LookAt	Given a source point, a target point, and an up vector, computes a transformation matrix that corresponds to a camera viewing the target from the source, such that the right-hand vector is perpendicular to the up vector.
    static Ortho	Creates an orthogonal projection matrix.
    static Perspective	Creates a perspective projection matrix.
    static Rotate	Creates a rotation matrix.
    static Scale	Creates a scaling matrix.
    static Translate	Creates a translation matrix.
    static TRS	Creates a translation, rotation and scaling matrix.
    */

    // [ Public Functions ]

    /*
    GetColumn	Get a column of the matrix.
    GetRow	Returns a row of the matrix.
    MultiplyPoint	Transforms a position by this matrix (generic).
    MultiplyPoint3x4	Transforms a position by this matrix (fast).
    MultiplyVector	Transforms a direction by this matrix.
    SetColumn	Sets a column of the matrix.
    SetRow	Sets a row of the matrix.
    SetTRS	Sets this matrix to a translation, rotation and scaling matrix.
    ToString	Returns a nicely formatted string for this matrix.
    TransformPlane	Returns a plane that is transformed in space.
    */

    // [ Public Operators ]

    /*
    operator *	Multiplies two matrices.
    */

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
