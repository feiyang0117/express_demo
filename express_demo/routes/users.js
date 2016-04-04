var express = require('express');
var router = express.Router();
var user = require('../models/User');

/* GET users listing. */

router.use('/insert', function(req, res, next) {
    user.update(function (rs){
        var data = JSON.stringify(rs);
        res.end(data)
    });
});



router.use('/getData', function(req, res, next) {
    res.setHeader('Content-Type','application/json;charset=UTF-8');
    user.getData(function (rs){
        var data = JSON.stringify(rs);
        res.render('login',{title:"caonima",data:data});
        //res.setHeader("content-type")
        //res.redirect('home');
    });
});


router.use('/removeData', function(req, res, next) {
    res.setHeader('Content-Type','application/json;charset=UTF-8');
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