import {Add_COUNT, ADD_TO_CART} from './mutation-type'

export default {
  [Add_COUNT](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}