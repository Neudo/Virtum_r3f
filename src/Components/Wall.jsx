import {Box, useGLTF, useMatcapTexture, useTexture} from '@react-three/drei';
import {useControls} from "leva";

export default function Wall() {
    const { wallSize } = useControls('Wall sizes', {
        wallSize: { value: [ 40,40,2] },
    })
    const { wallPosition } = useControls('Wall position', {
        wallPosition: { value: [0,14,0] }
    })
    return (<>

            <Box castShadow
                 position={wallPosition}
                 args={wallSize}
            >

            </Box>

        </>
    );
}
