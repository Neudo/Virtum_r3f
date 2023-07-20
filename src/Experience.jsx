import {useFrame, extend, useThree} from "@react-three/fiber";
import {useRef} from "react";
import {OrbitControls, Plane, useTexture} from "@react-three/drei";
import Artwork from "./Components/Artwork.jsx";

extend({OrbitControls})


export default function Experience()
{
    const three = useThree()
    const { camera, gl } = useThree()

    return <>
        <OrbitControls args={ [ camera, gl.domElement ] } />
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1 } color={"white"} />
        <Artwork/>
        <Plane  receiveShadow position-y={ - 15 } rotation-x={ - Math.PI * 0.5 } scale={ 7 } args={[10, 10, 128,128]}  >
            {/*<meshStandardMaterial {...groundTextures}*/}
            <meshStandardMaterial color={'black'}
            />
        </Plane>


    </>

}

