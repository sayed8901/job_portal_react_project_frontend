import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div className="container mx-auto flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className='flex-grow'>
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App
