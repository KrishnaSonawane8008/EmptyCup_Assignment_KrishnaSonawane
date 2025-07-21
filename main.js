import * as THREE from "three";
import {OrbitControls} from 'jsm/controls/OrbitControls.js';

const w=window.innerWidth;
const h=window.innerHeight;
const renderer=new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);



const fov=75;
const aspect=w/h;
const near=0.1;
const far=10;
const camera=new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=2;
new OrbitControls(camera, renderer.domElement);
const scene=new THREE.Scene();

const geo=new THREE.IcosahedronGeometry(1.0, 2);
const mat=new THREE.MeshStandardMaterial({
    color:0xffffff,
    flatShading: true
})
const mesh=new THREE.Mesh(geo, mat);
scene.add(mesh);



const light=new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

const dirlight=new THREE.DirectionalLight(0xffffff, 1.0);
scene.add(dirlight)

function animate(){
    requestAnimationFrame(animate);

    mesh.rotateY(0.01);

    renderer.render(scene, camera);
}

animate();
