// -----------------------------------------------------------------------------
// scene.ts
// -----------------------------------------------------------------------------
import * as GL        from '../engine/graphic';
import {Camera      } from '../engine/camera';
import {Component   } from '../engine/component';
import {GameObject  } from '../engine/game-object';

/**
 * Scene
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Scene
 * @extends {GL.Scene}
 */
export class Scene {

    // [ Public Variables ]

    /**
     * Returns the index of the scene in the Build Settings. Always returns -1 if the scene was loaded through an AssetBundle.
     *
     * @type {number}
     * @memberof Scene
     */
    //buildIndex  : number;
    /**
     * Returns true if the scene is modifed.
     *
     * @type {boolean}
     * @memberof Scene
     */
    //isDirty     : boolean;
    /**
     * Returns true if the scene is loaded.
     *
     * @type {boolean}
     * @memberof Scene
     */
    //isLoaded    : boolean;
    /**
     * Returns the name of the scene.
     *
     * @type {string}
     * @memberof Scene
     */
    //name        : string;
    /**
     * Returns the relative path of the scene. Like: "assets/scenes/start.json".
     *
     * @type {string}
     * @memberof Scene
     */
    //path        : string;
    /**
     * The number of root transforms of this scene.
     *
     *
     * @memberof Scene
     */
    //rootCount : number;

    // [ Constructors ]

    /**
     * Creates an instance of Scene.
     *
     * @memberof Scene
     */
    constructor() {
        //this.core = new GL.Scene();
    }


    // [ Public Functions ]

    addGameObject( gameObject:GameObject ) {
        if( gameObject ) {
            this._gameObjects.push(gameObject);
        }
    }

    addCamera( camera:Camera ) {
        if( camera.gameObject ) {
            this._gameObjects.push(camera.gameObject);
            this._core.add(camera.core)
        }
    }

    /**
     * Returns all the root game objects in the scene.
     *
     * @returns {GameObject[]}
     *
     * @memberof Scene
     */
    getRootGameObjects() : GameObject[] {
        return this._gameObjects;
    }

    /*
    IsValid	Whether this is a valid scene. A scene may be invalid if, for example, you tried to open a scene that does not exist. In this case, the scene returned from EditorSceneManager.OpenScene would return False for IsValid.
    */

    // [ Protected Variables ]

    protected _gameObjects : GameObject[] = [];

    protected _core : GL.Scene = new GL.Scene();
}

