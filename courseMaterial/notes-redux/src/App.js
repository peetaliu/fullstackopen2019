import React from 'react'
import './App.css'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {
  return (
    <div>
      <NewNote />
      <Notes />
    </div>
  )
}

export default App
