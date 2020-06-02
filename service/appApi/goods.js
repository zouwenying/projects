const Koa = require("koa");
const app = new Koa();
const Router = require("koa-router");
let router = new Router();

const mongoose = require("mongoose");
const fs = require("fs");

router.get("/insertAllGoodsInfo", async (ctx) => {
  fs.readFile("./data_json/goods.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Goods = mongoose.model("Goods");
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newGoods = new Goods(value);
      newGoods
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch((error) => {
          console.log("失败" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});

router.get("/insertAllCategory", async (ctx) => {
  fs.readFile("./data_json/category.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const Category = mongoose.model("Category");
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategory = new Category(value);
      newCategory
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch((error) => {
          console.log("失败" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});

router.get("/insertAllCategorySub", async (ctx) => {
  fs.readFile("./data_json/category_sub.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let saveCount = 0;
    const CategorySub = mongoose.model("CategorySub");
    data.RECORDS.map((value, index) => {
      console.log(value);
      let newCategorySub = new CategorySub(value);
      newCategorySub
        .save()
        .then(() => {
          saveCount++;
          console.log("成功" + saveCount);
        })
        .catch((error) => {
          console.log("失败" + error);
        });
    });
  });
  ctx.body = "开始导入数据";
});

//获取商品详细信息的接口
router.post("/getDetailGoodsInfo", async (ctx) => {
  let goodsId = ctx.request.body.goodsId;
  const Goods = mongoose.model("Goods");
  console.log("_____________", goodsId);
  await Goods.findOne({ ID: goodsId })
    .exec()
    .then(async (result) => {
      ctx.body = { code: 200, message: result };
    })
    .catch((error) => {
      console.log(error);
      ctx.body = { code: 500, message: error };
    });
});

//获取购物车数据
router.get("/getCategoryList", async (ctx) => {
  const Category = mongoose.model("Category");
  await Category.find()
    .exec()
    .then(async (result) => {
      ctx.body = { code: 200, message: result };
    })
    .catch((error) => {
      console.log(error);
      ctx.body = { code: 500, message: error };
    });
});

// 得到小类信息
router.post("/getCategorySubList", async (ctx) => {
  let categoryId = ctx.request.body.categoryId;
  const CategorySub = mongoose.model("CategorySub");
  console.log("____________________", categoryId);
  await CategorySub.find({ MALL_CATEGORY_ID: categoryId })
    .exec()
    .then(async (result) => {
      ctx.body = { code: 200, message: result };
    })
    .catch((error) => {
      console.log(error);
      ctx.body = { code: 500, message: error };
    });
});

router.post("/getGoodsListByCategorySubID", async (ctx) => {
  let categorySubId = ctx.request.body.categorySubId;
  let page = ctx.request.body.page;
  let num = 5;
  let start = (page - 1) * num;
  const Goods = mongoose.model("Goods")
  let sum = await Goods.find({SUB_ID: categorySubId}).count().exec()
  await Goods.find({ SUB_ID: categorySubId })
    .skip(start)
    .limit(num)
    .exec()
    .then(async (result) => {
      ctx.body = { code: 200, message: result ,sum:sum};
    })
    .catch((error) => {
      console.log(error);
      ctx.body = { code: 500, message: error };
    });
});

module.exports = router;
