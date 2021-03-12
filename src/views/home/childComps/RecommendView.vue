<template>
  <div class="recommends">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item"> 
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
  .recommends {
    display: flex;
    width: 100%;
    text-align: center;
    padding: 15px 0 15px;
    border-bottom: 10px solid #eeeeee;
    font-size: 12px;
  }
  .recommend-item {
    flex: 1;
  }
  .recommend-item img{
    width: 80%;
    margin-bottom: 5px;
  }
</style>