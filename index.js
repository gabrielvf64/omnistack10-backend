const express = require('express');

const app = express();

app.get('/users', (request, response) => {
    console.log(request.query)
    return response.json({ message: 'olá'})
})

app.listen(3333);