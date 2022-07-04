
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.use(bodyParser.json());

mongoose
  .connect('mongodb://db:27017/database', {
    useNewUrlParser: true
  })
  .then(result => {
    console.log('MongoDB Conectado');
  })
  .catch(error => {
    console.log(error);
  });

app.listen(process.env.PORT || 6002, () => console.log(`Server ativo na porta ${process.env.PORT || 6002}`));