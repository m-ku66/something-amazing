import React, { useState } from 'react'

const NavBar = ({ setCurrentScreen }) => {
    const [menuState, setMenuState] = useState(false);
    function renderMenu() {
        const openStyle = 'menu absolute z-20 right-[0%] w-[300px] h-full px-[2%] py-[1%] bg-white';
        const closedStyle = 'menu-closed absolute z-20 right-[-100%] w-[300px] h-full px-[2%] py-[1%] bg-white';
        return (
            <div className={menuState ? openStyle : closedStyle}>
                <img onClick={() => setMenuState(false)} className='cursor-pointer absolute right-[16%] w-[24px] h-[24px]' src="/ui/close-line.svg" alt="close menu" />

                <div className='absolute top-[25%]'>
                    <h1 onClick={() => setCurrentScreen('units')} className='menu-item mb-[40%] normal-text text-[24px] font-[500] italic'>Units</h1>
                    <h1 className='menu-item mb-[40%] normal-text text-[24px] font-[500] italic'>Gear</h1>
                    <h1 className='menu-item mb-[40%] normal-text text-[24px] font-[500] italic'>Training</h1>
                    <h1 className='menu-item mb-[40%] normal-text text-[24px] font-[500] italic'>Archive</h1>
                    <h1 className='menu-item mb-[40%] normal-text text-[24px] font-[500] italic'>Shop</h1>
                </div>
            </div>
        )
    }

    return (
        <>
            {renderMenu()}

            <div className='drop-shadow-md flex absolute w-full h-[8.5vh] bg-white px-[2%] py-[0.8%]'>
                {/* pfp, player name, and lvl */}
                <div className='flex w-[300px]'>
                    <div className='w-[34px] h-[34px] mr-[3%]'>
                        <img className='object-cover cursor-pointer' src="/ui/pfp.svg" alt="profile picture" />
                    </div>

                    <div className='relative flex flex-col h-[34px]'>
                        <h1 className='normal-text font-[400] select-none'>xX_The Orange_Xx</h1>
                        <div className='absolute bottom-[0%] w-[130px] h-[8px]'>
                            <div className='rounded absolute w-[35%] h-full bg-gradient-to-r from-[#DD7DFF] to-[#FFCC9C]'></div>
                            <div className='rounded w-full h-full bg-stone-300'></div>
                        </div>
                    </div>
                </div>

                {/* gem currency */}
                <div className='pt-[0.5%] flex w-[200px]'>
                    <div className='w-[22px] h-[22px] mr-[3%]'>
                        <img className='cursor-pointer' src="/ui/gems.svg" alt="gem currency" />
                    </div>

                    <h1 className='normal-text select-none'>5,000</h1>
                </div>

                {/* gold currency */}
                <div className='pt-[0.5%] flex w-[400px]'>
                    <div className='w-[22px] h-[22px] mr-[3%]'>
                        <img className='cursor-pointer' src="/ui/gold.svg" alt="gem currency" />
                    </div>

                    <h1 className='normal-text select-none'>16,040,500</h1>
                </div>

                {/* hamburber menu */}
                <div className='cursor-pointer absolute right-[0%] pt-[0.2%] w-[24px] h-[24px] mr-[3%]'>
                    <img onClick={() => setMenuState(true)} src="/ui/menu-line.svg" alt="gem currency" />
                </div>
            </div>
        </>
    )
}

export default NavBar