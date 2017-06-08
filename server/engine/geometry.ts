// -----------------------------------------------------------------------------
// geometry.ts
// -----------------------------------------------------------------------------
import * as GL            from '../engine/graphic';
import {PrimitiveType   } from '../engine/primitive-type';
import {Ubject          } from '../engine/object';

/**
 * Geometry
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Geometry
 * @extends {Ubject}
 */
export class Geometry {

    // [ Public Variables ]

    /**
     * get GL.Geometry
     *
     * @readonly
     * @type {GL.Geometry}
     * @memberof Geometry
     */
    get core() : GL.Geometry {return this._core; }

    // [ Constructors ]

    /**
     * Creates an instance of Geometry.
     * @param {PrimitiveType} type
     *
     * @memberof Geometry
     */
    constructor( type:PrimitiveType ) {
        switch( type ) {
        case PrimitiveType.quad:
            this._core = new GL.PlaneGeometry( 1, 1, 1, 1 );
            break;
        case PrimitiveType.plane:
            this._core = new GL.PlaneGeometry( 10, 10, 10, 10 );
            break;
        case PrimitiveType.cube:
            this._core = new GL.CubeGeometry( 1, 1, 1, 1, 1, 1 );
            break;
        case PrimitiveType.sphere:
            this._core = new GL.SphereGeometry( 1, 8, 6, 0, Math.PI*2, 0, Math.PI );
            break;
        case PrimitiveType.cylinder:
            this._core = new GL.CylinderGeometry( 1, 1, 1, 8, 8, false, 0, Math.PI );
            break;
        case PrimitiveType.capsule:
            // TODO : 캡슐 Geometry는 Three에서 지원하지 않아서 별도로 구현이 필요하다.
            break;
        }
    }

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    // [ Public Events ]

    // [ Protected Variables ]

    protected _core : GL.Geometry;

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
