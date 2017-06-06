// -----------------------------------------------------------------------------
// resource-request.ts
// -----------------------------------------------------------------------------
import {AsyncOperation  } from '../engine/async-operation';
import {IType           } from '../engine/interfaces/type';
import {Resources       } from '../engine/resources';
import {Ubject          } from '../engine/ubject';

/**
 * Asynchronous load request from the Resources bundle.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class ResourceRequest
 * @extends {AsyncOperation}
 */
export class ResourceRequest extends AsyncOperation {

    // [ Public Variables ]

    /**
     * Asset object being loaded (Read Only).
     *
     * @readonly
     * @type {Ubject}
     * @memberof ResourceRequest
     */
    //public get asset() : Ubject {
    //    return Resources.load(this._path, this._type);
    //}

    // [ Constructors ]

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    protected _path : string;
    protected _type : string;

    // [ Protected Static Functions ]
}
