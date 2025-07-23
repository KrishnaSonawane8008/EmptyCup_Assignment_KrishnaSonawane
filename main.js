import * as THREE from "three";
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import {CreateSun, CreateEarthandMoon, CreateMercury, CreateVenus, CreateMars, CreateJupiter, CreateSaturn, CreateNeptune} from './PlanetCluster.js'
import {RenderPass} from 'jsm/postprocessing/RenderPass.js';
import {EffectComposer} from 'jsm/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from 'jsm/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'jsm/postprocessing/OutputPass.js';
import {ShaderPass} from 'jsm/postprocessing/ShaderPass.js';
import datGui from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/+esm'

const w=window.innerWidth;
const h=window.innerHeight;
const renderer=new THREE.WebGLRenderer({antialias: true});
// renderer.shadowMap.enabled=true;
renderer.setSize(w,h);
document.body.appendChild(renderer.domElement);


const fov=75;
const aspect=w/h;
const near=0.1;
const far=500;
const camera=new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z=1;
camera.position.y=50;
const controls=new OrbitControls(camera, renderer.domElement);
const scene=new THREE.Scene();

const renderScene= new RenderPass(scene, camera);
const BloomComposer=new EffectComposer(renderer);

const bloomPass=new UnrealBloomPass(
    new THREE.Vector2(window.innerWidth,window.innerHeight),
    1.6,
    0.1,
    0.1
);

renderer.toneMapping=THREE.LinearToneMapping;
renderer.toneMappingExposure=3;
renderer.outputColorSpace = THREE.SRGBColorSpace;


BloomComposer.addPass(renderScene);
BloomComposer.addPass(bloomPass)
bloomPass.strength = 1.5;
bloomPass.radius = 0.7;
bloomPass.threshold = 0.003;

BloomComposer.renderToScreen=false;

const mixPass=new ShaderPass(
    new THREE.ShaderMaterial({
        uniforms: {
            baseTexture: {value: null},
            bloomTexture: {value: BloomComposer.renderTarget2.texture}
        },
        vertexShader: document.getElementById('VertexShader').textContent,
        fragmentShader: document.getElementById('FragmentShader').textContent
    }), 'baseTexture'

);

const gui= new datGui.GUI();

const finalComposer = new EffectComposer(renderer);
finalComposer.addPass(renderScene);
finalComposer.addPass(mixPass);

const outputpass=new OutputPass();
finalComposer.addPass(outputpass)

const BLOOM_SCENE=1;
const bloomLayer=new THREE.Layers();
bloomLayer.set(BLOOM_SCENE);
const darkMaterial= new THREE.MeshBasicMaterial({color:0x000000});
const materials={};

function nonBloomed(obj){
    if(obj.isMesh && bloomLayer.test(obj.layers)==false){
        materials[obj.uuid]=obj.material;
        obj.material=darkMaterial;
    }
}

function restoreMaterial(obj){
    if(materials[obj.uuid]){
        obj.material=materials[obj.uuid];
        delete materials[obj.uuid];
    }
}


const ambientlight=new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientlight)
const pointlight=new THREE.PointLight(0xffffff, 100);
scene.add(pointlight)

//=========================Planets===================================
const SunMesh=CreateSun(4);
scene.add(SunMesh);

const Mercury_Orbit=CreateMercury(10)
scene.add(Mercury_Orbit)

const Venus_Orbit=CreateVenus(15)
scene.add(Venus_Orbit)

const Earth_Moon_Orbit=CreateEarthandMoon(20, 2)
const moon_orbit=Earth_Moon_Orbit.getObjectByName("MoonOrbit")
scene.add(Earth_Moon_Orbit)

const Mars_Orbit=CreateMars(25)
scene.add(Mars_Orbit)

const Jupiter_Orbit=CreateJupiter(30)
scene.add(Jupiter_Orbit)

const Saturn_Orbit=CreateSaturn(35)
scene.add(Saturn_Orbit)

const Neptune_Orbit=CreateNeptune(40)
scene.add(Neptune_Orbit)
//=========================Planets===================================



// const pointlight=new THREE.PointLight(0xffffff, 100.0);
// scene.add(pointlight)

// const pointlight2=new THREE.PointLight(0xffffff, 1.0);
// pointlight2.position.set(0,10,0)
// scene.add(pointlight2)
let runonce=true
camera.layers.enableAll()
function animate(){
    
//==================================================================================
    SunMesh.rotateY(-0.01);
    Earth_Moon_Orbit.rotateY(-0.01)
    moon_orbit.rotateY(0.04)
    Mercury_Orbit.rotateY(-0.025)
    Venus_Orbit.rotateY(-0.02)
    Mars_Orbit.rotateY(-0.005)
    Jupiter_Orbit.rotateY(-0.003)
    Saturn_Orbit.rotateY(-0.013)
    Neptune_Orbit.rotateY(-0.001)


//==================================================================================
    scene.traverse(nonBloomed);

    //renderer.render(scene, camera);
    BloomComposer.render();

    scene.traverse(restoreMaterial);

    SunMesh.traverse((obj)=>{
            obj.layers.set(BLOOM_SCENE)
    })
    
    finalComposer.render();
    

    requestAnimationFrame(animate);
    
}

animate();


window.addEventListener("resize", function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    BloomComposer.setSize(window.innerWidth, window.innerHeight);
    finalComposer.setSize(window.innerWidth, window.innerHeight);

});
