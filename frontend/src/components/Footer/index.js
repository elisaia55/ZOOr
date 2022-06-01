import React from "react";
import { Link } from "react-router-dom";
import './Footer.css'

const Footer = () => {

    return (
        <div id="splash-footer-container">
            <div id="splash-footer-nav">

                <Link className="footer-btns">About</Link>
                <Link className="footer-btns">Jobs</Link>
                <Link className="footer-btns">Blog</Link>
                <Link className="footer-btns">Developers</Link>
                <Link className="footer-btns">Guidelines</Link>
                <Link className="footer-btns">Help</Link>
                <Link className="footer-btns">Help Forum</Link>
                <Link className="footer-btns">Privacy</Link>
                <Link className="footer-btns">Terms</Link>
                <Link className="footer-btns">Cookies</Link>
                <Link className="footer-btns">Flickr Clone</Link>

            </div>
        </div>
    )
}

export default Footer;
