import {Box, useGLTF, useMatcapTexture, useTexture} from '@react-three/drei';
import {useControls} from "leva";

export default function Wall() {
    const { wallSize } = useControls('Wall sizes', {
        wallSize: { value: [ 40,40,2] }
    })
    return (<>

            <Box castShadow
                 position={[0,14,0]}
                 args={wallSize}
            >

            </Box>

        </>
    );
}
