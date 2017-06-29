// -----------------------------------------------------------------------------
// transform-gizmo-rotate.ts
// -----------------------------------------------------------------------------
import 	* as THREE            from 'three';
import { GizmoLineMaterial 	} from './gizmo-line-material';
import { GizmoMaterial     	} from './gizmo-material';
import { pickerMaterial    	} from './gizmo-material';
import { TransformGizmo    	} from './transform-gizmo';

/**
 * TransformGizmoRotate
 *
 * @author arodic ( https://github.com/arodic )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class TransformGizmoRotate
 * @extends {TransformGizmo}
 */
export class TransformGizmoRotate extends TransformGizmo {

    // [ Public Functions ]

	/**
	 * create circle geometry
	 *
	 * @param {number} radius
	 * @param {string} facing
	 * @param {number} arc
	 * @returns {THREE.BufferGeometry}
	 *
	 * @memberof TransformGizmoRotate
	 */
	circleGeometry ( radius:number, facing:string, arc:number ) : THREE.BufferGeometry {

		let geometry = new THREE.BufferGeometry();
		let vertices : number[] = [];
		arc = arc ? arc : 1;

		for ( let i = 0; i <= 64 * arc; ++ i ) {
			if ( facing === 'x' ) vertices.push( 0, Math.cos( i / 32 * Math.PI ) * radius, Math.sin( i / 32 * Math.PI ) * radius );
			if ( facing === 'y' ) vertices.push( Math.cos( i / 32 * Math.PI ) * radius, 0, Math.sin( i / 32 * Math.PI ) * radius );
			if ( facing === 'z' ) vertices.push( Math.sin( i / 32 * Math.PI ) * radius, Math.cos( i / 32 * Math.PI ) * radius, 0 );
		}

		geometry.addAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );
		return geometry;
	}
	/**
	 * set active plane
	 *
	 * @param {string} axis
	 *
	 * @memberof TransformGizmoRotate
	 */
	setActivePlane ( axis:string ) {

		if ( axis === "E" ) this.activePlane = this.planes[ "XYZE" ];

		if ( axis === "X" ) this.activePlane = this.planes[ "YZ" ];

		if ( axis === "Y" ) this.activePlane = this.planes[ "XZ" ];

		if ( axis === "Z" ) this.activePlane = this.planes[ "XY" ];
	}
	/**
	 * update
	 *
	 * @param {THREE.Euler} rotation
	 * @param {THREE.Vector3} eye
	 *
	 * @memberof TransformGizmoRotate
	 */
	update ( rotation:THREE.Euler, eye:THREE.Vector3 ) {
		super.update( rotation, eye );

		let group = {
			handles: this[ "handles" ],
			pickers: this[ "pickers" ]
		};

		let tempMatrix 		= new THREE.Matrix4();
		let worldRotation 	= new THREE.Euler( 0, 0, 1 );
		let tempQuaternion 	= new THREE.Quaternion();
		let unitX 			= new THREE.Vector3( 1, 0, 0 );
		let unitY 			= new THREE.Vector3( 0, 1, 0 );
		let unitZ 			= new THREE.Vector3( 0, 0, 1 );
		let quaternionX 	= new THREE.Quaternion();
		let quaternionY 	= new THREE.Quaternion();
		let quaternionZ 	= new THREE.Quaternion();
		let eye2 			= eye.clone();

		worldRotation.copy( this.planes[ "XY" ].rotation );
		tempQuaternion.setFromEuler( worldRotation );

		tempMatrix.makeRotationFromQuaternion( tempQuaternion ).getInverse( tempMatrix );
		eye2.applyMatrix4( tempMatrix );

		this.traverse( ( child:THREE.Object3D ) => {

			tempQuaternion.setFromEuler( worldRotation );

			if ( child.name === "X" ) {

				quaternionX.setFromAxisAngle( unitX, Math.atan2( - eye2.y, eye2.z ) );
				tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
				child.quaternion.copy( tempQuaternion );

			}

			if ( child.name === "Y" ) {

				quaternionY.setFromAxisAngle( unitY, Math.atan2( eye2.x, eye2.z ) );
				tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
				child.quaternion.copy( tempQuaternion );

			}

			if ( child.name === "Z" ) {

				quaternionZ.setFromAxisAngle( unitZ, Math.atan2( eye2.y, eye2.x ) );
				tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );
				child.quaternion.copy( tempQuaternion );

			}

		});
	}

    // [ Constructors ]

    /**
     * Creates an instance of TransformGizmoRotate.
     *
     * @memberof TransformGizmoRotate
     */
    constructor() {
        super();

		this.handleGizmos = {

			X: [
				[ new THREE.Line( this.circleGeometry( 1, 'x', 0.5 ), new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
			],

			Y: [
				[ new THREE.Line( this.circleGeometry( 1, 'y', 0.5 ), new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
			],

			Z: [
				[ new THREE.Line( this.circleGeometry( 1, 'z', 0.5 ), new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
			],

			E: [
				[ new THREE.Line( this.circleGeometry( 1.25, 'z', 1 ), new GizmoLineMaterial( { color: 0xcccc00 } ) ) ]
			],

			XYZE: [
				[ new THREE.Line( this.circleGeometry( 1, 'z', 1 ), new GizmoLineMaterial( { color: 0x787878 } ) ) ]
			]

		};

		this.pickerGizmos = {

			X: [
				[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), pickerMaterial ), [ 0, 0, 0 ], [ 0, - Math.PI / 2, - Math.PI / 2 ] ]
			],

			Y: [
				[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), pickerMaterial ), [ 0, 0, 0 ], [ Math.PI / 2, 0, 0 ] ]
			],

			Z: [
				[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1, 0.12, 4, 12, Math.PI ), pickerMaterial ), [ 0, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ]
			],

			E: [
				[ new THREE.Mesh( new THREE.TorusBufferGeometry( 1.25, 0.12, 2, 24 ), pickerMaterial ) ]
			],

			XYZE: [
				[ new THREE.Mesh() ]// TODO
			]

		};

		this.init();
    }

}

