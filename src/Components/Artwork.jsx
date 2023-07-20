import { DoubleSide } from 'three';
import {Box, Center, useTexture} from '@react-three/drei';
import { suspend } from "suspend-react";
import { Suspense } from "react";

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

    if (ArtworkData.error) {
        return console.log('erreur')
    }

    if (!ArtworkData.data) {
        return console.log("loading")
    }

    const artwork = ArtworkData.data;
    const imageUrl = useTexture(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/403,/0/default.jpg`)


    return (<>
        <mesh>
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial map={imageUrl} />
        </mesh>
            <Box args={[10,10,1]} material-color="white" />
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
