import {useFrame, extend, useThree} from "@react-three/fiber";
import {createContext, useRef} from "react";
import {
    Float,
    OrbitControls,
    Plane, SoftShadows,
    useHelper,
    useMatcapTexture,
} from "@react-three/drei";
import Artwork from "./Components/Artwork.jsx";
import Wall from "./Components/Wall.jsx";
import ArtworkVerso from "./Components/ArtworkVerso.jsx";
import * as THREE from "three"
import {useControls} from "leva";


extend({OrbitControls})
export const GroupContext = createContext();

const Experience = () => {
    {
        const directionalLight = useRef()
        useHelper(directionalLight, THREE.DirectionalLightHelper, 15)
        const {Lights} = useControls('Directional light position', {
            Lights: {value: [77, 33, 4]}
        })

        const {camera, gl} = useThree()
        const [matcapTextureSol] = useMatcapTexture('C2AB7D_4A412E_7A6B4E_F9EDBE\n', 1024)

        const groupeRef = useRef()

        useFrame((state, delta) => {
            groupeRef.current.rotation.y += delta * .1
        })
        return <>
            <GroupContext.Provider value={groupeRef}>
                <OrbitControls args={[camera, gl.domElement]}/>
                <SoftShadows frustum={3.75} size={50} near={9.5} samples={17} rings={11}/>
                <directionalLight
                    ref={directionalLight}
                    position={Lights}
                    intensity={1.6}
                    castShadow
                    shadow-mapSize={[1024 * 2, 1024 * 2]}
                    shadow-camera-near={1}
                    // shadow-camera-far={10}
                    shadow-camera-top={5}
                    shadow-camera-right={5}
                    shadow-camera-bottom={-5}
                    shadow-camera-left={-5}

                />
                <Float
                    rotationIntensity={0}
                    floatIntensity={1}
                    speed={0}
                    floatingRange={[-2, 4]}
                >
                    <group ref={groupeRef}>
                        <Artwork/>
                        <Wall/>
                        <ArtworkVerso/>
                    </group>
                </Float>
                <Plane receiveShadow position-y={-15} rotation-x={-Math.PI * 0.5} scale={20} args={[10, 10, 128, 128]}>
                    <meshStandardMaterial color={'black'}/>
                    {/*<MeshReflectorMaterial resolution={512} blur={[1000, 1000]} mixBlur={1} mirror={.8} color="whitesmoke"  />*/}
                </Plane>
            </GroupContext.Provider>
        </>

    }
}
export default Experience

