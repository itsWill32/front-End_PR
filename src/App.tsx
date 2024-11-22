import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Datas from './pages/datas/Datas';
import Login from './pages/login/Login';
import Welcome from './pages/welcome/Welcome';
import Register from './pages/register/Register';
import Home from './pages/home/Home';
import Profile from './pages/profile/Profile';
import Estadistics from './pages/estadists/Estadistics';
import LandingPage from './pages/ladingPage/LadingPage';
import { UserProvider } from './context/UserContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <UserProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/wel" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/datas" element={<Datas />} />
         {/* <Route path="/home" element={<Home />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */} 
        {/* <Route path="/estadistics" element={<Estadistics />}  /> */}

        {/* Rutas protegidas */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/datas"
          element={
            <ProtectedRoute>
              <Datas />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/estadistics"
          element={
            <ProtectedRoute>
              <Estadistics />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </UserProvider>
  );
}

export default App;
