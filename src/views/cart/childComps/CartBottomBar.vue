<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button" :is-checked="isSelectAll" @click.native="checkClick"></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计: {{totalPrice}}</div>
    <div class="calculate" @click="calcClick">去计算: {{checkLength}}</div>
  </div>
</template>

<script>
import CheckButton from 'components/content/checkButton/CheckButton.vue'
import { mapGetters } from 'vuex'

export default {
  name: "CartBottombar",
  components: { 
    CheckButton 
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return '￥' + this.cartList.filter(item => {
        return item.checked
      }).reduce((total, item) => {
        return total + item.price * item.count
      },0).toFixed(2)
    },
    checkLength() {
      return this.cartList.filter(item => {
        return item.checked
      }).length
    },
    isSelectAll() {
      if(this.cartList.length === 0) return false;
      // return !this.cartList.filter(item => !item.checked).length   
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) {
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }

      // 此方式不行，其isSelectAll回根据变化来决定item.checked的变化
      // this.cartList.forEach(item => item.checked = !this.isSelectAll)
    },
    calcClick() {
      if(!this.checkLength) {
        this.$toast.show('请选择购买的商品',2000)
      }
    }
  }
}
</script>

<style scoped>
  .bottom-bar {
    position: relative;
    display: flex;
    
    background-color: #eee;

    height: 40px;
    line-height: 40px;
  }
  .check-content {
    display: flex;
    align-items: center;
    margin-left: 13px;
    width: 60px;
  }
  .check-button {
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price {
    margin-left: 30px;
    flex: 1;
  }
  .calculate {
    width: 90px;
    color: #fff;
    background-color: red;
    text-align: center;
  }
</style>