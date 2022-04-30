<template>
  <van-tabbar fixed route>
    <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
    <van-tabbar-item icon="apps-o" to="/home/classify">分类</van-tabbar-item>
    <van-tabbar-item icon="shopping-cart-o" to="/home/shopping" :badge="badge" id="shop">
      购物车
    </van-tabbar-item>
    <van-tabbar-item icon="user-circle-o" to="/my">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState("TwoTab", ["localstorageNum"]),

    badge() {
      const num = Object.values(this.localstorageNum)
      if(num.length < 1){
        return 0
      }
      const count = num.reduce((prev, next) => prev + next, 0);
      if (count > 99) {
        return "99+";
      }
      return count;
    },
  },

};
</script>

<style lang="less" scoped>

</style>