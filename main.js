import * as THREE from "three";
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import {CreateSun} from './PlanetCluster.js'
import {RenderPass} from 'jsm/postprocessing/RenderPass.js';
import {EffectComposer} from 'jsm/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from 'jsm/postprocessing/UnrealBloomPass.js';

const w=window.innerWidth;
const h=window.innerHeight;
const renderer=new THREE.WebGLRenderer({antialias: true});
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);


const fov=75;
const aspect=w/h;
const near=0.1;
const far=100;
const camera=new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=2;
new OrbitControls(camera, renderer.domElement);
const scene=new THREE.Scene();

const renderScene= new RenderPass(scene, camera);
const composer=new EffectComposer(renderer);
composer.addPass(renderScene);
const bloomPass=new UnrealBloomPass(
    new THREE.Vector2(w,h),
    1.6,
    0.1,
    0.5
);
composer.addPass(bloomPass)

renderer.toneMapping=THREE.LinearToneMapping;
renderer.toneMappingExposure=3;
// const geo=new THREE.IcosahedronGeometry(1.0, 2);
// const mat=new THREE.MeshStandardMaterial({
//     color:0xffffff,
//     flatShading: true
// })
const mesh=CreateSun().mesh;
scene.add(mesh);

const newsun=CreateSun()
newsun.mesh.position.set(1.0,1.0,1.0);
scene.add(newsun.mesh)

const light=new THREE.AmbientLight(0xffffff, 2.0);
scene.add(light);

const dirlight=new THREE.DirectionalLight(0xffffff, 1.0);
scene.add(dirlight)

function animate(){
//==================================================================================
    mesh.rotateY(0.01);





//==================================================================================
    //renderer.render(scene, camera);
    composer.render();
    requestAnimationFrame(animate);

}

animate();
