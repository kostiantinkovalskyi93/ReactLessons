import React from 'react';

function App() {
    return React.createElement(
        'div',
        null,
        React.createElement('h1', null, "Головний заголовок без використання JSX"),
        React.createElement('h2', null, "Заголовок без використання JSX"),
        React.createElement('p', null, "Створюємо новий параграф без використання JSX"),
        React.createElement("img", {
            src: "https://uk.m.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:Vue.js_Logo_2.svg",
            alt:"Іконка Vue.js"
        })
    );
}

export default App;