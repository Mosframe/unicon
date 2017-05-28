/**
 * scene.ts
 *
 * @author jonghwa lee
 */

import {GameObject}    from './game-object';

/**
 * Scene
 *
 * @export
 * @class Behaviour
 * @extends {Component}
 */
export class Scene {
    /**
     * Returns the index of the scene in the Build Settings. Always returns -1 if the scene was loaded through an AssetBundle.
     *
     * @type {number}
     * @memberof Scene
     */
    buildIndex  : number;
    /**
     * Returns true if the scene is modifed.
     *
     * @type {boolean}
     * @memberof Scene
     */
    isDirty     : boolean;
    /**
     * Returns true if the scene is loaded.
     *
     * @type {boolean}
     * @memberof Scene
     */
    isLoaded    : boolean;
    /**
     * Returns the name of the scene.
     *
     * @type {string}
     * @memberof Scene
     */
    name        : string;
    /**
     * Returns the relative path of the scene. Like: "assets/scenes/start.json".
     *
     * @type {string}
     * @memberof Scene
     */
    path        : string;
    /**
     * The number of root transforms of this scene.
     *
     *
     * @memberof Scene
     */
    rootCount : number;

    /**
     * all the root game objects in the scene.
     *
     * @type {{[id:string]:GameObject}}
     * @memberof Scene
     */
    roots     : {[id:string]:GameObject}

    /**
     * Whether this is a valid scene. A scene may be invalid if, for example, you tried to open a scene that does not exist. In this case, the scene returned from EditorSceneManager.OpenScene would return False for IsValid.
     *
     * @returns {boolean}
     *
     * @memberof Scene
     */
    isValid() : boolean {
        return true;
    }

    // [ private ] --------------------------------------------------------------------------------------------------

}

