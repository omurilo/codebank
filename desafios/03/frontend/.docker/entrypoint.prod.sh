#!/bin/bash

dockerize -wait tcp://api-challenge-service -timeout 90s
npm install
npm run build
npm start