// -----------------------------------------------------------------------------
// async-operation.ts
// -----------------------------------------------------------------------------
import {YieldInstruction} from '../engine/yield-instruction';

/**
 * Asynchronous operation coroutine.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class AsyncOperation
 * @extends {YieldInstruction}
 */
export class AsyncOperation extends YieldInstruction {

    // [ Public Variables ]

    /**
     * Has the operation finished? (Read Only)
     *
     * @readonly
     * @type {boolean}
     * @memberof AsyncOperation
     */
    public get isDone() : boolean { return this._done; }
    /**
     * What's the operation's progress. (Read Only)
     *
     * @readonly
     * @type {number}
     * @memberof AsyncOperation
     */
    public get progress() : number { return this._progress; }
    /**
     * Priority lets you tweak in which order async operation calls will be performed.
     *
     * @type {number}
     * @memberof AsyncOperation
     */
    public priority : number;
    /**
     * Allow scenes to be activated as soon as it is ready.
     *
     * @type {boolean}
     * @memberof AsyncOperation
     */
    public allowSceneActivation : boolean;

    // [ Constructors ]

    // [ Public Functions ]

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    //protected _ptr : any;
    protected   _done : boolean;
    public      _progress : number;

    // [ Protected Static Functions ]
}
