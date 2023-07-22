import {Box, useMatcapTexture} from '@react-three/drei';
import {useControls} from "leva";

export default function Wall() {
    const [matcapTextutre] = useMatcapTexture('474444_7B7575_9E9899_8C8C8B', 1024)
    const { wallSize } = useControls('Wall sizes', {
        wallSize: { value: [ 40,40,2] }
    })
    return (<>

            <Box castShadow args={wallSize} position={[0,14,0]} material-color="white" >
                <meshMatcapMaterial matcap={matcapTextutre} />
            </Box>
        </>
    );
}
