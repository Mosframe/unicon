// -----------------------------------------------------------------------------
// scene-manager.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Scene       } from '../engine/scene';
import {GameObject  } from '../engine/game-object';

/**
 * Scene management at run-time.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class SceneManager
 * @extends {GL.Scene}
 */
export class SceneManager {

    // [ Static Variables ]

    /**
     * current scene
     *
     * @static
     * @type {Scene}
     * @memberof SceneManager
     */
    static current : Scene;

    /*
    sceneCount	The total number of currently loaded scenes.
    sceneCountInBuildSettings	Number of scenes in Build Settings.
    */

    // [ Static Functions ]

    // [ Constructors ]

    /*
    CreateScene	Create an empty new scene at runtime with the given name.
    GetActiveScene	Gets the currently active scene.
    GetSceneAt	Get the scene at index in the SceneManager's list of added scenes.
    GetSceneByBuildIndex	Get a scene struct from a build index.
    GetSceneByName	Searches through the scenes added to the SceneManager for a scene with the given name.
    GetSceneByPath	Searches all scenes added to the SceneManager for a scene that has the given asset path.
    LoadScene	Loads the scene by its name or index in Build Settings.
    LoadSceneAsync	Loads the scene asynchronously in the background.
    MergeScenes	This will merge the source scene into the destinationScene.
    MoveGameObjectToScene	Move a GameObject from its current scene to a new Scene.
    SetActiveScene	Set the scene to be active.
    UnloadSceneAsync	Destroys all GameObjects associated with the given scene and removes the scene from the SceneManager.
    */

    /**
     * Creates an instance of Scene.
     *
     * @memberof Scene
     */
    constructor() {
        //this.core = new GL.Scene();
    }


    // [ Events ]

    /*
    activeSceneChanged	Add a delegate to this to get notifications when the active scene has changed
    sceneLoaded	Add a delegate to this to get notifications when a scene has loaded
    sceneUnloaded	Add a delegate to this to get notifications when a scene has unloaded
    */

}

