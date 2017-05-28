// -----------------------------------------------------------------------------
// 005 : 에니메이션 컨트롤
// -----------------------------------------------------------------------------
////<reference path="../../../node_modules/@types/three/index.d.ts"/>
import * as THREE from 'three';

//let THREE       = require('../../lib/three.js/build/three');
let Detector    = require('../../lib/three.js/examples/js/Detector');
let DatGUI      = require('../../lib/dat.gui/build/dat.gui'); // 주의 : 현재 npm에 0.6.1버전은 문제가 있다.

let container = document.createElement( 'div' );
document.body.appendChild( container );

// 브라우저가 WebGL을 지원하지 않으면 메시지 출력
//detectpr.webgl = false; // 테스트
if( !Detector.webgl ) {
    let warning = Detector.getWebGLErrorMessage();
    container.appendChild(warning);
}

/**
 * Bit mask that controls object destruction, saving and visibility in inspectors.
 *
 * @enum {number}
 */
enum HideFlags {
    /**
     * A normal, visible object. This is the default.
     */
    None,
    /**
     * The object will not appear in the hierarchy.
     */
    HideInHierarchy,
    /**
     * It is not possible to view it in the inspector.
     */
    HideInInspector,
    /**
     * The object will not be saved to the scene in the editor.
     */
    DontSaveInEditor,
    /**
     * The object is not be editable in the inspector.
     */
    NotEditable,
    /**
     * The object will not be saved when building a player.
     */
    DontSaveInBuild,
    /**
     * The object will not be unloaded by Resources.UnloadUnusedAssets.
     */
    DontUnloadUnusedAsset,
    /**
     * The object will not be saved to the scene. It will not be destroyed when a new scene is loaded. It is a shortcut for HideFlags.DontSaveInBuild | HideFlags.DontSaveInEditor | HideFlags.DontUnloadUnusedAsset.
     */
    DontSave,
    /**
     * A combination of not shown in the hierarchy, not saved to to scenes and not unloaded by The object will not be unloaded by Resources.UnloadUnusedAssets.
     */
    HideAndDontSave,
}

// -----------------------------------------------------------------------------
// Object
// -----------------------------------------------------------------------------
class Object {
    hideFlags : HideFlags;
    name : string;

}

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
class Component extends Object {

}

// -----------------------------------------------------------------------------
// Behavior
// -----------------------------------------------------------------------------
class Behavior extends Component {

}
// -----------------------------------------------------------------------------
// GameObject
// -----------------------------------------------------------------------------
class GameObject {

}


// -----------------------------------------------------------------------------
// Scene
// -----------------------------------------------------------------------------
class Scene {
    renderer    : THREE.WebGLRenderer;
    scene       : THREE.Scene;
    cameras     : {[id:string]:THREE.Camera};
    lights      : {[id:string]:THREE.Light};

    // -------------------------------------------------------------------------
    // constructor
    // -------------------------------------------------------------------------
    constructor() {
        // renderer setting
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.renderer.setClearColor(0xdddddd);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFShadowMap;
        container.appendChild( this.renderer.domElement );
        // scene setting
        this.scene = new THREE.Scene();
        // camera setting
        let cameraOption = {
            fov     : 45,
            aspect  : window.innerWidth / window.innerHeight,
            near    : 0.1,
            far     : 1000,
        }
        let camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, 0.1, 1000 );
        camera.position.set( 40, 40, 40);
        //camera.lookAt( new THREE.Vector3(0,0,0) );
        camera.lookAt( this.scene.position );
        this.cameras.main = camera;
        // -----------------------------------------------------------------------------
        // 라이트 설정
        // -----------------------------------------------------------------------------
        {
            let light = new THREE.SpotLight(0xffffff);
            light.castShadow = true;
            light.position.set(15,30,50);
            if( light.shadow.camera.type === typeof(THREE.PerspectiveCamera) ) {
                if( scene.cameras.main.type === typeof(THREE.PerspectiveCamera) ) {
                    (<THREE.PerspectiveCamera>light.shadow.camera).fov = (<THREE.PerspectiveCamera>scene.cameras.main).fov;
                }
            }
            light.shadow.bias = 0.0001;
            light.shadow.mapSize.width = 2048;
            light.shadow.mapSize.height = 2048;
            scene.add(light);
        }
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
                cube.rotation.x += cube.controller.rotSpeed.x;
                cube.rotation.y += cube.controller.rotSpeed.y;
                cube.rotation.z += cube.controller.rotSpeed.z;
            }
        }
    }

    // -----------------------------------------------------------------------------
    // render
    // -----------------------------------------------------------------------------
    render = () => {
        requestAnimationFrame( this.render );
        this.update();
        this.renderer.render( this.scene, this.cameras.main );
    }

    // -----------------------------------------------------------------------------
    // onRender
    // -----------------------------------------------------------------------------
    onRender = (event:any):void => {
        this.render();
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
    constructor(scene:Scene) {
        this.scene = scene.scene;
        // axis
        {
            let axis = new THREE.AxisHelper(10);
            //axis.position.set(-60,0,-60);
            this.scene.add( axis );
        }
        // grids
        {
            // y
            let grid = new THREE.GridHelper(100,20,0xffff00,0x000000);
            this.scene.add( grid );
            // z
            //let grid2 = new THREE.GridHelper(100,20,0xffff00,0x000000);
            //grid2.rotation.x = -0.5 * Math.PI;
            //this.scene.add( grid2 );
            // x
            //let grid3 = new THREE.GridHelper(100,20,0xffff00,0x000000);
            //grid3.rotation.x = -0.5 * Math.PI;
            //grid3.rotation.z = -0.5 * Math.PI;
            //this.scene.add( grid3 );
        }
        // camera controll
        {
            let cameraControls = new THREE.OrbitControls( scene.cameras.main, scene.renderer.domElement );
            cameraControls.addEventListener( 'change', scene.render );
        }
    }
}


let scene       = new Scene();
let sceneHelper = new SceneHelper(scene);




// -----------------------------------------------------------------------------
// line 생성
// -----------------------------------------------------------------------------
/*
{
    // 메터리얼 생성
    let material = new THREE.LineBasicMaterial( {color:0xff00ff} );
    let geometry = new THREE.Geometry();
    geometry.vertices.push( new THREE.Vector3(-10,  0,  0) );
    geometry.vertices.push( new THREE.Vector3(  0, 10,  0) );
    geometry.vertices.push( new THREE.Vector3( 10,  0,  0) );
    var line = new THREE.Line(geometry, material);
    scene.add(line);
}
*/
// -----------------------------------------------------------------------------
// plane
// -----------------------------------------------------------------------------
{
    let geometry    = new THREE.PlaneGeometry( 30, 30, 30 );
    let material    = new THREE.MeshLambertMaterial({color:0xffffff});
    var mesh        = new THREE.Mesh( geometry, material );

    mesh.rotation.x = -0.5 * Math.PI;
    mesh.receiveShadow = true;

    scene.add( mesh );
}

// -----------------------------------------------------------------------------
// cube
// -----------------------------------------------------------------------------
var cube:any;
{
    let geometry    = new THREE.BoxGeometry( 5, 5, 5 );
    let material    = new THREE.MeshLambertMaterial({color:0xff3300});
    var mesh        = new THREE.Mesh( geometry, material );
    mesh.position.x = 2.5;
    mesh.position.y = 2.5;
    mesh.position.z = 2.5;
    mesh.castShadow = true;
    scene.add( mesh );
    cube = mesh;
}

// -----------------------------------------------------------------------------
// cube 생성
// -----------------------------------------------------------------------------
/*
{
    let geometry = new THREE.BoxGeometry( 1, 1, 1 );

    let texture = new THREE.TextureLoader().load( "./textures/000.jpg" );
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 1, 1 );

    let material = new THREE.MeshLambertMaterial({color:0xff3300});
    //let material = new THREE.MeshBasicMaterial({color: 0xffffff, map: texture});

    var cube = new THREE.Mesh( geometry, material );
    cube.position.x = 5.5;
    cube.position.y = 2.5;
    cube.position.z = 2.5;
    scene.add( cube );
}
*/



scene.render();


// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------
class Vector3 {
    x:number;
    y:number;
    z:number;
}
interface Component {

}
// -----------------------------------------------------------------------------
// Component : Controller
// -----------------------------------------------------------------------------
class Controller implements Component {
    rotSpeed:Vector3;
    constructor() {
        this.rotSpeed = new Vector3();
        this.rotSpeed.x = 0.1;
        this.rotSpeed.y = 0.1;
        this.rotSpeed.z = 0.1;
    }
}
cube.controller = new Controller();

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
