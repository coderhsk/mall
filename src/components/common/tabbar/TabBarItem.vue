<template>
  <div class="tab-bar-item" @click="btnClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <!-- <div :class="{active:isActive}"><slot name="item-text"></slot></div> -->
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>
<script>
export default {
  name: "TabBarItem",
  props:{
    path: String,
    activeColor: {
      type: String,
      default: '#FF5777'
    }
  },
  data() {
    return {
      // isActive: false
    }
  },
  computed: {
    isActive(){
      // console.log(this.$route.path);
      // console.log("this-->" + this.path);
      return this.$route.path.indexOf(this.path) !== -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    btnClick(){
      // this.$router.replace(this.path).catch(err => {})
      this.$router.replace(this.path)
      // console.log('btnClick');
    }
  }
}
</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
  }
  .tab-bar-item img{
    width: 20px;
    height: 20px;
    margin-top: 4px;
    vertical-align: middle;
    margin-bottom: 1px;
  }
  /* .active{
    color: #FF5777;
  } */
</style>