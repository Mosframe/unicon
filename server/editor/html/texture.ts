// -----------------------------------------------------------------------------
// texture.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';
import {htmlToCanvas} from './html-to-canvas';
/**
 * HTML Texture
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class HTMLTexture
 * @extends {THREE.CanvasTexture}
 */
export class HTMLTexture extends THREE.CanvasTexture {

 	update () {

 		console.log( 'yo!', this, this._dom );

 		this.image = htmlToCanvas( this._dom );
 		this.needsUpdate = true;
 	}

    constructor ( dom:HTMLElement ) {

        super( htmlToCanvas(dom) );

        this._dom = dom;
        this.anisotropy = 16;
    }

    private _dom : HTMLElement;
}
