import React from 'react';
import "./newsletter.css";

import newsletterImg from "../../assets/images/newletter.svg";

const Newsletter = () => {
    return (
        <section className='newsletter'>

            <div className="newsletter_content">
                <h2>Subscribe now to get delicious recipes straight to your inbox!</h2>

                <div className="newsletter_input">
                    <input type="email" placeholder='Enter your email' />
                    <button className="btn newsletter_btn">Subscribe</button>
                </div>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit aut saepe ab unde nesciunt placeat debitis necessitatibus cupiditate, excepturi totam? Numquam ea odit quas reprehenderit!</p>
            </div>

            <div className="newsletter_img">
                <img src={newsletterImg} alt="" />
            </div>

        </section>
    )
}

export default Newsletter