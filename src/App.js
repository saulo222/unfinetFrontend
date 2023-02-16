import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import PageBilld from './PageBilld'
import Login from './Login';

const App = () => (
  
    <Router>
        <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/pageBilld" element={<PageBilld />} />
        </Routes>  
    </Router>
);

export default App;