<template>
  <div id="category">
    <nav-bar class="nav-bar"><div slot="center">商品分类</div></nav-bar>
    <div class="content">
      <tab-menu :categories="categories"></tab-menu>
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar';
import { getCategory } from "network/category";
import TabMenu from './ChildComps/TabMenu.vue';

export default {
  name: "Category",
  components: {
    NavBar,
    TabMenu
  },
  data() {
    return {
      categories: []
    }
  },
  created() {
    // 请求分类数据
    this._getCategory()
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
      })
    }
  }
};
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    font-weight: 700;
  }
</style>