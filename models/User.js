/**
 * Created by gao on 16/3/8.
 */
var db = require("./db");

function User(user){
    this.name = user.name;
    this.password = user.password;
}