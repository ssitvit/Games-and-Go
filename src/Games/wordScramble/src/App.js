import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FirstPage from './FirstPage';
import SecondPage from './SecondPage';
import Navbar from './Navbar.js';

function App() {
  return (
    <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Navbar />
          <Routes>
              <Route path="/" element={<FirstPage />} />
              <Route path="/play" element={<SecondPage />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
