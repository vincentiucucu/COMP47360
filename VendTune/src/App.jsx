import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './views/home'; 
import LogIn from './views/login'; 
import SignIn from './views/signIn'; 
import Services from './views/services'; 
import Planning from './views/planning'; 


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
