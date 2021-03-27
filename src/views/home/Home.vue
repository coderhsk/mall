<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabControl1" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" :pull-up-load="true"
    @scroll="contentScroll" @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :titles="['流行','新款','精选']" 
      @tabClick="tabClick" ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- 需要监听一个组件的原生事件时，必须给相应的事件加上native修饰符，才能进行监听 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import {getHomeMultidata, getHomeGoods} from 'network/home'
import {debounce} from 'common/utils'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {TOP_DISTANCE, POP, NEW, SELL} from "common/const";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': {page: 0, list: []},
        'new': {page: 0, list: []},
        'sell': {page: 0, list: []}
      },
      currentType: POP,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()

    // 2.请求商品数据
    this.getHomeGoods(POP)
    this.getHomeGoods(NEW)
    this.getHomeGoods(SELL)
  },
  destroyed() {
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 100)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.getSaveY()

    // 2.取消全局事件的监听
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  mounted() {
    // 1.监听图片加载完成
    // console.log(this.isShowBackTop);
  },
  methods: {
    // 网络请求相关代码
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    },

    // 事件监听相关代码
    tabClick(index) {
      switch(index){
        case 0:
          this.currentType = POP;
          break;
        case 1: 
          this.currentType = NEW;
          break;
        case 2: 
          this.currentType = SELL;
          break;
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    contentScroll(position) {
      // 1.判断backTop是否显示
      this.isShowBackTop = -(position.y) > TOP_DISTANCE

      // 2.决定tabControl是否有吸顶效果
      this.isTabFixed = -(position.y) > this.tabOffsetTop
    },
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      // 1.获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    }
  }
}
</script>

<style scoped>
  #home{
    /* padding-top: 44px; */
    height: 100vh;
    position: relative;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 在原生浏览器实现滚动时，需要的定位 */
    /* position: fixed;
    left: 0px;
    right: 0px;
    top: 0px;
    z-index: 9; */
  }

  /* .tab-control {
    top: 44px;
    background-color: #fff;
    z-index: 9;
  } */
  .tab-control {
    position: relative;
    z-index: 9;
    top: -1px;
    background-color: #fff;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0px;
    right: 0;
    overflow: hidden;
  }

  
  /* .content { 
    height: 300px; 
    height: calc(100% - 93px);
    margin-top: 44px;
    overflow: hidden;
  } */
</style>