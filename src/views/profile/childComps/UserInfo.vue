<template>
  <div class="user-info">
    <img class="avatar" src="~assets/img/profile/avatar.svg" alt="">
    <div class="info">
      <div class="login">登陆/注册</div>
      <div class="phone">
        <img src="~assets/img/profile/phone.svg" alt="">
        <span>暂无绑定手机号</span>
      </div>
    </div>
    <div class="arrow">
      <img src="~assets/img/common/arrow-left.svg" alt="">
    </div>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
export default {
  name: "UserInfo"
}
</script>

<style scoped> 
  .user-info {
    display: flex;
    height: 85px;
    padding: 8px 10px;
    background-color: var(--color-tint);
    color: #fff;
  }
  .avatar {
    width: 70px;
    height: 70px;
  }
  .info {
    flex: 1;
    margin-left: 10px;
  }
  .info .login {
    margin-top: 13px;
  }
  .info .phone {
    margin-top: 8px;
    font-size: 13px;
  }
  .info .phone img {
    width: 20px;
    height: 30px;
    vertical-align: middle;
    margin-left: -5px;
  }
  .arrow {
    width: 20px;
    line-height: 85px;
  }
  .arrow img {
    width: 20px;
  }
</style>