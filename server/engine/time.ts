// -----------------------------------------------------------------------------
// time.ts
// -----------------------------------------------------------------------------
import * as GL            from './graphic';
import {PrimitiveType   } from './primitive-type';
import {Ubject          } from './ubject';


/**
 * The interface to get time information from Unicon.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Time
 */
export class Time {

    // [ Public Static Variables ]

    /*
    static captureFramerate	Slows game playback time to allow screenshots to be saved between frames.
    */
    /**
     * The time in seconds it took to complete the last frame (Read Only).
     *
     * @readonly
     * @static
     *
     * @memberof Time
     */
    static get deltaTime() { return Time._deltaTime; }
    /*
    static fixedDeltaTime	The interval in seconds at which physics and other fixed frame rate updates (like MonoBehaviour's FixedUpdate) are performed.
    static fixedTime	The time the latest FixedUpdate has started (Read Only). This is the time in seconds since the start of the game.
    static fixedUnscaledDeltaTime	The timeScale-independent interval in seconds from the last fixed frame to the current one (Read Only).
    static fixedUnscaledTime	The timeScale-independent time the latest FixedUpdate has started (Read Only). This is the time in seconds since the start of the game.
    static frameCount	The total number of frames that have passed (Read Only).
    static inFixedTimeStep	Returns true if called inside a fixed time step callback (like MonoBehaviour's FixedUpdate), otherwise returns false.
    static maximumDeltaTime	The maximum time a frame can take. Physics and other fixed frame rate updates (like MonoBehaviour's FixedUpdate).
    static maximumParticleDeltaTime	The maximum time a frame can spend on particle updates. If the frame takes longer than this, then updates are split into multiple smaller updates.
    */
    /**
     * The real time in seconds since the game started (Read Only).
     *
     * @readonly
     * @static
     *
     * @memberof Time
     */
    static get realtimeSinceStartup() { return Date.now() - Time._appStartTime; }
    /*
    static smoothDeltaTime	A smoothed out Time.deltaTime (Read Only).
    */
    /**
     * The time at the beginning of this frame (Read Only).
     * This is the time in seconds since the start of the game.
     *
     * @readonly
     * @static
     *
     * @memberof Time
     */
    static get time() { return Time._tickStartTime; }
    /*
    static timeScale	The scale at which the time is passing. This can be used for slow motion effects.
    static timeSinceLevelLoad	The time this frame has started (Read Only). This is the time in seconds since the last level has been loaded.
    static unscaledDeltaTime	The timeScale-independent interval in seconds from the last frame to the current one (Read Only).
    static unscaledTime	The timeScale-independent time for this frame (Read Only). This is the time in seconds since the start of the game.
    */

    // [ Private Static Variables ]

    private static _appStartTime    : number; // application start time
    private static _tickStartTime   : number; // current tick start time
    private static _deltaTime       : number;

    // [ Private Static Functions ]

    static _start = () => {
        Time._appStartTime = Date.now();
        Time._tick();
    }
    static _tick = () => {
        Time._tickStartTime = Time.realtimeSinceStartup;
        Time._deltaTime = Time._tickStartTime - Time._deltaTime;
    }
}


Time._tick()
