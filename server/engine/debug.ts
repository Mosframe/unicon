// -----------------------------------------------------------------------------
// debug.ts
// -----------------------------------------------------------------------------
import {} from './date';
/**
 * Class containing methods to ease debugging while developing a game.
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Debug
 */
export class Debug {

    // [ Public Static Variables ]

    /*
    static developerConsoleVisible	Reports whether the development console is visible. The development console cannot be made to appear using:
    static isDebugBuild	In the Build Settings dialog there is a check box called "Development Build".
    static unityLogger	Get default debug logger.
    */

    // [ Public Static Functions ]

    /*
    static Assert	Assert a condition and logs an error message to the Unity console on failure.
    static AssertFormat	Assert a condition and logs a formatted error message to the Unity console on failure.
    static Break	Pauses the editor.
    static ClearDeveloperConsole	Clears errors from the developer console.
    static DrawLine	Draws a line between specified start and end points.
    static DrawRay	Draws a line from start to start + dir in world coordinates.
    */
    /**
     * Logs message to the Unity Console.
     *
     * When you select the message in the console a connection to the context object will be drawn.
     * This can be useful for locating the object on which an error occurs.
     *
     * When the message is a string, rich text markup can be used to add emphasis.
     * See the manual page about rich text for details of the different markup tags available.
     *
     * @static
     * @param {*} message String or object to be converted to string representation for display.
     *
     * @memberof Debug
     */
    static log( message:any ) {
        console.log( '[' + (new Date()).toLogString() + ']' + message );
    }
    /*
    static LogAssertion	A variant of Debug.Log that logs an assertion message to the console.
    static LogAssertionFormat	Logs a formatted assertion message to the Unity console.
    */
    /**
     * A variant of Debug.Log that logs an error message to the console.
     *
     * When you select the message in the console a connection to the context object will be drawn.
     * This is very useful if you want know on which object an error occurs.
     *
     * When the message is a string, rich text markup can be used to add emphasis.
     * See the manual page about rich text for details of the different markup tags available.
     *
     * @static
     * @param {*} message String or object to be converted to string representation for display.
     *
     * @memberof Debug
     */
    static logError( message:any ){
        console.error( message );
    }
    /*
    static LogErrorFormat	Logs a formatted error message to the Unity console.
    static LogException	A variant of Debug.Log that logs an error message from an exception to the console.
    static LogFormat	Logs a formatted message to the Unity Console.
    */
    /**
     * A variant of Debug.Log that logs a warning message to the console.
     *
     * When you select the message in the console a connection to the context object will be drawn.
     * This is very useful if you want know on which object a warning occurs.
     *
     * When the message is a string, rich text markup can be used to add emphasis.
     * See the manual page about rich text for details of the different markup tags available.
     *
     * @static
     * @param {*} message String or object to be converted to string representation for display.
     *
     * @memberof Debug
     */
    static logWarning( message:any ) {
        console.warn( message );
    }
    /*
    static LogWarningFormat	Logs a formatted warning message to the Unity Console.
    */

}
