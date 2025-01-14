import React from 'react';
import './App.css';
import NoPage from './pages/NoPage';
import Admin from './pages/Admin/Admin';
import Public from './pages/Public';
import Layout from './pages/Layout';
import { Routes, Route } from 'react-router-dom';
import AkvariumPublic from './components/public/AkvariumPublic';
import ProfileKep from './components/ProfilKep';

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
          </Route>
        </Routes>
    </div>
  );
}

export default App;
