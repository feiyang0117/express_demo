/**
 * Created by gao on 16/3/25.
 */
var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = require("./setting");
//测试数据库是否插入数据;
exports.test = function(callback){
    MongoClient.connect(mongodbUrl.mongodb, function(err, db) {
        var json = require('mongodb/test.json');
        db.collection('t').insertOne(json, function(err, data) {
            callback(data);
            db.close();
        })
    });
};
