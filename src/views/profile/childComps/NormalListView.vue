<template>
  <div class="normal-list">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="icon">
        <img :src="iconURL(item)" alt="">
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NormalListView",
  props: {
    listData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    iconURL(item) {
      return require('assets/img/profile/' + item.icon)
    }
  }
}
</script>
  
<style scoped> 
  .normal-list {
    margin-top: 15px;
    background-color: #fff;
    color: #333;
    font-size: 15px;
  }
  .item {
    height: 44px;
    line-height: 44px;
    position: relative;
  }
  .item .icon {
    position: absolute;
    left: 16px;
    top: 3px;
  }
  .item img {
    width: 20px;
    height: 20px;
  }
  .item .info {
    margin-left: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, .1);
  }
  .item:last-of-type .info {
    border-bottom: none;
  }
</style>