// -----------------------------------------------------------------------------
// rect.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Ubject      } from '../engine/ubject';

/**
 * Rect
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Component
 */
export class Rect {
    // [ Static Variables ]

    /**
     * Shorthand for writing new Rect(0,0,0,0).
     *
     * @readonly
     * @static
     *
     * @memberof Rect
     */
    static get zero() { return new Rect(0,0,0,0); }

    // [ Public Variables ]

    /*
    center	The position of the center of the rectangle.
    */
    /**
     * The height of the rectangle, measured from the Y position.
     *
     * @type {number}
     * @memberof Rect
     */
    height : number;
    /*
    max	The position of the maximum corner of the rectangle.
    min	The position of the minimum corner of the rectangle.
    position	The X and Y position of the rectangle.
    size	The width and height of the rectangle.
    */
    /**
     * The width of the rectangle, measured from the X position.
     *
     * @type {number}
     * @memberof Rect
     */
    width : number;
    /**
     * The X coordinate of the rectangle.
     *
     * @type {number}
     * @memberof Rect
     */
    x : number;

    /*
    xMax	The maximum X coordinate of the rectangle.
    xMin	The minimum X coordinate of the rectangle.
    */
    /**
     * The Y coordinate of the rectangle.
     *
     * @type {number}
     * @memberof Rect
     */
    y : number;
    /*
    yMax	The maximum Y coordinate of the rectangle.
    yMin	The minimum Y coordinate of the rectangle.
    */

    // [ Constructors ]

    /**
     * Creates an instance of Rect.
     * @param {number} x
     * @param {number} y
     * @param {number} width
     * @param {number} height
     *
     * @memberof Rect
     */
    constructor(x:number,y:number,width:number,height:number){
        this.x      = x;
        this.y      = y;
        this.width  = width;
        this.height = height;
    }

    // [ Public Functions ]

    /*
    Contains	Returns true if the x and y components of point is a point inside this rectangle. If allowInverse is present and true, the width and height of the Rect are allowed to take negative values (ie, the min value is greater than the max), and the test will still work.
    Overlaps	Returns true if the other rectangle overlaps this one. If allowInverse is present and true, the widths and heights of the Rects are allowed to take negative values (ie, the min value is greater than the max), and the test will still work.
    Set	Set components of an existing Rect.
    ToString	Returns a nicely formatted string for this Rect.
    */

    // [ Static Functions ]

    /*
    MinMaxRect	Creates a rectangle from min/max coordinate values.
    NormalizedToPoint	Returns a point inside a rectangle, given normalized coordinates.
    PointToNormalized	Returns the normalized coordinates cooresponding the the point.
    */

    // [ Operators ]

    // operator ==	Returns true if the rectangles are the same.

}

