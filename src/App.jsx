import React, { useState } from 'react'
import TitleScreen from './components/TitleScreen'
import Lobby from './components/Lobby'
import Units from './components/Units'

function App() {
  const [currentScreen, setCurrentScreen] = useState('units');

  function renderContent() {
    let content;
    switch (currentScreen) {
      case 'title':
        content = <TitleScreen setCurrentScreen={setCurrentScreen} />
        break;
      case 'lobby':
        content = <Lobby setCurrentScreen={setCurrentScreen} />
        break;
      case 'units':
        content = <Units setCurrentScreen={setCurrentScreen} />
        break;
    }

    return content;
  }

  return (
    <div className='flex container max-w-full h-screen'>
      {renderContent()}
    </div>
  )
}

export default App
