<template>
  <div class="home-container">
    <router-view></router-view>
    <Tabbar />
  </div>
</template>

<script>
import Tabbar from "@/components/Tabbar";
export default {
  components: {
    Tabbar,
  },
};
</script>

<style lang="less" scoped>
</style>