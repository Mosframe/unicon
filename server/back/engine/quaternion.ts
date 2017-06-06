// -----------------------------------------------------------------------------
// quaternion.ts
// -----------------------------------------------------------------------------
import * as GL        from './graphic';

/**
 * Quaternion
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Quaternion
 * @extends {GL.Quaternion}
 */
export class Quaternion extends GL.Quaternion {

    // [ Public Static Functions ]

    /**
     * he identity rotation (Read Only).
     *
     * @readonly
     * @static
     * @type {Quaternion}
     * @memberof Quaternion
     */
    public static get identity() : Quaternion {
        return new Quaternion( 0.0, 0.0, 0.0, 1 );
    }

}

