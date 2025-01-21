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
import { BrowserRouter as Router } from 'react-router-dom';

function Buborekok() {
  const bubbles = Array.from({ length: 20 }, (_, index) => (
    <div key={index} className="bubble"></div>
  ));
  return <div className="bubbles">{bubbles}</div>;
}

function Halak() {
  return (
    <div>
      <div className="fish">
        <div className="fish-body">
          <div className="fish-eye"></div>
          <div className="fish-tail"></div>
        </div>
      </div>
      <div className="fish" style={{ animationDelay: '3s' }}>
        <div className="fish-body">
          <div className="fish-eye"></div>
          <div className="fish-tail"></div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const handleProfileClick = () => {
    alert('Profilképre kattintottál!');
  };

  return (
    <div className="App">
      <div className="ocean">
        <Buborekok />
        <Halak />
      </div>
      <header className="App-header">
        <h1>Blub</h1>
        <ProfileKep onClick={handleProfileClick} />
      </header>
      <div className="App-content">
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
      </div>
    </div>
  );

}

export default App;
