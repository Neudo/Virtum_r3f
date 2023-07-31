import {useTexture} from '@react-three/drei';
import {suspend} from "suspend-react";
import {Suspense, useEffect, useRef, useState} from "react";
import {useControls} from "leva";
import {useFrame} from "@react-three/fiber";


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

let nextArtworkData = null
function callGetRandomArtwork() {
    getRandomArtwork().then(artworkData => {
        nextArtworkData = artworkData
    }).catch(error => {
        console.error('Erreur lors de la récupération de l\'artwork :', error);
    });

    return nextArtworkData
}

const interval = setInterval(callGetRandomArtwork, 40000);



function GetRandomArtwork() {
    const ArtworkData = suspend(getRandomArtwork);

    const { artWorkPosition } = useControls('Artwork position', {
        artWorkPosition: { value: [ 0,15,1.1] }
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
            <mesh position={artWorkPosition} >
                <planeGeometry args={[30, 30]} />
                <meshStandardMaterial map={nextArtwork === null  ? imageUrl : nextImageUrl} />
            </mesh>
        </>
    );
}


export default function Artwork() {
    const [artworkData, setArtworkData] = useState(null);
    const rotationYRef = useRef(0);
    const [reached, setReached] = useState(false);

    useFrame((state, delta) => {
        rotationYRef.current += delta * 0.1;
        if(rotationYRef.current >= 1.8 && !reached){
            setReached(true);
        }
        if(rotationYRef.current >= 2){
            setReached(false)
        }
        if(rotationYRef.current >= 6.3){
            rotationYRef.current = 0
        }
    });

    useEffect(() => {
        if (reached) {
            getRandomArtwork().then(artworkData => {
                setArtworkData(artworkData)
            }).catch(error => {
                console.error('Erreur lors de la récupération de l\'artwork :', error);
            });
            setReached(false);
        }
    }, [reached]);

    return (
        <Suspense >
            <GetRandomArtwork />
        </Suspense>
    );
}
