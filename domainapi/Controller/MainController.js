'use strict'
const multer = require('multer');
const mysql = require('mysql');
const FormData = require('form-data');
const formidable = require('formidable');
const fs = require('fs');


const { response } = require('express');
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'prueba'
});
const registro = async function(req,res){
    var workflow = req.body.Workflow;
    var assignes = req.body.Assignes;
    var summary = req.body.Summary;
    var starts=req.body.Stars;
    var extra = req.body.extra;
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    var da1;
    if(month < 10){
        da1=`${year}-0${month}-${day}`;
    }else{
        da1=`${year}-${month}-${day}`;
    }
   
    var user="ANONIMO";
    const imagenPath = req.body.imagen;//req.file ? req.file.path : '';
    const ima = Buffer.from(imagenPath, 'base64');
    const sql = `INSERT INTO ideas (starts, date, summary, assignes, workflow, image, user) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const values = [starts, date, summary, assignes, workflow, imagenPath, user];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        console.error('Error al insertar datos: ');
        res.sendStatus(500);
      } else {
        console.log('Datos insertados correctamente');
        res.sendStatus(200);
      }
    });

}
const recupera = async function(req,res){
    try {
        console.log("recupera");
        const sql = `SELECT * FROM prueba.ideas2;`;
       db.query(sql,(err, result) => {
           if (err) {
           console.error('Error al insertar en la base de datos: ', err);
           console.log("[mysql error]",err);
           res.sendStatus(500);
           } else {
           console.log('Datos Consultados OK');
           res.status(200).send({code:0,message:"OK", data:result});
           }
       });
       } catch (error) {
          console.log("error",error);
          res.sendStatus(200);
       }
      
}
const busca = async function(req,res){
    try {
        console.log("busca",req.body);
        const sql = `SELECT * FROM prueba.ideas2 where id=`+req.body.id;
       db.query(sql,(err, result) => {
           if (err) {
           console.error('Error al insertar en la base de datos: ', err);
           console.log("[mysql error]",err);
           res.sendStatus(500);
           } else {
           console.log('Datos Consultados OK');
           res.status(200).send({code:0,message:"OK", data:result});
           }
       });
       } catch (error) {
          console.log("error",error);
          res.sendStatus(200);
       }
      
}
const edita = async function(req,res){
    try {
console.log(req.body);
        var starts=req.body.Stars;
        var user="ANONIMO";
        var workflow = req.body.Workflow;
        var assignes = req.body.Assignes;
        var summary = req.body.Summary;
        var extra = req.body.extra;
        var imagen=req.body.imagen;
        
        var id=req.body.id;
        var sql; 
if(imagen==undefined){
    sql = 'UPDATE `prueba`.`ideas2` SET `starts` = '+starts+', `Workflow` = "'+workflow+'", `Assignes` = "'+assignes+'", `Summary` = "'+summary+'" WHERE (`id` = '+id+'); '

}else{
    sql = 'UPDATE `prueba`.`ideas2` SET `starts` = '+starts+', `Workflow` = "'+workflow+'", `Assignes` = "'+assignes+'", `Summary` = "'+summary+'", `image` = "'+imagen+'" WHERE (`id` = '+id+'); '
}
        
       db.query(sql,(err, result) => {
           if (err) {
           console.error('Error al insertar en la base de datos: ', err);
           console.log("[mysql error]",err);
           res.sendStatus(500);
           } else {
           console.log('Datos editados OK');
           res.status(200).send({code:0,message:"OK", data:result});
           }
       });
       } catch (error) {
          console.log("error",error);
          res.sendStatus(200);
       }
      
}
const borrar = async function(req,res){
    try {
        var id=req.body.id;

        const sql = 'DELETE FROM `prueba`.`ideas2` WHERE (`id` = '+id+');'
       db.query(sql,(err, result) => {
           if (err) {
           console.error('Error al insertar en la base de datos: ', err);
           console.log("[mysql error]",err);
           res.sendStatus(500);
           } else {
           console.log('Datos borrados OK');
           res.status(200).send({code:0,message:"OK", data:result});
           }
       });
       } catch (error) {
          console.log("error",error);
          res.sendStatus(200);
       }
      
}
function contecta(){
    
      db.connect((err) => {
        if (err) {
          console.error('Error al conectar a la base de datos:', err);
          return;
        }
        console.log('Conexión a la base de datos exitosa!');
      });
}
function formatofecha(){
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()
    var da1;
    if(month < 10){
        da1=`${year}-0${month}-${day}`;
    }else{
        da1=`${year}-${month}-${day}`;
    }
    return da1;
}
const registro2 = async function(req,res){
    console.log("entra",req.body);
    var starts=req.body.Stars;
        var user="ANONIMO";
        var workflow = req.body.Workflow;
        var assignes = req.body.Assignes;
        var summary = req.body.Summary;
        var extra = req.body.extra;
        var imagen=req.body.imagen;


        var date=formatofecha();

        const sql = `INSERT INTO ideas2 (starts, date, summary, assignes, workflow, image, user) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        const values = [starts, date, summary, assignes, workflow, imagen, user];
    
        db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error al insertar datos: ',err);
            res.sendStatus(500);
        } else {
          
            
           
            console.log('Datos insertados correctamente');
            res.sendStatus(200);
        }
        });
        

       
    
}

module.exports = {
    registro
    ,recupera
    ,registro2
    ,busca
    ,edita
    ,borrar
}