const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
var admin_route = require('./Routes/MainRouter');

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

//app.use(bodyParser.json());
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    //res.header('content-type: application/json; charset=utf-8');
    next();
});
const path = require('path');
const uploadsFolderPath = path.join(__dirname, 'uploads');
app.use('/api',admin_route);
app.use('/uploads', express.static('uploads'));
app.listen(port, () => {
    console.log(`Servidor API escuchando en el puerto ${port}`);
});