import React from 'react';
import keeper from './keeper.png';
const Hero = ({ handleLogout }) => {

    return(
        <section className='hero'>
            <nav>
                <h2>Welcome to Keeper 📦 
                    the storage Application</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <keeper/>
        </section>
       
    );
};

export default Hero;