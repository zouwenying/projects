<template>
  <div class="shooping-mall">
    <!-- 头部搜索 -->
    <div class="search-bar">
      <van-row>
        <van-col span="3">
          <img :src="locationIcon" width="50%" class="location-icon" />
        </van-col>
        <van-col span="16">
          <input type="text" class="search-input" />
        </van-col>
        <van-col span="5" class="search-button">
          <van-button size="mini">查找</van-button>
        </van-col>
      </van-row>
    </div>
    <!-- 轮播图 -->
    <div class="swiper-area">
      <van-swipe :autoplay="1000">
        <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
          <img :src="banner.image" width="100%" lazy-load />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 购物商品入口 -->
    <div class="type-bar">
      <div v-for="(cate,index) in category" :key="index">
        <img :src="cate.image" width="90%" lazy-load />
        <span>{{cate.mallCategoryName}}</span>
      </div>
    </div>
    <!-- 广告banner -->
    <div>
      <img :src="advertesPicture.PICTURE_ADDRESS" width="100%" lazy-load />
    </div>
    <!-- 商品推荐 -->
    <div class="recommend-area">
      <div class="recommend-title">商品推荐</div>
      <div class="recommend-body">
        <swiper :options="swiperOption">
          <swiper-slide v-for="(item,index) in recommend" :key="index">
            <div class="recommend-item">
              <img :src="item.image" width="50%" />
              <div>{{item.goodsName}}</div>
              <div>{{item.price}}</div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
    <floorComponent :floorData="floor1" :floorTitle="floorName.floor1"></floorComponent>
    <floorComponent :floorData="floor2" :floorTitle="floorName.floor2"></floorComponent>
    <floorComponent :floorData="floor3" :floorTitle="floorName.floor3"></floorComponent>
    <!-- 热卖商品 -->
    <div class="hot-area">
      <div class="hot-title">热卖商品</div>
      <div class="hot-goods">
        <van-list>
          <van-row gutter="20">
            <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
              <goodsInfo :goodsImage="item.image" :goodsPrice="item.price" :goodsName="item.name"></goodsInfo>
            </van-col>
          </van-row>
        </van-list>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import "swiper/dist/css/swiper.css";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import url from "@/api/configApi.js";
import goodsInfo from "../components/goodsInfoComponent";
import floorComponent from "../components/floorComponent";

export default {
  components: {
    swiper,
    swiperSlide,
    floorComponent,
    goodsInfo
  },
  data() {
    return {
      locationIcon: require("../assets/images/search.png"),
      bannerPicArray: [],
      category: [],
      advertesPicture: "",
      recommend: [],
      swiperOption: {
        //swiper3
        autoplay: 3000,
        speed: 1000
      },
      floor1: [],
      floor2: [],
      floor3: [],
      floorName: [],
      hotGoods: [] //热卖商品
    };
  },
  created() {
    axios({
      url: url.getShoppingMallInfo,
      method: "get"
    })
      .then(response => {
        if (response.status == 200) {
          this.category = response.data.data.category;
          this.advertesPicture = response.data.data.advertesPicture;
          this.bannerPicArray = response.data.data.slides;
          this.recommend = response.data.data.recommend;
          this.floor1 = response.data.data.floor1;
          this.floor2 = response.data.data.floor2;
          this.floor3 = response.data.data.floor3;
          this.floorName = response.data.data.floorName;
          this.hotGoods = response.data.data.hotGoods;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};
</script>

<style>
.shooping-mall {
  width: 100%;
}
.search-bar {
  height: 2.2rem;
  background-color: #e5017d;
}
.search-input {
  width: 100%;
  height: 1.3rem;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 1px solid #cccccc !important;
  color: #ffffff;
  margin-top: 0.5rem;
}
.location-icon {
  padding-top: 0.5rem;
  padding-left: 0.6rem;
}
.search-button {
  padding-left: 0.8rem;
  padding-top: 0.5rem;
}
.swiper-area {
  width: 100%;
  overflow: hidden;
}
.type-bar {
  background-color: #ffffff;
  margin: 0 0.3rem 0.3rem 0.3rem;
  border-radius: 0.3rem;
  font-size: 14px;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
}
.type-bar div {
  padding: 0.3rem;
  font-size: 12px;
  text-align: center;
}
.recommend-area {
  background-color: #ffffff;
  margin-top: 0.3rem;
}
.recommend-title {
  border-bottom: 1px solid #eee;
  font-size: 14px;
  padding: 0.2rem;
  color: #e5017d;
}
.recommend-body {
  border-bottom: 1px solid #eeeeee;
}
.recommend-item {
  border-right: 1px solid #eeeeee;
  font-size: 12px;
  text-align: center;
}
.floor-anomaly {
  display: flex;
  flex-direction: row;
  background-color: #ffffff;
  border-bottom: 1px solid #dddddd;
}
.floor-anomaly div {
  width: 10rem;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
}
.hot-area {
  text-align: center;
  font-size: 14px;
  height: 1.8rem;
  line-height: 1.8rem;
}
.hot-goods {
  height: 130rem;
  overflow: hidden;
  background-color: #fff;
}
</style>