// -----------------------------------------------------------------------------
// transform-gizmo-scale.ts
// -----------------------------------------------------------------------------
import * as THREE             from 'three';
import {                    } from '../../engine/object';
import {GizmoLineMaterial   } from './gizmo-line-material';
import {GizmoMaterial       } from './gizmo-material';
import {pickerMaterial      } from './gizmo-material';
import {TransformGizmo      } from './transform-gizmo';

/**
 * TransformGizmoScale
 *
 * @author arodic ( https://github.com/arodic )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class TransformGizmoScale
 * @extends {TransformGizmo}
 */
export class TransformGizmoScale extends TransformGizmo {

    // [ Public Functions ]

	/**
	 * set active plane
	 *
	 * @param {string} axis
	 * @param {THREE.Vector3} eye
	 *
	 * @memberof TransformGizmoScale
	 */
	setActivePlane ( axis:string, eye:THREE.Vector3 ) {

		let tempMatrix = new THREE.Matrix4();
		eye.applyMatrix4( tempMatrix.getInverse( tempMatrix.extractRotation( this.planes[ "XY" ].matrixWorld ) ) );

		if ( axis === "X" ) {

			this.activePlane = this.planes[ "XY" ];
			if ( Math.abs( eye.y ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "XZ" ];

		}

		if ( axis === "Y" ) {

			this.activePlane = this.planes[ "XY" ];
			if ( Math.abs( eye.x ) > Math.abs( eye.z ) ) this.activePlane = this.planes[ "YZ" ];

		}

		if ( axis === "Z" ) {

			this.activePlane = this.planes[ "XZ" ];
			if ( Math.abs( eye.x ) > Math.abs( eye.y ) ) this.activePlane = this.planes[ "YZ" ];

		}

		if ( axis === "XYZ" ) this.activePlane = this.planes[ "XYZE" ];
	}


    // [ Constructors ]

    /**
     * Creates an instance of TransformGizmoScale.
     *
     * @memberof TransformGizmoScale
     */
    constructor() {
        super();

		let arrowGeometry = new THREE.Geometry();
		let mesh = new THREE.Mesh( new THREE.BoxGeometry( 0.125, 0.125, 0.125 ) );
		mesh.position.y = 0.5;
		mesh.updateMatrix();

		arrowGeometry.merge( <THREE.Geometry>mesh.geometry, mesh.matrix );

		let lineXGeometry = new THREE.BufferGeometry();
		lineXGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  1, 0, 0 ], 3 ) );

		let lineYGeometry = new THREE.BufferGeometry();
		lineYGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 1, 0 ], 3 ) );

		let lineZGeometry = new THREE.BufferGeometry();
		lineZGeometry.addAttribute( 'position', new THREE.Float32BufferAttribute( [ 0, 0, 0,  0, 0, 1 ], 3 ) );

		this.handleGizmos = {

			X: [
				[ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0xff0000 } ) ), [ 0.5, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ],
				[ new THREE.Line( lineXGeometry, new GizmoLineMaterial( { color: 0xff0000 } ) ) ]
			],

			Y: [
				[ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x00ff00 } ) ), [ 0, 0.5, 0 ] ],
				[ new THREE.Line( lineYGeometry, new GizmoLineMaterial( { color: 0x00ff00 } ) ) ]
			],

			Z: [
				[ new THREE.Mesh( arrowGeometry, new GizmoMaterial( { color: 0x0000ff } ) ), [ 0, 0, 0.5 ], [ Math.PI / 2, 0, 0 ] ],
				[ new THREE.Line( lineZGeometry, new GizmoLineMaterial( { color: 0x0000ff } ) ) ]
			],

			XYZ: [
				[ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.125, 0.125, 0.125 ), new GizmoMaterial( { color: 0xffffff, opacity: 0.25 } ) ) ]
			]

		};

		this.pickerGizmos = {

			X: [
				[ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0.6, 0, 0 ], [ 0, 0, - Math.PI / 2 ] ]
			],

			Y: [
				[ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0.6, 0 ] ]
			],

			Z: [
				[ new THREE.Mesh( new THREE.CylinderBufferGeometry( 0.2, 0, 1, 4, 1, false ), pickerMaterial ), [ 0, 0, 0.6 ], [ Math.PI / 2, 0, 0 ] ]
			],

			XYZ: [
				[ new THREE.Mesh( new THREE.BoxBufferGeometry( 0.4, 0.4, 0.4 ), pickerMaterial ) ]
			]

		};

		this.init();
    }

}

