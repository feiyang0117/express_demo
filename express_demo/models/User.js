/**
 * Created by gao on 16/3/8.
 */
var mongodb = require("./db");

function User(user){
    this.name = user.name;
    this.password = user.password;
}

/*增加用户静态查寻方法*/
User.find = function(username,callback){
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        db.collection("Users",function(err,connection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //查找name属性为username的文档
            connection.find({name:username},function(err,doc){
                mongodb.close();
                if(doc){
                    //封装文档为user对象
                    var user = new User(doc);
                    callback(err,doc);


                }else{
                    callback(err,null);
                }

            })
        })
    });
};

//讲User类给予接口
module.exports = User;
/*
* */
User.prototype.save = function save(){
    //存入mongodb的文档
    var user = {
        name:this.name,
        password:this.password
    };
    mongodb.open(function(err,db){
        if(err){
            return callback(err);
        }
        //读取users集合
        db.collection("Users",function(err,collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //为name属性增加索引
            collection.ensureIndex("name",{unique:true});
            //写入User文档
            collection.insert(Users,{save:true},function(err){
                mongodb.close();
                callback(err);
            });
        })

    });
};