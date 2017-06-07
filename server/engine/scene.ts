// -----------------------------------------------------------------------------
// scene.ts
// -----------------------------------------------------------------------------
import * as GL  from '../engine/graphic';
import {Ubject} from '../engine/object';

/**
 * Run-time data structure for *.unity file.
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Scene
 */
export class Scene {

    // [ Public Variables ]

    /*
    buildIndex	Returns the index of the scene in the Build Settings. Always returns -1 if the scene was loaded through an AssetBundle.
    isDirty	Returns true if the scene is modifed.
    isLoaded	Returns true if the scene is loaded.
    name	Returns the name of the scene.
    path	Returns the relative path of the scene. Like: "Assets/MyScenes/MyScene.unity".
    rootCount	The number of root transforms of this scene.
    */

    // [ Constructors ]

    // [ Public Functions ]

    /*
    GetRootGameObjects	Returns all the root game objects in the scene.
    IsValid	Whether this is a valid scene. A scene may be invalid if, for example, you tried to open a scene that does not exist. In this case, the scene returned from EditorSceneManager.OpenScene would return False for IsValid.
    */

    // [ Public Static Variables ]

    // [ Public Static Functions ]

    // [ Public Operators ]

    /*
    operator !=	Returns true if the Scenes are different.
    operator ==	Returns true if the Scenes are equal.
    */

    // [ Protected Variables ]

    // [ Protected Functions ]

    // [ Protected Static Variables ]

    // [ Protected Static Functions ]
}
