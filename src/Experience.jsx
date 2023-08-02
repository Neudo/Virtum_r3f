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
    const spotLight = useRef()
    const { Lights } = useControls('Spot light Right', {
        Lights: { value: [0, 60, 7] }
    })

    useHelper(spotLight, THREE.SpotLightHelper, "blue")

    const spotLightLeft = useRef()
    useHelper(spotLightLeft, THREE.SpotLightHelper, 15)


    const { LightLeft } = useControls('Spot light left', {
        LightLeft: { value: [11, 60, 6] }
    })

    const { position } = useControls('Text position', {
        position: { value: [-1,50,20]},
    })
    const {rotationX } = useControls('Text rotation', {
        rotationX: {value: -.88, step: .01}
    })

    const { groupeRotation } = useControls('Groupe rotation', {
        rotationY: {value: 0, step:  .01}
    })



    const groupeRef = useRef()

    useFrame((state, delta) =>
    {
        groupeRef.current.rotation.y += delta * .1
        if(groupeRef.current.rotation.y >= 6.27){
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

    const startExperience = () =>
    {
        const startBtn = document.querySelector(".start-btn")
        const mask = document.getElementById('mask')

        setTimeout(() => {
            mask.classList.add('hidden')
        }, 1000);

        setTimeout(() => {
           startBtn.style.opacity = 1
        }, 3000);
        let experienceStarted = false

        startBtn.addEventListener('click', () =>
        {
            if(!experienceStarted){
                startBtn.classList.add('hidden')
                experienceStarted = true

                cameraControlsRef.current?.rotate(0, 25 * DEG2RAD, true)
                setTimeout(() => {
                    cameraControlsRef.current?.rotate(0, 55 * DEG2RAD, true);
                }, 1100);

                setTimeout(() => {
                    // cameraControlsRef.current?.zoom(-camera.zoom / 10, true)
                    cameraControlsRef.current?.dolly(- 5, true)
                }, 1550);
                setTimeout(() => {
                    // cameraControlsRef.current?.zoom(camera.zoom / 8, true)
                    cameraControlsRef.current?.dolly(3, true)
                }, 1750);
            }
        })
    }
    startExperience()

    return <>
        <CameraControls
            ref={cameraControlsRef}
            // enabled={enable}
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
            floatIntensity={2}
            speed={1}
            floatingRange={[0,2]}
        >
            <group ref={groupeRef}>
                <Artwork />
                <Wall/>
                <ArtworkVerso />
            </group>
        </Float>
        <Plane
            receiveShadow position-y={ - 15 } rotation-x={ - Math.PI * 0.5 } scale={ 20 } args={[10, 10, 128,128]}  >
            <meshStandardMaterial color={'black'}/>
        </Plane>

        <Text
            color="white"
            fontSize={4}
            position={position}
            rotation-x={rotationX}
        >
            Virtum
        </Text>
    </>

}

