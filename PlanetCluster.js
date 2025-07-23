import * as THREE from "three";
import {DrawOrbitLines, CreatePlanetOrb} from './PlanetHelpers.js'
import {GLTFLoader} from 'jsm/loaders/GLTFLoader.js'


const gltfLoader=new GLTFLoader();

function CreateSun(size){
    const Sun=new THREE.Group();
    Sun.name="Sun"

    const mesh=new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.0, 4), 
        new THREE.MeshBasicMaterial({
            color:new THREE.Color().setHSL(3.1, 0.92, 0.49),
        })
    );
    mesh.scale.set(size,size,size);

    gltfLoader.load('./SunAssets/Sun.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(size,size,size)
        Sun.add(gltfScene.scene)
    })

    //Sun.add(mesh)
    return Sun
}


function CreateEarthandMoon(EarthOrbitRadius, MoonRadius){
    const EarthOrbit=new THREE.Group();
    EarthOrbit.name="EarthOrbit"
    const MoonOrbit=new THREE.Group();
    MoonOrbit.name="MoonOrbit"

    //const earthtexture=new THREE.TextureLoader().load('./Textures/earthmap1k.jpg')
    // const EarthMesh=CreatePlanetOrb(1, 4, 0x1498e4, "Earth");
    // EarthMesh.position.set(EarthOrbitRadius,0.0,0.0)
    // EarthOrbit.add(EarthMesh);

    gltfLoader.load('./EarthAssets/Earth.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(1,1,1)
        gltfScene.scene.position.set(EarthOrbitRadius,0.0,0.0)
        EarthOrbit.add(gltfScene.scene)
    })
    EarthOrbit.add(DrawOrbitLines(EarthOrbitRadius, 30, 1, 50))

    EarthOrbit.add(MoonOrbit)

    gltfLoader.load('./MoonAssets/Moon.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(0.5,0.5,0.5)
        gltfScene.scene.position.set(MoonRadius,0.0,0.0)
        MoonOrbit.add(gltfScene.scene)
    })
    // const MoonMesh=CreatePlanetOrb(0.5, 4, 0x9c9898, "Moon");
    // MoonMesh.position.set(MoonRadius,0.0,0.0)
    // MoonOrbit.add(MoonMesh)

    MoonOrbit.position.set(EarthOrbitRadius,0.0,0.0)
    MoonOrbit.add(DrawOrbitLines(MoonRadius, 20, -1, 50))
    
    return EarthOrbit
}


function CreateMercury(MercuryOrbitRadius){
    const MercuryOrbit=new THREE.Group();
    MercuryOrbit.name="MercuryOrbit"

    gltfLoader.load('./MercuryAssets/Mercury.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(0.5,0.5,0.5)
        gltfScene.scene.position.set(MercuryOrbitRadius,0.0,0.0)
        MercuryOrbit.add(gltfScene.scene)
    })
    MercuryOrbit.add(DrawOrbitLines(MercuryOrbitRadius, 30, 1, 50))
    
    return MercuryOrbit
}

function CreateVenus(VenusOrbitRadius){
    const VenusOrbit=new THREE.Group();
    VenusOrbit.name="VenusOrbit"

    const VenusMesh=CreatePlanetOrb(1, 4, 0xf24f0a, "Venus");
    VenusMesh.position.set(VenusOrbitRadius,0.0,0.0)
    VenusOrbit.add(VenusMesh);
    VenusOrbit.add(DrawOrbitLines(VenusOrbitRadius, 30, 1, 50))
    
    return VenusOrbit
}

function CreateMars(MarsOrbitRadius){
    const MarsOrbit=new THREE.Group();
    MarsOrbit.name="MarsOrbit"

    const MarsMesh=CreatePlanetOrb(0.75, 4, 0xe32809, "Mars");
    MarsMesh.position.set(MarsOrbitRadius,0.0,0.0)
    MarsOrbit.add(MarsMesh);
    MarsOrbit.add(DrawOrbitLines(MarsOrbitRadius, 30, 1, 50))
    
    return MarsOrbit
}

function CreateJupiter(JupiterOrbitRadius){
    const JupiterOrbit=new THREE.Group();
    JupiterOrbit.name="JupiterOrbit"

    const JupiterMesh=CreatePlanetOrb(2, 4, 0xe32809, "Jupiter");
    JupiterMesh.position.set(JupiterOrbitRadius,0.0,0.0)
    JupiterOrbit.add(JupiterMesh);
    JupiterOrbit.add(DrawOrbitLines(JupiterOrbitRadius, 30, 1, 50))
    
    return JupiterOrbit
}

function CreateSaturn(SaturnOrbitRadius){
    const SaturnOrbit=new THREE.Group();
    SaturnOrbit.name="SaturnOrbit"

    const SaturnMesh=CreatePlanetOrb(1.3, 4, 0x948b73, "Saturn");
    SaturnMesh.position.set(SaturnOrbitRadius,0.0,0.0)
    SaturnOrbit.add(SaturnMesh);
    SaturnOrbit.add(DrawOrbitLines(SaturnOrbitRadius, 30, 1, 50))
    
    return SaturnOrbit
}

function CreateNeptune(NeptuneOrbitRadius){
    const NeptuneOrbit=new THREE.Group();
    NeptuneOrbit.name="NeptuneOrbit"

    const NeptuneMesh=CreatePlanetOrb(1, 4, 0x1d07eb, "Neptune");
    NeptuneMesh.position.set(NeptuneOrbitRadius,0.0,0.0)
    NeptuneOrbit.add(NeptuneMesh);
    NeptuneOrbit.add(DrawOrbitLines(NeptuneOrbitRadius, 30, 1, 50))
    
    return NeptuneOrbit
}


export { CreateSun, 
        CreateEarthandMoon, 
        CreateMercury, 
        CreateVenus, 
        CreateMars,
        CreateJupiter,
        CreateSaturn,
        CreateNeptune }