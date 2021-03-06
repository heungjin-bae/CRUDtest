// index.js
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var helmet  = require('helmet');
var app = express();

// DB setting
mongoose.set('useNewUrlParser', true);   
mongoose.set('useFindAndModify', false); 
mongoose.set('useCreateIndex', true);     
mongoose.set('useUnifiedTopology', true); 
mongoose.connect(process.env.MONGO_DB); 
var db = mongoose.connection; 

db.once('open', function(){
  console.log('DB connected');
});

db.on('error', function(err){
  console.log('DB ERROR : ', err);
});

// Other settings
app.set('view engine', 'ejs');
app.use(helmet());
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// Routes
app.use('/',require('./routes/home'));
app.use('/contacts',require('./routes/contacts'));

// error
app.use((req, res, next) =>
    res.status(404).send('Sorry cant find that!'));

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

// Port setting
var port = 8000;
app.listen(port, function(){
  console.log('server on! http://localhost:'+port);
});