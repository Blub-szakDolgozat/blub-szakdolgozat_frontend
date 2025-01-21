import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoPage from './pages/NoPage';
import Admin from './pages/Admin/Admin';
import Public from './pages/Public';
import Layout from './pages/Layout';
import AkvariumPublic from './components/public/AkvariumPublic';
import NapiSorsolas from './components/public/NapiSorsolas';
import Profil from './pages/Profil';




function App() {


  return (
   
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

  );

}

export default App;
