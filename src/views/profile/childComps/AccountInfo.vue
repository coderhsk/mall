<template>
  <div class="account">
    <div class="account-item">
      <div class="number">
        <span class="balance">0.00</span>元
      </div>
      <div class="account-info">我的余额</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>个
      </div>
      <div class="account-info">我的优惠</div>
    </div>
    <div class="account-item">
      <div class="number">
        <span class="balance">0</span>分
      </div>
      <div class="account-info">我的积分</div>
    </div>
  </div>
</template>

<script>
	export default {
		name: "AccountInfo"
	}
</script>

<style scoped>
  .account {
    display: flex;
  }
  .account-item {
    width: 100%;
    /* flex: 1; */
    text-align: center;
    background-color: #fff;
    margin-right: 1px;
    color: #666;
    font-size: 13px;
    padding: 18px;
  }
  .account-item .balance {
    font-size: 24px;
    color: #ff5f3e;
    font-weight: 700;
  }
  .account-info {
    margin-top: 12px;
  }
  .account-item:last-of-type {
    margin-right: 0;
  }
</style>