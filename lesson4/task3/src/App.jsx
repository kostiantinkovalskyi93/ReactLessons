import { useState } from 'react';

function App() {
  const [textColor, setTextColor] = useState('rgb(0, 0, 0)');

  const changeColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    setTextColor(randomColor);
  };

  return (
    <div className='container'>
      <p style={{color: textColor}} className='text'>
        Текст, колір якого змінюється при натисканні на кнопку.
      </p>
      <button
        onClick={changeColor} className='button'>
        Змінити колір
      </button>
    </div>
  );
}

export default App;