import type { ReactElement } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './NavBar';
import AboutUs from './AboutUs';
import Dashboard from './Dashboard';
import Scan from './Scan';
import Quest from './Quest';
import LoginWrapper from './LoginWrapper';

function App(): ReactElement {
  return (
    <BrowserRouter>
      <LoginWrapper>
        <NavBar>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scan" element={<Scan />} />
            <Route path="/quest/:questId" element={<Quest />} />
            <Route path="about" element={<AboutUs />} />
          </Routes>
        </NavBar>
      </LoginWrapper>
    </BrowserRouter>

  );
}

export default App;
