import './App.css';
import { useState } from 'react';

function App() {
  const [term, setTerm] = useState("")

  const [query, setQuery] = useState("")
  const handleQueryChange = (event) => setQuery(event.target.value);

  const peticion = async () => {
    const response = await fetch('https://api.adviceslip.com/advice');
    const data = await response.json();
    console.log(data);
    setTerm(data.slip.advice);
  }
  
  const busqueda = async () => {
    try {
      const response = await fetch(`https://api.adviceslip.com/advice/search/${query}`);
      const data = await response.json();
      console.log(data);
      setTerm(data.slips.advice);
    } catch (error) {
      console.error(error);
      setTerm("Error: No se encontró ningún consejo"); 
    }
  };

  return (
    <main>
      <h1>Evaluación React - Requests</h1>
      <h1>Consejos de vida</h1>
  
      <div>
        <h2>Obtener un consejo aleatorio</h2>
        <button onClick={peticion}>Obtener consejo</button>
        <p className="result-box">{term}</p>
      </div>
  
      <div>
        <h2>Buscar un consejo</h2>
        <input type="text" onChange={handleQueryChange} />
        <button onClick={busqueda}>Buscar consejo</button>
        <h3>Resultados de búsqueda:</h3>
        <p className="result-box">{query}</p> 
      </div>
    </main>
  );
};

export default App;