// -----------------------------------------------------------------------------
// 007 :
// -----------------------------------------------------------------------------
import * as THREE from 'three';

let geometry    = new THREE.CubeGeometry(1,1,1);
let material    = new THREE.MeshNormalMaterial();
let meth        = new THREE.Mesh(geometry, material);
let scene       = new THREE.Scene();
scene.add(meth);