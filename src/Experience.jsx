import {useFrame, extend, useThree} from "@react-three/fiber";
import {useRef} from "react";
import {
    BakeShadows,
    Environment,
    Float, Lightformer, MeshReflectorMaterial,
    OrbitControls,
    Plane, SoftShadows, Stage,
    useHelper,
    useMatcapTexture,
} from "@react-three/drei";
import Artwork from "./Components/Artwork.jsx";
import Wall from "./Components/Wall.jsx";
import ArtworkVerso from "./Components/ArtworkVerso.jsx";
import * as THREE from "three"
import {useControls} from "leva";


extend({OrbitControls})


export default function Experience()
{
    const directionalLight = useRef()
    useHelper(directionalLight, THREE.DirectionalLightHelper, 15)
    const { Lights } = useControls('Spot light Right', {
        Lights: { value: [4, 60, 7] }
    })

    const spotLight = useRef()
    useHelper(spotLight, THREE.SpotLightHelper, "blue")

    const spotLightLeft = useRef()
    useHelper(spotLightLeft, THREE.SpotLightHelper, 15)

    const { LightLeft } = useControls('Spot light left', {
        LightLeft: { value: [11, 60, 6] }
    })

    const { camera, gl } = useThree()
    const [matcapTextureSol] = useMatcapTexture('C2AB7D_4A412E_7A6B4E_F9EDBE\n', 1024)

    const groupeRef = useRef()

    useFrame((state, delta) =>
    {
        groupeRef.current.rotation.y += delta * .1
        if(groupeRef.current.rotation.y >= 6.23){
            groupeRef.current.rotation.y = 0
        }
    })


    return <>
        <OrbitControls args={ [ camera, gl.domElement ] } />
        <SoftShadows frustum={3.75} size={ 50 } near={9.5} samples={ 17 } rings={ 11 } />

        <spotLight
            // ref={ spotLight }
            castShadow
            intensity={2}
            position={Lights}
            penumbra={1}
            attenuation={5}
            angle={.6}
            decay={2}
            shadow-mapSize={[1024*4,1024*4]}
        />
        <spotLight
            // ref={ spotLightLeft }
            castShadow
            intensity={1.2}
            position={LightLeft}
            penumbra={1}
            attenuation={.5}
            anglePower={2}
            angle={.7}
            decay={2}
            shadow-camera-near={10}
            shadow-mapSize={[1024*4,1024*4]}

        />
        <Float
            rotationIntensity={0}
            floatIntensity={1}
            speed={0}
            floatingRange={[-2,4]}
        >
                <group ref={groupeRef} >
                    <Artwork />
                    <Wall/>
                    <ArtworkVerso />
                </group>
        </Float>
        <Plane  receiveShadow position-y={ - 15 } rotation-x={ - Math.PI * 0.5 } scale={ 20 } args={[10, 10, 128,128]}  >
            <meshStandardMaterial color={'black'}/>
            {/*<MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={.2} color="whitesmoke"  />*/}
        </Plane>
    </>

}

