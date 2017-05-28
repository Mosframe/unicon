// -----------------------------------------------------------------------------
// 004 : 모델링 임포트 테스트
// -----------------------------------------------------------------------------
let THREE = require('../../lib/three.js/build/three');

var width = window.innerWidth;
var height = window.innerHeight;
var clock = new THREE.Clock();
var scene:any;
var camera:any;
var renderer:any;
var ambientLight:any;
var loader:any;
var mesh = new THREE.Object3D();
var directionalLight:any;

scene = new THREE.Scene;

camera = new THREE.PerspectiveCamera( 40, width / height, 1, 1000 );
camera.position.set( 0, 1, 20 );

renderer = new THREE.WebGLRenderer( { antialias:true } );
renderer.setSize( width, height );
document.body.appendChild( renderer.domElement );

ambientLight = new THREE.AmbientLight( 0xffffff );
scene.add( ambientLight );

directionalLight = new THREE.DirectionalLight( 0xffffff );
directionalLight.position.set( 0, 1, 0 );
scene.add( directionalLight );

scene.add( new THREE.GridHelper( 10, 1 ) );

loader = new THREE.JSONLoader();
loader.load( 'test02.json', function(geometry:any, materials:any) {

    console.log( {geometry} );
    mesh = new THREE.Mesh( geometry, new THREE.MeshFaceMaterial( materials ));
    scene.add( mesh );
});

( function renderLoop() {
    requestAnimationFrame( renderLoop );
    var elapsed = clock.getElapsedTime();
    mesh.rotation.y = elapsed / 2;
    renderer.render( scene, camera );
})();
