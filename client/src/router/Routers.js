import React from 'react'
import { Routes, Route } from "react-router-dom";

import { Home } from "../pages/home";
import { About } from "../pages/about";
import { RecipesBank } from "../pages/recipesBank";
import Login from '../pages/Login';
import Register from '../pages/Register';
import RecipeDetails from '../pages/RecipeDetails';
import { CreateRecipe } from '../pages/create-recipe';
import { SavedRecipes } from '../pages/saved-recipes';

const Routers = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/recipes-bank' element={<RecipesBank />} />
            <Route path='/recipes/:id' element={<RecipeDetails />}></Route>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/create-recipe' element={<CreateRecipe />} />
            <Route path='/saved-recipes' element={<SavedRecipes />} />
        </Routes>
    )
}

export default Routers