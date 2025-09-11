import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
          <Route index path="/" element={<Home />} />
          <Route index path="/clocks" element={<Clocks />} />
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
