const BASEURL = 'http://localhost:8080/'
const LOCALURL = 'http://localhost:3000/'

const URL = {
    getShoppingMallInfo:BASEURL+'mock/shoppingmall.json',
    registerUser:LOCALURL+'user/register',//用户注册接口
    login:LOCALURL+'user/login',//用户登录接口
    goodsDatail:LOCALURL+'goods/getDetailGoodsInfo',//得到商品详细数据
    getCategoryList:LOCALURL+'goods/getCategoryList',//得到大类数据
    getCategorySubList:LOCALURL+'goods/getCategorySubList', //得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID' //得到小类商品信息
}

module.exports = URL
  