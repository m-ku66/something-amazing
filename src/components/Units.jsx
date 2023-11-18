import * as THREE from 'three'
import React, { useState, useRef, useEffect } from 'react'
import NavBar from './NavBar'
import UnitList from './UnitList'
import { Canvas, useFrame, useLoader } from "@react-three/fiber"
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from "@react-three/drei"
import RadarChart from './RadarChart'

const Units = ({ setCurrentScreen }) => {
    const [selectedCharacter, setSelectedCharacter] = useState(UnitList[0]);

    let gltf;
    let ls;

    useEffect(() => {
        ls = document.getElementById('loadingScreen');



        setTimeout(() => {
            ls.style.animationName = "fadeOut";
            ls.style.animationDuration = "1s";
            setTimeout(() => {
                ls.style.display = "none";
            }, 1000)
        }, 5000);
    });

    const Character = () => {
        const mixer = useRef();
        gltf = useLoader(GLTFLoader, selectedCharacter.model);

        gltf.scene.rotation.y += Math.PI;

        useEffect(() => {
            if (gltf) {
                mixer.current = new THREE.AnimationMixer(gltf.scene)
                const action = mixer.current.clipAction(gltf.animations[1]);
                // console.log(gltf.animations)
                action.play()
            }
        }, [gltf]);

        useFrame(({ clock }) => mixer.current && mixer.current.update(clock.getDelta()));
        return gltf ? <primitive object={gltf.scene} /> : null
    }

    const unlockedThumb = "z-[20] w-full h-full bg-transparent";
    const lockedThumb = "z-[20] w-full h-full bg-black/[0.8] py-[50%] text-center";

    const lockedStyle = "select-none normal-text font-[600] text-[20px] text-rose-600 italic";
    const unlockedStyle = "hidden"

    return (
        <>
            <div id='loadingScreen'></div>
            <div className='no-overflow-screen flex container max-w-full h-screen'>
                <NavBar setCurrentScreen={setCurrentScreen} />
                <div className='units-screen w-full h-full px-[2%] bg-white'>
                    <h1 className='select-none normal-text text-[20px] text-stone-400 italic absolute top-[13%] cursor-pointer'>Back</h1>

                    <div className='w-[150px] absolute top-[25%]'>
                        <h1 className='select-none normal-text font-[500] text-[40px] italic'>Units</h1>
                        <div className='w-[100%] h-[2px] mb-[10%] bg-black'></div>
                        <div className='roster w-fit h-[450px]'>
                            {UnitList.map((unit, unitIndex) => (
                                <div key={unitIndex} style={{ backgroundImage: `url(${UnitList[unitIndex].thumbnail})` }} className='cursor-pointer w-[130px] h-[130px] mb-[5%] bg-slate-300'>
                                    <div className={UnitList[unitIndex].locked ? lockedThumb : unlockedThumb}>
                                        <h1 className={UnitList[unitIndex].locked ? lockedStyle : unlockedStyle}>LOCKED</h1>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='absolute top-[70%] left-[12%] w-[300px] h-[300px]'>
                        <h1 className='select-none special-text font-[700] normal-text text-[18px] italic mb-[2%]'>SPECIAL SKILL: {selectedCharacter.specialSkill[0]}</h1>
                        <p className='select-none normal-text font-[300] text-[16px] text-stone-400'>{selectedCharacter.specialSkill[1]}</p>
                    </div>

                    <div className='character-holder flex absolute top-[25%] left-[30%] w-[68%] h-[550px]'>
                        <div className='w-[500px] h-full'>
                            <Canvas camera={{ position: [0, 1.5, -1.1] }} style={{ backgroundColor: 'transparent' }}>
                                <OrbitControls minPolarAngle={Math.PI / 2} maxPolarAngle={Math.PI / 2} target={[0, 0.75, 0]} enablePan={false} enableZoom={false} autoRotate={false} />
                                <ambientLight />
                                <pointLight position={[0, 2, 0]} intensity={5} />
                                {/* characters disappear on re-render/update. Fix it */}
                                <Character />
                            </Canvas>
                        </div>
                        <div className='ml-[1%] pl-[1%] w-[100%] h-full'>
                            <h1 className='select-none normal-text font-[400] text-[40px]'>{selectedCharacter.name}</h1>
                            <div className='flex'>
                                <h1 className='select-none normal-text font-[400] text-[20px] text-stone-400 italic pr-[1%]'>{selectedCharacter.class}</h1>
                                <img className='select-none' src={selectedCharacter.class === "Flame Sorcerer" ? "/ui/flame-emblem.svg" : "/ui/decryption-unit-emblem.svg"} alt="flame emblem" />
                            </div>
                            <h1 className='select-none normal-text font-[400] text-[14px] text-stone-400 italic mb-[4%]'>LVL: {selectedCharacter.lvl}</h1>

                            <div className='grid justify-items-end absolute top-[2%] left-[50%] w-[50%] h-[100%]'>
                                <div className='absolute w-[300px] mr-[20%]'>
                                    <RadarChart selectedCharacter={selectedCharacter} />
                                    <div className='mb-[5%]'>
                                        <h1 className='select-none normal-text font-[500] text-[16px] italic'>{selectedCharacter.passives.passive1[0]}</h1>
                                        <p className='select-none normal-text font-[300] text-[16px] text-stone-400 pr-[1%]'>{selectedCharacter.passives.passive1[1]}</p>
                                    </div>
                                    <div className='mb-[5%]'>
                                        <h1 className='select-none normal-text font-[500] text-[16px] italic'>{selectedCharacter.passives.passive2[0]}</h1>
                                        <p className='select-none normal-text font-[300] text-[16px] text-stone-400 pr-[1%]'>{selectedCharacter.passives.passive2[1]}</p>
                                    </div>
                                </div>
                            </div>

                            <ul className='w-[20%]'>
                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>HP: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.HP}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>MP: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.MP}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>STM: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.STM}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>PATK: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.PATK}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>MATK: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.MATK}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>DEF: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.DEF}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>RES: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.RES}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>SKILL: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.SKILL}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>LUCK: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.LUCK}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>AGI: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.AGI}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>MOV: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.MOV}</p>
                                </div>

                                <div className='flex relative'>
                                    <li className='select-none normal-text font-[400] text-[20px]'>JUMP: </li>
                                    <p className='absolute left-[65%] select-none normal-text font-[400] text-[20px]'>{selectedCharacter.stats.JUMP}</p>
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Units