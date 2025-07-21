import * as THREE from "three";



function CreateSun(){
    const mesh=new THREE.Mesh(
        new THREE.IcosahedronGeometry(1.0, 4), 
        new THREE.MeshBasicMaterial({
            color:new THREE.Color().setHSL(0.19, 1, 0.50),
        })
    );

    return {mesh}
}

function CreateEarthandMoon(){
    const EarthOrbit=new THREE.Group();
    const MoonOrbit=new THREE.Group();

    const EarthMesh=THREE.Mesh(
        new THREE.IcosahedronGeometry(1.0, 4), 
        new THREE.MeshStandardMaterial({
            color:0x1498e4,
            flatShading: true
        })
    );
    const MoonMesh=THREE.Mesh(
        new THREE.IcosahedronGeometry(1.0, 4), 
        new THREE.MeshStandardMaterial({
            color:0x1498e4,
            flatShading: true
        })
    );
    EarthOrbit.add(EarthMesh);
}


export { CreateSun }