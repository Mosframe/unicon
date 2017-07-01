// -----------------------------------------------------------------------------
// uobject.ts
// -----------------------------------------------------------------------------
import {v1} from 'uuid';

/**
 * UObject
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class UObject
 */
export class UObject {

    // [ Public Properties ]

    uuid : string;

    // [ Public Functions ]

    constructor() {
        this.uuid = v1(); // https://github.com/kelektiv/node-uuid
    }

    // [ Protected Members ]
}
