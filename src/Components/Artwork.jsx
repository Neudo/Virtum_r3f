import { DoubleSide } from 'three';
import {Box, Center, useMatcapTexture, useTexture} from '@react-three/drei';
import { suspend } from "suspend-react";
import { Suspense } from "react";
import {useControls} from "leva";


async function getRandomArtwork() {
    let artworkData = null;
    let randomId = 0;
    let errorCount = 0;
    let artWorkFound = false;
    console.log(artWorkFound)

    while (!artWorkFound) {
        randomId = Math.floor(Math.random() * 100000);
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=id,title,image_id,artist_display`);

        if (response.ok) {
            artWorkFound = true;
            artworkData = await response.json();
        } else {
            errorCount++;
        }
    }
    return artworkData;
}

function GetRandomArtwork() {

    const ArtworkData = suspend(getRandomArtwork);
    const [matcapTextutre] = useMatcapTexture('161B1F_C7E0EC_90A5B3_7B8C9B', 256)
    const { artWorkPosition } = useControls('Artwork position', {
        artWorkPosition: { value: [ 0,0,0.7] }
    })
    const { artWorkVersoPosition } = useControls('Artwork verso position', {
        artWorkVersoPosition: { value: [ 0,0,-0.7] }
    })
    const { wallSize } = useControls('Wall sizes', {
        wallSize: { value: [ 20,20,-2] }
    })



    if (ArtworkData.error) {
        return console.log('erreur')
    }

    if (!ArtworkData.data) {
        return console.log("loading")
    }

    const artwork = ArtworkData.data;
    const imageUrl = useTexture(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/403,/0/default.jpg`)


    return (<>
        <mesh position={artWorkPosition}>
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial map={imageUrl} />
        </mesh>
            <Box castShadow args={wallSize} material-color="white" >
                <meshMatcapMaterial matcap={matcapTextutre} />
            </Box>
            <mesh position={artWorkVersoPosition} rotation-y={- Math.PI * 1} >
                <planeGeometry args={[15, 15]} />
                <meshStandardMaterial map={imageUrl} />
            </mesh>
        </>
    );

}



export default function Artwork() {

    return (
        <Suspense fallback={console.log("waiting .....")}>
            <GetRandomArtwork />
        </Suspense>
    );
}
