<template>
  <div class="slot" v-show="isShow">
    <div class="toast">{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props: {
    // message: {
    //   type: String,
    //   default: ''
    // },
    // isShow: {
    //   type: Boolean,
    //   default: false
    // }
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message="默认文字", duration=2000) {
      this.message = message
      this.isShow = true

      setTimeout(() => {
        this.message = ''
        this.isShow = false
      }, duration);
    }
  }
}
</script>

<style scoped>
  .slot {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    padding: 8px 10px;
    background-color: rgba(0, 0, 0, .7);
    color: #fff;
  }
</style>