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
var assert = require('assert');

//每一次先查询数据
var find = function(cellphone,callback){
    MongoClient.connect(mongodbUrl.mongodb, function(err, db) {
        var user = {username:cellphone};
        db.collection('t').findOne(user,function(err, result) {
            if(result.username == user.username){
                return callback({success:false});
            } else {
                callback({success:true});
            }
        });
    });
};

//插入数据
exports.insert = function(data,callback){
    MongoClient.connect(mongodbUrl.mongodb, function(err, db) {
        var obj = {username:data.username,password:data.password};
        find(obj.username,function(rs){
            if(rs.success){
                db.collection('t').insertOne(obj, function(err, data) {
                    if(err){
                        return callback(({success:false,message:"注册失败!"}));
                    }else{
                        callback({success:true,message:"手机号注册成功了!"});
                    }
                    db.close();
                });
            }else{
                callback({success:false,message:"该用户已被注册!"});
            }
        });

    })
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

            collection.remove({safe:true},function(err, object) {
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