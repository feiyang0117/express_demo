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
///*增加用户静态查寻方法*/
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
//            //查找name属性为username的文档
//            connection.find({name:username},function(err,doc){
//                mongodb.close();
//                if(doc){
//                    //封装文档为user对象
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
////讲User类给予接口
//module.exports = User;
///*
//* */
//User.prototype.save = function save(){
//    //存入mongodb的文档
//    var user = {
//        name:this.name,
//        password:this.password
//    };
//    mongodb.open(function(err,db){
//        if(err){
//            return callback(err);
//        }
//        //读取users集合
//        db.collection("Users",function(err,collection){
//            if(err){
//                mongodb.close();
//                return callback(err);
//            }
//            //为name属性增加索引
//            collection.ensureIndex("name",{unique:true});
//            //写入User文档
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
//测试数据库是否插入数据;
exports.update = function(callback){
    MongoClient.connect(mongodbUrl.mongodb, function(err, db) {
        var json = require('mongodb/test.json');
        db.collection('t').insertOne(json, function(err, data) {
            if(err){
                return callback(err);
            }else{
                callback({success:true,message:"插入数据成功!"});
            }
            db.close();
        })
    });
};

//获取列表中所有数据
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

//删除数据库列表一个列表中所有的数据
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