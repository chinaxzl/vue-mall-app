<template>
  <ul class="two-tab-container" ref="container">
    <li
      v-for="(item, i) in sidebar"
      :key="item"
      :class="{ active: index === i }"
      @touchend="handleTouchend(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      {{ i === 0 ? "全部" : item }}
    </li>
  </ul>
</template>

<script>
import { MoveTo } from "@/utils";
import { mapState } from "vuex";
export default {
  data() {
    return {
      number: 0,
      index: 0,
      move: false,
    };
  },

  computed: {
    ...mapState("TwoTab", ["sidebar"]),
  },

  methods: {
    handleTouchend(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      const dom = this.$refs.container;
      const targetTop = e.target.getBoundingClientRect().top;
      const targetHeight = e.target.offsetHeight / 2;
      const domTop = dom.getBoundingClientRect().top;
      const domHeight = dom.offsetHeight / 2;
      MoveTo(
        dom.scrollTop,
        targetTop + targetHeight - domTop - domHeight,
        dom,
        "scrollTop"
      );
      this.$store.dispatch("TwoTab/removeGoodsList");
      this.$store.dispatch("TwoTab/setGoodsList", {
        type: this.sidebar[i],
        page: 1,
        size: 7,
        sort: "all",
      });
      // this.$store.commit("TwoTab/setFinished", false);
    },
  },
  created() {
    this.$store.dispatch("TwoTab/removeGoodsList");
    this.$store.dispatch("TwoTab/setGoodsList", {
      type: this.sidebar[0],
      page: 1,
      size: 7,
      sort: "all",
    });
  },
};
</script>

<style lang="less" scoped>
.two-tab-container {
  position: relative;
  position: fixed;
  left: 0;
  width: 79px;
  top: 135px;
  bottom: 50px;
  overflow: auto;
  background: #f8f8f8;
  li {
    position: relative;
    width: 79px;
    height: 40px;
    text-align: center;
    line-height: 40px;
  }
  .active {
    font-weight: bold;
    color: #ff1a90;
  }
  .active::before {
    content: "";
    position: absolute;
    width: 6px;
    height: 18px;
    background-color: #ff1a90;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
  }
}

.two-tab-container::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>