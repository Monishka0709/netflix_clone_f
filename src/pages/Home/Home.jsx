import React from 'react'
import Navbar from '../../components/Navbar/Navbar.jsx'
import './Home.css'
import heroImage from '../../assets/hero_banner2.png'
import heroTitle from '../../assets/hero_title.png'
import TitleCards from '../../components/TitleCards/TitleCards.jsx'
import Footer from '../../components/Footer/Footer.jsx'

const Home = () => {
  return (
    <div className='home'> 
      <Navbar />
      <div className="hero">
        <img src={heroImage} alt="" className='banner-image'/>
        <div className="hero-caption">
          <img src={heroTitle} alt="Hero Image"  className='banner-title'/>
          <p>
            Empowering Developers Worldwide: Your Gateway to Cutting-Edge Tech Solutions and Collaborative Innovation.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary">Get Started</button>
            <button className="btn btn-secondary">Learn More</button>
          </div>
        </div>
      </div>
      <TitleCards props={{heading:"Popular on Netflix", genre:"Action"}}/>
      <TitleCards props={{heading:"Based on True Events", genre:"Documetary"}}/>
      <TitleCards props={{heading:"Action Movies", genre:"Action"}}/>
      <TitleCards props={{heading:"Dramatic Movies", genre:"Drama"}}/>
      <Footer />
    </div>
  )
}

export default Home
