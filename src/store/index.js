import Vuex from 'vuex'
import Vue from 'vue'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

// 1.安装插件
Vue.use(Vuex)

const state = {
  cartList: []
}
// 2.创建实例
const store = new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})

// 3.挂载到Vue实例
export default store