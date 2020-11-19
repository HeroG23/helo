import React from 'react';
import { useLocation } from 'react-router-dom'
import Nav from './Components/Nav/Nav';
import routes from './routes';

import './App.css';

function App() {
  const location = useLocation()
  return (
    <div className='App'>
      {location.pathname === "/" ? null : <Nav />}
      {routes}
    </div>
  )
}

export default App;