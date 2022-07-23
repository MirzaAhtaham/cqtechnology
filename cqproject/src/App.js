import React from 'react'
import HeaderBar from './Components/HeaderBar'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './Pages/Home';
import Details from './Pages/Details';


function App() {
  return (
    <Router>
    <HeaderBar/>

    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/details' element={<Details/>} />
    </Routes>
    <div className='fotter' ></div>
    </Router>
  )
}

export default App