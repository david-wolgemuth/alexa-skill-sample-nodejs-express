'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const Alexa = require('alexa-sdk');

const handlers = require('./app').handlers;

// Initialize express server
const server = express();
server.use(bodyParser.json());

// Create POST route
server.post('/', (req, res) => {
  // Create dummy context with fail and succeed functions
  const context = {
    fail: () => {
      // Simply fail with internal server error
      res.sendStatus(500);
    },
    succeed: data => {
      // console.log(data)
      res.send(data);
    }
  };

  // Initialize alexa sdk
  const alexa = Alexa.handler(req.body, context);
  alexa.APP_ID = process.env.ALEXA_APP_ID;
  alexa.registerHandlers(handlers);
  alexa.execute();
});

// Start express server
const port = process.env.PORT || 3000;
server.listen(port, () => console.log(`started on port {port}`));
