// -----------------------------------------------------------------------------
// color.ts
// -----------------------------------------------------------------------------
import * as GL  from '../engine/graphic';




/**
 * Representation of RGBA colors.
 *
 * This structure is used throughout Unicon to pass colors around. Each color component is a floating point value with a range from 0 to 1.
 *
 * Components (r,g,b) define a color in RGB color space. Alpha component (a) defines transparency - alpha of one is completely opaque, alpha of zero is completely transparent.
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Color
 * @extends {Ubject}
 */
export class Color extends GL.Color{

    // [ Public Delegates ]

    // [ Public Static Variables ]

    /**
     * Solid black. RGBA is (0, 0, 0, 1).
     *
     * @readonly
     * @static
     * @type {Color}
     * @memberof Color
     */
    static get black() : Color { return new Color(0,0,0,1); }
    /*
    static blue	Solid blue. RGBA is (0, 0, 1, 1).
    static clear	Completely transparent. RGBA is (0, 0, 0, 0).
    static cyan	Cyan. RGBA is (0, 1, 1, 1).
    static gray	Gray. RGBA is (0.5, 0.5, 0.5, 1).
    static green	Solid green. RGBA is (0, 1, 0, 1).
    static grey	English spelling for gray. RGBA is the same (0.5, 0.5, 0.5, 1).
    static magenta	Magenta. RGBA is (1, 0, 1, 1).
    static red	Solid red. RGBA is (1, 0, 0, 1).
    static white	Solid white. RGBA is (1, 1, 1, 1).
    static yellow	Yellow. RGBA is (1, 0.92, 0.016, 1), but the color is nice to look at!
    */

    // [ Public Variables ]

    /**
     * Alpha component of the color.
     *
     * @type {number}
     * @memberof Color
     */
    a : number;
    /*
    gamma	A version of the color that has had the gamma curve applied.
    grayscale	The grayscale value of the color. (Read Only)
    linear	A linear value of an sRGB color.
    maxColorComponent	Returns the maximum color component value: Max(r,g,b).
    this[int]	Access the r, g, b,a components using [0], [1], [2], [3] respectively.
    */

    // [ Constructors ]

    constructor( r:number, g:number, b:number, a:number=1 ) {
        super(r,g,b);
        this.a = a;
    }

    // [ Public Static Functions ]

    /*
    static HSVToRGB	Creates an RGB colour from HSV input.
    static Lerp	Linearly interpolates between colors a and b by t.
    static LerpUnclamped	Linearly interpolates between colors a and b by t.
    static RGBToHSV	Calculates the hue, saturation and value of an RGB input color.
    */

    // [ Public Functions ]

    /*
    ToString	Returns a nicely formatted string of this color.
    */

    // [ Public Operators ]

    /*
    Color	Colors can be implicitly converted to and from Vector4.
    operator -	Subtracts color b from color a. Each component is subtracted separately.
    operator *	Multiplies two colors together. Each component is multiplied separately.
    operator /	Divides color a by the float b. Each color component is scaled separately.
    operator +	Adds two colors together. Each component is added separately.
    Vector4	Colors can be implicitly converted to and from Vector4.
    */

    // [ Public Events ]

    // [ Public Messages ]

    // [ Protected Variables ]

    // [ Protected Static Variables ]

    // [ Protected Functions ]

    // [ Protected Static Functions ]
}
