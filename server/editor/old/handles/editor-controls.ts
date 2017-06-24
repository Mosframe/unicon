// -----------------------------------------------------------------------------
// editor-controls.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';

/**
 * editor controls
 *
 * @author qiao ( https://github.com/qiao )
 * @author mrdoob ( http://mrdoob.com )
 * @author alteredq ( http://alteredqualia.com/ )
 * @author WestLangley ( http://github.com/WestLangley )
 * @author mosframe ( https://github.com/mosframe )
 * @export
 * @class EditorControls
 * @extends {THREE.EventDispatcher}
 */
export class EditorControls extends THREE.EventDispatcher {

    // [ Public Variables ]

	/**
	 * enabled
	 *
	 * @protected
	 * @type {boolean}
	 * @memberof EditorControls
	 */
    enabled   : boolean 		= true;
	/**
	 * center vector
	 *
	 * @protected
	 * @type {THREE.Vector3}
	 * @memberof EditorControls
	 */
	center    : THREE.Vector3 	= new THREE.Vector3();

    // [ Public Functions ]

    /**
     * focus
     *
     * @param {THREE.Object3D} target
     *
     * @memberof EditorControls
     */
	focus ( target:THREE.Object3D ) {
		let box = new THREE.Box3().setFromObject( target );
		this._object.lookAt( this.center.copy( box.getCenter() ) );
		this.dispatchEvent( this._changeEvent );
	}
    /**
     * pan
     *
     * @param {THREE.Vector3} delta
     *
     * @memberof EditorControls
     */
	pan ( delta:THREE.Vector3 ) {

		let distance = this._object.position.distanceTo( this.center );

		delta.multiplyScalar( distance * this._panSpeed );
		delta.applyMatrix3( this._normalMatrix.getNormalMatrix( this._object.matrix ) );

		this._object.position.add( delta );
		this.center.add( delta );

		this.dispatchEvent( this._changeEvent );
	}
    /**
     * zoom
     *
     * @param {THREE.Vector3} delta
     * @returns
     *
     * @memberof EditorControls
     */
	zoom ( delta:THREE.Vector3 ) {

		let distance = this._object.position.distanceTo( this.center );

		delta.multiplyScalar( distance * this._zoomSpeed );

		if ( delta.length() > distance ) return;

		delta.applyMatrix3( this._normalMatrix.getNormalMatrix( this._object.matrix ) );

		this._object.position.add( delta );

		this.dispatchEvent( this._changeEvent );
	}
    /**
     * rotate
     *
     * @param {THREE.Vector3} delta
     *
     * @memberof EditorControls
     */
	rotate ( delta:THREE.Vector3 ) {

		this._vector.copy( this._object.position ).sub( this.center );

		this._spherical.setFromVector3( this._vector );

		this._spherical.theta += delta.x;
		this._spherical.phi += delta.y;

		this._spherical.makeSafe();

		this._vector.setFromSpherical( this._spherical );

		this._object.position.copy( this.center ).add( this._vector );

		this._object.lookAt( this.center );

		this.dispatchEvent( this._changeEvent );

	};

    /**
     * dispose
     *
     *
     * @memberof EditorControls
     */
	dispose () {
		this._domElement.removeEventListener( 'contextmenu'  , this._onContextMenu  , false );
		this._domElement.removeEventListener( 'mousedown'    , this._onMouseDown  , false );
		this._domElement.removeEventListener( 'wheel'        , this._onMouseWheel , false );
		this._domElement.removeEventListener( 'mousemove'    , this._onMouseMove  , false );
		this._domElement.removeEventListener( 'mouseup'      , this._onMouseUp    , false );
		this._domElement.removeEventListener( 'mouseout'     , this._onMouseUp    , false );
		this._domElement.removeEventListener( 'dblclick'     , this._onMouseUp    , false );
		this._domElement.removeEventListener( 'touchstart'   , this._onTouchStart   , false );
		this._domElement.removeEventListener( 'touchmove'    , this._onTouchMove    , false );
	}


    // [ Constructors ]

    /**
     * Creates an instance of EditorControls.
     * @param {THREE.Object3D} object
     * @param {Element} domElement
     *
     * @memberof EditorControls
     */
    constructor( object:THREE.Object3D, domElement:Element ) {
        super();
        this._object     = object;
        this._domElement = domElement;

        this._domElement.addEventListener( 'contextmenu' , this._onContextMenu  , false );
        this._domElement.addEventListener( 'mousedown'   , this._onMouseDown  , false );
        this._domElement.addEventListener( 'wheel'       , this._onMouseWheel , false );
        this._domElement.addEventListener( 'touchstart'  , this._onTouchStart   , false );
        this._domElement.addEventListener( 'touchmove'   , this._onTouchMove    , false );
    }

    // [ Protected Variables ]

    protected _object          : THREE.Object3D;
    protected _domElement      : Element;
	protected _panSpeed        = 0.001;
	protected _zoomSpeed       = 0.001;
	protected _rotationSpeed   = 0.005;

	protected _vector          = new THREE.Vector3();
	protected _state           = STATE.NONE;
	protected _normalMatrix    = new THREE.Matrix3();
	protected _pointer         = new THREE.Vector2();
	protected _pointerOld      = new THREE.Vector2();
	protected _spherical       = new THREE.Spherical();
	protected _changeEvent     = { type:'change' };

	protected _touch           = new THREE.Vector3();
	protected _touches         = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	protected _prevTouches     = [ new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3() ];
	protected _prevDistance    : number;

    // [ Events ]

	protected _onMouseDown = ( event:MouseEvent ) => {

		if ( this.enabled === false ) return;

		if ( event.button === 0 ) {

			this._state = STATE.ROTATE;

		} else if ( event.button === 1 ) {

			this._state = STATE.ZOOM;

		} else if ( event.button === 2 ) {

			this._state = STATE.PAN;

		}

		this._pointerOld.set( event.clientX, event.clientY );

		this._domElement.addEventListener( 'mousemove'   , this._onMouseMove   , false );
		this._domElement.addEventListener( 'mouseup'     , this._onMouseUp     , false );
		this._domElement.addEventListener( 'mouseout'    , this._onMouseUp     , false );
		this._domElement.addEventListener( 'dblclick'    , this._onMouseUp     , false );
	}

    protected _onMouseMove = ( event:MouseEvent ) => {

		if ( this.enabled === false ) return;

		this._pointer.set( event.clientX, event.clientY );

		let movementX = this._pointer.x - this._pointerOld.x;
		let movementY = this._pointer.y - this._pointerOld.y;

		if ( this._state === STATE.ROTATE ) {

			this.rotate( new THREE.Vector3( - movementX * this._rotationSpeed, - movementY * this._rotationSpeed, 0 ) );

		} else if ( this._state === STATE.ZOOM ) {

			this.zoom( new THREE.Vector3( 0, 0, movementY ) );

		} else if ( this._state === STATE.PAN ) {

			this.pan( new THREE.Vector3( - movementX, movementY, 0 ) );

		}

		this._pointerOld.set( event.clientX, event.clientY );

	}

	protected _onMouseUp = ( event:MouseEvent ) => {

		this._domElement.removeEventListener( 'mousemove' , this._onMouseMove   , false );
		this._domElement.removeEventListener( 'mouseup'   , this._onMouseUp     , false );
		this._domElement.removeEventListener( 'mouseout'  , this._onMouseUp     , false );
		this._domElement.removeEventListener( 'dblclick'  , this._onMouseUp     , false );

		this._state = STATE.NONE;
	}

	protected _onMouseWheel = ( event:MouseWheelEvent ) => {

		event.preventDefault();

		// if ( this.enabled === false ) return;

		this.zoom( new THREE.Vector3( 0, 0, event.deltaY ) );

	}

	protected _onTouchStart = ( event:TouchEvent ) => {

		if ( this.enabled === false ) return;

		switch ( event.touches.length ) {
        case 1:
            this._touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 );
            this._touches[ 1 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 );
            break;

        case 2:
            this._touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 );
            this._touches[ 1 ].set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY, 0 );
            this._prevDistance = this._touches[ 0 ].distanceTo( this._touches[ 1 ] );
            break;

		}

		this._prevTouches[ 0 ].copy( this._touches[ 0 ] );
		this._prevTouches[ 1 ].copy( this._touches[ 1 ] );
	}

    protected _onTouchMove = ( event:TouchEvent ) => {

		if ( this.enabled === false ) return;

		event.preventDefault();
		event.stopPropagation();

		switch ( event.touches.length ) {

        case 1:
            this._touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 );
            this._touches[ 1 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 );
            this.rotate( this._touches[ 0 ].sub( this._getClosest( this._touches[ 0 ], this._prevTouches ) ).multiplyScalar( - this._rotationSpeed ) );
            break;

        case 2:
            this._touches[ 0 ].set( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY, 0 );
            this._touches[ 1 ].set( event.touches[ 1 ].pageX, event.touches[ 1 ].pageY, 0 );
            let distance = this._touches[ 0 ].distanceTo( this._touches[ 1 ] );
            this.zoom( new THREE.Vector3( 0, 0, this._prevDistance - distance ) );
            this._prevDistance = distance;

            let offset0 = this._touches[ 0 ].clone().sub( this._getClosest( this._touches[ 0 ], this._prevTouches ) );
            let offset1 = this._touches[ 1 ].clone().sub( this._getClosest( this._touches[ 1 ], this._prevTouches ) );
            offset0.x = - offset0.x;
            offset1.x = - offset1.x;

            this.pan( offset0.add( offset1 ).multiplyScalar( 0.5 ) );

            break;
		}

		this._prevTouches[ 0 ].copy( this._touches[ 0 ] );
		this._prevTouches[ 1 ].copy( this._touches[ 1 ] );
	}

	protected _onContextMenu = ( event:Event ) => {
		event.preventDefault();
	}

    protected _getClosest = ( touch:THREE.Vector3, touches:THREE.Vector3[] ) => {

        let closest = touches[ 0 ];

        for ( let i in touches ) {
            if ( closest.distanceTo( touch ) > touches[ i ].distanceTo( touch ) ) closest = touches[ i ];
        }
        return closest;
    }
}

/**
 * editor control state
 *
 * @enum {number}
 */
enum STATE {
    NONE    =-1,
    ROTATE  = 0,
    ZOOM    = 1,
    PAN     = 2,
}
