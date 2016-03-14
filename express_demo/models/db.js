/**
 * Created by gao on 16/3/8.
 */
var setting = require("../settting");
//得到db对象;
var Db = require("mongodb").Db;
//得到链接对象
var Connection = require("mongodb").Connection;
//得到服务对象
var server = require('mongodb').Server;
//创建链接对象
module.exports = new Db(setting.db,new Server(setting.host,Connection.DEFAULT_PORT));
