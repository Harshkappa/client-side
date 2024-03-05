import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [keys, setKeys] = useState([]);
  const [token, setToken] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Make a GET request using Axios
        const response = await axios.get('http://localhost:8080/jwks');
        setKeys(response.data.keys);
        console.log(response.data.keys)
      } catch (error) {
        console.error('Error fetching keys:', error);
      }
    };

    const getToken = async () => {
      try {
        // Make a GET request using Axios
        const response = await axios.post('http://localhost:8080/auth');
        setToken(response.data.token);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching keys:', error);
      }
    }
    fetchData();
    getToken();
  }, []);

  return (
    <>
    <div style={{height:'350px', width:'1000px', border:'1px solid black', borderRadius:'8px'}}>
    <h1>Keys</h1>
    <ul>
      {keys.map((key, index) => (
        <li key={index} >
          <strong>Algorithm:</strong> {key.alg}<br />
          <strong>Key Type:</strong> {key.kty}<br />
          <strong>Key ID:</strong> {key.kid}<br />
          <strong>Key use:</strong> {key.use}<br />
          <strong>Key ndf:</strong> {key.ndf}<br />
          <strong>Key exp:</strong> {key.exp}<br />
          <strong>Key n:</strong> {key.n}<br />
          {/* Add more key properties as needed */}
          </li>
        
      ))}
    </ul>
    
  </div>  
  <div style={{height:'350px', width:'1200px', border:'1px solid black', borderRadius:'8px', marginTop:"10px"}}>
  <h1>Token</h1>
   <p style={{maxWidth:'300px', fontSize:'0.8rem'}}>{token}</p>
  </div>
  </>
  );
}

export default App;
