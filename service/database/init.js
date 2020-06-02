const mongoose = require("mongoose");
const db = "mongodb://localhost/simle-db";
const glob = require('glob')
const {resolve} = require('path')

// mongoose.Promise = global.Promise

exports.connect = ()=> {
  mongoose.set('useCreateIndex', true) 
  //连接数据库
  mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true});

  let maxConnectTimes = 0;

  return new Promise((resolve, reject) => {
    //所有连接放到这里
    //增加数据库连接的时间监听
    mongoose.connection.on("disconnected", () => {
      //进行重连
      console.log("******数据库断开*********");
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject();
        throw new Error("数据库出现问题，程序无法搞定，请check....");
      }
    });
    //连接数据库出错的时候
    mongoose.connection.on("error", (err) => {
      console.log("******数据库错误*********");
      //进行重连
      if (maxConnectTimes < 3) {
        maxConnectTimes++;
        mongoose.connect(db);
      } else {
        reject(err);
        throw new Error("数据库出现问题，程序无法搞定，请check....");
      }
    });
    //链接打开的时候
    mongoose.connection.once("open", () => {
      console.log("mongodb connect successfuly");
      resolve();
    });
  });
};

exports.initSchemas = ()=>{
    glob.sync(resolve(__dirname,'./schema/','**/*.js')).forEach(require)
}
