<template>
  <div id="app">
    <transition :name="ClassName" :mode="direction ? 'out-in' : 'in-out'">
      <router-view class="view"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  created() {
    const GoodsNum = JSON.parse(localStorage.getItem("goods")) || {};
    this.$store.commit("TwoTab/setlocalstorageNum", GoodsNum);
  },

  data() {
    return {
      ClassName: "left",
      direction: false,
    };
  },

  watch: {
    $route(to, from) {
      if (to.name === "Classify" && from.name === "Search") {
        this.direction = true;
      }
      if (this.direction) {
        this.ClassName = "right";
      } else {
        this.ClassName = "left";
      }
      this.direction = false;
    },
  },
};
</script>

<style lang="less">
.view {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  transition: transform 0.2s linear;
}
.left-enter {
  transform: translate(100%, 0);
}

.right-leave-to {
  transform: translate(100%, 0);
}
</style>
