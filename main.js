import * as THREE from "three";
import {OrbitControls} from 'jsm/controls/OrbitControls.js';
import {CreateSun, CreateEarthandMoon, CreateMercury, CreateVenus, CreateMars, CreateJupiter, CreateSaturn, CreateUranus,CreateNeptune} from './PlanetCluster.js'
import datGui from 'https://cdn.jsdelivr.net/npm/dat.gui@0.7.9/+esm'
import { Bloom, nonBloomed, restoreMaterial } from "./BloomEffect.js";
import {RotateBasePlanet, RotateAllBasePlanets, Rectlight} from './PlanetHelpers.js'

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


const Bloom_Effect=Bloom(scene, camera, renderer);



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

const Uranus_Orbit=CreateUranus(40)
scene.add(Uranus_Orbit)

const Neptune_Orbit=CreateNeptune(45)
scene.add(Neptune_Orbit)

const PlanetContainer={"Sun": SunMesh, "Mercury": Mercury_Orbit, "Venus": Venus_Orbit,
                        "Earth":Earth_Moon_Orbit, "Moon":Earth_Moon_Orbit.getObjectByName("MoonOrbit"), "Mars":Mars_Orbit, "Jupiter":Jupiter_Orbit,
                        "Saturn":Saturn_Orbit, "Uranus":Uranus_Orbit, "Neptune":Neptune_Orbit
                      }
//=========================Planets===================================

//=========================Lights====================================
const ambientlight=new THREE.AmbientLight(0xffffff, 0)
scene.add(ambientlight)

Rectlight(scene)

//=========================Lights====================================

//=========================GUI======================================
const gui= new datGui.GUI();
const Paly={value:true}
gui.add(Paly, "value").name("Play");

const SunSpeed={val:1}
gui.add(SunSpeed, "val", 0, 10).name("SunSpeed");

const MercurySpeed={val:1.7}
gui.add(MercurySpeed, "val", 0, 10).name("MercurySpeed");

const VenusSpeed={val:1.4}
gui.add(VenusSpeed, "val", 0, 10).name("VenusSpeed");

const EarthSpeed={val:0.6}
gui.add(EarthSpeed, "val", 0, 10).name("EarthSpeed");

const MoonSpeed={val:1.6}
gui.add(MoonSpeed, "val", 0, 10).name("MoonSpeed");

const MarsSpeed={val:0.4}
gui.add(MarsSpeed, "val", 0, 10).name("MarsSpeed");

const JupiterSpeed={val:0.3}
gui.add(JupiterSpeed, "val", 0, 10).name("JupiterSpeed");

const SaturnSpeed={val:1}
gui.add(SaturnSpeed, "val", 0, 10).name("SaturnSpeed");

const UranusSpeed={val:0.3}
gui.add(UranusSpeed, "val", 0, 10).name("UranusSpeed");

const NeptuneSpeed={val:0.5}
gui.add(NeptuneSpeed, "val", 0, 10).name("NeptuneSpeed");

//=========================GUI======================================

camera.layers.enableAll()
function animate(){
    
//==================================================================================
    // RotateBasePlanet(Saturn_Orbit.getObjectByName("SaturnMesh"), 0.01)
    RotateAllBasePlanets(PlanetContainer, -0.01);
    if(Paly.value){
        SunMesh.rotateY(-SunSpeed.val/50);
        Mercury_Orbit.rotateY(-MercurySpeed.val/50)
        Venus_Orbit.rotateY(-VenusSpeed.val/50)
        Earth_Moon_Orbit.rotateY(-EarthSpeed.val/50)
        moon_orbit.rotateY(MoonSpeed.val/50)
        Mars_Orbit.rotateY(-MarsSpeed.val/50)
        Jupiter_Orbit.rotateY(-JupiterSpeed.val/50)
        Saturn_Orbit.rotateY(-SaturnSpeed.val/50)
        Uranus_Orbit.rotateY(-UranusSpeed.val/50)
        Neptune_Orbit.rotateY(-NeptuneSpeed.val/50)
    }

//==================================================================================
    scene.traverse(nonBloomed);

    //renderer.render(scene, camera);
    Bloom_Effect.BloomComposer.render();

    scene.traverse(restoreMaterial);

    SunMesh.traverse((obj)=>{
            obj.layers.set(1)//BLOOM_SCENE from './BloomEffect.js'
    })
    
    Bloom_Effect.finalComposer.render();
    

    requestAnimationFrame(animate);
    
}

animate();


window.addEventListener("resize", function(){
    camera.aspect=window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    Bloom_Effect.BloomComposer.setSize(window.innerWidth, window.innerHeight);
    Bloom_Effect.finalComposer.setSize(window.innerWidth, window.innerHeight);

});
