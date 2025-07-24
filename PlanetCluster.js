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
        gltfScene.scene.name="SunMesh"
        console.log(gltfScene.scene)
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

    gltfLoader.load('./EarthAssets/Earth.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(1,1,1)
        gltfScene.scene.position.set(EarthOrbitRadius,0.0,0.0)
         gltfScene.scene.name="EarthMesh"
        EarthOrbit.add(gltfScene.scene)
    })
    EarthOrbit.add(DrawOrbitLines(EarthOrbitRadius, 30, 1, 50))

    EarthOrbit.add(MoonOrbit)

    gltfLoader.load('./MoonAssets/Moon.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(0.5,0.5,0.5)
        gltfScene.scene.position.set(MoonRadius,0.0,0.0)
         gltfScene.scene.name="MoonMesh"
        MoonOrbit.add(gltfScene.scene)
    })


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
         gltfScene.scene.name="MercuryMesh"
        MercuryOrbit.add(gltfScene.scene)
    })
    MercuryOrbit.add(DrawOrbitLines(MercuryOrbitRadius, 30, 1, 50))
    
    return MercuryOrbit
}

function CreateVenus(VenusOrbitRadius){
    const VenusOrbit=new THREE.Group();
    VenusOrbit.name="VenusOrbit"

    gltfLoader.load('./VenusAssets/Venus.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(1,1,1)
        gltfScene.scene.position.set(VenusOrbitRadius,0.0,0.0)
         gltfScene.scene.name="VenusMesh"
        VenusOrbit.add(gltfScene.scene)
    })

    VenusOrbit.add(DrawOrbitLines(VenusOrbitRadius, 30, 1, 50))
    
    return VenusOrbit
}

function CreateMars(MarsOrbitRadius){
    const MarsOrbit=new THREE.Group();
    MarsOrbit.name="MarsOrbit"

    gltfLoader.load('./MarsAssets/Mars.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(0.75,0.75,0.75)
        gltfScene.scene.position.set(MarsOrbitRadius,0.0,0.0)
        gltfScene.scene.name="MarsMesh"
        MarsOrbit.add(gltfScene.scene)
    })

    MarsOrbit.add(DrawOrbitLines(MarsOrbitRadius, 30, 1, 50))
    
    return MarsOrbit
}

function CreateJupiter(JupiterOrbitRadius){
    const JupiterOrbit=new THREE.Group();
    JupiterOrbit.name="JupiterOrbit"

    gltfLoader.load('./JupiterAssets/Jupiter.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(2,2,2)
        gltfScene.scene.position.set(JupiterOrbitRadius,0.0,0.0)
        gltfScene.scene.name="JupiterMesh"
        JupiterOrbit.add(gltfScene.scene)
    })

    JupiterOrbit.add(DrawOrbitLines(JupiterOrbitRadius, 30, 1, 50))
    
    return JupiterOrbit
}

function CreateSaturn(SaturnOrbitRadius){
    const SaturnOrbit=new THREE.Group();
    SaturnOrbit.name="SaturnOrbit"

    gltfLoader.load('./SaturnAssets/Saturn.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(1.3,1.3,1.3)
        gltfScene.scene.position.set(SaturnOrbitRadius,0.0,0.0)
        gltfScene.scene.name="SaturnMesh"
        SaturnOrbit.add(gltfScene.scene)
    })
    SaturnOrbit.add(DrawOrbitLines(SaturnOrbitRadius, 30, 1, 50))
    
    return SaturnOrbit
}

function CreateUranus(UranusOrbitRadius){
    const UranusOrbit=new THREE.Group();
    UranusOrbit.name="UranusOrbit"

    gltfLoader.load('./UranusAssets/Uranus.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(1,1,1)
        gltfScene.scene.position.set(UranusOrbitRadius,0.0,0.0)
        gltfScene.scene.name="UranusMesh"
        UranusOrbit.add(gltfScene.scene)
    })
    UranusOrbit.add(DrawOrbitLines(UranusOrbitRadius, 30, 1, 50))
    
    return UranusOrbit
}


function CreateNeptune(NeptuneOrbitRadius){
    const NeptuneOrbit=new THREE.Group();
    NeptuneOrbit.name="NeptuneOrbit"

    gltfLoader.load('./NeptuneAssets/Neptune.gltf', (gltfScene)=>{
        gltfScene.scene.scale.set(1,1,1)
        gltfScene.scene.position.set(NeptuneOrbitRadius,0.0,0.0)
        gltfScene.scene.name="NeptuneMesh"
        NeptuneOrbit.add(gltfScene.scene)
    })
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
        CreateUranus,
        CreateNeptune }