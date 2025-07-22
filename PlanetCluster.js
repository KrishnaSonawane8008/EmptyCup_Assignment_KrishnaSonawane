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

    const earthtexture=new THREE.TextureLoader().load('./Textures/earthmap1k.jpg')
    const EarthMesh=CreatePlanetOrb(1, 4, 0x1498e4, "Earth", earthtexture);
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




export { CreateSun, CreateEarthandMoon }