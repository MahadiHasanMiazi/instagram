// require
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');

//database
var inboxModel = require.main.require('./models/inbox');
var friendsModel = require.main.require('./models/friends');

var home = require('./controllers/home');
var profile = require('./controllers/profile');
var login = require('./controllers/login');
var registration = require('./controllers/registration');
var ajax = require('./controllers/ajax');
var inbox = require('./controllers/inbox');
var accounts = require('./controllers/accounts');
var friends = require('./controllers/friends');
var logout = require('./controllers/logout');
var react = require('./controllers/react');
// var report = require('./controllers/report');
var notifications = require('./controllers/notifications');
var block = require('./controllers/block');
var post = require('./controllers/post');
var admin = require('./controllers/admin');

var port = 8000;
// configure
app.set('view engine', 'ejs');

// middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(expressSession({secret: 'secret', resave: false, saveUninitialized:true}));
app.use(fileUpload());
app.use(cookieParser());

// routes
app.get('/', function(req, res){
    res.redirect('/login');
});


app.use(express.static(__dirname + '/public'));
app.use(profile);
app.use(home);
app.use(login);
app.use(registration);
app.use(ajax);
app.use(inbox);
app.use(accounts);
app.use(friends);
app.use(logout);
app.use(react);
// app.use(report);
app.use(notifications);
app.use(block);
app.use(post);
app.use(admin);

app.use(function(req, res, next) {
  if (req.session.loggedUser){
      res.render('profile/block',{
          user : req.session.loggedUser
      });
  }else{
      res.render('profile/error404');
  }


});

var UserId = [];

var date = new Date();

var year = date.getFullYear();

var month = date.getMonth() + 1;
month = (month < 10 ? "0" : "") + month;

var day  = date.getDate();
day = (day < 10 ? "0" : "") + day;

var h =  date.getHours(), m = date.getMinutes();
var time = (h > 12) ? (h-12 + ':' + m +' PM') : (h + ':' + m +' AM');
var datetime = day + "-" + month + "-" + year + " " + time;

io.on('connection', function(socket){

    //getting userId from client & storing to server
    socket.on('get userId', function (id) {
        UserId[id] = socket;
        console.log('user = '+id+' is connected');
        socket.emit('online status', id);
    });

    //sending private text to specific client
    socket.on('chat message', function(msg, from, to){

        //storing message to database
        inboxModel.insert(msg, from, to, function (insert) {
        });

        friendsModel.setMiniText(msg, from, to, datetime, function (insert) {

        });

        friendsModel.setMiniText2(msg, to, from, datetime, function (insert) {
            console.log(insert);
        });

        if(UserId[to]){
            UserId[to].emit('chat message', msg, from);
        }else {
            console.log('user = '+to+' is offline');
        }

    });

    //Typing animation
    socket.on('is typing', function () {
        socket.emit('is typing');
    });

    socket.on('disconnect', function(){
        console.log('user disconnected');
    });

});

// server
server.listen(port, function(){
    console.log('Server started at ' + port + ' port....');
});