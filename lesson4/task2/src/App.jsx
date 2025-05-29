import React, {useState, useCallback} from "react";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f0f0f0',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '1rem',
  },
  number: {
    fontSize: '1.25rem',
    color: '#555',
    marginBottom: '1.5rem',
  },
  button: {
    padding: '0.75rem 1.5rem',
    fontSize: '1rem',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#4b5eAA',
    border: 'none',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  buttonHover: {
    backgroundColor: '#3b4e9a',
  },
};

function App() {
  const [randomNumber, setRandomNumber] = useState(null);

  const handleGenerateRandom = useCallback(() => {
    setRandomNumber(() => Math.floor(Math.random() * 101));
  }, []);

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}Випадкове число></h1>
      <p style={styles.number}>{randomNumber ?? 'Натисни, щоб згенерувати'}</p>
      <button style={styles.button} 
      onClick={handleGenerateRandom}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = styles.buttonHover.backgroundColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)}
      aria-label="Згенерувати нове випадкове число">Згенерувати</button>
    </main>
  )
}

export default App;