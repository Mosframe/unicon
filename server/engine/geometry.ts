// -----------------------------------------------------------------------------
// geometry.ts
// -----------------------------------------------------------------------------
import * as GL            from './graphic';
import {PrimitiveType   } from './primitive-type';
import {Ubject          } from './ubject';


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

    /**
     * core
     *
     * @type {GL.Geometry}
     * @memberof Geometry
     */
    core : GL.Geometry;

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
            this.core = new GL.CubeGeometry( 1, 1, 1, 1, 1, 1 ); //w,h,d,sw,sh,sd
            break;
        case PrimitiveType.plane:
            this.core = new GL.PlaneGeometry( 1, 1, 1, 1 ); // w,h,sw,sh
            break;
        }
    }
}

