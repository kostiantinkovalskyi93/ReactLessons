import React from "react";
import "./Advice.scss";

const Advice = () => {
    return (
        <section className="advice" id="advice">
            <div className="container advice__container">
                <div className="advice__info">
                    <h2>
                        <span>Порада –</span> <br /> від Yummy
                    </h2>
                    <p>З'ївши чергову шоколадку, ви не просто набираєте трохи додаткових калорій, але покращуєте тим
                        самим роботу мозку, настрій і стаєте трішки добрішим. Вирішивши поласувати шоколадкою,
                        віддавайте перевагу саме чорному шоколаду з високим вмістом какао-бобів. У цьому вигляді
                        шоколаду менше жиру і цукру, ніж в молочному шоколаді, але зате магнію, кальцію, заліза, білка,
                        антиоксидантів і вітамінів предостатньо.
                    </p>
                    <h3>Солодощі, які радить їсти Ямі:</h3>
                    <ul>
                        <li>Чорний шоколад</li>
                        <li>Зефір</li>
                        <li>Пастила</li>
                        <li>Мармелад</li>
                        <li>Мед</li>
                        <li>Халва</li>
                        <li>Цукати</li>
                    </ul>
                </div>
                <div className="advice__img">
                    <img src="./images/bottom-section-yummy.png" alt="bottom-yummy" />
                </div>
            </div>
        </section>
    );
};

export default Advice;