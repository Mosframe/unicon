// -----------------------------------------------------------------------------
// scene-manager.ts
// -----------------------------------------------------------------------------
import * as GL    from '../../engine/graphic';
import {Scene   } from '../../engine/scene-management/scene';
import {Ubject  } from '../../engine/ubject';

/**
 * Scene management at run-time.
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class SceneManager
 */
export class SceneManager {

    // [ Public Variables ]

    // [ Constructors ]

    // [ Public Functions ]

    // [ Public Static Variables ]

    /*
    static sceneCount	The total number of currently loaded scenes.
    static sceneCountInBuildSettings	Number of scenes in Build Settings.
    */

    // [ Public Static Functions ]

    /*
    static CreateScene	Create an empty new scene at runtime with the given name.
    */
    /**
     * Gets the currently active scene.
     *
     * @static
     * @returns {Scene}
     *
     * @memberof SceneManager
     */
    static getActiveScene() : Scene {
        return SceneManager._activeScene;
    }
    /*
    static GetSceneAt	Get the scene at index in the SceneManager's list of added scenes.
    static GetSceneByBuildIndex	Get a scene struct from a build index.
    static GetSceneByName	Searches through the scenes added to the SceneManager for a scene with the given name.
    static GetSceneByPath	Searches all scenes added to the SceneManager for a scene that has the given asset path.
    */
    /**
     * Loads the scene by its name in Build Settings.
     *
     * @static
     * @param {string} sceneName
     *
     * @memberof SceneManager
     */
    static loadScene( sceneName:string ){
        let scene = new Scene();
        // TODO : 씬파일 로딩
        this._activeScene = scene;
    }
    // 임시
    static loadScene2( scene:Scene ){
        this._activeScene = scene;
    }
    /*
    static LoadSceneAsync	Loads the scene asynchronously in the background.
    static MergeScenes	This will merge the source scene into the destinationScene.
    static MoveGameObjectToScene	Move a GameObject from its current scene to a new Scene.
    static SetActiveScene	Set the scene to be active.
    static UnloadSceneAsync	Destroys all GameObjects associated with the given scene and removes the scene from the SceneManager.
    */

    // [ Public Events ]

    /*
    activeSceneChanged	Add a delegate to this to get notifications when the active scene has changed
    sceneLoaded	Add a delegate to this to get notifications when a scene has loaded
    sceneUnloaded	Add a delegate to this to get notifications when a scene has unloaded
    */

    // [ Public Operators ]

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    protected static _activeScene : Scene;

    // [ Protected Static Functions ]
}
