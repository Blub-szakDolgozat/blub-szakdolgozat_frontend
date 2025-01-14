import React from 'react';
import './App.css';
import NoPage from './pages/NoPage';
import Admin from './pages/Admin/Admin';
import Public from './pages/Public';
import Layout from './pages/Layout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AkvariumPublic from './components/public/AkvariumPublic';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Blub</h1>
        <div>
          <img src="/kepek/Fiokikon.png" alt="ikon" />
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
