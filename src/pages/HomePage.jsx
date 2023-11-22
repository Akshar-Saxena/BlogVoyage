import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import bcrypt from 'bcryptjs'

export default function HomePage() {
  const navigate = useNavigate()
  const auth = bcrypt.hashSync(`${import.meta.env.VITE_AUTH_FALSE}`, 10)
  localStorage.setItem("token", auth)
  localStorage.removeItem("username")
  return (
    <div>
      <Navbar/>
      <div className="wrapper">
        <div className="topSection">
            <h1>Explore, Inspire, Blog.</h1>
            <button onClick={()=>navigate('/m')}>New Blog</button>
        </div>
        <hr/>
    </div>
    <div className="wrapper">
        <div className="bottomSection">
            <h4> Post a free blog and share your unique insights with the world.</h4>
            Get the access to post your blog and join our vibrant community of writers and readers. Create an account
            today to start publishing your thoughts, experiences, and expertise effortlessly. We provide the platform,
            you bring the content &#x2013 together, we'll make the web a richer, more diverse place for ideas and
            stories.
        </div>
    </div>
    <hr/>
    <div className="im">
        <img src="./100-width-slide.png"/>
    </div>
    <hr/>
    <div className="us">
        <img src="./Group 9.png" alt="us"/>
        <img src="./Arrow 1.png" alt="us"/>
        <img src="./Group 10.png" alt="us"/>
        <img src="./Arrow 1.png" alt="us"/>
        <img src="./Group 11.png" alt="us"/>
        <img src="./Arrow 1.png" alt="us"/>
        <img src="./Group 12.png" alt="us"/>
    </div>
    <div className="mentor">
        <h1>Meet our Mentors</h1>
        <img src="./image 1.png" alt="mentor"/>
    </div>
    <hr/>
      <Footer/>
    </div>
  )
}
