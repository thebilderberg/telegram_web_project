import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import BurgerMenu from './project/BurgerMenu/BurgerMenu';
import Home from './project/Home/Home';
import { Clocks } from './project/Clocks/Clocks';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <BurgerMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/clocks" element={<Clocks />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
