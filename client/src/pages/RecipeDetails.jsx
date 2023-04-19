import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import axios from "axios";

import Newsletter from '../components/newsletter/Newsletter';
import "./recipe-details.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

import { BASE_URL } from '../utils/config';

const RecipeDetails = () => {

    const { id } = useParams();
    const [recipe, setRecipe] = useState({})
    const { _id, name, ingredients, instructions, imageUrl, cookingTime, source, userOwner } = recipe;
    console.log(ingredients)
    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get(`${BASE_URL}/recipes/${id}`);

            setRecipe(res.data.recipe);
        }

        fetchData()
    }, [])


    return (
        <>
            <section className='recipe_detail-head'>
                <div>
                    <h6>Recipe</h6>
                    <h1>{name}</h1>
                </div>
                <div>
                    <img src={imageUrl} alt="" />
                </div>
            </section>

            <section className='recipe_detail-body'>
                <div>
                    <h2>Ingredients</h2>
                    {ingredients?.map((ingredient, index) => (
                        <p key={index} >{ingredient}</p>
                    ))}

                    <h3>Source: {source}</h3>
                </div>
                <div>
                    <h2>Instructions</h2>
                    <p><FontAwesomeIcon icon={faClock} /> {cookingTime} mins to cook</p>

                    {instructions?.map((ingredient, index) => (
                        <div key={index}>
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