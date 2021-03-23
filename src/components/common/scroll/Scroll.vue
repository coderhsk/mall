<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bscroll: null
    }
  },
  mounted() {
    // ref如果是绑定在组件上，那么this.$refs.refname获取的是一个组件对象
    // ref如果是绑定在一个普通元素，那么this.$refs.refname获取的是元素对象
    this.bscroll = new BScroll(this.$refs.wrapper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    if(this.probeType === 2 || this.probeType === 3) {
      this.bscroll.on('scroll', (position) => {
        // console.log(position);s
        this.$emit('scroll',position)
      })
    }
    
    if(this.pullUpLoad) {
      this.bscroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }
    
  },
  methods: {
    scrollTo(x, y, time = 300){
      this.bscroll && this.bscroll.scrollTo(x, y, time)
    },
    refresh() {
      this.bscroll && this.bscroll.refresh()
    },
    finishPullUp() {
      this.bscroll && this.bscroll.finishPullUp()
    },
    getSaveY() {
      return this.bscroll ? this.bscroll.y : 0
    },
    
  }
}
</script>

<style scoped>

</style>