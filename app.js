const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')
const Photo = require('./models/Photo')
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');
const photoController = require('./controllers/photoControllers');
const pageController = require('./controllers/pageController')

const app = express();

// connect DB
mongoose.connect('mongodb://localhost/pcat-test-db');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}));


// TEMPLATE ENGİNE
app.set('view engine', 'ejs');


// ROUTES

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);


app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);


const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} portunda çalışıyor.`)
})