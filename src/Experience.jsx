import {useFrame, extend, useThree} from "@react-three/fiber";
import {useRef} from "react";
import {OrbitControls, Plane, useMatcapTexture, useTexture} from "@react-three/drei";
import Artwork from "./Components/Artwork.jsx";

extend({OrbitControls})


export default function Experience()
{
    const three = useThree()
    const { camera, gl } = useThree()
    const [matcapTextutreSol] = useMatcapTexture('C2AB7D_4A412E_7A6B4E_F9EDBE\n', 1024)


    return <>
        <OrbitControls args={ [ camera, gl.domElement ] } />
        <directionalLight castShadow position={ [ 1, 2, 3 ] } intensity={ 1 } color={"red"} />
        <Artwork castShadow/>
        <Plane  receiveShadow position-y={ - 15 } rotation-x={ - Math.PI * 0.5 } scale={ 7 } args={[10, 10, 128,128]}  >
            <meshStandardMaterial color={'black'}/>
        </Plane>
    </>

}

