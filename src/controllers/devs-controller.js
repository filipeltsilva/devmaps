// No MongoDB, ao se trabalhar com geolocalização, a longitude deve ser salva antes da latitude

const axios = require('axios');
const Dev = require('../models/devs-model');
const parseStringAsArray = require('../utils/parse-string-array');

/*
  Controllers geralmente possuem 5 funções:
  index: mostrar uma lista
  show: mostrar apenas um registro
  store: salvar um registro
  update: atualizar um registro
  destroy: excluir um registro
*/
module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { githubUsername, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({ githubUsername });
    if (!dev) {
      const apiResponse = await axios.get(`https://api.github.com/users/${githubUsername}`);
      const { name = login, avatar_url, bio } = apiResponse.data;
      const techsArray = parseStringAsArray(techs);
      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const dev = await Dev.create({
        githubUsername,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });
    }

    return response.json(dev);
  }
}
