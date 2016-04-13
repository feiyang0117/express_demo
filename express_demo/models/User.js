///**
// * Created by gao on 16/3/8.
// */
//var mongodb = require("./db");
//
//function User(user){
//    this.name = user.name;
//    this.password = user.password;
//}
//
///*å¢å ç¨æ·éææ¥å¯»æ¹æ³*/
//User.find = function(username,callback){
//    mongodb.open(function(err,db){
//        if(err){
//            return callback(err);
//        }
//        db.collection("Users",function(err,connection){
//            if(err){
//                mongodb.close();
//                return callback(err);
//            }
//            //æ¥æ¾nameå±æ§ä¸ºusernameçææ¡£
//            connection.find({name:username},function(err,doc){
//                mongodb.close();
//                if(doc){
//                    //å°è£ææ¡£ä¸ºuserå¯¹è±¡
//                    var user = new User(doc);
//                    callback(err,doc);
//
//
//                }else{
//                    callback(err,null);
//                }
//
//            })
//        })
//    });
//};
//
////è®²Userç±»ç»äºæ¥å£
//module.exports = User;
///*
//* */
//User.prototype.save = function save(){
//    //å­å¥mongodbçææ¡£
//    var user = {
//        name:this.name,
//        password:this.password
//    };
//    mongodb.open(function(err,db){
//        if(err){
//            return callback(err);
//        }
//        //è¯»åuserséå
//        db.collection("Users",function(err,collection){
//            if(err){
//                mongodb.close();
//                return callback(err);
//            }
//            //ä¸ºnameå±æ§å¢å ç´¢å¼
//            collection.ensureIndex("name",{unique:true});
//            //åå¥Userææ¡£
//            collection.insert(Users,{save:true},function(err){
//                mongodb.close();
//                callback(err);
//            });
//        })
//
//    });
//};


var MongoClient = require('mongodb').MongoClient;
var mongodbUrl = require("../setting");
var mongodb = require("./db");
//插入数据
exports.insert = function(data,callback){
    MongoClient.connect(mongodbUrl.mongodb, function(err, db) {
        //var json = require('mongodb/test.json');
        var obj = {username:data.username,password:data.password}
        db.collection('t').insertOne(obj, function(err, data) {
            if(err){
                return callback(err);
            }else{
                callback({success:true,message:"成功了!"});
            }
            db.close();
        })
    });
};

//查新数据
exports.getData = function(callback){
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        db.collection("t",{
            safe : true
        },function(err,collection){
            if(err) throw err;
            collection.find().toArray(function(e,docs){
                if(e) throw e;
                callback({success:true,code:"000000",data:docs});
            });
        });
    });
};

//删除数据
exports.delete = function(callback){
    mongodb.open(function(err, db) {
        if (err) {
            return callback(err);
        }
        db.collection('t', function(err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);
            }

            collection.remove({safe:true},function(err, object) {   //{_id: ObjectId.createFromHexString(id)}, [['_id','asc']], {},
                collection.remove();
                if (!err){
                    callback({success:true});
                }else{
                    callback({success:false})
                }

            });
        });
    });

};