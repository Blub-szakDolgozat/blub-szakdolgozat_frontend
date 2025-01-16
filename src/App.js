import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NoPage from './pages/NoPage';
import Admin from './pages/Admin/Admin';
import Public from './pages/Public';
import Layout from './pages/Layout';
import AkvariumPublic from './components/public/AkvariumPublic';
import ProfileKep from './components/ProfilKep';
import NapiSorsolas from './components/public/NapiSorsolas';
import Profil from './pages/Profil';

function App() {
  const handleProfileClick = () => {
    alert('Profilképre kattintottál!');
  };

  function Halak() {
    return (
      <div>
        <div className="fish">
          <div className="head">
            <div className="eye"></div>
          </div>
          <div className="tail"></div>
        </div>
        <div className="fish fish2">
          <div className="head">
            <div className="eye"></div>
          </div>
          <div className="tail"></div>
        </div>
      </div>
    );
  }
  

  return (
    <div className="App">   
      <header className="App-header">
        <h1>Blub</h1>
        <div>
          <ProfileKep onClick={handleProfileClick} />
        </div>
      </header>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/*" element={<Public />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NoPage />} />
          <Route path="/akvarium" element={<AkvariumPublic />} />
          <Route path="/sorsolas" element={<NapiSorsolas />} />
          <Route path="/profil" element={<Profil />} />
        </Route>
      </Routes>
      <div>
      <div className="body-container">
            <div className="bottom-section">
            <div className="plants-container">
                    <img src="/kepek/noveny1.png" alt="Plant 1" className="plant" />
                    <img src="/assets/plant2.png" alt="Plant 2" className="plant" />
                    <img src="/assets/plant3.png" alt="Plant 3" className="plant" />
                </div>
                </div>
                {/* Növények konténere */}
                
                    <Halak />

            </div>

      </div>
      
    </div>
  );
}

export default App;
