import * as THREE from "three";
import {DrawOrbitLines, CreatePlanetOrb} from './PlanetHelpers.js'



function CreateSun(size){
    const mesh=new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.0, 4), 
        new THREE.MeshBasicMaterial({
            color:new THREE.Color().setHSL(3.1, 0.92, 0.49),
        })
    );
    mesh.scale.set(size,size,size);
    return {mesh}
}


function CreateEarthandMoon(EarthOrbitRadius, MoonRadius){
    const EarthOrbit=new THREE.Group();
    EarthOrbit.name="EarthOrbit"
    const MoonOrbit=new THREE.Group();
    MoonOrbit.name="MoonOrbit"

    //const earthtexture=new THREE.TextureLoader().load('./Textures/earthmap1k.jpg')
    const EarthMesh=CreatePlanetOrb(1, 4, 0x1498e4, "Earth");
    EarthMesh.position.set(EarthOrbitRadius,0.0,0.0)
    EarthOrbit.add(EarthMesh);
    EarthOrbit.add(DrawOrbitLines(EarthOrbitRadius, 30))

    EarthOrbit.add(MoonOrbit)
    const MoonMesh=CreatePlanetOrb(0.5, 4, 0x9c9898, "Moon");
    MoonMesh.position.set(MoonRadius,0.0,0.0)
    MoonOrbit.add(MoonMesh)
    MoonOrbit.position.set(EarthOrbitRadius,0.0,0.0)
    MoonOrbit.add(DrawOrbitLines(MoonRadius, 20))
    
    return EarthOrbit
}


function CreateMercury(MercuryOrbitRadius){
    const MercuryOrbit=new THREE.Group();
    MercuryOrbit.name="MercuryOrbit"

    //const earthtexture=new THREE.TextureLoader().load('./Textures/earthmap1k.jpg')
    const MercuryMesh=CreatePlanetOrb(0.5, 4, 0x918b8a, "Mercury");
    MercuryMesh.position.set(MercuryOrbitRadius,0.0,0.0)
    MercuryOrbit.add(MercuryMesh);
    MercuryOrbit.add(DrawOrbitLines(MercuryOrbitRadius, 30))
    
    return MercuryOrbit
}

function CreateVenus(VenusOrbitRadius){
    const VenusOrbit=new THREE.Group();
    VenusOrbit.name="VenusOrbit"

    //const earthtexture=new THREE.TextureLoader().load('./Textures/earthmap1k.jpg')
    const VenusMesh=CreatePlanetOrb(1, 4, 0xf24f0a, "Venus");
    VenusMesh.position.set(VenusOrbitRadius,0.0,0.0)
    VenusOrbit.add(VenusMesh);
    VenusOrbit.add(DrawOrbitLines(VenusOrbitRadius, 30))
    
    return VenusOrbit
}

function CreateMars(MarsOrbitRadius){
    const MarsOrbit=new THREE.Group();
    MarsOrbit.name="MarsOrbit"

    //const earthtexture=new THREE.TextureLoader().load('./Textures/earthmap1k.jpg')
    const MarsMesh=CreatePlanetOrb(0.75, 4, 0xe32809, "Mars");
    MarsMesh.position.set(MarsOrbitRadius,0.0,0.0)
    MarsOrbit.add(MarsMesh);
    MarsOrbit.add(DrawOrbitLines(MarsOrbitRadius, 30))
    
    return MarsOrbit
}

function CreateJupiter(JupiterOrbitRadius){
    const JupiterOrbit=new THREE.Group();
    JupiterOrbit.name="JupiterOrbit"

    //const earthtexture=new THREE.TextureLoader().load('./Textures/earthmap1k.jpg')
    const JupiterMesh=CreatePlanetOrb(2, 4, 0xe32809, "Jupiter");
    JupiterMesh.position.set(JupiterOrbitRadius,0.0,0.0)
    JupiterOrbit.add(JupiterMesh);
    JupiterOrbit.add(DrawOrbitLines(JupiterOrbitRadius, 30))
    
    return JupiterOrbit
}






export { CreateSun, 
        CreateEarthandMoon, 
        CreateMercury, 
        CreateVenus, 
        CreateMars,
        CreateJupiter }