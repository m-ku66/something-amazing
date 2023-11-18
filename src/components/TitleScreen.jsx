import React from 'react'
import { Canvas } from "@react-three/fiber"
import { Sparkles } from "@react-three/drei"


const TitleScreen = ({ setCurrentScreen }) => {

    window.addEventListener('keypress', () => {
        setCurrentScreen('lobby');
    });

    return (
        <div className='relative no-overflow-screen flex container content-center items-center max-w-full h-screen bg-slate-300 lg:justify-center'>
            {/* <img className='absolute object-cover' src="/dusk_chronicle_title.jpg" alt="title image" />
            <img className='z-[1] w-full h-full absolute object-cover' src="/test-particle.gif" alt="title image" /> */}
            <Canvas style={{ backgroundColor: 'black' }}>
                <Sparkles count={500} scale={[10, 10, 10]} />
            </Canvas>

            <div className='title-div px-[200px] py-[10px] absolute bottom-[10%] z-10 text-center'>
                <h1 className='select-none title-text text-white fantasy-text text-[3rem]'>Dusk Chronicle</h1>
                <p className='fading-text text-white normal-text text-[1rem]'>press any key to start</p>
            </div>
        </div>
    )
}

export default TitleScreen