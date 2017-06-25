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

    get target() : THREE.Object3D|null       { return this._target; }
    set target( value:THREE.Object3D|null )  { this._target = value; this._updateTransform(); }

    // [ Public Functions ]

    constructor( titleName:string='Inspector' ) {
        super( titleName );
    }

    // [ Protected Members ]

    protected _target       : THREE.Object3D|null = null;
    protected _transform    : any;
    protected _posHandle    : any;
    protected _rotHandle    : any;
    protected _scaleHandle  : any;

    protected _updateTransform () {

        if( this._target ) {
            // [ transform ]
            if( !this._transform ) {
                this._transform = this._root.addFolder('Transform');
                //this._transform.open();
            }

            // [ position ]
            if( this._posHandle ) {
                while( this._posHandle.__controllers.length > 0 ) {
                    this._posHandle.remove( this._posHandle.__controllers[0] );
                }
            } else {
                this._posHandle = this._transform.addFolder('Position');
                //this._posHandle.open();
            }
            this._posHandle.add(this._target.position, 'x').step(0.1).listen();
            this._posHandle.add(this._target.position, 'y').step(0.1).listen();
            this._posHandle.add(this._target.position, 'z').step(0.1).listen();

            // [ rotation ]
            if( this._rotHandle ) {
                while( this._rotHandle.__controllers.length > 0 ) {
                    this._rotHandle.remove( this._rotHandle.__controllers[0] );
                }
            } else {
                this._rotHandle = this._transform.addFolder('Rotation');
                //this._rotHandle.open();
            }
            this._rotHandle.add(this._target.rotation, 'x').step(Math.PI/180).listen();
            this._rotHandle.add(this._target.rotation, 'y').step(Math.PI/180).listen();
            this._rotHandle.add(this._target.rotation, 'z').step(Math.PI/180).listen();
            this._rotHandle.add(this._target.rotation, 'order').listen();

            // [ scale ]
            if( this._scaleHandle ) {
                while( this._scaleHandle.__controllers.length > 0 ) {
                    this._scaleHandle.remove( this._scaleHandle.__controllers[0] );
                }
            } else {
                this._scaleHandle = this._transform.addFolder('Scale');
                //this._scaleHandle.open();
            }
            this._scaleHandle.add(this._target.scale, 'x').step(0.1).listen();
            this._scaleHandle.add(this._target.scale, 'y').step(0.1).listen();
            this._scaleHandle.add(this._target.scale, 'z').step(0.1).listen();
        } else {
            if( this._transform ) {
                console.log(this._transform.__folders);
                this._transform.removeFolder( "Position" );
            }
        }
    }

}
