'use strict'
const express = require('express');
const multer = require('multer');
var adminController = require('../Controller/MainController');

var api = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Carpeta donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname); // Nombre original del archivo
    }

  });
  const upload = multer({ storage: storage });


api.post('/agregar',adminController.registro2);
api.post('/recuperar',adminController.recupera);
api.post('/busca',adminController.busca);
api.post('/edita',adminController.edita);
api.post('/borrar',adminController.borrar);


api.post('/agregar2', upload.single('imagen'),adminController.registro);
module.exports = api;