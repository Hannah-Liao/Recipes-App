import { useState, useContext, useEffect } from "react";
import axios from "axios";
import "../styles/create-recipe.css";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";

export const CreateRecipe = () => {

    const { user } = useContext(AuthContext);
    const creator = user?.data.username;
    const token = user?.token;

    const navigate = useNavigate();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: [],
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

    const addInstruction = (e) => {
        setRecipe({ ...recipe, instructions: [...recipe.instructions, ""] })
    }

    const handleIngredientChange = (e, idx) => {
        const { value } = e.target;
        const ingredients = recipe.ingredients;
        ingredients[idx] = value
        setRecipe({ ...recipe, ingredients })
    }

    const handleInstructionsChange = (e, idx) => {
        const { value } = e.target;
        const instructions = recipe.instructions;
        instructions[idx] = value
        setRecipe({ ...recipe, instructions })
    }

    const handelSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post(`${BASE_URL}/recipes`, recipe, { headers: { authorization: token } })

            navigate("/");
        } catch (err) {
            alert(err.response.data.message);
        }

    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="createRecipe">
            <div className="createRecipe-form">
                <h2>Create Recipe</h2>

                <form onSubmit={handelSubmit}>
                    <input type="text" id="name" name="name" placeholder="Recipe Name" onChange={handleChange} />

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
                    {recipe.instructions.map((step, idx) => (
                        <textarea
                            key={idx}
                            name="instructions"
                            placeholder={`step ${idx + 1} ...`}
                            value={step}
                            onChange={(e) => { handleInstructionsChange(e, idx) }}
                        ></textarea>
                    ))}
                    <button className="btn primary_btn" type="button" onClick={addInstruction}>Add steps</button>

                    <input type="text" id="imageUrl" name="imageUrl" placeholder="Image Url" onChange={handleChange} />

                    <input type="number" id="cookingTime" name="cookingTime" placeholder="Cooking Time" onChange={handleChange} />

                    <input type="text" id="source" name="source" placeholder="Source" onChange={handleChange} />

                    <button className="btn primary_btn" type="submit">Submit recipe</button>
                </form>

            </div>
        </div>
    );
}