const { Router } = require('express');

const routes = Router();

routes.post('/users', (request, response) => {
    console.log(request.body)
    return response.json({ message: 'olá'})
});

module.exports = routes;