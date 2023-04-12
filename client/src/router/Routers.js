import React from 'react'
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/home";
import { About } from "../pages/about";
import { RecipesBank } from "../pages/recipesBank";
import { Auth } from "../pages/auth";
import { CreateRecipe } from '../pages/create-recipe';
import { SavedRecipes } from '../pages/saved-recipes';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/recipes-bank' element={<RecipesBank />} />
            <Route path='/auth' element={<Auth />} />
            <Route path='/create-recipe' element={<CreateRecipe />} />
            <Route path='/saved-recipes' element={<SavedRecipes />} />
        </Routes>
    )
}

export default Routers