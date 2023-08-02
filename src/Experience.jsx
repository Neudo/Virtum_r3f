import {useFrame, extend, useThree} from "@react-three/fiber";
import {useEffect, useRef} from "react";
import {
    CameraControls,
    Center,
    Float, Html, OrbitControls, PerspectiveCamera, Plane, SoftShadows, Text, useHelper, useMatcapTexture,
} from "@react-three/drei";
import Artwork from "./Components/Artwork.jsx";
import Wall from "./Components/Wall.jsx";
import ArtworkVerso from "./Components/ArtworkVerso.jsx";
import * as THREE from "three"
import {button, buttonGroup, folder, useControls} from "leva";
import {DEG2RAD} from "three/src/math/MathUtils.js";


// extend({OrbitControls})


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

    const [matcapTextureSol] = useMatcapTexture('C2AB7D_4A412E_7A6B4E_F9EDBE\n', 1024)

    const groupeRef = useRef()

    useFrame((state, delta) =>
    {
        groupeRef.current.rotation.y += delta * .1
        if(groupeRef.current.rotation.y >= 6.23){
            groupeRef.current.rotation.y = 0
        }
    })

    //Camera
    const cameraControlsRef = useRef()
    const { camera, gl } = useThree()

    // Set the initial rotation angle to -180 degrees
    const initialRotation = -180 * DEG2RAD;

// Update the rotation using useEffect hook
    useEffect(() => {
        cameraControlsRef.current?.rotate(0, initialRotation, true);
    }, []);

    const { enabled } = useControls({
        phiGrp: buttonGroup({
            label: 'rotate phi',
            opts: {
                '+25°': () => cameraControlsRef.current?.rotate(0, 25 * DEG2RAD, true),
                '-40°': () => cameraControlsRef.current?.rotate(0, -40 * DEG2RAD, true),
            }
        }),
        setPosition: folder(
            {
                vec2: {value: [-5, 4, 63], label: 'vec'},
                'setPosition(...vec)': button((get) => cameraControlsRef.current?.setPosition(...get('setPosition.vec2'), true))
            }
        ),
        enabled: {value: true, label: 'controls on'}

    })




    const startExperience = () =>
    {
        const startBtn = document.querySelector(".start-btn")
        let experienceStarted = false

        startBtn.addEventListener('click', () =>
        {
            if(!experienceStarted){
                startBtn.classList.add('hidden')
                experienceStarted = true

                cameraControlsRef.current?.rotate(0, 25 * DEG2RAD, true)
                setTimeout(() => {
                    cameraControlsRef.current?.rotate(0, 55 * DEG2RAD, true);
                }, 1000);

            }
        })
    }
    startExperience()

    return <>
        <CameraControls
            // makeDefault
            ref={cameraControlsRef}
            // enabled={enabled}
        />
        {/*<OrbitControls args={ [ camera, gl.domElement ] } />*/}
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
        <Plane
            receiveShadow position-y={ - 15 } rotation-x={ - Math.PI * 0.5 } scale={ 20 } args={[10, 10, 128,128]}  >
            <meshStandardMaterial color={'black'}/>
            {/*<MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={.2} color="whitesmoke"  />*/}
        </Plane>

        <Text
            color="white"
            fontSize={4}
            position={[0,50,20]}
            rotation-x={Math.PI * -.32}
        >
            Virtum
        </Text>
    </>

}

