// -----------------------------------------------------------------------------
// window.ts
// -----------------------------------------------------------------------------
import * as GL             from '../engine/graphic';
import {PrimitiveType   }  from '../engine/primitive-type';
import {GameObject      }  from '../engine/game-object';
import {Light           }  from '../engine/light';
import {Camera          }  from '../engine/camera';
import {Renderer        }  from '../engine/renderer';
import {MeshRenderer    }  from '../engine/mesh-renderer';
import {Scene           }  from '../engine/scene';
import {Tools           }  from '../editor/tools';
import {ViewTool        }  from '../editor/view-tool';
import {OrbitControls   }  from '../editor/orbit-controls';
import {EditorWindow    }  from '../editor/editor-window';

/**
 * Windows
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Windows
 * @extends {EditorWindow}
 */
export class Window extends EditorWindow {

    // [ Public Variables ]

    // [ Constructor ]

    constructor() {
        super();
    }

    // [ Public Functions ]

    /**
     * render
     *
     *
     * @memberof Unicon
     */
    render() {
    }
    /**
     * update
     *
     *
     * @memberof Unicon
     */
    update() {
        super.update();

        // update inspector : 10 fps
        let now = Date.now();
        let deltaTime = now-this._lastUpdate;

        if( deltaTime >= 10 ) {
            this._deltaTime = deltaTime;
            this._lastUpdate = Date.now();
            this.onInspectorUpdate();
        }
    }

    // [ Private Variables ]

    private _lastUpdate : number;
    private _deltaTime : number;

    // [ Private Functions ]
}
