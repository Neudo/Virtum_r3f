import {Box, useMatcapTexture, useTexture} from '@react-three/drei';
import {useControls} from "leva";

export default function Wall() {
    const { wallSize } = useControls('Wall sizes', {
        wallSize: { value: [ 40,40,2] },
    })
    const { wallPosition } = useControls('Wall position', {
        wallPosition: { value: [0,14,0] }
    })

    return (<>
            <mesh castShadow receiveShadow position={wallPosition}>
                <boxGeometry args={wallSize} />
                <meshStandardMaterial color="#272727" />
            </mesh>
        </>
    );
}
