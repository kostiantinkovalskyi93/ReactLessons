import React from "react";
import "./Footer.scss";

const Footer = () => {
    return (
            <footer>
        <div className="container footer__container">
            <a href="#">
                <img src="./images/LogoYummy.svg" alt="logo" />
            </a>
            <h3>Приєднуйся і живи зі мною у світі солодощів!</h3>
        </div>
    </footer>
    );
};

export default Footer;