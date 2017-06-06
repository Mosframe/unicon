// -----------------------------------------------------------------------------
// geometry.ts
// -----------------------------------------------------------------------------
import * as GL            from '../engine/graphic';
import {PrimitiveType   } from '../engine/primitive-type';
import {Ubject          } from '../engine/ubject';


/**
 * Geometry
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Geometry
 * @extends {Component}
 */
export class Geometry extends Ubject {

    // [ Variables ]

    // [ Constructors ]

    /**
     * Creates an instance of Geometry.
     * @param {PrimitiveType} type
     *
     * @memberof Geometry
     */
    constructor( type:PrimitiveType ) {
        super();

        switch(type) {
        case PrimitiveType.cube:
            this._core = new GL.CubeGeometry( 1, 1, 1, 1, 1, 1 ); //w,h,d,sw,sh,sd
            break;
        case PrimitiveType.plane:
            this._core = new GL.PlaneGeometry( 1, 1, 1, 1 ); // w,h,sw,sh
            break;
        }
    }


    /**
     * core
     *
     * @type {GL.Geometry}
     * @memberof Geometry
     */
    _core : GL.Geometry;
}

