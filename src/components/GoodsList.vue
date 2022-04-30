<template>
  <div class="goods-list-container">
    <div class="list-hander van-hairline--top-bottom">
      <div :class="{ active: type == 'all' }" @click="hanldeType('all')">
        综合
      </div>
      <div :class="{ active: type == 'sale' }" @click="hanldeType('sale')">
        销量
      </div>
      <div
        class="pric"
        :class="{ pricUp: type == 'price-up', pricDown: type == 'price-down' }"
        @click="hanldeType('price-up')"
      >
        价格
      </div>
    </div>

    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <GoodsCard
          v-for="(item, i) in goodsList"
          :key="i"
          :item="item"
        ></GoodsCard>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import GoodsCard from "./GoodsCard.vue";
import { mapState } from "vuex";
export default {
  components: {
    GoodsCard,
  },

  computed: {
    ...mapState("TwoTab", ["goodsList", "finished"]),
  },

  data() {
    return {
      type: "all",
      isLoading: false,
      loading: false,
      page: 1,
    };
  },

  methods: {
    hanldeType(type) {
      console.log(1);
      if (type == "all") {
        this.type = "all";
      } else if (type == "sale") {
        this.type = "sale";
      } else {
        if (this.type == "price-up") {
          this.type = "price-down";
        } else {
          this.type = "price-up";
        }
      }
      this.onRefresh();
    },
    async onRefresh() {
      this.isLoading = true;
      this.$store.commit("TwoTab/setFinished", false);
      this.loading = false;
      this.page = 1;
      this.$store.dispatch("TwoTab/removeGoodsList");
      await this.$store.dispatch("TwoTab/setGoodsList", {
        page: 1,
        size: 7,
        sort: this.type,
      });
      this.isLoading = false;
    },

    async onLoad() {
      this.page++;
      const resp = await this.$store.dispatch("TwoTab/setGoodsList", {
        page: this.page,
        size: 7,
        sort: this.type,
      });
      console.log(resp);

      if (resp) {
        this.loading = false;
      } else {
        this.loading = false;
        this.$store.commit("TwoTab/setFinished", true);
        this.page = 1;
      }
      console.log(this.finished);
    },
  },
};
</script>

<style lang="less" scoped>
.list-hander {
  position: relative;
  width: 296px;
  top: 0;
  left: 0;
  box-sizing: border-box;
  padding: 0 8px;
  display: flex;
  justify-content: flex-end;
  z-index: 999;
  > div {
    width: 50px;
    height: 25px;
    text-align: center;
    line-height: 25px;
    color: #cecece;
    position: relative;
  }
  .active,
  .pricUp,
  .pricDown {
    color: #ff1a90;
    font-weight: bold;
  }
  .pric::after {
    content: "";
    border: 4px solid transparent;
    border-bottom-color: #aaa;
    position: absolute;
    top: 3px;
    right: 0;
  }

  .pric::before {
    content: "";
    border: 4px solid transparent;
    border-top-color: #aaa;
    position: absolute;
    bottom: 3px;
    right: 0;
  }
  .pricUp::after {
    border-bottom-color: #ff1a90;
  }

  .pricDown::before {
    border-top-color: #ff1a90;
  }
}
.goods-list-container {
  position: fixed;
  width: 296px;
  top: 3.6rem;
  right: 0;
  bottom: 50px;
  overflow: auto;
}
.van-pull-refresh {
  overflow: unset;
}
</style>