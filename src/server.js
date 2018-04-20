'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const Alexa = require('alexa-sdk');

const handlers = require('./app').handlers;

const server = express();
server.use(bodyParser.json());

server.post('/', (req, res) => {
  const context = {
    fail:       () => res.sendStatus(500),
    succeed:  data => res.send(data)
  };

  const alexa = Alexa.handler(req.body, context);
  alexa.APP_ID = process.env.ALEXA_APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
});

const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`started on port ${port}`));
