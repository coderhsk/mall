<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item, index) in titles" :key="index"
     :class="{active: currentIndex === index}" @click="btnClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>

export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    btnClick(index) {
      this.currentIndex = index
      this.$emit('tabClick',index)
    }
  }
};
</script>

<style scoped>
  .tab-control{
    display: flex;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .tab-control-item {
    flex: 1;
  }
  .tab-control-item span{
    padding: 3px;
  }
  .active {
    color: var(--color-high-text);
  }
  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
</style>