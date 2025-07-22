import * as THREE from "three";
import { MeshLine, MeshLineMaterial, MeshLineRaycast } from './node_modules/three.meshline/src/THREE.MeshLine.js';


function deg_to_rad(angle_in_degrees){
    return angle_in_degrees * (Math.PI/180);
}

function DrawOrbitLines(radius, segments){
    const points = [];
    
    points.push(new THREE.Vector3(0,0,0).add(new THREE.Vector3(1,0,0).multiplyScalar(radius)))
    for(let i=0; i<=segments; i++){
        const rot_norm=new THREE.Vector3(1,0,0).applyAxisAngle(new THREE.Vector3(0,1,0), deg_to_rad(i*(360/segments)))
        points.push( new THREE.Vector3(0,0,0).add(rot_norm.multiplyScalar(radius)) )
    }
    const OrbitGeometry=new THREE.BufferGeometry().setFromPoints(points);
    const line = new MeshLine();
    line.setGeometry(OrbitGeometry);

    const OrbitLineMat = new MeshLineMaterial({
        color: new THREE.Color().setHex(0x4410e0),
        lineWidth : 0.1
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

export {DrawOrbitLines, CreatePlanetOrb}