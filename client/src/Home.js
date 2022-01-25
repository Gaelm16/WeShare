import React from 'react';
import Navbar from './Navbar';
import Commentpage from './Commentpage';
import './index.css';

const Home = () => {
  return (
    <main>
      <Navbar/>
      <Commentpage/>
    </main>
  );
}

export default Home