import { createPlaneMarker } from "./objects/PlaneMarker";
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { handleXRHitTest } from "./utils/hitTest";
import * as THREE from "three";

export function createScene(renderer: THREE.WebGLRenderer) {
  // TODO: Create a scene and build a WebXR app!
  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.02,
    20,
  )

  const boxGeometry = new THREE.BoxGeometry(0.7, 0.7, 0.7);
  var boxMaterial = new THREE.MeshNormalMaterial();
  const box = new THREE.Mesh(boxGeometry, boxMaterial);
  box.position.z = -3;

  scene.add(box);

  var geometry = new THREE.TorusGeometry( 3, 0.5, 16, 100 )
 var material = new THREE.MeshBasicMaterial( {
   color: "#dadada", wireframe: true, transparent: true
 })
 var wireframeCube = new THREE.Mesh ( geometry, material )
 wireframeCube.position.z = -6;
 scene.add( wireframeCube )



  const renderLoop = (timestamp: number, frame?: THREE.XRFrame) => {
    // Rotate box
    box.rotation.y += 0.01;
    box.rotation.x += 0.01;
    wireframeCube.rotation.x -= 0.01;
   wireframeCube.rotation.y -= 0.01;

    if (renderer.xr.isPresenting) {
      renderer.render(scene, camera);
    }
  }
  
  renderer.setAnimationLoop(renderLoop);
}
