// -----------------------------------------------------------------------------
// transform-controls.ts
// -----------------------------------------------------------------------------
import * as THREE             	  from 'three';
import {                    	} from '../../engine/object';
import {GizmoLineMaterial   	} from './gizmo-line-material';
import {GizmoMaterial       	} from './gizmo-material';
import {pickerMaterial      	} from './gizmo-material';
import {TransformGizmo      	} from './transform-gizmo';
import {TransformGizmoTranslate	} from './transform-gizmo-translate';
import {TransformGizmoRotate	} from './transform-gizmo-rotate';
import {TransformGizmoScale		} from './transform-gizmo-scale';

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

	get mode () : string		{ return this._mode; }
	set mode ( value:string ) 	{

		this._mode = value ? value : this._mode;
		if ( this._mode === "scale" ) this.space = "local";
		for ( let type in this._gizmo ) this._gizmo[ type ].visible = ( type === this._mode );

		this.update();
		this.dispatchEvent( this.changeEvent );
	}


    // [ Public Functions ]

	/**
	 * dispose
	 *
	 *
	 * @memberof TransformControls
	 */
	dispose () {

		this.domElement.removeEventListener( "mousedown"	, this._onPointerDown 	);
		this.domElement.removeEventListener( "touchstart"	, this._onPointerDown 	);
		this.domElement.removeEventListener( "mousemove"	, this._onPointerHover 	);
		this.domElement.removeEventListener( "touchmove"	, this._onPointerHover 	);
		this.domElement.removeEventListener( "mousemove"	, this._onPointerMove 	);
		this.domElement.removeEventListener( "touchmove"	, this._onPointerMove 	);
		this.domElement.removeEventListener( "mouseup"		, this._onPointerUp 	);
		this.domElement.removeEventListener( "mouseout"		, this._onPointerUp 	);
		this.domElement.removeEventListener( "touchend"		, this._onPointerUp 	);
		this.domElement.removeEventListener( "touchcancel"	, this._onPointerUp 	);
		this.domElement.removeEventListener( "touchleave"	, this._onPointerUp 	);
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
		this.object 	= undefined;
		this.visible 	= false;
		this.axis 		= null;
	}
	/**
	 * set translation snap
	 *
	 * @param {any} translationSnap
	 *
	 * @memberof TransformControls
	 */
	setTranslationSnap ( translationSnap ) {

		this.translationSnap = translationSnap;

	}
	/**
	 * set rotation snap
	 *
	 * @param {any} rotationSnap
	 *
	 * @memberof TransformControls
	 */
	setRotationSnap ( rotationSnap ) {

		this.rotationSnap = rotationSnap;

	}
	/**
	 * set size
	 *
	 * @param {any} size
	 *
	 * @memberof TransformControls
	 */
	setSize ( size ) {

		this.size = size;
		this.update();
		this.dispatchEvent( this.changeEvent );

	}
	/**
	 * set space
	 *
	 * @param {any} space
	 *
	 * @memberof TransformControls
	 */
	setSpace ( space ) {

		this.space = space;
		this.update();
		this.dispatchEvent( this.changeEvent );

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
		this.worldPosition.setFromMatrixPosition( this.object.matrixWorld );
		this.worldRotation.setFromRotationMatrix( this.tempMatrix.extractRotation( this.object.matrixWorld ) );

		this.camera.updateMatrixWorld(true);
		this.camPosition.setFromMatrixPosition( this.camera.matrixWorld );
		this.camRotation.setFromRotationMatrix( this.tempMatrix.extractRotation( this.camera.matrixWorld ) );

		let scale = 1;
		scale = this.worldPosition.distanceTo( this.camPosition ) / 6 * this.size;
		this.position.copy( this.worldPosition );
		this.scale.set( scale, scale, scale );

		if ( this.camera instanceof THREE.PerspectiveCamera ) {

			this.eye.copy( this.camPosition ).sub( this.worldPosition ).normalize();

		} else if ( this.camera instanceof THREE.OrthographicCamera ) {

			this.eye.copy( this.camPosition ).normalize();

		}

		if ( this.space === "local" ) {

			this._gizmo[ this._mode ].update( this.worldRotation, this.eye );

		} else if ( this.space === "world" ) {

			this._gizmo[ this._mode ].update( new THREE.Euler(), this.eye );

		}

		this._gizmo[ this._mode ].highlight( this.axis );
	}

	onPointerHover( event:Event ) {

		if ( this.object === undefined || this._dragging === true ) return;
		if ( event instanceof MouseEvent && event.button !== undefined && event.button !== 0 ) return;

		let pointer 	= event;
		if( event instanceof TouchEvent ) {
			pointer = <Event>(event.changedTouches ? event.changedTouches[ 0 ] : event);
		}
		let intersect = this.intersectObjects( pointer, this._gizmo[ this._mode ].pickers.children );

		let axis : string | null = null;

		if ( intersect ) {
			axis = intersect.object.name;
			event.preventDefault();
		}

		if ( this.axis !== axis ) {
			this.axis = axis;
			this.update();
			this.dispatchEvent( this.changeEvent );
		}
	}
	onPointerDown( event:Event ) {

		if ( this.object === undefined || this._dragging === true ) return;
		if ( event instanceof MouseEvent && event.button !== undefined && event.button !== 0 ) return;

		let pointer = event;

		if( event instanceof TouchEvent ) {
			pointer = <Event>(event.changedTouches ? event.changedTouches[ 0 ] : event);
		}

		if( pointer instanceof MouseEvent ) {
			if ( pointer.button === 0 || pointer.button === undefined ) {

				let intersect = this.intersectObjects( pointer, this._gizmo[ this._mode ].pickers.children );

				if ( intersect ) {

					event.preventDefault();
					event.stopPropagation();

					this.dispatchEvent( this.mouseDownEvent );

					this.axis = intersect.object.name;

					this.update();

					this.eye.copy( this.camPosition ).sub( this.worldPosition ).normalize();

					this._gizmo[ this._mode ].setActivePlane( this.axis, this.eye );

					let planeIntersect = this.intersectObjects( pointer, [ this._gizmo[ this._mode ].activePlane ] );

					if ( planeIntersect ) {

						this.oldPosition.copy( this.object.position );
						this.oldScale.copy( this.object.scale );

						this.oldRotationMatrix.extractRotation( this.object.matrix );
						this.worldRotationMatrix.extractRotation( this.object.matrixWorld );

						this.parentRotationMatrix.extractRotation( this.object.parent.matrixWorld );
						this.parentScale.setFromMatrixScale( this.tempMatrix.getInverse( this.object.parent.matrixWorld ) );

						this.offset.copy( planeIntersect.point );
					}
				}
			}

		}

		this._dragging = true;
	}

	onPointerMove( event:Event ) {

		if ( this.object === undefined || this.axis === null || this._dragging === true ) return;
		if ( event instanceof MouseEvent && event.button !== undefined && event.button !== 0 ) return;

		let pointer = event;

		if( event instanceof TouchEvent ) {
			pointer = <Event>(event.changedTouches ? event.changedTouches[ 0 ] : event);
		}

		let planeIntersect = this.intersectObjects( pointer, [ this._gizmo[ this._mode ].activePlane ] );

		if ( planeIntersect === false ) return;

		event.preventDefault();
		event.stopPropagation();

		this.point.copy( planeIntersect.point );

		if ( this._mode === "translate" ) {

			this.point.sub( this.offset );
			this.point.multiply( this.parentScale );

			if ( this.space === "local" ) {

				this.point.applyMatrix4( this.tempMatrix.getInverse( this.worldRotationMatrix ) );

				if ( this.axis.search( "X" ) === - 1 ) this.point.x = 0;
				if ( this.axis.search( "Y" ) === - 1 ) this.point.y = 0;
				if ( this.axis.search( "Z" ) === - 1 ) this.point.z = 0;

				this.point.applyMatrix4( this.oldRotationMatrix );

				this.object.position.copy( this.oldPosition );
				this.object.position.add( this.point );

			}

			if ( this.space === "world" || this.axis.search( "XYZ" ) !== - 1 ) {

				if ( this.axis.search( "X" ) === - 1 ) this.point.x = 0;
				if ( this.axis.search( "Y" ) === - 1 ) this.point.y = 0;
				if ( this.axis.search( "Z" ) === - 1 ) this.point.z = 0;

				this.point.applyMatrix4( this.tempMatrix.getInverse( this.parentRotationMatrix ) );

				this.object.position.copy( this.oldPosition );
				this.object.position.add( this.point );

			}

			if ( this.translationSnap !== null ) {

				if ( this.space === "local" ) {

					this.object.position.applyMatrix4( this.tempMatrix.getInverse( this.worldRotationMatrix ) );

				}

				if ( this.axis.search( "X" ) !== - 1 ) this.object.position.x = Math.round( this.object.position.x / this.translationSnap ) * this.translationSnap;
				if ( this.axis.search( "Y" ) !== - 1 ) this.object.position.y = Math.round( this.object.position.y / this.translationSnap ) * this.translationSnap;
				if ( this.axis.search( "Z" ) !== - 1 ) this.object.position.z = Math.round( this.object.position.z / this.translationSnap ) * this.translationSnap;

				if ( this.space === "local" ) {

					this.object.position.applyMatrix4( this.worldRotationMatrix );

				}

			}

		} else if ( this._mode === "scale" ) {

			this.point.sub( this.offset );
			this.point.multiply( this.parentScale );

			if ( this.space === "local" ) {

				if ( this.axis === "XYZ" ) {

					let scale = 1 + ( ( this.point.y ) / Math.max( this.oldScale.x, this.oldScale.y, this.oldScale.z ) );

					this.object.scale.x = this.oldScale.x * scale;
					this.object.scale.y = this.oldScale.y * scale;
					this.object.scale.z = this.oldScale.z * scale;

				} else {

					this.point.applyMatrix4( this.tempMatrix.getInverse( this.worldRotationMatrix ) );

					if ( this.axis === "X" ) this.object.scale.x = this.oldScale.x * ( 1 + this.point.x / this.oldScale.x );
					if ( this.axis === "Y" ) this.object.scale.y = this.oldScale.y * ( 1 + this.point.y / this.oldScale.y );
					if ( this.axis === "Z" ) this.object.scale.z = this.oldScale.z * ( 1 + this.point.z / this.oldScale.z );

				}

			}

		} else if ( this._mode === "rotate" ) {

			this.point.sub( this.worldPosition );
			this.point.multiply( this.parentScale );
			this.tempVector.copy( this.offset ).sub( this.worldPosition );
			this.tempVector.multiply( this.parentScale );

			if ( this.axis === "E" ) {

				this.point.applyMatrix4( this.tempMatrix.getInverse( this.lookAtMatrix ) );
				this.tempVector.applyMatrix4( this.tempMatrix.getInverse( this.lookAtMatrix ) );

				this.rotation.set( Math.atan2( this.point.z, this.point.y ), Math.atan2( this.point.x, this.point.z ), Math.atan2( this.point.y, this.point.x ) );
				this.offsetRotation.set( Math.atan2( this.tempVector.z, this.tempVector.y ), Math.atan2( this.tempVector.x, this.tempVector.z ), Math.atan2( this.tempVector.y, this.tempVector.x ) );

				this.tempQuaternion.setFromRotationMatrix( this.tempMatrix.getInverse( this.parentRotationMatrix ) );

				this.quaternionE.setFromAxisAngle( this.eye, this.rotation.z - this.offsetRotation.z );
				this.quaternionXYZ.setFromRotationMatrix( this.worldRotationMatrix );

				this.tempQuaternion.multiplyQuaternions( this.tempQuaternion, this.quaternionE );
				this.tempQuaternion.multiplyQuaternions( this.tempQuaternion, this.quaternionXYZ );

				this.object.quaternion.copy( this.tempQuaternion );

			} else if ( this.axis === "XYZE" ) {

				quaternionE.setFromEuler( point.clone().cross( tempVector ).normalize() ); // rotation axis

				tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );
				quaternionX.setFromAxisAngle( quaternionE, - point.clone().angleTo( tempVector ) );
				quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

				tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
				tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

				this.object.quaternion.copy( tempQuaternion );

			} else if ( this.space === "local" ) {

				point.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

				tempVector.applyMatrix4( tempMatrix.getInverse( worldRotationMatrix ) );

				rotation.set( Math.atan2( point.z, point.y ), Math.atan2( point.x, point.z ), Math.atan2( point.y, point.x ) );
				offsetRotation.set( Math.atan2( tempVector.z, tempVector.y ), Math.atan2( tempVector.x, tempVector.z ), Math.atan2( tempVector.y, tempVector.x ) );

				quaternionXYZ.setFromRotationMatrix( oldRotationMatrix );

				if ( this.rotationSnap !== null ) {

					quaternionX.setFromAxisAngle( unitX, Math.round( ( rotation.x - offsetRotation.x ) / this.rotationSnap ) * this.rotationSnap );
					quaternionY.setFromAxisAngle( unitY, Math.round( ( rotation.y - offsetRotation.y ) / this.rotationSnap ) * this.rotationSnap );
					quaternionZ.setFromAxisAngle( unitZ, Math.round( ( rotation.z - offsetRotation.z ) / this.rotationSnap ) * this.rotationSnap );

				} else {

					quaternionX.setFromAxisAngle( unitX, rotation.x - offsetRotation.x );
					quaternionY.setFromAxisAngle( unitY, rotation.y - offsetRotation.y );
					quaternionZ.setFromAxisAngle( unitZ, rotation.z - offsetRotation.z );

				}

				if ( this.axis === "X" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionX );
				if ( this.axis === "Y" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionY );
				if ( this.axis === "Z" ) quaternionXYZ.multiplyQuaternions( quaternionXYZ, quaternionZ );

				this.object.quaternion.copy( quaternionXYZ );

			} else if ( this.space === "world" ) {

				rotation.set( Math.atan2( point.z, point.y ), Math.atan2( point.x, point.z ), Math.atan2( point.y, point.x ) );
				offsetRotation.set( Math.atan2( tempVector.z, tempVector.y ), Math.atan2( tempVector.x, tempVector.z ), Math.atan2( tempVector.y, tempVector.x ) );

				tempQuaternion.setFromRotationMatrix( tempMatrix.getInverse( parentRotationMatrix ) );

				if ( this.rotationSnap !== null ) {

					quaternionX.setFromAxisAngle( unitX, Math.round( ( rotation.x - offsetRotation.x ) / this.rotationSnap ) * this.rotationSnap );
					quaternionY.setFromAxisAngle( unitY, Math.round( ( rotation.y - offsetRotation.y ) / this.rotationSnap ) * this.rotationSnap );
					quaternionZ.setFromAxisAngle( unitZ, Math.round( ( rotation.z - offsetRotation.z ) / this.rotationSnap ) * this.rotationSnap );

				} else {

					quaternionX.setFromAxisAngle( unitX, rotation.x - offsetRotation.x );
					quaternionY.setFromAxisAngle( unitY, rotation.y - offsetRotation.y );
					quaternionZ.setFromAxisAngle( unitZ, rotation.z - offsetRotation.z );

				}

				quaternionXYZ.setFromRotationMatrix( worldRotationMatrix );

				if ( this.axis === "X" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionX );
				if ( this.axis === "Y" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionY );
				if ( this.axis === "Z" ) tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionZ );

				tempQuaternion.multiplyQuaternions( tempQuaternion, quaternionXYZ );

				this.object.quaternion.copy( tempQuaternion );

			}

		}

		this.update();
		this.dispatchEvent( this.changeEvent );
		this.dispatchEvent( this.objectChangeEvent );

	}

	onPointerUp( event:Event ) {

		event.preventDefault(); // Prevent MouseEvent on mobile

		if ( event.button !== undefined && event.button !== 0 ) return;

		if ( this._dragging && ( this.axis !== null ) ) {

			this.mouseUpEvent.mode = this._mode;
			this.dispatchEvent( this.mouseUpEvent );

		}

		this._dragging = false;

		if ( 'TouchEvent' in window && event instanceof TouchEvent ) {

			// Force "rollover"

			this.axis = null;
			this.update();
			this.dispatchEvent( this.changeEvent );

		} else {

			this.onPointerHover( event );

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
	intersectObjects( pointer:any, objects:THREE.Object3D[] ) {

		let rect = new ClientRect();

		if( Object.hasProterty( this.domElement, 'getBoundingClientRect' ) ) {
			rect = this.domElement['getBoundingClientRect']();
		}

		let x = ( pointer.clientX - rect.left ) / rect.width;
		let y = ( pointer.clientY - rect.top ) / rect.height;

		this.pointerVector.set( ( x * 2 ) - 1, - ( y * 2 ) + 1 );
		this.ray.setFromCamera( this.pointerVector, this.camera );

		let intersections = this.ray.intersectObjects( objects, true );
		return intersections[ 0 ] ? intersections[ 0 ] : false;
	}

    // [ Constructors ]

	/**
	 * Creates an instance of TransformControls.
	 * @param {THREE.Camera} camera
	 * @param {Document} domElement
	 *
	 * @memberof TransformControls
	 */
    constructor( camera:THREE.Camera, domElement:Document ) {
        super();

		this.camera = camera;
		this.domElement = ( domElement !== undefined ) ? domElement : document;

		for ( let type in this._gizmo ) {
			let gizmoObj = this._gizmo[ type ];
			gizmoObj.visible = ( type === this._mode );
			this.add( gizmoObj );
		}

		this.domElement.addEventListener( "mousedown"	, this._onPointerDown	, false );
		this.domElement.addEventListener( "touchstart"	, this._onPointerDown	, false );
		this.domElement.addEventListener( "mousemove"	, this._onPointerHover	, false );
		this.domElement.addEventListener( "touchmove"	, this._onPointerHover	, false );
		this.domElement.addEventListener( "mousemove"	, this._onPointerMove	, false );
		this.domElement.addEventListener( "touchmove"	, this._onPointerMove	, false );
		this.domElement.addEventListener( "mouseup"		, this._onPointerUp		, false );
		this.domElement.addEventListener( "mouseout"	, this._onPointerUp		, false );
		this.domElement.addEventListener( "touchend"	, this._onPointerUp		, false );
		this.domElement.addEventListener( "touchcancel"	, this._onPointerUp		, false );
		this.domElement.addEventListener( "touchleave"	, this._onPointerUp		, false );
    }

	// [ Protected Variables ]

	protected camera				: THREE.Camera;
	protected domElement 			: Document;
	protected object 				= undefined;
	protected visible 				= false;
	protected translationSnap		= null;
	protected rotationSnap 			= null;
	protected space 				= "world";
	protected size 					= 1;
	protected axis 					= null;

	protected _mode 				= "translate";
	protected _dragging 			= false;
	protected _plane 				= "XY";
	protected _gizmo 				= {
		"translate"	: new TransformGizmoTranslate(),
		"rotate"	: new TransformGizmoRotate(),
		"scale"		: new TransformGizmoScale()
	};

	protected changeEvent 			= { type: "change" };
	protected mouseDownEvent 		= { type: "mouseDown" };
	protected mouseUpEvent 			= { type: "mouseUp", mode: this._mode };
	protected objectChangeEvent 	= { type: "objectChange" };

	protected ray 					= new THREE.Raycaster();
	protected pointerVector 		= new THREE.Vector2();
	protected point 				= new THREE.Vector3();
	protected offset 				= new THREE.Vector3();
	protected rotation 				= new THREE.Vector3();
	protected offsetRotation 		= new THREE.Vector3();
	protected lookAtMatrix 			= new THREE.Matrix4();
	protected eye 					= new THREE.Vector3();
	protected tempMatrix 			= new THREE.Matrix4();
	protected tempVector 			= new THREE.Vector3();
	protected tempQuaternion 		= new THREE.Quaternion();
	protected unitX 				= new THREE.Vector3( 1, 0, 0 );
	protected unitY 				= new THREE.Vector3( 0, 1, 0 );
	protected unitZ 				= new THREE.Vector3( 0, 0, 1 );
	protected quaternionXYZ 		= new THREE.Quaternion();
	protected quaternionX 			= new THREE.Quaternion();
	protected quaternionY 			= new THREE.Quaternion();
	protected quaternionZ 			= new THREE.Quaternion();
	protected quaternionE 			= new THREE.Quaternion();
	protected oldPosition 			= new THREE.Vector3();
	protected oldScale 				= new THREE.Vector3();
	protected oldRotationMatrix 	= new THREE.Matrix4();
	protected parentRotationMatrix	= new THREE.Matrix4();
	protected parentScale 			= new THREE.Vector3();
	protected worldPosition 		= new THREE.Vector3();
	protected worldRotation 		= new THREE.Euler();
	protected worldRotationMatrix	= new THREE.Matrix4();
	protected camPosition 			= new THREE.Vector3();
	protected camRotation 			= new THREE.Euler();


}

