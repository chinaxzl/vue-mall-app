<template>
  <ul class="goods-card-container" style="width: 100%;">
    <li class="card-container">
      <div class="card-img">
        <img :src="item.images[0]" ref="img" />
      </div>
      <div class="card-content">
        <div class="title overflow-hidden">{{ item.title }}</div>
        <div class="desc overflow-hidden">{{ item.desc }}</div>
        <div class="tags">
          <div v-for="(n, i) in item.tags" :key="i">{{ n }}</div>
        </div>
        <div class="prices">￥{{ item.price }}</div>
        <div class="counter">
        <div @touchend="counter(item.id, -1)" v-if="localstorageNum[item.id]">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/rec.png"
          />
        </div>
        <div class="num" v-if="localstorageNum[item.id]">
          {{ localstorageNum[item.id] }}
        </div>
        <div @touchend="counter(item.id, 1)">
          <img
            src="https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/add.png"
          />
        </div>
      </div>
      </div>
      
    </li>
  </ul>
</template>

<script>
import { mapState } from "vuex";
import Animation from "@/tools/index.js";
export default {
  computed: {
    ...mapState("TwoTab", ["goodsList", "localstorageNum"]),
  },

  props: ["item"],

  methods: {
    counter(id, num) {
      this.$store.commit("TwoTab/setlocalStorage", { id, num });
      if(num < 1){
        return
      }
      const img = this.$refs.img,
        imgTop = img.getBoundingClientRect().top,
        imgLeft = img.getBoundingClientRect().left,
        imgWidth = img.offsetWidth,
        imgHeight = img.offsetHeight,
        imgSrc = img.src;
      const shop = document.getElementById("shop"),
            shopTop = shop.getBoundingClientRect().top,
            shopLeft = shop.getBoundingClientRect().left,
            shopWidth = shop.offsetWidth / 2,
            shopHeight = shop.offsetHeight /2;

      const shopMidT = shopTop + shopHeight;
      const shopMidL = shopLeft + shopWidth;

      Animation({imgTop, imgLeft, imgWidth, imgHeight,imgSrc,shopMidL,shopMidT});
    },
  },
};
</script>

<style lang="less" scoped>
.card-container {
  width: 100%;
  display: flex;
  height: 100px;
  position: relative;
  border-bottom: 1px solid #eee;
  .card-img {
    width: 90px;
    margin-right: 20px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  .card-content {
    flex: 1;
    position: relative;
    > div {
      width: 170px;
    }
    .title {
      font-size: 13px;
      color: #1a1a1a;
      margin-top: 5px;
    }
    .desc {
      color: #aaa;
      margin-top: 5px;
    }
    .prices {
      color: #ff1a90;
      font-weight: 600;
      margin-top: 3px;
      font-size: 15px;
    }
    .tags {
      display: flex;
      margin-top: 4px;
      > div {
        font-size: 10px;
        padding: 2px;
        color: #aaa;
        border: 1px solid #aaa;
        border-radius: 3px;
        margin-right: 5px;
      }
    }
  }

  .counter {
    position: absolute;
    bottom: 12px;
    right: 15px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    > div:not(.num) {
      width: 16px;
      height: 16px;
      img {
        width: 100%;
      }
    }
    .num {
      padding: 0 5px;
      height: 22px;
      line-height: 22px;
    }
  }
}

.overflow-hidden {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>