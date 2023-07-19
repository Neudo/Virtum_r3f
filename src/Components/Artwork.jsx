import { DoubleSide } from 'three';
import {Center, useTexture} from '@react-three/drei';
import {useControls} from "leva";
import {useEffect, useState} from "react";
import { suspend } from "suspend-react";
import { Suspense } from "react";


 function getRandomArtwork() {
     let artworkData = null;
     let imageId = '';
     let randomId = 0;
     let errorCount = 0

     while (!artworkData && errorCount < 10) {
         randomId = Math.floor(Math.random() * 100000);

         const data = suspend(async () => {
             const res = await fetch(`https://api.artic.edu/api/v1/artworks/${randomId}?fields=id,title,image_id,artist_display`);
             if (res.ok) {
                 artworkData = res.json();
                 imageId = artworkData.data.image_id;
                 console.log(imageId)
             } else {
                 errorCount++;
             }
         })


         if (artworkData) {
             setArtwork({
                 ...artworkData.data,
                 imageUrl: `https://www.artic.edu/iiif/2/${imageId}/full/403,/0/default.jpg`
             });
         } else {
             setError(new Error('Impossible de récupérer une œuvre d\'art.'));
         }
     }
 }
 getRandomArtwork()

export default function Artwork(){}
// {
//     const texture = useTexture('https://www.artic.edu/iiif/2/743f53b8-eb8b-4d12-3031-20e2c31c1f26/full/403,/0/default.jpg')
//     // const texture = useTexture(`https://www.artic.edu/iiif/2/${imageId}/full/403,/0/default.jpg`)
//     const [artwork, setArtwork] = useState(null);
//     const [error, setError] = useState(null);
//     let texture2 = useTexture('')
//
//     // useEffect(() => {
//     //     getRandomArtwork(setArtwork, setError);
//     // }, []);
//     //
//     // if(artwork){
//     //     console.log(artwork.imageUrl)
//     //     texture2 = useTexture(artwork.imageUrl)
//     // }
//
//     return (<>
//             {/*<Suspense fallback={<div>loading...</div>}>*/}
//                 <mesh>
//                     <planeGeometry args={ [15,15] } />
//                     <meshStandardMaterial map={texture} />
//                 </mesh>
//             {/*</Suspense>*/}
//         </>
//     )
// }