import Play from './pages/Play'
import Stats from './pages/Stats'
import Notfound from './pages/Notfound'
import Home from './pages/Home'
import Nav from './components/Nav'
import './styles/index.scss';
import { Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
        <Nav />
        
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/play" element={<Play />}/>
          <Route path="/stats" element={<Stats />}/>
          <Route path="*" element={<Notfound />}/>
        </Routes>

    </>
  )
}

export default App
