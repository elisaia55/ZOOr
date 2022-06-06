
import './AboutMe.css'
import Github from '../../images/GitHubIcon.png'
import Linkedin from '../../images/LinkedinIcon.png'
import Logo from '../../images/ZOOr.png'
import ReactLogo from '../../images/ReactIcon.jpg'
import PostGresql from '../../images/NewIcon.png'
import ReduxIcon from '../../images/ReduxIcon.png'
import ExpressIcon from '../../images/ExpressIcon.png'


const AboutMe = () => {
    return (
        <div className='about-outer-container'>
            <p className='about-header'>ZOOr</p>
            <div className='about-dev'>

                <p className='dev-info'>ZOOr, a Flickr clone Developed by Augustino Elisaia</p>
                <a href='https://github.com/elisaia55/ZOOr'> <img className='git-hub-link' src={ Github }></img>  </a>
                <a href='https://www.linkedin.com/in/augustino-elisaia-7307a822b/' > <img className='linked-in-link' src={ Linkedin }></img> </a>


            </div>
            <p className='tech-header'>Technologies Used</p>
            <div className='tech-div'>
                <a className="technology-link" href='https://expressjs.com/en/api.html' ><img className='tech-icon' src={ ExpressIcon }></img></a>
                <a className="technology-link" href='https://reactjs.org/docs/getting-started.html'><img className='tech-icon' src={ ReactLogo }></img></a>
                <a className="technology-link" href='https://www.postgresql.org/docs/'><img className='tech-icon' src={ PostGresql }></img></a>
                <a className="technology-link" href='https://redux.js.org/' ><img className='tech-icon' src={ ReduxIcon }></img></a>
            </div>
        </div>
    )
}

export default AboutMe;
