import type { ReactElement } from 'react';
import {BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import AboutUs from './AboutUs';


function App(): ReactElement {
  return (
    <BrowserRouter>
      <NavBar>
          <Routes>
              <Route path="/" element={<>Dashboard</>} />
              <Route path="/scan" element={<>Scanner</>} />
              <Route path="/quest/:questId" element={<>Quest</>} />
              <Route path="about" element={<AboutUs />} />
          </Routes>
      </NavBar>
    </BrowserRouter>
     
  );
}

export default App;
