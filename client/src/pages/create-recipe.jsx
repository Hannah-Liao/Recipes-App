import { useState, useEffect } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
    const userID = useGetUserID();
    const navigate = useNavigate();
    const [cookies, _] = useCookies(["access_token"])
    const [creator, setCreator] = useState("");

    useEffect(() => {
        const getCreator = async () => {
            try {
                const response = await axios.post("http://localhost:3001/auth/user", { userID });
                setCreator(response.data.username)
            } catch (err) {
                console.log(err)
            }
        };
        getCreator();

    }, []);

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecipe({ ...recipe, userOwner: creator, [name]: value })
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
            await axios.post("http://localhost:3001/recipes", recipe, { headers: { authorization: cookies.access_token } })
            alert("recipe created");
            console.log(recipe)
            navigate("/");
        } catch (err) {
            console.log(err)
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
                    <button className="btn" type="button" onClick={addIngredient}>Add ingredient</button>

                    <label htmlFor="instructions"> Instructions</label>
                    <textarea id="instructions" name="instructions" onChange={handleChange}></textarea>

                    <label htmlFor="imageUrl"> Image Url</label>
                    <input type="text" id="imageUrl" name="imageUrl" onChange={handleChange} />

                    <label htmlFor="cookingTime"> Cooking Time</label>
                    <input type="number" id="cookingTime" name="cookingTime" onChange={handleChange} />

                    <button className="btn" type="submit">Submit recipe</button>
                </form>

            </div>
        </div>
    );
}