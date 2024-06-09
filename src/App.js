import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/Home';
import DashboardPage from './pages/Dashboard';
import CoinPage from './pages/CoinPage';
import Compare from './pages/Compare';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage></HomePage>}></Route>
          <Route path='/dashboard' element={<DashboardPage></DashboardPage>}></Route>
          <Route path='/coin/:id' element={<CoinPage></CoinPage>}></Route>
          <Route path='/compare' element={<Compare></Compare>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
