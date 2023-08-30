import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SearchPage from './pages/Search';
import Home from './pages/Home';

const App: React.FC = () => {
  return (
    <Router>
     <Routes>
        <Route path="/search/:q" element={<SearchPage />} />
        <Route path="/" element={<Home/>} />
        {/* <Route path="*" element={<h1>Not Found</h1>} /> */}
      </Routes>
    </Router>
  );
};

export default App;
