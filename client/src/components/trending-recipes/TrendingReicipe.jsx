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
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRecipe = async () => {
            setLoading(true)
            try {
                const response = await axios.get(`${BASE_URL}/recipes`);
                setRecipes(response.data.recipes)
                setLoading(false)
            } catch (err) {
                console.log(err)
                setLoading(false)
            }
        };
        fetchRecipe();
    }, []);


    return (
        <Slider {...settings}>

            {loading && <h4>Loading........</h4>}

            {recipes?.map((recipe) => (
                <RecipeCard recipe={recipe} key={recipe._id} trending={true} />
            ))}

        </Slider>
    )
}

export default TrendingReicipe