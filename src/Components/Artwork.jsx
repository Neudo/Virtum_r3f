import { DoubleSide } from 'three';
import {Center, useTexture} from '@react-three/drei';
import {useControls} from "leva";
import {useEffect, useState} from "react";
import { suspend } from "suspend-react";
import { Suspense } from "react";

async function getRandomArtwork() {
    let artworkData = null;
    let randomId = 0;
    let errorCount = 0;
    let artWorkFound = false;

    while (!artWorkFound) {
        randomId = Math.floor(Math.random() * 100000);
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=id,title,image_id,artist_display`);

        if (response.ok) {
            console.log('res ok');
            artWorkFound = true;
            artworkData = await response.json();
            let imageId = artworkData.data.image_id;
            console.log(imageId);
        } else {
            console.log("res pas ok");
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

    console.log(imageUrl)

    return (
        <mesh>
            <planeGeometry args={[15, 15]} />
            <meshStandardMaterial map={imageUrl} />
        </mesh>
    );
}

export default function Artwork() {
    return (
        <Suspense fallback={console.log("waiting .....")}>
            <GetRandomArtwork />
        </Suspense>,

    <Suspense fallback={console.log("waiting .....")}>
        <GetRandomArtwork />
    </Suspense>
    );
}
