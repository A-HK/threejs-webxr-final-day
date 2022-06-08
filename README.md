# threejs-webxr-final-day

`index.ts`
```
function initializeXRApp() {
  // TODO: Initialize XR features.
  const { devicePixelRatio, innerHeight, innerWidth } = window;
  
  // Create a new WebGL renderer and set the size + pixel ratio.
  const renderer = new WebGLRenderer({ antialias: true, alpha: true })
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(devicePixelRatio);
  
  // Enable XR functionality on the renderer.
  renderer.xr.enabled = true;

  // Add it to the DOM.
  document.body.appendChild( renderer.domElement );

  // Create the AR button element, configure our XR session, and append it to the DOM.
  document.body.appendChild(ARButton.createButton(
    renderer,
    { requiredFeatures: ["hit-test"] },
  ));

  // Pass the renderer to the createScene-funtion.
  createScene(renderer);

  // Display a welcome message to the user.
  displayIntroductionMessage();
};
```

```
async function start() {
    // Check if browser supports WebXR with "immersive-ar".
    const immersiveArSupported = await browserHasImmersiveArCompatibility();
  
    // Initialize app if supported.
    immersiveArSupported ?
      initializeXRApp() : 
      displayUnsupportedBrowserMessage();
}
```


`scene.ts`
```
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
```
