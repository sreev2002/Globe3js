import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";
import getStarfield from "./src/getStarfield.js";
// Setup scene, camera, and renderer

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true , bloom : true });  // Corrected to WebGLRenderer
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//Create a constructor /grp for earth so that we can pass values to it
const earthGroup = new THREE.Group();
//earthGroup.rotation.z = -23.4 * Math.PI / 180 ;


// Camera settings
const fov = 75;
const aspect = w / h;

const camera = new THREE.PerspectiveCamera(fov, aspect);
camera.position.z = 2;  // Corrected position property typo

// Scene
const scene = new THREE.Scene();

//OrbitControls for the scene
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true ;
controls.dampingFactor = 0.03;

const loader = new THREE.TextureLoader();

// to create  mesh you need geo and texture
const geo = new THREE.IcosahedronGeometry(1.0,12);
const mat = new THREE.MeshStandardMaterial({
    map: loader.load("./textures/earthmap1k.jpg")
});
const earthMesh = new THREE.Mesh(geo, mat);
scene.add(earthMesh);
// Render the scene with the camera
//

const lightsMat = new THREE.MeshBasicMaterial({
    map: loader.load("./textures/earthlights1k.jpg"),
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending
});

const lightsMesh = new THREE.Mesh(geo, lightsMat);
earthGroup.add(lightsMesh);


const stars = getStarfield({numStars: 5000});
scene.add(stars);



//



//wrap the renderer in a function to recall

//const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444)
//hemiLight.intensity = 2;
//scene.add(hemiLight);

scene.add(earthGroup);

const sunLight = new THREE.DirectionalLight(0xffffff);
sunLight.position.set(-2,0.5,1.5)
scene.add(sunLight);


function animate(){
    requestAnimationFrame(animate);
    lightsMesh.rotation.y += 0.002 ;
    earthMesh.rotation.y += 0.002 ;
    renderer.render(scene, camera);
    controls.update();  //Updates the controls every frame
}

animate(); 

