/**
 * Created by gao on 16/3/25.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */

router.use('/test', function(req, res ,next) {
    res.render('test',{'title':"/testa",data:{key:1}});
});

router.use('/testa', function(req, res ,next) {
    var data = {title:"12334556",data:{key:1}};
    data = JSON.stringify(data);
    res.end(data);
});

router.get('/testRouter', function(req, res,next) {
    //use.send('test');

    res.set('Content-Type', 'application/json');
    //res.render('test',{title:"ooooooooo"});
    setTimeout(function(){
        res.redirect('/index');
    },1000)

});


module.exports = router;