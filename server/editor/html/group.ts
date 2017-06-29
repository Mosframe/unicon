// -----------------------------------------------------------------------------
// group.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';
/**
 * HTML Group
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class HTMLGroup
 * @extends {THREE.Group}
 */
export class HTMLGroup extends THREE.Group {

    constructor ( dom:HTMLElement ) {
        super();

        this.type = 'HTMLGroup';

        /*
        dom.addEventListener( 'mousemove', function ( event ) {

            console.log( 'mousemove' );

        } );

        dom.addEventListener( 'click', function ( event ) {

            console.log( 'click' );

        } );
        */
    }
}
