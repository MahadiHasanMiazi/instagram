var express = require('express');
var router = express.Router();
var friendsModel = require.main.require('./models/friends');


router.get('/logout', function(req, res){
    friendsModel.updateOnlineStatus(req.session.loggedUser.id, "false");
    req.session.loggedUser=null;
    res.redirect('/login');
});

module.exports = router;