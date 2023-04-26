import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/recipe-details.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import Newsletter from '../components/newsletter/Newsletter';
import { BASE_URL } from '../utils/config';

const RecipeDetails = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState({})
    const { name, ingredients, instructions, imageUrl, cookingTime, source } = recipe;
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${BASE_URL}/recipes/${id}`);

            setRecipe(res.data.recipe);
        }

        fetchData()
    }, [id])


    return (
        <>
            <section className='recipe_detail-head'>
                <div className='detail_text'>
                    <h5>Recipe</h5>
                    <h1>{name}</h1>
                </div>
                <div>
                    <img src={imageUrl} alt="recipe_image" />
                </div>
            </section>

            <section className='recipe_detail-body'>
                <div>
                    <h2>Ingredients</h2>
                    <ul>
                        {ingredients?.map((ingredient, index) => (
                            <li key={index} >{ingredient}</li>
                        ))}
                    </ul>

                    <p className='source'>Source: <span> {source}</span></p>
                </div>

                <div>
                    <h2>Instructions</h2>
                    <p><FontAwesomeIcon icon={faClock} /> {cookingTime} mins to cook</p>

                    {instructions?.map((ingredient, index) => (
                        <div className='instruction_steps' key={index}>
                            <h3>Step {index + 1}</h3>
                            <p  >{ingredient}</p>
                        </div>
                    ))}
                </div>
            </section>

            <Newsletter />
        </>
    )
}

export default RecipeDetails