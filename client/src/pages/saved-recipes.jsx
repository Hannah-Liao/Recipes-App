import { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../styles/recipe-bank.css";

import Newsletter from "../components/newsletter/Newsletter";
import RecipeCard from "../shared/recipe-card/RecipeCard";
import Pagination from "../shared/pagination/Pagination";

import { AuthContext } from "../context/AuthContext";
import { PageContext } from "../context/PageContext";
import { BASE_URL } from "../utils/config";

export const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pageCount, setPageCount] = useState(0);

    const { page } = useContext(PageContext);
    const { user } = useContext(AuthContext);
    const userID = user.data._id;

    useEffect(() => {

        const fetchSavedRecipe = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${BASE_URL}/recipes/savedRecipes/${userID}?page=${page}`);

                const recipesCount = response.data.count
                const pages = Math.ceil(recipesCount / 12)

                setPageCount(pages);
                setSavedRecipes(response.data.savedRecipes)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        };

        fetchSavedRecipe();
        window.scrollTo(0, 0)
    }, [refresh, page, userID]);
    return (
        <>
            <section>
                <div className="recipes-container">
                    {loading && <h4>Loading........</h4>}
                    {savedRecipes?.map((recipe) => (
                        <RecipeCard recipe={recipe} savedRecipes={true} refresh={refresh} setRefresh={setRefresh} key={recipe._id} />
                    ))}
                </div>

                <Pagination pageCount={pageCount} />
            </section>

            <Newsletter />
        </>
    );
}

