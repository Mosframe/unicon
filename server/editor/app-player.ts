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

	core 	: HTMLDivElement;
	width 	: number;
	height 	: number;


	load = ( json ) => {

		this._isVR = json.project.vr;
		this._renderer = new THREE.WebGLRenderer( { antialias: true } );
		this._renderer.setClearColor( 0x000000 );
		this._renderer.setPixelRatio( window.devicePixelRatio );

		if ( json.project.gammaInput  ) this._renderer.gammaInput = true;
		if ( json.project.gammaOutput ) this._renderer.gammaOutput = true;

		if ( json.project.shadows ) {

			this._renderer.shadowMap.enabled = true;
			// this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		}

		this.core.appendChild( this._renderer.domElement );

		this.setScene( this._loader.parse( json.scene ) );
		this.setCamera( this._loader.parse( json.camera ) );

		this._events = {
			init		: [],
			start		: [],
			stop		: [],
			keydown		: [],
			keyup		: [],
			mousedown	: [],
			mouseup		: [],
			mousemove	: [],
			touchstart	: [],
			touchend	: [],
			touchmove	: [],
			update		: []
		};

		let scriptWrapParams 	= 'player,renderer,scene,camera';
		let scriptWrapResultObj = {};

		for ( let eventKey in this._events ) {

			scriptWrapParams += ',' + eventKey;
			scriptWrapResultObj[ eventKey ] = eventKey;
		}

		let scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );

		// [ Scripts ]
		for ( let uuid in json.scripts ) {

			let object = this._scene.getObjectByProperty( 'uuid', uuid, true );
			if ( object === undefined ) {
				console.warn( 'AppPlayer: Script without object.', uuid );
				continue;
			}

			let scripts = json.scripts[ uuid ];
			for ( let i = 0; i < scripts.length; i ++ ) {

				let script = scripts[ i ];

				// [ Bind functions to object ]
				let functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, this._renderer, this._scene, this._camera );

				for ( let name in functions ) {

					if ( functions[ name ] === undefined ) continue;
					if ( this._events[ name ] === undefined ) {

						console.warn( 'AppPlayer: Event type not supported (', name, ')' );
						continue;
					}
					this._events[ name ].push( functions[ name ].bind( object ) );
				}
			}
		}
		this._dispatch( this._events.init, arguments );
	}

	setCamera = ( value ) => {

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

				this.core.appendChild( WebVR.getButton( this._effect ) );

			}

			//if ( WebVR.isLatestAvailable() === false ) {
			//	this.dom.appendChild( WebVR.getMessage() );
			//}
		}
	}

	setScene = ( value ) => {
		this._scene = value;
	}

	setSize = ( width, height ) => {

		this.width = width;
		this.height = height;

		if ( this._camera ) {
			this._camera.aspect = this.width / this.height;
			this._camera.updateProjectionMatrix();
		}

		if ( this._renderer ) {
			this._renderer.setSize( width, height );
		}
	}

	play = () => {

		document.addEventListener( 'keydown'	, this._onDocumentKeyDown 		);
		document.addEventListener( 'keyup'		, this._onDocumentKeyUp 		);
		document.addEventListener( 'mousedown'	, this._onDocumentMouseDown 	);
		document.addEventListener( 'mouseup'	, this._onDocumentMouseUp 		);
		document.addEventListener( 'mousemove'	, this._onDocumentMouseMove 	);
		document.addEventListener( 'touchstart'	, this._onDocumentTouchStart 	);
		document.addEventListener( 'touchend'	, this._onDocumentTouchEnd 		);
		document.addEventListener( 'touchmove'	, this._onDocumentTouchMove 	);

		this._dispatch( this._events.start, arguments );
		this._request = requestAnimationFrame( this._animate );
		this._prevTime = performance.now();
	}

	stop = () => {

		document.removeEventListener( 'keydown'		, this._onDocumentKeyDown 		);
		document.removeEventListener( 'keyup'		, this._onDocumentKeyUp 		);
		document.removeEventListener( 'mousedown'	, this._onDocumentMouseDown 	);
		document.removeEventListener( 'mouseup'		, this._onDocumentMouseUp 		);
		document.removeEventListener( 'mousemove'	, this._onDocumentMouseMove 	);
		document.removeEventListener( 'touchstart'	, this._onDocumentTouchStart 	);
		document.removeEventListener( 'touchend'	, this._onDocumentTouchEnd 		);
		document.removeEventListener( 'touchmove'	, this._onDocumentTouchMove 	);

		this._dispatch( this._events.stop, arguments );
		cancelAnimationFrame( this._request );
	}

	dispose = () => {

		while ( this.core.children.length ) {
			if( this.core.firstChild ) {
				this.core.removeChild( this.core.firstChild );
			}
		}

		this._renderer.dispose();

		this._camera 	= undefined;
		this._scene 	= undefined;
		this._renderer 	= undefined;
	}

	// [ Constructor ]

	constructor () {
		this._loader 	= new THREE.ObjectLoader();
		this._events 	= {};
		this.core 		= document.createElement( 'div' );
		this.width 		= 500;
		this.height 	= 500;
	}

	// [ Private ]

	private _loader 	: THREE.ObjectLoader;
	private _camera 	: any;
	private _scene 		: any;
	private _renderer 	: any;
	private _controls 	: any;
	private _effect 	: any;
	private _cameraVR 	: any;
	private _isVR		: any;
	private _events 	: any = {};
	private _prevTime	: any;
	private _request	: any;


	private _dispatch = ( array, event ) => {

		for ( let i = 0, l = array.length; i < l; i ++ ) {
			array[ i ]( event );
		}
	}


	private _animate = ( time ) => {

		this._request = requestAnimationFrame( this._animate );
		try {
			this._dispatch( this._events.update, { time: time, delta: time - this._prevTime } );
		} catch ( e ) {
			console.error( ( e.message || e ), ( e.stack || "" ) );
		}

		if ( this._isVR === true ) {

			this._camera.updateMatrixWorld();
			this._controls.update();
			this._effect.render( this._scene, this._cameraVR );

		} else {

			this._renderer.render( this._scene, this._camera );
		}

		this._prevTime = time;
	}


	//

	private _onDocumentKeyDown = ( event ) => {

		this._dispatch( this._events.keydown, event );

	}

	private _onDocumentKeyUp = ( event ) => {

		this._dispatch( this._events.keyup, event );

	}

	private _onDocumentMouseDown = ( event ) => {

		this._dispatch( this._events.mousedown, event );

	}

	private _onDocumentMouseUp = ( event ) => {

		this._dispatch( this._events.mouseup, event );

	}

	private _onDocumentMouseMove = ( event ) => {

		this._dispatch( this._events.mousemove, event );

	}

	private _onDocumentTouchStart = ( event ) => {

		this._dispatch( this._events.touchstart, event );

	}

	private _onDocumentTouchEnd = ( event ) => {

		this._dispatch( this._events.touchend, event );

	}

	private _onDocumentTouchMove = ( event ) => {

		this._dispatch( this._events.touchmove, event );

	}
}
