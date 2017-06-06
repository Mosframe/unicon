// -----------------------------------------------------------------------------
// scene-asset.ts
// -----------------------------------------------------------------------------
import {Ubject      }  from '../engine/ubject';
import {Tool        }  from '../editor/tool';
import {ViewTool    }  from '../editor/view-tool';

/**
 * SceneAsset is used to reference scene objects in the Editor.
 *
 * This can be used as the type for ObjectField UI elements, to allow the user to pick a scene object as the value of the field.
 *
 * This example shows how to pick a scene in the editor. The ScenePicker component is placed on a game object in the scene:
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class SceneAsset
 * @extends {Ubject}
 */
export class SceneAsset extends Ubject {

    // [ Constructors ]

    constructor() {
        super();
    }
}
