import {useTexture} from '@react-three/drei';
import {suspend} from "suspend-react";
import {Suspense, useContext, useEffect, useRef, useState} from "react";
import {useControls} from "leva";
import Experience, { GroupContext } from "../Experience.jsx";
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
    const groupeRef = useContext(GroupContext);
    const [rotationY, setRotationY] = useState(0);


    useEffect(() => {
        if (groupeRef && groupeRef.current) { // Vérifiez si groupeRef est défini et a une valeur avant d'accéder à current
            // Accès à la rotation y du groupe
            const currentRotationY = groupeRef.current.rotation.y;
            setRotationY(currentRotationY);
            console.log(currentRotationY);
        }
    }, [groupeRef]);

    useEffect(() => {
        const interval = setInterval(() => {
            getRandomArtwork().then(artworkData => {
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
            <GetRandomArtwork  />
        </Suspense>
    );
}
