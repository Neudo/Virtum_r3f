import {Box, useMatcapTexture, useTexture} from '@react-three/drei';
import { suspend } from "suspend-react";
import { Suspense } from "react";
import {useControls} from "leva";


async function getRandomArtwork() {
    let artworkData = null;
    let artworkDataVerso = null;
    let randomId = 0;
    let errorCount = 0;
    let artWorkFound = false;
    let artWorkVersoFound=false

    while (!artWorkFound) {
    randomId = Math.floor(Math.random() * 100000);
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=id,title,image_id,artist_display`);
        if (response.ok) {
            artWorkFound = true;
            artworkData = await response.json();
        }
    }

    while(!artWorkVersoFound) {
        randomId = Math.floor(Math.random() * 100000);
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=id,title,image_id,artist_display`);
        if (response.ok) {
            artWorkVersoFound = true;
            artworkDataVerso = await response.json();
        }
    }

    return [artworkData, artworkDataVerso] ;
}

function GetRandomArtwork() {

    const ArtworkData = suspend(getRandomArtwork);
    console.log(ArtworkData)
    const [matcapTextutre] = useMatcapTexture('474444_7B7575_9E9899_8C8C8B', 1024)
    const { artWorkPosition } = useControls('Artwork position', {
        artWorkPosition: { value: [ 0,0,1.1] }
    })
    const { artWorkVersoPosition } = useControls('Artwork verso position', {
        artWorkVersoPosition: { value: [ 0,0,-1.1] }
    })
    const { wallSize } = useControls('Wall sizes', {
        wallSize: { value: [ 20,20,2] }
    })

    if (ArtworkData.error) {
        return console.log('erreur')
    }

    const artwork = ArtworkData[0].data
    const artworkVerso= ArtworkData[1].data
    const imageUrl = useTexture(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/403,/0/default.jpg`)
    const imageUrlVerso = useTexture(`https://www.artic.edu/iiif/2/${artworkVerso.image_id}/full/403,/0/default.jpg`)

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
                <meshStandardMaterial map={imageUrlVerso} />
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
