import React, { useEffect, useState } from 'react'
import Slider from "react-slick";

import RecipeCard from "../../shared/recipe-card/RecipeCard";
import axios from "axios";
import { BASE_URL } from '../../utils/config';

const TrendingReicipe = () => {

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        swipeToSlide: true,
        autoplaySpeed: 2000,
        slidesToShow: 4,

        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]

    }

    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipe = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/recipes`);
                setRecipes(response.data.recipes)
            } catch (err) {
                console.log(err)
            }
        };
        fetchRecipe();
    }, []);


    return (
        <Slider {...settings}>

            {recipes?.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe._id} />
            ))}

        </Slider>
    )
}

export default TrendingReicipe