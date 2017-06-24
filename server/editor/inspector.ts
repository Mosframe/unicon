// -----------------------------------------------------------------------------
// inspector.ts
// -----------------------------------------------------------------------------
import * as THREE          from 'three';
import {EditorWindow    }  from './editor-window';

/**
 * Inspector
 *
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Inspector
 * @extends {EditorWindow}
 */
export class Inspector extends EditorWindow {

    // [ Public Properties ]

    get target() : THREE.Object3D       { return this._target; }
    set target( value:THREE.Object3D )  {
        this._target = value;
        if( this._posHandle ) {
            for( let c=0; c<this._posHandle.__controllers.length; ++c ) {
                let controller = this._posHandle.__controllers[c];
                controller.object = this._target.position;
            }
        } else {
            this._posHandle = this._root.addFolder('Position');
            this._posHandle.add(this._target.position, 'x');
            this._posHandle.add(this._target.position, 'y');
            this._posHandle.add(this._target.position, 'z');
            this._posHandle.open();
        }
    }

    // [ Public Functions ]

    constructor( titleName:string='Inspector' ) {
        super( titleName );

    }

    // [ Protected Members ]

    protected _target       : THREE.Object3D;
    protected _posHandle    : any;

}
