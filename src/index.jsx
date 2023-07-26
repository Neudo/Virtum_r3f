import './reset.css'
import './style.css'
import {Canvas} from "@react-three/fiber";
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import Experience from "./Experience.jsx";
import {AccumulativeShadows, Environment, RandomizedLight} from "@react-three/drei";


function App()
{
    return (
        <div id="canvas-container">
            <StrictMode>
            <Canvas shadows camera={ {
                fov: 90,
                near: .01,
                fear: 100,
                position: [-5,4,63]
            } } >
                <RandomizedLight amount={8} radius={4} ambient={.5} intensity={1} position={[5,5,-10]} bias={1.001} />

                <Environment preset="city" />
                <Experience/>
            </Canvas>
            </StrictMode>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App/>)