import './App.css';
import { Routes, Route } from 'react-router-dom';

import Home from './Pages/Home';
import Maps from './Pages/Maps';
import Header from './Components/Header';

function App() {

  return (
    <div className='Container'>
      <Header />
      <div className='ContentApp'>
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/maps/:type-:id" element={<Maps />} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
