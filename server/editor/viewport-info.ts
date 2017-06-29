// -----------------------------------------------------------------------------
// viewport-info.ts
// -----------------------------------------------------------------------------
import *            as THREE                from 'three';
import { toString   as numberToString	}   from '../engine/number';
import { Panel      as GUIPanel         }   from '../editor/gui/panel';
import { Text       as GUIText          }   from '../editor/gui/text';
import { Break      as GUIBreak         }   from '../editor/gui/break';
import { IEditor                        }   from './interface';

/**
 * ViewportInfo
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class ViewportInfo
 */
export class ViewportInfo extends GUIPanel {

    scene           : THREE.Scene;
    objectsText     : GUIText;
    verticesText    : GUIText;
    trianglesText   : GUIText;

    constructor( editor:IEditor ) {
        super();

        // [ scene ]
        this.scene = editor.scene;

        // [ container ]

        this.setId( 'info' );
        this.setPosition( 'absolute' );
        this.setLeft( '10px' );
        this.setBottom( '10px' );
        this.setFontSize( '12px' );
        this.setColor( '#fff' );

        this.objectsText = new GUIText( '0' ).setMarginLeft( '6px' );
        this.verticesText = new GUIText( '0' ).setMarginLeft( '6px' );
        this.trianglesText = new GUIText( '0' ).setMarginLeft( '6px' );

        this.add( new GUIText( 'objects' ), this.objectsText, new GUIBreak() );
        this.add( new GUIText( 'vertices' ), this.verticesText, new GUIBreak() );
        this.add( new GUIText( 'triangles' ), this.trianglesText, new GUIBreak() );

        // [ signals ]
        let signals = editor.signals;
        signals.objectAdded.add( this.update );
        signals.objectRemoved.add( this.update );
        signals.geometryChanged.add( this.update );
    }

    update = () => {

        let objects     = 0;
        let vertices    = 0;
        let triangles   = 0;

        for( let i=0, l=this.scene.children.length; i < l; i++ ) {

            let object = this.scene.children[ i ];

            object.traverseVisible( ( object ) => {

                objects++;

                if ( object instanceof THREE.Mesh ) {

                    let geometry = object.geometry;
                    if ( geometry instanceof THREE.Geometry ) {

                        vertices    += geometry.vertices.length;
                        triangles   += geometry.faces.length;
                    }
                    else
                    if ( geometry instanceof THREE.BufferGeometry ) {

                        if ( geometry.index !== null ) {
                            vertices    += geometry.index.count * 3;
                            triangles   += geometry.index.count;
                        } else {
                            vertices    += geometry.attributes.length;
                            triangles   += geometry.attributes.length / 3;
                        }
                    }
                }
            });
        }

        //this.objectsText    .setValue( objects.format() );
        //this.verticesText   .setValue( vertices.format() );
        //this.trianglesText  .setValue( triangles.format() );
        this.objectsText    .setValue( numberToString(objects) );
        this.verticesText   .setValue( numberToString(vertices) );
        this.trianglesText  .setValue( numberToString(triangles) );
    }
}
