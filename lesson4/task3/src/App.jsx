import { useState } from 'react';

function App() {
  const [textColor, setTextColor] = useState('rgb(0, 0, 0)');

  const changeColor = () => {
    const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
    setTextColor(randomColor);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f0f0f0'
    }}>
      <p style={{
        color: textColor,
        fontSize: '24px',
        marginBottom: '16px'
      }}>
        Це текст, колір якого змінюється при натисканні на кнопку!
      </p>
      <button
        onClick={changeColor}
        style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '12px 22px',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
      >
        Змінити колір
      </button>
    </div>
  );
}

export default App;