import './reset.css'
import './style.css'
import {Canvas} from "@react-three/fiber";
import {createRoot} from "react-dom/client";
import {StrictMode} from "react";
import Experience from "./Experience.jsx";
import {Leva} from "leva";


function App()
{
    return (
        <div id="canvas-container">
            <StrictMode>
                <Leva collapsed />
            <Canvas shadows
                    camera={{
                        fov: 90,
                        // near: .01,
                        // fear: 100,
                        position: [-5,4,63]
                        // rotation ?
                    }}
             >
                <Experience/>
                <ambientLight intensity={.015} />
            </Canvas>
            </StrictMode>
        </div>
    )
}

createRoot(document.getElementById('root')).render(<App/>)