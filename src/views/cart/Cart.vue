<template>
  <div class="cart">
    <!-- 导航栏 -->
    <nav-bar class="nav-bar">
      <template v-slot:center>
        <div>购物车({{length}})</div>
      </template>
    </nav-bar>

    <!-- 商品列表 -->
    <cart-list></cart-list>

    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import CartList from './childComps/CartList'
import NavBar from 'components/common/navbar/NavBar'
import CartBottomBar from './childComps/CartBottomBar'

import { mapGetters } from 'vuex'

export default {
  name: "Cart",
  components: { 
    CartList, 
    NavBar,
    CartBottomBar
  },
  computed: {
    // 1.第一种语法
    // ...mapGetters(['cartLength','cartList'])

    // 2.第二种语法
    ...mapGetters({
      length: 'cartLength',
      list: 'cartList'
    })
  }
}
</script>

<style scoped>
  .cart {
    height: 100vh;
  }
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
    /* font-weight: 700; */
  }
</style>