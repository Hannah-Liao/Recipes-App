import { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useCookies } from "react-cookie";

export const RecipesBank = () => {
    const [recipes, setRecipes] = useState([]);
    const [savedRecipesID, setSavedRecipesID] = useState([]);
    const [cookies, _] = useCookies(["access_token"])
    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data)
            } catch (err) {
                console.log(err)
            }
        };

        const fetchSavedRecipesID = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipesID(response.data.savedRecipes)

            } catch (err) {
                console.log(err)
            }
        };

        fetchRecipe();
        if (cookies.access_token) { fetchSavedRecipesID(); }

    }, []);

    const saveRecipe = async (recipeID) => {
        try {
            const response = await axios.put("http://localhost:3001/recipes",
                { recipeID, userID },
                { headers: { authorization: cookies.access_token } });
            setSavedRecipesID(response.data.savedRecipes)
        } catch (err) {
            console.log(err)
        }
    };

    const isRecipeSaved = (id) => savedRecipesID.includes(id);

    return (
        <div className="recipes-container">

            {recipes.map((recipe) => (
                <div key={recipe._id} className="recipes-row" >
                    <img src={recipe.imageUrl} alt={recipe.name} />
                    <div>
                        <h2><span className="underline-card-text">{recipe.name}</span></h2>
                    </div>
                    <div className="instructions">
                        <p>{recipe.instructions}</p>
                    </div>
                    <p>Cooking time: {recipe.cookingTime} (mins)</p>
                    <p>Creator: {recipe.userOwner}</p>
                    <button className="btn" onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)}>
                        {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
                    </button>
                </div>
            ))}

        </div>
    );
}