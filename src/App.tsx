import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchPage from "./pages/Search";
import Home from "./pages/Home";
import MobileFooter from "./components/MobileFooter";
import Saved from "./pages/Saved";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route
          path="/search/:q"
          element={
            <MobileFooter>
              <SearchPage />
            </MobileFooter>
          }
        />
        <Route
          path="/"
          element={
            <MobileFooter>
              <Home />
            </MobileFooter>
          }
        />
        <Route
          path="/saved"
          element={
            <MobileFooter>
              <Saved />
            </MobileFooter>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
};

export default App;
