import {useFrame, extend, useThree} from "@react-three/fiber";
import {useRef} from "react";
import {OrbitControls, Plane, useMatcapTexture, useTexture} from "@react-three/drei";
import Artwork from "./Components/Artwork.jsx";
import {useControls} from "leva";
import Wall from "./Components/Wall.jsx";
import ArtworkVerso from "./Components/ArtworkVerso.jsx";

extend({OrbitControls})


export default function Experience()
{
    const { camera, gl } = useThree()
    const [matcapTextureSol] = useMatcapTexture('C2AB7D_4A412E_7A6B4E_F9EDBE\n', 1024)

    const groupeRef = useRef()

    useFrame((state, delta) =>
    {
        groupeRef.current.rotation.y += delta * .3
    })


    return <>
        <OrbitControls args={ [ camera, gl.domElement ] } />
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1.6 } />
        <group ref={groupeRef} >
            <Artwork />
            <Wall/>
            <ArtworkVerso />
        </group>
        <Plane  receiveShadow position-y={ - 15 } rotation-x={ - Math.PI * 0.5 } scale={ 7 } args={[10, 10, 128,128]}  >
            <meshStandardMaterial color={'black'}/>
        </Plane>
    </>

}

