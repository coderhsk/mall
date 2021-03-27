<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories" @selectItem="selectItem"></tab-menu>
      
      <scroll id="tab-content" ref="scroll">
        <div>
          <tab-content-category :subcategories="showSubcategory"></tab-content-category>
          <tab-control :titles="['综合', '新品', '销量']" @tabClick="tabClick"></tab-control>
          <goods-list :goods="showCategoryDetail"></goods-list>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import Scroll from 'components/common/scroll/Scroll';
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'

import { getCategory, getSubcategory, getCategoryDetail } from "network/category";
import TabMenu from './ChildComps/TabMenu';
import TabContentCategory from './ChildComps/TabContentCategory';

import {POP, SELL, NEW} from "common/const";
import {tabControlMixin} from "common/mixin"

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    TabMenu,
    TabContentCategory
  },
  mixins: [tabControlMixin],
  data() {
    return {
      categories: [],
      categoryData: {},
      currentIndex: -1,
      saveY: 0
    }
  },
  computed: {
    showSubcategory() {
      if(this.currentIndex === -1) return {}
      return this.categoryData[this.currentIndex].subcategories
    },
    showCategoryDetail() {
      // console.log(this.categoryData[this.currentIndex].categoryDetail[this.currentType]);
      if(this.currentIndex === -1) return []
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
    }
  },
  created() {
    // 请求分类数据
    this._getCategory()

    // 监听图片完成
    this.$bus.$on('itemImageLoad', () => {
		    this.$refs.scroll.refresh()
	  })
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
  },
  methods: {
    _getCategory() {
      getCategory().then(res => {
        // 1.获取分类数据
        this.categories = res.data.category.list
        // console.log(this.categories);

        // 2.初始化每个类别的数据
        for(let i = 0 ; i < this.categories.length ; i++) {
          this.categoryData[i] = {
            subcategories: {},
            categoryDetail: {
              'pop': [],
              'new': [],
              'sell': []
            }
          }
        }
        // console.log(this.categoryData);

        // 3.请求第一个分类的数据
        this._getSubcategories(0)
      })
    },
    _getSubcategories(index) {
      this.currentIndex = index
      // maitKey是获取商品列表
      const maitKey = this.categories[index].maitKey
      getSubcategory(maitKey).then(res => {
        this.categoryData[index].subcategories = res.data
        this.categoryData = {...this.categoryData}
        this._getCategoryDetail(POP)
        this._getCategoryDetail(SELL)
        this._getCategoryDetail(NEW)
        // console.log(this.categoryData);
      })
    },
    _getCategoryDetail(type) {
      // 1.获取请求的miniWallKey  miniWallkey是获取三种不同类型的商品列表(流行，最新，热卖)
      // console.log(this.categories);
      const miniWallkey = this.categories[this.currentIndex].miniWallkey 
      // 2.发送请求，传入miniWallKey和type
      getCategoryDetail(miniWallkey, type).then(res => {
        // 3.获取数据
        this.categoryData[this.currentIndex].categoryDetail[type] = res
        this.categoryData = {...this.categoryData}
      })
      // console.log(this.categoryData);
    },
    // 事件点击事件
    selectItem(index) {
      this._getSubcategories(index)
    }
  }
};
</script>

<style scoped>
  #category {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;

    display: flex;
  }
  #tab-content {
    height: 100%;
    flex: 1;
    overflow: hidden;
  }
</style>