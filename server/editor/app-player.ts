// -----------------------------------------------------------------------------
// app-player.ts
// -----------------------------------------------------------------------------
import * as THREE   	from 'three';
import {			}   from '../engine/object';
import { WebVR 		}   from '../engine/vr/web-vr';
/**
 * app player
 *
 * @author mrdoob / http://mrdoob.com/
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class AppPlayer
 */
export class AppPlayer {

	loader 		: any = new THREE.ObjectLoader();
	camera 		: any;
	scene  		: any;
	renderer 	: any;

	controls	: any;
	effect		: any;
	cameraVR	: any;
	isVR		: any;

	events 		: any = {};

	core = document.createElement( 'div' );

	width 		: number = 500;
	height 		: number = 500;

	load ( json:any ) {

		this.isVR = json.project.vr;

		this.renderer = new THREE.WebGLRenderer( { antialias: true } );
		this.renderer.setClearColor( 0x000000 );
		this.renderer.setPixelRatio( window.devicePixelRatio );

		if ( json.project.gammaInput ) this.renderer.gammaInput = true;
		if ( json.project.gammaOutput ) this.renderer.gammaOutput = true;

		if ( json.project.shadows ) {

			this.renderer.shadowMap.enabled = true;
			// renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		}

		this.core.appendChild( this.renderer.domElement );

		this.setScene( this.loader.parse( json.scene ) );
		this.setCamera( this.loader.parse( json.camera ) );

		this.events = {
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

		let scriptWrapParams  	= 'player,renderer,scene,camera';
		let scriptWrapResultObj = {};

		for ( let eventKey in this.events ) {

			scriptWrapParams += ',' + eventKey;
			scriptWrapResultObj[ eventKey ] = eventKey;
		}

		let scriptWrapResult = JSON.stringify( scriptWrapResultObj ).replace( /\"/g, '' );

		for ( let uuid in json.scripts ) {

			let object = this.scene.getObjectByProperty( 'uuid', uuid, true );

			if ( object === undefined ) {

				console.warn( 'APP.Player: Script without object.', uuid );
				continue;
			}

			var scripts = json.scripts[ uuid ];

			for ( var i = 0; i < scripts.length; i ++ ) {

				var script = scripts[ i ];

				var functions = ( new Function( scriptWrapParams, script.source + '\nreturn ' + scriptWrapResult + ';' ).bind( object ) )( this, this.renderer, this.scene, this.camera );

				for ( var name in functions ) {

					if ( functions[ name ] === undefined ) continue;

					if ( this.events[ name ] === undefined ) {

						console.warn( 'APP.Player: Event type not supported (', name, ')' );
						continue;

					}

					this.events[ name ].push( functions[ name ].bind( object ) );

				}

			}

		}

		this.dispatch( this.events.init, arguments );

	}

	setCamera ( value ) {

		this.camera = value;
		this.camera.aspect = this.width / this.height;
		this.camera.updateProjectionMatrix();

		if ( this.isVR === true ) {

			this.cameraVR = new THREE.PerspectiveCamera();
			this.cameraVR.projectionMatrix = this.camera.projectionMatrix;
			this.camera.add( this.cameraVR );

			this.controls = new THREE.VRControls( this.cameraVR );
			this.effect = new THREE.VREffect( this.renderer );

			if ( WebVR.isAvailable() === true ) {

				this.core.appendChild( WebVR.getButton( this.effect ) );

			}

			/*
			if ( WebVR.isLatestAvailable() === false ) {
				this.dom.appendChild( WebVR.getMessage() );
			}
			*/
		}

	}

	setScene ( value ) {

		this.scene = value;

	}

	setSize ( width, height ) {

		this.width = width;
		this.height = height;

		if ( this.camera ) {

			this.camera.aspect = this.width / this.height;
			this.camera.updateProjectionMatrix();
		}

		if ( this.renderer ) {

			this.renderer.setSize( width, height );
		}
	}

	dispatch( array, event ) {

		for ( var i = 0, l = array.length; i < l; i ++ ) {

			array[ i ]( event );

		}

	}

	prevTime	: any;
	request		: number;

	animate( time ) {

		this.request = requestAnimationFrame( this.animate );

		try {

			this.dispatch( this.events.update, { time: time, delta: time - this.prevTime } );

		} catch ( e ) {

			console.error( ( e.message || e ), ( e.stack || "" ) );
		}

		if ( this.isVR === true ) {

			this.camera.updateMatrixWorld();

			this.controls.update();
			this.effect.render( this.scene, this.cameraVR );

		} else {

			this.renderer.render( this.scene, this.camera );
		}

		this.prevTime = time;
	}

	play () {

		document.addEventListener( 'keydown'	, this.onDocumentKeyDown 	);
		document.addEventListener( 'keyup'		, this.onDocumentKeyUp 		);
		document.addEventListener( 'mousedown'	, this.onDocumentMouseDown 	);
		document.addEventListener( 'mouseup'	, this.onDocumentMouseUp 	);
		document.addEventListener( 'mousemove'	, this.onDocumentMouseMove 	);
		document.addEventListener( 'touchstart'	, this.onDocumentTouchStart );
		document.addEventListener( 'touchend'	, this.onDocumentTouchEnd 	);
		document.addEventListener( 'touchmove'	, this.onDocumentTouchMove 	);

		this.dispatch( this.events.start, arguments );

		this.request 	= requestAnimationFrame( this.animate );
		this.prevTime 	= performance.now();
	}

	stop () {

		document.removeEventListener( 'keydown'		, this.onDocumentKeyDown 	);
		document.removeEventListener( 'keyup'		, this.onDocumentKeyUp 		);
		document.removeEventListener( 'mousedown'	, this.onDocumentMouseDown 	);
		document.removeEventListener( 'mouseup'		, this.onDocumentMouseUp 	);
		document.removeEventListener( 'mousemove'	, this.onDocumentMouseMove 	);
		document.removeEventListener( 'touchstart'	, this.onDocumentTouchStart );
		document.removeEventListener( 'touchend'	, this.onDocumentTouchEnd 	);
		document.removeEventListener( 'touchmove'	, this.onDocumentTouchMove 	);

		this.dispatch( this.events.stop, arguments );

		cancelAnimationFrame( this.request );
	}

	dispose () {

		while ( this.core.children.length ) {
			if( this.core.firstChild )this.core.removeChild( this.core.firstChild );
		}

		this.renderer.dispose();
		this.camera 	= undefined;
		this.scene 		= undefined;
		this.renderer 	= undefined;
	}

	//

	onDocumentKeyDown( event:any ) {

		this.dispatch( this.events.keydown, event );
	}

	onDocumentKeyUp( event:any ) {

		this.dispatch( this.events.keyup, event );
	}

	onDocumentMouseDown( event:any ) {

		this.dispatch( this.events.mousedown, event );
	}

	onDocumentMouseUp( event:any ) {

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
}
