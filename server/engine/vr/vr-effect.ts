// -----------------------------------------------------------------------------
// vr-effect.ts
// -----------------------------------------------------------------------------
import *      as THREE          from 'three';
/**
 * VREffect
 *
 * @author dmarcos / https://github.com/dmarcos
 * @author mrdoob / http://mrdoob.com
 * @author mosframe / https://github.com/mosframe
 *
 * WebVR Spec: http://mozvr.github.io/webvr-spec/webvr.html
 *
 * Firefox: http://mozvr.com/downloads/
 * Chromium: https://webvr.info/get-chrome
 */
export class VREffect {

	isPresenting : boolean;

	vrDisplay : any ;
	vrDisplays : any ;
	rendererSize : any;
	rendererUpdateStyle : any;
	rendererPixelRatio : any;
	canvas :any;
	renderer : any;
	onError : any;
	cameraL : THREE.Camera;
	cameraR : THREE.Camera;
	autoSubmitFrame : boolean;
	eyeTranslationL : THREE.Vector3;
	eyeTranslationR : THREE.Vector3;
	renderRectL : any;
	renderRectR : any;
	frameData :any;
	defaultLeftBounds:number[];
	defaultRightBounds:number[];



	gotVRDisplays( displays ) {

		this.vrDisplays = displays;

		if ( displays.length > 0 ) {

			this.vrDisplay = displays[ 0 ];

		} else {

			if ( this.onError ) this.onError( 'HMD not available' );

		}

	}
	getVRDisplay () {
		return this.vrDisplay;
	}

	setVRDisplay ( value ) {
		this.vrDisplay = value;
	}

	getVRDisplays () {

		console.warn( 'THREE.VREffect: getVRDisplays() is being deprecated.' );
		return this.vrDisplays;
	}

	setSize ( width, height, updateStyle ) {

		this.rendererSize = { width: width, height: height };
		this.rendererUpdateStyle = updateStyle;

		if ( this.isPresenting ) {

			var eyeParamsL = this.vrDisplay.getEyeParameters( 'left' );
			this.renderer.setPixelRatio( 1 );
			this.renderer.setSize( eyeParamsL.renderWidth * 2, eyeParamsL.renderHeight, false );

		} else {

			this.renderer.setPixelRatio( this.rendererPixelRatio );
			this.renderer.setSize( width, height, updateStyle );
		}
	}

	onVRDisplayPresentChange() {

		var wasPresenting = this.isPresenting;
		this.isPresenting = this.vrDisplay !== undefined && this.vrDisplay.isPresenting;

		if ( this.isPresenting ) {

			var eyeParamsL = this.vrDisplay.getEyeParameters( 'left' );
			var eyeWidth = eyeParamsL.renderWidth;
			var eyeHeight = eyeParamsL.renderHeight;

			if ( ! wasPresenting ) {

				this.rendererPixelRatio = this.renderer.getPixelRatio();
				this.rendererSize = this.renderer.getSize();

				this.renderer.setPixelRatio( 1 );
				this.renderer.setSize( eyeWidth * 2, eyeHeight, false );

			}

		} else if ( wasPresenting ) {

			this.renderer.setPixelRatio( this.rendererPixelRatio );
			this.renderer.setSize( this.rendererSize.width, this.rendererSize.height, this.rendererUpdateStyle );

		}

	}

	setFullScreen ( boolean ) {

		return new Promise( ( resolve, reject ) => {

			if ( this.vrDisplay === undefined ) {

				reject( new Error( 'No VR hardware found.' ) );
				return;

			}

			if ( this.isPresenting === boolean ) {

				resolve();
				return;

			}

			if ( boolean ) {

				resolve( this.vrDisplay.requestPresent( [ { source: this.canvas } ] ) );

			} else {

				resolve( this.vrDisplay.exitPresent() );

			}

		} );

	}

	requestPresent () {

		return this.setFullScreen( true );

	}

	exitPresent () {

		return this.setFullScreen( false );

	}

	requestAnimationFrame ( f ) {

		if ( this.vrDisplay !== undefined ) {

			return this.vrDisplay.requestAnimationFrame( f );

		} else {

			return window.requestAnimationFrame( f );

		}

	}

	cancelAnimationFrame ( h ) {

		if ( this.vrDisplay !== undefined ) {

			this.vrDisplay.cancelAnimationFrame( h );

		} else {

			window.cancelAnimationFrame( h );

		}

	}

	submitFrame () {

		if ( this.vrDisplay !== undefined && this.isPresenting ) {

			this.vrDisplay.submitFrame();

		}

	}

	render ( scene, camera, renderTarget?:any, forceClear?:any ) {

		if ( this.vrDisplay && this.isPresenting ) {

			var autoUpdate = scene.autoUpdate;

			if ( autoUpdate ) {

				scene.updateMatrixWorld();
				scene.autoUpdate = false;

			}

			var eyeParamsL = this.vrDisplay.getEyeParameters( 'left' );
			var eyeParamsR = this.vrDisplay.getEyeParameters( 'right' );

			this.eyeTranslationL.fromArray( eyeParamsL.offset );
			this.eyeTranslationR.fromArray( eyeParamsR.offset );

			if ( Array.isArray( scene ) ) {

				console.warn( 'THREE.VREffect.render() no longer supports arrays. Use object.layers instead.' );
				scene = scene[ 0 ];

			}

			// When rendering we don't care what the recommended size is, only what the actual size
			// of the backbuffer is.
			var size = this.renderer.getSize();
			var layers = this.vrDisplay.getLayers();
			var leftBounds;
			var rightBounds;

			if ( layers.length ) {

				var layer = layers[ 0 ];

				leftBounds = layer.leftBounds !== null && layer.leftBounds.length === 4 ? layer.leftBounds : this.defaultLeftBounds;
				rightBounds = layer.rightBounds !== null && layer.rightBounds.length === 4 ? layer.rightBounds : this.defaultRightBounds;

			} else {

				leftBounds = this.defaultLeftBounds;
				rightBounds = this.defaultRightBounds;

			}

			this.renderRectL = {
				x: Math.round( size.width * leftBounds[ 0 ] ),
				y: Math.round( size.height * leftBounds[ 1 ] ),
				width: Math.round( size.width * leftBounds[ 2 ] ),
				height: Math.round( size.height * leftBounds[ 3 ] )
			};
			this.renderRectR = {
				x: Math.round( size.width * rightBounds[ 0 ] ),
				y: Math.round( size.height * rightBounds[ 1 ] ),
				width: Math.round( size.width * rightBounds[ 2 ] ),
				height: Math.round( size.height * rightBounds[ 3 ] )
			};

			if ( renderTarget ) {

				this.renderer.setRenderTarget( renderTarget );
				renderTarget.scissorTest = true;

			} else {

				this.renderer.setRenderTarget( null );
				this.renderer.setScissorTest( true );

			}

			if ( this.renderer.autoClear || forceClear ) this.renderer.clear();

			if ( camera.parent === null ) camera.updateMatrixWorld();

			camera.matrixWorld.decompose( this.cameraL.position, this.cameraL.quaternion, this.cameraL.scale );

			this.cameraR.position.copy( this.cameraL.position );
			this.cameraR.quaternion.copy( this.cameraL.quaternion );
			this.cameraR.scale.copy( this.cameraL.scale );

			this.cameraL.translateOnAxis( this.eyeTranslationL, this.cameraL.scale.x );
			this.cameraR.translateOnAxis( this.eyeTranslationR, this.cameraR.scale.x );

			if ( this.vrDisplay.getFrameData ) {

				this.vrDisplay.depthNear = camera.near;
				this.vrDisplay.depthFar = camera.far;

				this.vrDisplay.getFrameData( this.frameData );

				this.cameraL.projectionMatrix.elements = this.frameData.leftProjectionMatrix;
				this.cameraR.projectionMatrix.elements = this.frameData.rightProjectionMatrix;

			} else {

				this.cameraL.projectionMatrix = this.fovToProjection( eyeParamsL.fieldOfView, true, camera.near, camera.far );
				this.cameraR.projectionMatrix = this.fovToProjection( eyeParamsR.fieldOfView, true, camera.near, camera.far );

			}

			// render left eye
			if ( renderTarget ) {

				renderTarget.viewport.set( this.renderRectL.x, this.renderRectL.y, this.renderRectL.width, this.renderRectL.height );
				renderTarget.scissor.set( this.renderRectL.x, this.renderRectL.y, this.renderRectL.width, this.renderRectL.height );

			} else {

				this.renderer.setViewport( this.renderRectL.x, this.renderRectL.y, this.renderRectL.width, this.renderRectL.height );
				this.renderer.setScissor( this.renderRectL.x, this.renderRectL.y, this.renderRectL.width, this.renderRectL.height );

			}
			this.renderer.render( scene, this.cameraL, renderTarget, forceClear );

			// render right eye
			if ( renderTarget ) {

				renderTarget.viewport.set( this.renderRectR.x, this.renderRectR.y, this.renderRectR.width, this.renderRectR.height );
				renderTarget.scissor.set( this.renderRectR.x, this.renderRectR.y, this.renderRectR.width, this.renderRectR.height );

			} else {

				this.renderer.setViewport( this.renderRectR.x, this.renderRectR.y, this.renderRectR.width, this.renderRectR.height );
				this.renderer.setScissor( this.renderRectR.x, this.renderRectR.y, this.renderRectR.width, this.renderRectR.height );

			}
			this.renderer.render( scene, this.cameraR, renderTarget, forceClear );

			if ( renderTarget ) {

				renderTarget.viewport.set( 0, 0, size.width, size.height );
				renderTarget.scissor.set( 0, 0, size.width, size.height );
				renderTarget.scissorTest = false;
				this.renderer.setRenderTarget( null );

			} else {

				this.renderer.setViewport( 0, 0, size.width, size.height );
				this.renderer.setScissorTest( false );

			}

			if ( autoUpdate ) {

				scene.autoUpdate = true;

			}

			if ( this.autoSubmitFrame ) {

				this.submitFrame();

			}

			return;

		}

		// Regular render mode if not HMD

		this.renderer.render( scene, camera, renderTarget, forceClear );

	}

	dispose () {

		window.removeEventListener( 'vrdisplaypresentchange', this.onVRDisplayPresentChange, false );

	}


	constructor ( renderer, onError?:any ) {

		this.renderer = renderer;
		this.onError = onError;

		this.eyeTranslationL = new THREE.Vector3();
		this.eyeTranslationR = new THREE.Vector3();

		this.frameData = null;

		if ( 'VRFrameData' in window ) {

			this.frameData = new window['VRFrameData'];
		}


		if ( navigator.getVRDisplays ) {

			navigator.getVRDisplays().then( this.gotVRDisplays ).catch( () => {
				console.warn( 'THREE.VREffect: Unable to get VR Displays' );
			} );

		}

		//

		this.isPresenting = false;

		this.rendererSize = renderer.getSize();
		this.rendererUpdateStyle = false;
		this.rendererPixelRatio = renderer.getPixelRatio();


		// VR presentation

		this.canvas = renderer.domElement;
		this.defaultLeftBounds = [ 0.0, 0.0, 0.5, 1.0 ];
		this.defaultRightBounds = [ 0.5, 0.0, 0.5, 1.0 ];

		window.addEventListener( 'vrdisplaypresentchange', this.onVRDisplayPresentChange, false );

		this.autoSubmitFrame = true;

		// render

		this.cameraL = new THREE.PerspectiveCamera();
		this.cameraL.layers.enable( 1 );

		this.cameraR = new THREE.PerspectiveCamera();
		this.cameraR.layers.enable( 2 );
	}

	fovToNDCScaleOffset( fov ) {

		var pxscale = 2.0 / ( fov.leftTan + fov.rightTan );
		var pxoffset = ( fov.leftTan - fov.rightTan ) * pxscale * 0.5;
		var pyscale = 2.0 / ( fov.upTan + fov.downTan );
		var pyoffset = ( fov.upTan - fov.downTan ) * pyscale * 0.5;
		return { scale: [ pxscale, pyscale ], offset: [ pxoffset, pyoffset ] };

	}

	fovPortToProjection( fov, rightHanded, zNear, zFar ) {

		rightHanded = rightHanded === undefined ? true : rightHanded;
		zNear = zNear === undefined ? 0.01 : zNear;
		zFar = zFar === undefined ? 10000.0 : zFar;

		var handednessScale = rightHanded ? - 1.0 : 1.0;

		// start with an identity matrix
		var mobj = new THREE.Matrix4();
		var m = mobj.elements;

		// and with scale/offset info for normalized device coords
		var scaleAndOffset = this.fovToNDCScaleOffset( fov );

		// X result, map clip edges to [-w,+w]
		m[ 0 * 4 + 0 ] = scaleAndOffset.scale[ 0 ];
		m[ 0 * 4 + 1 ] = 0.0;
		m[ 0 * 4 + 2 ] = scaleAndOffset.offset[ 0 ] * handednessScale;
		m[ 0 * 4 + 3 ] = 0.0;

		// Y result, map clip edges to [-w,+w]
		// Y offset is negated because this proj matrix transforms from world coords with Y=up,
		// but the NDC scaling has Y=down (thanks D3D?)
		m[ 1 * 4 + 0 ] = 0.0;
		m[ 1 * 4 + 1 ] = scaleAndOffset.scale[ 1 ];
		m[ 1 * 4 + 2 ] = - scaleAndOffset.offset[ 1 ] * handednessScale;
		m[ 1 * 4 + 3 ] = 0.0;

		// Z result (up to the app)
		m[ 2 * 4 + 0 ] = 0.0;
		m[ 2 * 4 + 1 ] = 0.0;
		m[ 2 * 4 + 2 ] = zFar / ( zNear - zFar ) * - handednessScale;
		m[ 2 * 4 + 3 ] = ( zFar * zNear ) / ( zNear - zFar );

		// W result (= Z in)
		m[ 3 * 4 + 0 ] = 0.0;
		m[ 3 * 4 + 1 ] = 0.0;
		m[ 3 * 4 + 2 ] = handednessScale;
		m[ 3 * 4 + 3 ] = 0.0;

		mobj.transpose();
		return mobj;

	}

	fovToProjection( fov, rightHanded, zNear, zFar ) {

		var DEG2RAD = Math.PI / 180.0;

		var fovPort = {
			upTan: Math.tan( fov.upDegrees * DEG2RAD ),
			downTan: Math.tan( fov.downDegrees * DEG2RAD ),
			leftTan: Math.tan( fov.leftDegrees * DEG2RAD ),
			rightTan: Math.tan( fov.rightDegrees * DEG2RAD )
		};

		return this.fovPortToProjection( fovPort, rightHanded, zNear, zFar );
	}
}
