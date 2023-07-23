import {useTexture} from '@react-three/drei';
import { suspend } from "suspend-react";
import {Suspense, useEffect, useState} from "react";
import {useControls} from "leva";


async function getRandomArtworkVerso() {
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

let nextArtworkData = null
function callGetRandomArtworkVerso() {
    getRandomArtworkVerso().then(artworkData => {
        nextArtworkData = artworkData
    }).catch(error => {
        console.error('Erreur lors de la récupération de l\'artwork :', error);
    });

    return nextArtworkData
}

const interval = setInterval(callGetRandomArtworkVerso, 20000); // 10000 millisecondes = 10 secondes


function GetRandomArtworkVerso() {
    const ArtworkData = suspend(getRandomArtworkVerso);

    const { artWorkVersoPosition } = useControls('Artwork verso position', {
        artWorkVersoPosition: { value: [0, 15,-1.1] }
    })

    let artwork = ""
    let imageUrl = ""
    let nextArtwork= null
    let nextImageUrl = null

    if(nextArtworkData === null){
        artwork = ArtworkData.data
        imageUrl  = useTexture(`https://www.artic.edu/iiif/2/${artwork.image_id}/full/403,/0/default.jpg`)
    } else {
        nextArtwork = nextArtworkData.data
        nextImageUrl = useTexture(`https://www.artic.edu/iiif/2/${nextArtwork.image_id}/full/403,/0/default.jpg`)
    }

    return (<>
        <mesh position={artWorkVersoPosition} rotation-y={Math.PI * 1} >
            <planeGeometry args={[30, 30]} />
            <meshStandardMaterial map={nextArtwork === null  ? imageUrl : nextImageUrl} />
        </mesh>
        </>
    );

}

export default function ArtworkVerso() {
    const [artworkData, setArtworkData] = useState(null);
    useEffect(() => {
        const interval = setInterval(() => {
            getRandomArtworkVerso().then(artworkData => {
                setArtworkData(artworkData); // Mettre à jour l'artworkData
            }).catch(error => {
                console.error('Erreur lors de la récupération de l\'artwork :', error);
            });
        }, 10000); // 10000 millisecondes = 10 secondes

        // Pour arrêter l'appel de la fonction lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    return (
        <Suspense fallback={console.log("waiting .....")}>
            <GetRandomArtworkVerso />
        </Suspense>
    );
}
