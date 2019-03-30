/* importar modulo do framework express */
const express = require('express');
/* import o consign */
const consign = require('consign');
/* importar o body-parser */
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

/* Iniciar o objeto do express */
var app = express();

/* setar as varaiveis que a 'view engine' e 'views' do express */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configuar o middleware express.static */
app.use(express.static('./app/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended:true}));

/* config o middleware express-validator */
app.use(expressValidator());

/* efetua o autoload das rotas, dos models e dos controllers para o obj app */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);

/* exportar o objeto app */
module.exports = app;