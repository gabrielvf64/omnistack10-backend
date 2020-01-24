const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name = loing, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude]
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location
      });

      // Filtrar as conexões do arrary e buscar as que satisfaçam as regras de negocio
      // max 10 km de distancia
      // dev tem que ter pelo menos uma tec

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      console.log(sendSocketMessageTo);
    }

    return response.json(dev);
  }
};
