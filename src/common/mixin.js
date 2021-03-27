import {debounce} from './utils'
import {POP, NEW, SELL} from "./const";
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      itemListenerMixin: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return{
      isShowBackTop: false
    }
  },
  methods: {
    backClick() {
      // this.$refs.scroll.scroll.scrollTo(0,0,300)
      this.$refs.scroll.scrollTo(0,0)
    }
  }
}

export const tabControlMixin = {
  data: function() {
    return {
      currentType: POP
    }
  },
  methods: {
		tabClick(index) {
			switch (index) {
				case 0:
					this.currentType = POP
					break
				case 1:
					this.currentType = NEW
					break
				case 2:
					this.currentType = SELL
					break
			}
		}
	}
}