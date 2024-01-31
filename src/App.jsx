import Play from './pages/Play'
import Stats from './pages/Stats'
import Notfound from './pages/Notfound'
import Home from './pages/home'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/stats" element={<Stats />}/>
        <Route path="/play" element={<Play />}/>
        <Route path="*" element={<Notfound />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
