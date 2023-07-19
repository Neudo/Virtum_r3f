import { DoubleSide } from 'three';
import {Center, useTexture} from '@react-three/drei';
import {useControls} from "leva";
import {useEffect, useState} from "react";
import { suspend } from "suspend-react";
import { Suspense } from "react";


async function getRandomArtwork(setArtwork, setError) {
    let artworkData = null;
    let imageId = '';
    let randomId = 0;
    let errorCount = 0

    while (!artworkData && errorCount < 10) {
        randomId = Math.floor(Math.random() * 100000);
        try {
            const response = await fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=id,title,image_id,artist_display`);
            if (response.ok) {
                artworkData = await response.json();
                imageId = artworkData.data.image_id;
            } else {
                errorCount++;
            }
        } catch (error) {
            errorCount++;
        }
    }

    if (artworkData) {
        setArtwork({
            ...artworkData.data,
            imageUrl: `https://www.artic.edu/iiif/2/${imageId}/full/403,/0/default.jpg`
        });
    } else {
        setError(new Error('Impossible de récupérer une œuvre d\'art.'));
    }
}

export default function Artwork()
{
    const texture = useTexture('https://www.artic.edu/iiif/2/743f53b8-eb8b-4d12-3031-20e2c31c1f26/full/403,/0/default.jpg')
    const [artwork, setArtwork] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        getRandomArtwork(setArtwork, setError);
    }, []);

    if(artwork){

        // console.log(artwork.imageUrl)
        // texture2 = useTexture(artwork.imageUrl)
    }

    return (<>
            <mesh>
                <planeGeometry args={ [15,15] } />
                <meshStandardMaterial map={texture} />
                {/*<meshStandardMaterial map={artwork.imageUrl} />*/}
            </mesh>
        </>

    )
}