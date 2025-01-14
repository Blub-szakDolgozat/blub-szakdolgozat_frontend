import React from 'react';
import './App.css';
import NoPage from './pages/NoPage';
import Admin from './pages/Admin/Admin';
import Public from './pages/Public';
import Layout from './pages/Layout';
import { Routes, Route } from 'react-router-dom';
import AkvariumPublic from './components/public/AkvariumPublic';
import ProfileKep from './components/ProfilKep';
<<<<<<< HEAD
import NapiSorsolas from './components/public/NapiSorsolas';


=======
import Profil from './pages/Profil';
>>>>>>> 02c21d9b8d9acca76ab1ffb51d4dc5fbcdf5b0d6

function App() {
  
  

  const handleProfileClick = () => {
    alert('Profilképre kattintottál!');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Blub</h1>
        <div>
          <ProfileKep onClick={handleProfileClick} />
        </div>
      </header>
        <Routes>
          {/* Layout és Public komponensek */}
          <Route path="/" element={<Layout />}>
          <Route path="/*" element={<Public />} />
            <Route path="admin" element={<Admin />} />
            <Route path="*" element={<NoPage />} />
            <Route path="/akvarium" element={<AkvariumPublic />} />
<<<<<<< HEAD
            <Route path="/sorsolas" element={<NapiSorsolas />} />
=======
            <Route path="/profil" element={<Profil />} />
>>>>>>> 02c21d9b8d9acca76ab1ffb51d4dc5fbcdf5b0d6
          </Route>
        </Routes>
        
    </div>
  );
}

export default App;
