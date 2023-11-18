import React from 'react'
import NavBar from './NavBar'
import EventCards from './EventCards'

const Lobby = ({ setCurrentScreen }) => {
    return (
        <div className='no-overflow-screen flex container max-w-full h-screen'>
            <NavBar setCurrentScreen={setCurrentScreen} />
            <div className='lobby-screen w-full h-full px-[2%]'>
                <div className='w-full h-screen bg-transparent'>
                    <EventCards />
                </div>
            </div>
        </div>
    )
}

export default Lobby