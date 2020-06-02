<template>
  <div class="goods-info">
      <div class="goods-image">
          <img :src="goodsImage" lazy-load width="90%"/>
      </div>
      <div class="goods-name">{{goodsName}}</div>
      <div class="goods-price">￥{{goodsPrice | moneyFilter}}</div>
  </div>
</template>

<script>
import {toMoney} from '@/filter/moneyFilter.js'
export default {
    props:["goodsImage","goodsPrice","goodsName"],
    data(){
        return {

        }
    },
    filters:{
      moneyFilter(money){
          return toMoney(money);
      }
  },

}
</script>

<style>
.goods-name{
    padding: 0 8px;
    overflow: hidden;
    text-overflow: emphasis;
    white-space: nowrap;
}

</style>