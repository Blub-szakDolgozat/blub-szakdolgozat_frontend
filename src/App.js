import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NoPage from './pages/NoPage';
import Admin from './pages/Admin/Admin';
import Public from './pages/Public';
import Layout from './pages/Layout';
import AkvariumPublic from './components/public/AkvariumPublic';
import NapiSorsolas from './components/public/NapiSorsolas';
import Profil from './pages/Profil';
import ViziLenyekUrlap from './components/admin/ViziLenyekUrlap';
import CikkekUrlap from './components/admin/CikkekUrlap';



function App() {


  return (
    <div>
      <div>
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
      <div>
      <Routes>
          <Route path="/vizilenyekurlap" element={<ViziLenyekUrlap />} />
          <Route path="/cikkekurlap" element={<CikkekUrlap />} />
        </Routes>
      </div>

          
    </div>

  );

}

export default App;
