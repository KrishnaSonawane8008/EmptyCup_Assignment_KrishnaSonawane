import * as THREE from "three";
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import {CreateSun, CreateEarthandMoon, CreateMercury} from './PlanetCluster.js'
import {RenderPass} from 'jsm/postprocessing/RenderPass.js';
import {EffectComposer} from 'jsm/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from 'jsm/postprocessing/UnrealBloomPass.js';
// import {GUI} from ''

const w=window.innerWidth;
const h=window.innerHeight;
const renderer=new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled=true;
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);


const fov=75;
const aspect=w/h;
const near=0.1;
const far=100;
const camera=new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=1;
camera.position.y=25;
const controls=new OrbitControls(camera, renderer.domElement);
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

//=========================Planets===================================
const SunMesh=CreateSun(4).mesh;
scene.add(SunMesh);

const Earth_Moon_Orbit=CreateEarthandMoon(15, 2)
const moon_orbit=Earth_Moon_Orbit.getObjectByName("MoonOrbit")
scene.add(Earth_Moon_Orbit)

const Mercury_Orbit=CreateMercury(10)
scene.add(Mercury_Orbit)
//=========================Planets===================================

// const light=new THREE.AmbientLight(0xffffff, 0.1);
// scene.add(light);


const pointlight=new THREE.PointLight(0xffffff, 100.0);
scene.add(pointlight)

function animate(){
//==================================================================================
    SunMesh.rotateY(-0.01);
    Earth_Moon_Orbit.rotateY(-0.01)
    moon_orbit.rotateY(0.04)
    Mercury_Orbit.rotateY(-0.02)



//==================================================================================
    //renderer.render(scene, camera);
    composer.render();
    requestAnimationFrame(animate);

}

animate();
