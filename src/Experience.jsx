import {useFrame, extend, useThree} from "@react-three/fiber";
import {useRef} from "react";
import {OrbitControls, useTexture} from "@react-three/drei";
import Artwork from "./Components/Artwork.jsx";

extend({OrbitControls})


export default function Experience()
{
    const three = useThree()
    const { camera, gl } = useThree()

    return <>
        <OrbitControls args={ [ camera, gl.domElement ] } />
        <Artwork/>


    </>

}

