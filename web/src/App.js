import React, { useState, useEffect } from 'react';
import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

/*
  Os 3 conceitos mais importantes do React:
  - Componentes: é uma função que retorna algum conteúdo de interface da aplicação, seja HTML, CSS ou JS. Por convenção, a primeira letra é sempre maiúscula na sua implementação.
  - Estados: são informações passíveis de manipulação por parte dos componentes.
  - Propriedades: equivale aos atributos HTML. Passa-se o atributo props no parâmetro da função do componente para utilizá-la.
*/

// Fragment: tags sem nomenclatura utilizadas caso não queira encapsular o componente numa div.

function App() {
  const [devs, setDevs] = useState([]); //Aconselhável incializar os estados com os tipos em que serão trabalhados

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    console.log(response.data);

    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map((dev) => (
            <DevItem key={dev._id} dev={dev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
