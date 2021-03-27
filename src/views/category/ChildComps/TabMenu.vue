<template>
  <scroll id="tab-menu">
    <div class="menu-list">
      <div class="menu-list-item"
        v-for="(item, index) in categories"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="itemClick(index)"
      >
        {{ item.title }}
      </div>
    </div>
  </scroll>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";

export default {
  name: "TabMenu",
  components: {
    Scroll,
  },
  props: {
    categories: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      currentIndex: 0,
    };
  },
  created() {},
  methods: {
    itemClick(index) {
      this.currentIndex = index;
      this.$emit('selectItem', index)
      // console.log(this.categories);
    },
  },
};
</script>

<style scoped>
#tab-menu {
  background-color: #f6f6f6;
  width: 100px;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
}
.menu-list-item {
  height: 45px;
  line-height: 45px;
  font-size: 14px;
  text-align: center;
}
.active {
  font-weight: 700;
  background-color: #fff;
  color: var(--color-high-text);
  border-left: 3px solid var(--color-high-text);
}
</style>