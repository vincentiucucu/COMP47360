import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home'; 
import LogIn from './pages/login'; 
import SignIn from './pages/signIn'; 
import Services from './pages/services'; 
import Planning from './pages/planning'; 


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/services" element={<Services />} />
        <Route path="/planning" element={<Planning />} />
      </Routes>
    </Router>
  );
}

export default App;
