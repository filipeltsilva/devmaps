import React, { useEffect, useState } from 'react';
import './styles.css';

function DevForm( {onSubmit} ) {
  const [githubUsername, setGitHubUsername] = useState('');
  const [techs, setTechs] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    await onSubmit({
      githubUsername,
      techs,
      latitude,
      longitude
    });

    setGitHubUsername('');
    setTechs('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="githubUsername">Usuário do GitHub</label>
        <input name="githubUsername" id="githubUsername" required
          value={githubUsername} onChange={(e) => setGitHubUsername(e.target.value)} />
      </div>

      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input name="techs" id="techs" required
          value={techs} onChange={(e) => setTechs(e.target.value)}/>
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input type="number" name="latitude" id="latitude" required
            value={latitude} onChange={(e) => setLatitude(e.target.value)} />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input type="number" name="longitude" id="longitude" required
            value={longitude} onChange={(e) => setLongitude(e.target.value)} />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
