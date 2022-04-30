<template>
  <div class="shop-ping-container">
    <div class="top-nav">
      <van-nav-bar
        title="购物车"
        right-text="删除"
        :left-arrow="false"
        @click-right="del"
      />
    </div>
    <div class="card-list">
      <van-checkbox-group v-model="result" ref="checkboxGroup">
        <div class="card-box" v-for="item in list" :key="item.id">
          <van-checkbox class="checkbox" :name="item.id"></van-checkbox>
          <GoodsCard :item="item" />
        </div>
      </van-checkbox-group>
    </div>
    <div class="card-none" v-if="list.length === 0">
      <img
        src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/shopping_bg.jpg"
        alt=""
      />
    </div>
    <van-submit-bar :price="PriceNum" :button-text="`结算(${totalNum})`">
      <van-checkbox v-model="checked" @click="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
import GoodsCard from "@/components/GoodsCard";
import { mapState } from "vuex";
import { Toast, Dialog } from "vant";
import { getGoodsByIds } from "@/api/shop.js";
export default {
  components: {
    GoodsCard,
  },

  data() {
    return {
      result: [],
      list: [],
      checked: false,
    };
  },

  created() {
    this.getAllData();
  },

  computed: {
    ...mapState("TwoTab", ["localstorageNum"]),

    PriceNum() {
      const newArr = this.list.filter((item) => this.result.includes(item.id));
      return newArr.reduce((a, b) => {
        return a + b.price * this.localstorageNum[b.id] * 100;
      }, 0);
    },

    totalNum() {
      const newArr = this.list.filter((item) => this.result.includes(item.id));
      const resp = newArr.reduce((a, b) => {
        return a + this.localstorageNum[b.id];
      }, 0);
      return resp;
    },
  },

  methods: {
    async del() {
      console.log(this.list.length);
      if (this.result.length === 0) {
        Toast("你没有选中商品");
        return;
      }
      try {
        await Dialog.confirm({ message: "是否删除已选中商品" });
        this.result.forEach((id) => {
          this.$store.commit("TwoTab/setlocalStorage", {
            id,
            value: -Infinity,
          });
          this.list = this.list.filter((item) => {
            !this.result.includes(item.id);
          });
          console.log(this.list.length);
        });
      } catch (error) {
        Toast("点击取消了");
      }
    },

    async getAllData() {
      const result = Object.keys(this.localstorageNum);
      const resp = await getGoodsByIds(result.join());
      this.list = resp.list;
    },
    checkAll() {
      this.checked = !this.checked;
      if (this.checked) {
        this.$refs.checkboxGroup.children.forEach((item) => {
          item.toggle();
        });
        this.result = [];
      } else {
        this.result = [];
      }
    },
  },

  watch: {
    result() {
      if (this.list.length === this.result.length) {
        this.checked = true;
      } else {
        this.checked = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.shop-ping-container {
  background: #eee;
  min-height: 100vh;
  .top-nav {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 10;
  }
  .card-list {
    width: 100%;
    height: calc(100vh - 46px);
    top: 46px;
    position: absolute;
    box-sizing: border-box;
    padding: 10px 10px 100px 10px;
    background: #fff;
    overflow: auto;
    .card-box {
      display: flex;
    }
    .checkbox {
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  .van-submit-bar {
    bottom: 49px;
    padding: 0 10px;
    box-sizing: border-box;
    .van-submit-bar__button {
      border-radius: 26.64rem;
      width: 2.933333rem;
      height: 1.066667rem;
      font-weight: 500;
      line-height: 1.066667rem;
      border: none;
      background: linear-gradient(90deg, #ff6034, #ee0a24);
      font-size: 14px;
    }
    .van-submit-bar__price {
      font-weight: 700;
      font-family: Avenir-Heavy, PingFang SC, Helvetica Neue, Arial, sans-serif;
    }
  }
  .card-none {
    position: absolute;
    top: 46px;
    width: 100%;
  }
}
</style>