import React, {useRef} from "react";
import "./Header.scss";

const Header = ({sweetsRef}) => {
  const handleScrollToSweets = () => {
    if (sweetsRef?.current) {
        sweetsRef.current.scrollIntoView({behavior: "smooth"});
    }
};

    return (
        <header>
            <div className="container">
                <div className="header__top">
                    <nav>
                        <a href="#" className="logo">
                            <img src="./images/Logo_Yummy.png" alt="Logo" />
                        </a>
                        <ul>
                            <li><a href="#advice">Порада від Ямі</a></li>
                            <li><a href="#sweets" onClick={handleScrollToSweets}>Мої улюбленні солодощі</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="header__bottom">
                    <div className="header__bottom__inner">
                        <h1><span>YUMMY</span> <br /> PUG{" "} </h1>
                        <p>Всім привіт, я Ямі і я мопс, який дуже сильно полюбляє солодощі. Сьогодні я розкажу вам, чому
                        саме солодощі і чому вони так важливі в нашому житті. Доречі, моє імʼя з англійської мови
                        перекладається як “Смачний”.</p>
                        <button className="header__btn" onClick={handleScrollToSweets}>Мої улюбленні солодощі</button>
                    </div>
                    <div className="header__bottom__img">
                        <img src="./images/yummy-header-bg.png" alt="bg-img" />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;