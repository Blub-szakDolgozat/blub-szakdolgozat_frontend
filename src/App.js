import React from "react";
import { Routes, Route } from "react-router-dom";
import NoPage from "./pages/NoPage";
import Admin from "./pages/Admin/Admin";
import Public from "./pages/Public";
import Layout from "./pages/Layout";
import Akvarium from "./components/public/Akvarium";
import NapiSorsolas from "./components/public/NapiSorsolas";
import Profil from "./pages/Profil";
import ViziLenyekUrlap from "./components/admin/ViziLenyekUrlap";
import CikkekUrlap from "./components/admin/CikkekUrlap";
import EsemenyekUrlap from "./components/admin/EsemenyekUrlap";
import VideokUrlap from "./components/admin/VideokUrlap";

function App() {
  return (
    <div>
      <div>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/*" element={<Public />} />
            <Route path="/admin" element={<Admin />}>
              <Route
                path="/admin/vizilenyekurlap"
                element={<ViziLenyekUrlap />}
              />
              <Route path="/admin/cikkekurlap" element={<CikkekUrlap />} />
              <Route
                path="/admin/esemenyekurlap"
                element={<EsemenyekUrlap />}
              />
              <Route path="/admin/videokurlap" element={<VideokUrlap />} />
            </Route>
            <Route path="*" element={<NoPage />} />
            <Route path="/akvarium" element={<Akvarium />} />
            <Route path="/sorsolas" element={<NapiSorsolas />} />
            <Route path="/profil" element={<Profil />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
