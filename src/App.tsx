import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Datas from './pages/datas/Datas'
import Login from './pages/login/Login'
import Welcome from './pages/welcome/Welcome'
import Register from './pages/register/Register'
import Home from './pages/home/Home'
import Profile from './pages/profile/Profile'
import Estadistics from './pages/estadists/Estadistics'
//import LandingPage from './pages/ladingPage/LadingPage'

function App() {


  return (
    <BrowserRouter>
      <Routes>
        {/*Quiero suponer que la landing será la pagina raíz, por eso la incluí en el router pero la dejo comentada*/}
        {/*<Route path="/" element={<LandingPage/>} />*/}
        <Route path="/wel" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/datas" element={<Datas />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/estadistics" element={<Estadistics />} />
      </Routes>
    </BrowserRouter>
  )

}

export default App
