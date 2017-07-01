// -----------------------------------------------------------------------------
// unicon.ts
// -----------------------------------------------------------------------------
import * as THREE from 'three';
import { OrbitControls  } from 'three-orbitcontrols-ts';
import { Global         } from '../engine/global';
import { GameObject     } from '../engine/game-object';
import { Inspector      } from '../editor/inspector';

/**
 * Unicon
 *
 * @author mosframe / https://github.com/mosframe
 * @export
 * @class Unicon
 */
export class Unicon {

    // [ Public Properties ]

    container       : HTMLDivElement;
    renderer        : THREE.WebGLRenderer;
    scene           : THREE.Scene;
    camera          : THREE.PerspectiveCamera;
    axisHelper      : THREE.AxisHelper;
    gridHelper      : THREE.GridHelper;
    lights          : {[name:string]:THREE.Light} = {};
    orbitControls   : OrbitControls;
    inspector       : Inspector;

    // [ Public Functions ]

    constructor() {

        // [ setting Global properties  ]

        // [ creae div element ]
        this.container = document.createElement( 'div' );
        document.body.appendChild( this.container );

        // [ creae WebGL ]
        let detector = require('../lib/three.js/examples/js/Detector');
        if( !detector.webgl ) {
            let warning = detector.getWebGLErrorMessage();
            this.container.appendChild(warning);
            return;
        }

        // [ creae Renderer ]
        this.renderer = new THREE.WebGLRenderer( {antialias:true} );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0xdddddd);
        this.renderer.shadowMap.enabled  = true;
        this.renderer.shadowMap.type     = THREE.PCFSoftShadowMap;
        this.container.appendChild( this.renderer.domElement );

        // [ creae Scene ]
        this.scene = new THREE.Scene();

        // [ creae Main Camera ]
        {
            let options = {
                fov     : 45,
                aspect  : window.innerWidth / window.innerHeight,
                near    : 0.1,
                far     : 500,
            }
            this.camera = new THREE.PerspectiveCamera( options.fov, options.aspect, options.near, options.far );
            this.camera.position.set( 40, 40, 40);
            //this.camera.lookAt( new THREE.Vector3(0,0,0) );
            this.camera.lookAt( this.scene.position );
        }

        // [ creae Axis Helper ]
        this.axisHelper = new THREE.AxisHelper(10);
        //axisHelper.position.set(-60,0,-60);
        this.scene.add( this.axisHelper );

        // [ creae Grid Helper ]
        this.gridHelper = new THREE.GridHelper(100,20,0xffff00,0x000000);
        this.scene.add( this.gridHelper );

        // [ creae Spot Light ]
        let light = new THREE.SpotLight(0xffffff);
        light.castShadow = true;
        light.position.set(15,30,50);
        this.scene.add(light);
        this.lights.spot = light;

        // [ creae Plane Meth ]
        {
            let geometry        = new THREE.PlaneGeometry( 30, 30, 30 );
            let material        = new THREE.MeshLambertMaterial({color:0xffffff});
            let mesh            = new THREE.Mesh( geometry, material );
            mesh.name           = "Plane";
            mesh.rotation.x     = -0.5 * Math.PI;
            mesh.receiveShadow  = true;
            this.scene.add( mesh );
        }

        // [ creae Cube Meth ]
        {
            let geometry    = new THREE.BoxGeometry( 5, 5, 5 );
            let texture     = new THREE.TextureLoader().load( "./textures/texture-001.jpg" );
            texture.wrapS   = THREE.RepeatWrapping;
            texture.wrapT   = THREE.RepeatWrapping;
            texture.repeat.set( 1, 1 );
            let material    = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});
            //let material  = new THREE.MeshLambertMaterial({color:0xff3300});
            let mesh        = new THREE.Mesh( geometry, material );
            mesh.name       = "Cube";
            mesh.position.x = 2.5;
            mesh.position.y = 2.5;
            mesh.position.z = 2.5;
            mesh.castShadow = true;
            this.scene.add( mesh );
        }

        // [ create Orbit Controls ]
        {
            this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );
            this.orbitControls.addEventListener( 'change', this.onRender );
        }

        // [ create Inspector ]
        {
            this.inspector = new Inspector();

            this.inspector.target = this.scene.getObjectByName("Plane");
            this.inspector.target = this.scene.getObjectByName("Cube");
            this.inspector.target = null;
        }

        this.isCreated = true;
    }


    run() {
        this.tick();
    }


    // [ Protected Members ]

    isCreated : boolean = false;

    tick = () => {
        requestAnimationFrame( this.tick );
        this.update();
        this.renderer.render( this.scene, this.camera );
    }

    reset() {
    }

    start() {
    }

    update () {
    }

    render () {
    }

    onRender() {
    }

}