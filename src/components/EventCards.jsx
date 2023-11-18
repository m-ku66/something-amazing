import React, { useEffect } from 'react'

const EventCards = () => {

    let storyCard;
    let eventCard;
    let pvpCard;

    useEffect(() => {
        storyCard = document.getElementById('story');
        eventCard = document.getElementById('events');
        pvpCard = document.getElementById('pvp');

        storyCard.style.flexBasis = '30%';
        eventCard.style.flexBasis = '30%';
        pvpCard.style.flexBasis = '30%';
    }, [])

    function handleHover(name) {
        switch (name) {
            case 'story':
                storyCard.style.flexBasis = '100%';
                eventCard.style.flexBasis = '5%';
                pvpCard.style.flexBasis = '5%';
                break;
            case 'events':
                storyCard.style.flexBasis = '5%';
                eventCard.style.flexBasis = '100%';
                pvpCard.style.flexBasis = '5%';
                break;
            case 'pvp':
                storyCard.style.flexBasis = '5%';
                eventCard.style.flexBasis = '5%';
                pvpCard.style.flexBasis = '100%';
                break;
        }
    }

    function handleLeave() {
        storyCard.style.flexBasis = '30%';
        eventCard.style.flexBasis = '30%';
        pvpCard.style.flexBasis = '30%';
    }


    //edit the id's of each card via css in order to add background images
    //for the cards!
    return (
        <div className='absolute bottom-[2%] flex justify-between w-[350px] h-[150px]'>
            <div onMouseLeave={() => handleLeave()} onMouseEnter={() => handleHover('story')} id='story' className='event-card h-full bg-cyan-600'></div>
            <div onMouseLeave={() => handleLeave()} onMouseEnter={() => handleHover('events')} id='events' className='event-card h-full bg-lime-600'></div>
            <div onMouseLeave={() => handleLeave()} onMouseEnter={() => handleHover('pvp')} id='pvp' className='event-card h-full bg-red-600'></div>
        </div>
    )
}

export default EventCards