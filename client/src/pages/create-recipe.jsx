import { useState, useEffect, useContext } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

export const CreateRecipe = () => {

    const { user } = useContext(AuthContext);
    const creator = user.data.username;
    const token = user.token;

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: creator,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, [name]: value })
    }

    const addIngredient = (e) => {
        setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] })
    }

    const handleIngredientChange = (e, idx) => {
        const { value } = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value
        setRecipe({ ...recipe, ingredients })
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await axios.post(`${BASE_URL}/recipes`, recipe, { headers: { authorization: token } })

            navigate("/");
        } catch (err) {
            alert(err.response.data.message);
        }

    };

    return (
        <div className="createRecipe">
            <div className="createRecipe-form">
                <h2>Create Recipe</h2>

                <form onSubmit={handelSubmit}>
                    <label htmlFor="name">Recipe Name</label>
                    <input type="text" id="name" name="name" onChange={handleChange} />

                    <label htmlFor="ingredients"> Ingredients</label>
                    {recipe.ingredients.map((ingredient, idx) => (
                        <input
                            key={idx}
                            type="text"
                            name="ingredients"
                            value={ingredient}
                            onChange={(e) => { handleIngredientChange(e, idx) }}
                        />
                    ))}
                    <button className="btn primary_btn" type="button" onClick={addIngredient}>Add ingredient</button>

                    <label htmlFor="instructions"> Instructions</label>
                    <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

                    <label htmlFor="imageUrl"> Image Url</label>
                    <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />

                    <label htmlFor="cookingTime"> Cooking Time</label>
                    <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />

                    <button className="btn primary_btn" type="submit">Submit recipe</button>
                </form>

            </div>
        </div>
    );
}