<template>
  <div>
      <div class="floor-title"> {{floorTitle}} </div>
      <!-- floor one area -->
    <div class="floor">
        <div class="floor-anomaly">
            <div class="floor-one"><img :src="floor1_0.image" width="100%"/></div>
            <div>
                <div class="floor-two"><img :src="floor1_1.image" width="100%"/></div>
                <div><img :src="floor1_2.image" width="100%"/></div>
            </div>
        </div>
    </div>
    <!-- 规则部分的布局 -->
     <div class="floor-rule">
        <div v-for="(item,index) in floorData.slice(3)" :key="index">
            <img :src="item.image" width="100%"/>
        </div>
     </div>
  </div>
</template>

<script>
export default {
    props:['floorData','floorTitle'],
    data(){
        return{
            floor1_0:[],
            floor1_1:[],
            floor1_2:[],
        }
    },
    watch:{
        floorData:function(){
            this.floor1_0=this.floorData[0];
            this.floor1_1=this.floorData[1];
            this.floor1_2=this.floorData[2];

        }
    }

}
</script>

<style>
.floor-one{
    border-right: 1px solid #dddddd;
}
.floor-two{
    border-right: 1px solid #dddddd;
}
.floor-rule{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #ffffff;
}
.floor-rule div{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 10rem;
    border-bottom: 1px solid #dddddd;
}
.floor-rule div:nth-child(odd){
    border-right: 1px solid #dddddd;
}
.floor-title{
    text-align: center;
    font-size: 14px;
    height: 1.8rem;
    line-height: 1.8rem;
}
</style>