<template>
  <!-- <scroll></scroll> -->
  <div class="menu-list">
    <div class="menu-list-item" v-for="(item, index) in categories" :key="index">
      {{item.title}}
    </div>
  </div>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';

export default {
  name: "TabMenu",
  components: { 
    Scroll 
  },
  props: {
    categories: {
      type: Array,
      default() {
        return []
      }
    }
  },
  created() {
  }
};
</script>

<style scoped>
</style>