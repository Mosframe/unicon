// -----------------------------------------------------------------------------
// transform-controls.ts
// -----------------------------------------------------------------------------
import 	* as THREE             	  	  	from 'three';
import { hasFunction    			}   from '../../../engine/object';
import { GizmoLineMaterial   		} 	from './gizmo-line-material';
import { GizmoMaterial       		} 	from './gizmo-material';
import { pickerMaterial      		} 	from './gizmo-material';
import { TransformGizmo      		} 	from './transform-gizmo';
import { TransformGizmoTranslate	} 	from './transform-gizmo-translate';
import { TransformGizmoRotate		} 	from './transform-gizmo-rotate';
import { TransformGizmoScale		} 	from './transform-gizmo-scale';

/**
 * TransformControls
 *
 * @author arodic ( https://github.com/arodic )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class TransformControls
 * @extends {THREE.Object3D}
 */
export class TransformControls extends THREE.Object3D {

    // [ Public Variables ]

	object : THREE.Object3D;


    // [ Public Functions ]

	/**
	 * dispose
	 *
	 *
	 * @memberof TransformControls
	 */
	dispose () {

		this._domElement.removeEventListener( "mousedown"	, this._onPointerDown 	);
		this._domElement.removeEventListener( "touchstart"	, this._onPointerDown 	);
		this._domElement.removeEventListener( "mousemove"	, this._onPointerHover 	);
		this._domElement.removeEventListener( "touchmove"	, this._onPointerHover 	);
		this._domElement.removeEventListener( "mousemove"	, this._onPointerMove 	);
		this._domElement.removeEventListener( "touchmove"	, this._onPointerMove 	);
		this._domElement.removeEventListener( "mouseup"		, this._onPointerUp 	);
		this._domElement.removeEventListener( "mouseout"	, this._onPointerUp 	);
		this._domElement.removeEventListener( "touchend"	, this._onPointerUp 	);
		this._domElement.removeEventListener( "touchcancel"	, this._onPointerUp 	);
		this._domElement.removeEventListener( "touchleave"	, this._onPointerUp 	);
	}
	/**
	 * attach
	 *
	 * @param {THREE.Object3D} object
	 *
	 * @memberof TransformControls
	 */
	attach ( object:THREE.Object3D ) {
		this.object = object;
		this.visible = true;
		this.update();
	}
	/**
	 * detach
	 *
	 *
	 * @memberof TransformControls
	 */
	detach () {
		delete this.object;
		this.visible 	= false;
		this._axis 		= null;
	}
	/**
	 * get mode
	 *
	 * @returns {string}
	 *
	 * @memberof TransformControls
	 */
	getMode () : string {
		return this._mode;
	}
	/**
	 * set mode
	 *
	 * @param {string} mode
	 *
	 * @memberof TransformControls
	 */
	setMode ( mode:string ) {

		this._mode = mode ? mode : this._mode;
		if ( this._mode === "scale" ) this._space = "local";
		for ( let type in this._gizmo ) this._gizmo[ type ].visible = ( type === this._mode );

		this.update();
		this.dispatchEvent( this._changeEvent );
	}
	/**
	 * set translation snap
	 *
	 * @param {any} translationSnap
	 *
	 * @memberof TransformControls
	 */
	setTranslationSnap ( translationSnap ) {

		this._translationSnap = translationSnap;

	}
	/**
	 * set rotation snap
	 *
	 * @param {any} rotationSnap
	 *
	 * @memberof TransformControls
	 */
	setRotationSnap ( rotationSnap ) {

		this._rotationSnap = rotationSnap;

	}
	/**
	 * set size
	 *
	 * @param {any} size
	 *
	 * @memberof TransformControls
	 */
	setSize ( size ) {

		this._size = size;
		this.update();
		this.dispatchEvent( this._changeEvent );

	}
	/**
	 * set space
	 *
	 * @param {any} space
	 *
	 * @memberof TransformControls
	 */
	setSpace ( space ) {

		this._space = space;
		this.update();
		this.dispatchEvent( this._changeEvent );

	}
	/**
	 * update
	 *
	 * @returns
	 *
	 * @memberof TransformControls
	 */
	update () {

		if ( this.object === undefined ) return;

		this.object.updateMatrixWorld(true);
		this._worldPosition.setFromMatrixPosition( this.object.matrixWorld );
		this._worldRotation.setFromRotationMatrix( this._tempMatrix.extractRotation( this.object.matrixWorld ) );

		this._camera.updateMatrixWorld(true);
		this._camPosition.setFromMatrixPosition( this._camera.matrixWorld );
		this._camRotation.setFromRotationMatrix( this._tempMatrix.extractRotation( this._camera.matrixWorld ) );

		let scale = 1;
		scale = this._worldPosition.distanceTo( this._camPosition ) / 6 * this._size;
		this.position.copy( this._worldPosition );
		this.scale.set( scale, scale, scale );

		if ( this._camera instanceof THREE.PerspectiveCamera ) {

			this._eye.copy( this._camPosition ).sub( this._worldPosition ).normalize();

		} else if ( this._camera instanceof THREE.OrthographicCamera ) {

			this._eye.copy( this._camPosition ).normalize();

		}

		if ( this._space === "local" ) {

			this._gizmo[ this._mode ].update( this._worldRotation, this._eye );

		} else if ( this._space === "world" ) {

			this._gizmo[ this._mode ].update( new THREE.Euler(), this._eye );

		}

		this._gizmo[ this._mode ].highlight( this._axis );
	}

    // [ Constructors ]

	/**
	 * Creates an instance of TransformControls.
	 * @param {THREE.Camera} camera
	 * @param {Document} domElement
	 *
	 * @memberof TransformControls
	 */
    constructor( camera:THREE.Camera, domElement:HTMLElement ) {
        super();

		this._camera = camera;
		this._domElement = domElement;

		this.visible = false;

		for ( let type in this._gizmo ) {
			let gizmoObj = this._gizmo[ type ];
			gizmoObj.visible = ( type === this._mode );
			this.add( gizmoObj );
		}

		this._domElement.addEventListener( "mousedown"	, this._onPointerDown	, false );
		this._domElement.addEventListener( "touchstart"	, this._onPointerDown	, false );
		this._domElement.addEventListener( "mousemove"	, this._onPointerHover	, false );
		this._domElement.addEventListener( "touchmove"	, this._onPointerHover	, false );
		this._domElement.addEventListener( "mousemove"	, this._onPointerMove	, false );
		this._domElement.addEventListener( "touchmove"	, this._onPointerMove	, false );
		this._domElement.addEventListener( "mouseup"	, this._onPointerUp		, false );
		this._domElement.addEventListener( "mouseout"	, this._onPointerUp		, false );
		this._domElement.addEventListener( "touchend"	, this._onPointerUp		, false );
		this._domElement.addEventListener( "touchcancel", this._onPointerUp		, false );
		this._domElement.addEventListener( "touchleave"	, this._onPointerUp		, false );
    }

	// [ Protected Variables ]

	protected _camera				: THREE.Camera;
	protected _domElement 			: HTMLElement;
	protected _translationSnap		: number | null = null;
	protected _rotationSnap 		: number | null = null;
	protected _space 				= "world";
	protected _size 				= 1;
	protected _axis					: string | null = null;

	protected _mode 				= "translate";
	protected _dragging 			= false;
	protected _plane 				= "XY";
	protected _gizmo 				= {
		"translate"	: new TransformGizmoTranslate(),
		"rotate"	: new TransformGizmoRotate(),
		"scale"		: new TransformGizmoScale()
	};

	protected _changeEvent 			= { type: "change" };
	protected _mouseDownEvent 		= { type: "mouseDown" };
	protected _mouseUpEvent 		= { type: "mouseUp", mode: this._mode };
	protected _objectChangeEvent 	= { type: "objectChange" };

	protected _ray 					= new THREE.Raycaster();
	protected _pointerVector 		= new THREE.Vector2();
	protected _point 				= new THREE.Vector3();
	protected _offset 				= new THREE.Vector3();
	protected _offsetRotation 		= new THREE.Vector3();
	protected _lookAtMatrix 		= new THREE.Matrix4();
	protected _eye 					= new THREE.Vector3();
	protected _tempMatrix 			= new THREE.Matrix4();
	protected _tempVector 			= new THREE.Vector3();
	protected _tempQuaternion 		= new THREE.Quaternion();
	protected _unitX 				= new THREE.Vector3( 1, 0, 0 );
	protected _unitY 				= new THREE.Vector3( 0, 1, 0 );
	protected _unitZ 				= new THREE.Vector3( 0, 0, 1 );
	protected _quaternionXYZ 		= new THREE.Quaternion();
	protected _quaternionX 			= new THREE.Quaternion();
	protected _quaternionY 			= new THREE.Quaternion();
	protected _quaternionZ 			= new THREE.Quaternion();
	protected _quaternionE 			= new THREE.Quaternion();
	protected _oldPosition 			= new THREE.Vector3();
	protected _oldScale 			= new THREE.Vector3();
	protected _oldRotationMatrix 	= new THREE.Matrix4();
	protected _parentRotationMatrix	= new THREE.Matrix4();
	protected _parentScale 			= new THREE.Vector3();
	protected _worldPosition 		= new THREE.Vector3();
	protected _worldRotation 		= new THREE.Euler();
	protected _worldRotationMatrix	= new THREE.Matrix4();
	protected _camPosition 			= new THREE.Vector3();
	protected _camRotation 			= new THREE.Euler();


	/**
	 * onPointerHover
	 *
	 * @param {Event} event
	 * @returns
	 *
	 * @memberof TransformControls
	 */
	protected _onPointerHover = ( event:MouseEvent|TouchEvent ) => {

		if ( this.object === undefined || this._dragging === true ) return;
		if ( event instanceof MouseEvent && event.button !== undefined && event.button !== 0 ) return;

		let pointer : any = event;
		if( event instanceof TouchEvent ) {
			pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;
		}
		let intersect = this._intersectObjects( pointer, this._gizmo[ this._mode ].pickers.children );

		let axis : string | null = null;

		if ( intersect ) {
			axis = intersect.object.name;
			event.preventDefault();
		}

		if ( this._axis !== axis ) {
			this._axis = axis;
			this.update();
			this.dispatchEvent( this._changeEvent );
		}
	}
	/**
	 * onPointerHover
	 *
	 * @param {Event} event
	 * @returns
	 *
	 * @memberof TransformControls
	 */
	protected _onPointerDown = ( event:MouseEvent|TouchEvent ) => {

		if ( this.object === undefined || this._dragging === true ) return;
		if ( event instanceof MouseEvent && event.button !== undefined && event.button !== 0 ) return;

		let pointer : any = event;

		if( event instanceof TouchEvent ) {
			pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;
		}

		if( pointer instanceof MouseEvent ) {
			if ( pointer.button === 0 || pointer.button === undefined ) {

				let intersect = this._intersectObjects( pointer, this._gizmo[ this._mode ].pickers.children );

				if ( intersect ) {

					event.preventDefault();
					event.stopPropagation();

					this.dispatchEvent( this._mouseDownEvent );

					this._axis = intersect.object.name;

					this.update();

					this._eye.copy( this._camPosition ).sub( this._worldPosition ).normalize();

					this._gizmo[ this._mode ].setActivePlane( this._axis, this._eye );

					let planeIntersect = this._intersectObjects( pointer, [ this._gizmo[ this._mode ].activePlane ] );

					if ( planeIntersect ) {

						this._oldPosition.copy( this.object.position );
						this._oldScale.copy( this.object.scale );

						this._oldRotationMatrix.extractRotation( this.object.matrix );
						this._worldRotationMatrix.extractRotation( this.object.matrixWorld );

						this._parentRotationMatrix.extractRotation( this.object.parent.matrixWorld );
						this._parentScale.setFromMatrixScale( this._tempMatrix.getInverse( this.object.parent.matrixWorld ) );

						this._offset.copy( planeIntersect.point );
					}
				}
			}

		}

		this._dragging = true;
	}

	protected _onPointerMove = ( event:MouseEvent|TouchEvent ) => {

		if ( this.object === undefined || this._axis === null || this._dragging === true ) return;
		if ( event instanceof MouseEvent && event.button !== undefined && event.button !== 0 ) return;

		let pointer : any = event;

		if( event instanceof TouchEvent ) {
			pointer = event.changedTouches ? event.changedTouches[ 0 ] : event;
		}

		let planeIntersect = this._intersectObjects( pointer, [ this._gizmo[ this._mode ].activePlane ] );

		if ( planeIntersect === false ) return;

		event.preventDefault();
		event.stopPropagation();

		this._point.copy( planeIntersect.point );

		if ( this._mode === "translate" ) {

			this._point.sub( this._offset );
			this._point.multiply( this._parentScale );

			if ( this._space === "local" ) {

				this._point.applyMatrix4( this._tempMatrix.getInverse( this._worldRotationMatrix ) );

				if ( this._axis.search( "X" ) === - 1 ) this._point.x = 0;
				if ( this._axis.search( "Y" ) === - 1 ) this._point.y = 0;
				if ( this._axis.search( "Z" ) === - 1 ) this._point.z = 0;

				this._point.applyMatrix4( this._oldRotationMatrix );

				this.object.position.copy( this._oldPosition );
				this.object.position.add( this._point );

			}

			if ( this._space === "world" || this._axis.search( "XYZ" ) !== - 1 ) {

				if ( this._axis.search( "X" ) === - 1 ) this._point.x = 0;
				if ( this._axis.search( "Y" ) === - 1 ) this._point.y = 0;
				if ( this._axis.search( "Z" ) === - 1 ) this._point.z = 0;

				this._point.applyMatrix4( this._tempMatrix.getInverse( this._parentRotationMatrix ) );

				this.object.position.copy( this._oldPosition );
				this.object.position.add( this._point );

			}

			if ( this._translationSnap !== null ) {

				if ( this._space === "local" ) {

					this.object.position.applyMatrix4( this._tempMatrix.getInverse( this._worldRotationMatrix ) );

				}

				if ( this._axis.search( "X" ) !== - 1 ) this.object.position.x = Math.round( this.object.position.x / this._translationSnap ) * this._translationSnap;
				if ( this._axis.search( "Y" ) !== - 1 ) this.object.position.y = Math.round( this.object.position.y / this._translationSnap ) * this._translationSnap;
				if ( this._axis.search( "Z" ) !== - 1 ) this.object.position.z = Math.round( this.object.position.z / this._translationSnap ) * this._translationSnap;

				if ( this._space === "local" ) {

					this.object.position.applyMatrix4( this._worldRotationMatrix );

				}

			}

		} else if ( this._mode === "scale" ) {

			this._point.sub( this._offset );
			this._point.multiply( this._parentScale );

			if ( this._space === "local" ) {

				if ( this._axis === "XYZ" ) {

					let scale = 1 + ( ( this._point.y ) / Math.max( this._oldScale.x, this._oldScale.y, this._oldScale.z ) );

					this.object.scale.x = this._oldScale.x * scale;
					this.object.scale.y = this._oldScale.y * scale;
					this.object.scale.z = this._oldScale.z * scale;

				} else {

					this._point.applyMatrix4( this._tempMatrix.getInverse( this._worldRotationMatrix ) );

					if ( this._axis === "X" ) this.object.scale.x = this._oldScale.x * ( 1 + this._point.x / this._oldScale.x );
					if ( this._axis === "Y" ) this.object.scale.y = this._oldScale.y * ( 1 + this._point.y / this._oldScale.y );
					if ( this._axis === "Z" ) this.object.scale.z = this._oldScale.z * ( 1 + this._point.z / this._oldScale.z );

				}

			}

		} else if ( this._mode === "rotate" ) {

			this._point.sub( this._worldPosition );
			this._point.multiply( this._parentScale );
			this._tempVector.copy( this._offset ).sub( this._worldPosition );
			this._tempVector.multiply( this._parentScale );

			let rotation = new THREE.Vector3();

			if ( this._axis === "E" ) {

				this._point.applyMatrix4( this._tempMatrix.getInverse( this._lookAtMatrix ) );
				this._tempVector.applyMatrix4( this._tempMatrix.getInverse( this._lookAtMatrix ) );

				rotation.set( Math.atan2( this._point.z, this._point.y ), Math.atan2( this._point.x, this._point.z ), Math.atan2( this._point.y, this._point.x ) );
				this._offsetRotation.set( Math.atan2( this._tempVector.z, this._tempVector.y ), Math.atan2( this._tempVector.x, this._tempVector.z ), Math.atan2( this._tempVector.y, this._tempVector.x ) );

				this._tempQuaternion.setFromRotationMatrix( this._tempMatrix.getInverse( this._parentRotationMatrix ) );

				this._quaternionE.setFromAxisAngle( this._eye, rotation.z - this._offsetRotation.z );
				this._quaternionXYZ.setFromRotationMatrix( this._worldRotationMatrix );

				this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionE );
				this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionXYZ );

				this.object.quaternion.copy( this._tempQuaternion );

			} else if ( this._axis === "XYZE" ) {

				let rotationAxis = this._point.clone().cross( this._tempVector ).normalize();
				let rotationEular = new THREE.Euler( rotationAxis.x, rotationAxis.y, rotationAxis.z );
				this._quaternionE.setFromEuler( rotationEular ); // rotation axis

				this._tempQuaternion.setFromRotationMatrix( this._tempMatrix.getInverse( this._parentRotationMatrix ) );

				this._quaternionX.setFromAxisAngle( rotationAxis, - this._point.clone().angleTo( this._tempVector ) );
				this._quaternionXYZ.setFromRotationMatrix( this._worldRotationMatrix );

				this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionX );
				this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionXYZ );

				this.object.quaternion.copy( this._tempQuaternion );

			} else if ( this._space === "local" ) {

				this._point.applyMatrix4( this._tempMatrix.getInverse( this._worldRotationMatrix ) );

				this._tempVector.applyMatrix4( this._tempMatrix.getInverse( this._worldRotationMatrix ) );

				rotation.set( Math.atan2( this._point.z, this._point.y ), Math.atan2( this._point.x, this._point.z ), Math.atan2( this._point.y, this._point.x ) );
				this._offsetRotation.set( Math.atan2( this._tempVector.z, this._tempVector.y ), Math.atan2( this._tempVector.x, this._tempVector.z ), Math.atan2( this._tempVector.y, this._tempVector.x ) );

				this._quaternionXYZ.setFromRotationMatrix( this._oldRotationMatrix );

				if ( this._rotationSnap !== null ) {

					this._quaternionX.setFromAxisAngle( this._unitX, Math.round( ( rotation.x - this._offsetRotation.x ) / this._rotationSnap ) * this._rotationSnap );
					this._quaternionY.setFromAxisAngle( this._unitY, Math.round( ( rotation.y - this._offsetRotation.y ) / this._rotationSnap ) * this._rotationSnap );
					this._quaternionZ.setFromAxisAngle( this._unitZ, Math.round( ( rotation.z - this._offsetRotation.z ) / this._rotationSnap ) * this._rotationSnap );

				} else {

					this._quaternionX.setFromAxisAngle( this._unitX, rotation.x - this._offsetRotation.x );
					this._quaternionY.setFromAxisAngle( this._unitY, rotation.y - this._offsetRotation.y );
					this._quaternionZ.setFromAxisAngle( this._unitZ, rotation.z - this._offsetRotation.z );

				}

				if ( this._axis === "X" ) this._quaternionXYZ.multiplyQuaternions( this._quaternionXYZ, this._quaternionX );
				if ( this._axis === "Y" ) this._quaternionXYZ.multiplyQuaternions( this._quaternionXYZ, this._quaternionY );
				if ( this._axis === "Z" ) this._quaternionXYZ.multiplyQuaternions( this._quaternionXYZ, this._quaternionZ );

				this.object.quaternion.copy( this._quaternionXYZ );

			} else if ( this._space === "world" ) {

				rotation.set( Math.atan2( this._point.z, this._point.y ), Math.atan2( this._point.x, this._point.z ), Math.atan2( this._point.y, this._point.x ) );
				this._offsetRotation.set( Math.atan2( this._tempVector.z, this._tempVector.y ), Math.atan2( this._tempVector.x, this._tempVector.z ), Math.atan2( this._tempVector.y, this._tempVector.x ) );

				this._tempQuaternion.setFromRotationMatrix( this._tempMatrix.getInverse( this._parentRotationMatrix ) );

				if ( this._rotationSnap !== null ) {

					this._quaternionX.setFromAxisAngle( this._unitX, Math.round( ( rotation.x - this._offsetRotation.x ) / this._rotationSnap ) * this._rotationSnap );
					this._quaternionY.setFromAxisAngle( this._unitY, Math.round( ( rotation.y - this._offsetRotation.y ) / this._rotationSnap ) * this._rotationSnap );
					this._quaternionZ.setFromAxisAngle( this._unitZ, Math.round( ( rotation.z - this._offsetRotation.z ) / this._rotationSnap ) * this._rotationSnap );

				} else {

					this._quaternionX.setFromAxisAngle( this._unitX, rotation.x - this._offsetRotation.x );
					this._quaternionY.setFromAxisAngle( this._unitY, rotation.y - this._offsetRotation.y );
					this._quaternionZ.setFromAxisAngle( this._unitZ, rotation.z - this._offsetRotation.z );

				}

				this._quaternionXYZ.setFromRotationMatrix( this._worldRotationMatrix );

				if ( this._axis === "X" ) this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionX );
				if ( this._axis === "Y" ) this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionY );
				if ( this._axis === "Z" ) this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionZ );

				this._tempQuaternion.multiplyQuaternions( this._tempQuaternion, this._quaternionXYZ );

				this.object.quaternion.copy( this._tempQuaternion );
			}
		}

		this.update();
		this.dispatchEvent( this._changeEvent );
		this.dispatchEvent( this._objectChangeEvent );

	}

	protected _onPointerUp = ( event:MouseEvent|TouchEvent ) => {

		event.preventDefault(); // Prevent MouseEvent on mobile

		if ( event instanceof MouseEvent && event.button !== undefined && event.button !== 0 ) return;

		if ( this._dragging && ( this._axis !== null ) ) {

			this._mouseUpEvent.mode = this._mode;
			this.dispatchEvent( this._mouseUpEvent );
		}

		this._dragging = false;

		if ( 'TouchEvent' in window && event instanceof TouchEvent ) {

			// Force "rollover"

			this._axis = null;
			this.update();
			this.dispatchEvent( this._changeEvent );

		} else {

			this._onPointerHover( event );
		}
	}

	/**
	 * intersect objects
	 *
	 * @param {*} pointer
	 * @param {THREE.Object3D[]} objects
	 * @returns
	 *
	 * @memberof TransformControls
	 */
	protected _intersectObjects( pointer:any, objects:THREE.Object3D[] ) {

		let rect = new ClientRect();

		if( hasFunction( this._domElement, 'getBoundingClientRect' ) ) {
			rect = this._domElement['getBoundingClientRect']();
		}

		let x = ( pointer.clientX - rect.left ) / rect.width;
		let y = ( pointer.clientY - rect.top ) / rect.height;

		this._pointerVector.set( ( x * 2 ) - 1, - ( y * 2 ) + 1 );
		this._ray.setFromCamera( this._pointerVector, this._camera );

		let intersections = this._ray.intersectObjects( objects, true );
		return intersections[ 0 ] ? intersections[ 0 ] : false;
	}

}

