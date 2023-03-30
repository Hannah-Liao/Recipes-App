import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();

    useEffect(() => {

        const fetchSavedRecipe = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes)
            } catch (err) {
                console.log(err)
            }
        };

        fetchSavedRecipe();
    }, [savedRecipes]);

    const DeleteRecipe = async (savedRecipesID) => {
        try {
            const response = await axios.patch(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`,
                { savedRecipesID }
            );
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="recipes-container">

            {savedRecipes.map((recipe) => (
                <div key={recipe._id} className="recipes-row">
                    <img src={recipe.imageUrl} alt={recipe.name} />
                    <div>
                        <h2>{recipe.name}</h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <p>Cooking time: {recipe.cookingTime} (mins)</p>
                    <button className="btn delete-btn" onClick={() => DeleteRecipe(recipe._id)}>Delete</button>
                </div>
            ))}

        </div>
    );
}

