import {
  Button,
  Row,
  Col,
  Swipe,
  SwipeItem,
  Lazyload,
  List,
  Field,
  NavBar,
  Tab,
  Tabs,
  PullRefresh,
  Stepper,
  Tabbar,
  TabbarItem,
} from "vant";

const Plugins={
    // install 是默认的方法。当外界在 use 这个组件的时候，就会调用本身的 install 方法，同时传一个 Vue 这个类的参数。
    install:function(Vue){
        Vue.component('van-button',Button)
        Vue.component('van-row',Row)
        Vue.component('van-col',Col)
        Vue.component('van-swipe',Swipe)
        Vue.component('van-swipe-item',SwipeItem)
        Vue.component('Lazyload',Lazyload)
        Vue.component('van-list',List)
        Vue.component('van-field',Field)
        Vue.component('van-nav-bar',NavBar)
        Vue.component('van-tab',Tab)
        Vue.component('van-tabs',Tabs)
        Vue.component('van-pull-refresh',PullRefresh)
        Vue.component('Stepper',Stepper)
        Vue.component('van-tabbar-item',TabbarItem)
        Vue.component('van-tabbar',Tabbar)
    }
}
// 导出
export default Plugins
