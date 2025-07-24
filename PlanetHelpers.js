import * as THREE from "three";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from './THREE.MeshLine.js';
import { RectAreaLightHelper } from 'jsm/helpers/RectAreaLightHelper.js';


function deg_to_rad(angle_in_degrees){
    return angle_in_degrees * (Math.PI/180);
}

function DrawOrbitLines(radius, segments, rot_dir, orbit_percent){
    const points = [];
    
    points.push(new THREE.Vector3(0,0,0).add(new THREE.Vector3(1,0,0).multiplyScalar(radius)))
    for(let i=0; i<=segments; i++){
        const rot_norm=new THREE.Vector3(1,0,0).applyAxisAngle(new THREE.Vector3(0,1,0), rot_dir*deg_to_rad(i*((360*(orbit_percent/100))/segments)))
        points.push( new THREE.Vector3(0,0,0).add(rot_norm.multiplyScalar(radius)) )
    }
    const OrbitGeometry=new THREE.BufferGeometry().setFromPoints(points);
    const line = new MeshLine();
    line.setGeometry(OrbitGeometry);

    const OrbitLineMat = new MeshLineMaterial({
        color: new THREE.Color().setHex(0xffffff),
        lineWidth : 0.15
    });
    const OrbitLineMesh = new THREE.Mesh(line, OrbitLineMat);
    return OrbitLineMesh
}

function CreatePlanetOrb(size, detail, colour, Plname, PlanetTexture){
    let PalnetMat=(PlanetTexture!=undefined) ? 
                    new THREE.MeshStandardMaterial({
                        map: PlanetTexture
                    }) : new THREE.MeshStandardMaterial({
                        color:colour
                    })
    const PlanetMesh=new THREE.Mesh(
        new THREE.IcosahedronGeometry(1, detail), 
        PalnetMat
    );
    PlanetMesh.castShadow=true
    PlanetMesh.receiveShadow=true
    PlanetMesh.scale.set(size,size,size);
    PlanetMesh.name=Plname

    return PlanetMesh
}

function RotateBasePlanet(planet, rotation_val){
    if(planet!=undefined && planet.isObject3D){
        planet.rotateY(rotation_val)
    }
}

function RotateAllBasePlanets(PlanetContainerObj, rotval){
    for(const prop in PlanetContainerObj){
        RotateBasePlanet(PlanetContainerObj[prop].getObjectByName(prop.concat("Mesh")), rotval)
    }
}

// function RotateCustom(PlanetContainerObj){
//     RotateBasePlanet(PlanetContainerObj.Sun, -0.01);
// }
function putRectLight(pos, scene, rectlightdir, lighrIntensity){
    const rectLight = new THREE.RectAreaLight( 0xffffff, lighrIntensity,  10, 10 );
    rectLight.position.set( pos.x, pos.y, pos.z );

    const lookdir= new THREE.Vector3(pos.x, pos.y, pos.z).normalize().multiplyScalar( rectlightdir*(new THREE.Vector3(0,0,0).distanceTo(pos) + 1.0 ))
    rectLight.lookAt( lookdir.x, lookdir.y, lookdir.z);
    // rectLight.lookAt( 0, 0, 0);
    scene.add( rectLight )

    // const rectLightHelper = new RectAreaLightHelper( rectLight );
    // scene.add( rectLightHelper );
}
function Rectlight(scene){
    putRectLight(new THREE.Vector3(5,0,0), scene,  -1,  0.5)
    putRectLight(new THREE.Vector3(-5,0,0), scene, -1,  0.5)
    putRectLight(new THREE.Vector3(0,0,5), scene,  -1,  0.5)
    putRectLight(new THREE.Vector3(0,0,-5), scene, -1,  0.5)
    putRectLight(new THREE.Vector3(0,5,0), scene,  -1,  0.5)
    putRectLight(new THREE.Vector3(0,-5,0), scene, -1,  0.5)

    putRectLight(new THREE.Vector3(5,0,0), scene,  1,  4)
    putRectLight(new THREE.Vector3(-5,0,0), scene, 1,  4)
    putRectLight(new THREE.Vector3(0,0,5), scene,  1,  4)
    putRectLight(new THREE.Vector3(0,0,-5), scene, 1,  4)
    
}

export {DrawOrbitLines, CreatePlanetOrb, RotateBasePlanet, RotateAllBasePlanets,Rectlight}