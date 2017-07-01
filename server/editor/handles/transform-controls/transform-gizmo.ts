// -----------------------------------------------------------------------------
// transform-gizmo.ts
// -----------------------------------------------------------------------------
import  * as THREE              from 'three';
import { GizmoMaterial      }   from './gizmo-material';
import { GizmoLineMaterial  }   from './gizmo-line-material';

/**
 * TransformGizmo
 *
 * @author arodic ( https://github.com/arodic )
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class TransformGizmo
 * @extends {THREE.Object3D}
 */
export class TransformGizmo extends THREE.Object3D {

    // [ Public Variables ]

    handles         : THREE.Object3D;
    pickers         : THREE.Object3D;
    planes          : THREE.Object3D;
    activePlane     : THREE.Mesh;
    handleGizmos    : any;
    pickerGizmos    : any;

    // [ Public Functions ]

    init () {

        this.handles    = new THREE.Object3D();
        this.pickers    = new THREE.Object3D();
        this.planes     = new THREE.Object3D();

        this.add( this.handles );
        this.add( this.pickers );
        this.add( this.planes );

        // [ planes ]

        let planeGeometry = new THREE.PlaneBufferGeometry( 50, 50, 2, 2 );
        let planeMaterial = new THREE.MeshBasicMaterial( { visible:false, side:THREE.DoubleSide } );

        let planes = {
            "XY":   new THREE.Mesh( planeGeometry, planeMaterial ),
            "YZ":   new THREE.Mesh( planeGeometry, planeMaterial ),
            "XZ":   new THREE.Mesh( planeGeometry, planeMaterial ),
            "XYZE": new THREE.Mesh( planeGeometry, planeMaterial )
        };
        this.activePlane = planes[ "XYZE" ];

        planes[ "YZ" ].rotation.set( 0, Math.PI / 2, 0 );
        planes[ "XZ" ].rotation.set( - Math.PI / 2, 0, 0 );

        for ( let i in planes ) {
            planes[ i ].name = i;
            this.planes.add( planes[ i ] );
            this.planes[ i ] = planes[ i ];
        }

        // [ HANDLES AND PICKERS ]

        this.setupGizmos( this.handleGizmos, this.handles );
        this.setupGizmos( this.pickerGizmos, this.pickers );

        // [ reset Transformations ]

        this.traverse( ( child:THREE.Object3D ) => {

            if ( child instanceof THREE.Mesh ) {

                child.updateMatrix();

                let tempGeometry = child.geometry.clone();
                tempGeometry.applyMatrix( child.matrix );
                child.geometry = tempGeometry;

                child.position.set( 0, 0, 0 );
                child.rotation.set( 0, 0, 0 );
                child.scale.set( 1, 1, 1 );
            }
        });
    }

    setupGizmos ( gizmoMap:any, parent:THREE.Object3D ) {

        for ( let name in gizmoMap ) {

            for( let i = gizmoMap[ name ].length; i--; ) {

                let object = gizmoMap[ name ][ i ][ 0 ];
                let position = gizmoMap[ name ][ i ][ 1 ];
                let rotation = gizmoMap[ name ][ i ][ 2 ];

                object.name = name;

                if ( position ) object.position.set( position[ 0 ], position[ 1 ], position[ 2 ] );
                if ( rotation ) object.rotation.set( rotation[ 0 ], rotation[ 1 ], rotation[ 2 ] );

                parent.add( object );
            }
        }
    }

    highlight ( axis:string ) {

        this.traverse( ( child:THREE.Object3D ) => {
            if( child instanceof THREE.Mesh || child instanceof THREE.Line ) {
                if ( child.material ) {
                    if( child.material instanceof GizmoMaterial || child.material instanceof GizmoLineMaterial ) {
                        if( child.material.highlight ) {
                            if ( child.name === axis ) {
                                child.material.highlight( true );
                            } else {
                                child.material.highlight( false );
                            }
                        }
                    }
                }
            }
        });
    }

	update ( rotation:THREE.Euler, eye:THREE.Vector3 ) {

		let vec1 = new THREE.Vector3( 0, 0, 0 );
		let vec2 = new THREE.Vector3( 0, 1, 0 );
		let lookAtMatrix = new THREE.Matrix4();

		this.traverse( ( child:THREE.Object3D ) => {

			if( child.name.search( "E" ) !== - 1 ) {

                child.quaternion.setFromRotationMatrix( lookAtMatrix.lookAt( eye, vec1, vec2 ) );

			} else if ( child.name.search( "X" ) !== - 1 || child.name.search( "Y" ) !== - 1 || child.name.search( "Z" ) !== - 1 ) {

                child.quaternion.setFromEuler( rotation );

			}
		});
	};

    // [ Protected Veriables ]

}

