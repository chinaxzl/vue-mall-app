<template>
  <ul class="one-tab-container" ref="container">
    <li
      class="tab-container"
      v-for="(item, i) in data"
      :key="item.title"
      :class="{ active: index === i }"
      @touchend="handleTouchend(i, $event)"
      @touchstart="move = false"
      @touchmove="move = true"
    >
      <div class="img-container">
        <img :src="item.imgURL" alt="" />
      </div>
      <div class="title">{{ item.title }}</div>
    </li>
  </ul>
</template>

<script>
import { MoveTo } from "@/utils";
export default {
  data() {
    return {
      data: [
        {
          title: "时令水果",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/时令水果.jpg",
        },
        {
          title: "酒水冲调",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/酒水冲调.jpg",
        },
        {
          title: "安心乳品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/安心乳品.jpg",
        },
        {
          title: "休闲零食",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/休闲零食.jpg",
        },
        {
          title: "肉蛋食材",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/肉蛋食材.jpg",
        },
        {
          title: "海鲜水产",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/海鲜水产.jpg",
        },
        {
          title: "熟食餐饮",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/熟食餐饮.jpg",
        },
        {
          title: "家用电器",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家用电器.jpg",
        },
        {
          title: "3C数码",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/3C数码.jpg",
        },
        {
          title: "母婴用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/母婴用品.jpg",
        },
        {
          title: "鲜花绿植",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/鲜花绿植.jpg",
        },
        {
          title: "宠物用品",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/宠物用品.jpg",
        },
        {
          title: "手表配饰",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/手表配饰.jpg",
        },
        {
          title: "家居收纳",
          imgURL:
            "https://duyi-bucket.oss-cn-beijing.aliyuncs.com/img/家居收纳.jpg",
        },
      ],
      index: 0,
      move: false,
    };
  },

  created() {
    this.$store.dispatch("TwoTab/removeGoodsList");
    this.$store.dispatch("TwoTab/setSidebar", this.data[0].title);
  },

  methods: {
    handleTouchend(i, e) {
      if (this.move) {
        return;
      }
      this.index = i;
      this.$store.commit("TwoTab/setFinished", false);
      // target
      const dom = this.$refs.container;
      const imgWidth = e.target.offsetWidth / 2;
      const imgLeft = e.target.getBoundingClientRect().left;
      const containerWidth = this.$refs.container.offsetWidth / 2;
      MoveTo(
        dom.scrollLeft,
        imgWidth + imgLeft - containerWidth,
        dom,
        "scrollLeft"
      );
      this.$store.dispatch("TwoTab/removeGoodsList");
      this.$store.dispatch("TwoTab/setSidebar", this.data[i].title);
    },
    
  },
};
</script>

<style lang="less" scoped>

.one-tab-container {
  width: 375px;
  height: 104px;
  display: flex;
  overflow: auto;
  .tab-container {
    width: 50px;
    height: 70px;
    padding: 10px 5px;
    .img-container {
      width: 50px;
      height: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 45px;
        height: 45px;
        border-radius: 50%;
        align-self: center;
      }
      .title {
        text-align: center;
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
  .active {
    .img-container {
      border: 2px solid #d13193;
      border-radius: 23px;
    }
    .title {
      font-weight: bold;
      color: #fff;
      background-color: #d13193;
      border-radius: 30px;
    }
  }
}

.one-tab-container::-webkit-scrollbar {
  width: 0;
  background: none;
}
</style>