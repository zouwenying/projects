<template>
  <div>
    <div class="nav-bar">
      <van-nav-bar title="类别列表" />
    </div>
    <div>
      <van-row>
        <van-col span="6">
          <div id="leftNav">
            <ul>
              <li
                v-for="(item,index) in category"
                :key="index"
                @click="clickCategory(index)"
                :class="{categoryActive:categoryIndex==index}"
              >{{item.MALL_CATEGORY_NAME}}</li>
            </ul>
          </div>
        </van-col>
        <van-col span="18">
          <div class="tabCategorySub">
            <van-tabs v-model="active" @click="onClickCategorySub">
              <van-tab
                v-for="(item,index) in categorySub"
                :key="index"
                :title="item.MALL_SUB_NAME"
                :name="index"
              ></van-tab>
            </van-tabs>
            <div id="list-div">
              <van-pull-refresh v-model="isRefresh" @refresh="onRefresh">
                <van-list
                  v-model="loading"
                  :finished="finished"
                  @load="onLoad"
                  finished-text="没有更多了"
                >
                  <div
                    class="list-item"
                    v-for="(item,index) in goodList"
                    :key="index"
                    @click="goGoodsInfo(item.ID)"
                  >
                    <div class="list-item-img">
                      <img :src="item.IMAGE1" width="100%" :onerror="errorImg" />
                    </div>
                    <div class="list-item-text">
                      <div>{{item.NAME}}</div>
                      <div>￥{{item.ORI_PRICE}}</div>
                    </div>
                  </div>
                </van-list>
              </van-pull-refresh>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { Toast } from "vant";
import url from "@/api/configApi.js";
export default {
  data() {
    return {
      category: [],
      categoryIndex: 0,
      categoryId: "",
      categorySub: [],
      active: 0,
      list: [],
      loading: false, //上拉加载使用
      finished: false, //上拉加载使用
      isRefresh: false, //下拉加载
      page: 1,
      goodList: [],
      categorySubId: "",
      errorImg: 'this.src="' + require("@/assets/images/errorimg.png") + '"' //错误图片显示路径
    };
  },
  created() {
    this.getCategory();
  },
  mounted() {
    //左侧适当适应页面高度
    let winHeight = document.documentElement.clientHeight;
    document.getElementById("leftNav").style.height = winHeight - 46 + "px";
    document.getElementById("list-div").style.height =
      winHeight - 90 - 50 + "px";
  },
  methods: {
    getCategory() {
      axios({
        url: url.getCategoryList,
        method: "get"
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.category = response.data.message;
            this.getCategorySubByCategoryId(this.category[0].ID);
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    getCategorySubByCategoryId(categoryId) {
      axios({
        url: url.getCategorySubList,
        method: "post",
        data: {
          categoryId: categoryId
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.categorySub = response.data.message;
            this.active = 0;
          } else {
            Toast("服务器错误，数据取得失败");
          }
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    getGoodList() {
      axios({
        url: url.getGoodsListByCategorySubID,
        method: "post",
        data: {
          categorySubId: this.categorySubId,
          page: this.page
        }
      })
        .then(response => {
          if (response.data.code == 200 && response.data.message) {
            this.page++;
            this.goodList = this.goodList.concat(response.data.message);
          }
          if (response.data.message.length == 0) {
            this.finished = true;
          }
          this.loading = false;
        })
        .catch(error => {
          console.log("error", error);
        });
    },
    clickCategory(index) {
      this.page = 1;
      this.finished = false;
      this.goodList = [];
      this.getCategorySubByCategoryId(this.category[index].ID);
      this.categorySubId = this.categorySub.ID;
      this.onLoad();
    },
    onClickCategorySub(name) {
      let index = name;
      this.categorySubId = this.categorySub[index].ID;
      this.goodList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
      console.log("categorySubId", this.categorySubId);
    },
    onLoad() {
      setTimeout(() => {
        this.categorySubId = this.categorySubId
          ? this.categorySubId
          : this.categorySub[0].ID;
        this.getGoodList();
      }, 1000);
    },
    onRefresh() {
      setTimeout(() => {
        this.isRefresh = false;
        this.list = [];
        this.onLoad();
      }, 1000);
    },
    goGoodsInfo(id) {
      this.$router.push({ path: "/Goods", query: { goodsId: id } });
      //   this.$router.push({ name: "Goods", params: { goodsId: id } });
    }
  }
};
</script>

<style scoped>
#leftNav ul li {
  line-height: 2rem;
  border-bottom: 1px solid #e4e7ed;
  padding: 3px;
  font-size: 0.8rem;
  text-align: center;
}
.categoryActive {
  background-color: #ffffff;
}
.list-item {
  text-align: center;
  line-height: 80px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #ffffff;
}
#list-div {
  overflow: scroll;
}
.list-item-img {
  flex: 8;
}
.list-item-text {
  flex: 16;
  margin-top: 10px;
  margin-left: 10px;
}
.categoryActive {
  border-bottom: 1px solid #000000 !important;
}
</style>