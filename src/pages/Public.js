import React from "react";
import { Routes, Route } from "react-router-dom";
import Regisztralas from "./Regisztralas";
import Bejelentkezes from "./Bejelentkezes";

export default function Public() {
  return (
    <Routes>
      <Route path="/bejelentkezes" element={<Bejelentkezes />} />
      {/* Az alapértelmezett oldal */}
      <Route path="/" element={<Bejelentkezes />} />
    </Routes>
  );
}
