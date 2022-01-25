import React from 'react';
import Navbar from './Navbar';

const Hero = () => {
  return (
    <div>
    <Navbar/>
    <section className='hero' >
      <div className='hero-center'>
        <article className='hero-info'>
          <h1>
            WeShare - Online  Forum<br />
          </h1>
          <p>
            A platform where you can interact with others through posts and comments.
          </p>
        </article>
      </div>
    </section>
    </div>
  );
};

export default Hero;
