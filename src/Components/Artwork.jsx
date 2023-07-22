import {Box, useMatcapTexture, useTexture} from '@react-three/drei';
import { suspend } from "suspend-react";
import { Suspense } from "react";
import {useControls} from "leva";
import Wall from "./Wall.jsx";


async function getRandomArtwork() {
    let artworkData = null;
    let randomId = 0;
    let artWorkFound = false;

    while (!artWorkFound) {
    randomId = Math.floor(Math.random() * 100000);
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=id,title,image_id,artist_display`);
        if (response.ok) {
            artWorkFound = true;
            artworkData = await response.json();
        }
    }


    return artworkData ;
}

function GetRandomArtwork() {
    const ArtworkData = suspend(getRandomArtwork);

    const { artWorkPosition } = useControls('Artwork position', {
        artWorkPosition: { value: [ 0,15,1.1] }
    })

    const artwork = ArtworkData.data
    const imageUrl = useTexture(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/403,/0/default.jpg`)

    return (<>
        <mesh position={artWorkPosition} >
            <planeGeometry args={[30, 30]} />
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
