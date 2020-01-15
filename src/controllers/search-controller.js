const Dev = require('../models/devs-model');
const parseStringAsArray = require('../utils/parse-string-array');

module.exports = {
  async index(request, response) {
    const { latitude, longitude, techs } = request.query;
    const techsArray = parseStringAsArray(techs);
    const devs = await Dev.find({
      techs: {
        $in: techsArray, // $in é um operador lógico do MongoDB
      },
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [longitude, latitude]
          },
          $maxDistance: 10000
        },
      }
    });

    return response.json();
  }
}
