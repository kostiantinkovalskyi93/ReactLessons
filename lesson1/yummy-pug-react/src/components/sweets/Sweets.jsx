import React from "react";
import "./Sweets.scss";

const Sweets = () => {
    return (
        <section className="sweets" id="sweets">
            <div className="container">
                <h2 className="sweets__title">
                    <span>мої улюблені</span> солодощі
                </h2>
                <div className="sweets__container">
                <article className="sweets__container__item">
                        <img src="./images/sweet-1.png" alt="img" />
                        <h3>Червоний мак</h3>
                        <p>Пралене з додаванням карамельної крихти, пасти ядер горіхів фундука та мигдалюпокрите шоколадною глазурʼю</p>
                    </article>
                    <article className="sweets__container__item">
                        <img src="./images/sweet-3.png" alt="img" />
                        <h3>Сливки-ленивки</h3>
                        <p>Світлі вафельні листи, поєднані молочно-вершковою начинкою та покриті глазур’ю.</p>
                    </article>
                    <article className="sweets__container__item">
                        <img src="./images/sweet-2.png" alt="img" />
                        <h3>Ліщина</h3>
                        <p>Праліне з додаванням подрібненої та тертої ліщини та мигдалю, покрите шоколадною глазур’ю.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
};

export default Sweets;