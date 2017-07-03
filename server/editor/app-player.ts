// -----------------------------------------------------------------------------
// app-player.ts
// -----------------------------------------------------------------------------
import * as THREE   	from 'three';
import { WebVR 		}   from '../engine/vr/web-vr';
/**
 * app player
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class AppPlayer
 */
export class AppPlayer {

	dom 		: HTMLDivElement;
	width 		: number;
	height 		: number;

	private _scene : THREE.Scene;
	private _camera : THREE.PerspectiveCamera;
	private _renderer : THREE.WebGLRenderer;



	load ( json ) {

		this._isVR = json.project.vr;

		this._renderer = new THREE.WebGLRenderer( { antialias: true } );
		this._renderer.setClearColor( 0x000000 );
		this._renderer.setPixelRatio( window.devicePixelRatio );

		if ( json.project.gammaInput ) this._renderer.gammaInput = true;
		if ( json.project.gammaOutput ) this._renderer.gammaOutput = true;

		if ( json.project.shadows ) {

			this._renderer.shadowMap.enabled = true;
			// this._renderer.shadowMap.type = THREE.PCFSoftShadowMap;

		}

		this.dom.appendChild( this._renderer.domElement );

		this.setScene( this._loader.parse( json.scene ) );
		this.setCamera( this._loader.parse( json.camera ) );

		this._events = {
			init: [],
			start: [],
			stop: [],
			keydown: [],
			keyup: [],
			mousedown: [],
			mouseup: [],
			mousemove: [],
			touchstart: [],
			touchend: [],
			touchmove: [],
			update: []
		};

		let scriptWrapParams = 'player,renderer,scene,camera';
		let scriptWrapResultObj = {};

		for ( let eventKey in this._events ) {

			scriptWrapParams += ',' + eventKey;
			scriptWrapResultObj[ eventKey ] = eventKey;

		}

		let scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );

		for ( let uuid in json.scripts ) {

			let object = this._scene.getObjectByProperty( 'uuid', uuid, true );

			if ( object === undefined ) {

				console.warn( 'APP.Player: Script without object.', uuid );
				continue;

			}

			let scripts = json.scripts[ uuid ];

			for ( let i = 0; i < scripts.length; i ++ ) {

				let script = scripts[ i ];

				let functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, renderer, scene, camera );

				for ( let name in functions ) {

					if ( functions[ name ] === undefined ) continue;

					if ( this._events[ name ] === undefined ) {

						console.warn( 'APP.Player: Event type not supported (', name, ')' );
						continue;

					}

					this._events[ name ].push( functions[ name ].bind( object ) );

				}

			}

		}

		this.dispatch( events.init, arguments );

	};

	setCamera ( value ) {

		this._camera = value;
		this._camera.aspect = this.width / this.height;
		this._camera.updateProjectionMatrix();

		if ( this._isVR === true ) {

			this._cameraVR = new THREE.PerspectiveCamera();
			this._cameraVR.projectionMatrix = this._camera.projectionMatrix;
			this._camera.add( this._cameraVR );

			this._controls = new THREE.VRControls( this._cameraVR );
			this._effect = new THREE.VREffect( this._renderer );

			if ( WebVR.isAvailable() === true ) {

				this.dom.appendChild( WebVR.getButton( this._effect ) );

			}

			//if ( WebVR.isLatestAvailable() === false ) {
			//	this.dom.appendChild( WebVR.getMessage() );
			//}
		}

	}


	setScene ( value ) {
		this._scene = value;
	}

	setSize ( width, height ) {

		this.width = width;
		this.height = height;

		if ( this._camera ) {
			this._camera.aspect = this.width / this.height;
			this._camera.updateProjectionMatrix();
		}

		if ( this._renderer ) {

			this._renderer.setSize( width, height );

		}

	};

	dispatch ( array, event ) {

		for ( let i = 0, l = array.length; i < l; i ++ ) {
			array[ i ]( event );
		}
	}


	play = () => {

		document.addEventListener( 'keydown', onDocumentKeyDown );
		document.addEventListener( 'keyup', onDocumentKeyUp );
		document.addEventListener( 'mousedown', onDocumentMouseDown );
		document.addEventListener( 'mouseup', onDocumentMouseUp );
		document.addEventListener( 'mousemove', onDocumentMouseMove );
		document.addEventListener( 'touchstart', onDocumentTouchStart );
		document.addEventListener( 'touchend', onDocumentTouchEnd );
		document.addEventListener( 'touchmove', onDocumentTouchMove );

		this.dispatch( this._events.start, arguments );

		this.request = requestAnimationFrame( this.animate );
		this.prevTime = performance.now();

	};

	stop = () => {

		document.removeEventListener( 'keydown', onDocumentKeyDown );
		document.removeEventListener( 'keyup', onDocumentKeyUp );
		document.removeEventListener( 'mousedown', onDocumentMouseDown );
		document.removeEventListener( 'mouseup', onDocumentMouseUp );
		document.removeEventListener( 'mousemove', onDocumentMouseMove );
		document.removeEventListener( 'touchstart', onDocumentTouchStart );
		document.removeEventListener( 'touchend', onDocumentTouchEnd );
		document.removeEventListener( 'touchmove', onDocumentTouchMove );

		this.dispatch( this._events.stop, arguments );

		cancelAnimationFrame( this._request );

	};

	dispose = () => {

		while ( this.dom.children.length ) {

			this.dom.removeChild( this.dom.firstChild );

		}

		this._renderer.dispose();

		this._camera = undefined;
		this._scene = undefined;
		this._renderer = undefined;

	};

	onDocumentKeyDown( event ) {

		this.dispatch( this.events.keydown, event );

	}

	onDocumentKeyUp( event ) {

		this.dispatch( this.events.keyup, event );

	}

	onDocumentMouseDown( event ) {

		this.dispatch( this.events.mousedown, event );

	}

	onDocumentMouseUp( event ) {

		this.dispatch( this.events.mouseup, event );

	}

	onDocumentMouseMove( event ) {

		this.dispatch( this.events.mousemove, event );

	}

	onDocumentTouchStart( event ) {

		this.dispatch( this.events.touchstart, event );

	}

	onDocumentTouchEnd( event ) {

		this.dispatch( this.events.touchend, event );

	}

	onDocumentTouchMove( event ) {

		this.dispatch( this.events.touchmove, event );

	}

	constructor () {

		let loader = new THREE.ObjectLoader();
		let camera, scene, renderer;

		let controls, effect, cameraVR, isVR;

		let events : any = {};

		this.dom = document.createElement( 'div' );

		this.width = 500;
		this.height = 500;



		let prevTime, request;

		let animate = ( time ) => {

			request = requestAnimationFrame( animate );

			try {

				this.dispatch( events.update, { time: time, delta: time - prevTime } );

			} catch ( e ) {

				console.error( ( e.message || e ), ( e.stack || "" ) );

			}

			if ( isVR === true ) {

				camera.updateMatrixWorld();

				controls.update();
				effect.render( scene, cameraVR );

			} else {

				renderer.render( scene, camera );

			}

			prevTime = time;

		}

		//


	}
}
