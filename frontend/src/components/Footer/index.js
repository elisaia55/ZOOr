import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

import ReactLogo from '../../images/ReactIcon.jpg'
import PostGresql from '../../images/NewIcon.png'
import ReduxIcon from '../../images/ReduxIcon.png'
import ExpressIcon from '../../images/ExpressIcon.png'
import FlickrLogo from '../../images/FlickrLogoFinal.png'

import Github from '../../images/GitHubIcon.png'
import Linkedin from '../../images/LinkedinIcon.png'



const Footer = () => {

    return (
        <div id="splash-footer-container">
            <div id="splash-footer-nav">

                <Link to='/about' className="footer-btns">About</Link>
                <a className="technology-link" href='https://expressjs.com/en/api.html' ><img className='tech-2' src={ ExpressIcon }></img></a>
                <a className="technology-link" href='https://reactjs.org/docs/getting-started.html'><img className='tech-2' src={ ReactLogo }></img></a>
                <a className="technology-link" href='https://www.postgresql.org/docs/'><img className='tech-2' src={ PostGresql }></img></a>
                <a className="technology-link" href='https://redux.js.org/' ><img className='tech-2' src={ ReduxIcon }></img></a>
                <a href='https://github.com/elisaia55/ZOOr'> <img className='tech-2' src={ Github }></img>  </a>
                <a href='https://www.linkedin.com/in/augustino-elisaia-7307a822b/' > <img className='tech-2' src={ Linkedin }></img> </a>
                <a href='https://www.flickr.com/' > <img className='tech-3' src={ FlickrLogo }></img> </a>

            </div>
        </div>
    )
}

export default Footer;
