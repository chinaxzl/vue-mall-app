<template>
  <div class="classify-container">
    <router-link to="/search">
      <div class="search-btn">
        <van-icon name="search" />
        <div>苹果一元一斤</div>
      </div>
    </router-link>

    <OneTab />
    <template v-if="loading">
      <TwoTab />
      <GoodsList />
    </template>
    <van-loading v-else color="#1989fa" :vertical="true" />
  </div>
</template>

<script>
import OneTab from "@/components/OneTab";
import TwoTab from "@/components/TwoTab";
import GoodsList from "@/components/GoodsList";
import { mapState } from "vuex";
export default {
  components: { OneTab, TwoTab, GoodsList },

  computed: {
    ...mapState("TwoTab", ["loading"]),
  },

  methods: {},
};
</script>

<style lang="less" scoped>
.classify-container {
  width: 375px;
  .search-btn {
    width: 355px;
    height: 30px;
    background: #eee;
    margin: 11px auto 0;
    text-align: center;
    line-height: 30px;
    font-size: 13px;
    border-radius: 5px;
    color: #a1a1a1;
    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
}
</style>