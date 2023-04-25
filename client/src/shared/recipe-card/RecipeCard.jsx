import React, { useContext, useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

import "./recipe-card.css";

import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";

const RecipeCard = ({ recipe, savedRecipes, refresh, setRefresh }) => {

    const { _id, name, ingredients, instructions, imageUrl, cookingTime, source, userOwner } = recipe;
    const [savedRecipesID, setSavedRecipesID] = useState([]);

    const { user } = useContext(AuthContext);
    const userID = user?.data._id;
    const userName = user?.data.username
    const token = user?.token

    useEffect(() => {

        const fetchSavedRecipesID = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipesID(response.data.savedRecipes)
            } catch (err) {
                console.log(err)
            }
        };

        if (user) { fetchSavedRecipesID(); }

    }, [setSavedRecipesID]);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put(`${BASE_URL}/recipes`,
                { recipeID, userID },
                { headers: { authorization: token } });

            setSavedRecipesID(response.data.savedRecipes)
        } catch (err) {
            console.log(err)
        }
    };

    const isRecipeSaved = (id) => savedRecipesID?.includes(id);

    const RemoveRecipe = async (savedRecipesID) => {
        try {
            setRefresh(!refresh)
            await axios.patch(`${BASE_URL}/recipes/savedRecipes/ids/${userID}`,
                { savedRecipesID }
            );
        } catch (err) {
            console.log(err)
        }
    };

    const DeteleRecipe = async (RecipesID) => {
        try {
            setRefresh(!refresh)
            await axios.delete(`${BASE_URL}/recipes/${RecipesID}`);
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className='recipe_card'>

            <div className="recipe_img">
                <img src={imageUrl} alt="" />
            </div>

            <div className='card_body'>
                <h2 className="recipe_title"><Link to={`/recipes/${_id}`}>{name}</Link></h2>
                <h6>Creator: <span> {userOwner}</span></h6>

                <div className="card_bottom">
                    {
                        !savedRecipes ? <button className="btn recipe_card_btn" onClick={() => saveRecipe(_id)} disabled={isRecipeSaved(_id)}>
                            {isRecipeSaved(_id) ? "Saved" : "Save"}
                        </button>
                            : <button className="btn btn-dark" onClick={() => RemoveRecipe(_id)}>Remove</button>
                    }

                    {
                        userName === userOwner ? <button className="btn delete-btn" onClick={() => DeteleRecipe(_id)}>Detele</button> : null
                    }
                </div>


            </div>

        </div>
    )
}

export default RecipeCard