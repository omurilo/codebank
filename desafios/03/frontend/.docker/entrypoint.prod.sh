#!/bin/bash

echo "Instalando pacotes npm..."
npm install
# dockerize -wait tcp://api-challenge-service:80 -timeout 360s
npm run build
npm start