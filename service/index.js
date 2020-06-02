const Koa = require("koa");
const app = new Koa();
const mongoose = require("mongoose");
const Router = require("koa-router");
const cors = require("koa2-cors");
const bodyParser = require("koa-bodyparser");
let user = require("./appApi/User.js");
let goods = require("./appApi/goods.js");
const { connect, initSchemas } = require("./database/init.js");

let router = new Router();
app.use(cors());
app.use(bodyParser());

router.use("/user", user.routes());
router.use("/goods", goods.routes());
(async () => {
  await connect();
  initSchemas();
  const User = mongoose.model("User");
  // let oneUser = new User({userName:'zouwenying',password:'123456'})
  // oneUser.save().then(()=>{
  //     console.log('插入成功')
  // })
  let users = await User.findOne({}).exec();
  console.log("_________________");
  console.log(users);
  console.log("_________________");
})();

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000, () => {
  console.log("server starting at port 3000");
});
