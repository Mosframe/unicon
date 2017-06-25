// -----------------------------------------------------------------------------
// viewport-info.ts
// -----------------------------------------------------------------------------
import *        as THREE      from 'three';
import {                    } from '../engine/number';
import {Panel   as GUIPanel } from '../editor/gui/panel';
import {Text    as GUIText  } from '../editor/gui/text';
import {Break   as GUIBreak } from '../editor/gui/break';

/**
 * ViewportInfo
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class ViewportInfo
 */
export class ViewportInfo {

    container       : GUIPanel;
    scene           : THREE.Scene;
    objectsText     : GUIText;
    verticesText    : GUIText;
    trianglesText   : GUIText;


    constructor( editor:any ) {

        // [ scene ]
        this.scene = editor.scene;

        // [ container ]

        let container = new GUIPanel();
        container.setId( 'info' );
        container.setPosition( 'absolute' );
        container.setLeft( '10px' );
        container.setBottom( '10px' );
        container.setFontSize( '12px' );
        container.setColor( '#fff' );

        this.objectsText = new GUIText( '0' ).setMarginLeft( '6px' );
        this.verticesText = new GUIText( '0' ).setMarginLeft( '6px' );
        this.trianglesText = new GUIText( '0' ).setMarginLeft( '6px' );

        container.add( new GUIText( 'objects' ), this.objectsText, new GUIBreak() );
        container.add( new GUIText( 'vertices' ), this.verticesText, new GUIBreak() );
        container.add( new GUIText( 'triangles' ), this.trianglesText, new GUIBreak() );

        this.container = container;

        // [ signals ]
        let signals = editor.signals;
        signals.objectAdded.add( this.update );
        signals.objectRemoved.add( this.update );
        signals.geometryChanged.add( this.update );
    }

    update() {

        let objects = 0, vertices = 0, triangles = 0;

        for ( let i = 0, l = this.scene.children.length; i < l; i ++ ) {

            let object = this.scene.children[ i ];

            object.traverseVisible( function ( object ) {

                objects++;

                if ( object instanceof THREE.Mesh ) {

                    let geometry = object.geometry;

                    if ( geometry instanceof THREE.Geometry ) {

                        vertices += geometry.vertices.length;
                        triangles += geometry.faces.length;

                    } else if ( geometry instanceof THREE.BufferGeometry ) {

                        if ( geometry.index !== null ) {
                            vertices += geometry.index.count * 3;
                            triangles += geometry.index.count;
                        } else {
                            vertices += geometry.attributes.length;
                            triangles += geometry.attributes.length / 3;
                        }
                    }
                }

            } );

        }

        this.objectsText.value      = objects.format();
        this.verticesText.value     = vertices.format();
        this.trianglesText.value    = triangles.format();
    }
}
