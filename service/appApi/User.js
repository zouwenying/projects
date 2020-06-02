const Router = require("koa-router");
const mongoose = require("mongoose");
let router = new Router();
router.get("/", async (ctx) => {
  ctx.body = "这是用户操作首页";
});
router.post("/register", async (ctx) => {
  //取得model
  const User = mongoose.model("User");
  //把从前端接受到的post数据封装成一个新的user对象
  let newUser = new User(ctx.request.body);
  await newUser
    .save()
    .then(() => {
      ctx.body = {
        code: 200,
        message: "注册成功",
      };
    })
    .catch((error) => {
      ctx.body = {
        code: 500,
        message: error,
      };
    });
});

router.post("/login", async (ctx) => {
  let loginUser = ctx.request.body;
  let userName = loginUser.userName;
  let password = loginUser.password;
  const User = mongoose.model("User");
  await User.findOne({ userName: userName })
    .exec()
    .then(async (result) => {
      console.log(result);
      if (result) {
        let newUser = new User();
        await newUser
          .comparePassword(password, result.password)
          .then((isMatch) => {
            ctx.body = { code: 200, meassage: isMatch };
          })
          .catch((error) => {
            console.log(error);
            ctx.body = { code: 500, meassage: error };
          });
      } else {
        ctx.body = { code: 201, meassage: "用户名不存在" };
      }
    })
    .catch((error) => {
      console.log(error);
      ctx.body = { code: 500, meassage: error };
    });
});
module.exports = router;
