// -----------------------------------------------------------------------------
// viewport.ts
// -----------------------------------------------------------------------------
import {Signal  				} from 'signals';
import * as THREE     		  	  from 'three';
import {						} from '../engine/object';
import {Panel as UIPanel 		} from '../editor/gui/panel';
import {EditorControls			} from '../editor/handles/editor-controls';
import {TransformControls		} from '../editor/handles/transform-controls/transform-controls';
//import {Editor  				} from './editor';
import {ViewportInfo			} from './viewport-info';

let SetPositionCommand 	= require( '../lib/three.js/editor/js/commands/SetPositionCommand' );
let SetRotationCommand	= require( '../lib/three.js/editor/js/commands/SetRotationCommand' );
let SetScaleCommand		= require( '../lib/three.js/editor/js/commands/SetScaleCommand' );

// TODO : VR 보류
//let WEBVR 			= require( '../lib/three.js/examples/js/vr/WebVR' );
//let VREffect 			= require( '../lib/three.js/examples/js/effects/VREffect' );
//let VRControls 		= require( '../lib/three.js/examples/js/controls/VRControls' );


/**
 * Viewport
 *
 * @author mrdoob ( http://mrdoob.com/ )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class Viewport
 */
export class Viewport {

    // [ Public Variables ]

	editor 				: any;
    container 			: UIPanel;
	renderer 			: THREE.WebGLRenderer | null;
	camera 				: THREE.Camera;
	scene 				: THREE.Scene;
	sceneHelpers 		: THREE.Scene;
	objects 			: THREE.Object3D[];
	controls 			: EditorControls;
	transformControls 	: TransformControls;
	selectionBox 		: THREE.BoxHelper;
	vrEffect			: any;
	vrControls			: any;
	vrCamera			: THREE.PerspectiveCamera;

    // [ Public Functions ]

	/**
	 * get intersect objects
	 *
	 * @param {THREE.Vector2} point
	 * @param {THREE.Object3D[]} objects
	 * @returns
	 *
	 * @memberof Viewport
	 */
	getIntersects ( point:THREE.Vector2, objects:THREE.Object3D[] ) {
		this._mouse.set( ( point.x * 2 ) - 1, - ( point.y * 2 ) + 1 );
		this._raycaster.setFromCamera( this._mouse, this.camera );
		return this._raycaster.intersectObjects( objects );
	}
	/**
	 * get mouse position
	 *
	 * @param {HTMLElement} dom
	 * @param {number} x
	 * @param {number} y
	 * @returns {number[]}
	 *
	 * @memberof Viewport
	 */
	getMousePosition( dom:HTMLElement, x:number, y:number ) : number[] {
		let rect = dom.getBoundingClientRect();
		return [ ( x - rect.left ) / rect.width, ( y - rect.top ) / rect.height ];
	}


    // [ Constructors ]

    constructor( editor:any ) {

		this.editor = editor;

        this.container = new UIPanel();
        this.container.setId( 'viewport' );
        this.container.setPosition( 'absolute' );
        this.container.add( (new ViewportInfo( editor )).container );

		//console.log( this.container );

		this.renderer 		= null;
		this.camera 		= editor.camera;
		this.scene 			= editor.scene;
		this.sceneHelpers 	= editor.sceneHelpers;

		this.objects = [];

		/*
		// TODO : VR 보류
		if( WEBVR.isAvailable() === true ) {
			var vrCamera = new THREE.PerspectiveCamera();
			vrCamera.projectionMatrix = this.camera.projectionMatrix;
			this.camera.add( vrCamera );
		}
		*/

		// helpers

		let grid = new THREE.GridHelper( 60, 60 );
		this.sceneHelpers.add( grid );

		//

		let box = new THREE.Box3();

		this.selectionBox = new THREE.BoxHelper();
		this.selectionBox.material.depthTest = false;
		this.selectionBox.material.transparent = true;
		this.selectionBox.visible = false;
		this.sceneHelpers.add( this.selectionBox );

		this.objectPositionOnDown = null;
		this.objectRotationOnDown = null;
		this.objectScaleOnDown = null;

		console.log( this.camera );
		console.log( this.container.core );

		this.transformControls = new TransformControls( this.camera, this.container.core );
		this.transformControls.addEventListener( 'change', ()=> {

			let object = this.transformControls.object;
			if( object !== undefined ) {

				//this.selectionBox.setFromObject( object );
				this.selectionBox = new THREE.BoxHelper( object );

				let helper = editor.helpers[ object.id ];

				if( helper !== undefined ) {
					if( Object.hasFunction( helper, 'update') ) {
						helper['update']();
					}
				}

				this.editor.signals.refreshSidebarObject3D.dispatch( object );
			}
			this.render();
		});

		this.transformControls.addEventListener( 'mouseDown', () => {
			let object = this.transformControls.object;
			if( object ) {
				this.objectPositionOnDown 	= object.position.clone();
				this.objectRotationOnDown 	= object.rotation.clone();
				this.objectScaleOnDown 		= object.scale.clone();
				this.controls.enabled = false;
			}
		});

		this.transformControls.addEventListener( 'mouseUp', function () {

			let object = this.transformControls.object;
			if( object !== undefined ) {

				switch( this.transformControls.getMode() ) {
				case 'translate':
					if( ! this.objectPositionOnDown.equals( object.position ) ) {
						this.editor.execute( new SetPositionCommand( object, object.position, this.objectPositionOnDown ) );
					}
					break;
				case 'rotate':
					if ( ! this.objectRotationOnDown.equals( object.rotation ) ) {
						this.editor.execute( new SetRotationCommand( object, object.rotation, this.objectRotationOnDown ) );
					}
					break;
				case 'scale':
					if ( ! this.objectScaleOnDown.equals( object.scale ) ) {
						this.editor.execute( new SetScaleCommand( object, object.scale, this.objectScaleOnDown ) );
					}
					break;
				}
			}
			this.controls.enabled = true;
		});

		this.sceneHelpers.add( this.transformControls );

		// [ object picking ]

		this._raycaster = new THREE.Raycaster();
		this._mouse 	= new THREE.Vector2();

		// [ events ]

		this.container.core.addEventListener( 'mousedown'	, this._onMouseDown		, false );
		this.container.core.addEventListener( 'touchstart'	, this._onTouchStart	, false );
		this.container.core.addEventListener( 'dblclick'	, this._onDoubleClick	, false );

		// controls need to be added *after* main logic,
		// otherwise controls.enabled doesn't work.

		this.controls = new EditorControls( this.camera, this.container.core );
		this.controls.addEventListener( 'change', () => {
			this.transformControls.update();
			this.editor.signals.cameraChanged.dispatch( this.camera );
		});

		this.editor.signals.editorCleared.add( () => {
			this.controls.center.set( 0, 0, 0 );
			this.render();
		});

		this.editor.signals.enterVR.add( () => {
			this.vrEffect.isPresenting ? this.vrEffect.exitPresent() : this.vrEffect.requestPresent();
		});

		this.editor.signals.themeChanged.add( ( value ) => {
			switch ( value ) {
			case 'css/light.css':
				this.sceneHelpers.remove( grid );
				grid = new THREE.GridHelper( 60, 60, 0x444444, 0x888888 );
				this.sceneHelpers.add( grid );
				break;
			case 'css/dark.css':
				this.sceneHelpers.remove( grid );
				grid = new THREE.GridHelper( 60, 60, 0xbbbbbb, 0x888888 );
				this.sceneHelpers.add( grid );
				break;
			}
			this.render();
		});

		this.editor.signals.transformModeChanged.add( ( mode:string ) => {
			this.transformControls.setMode( mode );
		});

		this.editor.signals.snapChanged.add( ( dist:any ) => {
			this.transformControls.setTranslationSnap( dist );
		});

		this.editor.signals.spaceChanged.add( ( space:string ) => {
			this.transformControls.setSpace( space );
		});

		this.editor.signals.rendererChanged.add( ( newRenderer:THREE.WebGLRenderer ) => {

			if ( this.renderer !== null ) {
				this.container.core.removeChild( this.renderer.domElement );
			}

			this.renderer = newRenderer;

			this.renderer.autoClear = false;
			//this.renderer.autoUpdateScene = false;
			this.renderer.setPixelRatio( window.devicePixelRatio );
			this.renderer.setSize( this.container.core.offsetWidth, this.container.core.offsetHeight );

			this.container.core.appendChild( this.renderer.domElement );

			// TODO : VR 보류
			/*
			if ( WEBVR.isAvailable() === true ) {

				this.vrControls = new THREE.VRControls( vrCamera );
				this.vrEffect = new THREE.VREffect( this.renderer );

				window.addEventListener( 'vrdisplaypresentchange', function ( event ) {

					this.effect.isPresenting ? this.editor.signals.enteredVR.dispatch() : this.editor.signals.exitedVR.dispatch();

				}, false );
			}
			*/

			this.render();

		} );

		this.editor.signals.sceneGraphChanged.add( () => {
			this.render();
		});

		this.editor.signals.cameraChanged.add( () => {
			this.render();
		});

		this.editor.signals.objectSelected.add( ( object:THREE.Object3D ) => {

			this.selectionBox.visible = false;
			this.transformControls.detach();

			if ( object !== null && object !== this.scene && object !== this.camera ) {

				box.setFromObject( object );

				if ( box.isEmpty() === false ) {
					//this.selectionBox.setFromObject( object );
					this.selectionBox = new THREE.BoxHelper( object );
					this.selectionBox.visible = true;
				}

				this.transformControls.attach( object );
			}

			this.render();
		});

		this.editor.signals.objectFocused.add( ( object:THREE.Object3D ) => {
			this.controls.focus( object );
		});

		this.editor.signals.geometryChanged.add( ( object:THREE.Object3D ) => {
			if( object !== undefined ) {
				//this.selectionBox.setFromObject( object );
				this.selectionBox = new THREE.BoxHelper( object );
			}
			this.render();
		});

		this.editor.signals.objectAdded.add( ( object:THREE.Object3D ) => {

			object.traverse( ( child:THREE.Object3D ) => {
				this.objects.push( child );
			});
		});

		this.editor.signals.objectChanged.add( ( object:THREE.Object3D ) => {

			if ( editor.selected === object ) {

				//this.selectionBox.setFromObject( object );
				this.selectionBox = new THREE.BoxHelper( object );
				this.transformControls.update();

			}

			if ( object instanceof THREE.PerspectiveCamera ) {

				object.updateProjectionMatrix();

			}

			let helper = editor.helpers[ object.id ];
			if ( helper !== undefined ) {

				if( Object.hasFunction( helper, 'update' ) ) {
					helper['update']();
				}
			}
			this.render();
		});

		this.editor.signals.objectRemoved.add( ( object ) => {

			object.traverse( ( child:THREE.Object3D ) => {
				this.objects.splice( this.objects.indexOf( child ), 1 );
			});
		});

		this.editor.signals.helperAdded.add( ( object:THREE.Object3D ) => {
			this.objects.push( object.getObjectByName( 'picker' ) );
		});

		this.editor.signals.helperRemoved.add( ( object:THREE.Object3D ) => {
			this.objects.splice( this.objects.indexOf( object.getObjectByName( 'picker' ) ), 1 );
		});

		this.editor.signals.materialChanged.add( ( material:THREE.Material ) => {
			this.render();
		});

		// [ fog ]

		this.editor.signals.sceneBackgroundChanged.add( ( backgroundColor:number ) => {
			this.scene.background.setHex( backgroundColor );
			this.render();
		});

		this._currentFogType = '';

		this.editor.signals.sceneFogChanged.add( ( fogType:string, fogColor:number, fogNear:number, fogFar:number, fogDensity:number ) => {

			if( this._currentFogType !== fogType ) {
				switch( fogType ) {
				case 'None':
					this.scene.fog = new THREE.Fog(0);
					break;
				case 'Fog':
					this.scene.fog = new THREE.Fog(fogColor);
					break;
				case 'FogExp2':
					this.scene.fog = new THREE.FogExp2(fogColor);
					break;

				}
				this._currentFogType = fogType;
			}

			if ( this.scene.fog instanceof THREE.Fog ) {
				this.scene.fog.color.setHex( fogColor );
				this.scene.fog.near = fogNear;
				this.scene.fog.far = fogFar;
			} else if ( this.scene.fog instanceof THREE.FogExp2 ) {
				this.scene.fog.color.setHex( fogColor );
				this.scene.fog.density = fogDensity;
			}

			this.render();
		});

		this.editor.signals.windowResize.add( () => {

			// TODO: Move this out?

			editor.DEFAULT_CAMERA.aspect = this.container.core.offsetWidth / this.container.core.offsetHeight;
			editor.DEFAULT_CAMERA.updateProjectionMatrix();

			if( this.camera instanceof THREE.PerspectiveCamera ) {
				this.camera.aspect = this.container.core.offsetWidth / this.container.core.offsetHeight;
				this.camera.updateProjectionMatrix();
			}

			if( this.renderer ) {
				this.renderer.setSize( this.container.core.offsetWidth, this.container.core.offsetHeight );
			}

			this.render();
		});

		this.editor.signals.showGridChanged.add( ( showGrid:boolean ) => {
			grid.visible = showGrid;
			this.render();
		});

		requestAnimationFrame( this._animate );
	}


	// [ Protected Variables ]
	protected objectPositionOnDown 		: any;
	protected objectRotationOnDown 		: any;
	protected objectScaleOnDown 		: any;

	protected _raycaster 				: THREE.Raycaster 	= new THREE.Raycaster();
	protected _mouse 					: THREE.Vector2 	= new THREE.Vector2();
	protected _onDownPosition 			: THREE.Vector2 	= new THREE.Vector2();
	protected _onUpPosition 			: THREE.Vector2 	= new THREE.Vector2();
	protected _onDoubleClickPosition 	: THREE.Vector2 	= new THREE.Vector2();
	protected _currentFogType 			: string;

	// [ Proected functions ]

	protected _animate = () => {

		requestAnimationFrame( this._animate );

		if( this.vrEffect && this.vrEffect.isPresenting ) {
			this.render();
		}
	}

	protected render() {

		this.sceneHelpers.updateMatrixWorld(true);
		this.scene.updateMatrixWorld(true);

		if ( this.vrEffect && this.vrEffect.isPresenting ) {

			this.vrControls.update();

			this.camera.updateMatrixWorld(true);

			this.vrEffect.render( this.scene, this.vrCamera );
			this.vrEffect.render( this.sceneHelpers, this.vrCamera );

		} else {

			if( this.renderer ) {
				this.renderer.render( this.scene, this.camera );
				this.renderer.render( this.sceneHelpers, this.camera );
			}
		}
	}


	// [ Proected Events ]

	protected _onHandleClick = () => {

		if( this._onDownPosition.distanceTo( this._onUpPosition ) === 0 ) {
			let intersects = this.getIntersects( this._onUpPosition, this.objects );

			if ( intersects.length > 0 ) {

				let object = intersects[ 0 ].object;

				if ( object.userData.object !== undefined ) {
					this.editor.select( object.userData.object );
				} else {
					this.editor.select( object );
				}

			} else {
				this.editor.select( null );
			}
			this.render();
		}
	}

	protected _onMouseDown = ( event:MouseEvent ) => {

		event.preventDefault();

		let array = this.getMousePosition( this.container.core, event.clientX, event.clientY );
		this._onDownPosition.fromArray( array );

		document.addEventListener( 'mouseup', this._onMouseUp, false );
	}

	protected _onMouseUp = ( event:MouseEvent ) => {

		let array = this.getMousePosition( this.container.core, event.clientX, event.clientY );
		this._onUpPosition.fromArray( array );

		this._onHandleClick();

		document.removeEventListener( 'mouseup', this._onMouseUp, false );
	}

	protected _onTouchStart = ( event:TouchEvent ) => {

		let touch = event.changedTouches[ 0 ];

		let array = this.getMousePosition( this.container.core, touch.clientX, touch.clientY );
		this._onDownPosition.fromArray( array );

		document.addEventListener( 'touchend', this._onTouchEnd, false );

	}

	protected _onTouchEnd = ( event:TouchEvent ) => {

		let touch = event.changedTouches[ 0 ];

		let array = this.getMousePosition( this.container.core, touch.clientX, touch.clientY );
		this._onUpPosition.fromArray( array );

		this._onHandleClick();

		document.removeEventListener( 'touchend', this._onTouchEnd, false );

	}

	protected _onDoubleClick = ( event ) => {

		let array = this.getMousePosition( this.container.core, event.clientX, event.clientY );
		this._onDoubleClickPosition.fromArray( array );

		let intersects = this.getIntersects( this._onDoubleClickPosition, this.objects );

		if( intersects.length > 0 ) {

			let intersect = intersects[ 0 ];

			this.editor.signals.objectFocused.dispatch( intersect.object );
		}
	}
}
