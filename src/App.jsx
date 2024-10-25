import { Outlet } from 'react-router-dom';
import './App.css'
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer';

function App() {
  return (
    <div className="mx-auto flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="container mx-auto flex-grow">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default App
