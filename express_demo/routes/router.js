/**
 * Created by gao on 16/3/29.
 */
var express = require('express');
var router = express.Router();

router.get("/login",function(req,res){
    res.render("login",{title:"测试"});
});

module.exports = router;