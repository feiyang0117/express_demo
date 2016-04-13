var express = require('express');
var router = express.Router();
var user = require('../models/User');

/* GET users listing. */
var obj ;
router.use('/insert', function(req, res, next) {

    console.log("=======",req.body.username);
    var users = {
        username:req.body.username,
        password:req.body.password
    };

    user.insert(users,function (rs){
        var data = JSON.stringify(rs);
        obj = rs;
        res.redirect("/home");
        console.log(data);
        //res.end()
        next(data)
    });
});

router.get('/home', function(req, res, next) {
    console.log(typeof(obj));
    res.render('home', { title: obj.message});
    res.redirect('/login');
});

router.use('/getData', function(req, res, next) {
    user.getData(function (rs){
        var data = JSON.stringify(rs);
        console.log(rs);
        res.render('login',{title:"caonima",data:data});
        //res.setHeader("content-type")
        //res.redirect('home');
    });
});


router.use('/removeData', function(req, res, next) {
    user.delete(function(rs){
        if(rs.success){
            var data = {success:true,message:"删除成功"};
            data = JSON.stringify(data);
            res.end(data);
        }else{
            var errData = {success:false,message:"删除失败"};
            data = JSON.stringify(errData);
            res.end(data);
        }
    });
});


module.exports = router;