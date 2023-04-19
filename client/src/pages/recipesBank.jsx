import { useEffect, useState, useContext } from "react";
import axios from "axios";

import Newsletter from "../components/newsletter/Newsletter";
import RecipeCard from "../shared/recipe-card/RecipeCard";
import Pagination from "../shared/pagination/Pagination";

import { PageContext } from "../context/PageContext";
import { BASE_URL } from "../utils/config";

export const RecipesBank = () => {
    const [recipes, setRecipes] = useState([]);
    const [refresh, setRefresh] = useState(true);

    const [pageCount, setPageCount] = useState(0);

    const { page } = useContext(PageContext);

    useEffect(() => {

        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/recipes?page=${page === 0 ? 0 : page - 1}`);
                const res = await axios.get(`${BASE_URL}/recipes/search/getRecipeCount`);
                const recipesCount = res.data.data

                const pages = Math.ceil(recipesCount / 12)
                setPageCount(pages);
                setRecipes(response.data.recipes)

            } catch (err) {
                console.log(err)
            }
        };
        fetchRecipe();

        window.scrollTo(0, 0)
    }, [page, refresh]);

    return (
        <>
            <div className="recipes-container">

                {recipes?.map((recipe) => (
                    <RecipeCard recipe={recipe} refresh={refresh} setRefresh={setRefresh} key={recipe._id} />
                ))}
            </div>

            <Pagination pageCount={pageCount} />

            <Newsletter />
        </>
    );
}