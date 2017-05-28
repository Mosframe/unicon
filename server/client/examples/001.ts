// -----------------------------------------------------------------------------
// 001 : 간단한 씬구성
// -----------------------------------------------------------------------------

let THREE       = require('../../lib/three.js/build/three');
let Detector    = require('../../lib/three.js/examples/js/Detector');

var container = document.createElement( 'div' );
document.body.appendChild( container );

// 브라우저가 WebGL을 지원하지 않으면 메시지 출력
//detectpr.webgl = false; // 테스트
if( !Detector.webgl ) {
    var warning = Detector.getWebGLErrorMessage();
    container.appendChild(warning);
}

// -----------------------------------------------------------------------------
// 렌더러 설정
// -----------------------------------------------------------------------------
let renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor(0xdddddd);
renderer.shadowMap.enabled = true;
renderer.shadowMapSoft = true;
container.appendChild( renderer.domElement );

// -----------------------------------------------------------------------------
// 씬 설정
// -----------------------------------------------------------------------------
var scene = new THREE.Scene();

// -----------------------------------------------------------------------------
// 카메라 설정
// -----------------------------------------------------------------------------
let cameraOption = {
    fov     : 45,
    aspect  : window.innerWidth / window.innerHeight,
    near    : 0.1,
    far     : 1000,
}
let camera = new THREE.PerspectiveCamera(
    cameraOption.fov,
    cameraOption.aspect,
    cameraOption.near,
    cameraOption.far );

camera.position.set( 40, 40, 40);
//camera.lookAt( new THREE.Vector3(0,0,0) );
camera.lookAt( scene.position );

// -----------------------------------------------------------------------------
// 헬퍼 설정
// -----------------------------------------------------------------------------
// 좌표축
{
    let axis = new THREE.AxisHelper(10);
    //axis.position.set(-60,0,-60);
    scene.add( axis );
}
// 그리드
{
    // y
    let grid = new THREE.GridHelper(100,20,0xffff00,0x000000);
    scene.add( grid );
    // z
    //let grid2 = new THREE.GridHelper(100,20,0xffff00,0x000000);
    //grid2.rotation.x = -0.5 * Math.PI;
    //scene.add( grid2 );
    // x
    //let grid3 = new THREE.GridHelper(100,20,0xffff00,0x000000);
    //grid3.rotation.x = -0.5 * Math.PI;
    //grid3.rotation.z = -0.5 * Math.PI;
    //scene.add( grid3 );
}

// -----------------------------------------------------------------------------
// 라이트 설정
// -----------------------------------------------------------------------------
{
    var light = new THREE.SpotLight(0xffffff);
    light.castShadow = true;
    light.position.set(15,30,50);
    scene.add(light);
}

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

// -----------------------------------------------------------------------------
// update
// -----------------------------------------------------------------------------
let update = () => {
    // -------------------------------------------------------------------------
    // 큐브 에니메이션
    // -------------------------------------------------------------------------
    {
        //cube.rotation.x += 0.1;
        cube.rotation.y += 0.1;
        //cube.rotation.z += 0.1;
    }
}

// 렌더링
let render = () => {
    requestAnimationFrame( render );
    update();
    renderer.render( scene, camera );
}

render();


