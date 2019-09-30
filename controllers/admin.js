var express = require('express');
var router = express.Router();
var fs = require('fs');
var reportModel = require.main.require('./models/report');
var adminModel = require.main.require('./models/admin');


router.get('/admin', function(req, res){

    if(req.session.loggedAdmin){
         res.redirect('/admin/home');
    }else{
        res.render('admin/login',{message: ""});
    }

});


router.post('/admin', function(req, res){

    var admin = {
        email: req.body.email,
        password: req.body.password,
    };


    adminModel.verifyAdmin(admin, function(valid,result){
        if(valid)
        {
            admin.id =result[0].id;
            req.session.loggedAdmin = admin;


            adminModel.getAdminInfoById(admin, function(result2){
                res.redirect('/admin/home');
            });

        }
        else
        {
            res.render('admin/login', {message: 'Invalid username or password'});
        }
    });



});


router.get('/admin/home', function(req, res){

    console.log(req.session);

    var admin ={
        id:req.session.loggedAdmin.id
    }

    adminModel.getAdminInfoById(admin, function(result2){
         res.render('admin/home',{admin:result2[0]});
    });





});


router.get('/admin/registration', function(req, res){
  res.render('admin/registration');
});

router.post('/admin/registration',function (req,res) {

    var filename = req.body.email;

    var admin={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        image:'/assets/images/admin/'+filename+'.jpg'
    }


        if (!req.files)

        return res.status(400).send('No files were uploaded.');
    var postImage = req.files.adminPhoto;
    postImage.mv('public/assets/images/admin/'+filename+'.jpg', function(err) {

        if (err)
            return res.status(500).send(err);

    });


      adminModel.registerAdmin(admin,function (result) {
          res.send("Register Successfiull");
      });

});



router.get('/admin/viewProfile', function(req, res){

    var admin ={
        id:req.session.loggedAdmin.id
    }

    adminModel.getAdminInfoById(admin, function(adminInfo){
        res.render('admin/viewProfile',{admin:adminInfo[0]});
    });

});


router.get('/admin/editProfile', function(req, res){

    var admin ={
        id:req.session.loggedAdmin.id
    }

    adminModel.getAdminInfoById(admin, function(adminInfo){
        res.render('admin/editProfile',{admin:adminInfo[0]});
    });

});

router.post('/admin/editProfile', function(req, res){

var admin={
        id:req.session.loggedAdmin.id,
        name:req.body.name,
        email:req.body.email,
        about:req.body.about
    }


    adminModel.updateAdminProfile(admin, function(adminInfo){
        res.redirect('/admin/viewProfile');
    });

});
 

router.get('/admin/ChangePassword',function(req, res){
    var admin=req.session.loggedAdmin;
    res.render('admin/ChangePassword',{admin:admin});
});

router.post('/admin/ChangePassword',function(req,res){


    var adminPass={
        id:req.session.loggedAdmin.id,
        oldPass:req.body.oldPass,
        newPass:req.body.newPass,
        conPass:req.body.conPass

    }
    adminModel.updatePaswwrod(adminPass, function(result){
     //console.log(result);
        adminModel.get(adminPass, function(result2){
           // console.log(result2);
            req.session.loggedUser = result2;
            res.redirect('/admin/home');
        });
    });

});

router.get('/admin/allUser', function(req, res){
    adminModel.getAllUser(function(result){
        //console.log(result);
        res.render('admin/allUser', {
           user:result
        });
    });
});

router.get('/admin/allAdmin', function(req, res){
    adminModel.getAllAdmin(function(result){
        //console.log(result);
        res.render('admin/allAdmin', {
           admin:result
        });
    });
});































router.get('/admin/logout', function(req, res){

    req.session.loggedAdmin=null;

    res.redirect('/admin');


});



router.get('/report', function(req, res){
    reportModel.getAllFromReport(function(result){
        res.render('admin/report',{report : result});
    });
});

router.get('/report/:reportedUserId', function(req, res){

    var reportedUserId = req.params.reportedUserId;

    reportModel.reportDetails(reportedUserId,function(result){
        res.render('admin/reportDetails',{reportDetails : result});
    });
});


router.get('/admin/enableDisableUser/:userId', function(req, res){

    var user_id = req.params.userId;

    reportModel.enableDisableUser(user_id,function(result){
        res.send(result);
    });
});




module.exports = router;
