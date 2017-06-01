// -----------------------------------------------------------------------------
// 006 : Unicon 엔진 클라이언트 첫번째 테스트
// -----------------------------------------------------------------------------

import * as GL            from '../../engine/graphic';
import {OrbitControls   } from '../../editor/orbit-controls';
import {Vector3         } from '../../engine/vector3';
import {Behaviour       } from '../../engine/behaviour';
import {MeshRenderer    } from '../../engine/mesh-renderer';
import {PrimitiveType   } from '../../engine/primitive-type';
import {Camera          } from '../../engine/camera';
import {Light           } from '../../engine/light';
import {GameObject      } from '../../engine/game-object';
import {Renderer        } from '../../engine/renderer';
import {Scene           } from '../../engine/scene';

let Detector        = require('../../lib/three.js/examples/js/Detector'); // @types/three/detactor를 사용하는 방법을 몰라서 추가함
let DatGUI          = require('../../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.


let container = document.createElement( 'div' );
document.body.appendChild( container );

// 브라우저가 WebGL을 지원하지 않으면 메시지 출력
//detectpr.webgl = false; // 테스트
if( !Detector.webgl ) {
    let warning = Detector.getWebGLErrorMessage();
    container.appendChild(warning);
}

/*
    유니티 구조
    Scene
        GameObject
            transform
            camera
            light
            Renderer
            mesh
            component
            script
                GameObject
                    transform
                    camera
                    light
                    Renderer
                    mesh
                    component

    Three 구조

    Scene
        Object3D
            Object3D
                Object3D

    Unicon 구조

    Scene : GL.Scene : GL.Object3D
        GameObject : Transform : GL.Object3D
            Camera : GL.Camera : GL.Object3D
            Transform : GL.Object3D
                Light: GL.Light


    Scene : UObject
        core : GL.Scene : GL.Object3D

        GameObject : UObject

            Transform : Component
                core = GL.Object3D

            Camera : Component
                core : GL.Camera : GL.Object3D

            Light : Component
                core : GL.Light : GL.Object3D


    // Camera = GameObject + Transform + Camera
    // Light  = GameObject + Transform + Light
    //

    Scene : GL.Scene : GL.Object3D

        Transform : GL.Object3D

        Camera : GL.Camera : GL.Object3D
            components

        Light : GL.Light : GL.Object3D
            components

*/


// -----------------------------------------------------------------------------
// SceneView
// -----------------------------------------------------------------------------
class SceneView {
    renderer    : Renderer;
    camera      : Camera;   // editor camera
    light       : Light;    // editor light

    scene       : Scene;    // current scene

    // -------------------------------------------------------------------------
    // constructor
    // -------------------------------------------------------------------------
    constructor() {

        // scene setting
        this.scene = new Scene();

        // renderer setting
        this.renderer = new MeshRenderer( container );
        // camera setting
        this.camera = new Camera(this.scene);
        // light setting
        this.light = new Light(this.scene,this.camera);

        //
        GameObject.createPrimitive( PrimitiveType.cube );
    }

    // -----------------------------------------------------------------------------
    // update
    // -----------------------------------------------------------------------------
    update = () => {
        // -------------------------------------------------------------------------
        // cube animation
        // -------------------------------------------------------------------------
        {
            if( cube.controller ) {
                cube.mesh.rotation.x += cube.controller.rotSpeed.x;
                cube.mesh.rotation.y += cube.controller.rotSpeed.y;
                cube.mesh.rotation.z += cube.controller.rotSpeed.z;
            }
        }
    }

    // -----------------------------------------------------------------------------
    // render
    // -----------------------------------------------------------------------------
    render = () => {
        requestAnimationFrame( this.render );
        this.update();
        this.renderer.render( this.scene, this.camera );
    }

    // -----------------------------------------------------------------------------
    // onRender
    // -----------------------------------------------------------------------------
    onRender = (event:any):void => {
        this.update();
    }

    // -----------------------------------------------------------------------------
    // add : add object to scene
    // -----------------------------------------------------------------------------
    add = (obj:any):void => {
        this.scene.add( obj );
    }
}

// -----------------------------------------------------------------------------
// SceneHelper
// -----------------------------------------------------------------------------
class SceneHelper {
    scene : THREE.Scene;

    // -------------------------------------------------------------------------
    // constructor
    // -------------------------------------------------------------------------
    constructor(sceneView:SceneView) {
        this.scene = sceneView.scene;
        // axis
        {
            let axis = new GL.AxisHelper(10);
            //axis.position.set(-60,0,-60);
            this.scene.add( axis );
        }
        // grids
        {
            // y
            let grid = new GL.GridHelper(100,20,0xffff00,0x000000);
            this.scene.add( grid );
            // z
            //let grid2 = new GL.GridHelper(100,20,0xffff00,0x000000);
            //grid2.rotation.x = -0.5 * Math.PI;
            //this.scene.add( grid2 );
            // x
            //let grid3 = new GL.GridHelper(100,20,0xffff00,0x000000);
            //grid3.rotation.x = -0.5 * Math.PI;
            //grid3.rotation.z = -0.5 * Math.PI;
            //this.scene.add( grid3 );
        }
        // camera controll
        {
            let cameraControls = new OrbitControls( sceneView.camera, sceneView.renderer.core.domElement );
            cameraControls.mouseButtons.PAN = GL.MOUSE.MIDDLE;
            cameraControls.mouseButtons.ZOOM = GL.MOUSE.RIGHT;
            cameraControls.addEventListener( 'change', sceneView.onRender );
        }
    }
}



let sceneView   = new SceneView();
let sceneHelper = new SceneHelper(sceneView);




// -----------------------------------------------------------------------------
// line 생성
// -----------------------------------------------------------------------------
/*
{
    // 메터리얼 생성
    let material = new GL.LineBasicMaterial( {color:0xff00ff} );
    let geometry = new GL.Geometry();
    geometry.vertices.push( new GL.Vector3(-10,  0,  0) );
    geometry.vertices.push( new GL.Vector3(  0, 10,  0) );
    geometry.vertices.push( new GL.Vector3( 10,  0,  0) );
    var line = new GL.Line(geometry, material);
    scene.add(line);
}
*/


// -----------------------------------------------------------------------------
// Component : Controller
// -----------------------------------------------------------------------------
class Controller {
    rotSpeed:Vector3;
    constructor() {
        this.rotSpeed = new Vector3();
        this.rotSpeed.x = 0.1;
        this.rotSpeed.y = 0.1;
        this.rotSpeed.z = 0.1;
    }
}
// -----------------------------------------------------------------------------
// plane
// -----------------------------------------------------------------------------
class Shape extends Behaviour {
    mesh : THREE.Mesh;

    constructor() {
        super();
    }
}

class Plane extends Shape {

    constructor() {
        super();

        let geometry    = new GL.PlaneGeometry( 30, 30, 30 );
        let material    = new GL.MeshLambertMaterial({color:0xffffff});
        this.mesh       = new GL.Mesh( geometry, material );
        this.mesh.rotation.x = -0.5 * Math.PI;
        this.mesh.receiveShadow = true;
        sceneView.add( this.mesh );
    }
}

let plane = new Plane();


// -----------------------------------------------------------------------------
// cube
// -----------------------------------------------------------------------------
class Cube extends Shape {

    controller : Controller;

    constructor() {
        super();

        let geometry    = new GL.BoxGeometry( 5, 5, 5 );
        let material    = new GL.MeshLambertMaterial({color:0xff3300});
        this.mesh       = new GL.Mesh( geometry, material );
        this.mesh.position.x = 2.5;
        this.mesh.position.y = 2.5;
        this.mesh.position.z = 2.5;
        this.mesh.castShadow = true;
        sceneView.add( this.mesh );

        this.controller = new Controller();
    }
}

let cube = new Cube();

// -----------------------------------------------------------------------------
// cube 생성
// -----------------------------------------------------------------------------
/*
{
    let geometry = new GL.BoxGeometry( 1, 1, 1 );

    let texture = new GL.TextureLoader().load( "./textures/000.jpg" );
    texture.wrapS = GL.RepeatWrapping;
    texture.wrapT = GL.RepeatWrapping;
    texture.repeat.set( 1, 1 );

    let material = new GL.MeshLambertMaterial({color:0xff3300});
    //let material = new GL.MeshBasicMaterial({color: 0xffffff, map: texture});

    var cube = new GL.Mesh( geometry, material );
    cube.position.x = 5.5;
    cube.position.y = 2.5;
    cube.position.z = 2.5;
    frame.add( cube );
}
*/



sceneView.render();


// -----------------------------------------------------------------------------
// GUI
// -----------------------------------------------------------------------------
let gui = new DatGUI.GUI({
    width :300
});
//gui.remember(component); // 저장이 필요할때만 사용
let transfrom = gui.addFolder('Controller');
    let rotation = transfrom.addFolder('Rot Speed');
    rotation.add(cube.controller.rotSpeed, 'x',0,1);
    rotation.add(cube.controller.rotSpeed, 'y',0,1);
    rotation.add(cube.controller.rotSpeed, 'z',0,1);
    rotation.open();
transfrom.open();
