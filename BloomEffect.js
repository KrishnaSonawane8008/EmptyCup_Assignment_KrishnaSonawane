import * as THREE from "three";
import {RenderPass} from 'jsm/postprocessing/RenderPass.js';
import {EffectComposer} from 'jsm/postprocessing/EffectComposer.js';
import {UnrealBloomPass} from 'jsm/postprocessing/UnrealBloomPass.js';
import {OutputPass} from 'jsm/postprocessing/OutputPass.js';
import {ShaderPass} from 'jsm/postprocessing/ShaderPass.js';




function Bloom(scene, camera, renderer){
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
    bloomPass.strength = 0.5;
    bloomPass.radius = 0.75;
    bloomPass.threshold = 0.01;

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


    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderScene);
    finalComposer.addPass(mixPass);

    const outputpass=new OutputPass();
    finalComposer.addPass(outputpass)

    return {BloomComposer, finalComposer}
}

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

export {Bloom, nonBloomed, restoreMaterial}