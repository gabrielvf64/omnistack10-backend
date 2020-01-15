const express = require('express');
const mongoose = require('mongoose');

const app = express();

// MongoDB (Não-relacional)
// Mongoose para conversar o node com mongo

// Conectado com o banco remoto
mongoose.connect('mongodb+srv://omnistack:omnistack@cluster0-b6kom.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Express, use o formato json
app.use(express.json());

app.post('/users', (request, response) => {
    console.log(request.body)
    return response.json({ message: 'olá'})
});

app.listen(3333);