import {Add_COUNT, ADD_TO_CART} from './mutation-type'

export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      if(oldProduct) {
        context.commit(Add_COUNT,oldProduct)
        resolve('商品数量+1')
      }else {
        payload.count = 1
        context.commit(ADD_TO_CART, payload)
        resolve('商品添加成功')
      }
    })
  }
}