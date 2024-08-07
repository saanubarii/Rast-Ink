import React, { useState } from 'react';
import axios from 'axios';
import '../public/styles.css';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setLoading(true);
      
      const roastingResponse = await getRoastingResponse();
      setResponse(roastingResponse);
      setLoading(false);
    }
  };

  const getRoastingResponse = async () => {
    const geminiResponse = await axios.post('/api/gemini', { prompt: 'Roast this drawing' });
    const groqResponse = await axios.post('/api/groq', { prompt: 'Roast this drawing' });
    return geminiResponse.data + " " + groqResponse.data;
  };

  return (
    <div id="container">
      <div id="logo">
        <span>Ryo</span>Dev
      </div>
      <div className="upload-box" onClick={() => document.getElementById('file-input').click()}>
        Click to upload
        <input id="file-input" type="file" accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
      </div>
      {selectedImage && <img id="uploaded-image" src={selectedImage} alt="Uploaded" />}
      {loading && <div className="loading-animation"></div>}
      {!loading && response && <div>{response}</div>}
    </div>
  );
      }
