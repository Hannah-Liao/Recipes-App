import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RecipesBank } from "./pages/recipesBank";
import { Auth } from "./pages/auth";
import { CreateRecipe } from './pages/create-recipe';
import { SavedRecipes } from './pages/saved-recipes';
import { Navbar } from "./components/navbar/navbar";
import { Footer } from "./components/footer/footer";
import { Home } from "./pages/home";
import { About } from "./pages/about";

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/recipes-bank' element={<RecipesBank />} />
          <Route path='/auth' element={<Auth />} />
          <Route path='/create-recipe' element={<CreateRecipe />} />
          <Route path='/saved-recipes' element={<SavedRecipes />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
