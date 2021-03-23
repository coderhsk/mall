<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imgLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="params"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <goods-list :goods="commends" ref="commend"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import detailNavBar from './childComps/DetailNavBar'
import detailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import {getDetail, getCommend, Goods, Shop, GoodsParam} from 'network/detail'
import Scroll from 'components/common/scroll/Scroll'
import {debounce} from 'common/utils'
import GoodsList from 'components/content/goods/GoodsList'
import {itemListenerMixin, backTopMixin} from 'common/mixin'
import {mapActions, masActions} from 'vuex'




export default {
  name: "Detail",
  components: {
    detailNavBar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList
  },
  mixins: [itemListenerMixin, backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      commends: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
    }
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid

    // 2.根据iid保存数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
      // 2.1获取顶部轮播图
      const data = res.result
      this.topImages = data.itemInfo.topImages

      // 2.2获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      // 2.3获取店铺信息
      this.shop = new Shop(data.shopInfo)

      // 2.4保存商品详细数据
      this.detailInfo = data.detailInfo

      // 2.5获取参数信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
    
      // 2.6获取评论信息
      if(data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0]
      }

    
    })
  
    // 3.获取推荐数据
    getCommend().then(res => {
      // console.log(res);
      this.commends = res.data.list
    })

    // 4.给getThemeTopY赋值
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.params.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.commend.$el.offsetTop)
      this.themeTopYs.push(Number.MAX_VALUE)
      // console.log(this.themeTopYs);
    },100)
  },
  mounted() {
  },
  destroyed() {
    this.$bus.$off('itemImageLoad',this.itemImgListener)
  },
  methods: {
    ...mapActions(['addCart']),
    imgLoad() {
      this.$refs.scroll.refresh()

      // 每次图片加载完获取最新的y值
      this.getThemeTopY()
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 100)
    },
    contentScroll(position) {
      // 1.获取Y值
      const positionY = -position.y
      const len = this.themeTopYs.length
      // 2.将positionY值与themeTopYs里的值进行对比
      for(let i = 0 ; i < len ; i++) {
        // 优化后
        if(this.currentIndex != i && (i < len - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1])) {
          this.currentIndex = i
          this.$refs.nav.currentIndex = this.currentIndex
        }

        // if(this.currentIndex != i && ((i < len - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i + 1]) || 
        // (i == len - 1 && positionY >= this.themeTopYs[i]))){
        //   this.currentIndex = i
        //   // console.log(i);
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }
      }
      // 判断backTop是否显示
      this.isShowBackTop = -(position.y) > 1000
    },
    addToCart() {
      // 1.获取购物车展示内容
      const product = {}
      product.image = this.topImages[0]
      product.title = this.goods.title
      product.desc = this.goods.desc
      product.price = this.goods.realPrice
      product.iid = this.iid

      // 2.将商品添加到购物车(1.new Promise  2.mapActions)
      // this.$store.commit('addCart',product)

      // this.$store.dispatch('addCart',product).then(res => {
      //   console.log(res);
      // })

      this.addCart(product).then(res => {
        // this.message = res
        // this.show = true

        // setTimeout(() => {
        //   this.message = ''
        //   this.show = false
        // }, 2000);
        // this.$toast.show()
        this.$toast.show(res, 2000)
        // console.log(this.$toast.show);
      })

    }
  }
}
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .detail-nav {
    position: relative;
    background-color: #fff;
    z-index: 9;
  }
  .content {
    height: calc(100% - 44px);
    overflow: hidden;
  }
</style>