import './reset.css'
import './style.css'
import {Canvas} from "@react-three/fiber";
import {createRoot} from "react-dom/client";
import {StrictMode, useRef} from "react";
import Experience from "./Experience.jsx";
import {Environment, RandomizedLight, useHelper} from "@react-three/drei";
import * as THREE from 'three'


function App()
{
    return (
        <div id="canvas-container">
            <StrictMode>
            <Canvas shadows camera={ {
                fov: 90,
                near: .01,
                fear: 100,
                // position: [-5,4,63]
                position: [-5,4,63]
            } } >
                <Experience/>
                <ambientLight intensity={.015} />
            </Canvas>
            </StrictMode>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App/>)