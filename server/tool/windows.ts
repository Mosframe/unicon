// -----------------------------------------------------------------------------
// scene-view.ts
// -----------------------------------------------------------------------------
import * as GL             from '../engine/graphic';
import {Camera          }  from '../engine/camera';
import {GameObject      }  from '../engine/game-object';
import {PrimitiveType   }  from '../engine/primitive-type';
import {Light           }  from '../engine/light';
import {MeshRenderer    }  from '../engine/mesh-renderer';
import {OrbitControls   }  from '../editor/orbit-controls';
import {Renderer        }  from '../engine/renderer';
import {Scene           }  from '../engine/scene';

import {EditorWindow    }  from '../editor/editor-window';
import {Selection       }  from '../editor/selection';
import {Tools           }  from '../editor/tools';
import {ViewTool        }  from '../editor/view-tool';

import {Window          }  from '../tool/window';
import {Inspector       }  from '../tool/inspector';

/**
 * Windows
 *
 * @author mosframe / https://github.com/mosframe
 *
 * @export
 * @class Windows
 */
export class Windows {

    // [ Public Variables ]
    windows : {[id:string]:Window} = {};

    // [ Constructor ]

    constructor() {
        this.windows.inspector = new Inspector();
    }

    /**
     * render
     *
     *
     * @memberof Unicon
     */
    render() {
        for( let w in this.windows ) {
            let window = this.windows[w];
            window.render();
        }
    }
    /**
     * update
     *
     *
     * @memberof Unicon
     */
    update() {

        let focusWindow:Window|null = null;

        for( let w in this.windows ) {
            let window = this.windows[w];
            window.update();

            // 마우스/키보드 체크
            focusWindow = window;
        }

        // focus
        if( focusWindow ) {
            if( focusWindow !== Window.focusedWindow ) {
                for( let w in this.windows ) {
                    let window = this.windows[w];
                    if( window == focusWindow ) {
                        window.onFocus();
                    } else {
                        window.onLostFocus();
                    }
                }
            }
        }
        // 포커스된 윈도우에 메시지 전달
        // mouse & key check
        // Selection 에서처리
        // if( focusWindow ) {
        //     focusWindow.onSelectionChange();
        // }

    }
}
