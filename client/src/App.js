import './App.css';
import { BrowserRouter } from "react-router-dom";

import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";

import Routers from './router/Routers';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routers />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
