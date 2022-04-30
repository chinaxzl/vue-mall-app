<template>
  <div class="search-container">
    <div class="search-header">
      <router-link :to="{ name: 'Classify' }"
        ><van-icon name="arrow-left" class="icon"
      /></router-link>
      <div class="search-content">
        <van-search
          v-model="value"
          show-action
          :placeholder="place"
          @search="onSearch"
          @focus="onfocus"
          @input="onInput"
          autofocus
        >
          <template #action v-if="show">
            <div @touchend="onSearch(value)">搜索</div>
          </template>
          <template #action v-else>
            <div class="shop">
              <van-icon name="cart-o" id="shop" badge="10" />
            </div>
          </template>
        </van-search>
      </div>
    </div>
    <div class="link-search" v-if="show">
      <van-list>
        <van-cell v-for="item in linkList" :key="item" @click="onSearch(item)">
          <template>
            <span class="list-conten" v-html="keyword(item)"></span>
          </template>
        </van-cell>
      </van-list>
    </div>
    <div class="list-goods" v-if="!show">
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
    </div>
    <div class="seach-list" v-if="linkList.length <= 0 && show">
      <MyHistory :searchList="searchList" @search="onSearch" />
    </div>
  </div>
</template>

<script>
import { getlikeSearch, getSearch } from "@/api/search";
import GoodsCard from "@/components/GoodsCard.vue";
import MyHistory from "@/components/MyHistory.vue";
// import { mapState } from "vuex";
export default {
  components: {
    GoodsCard,
    MyHistory
  },
  computed: {
    // ...mapState("TwoTab", ["goodsList"]),
  },
  data() {
    return {
      place: "芒果十块二斤",
      value: this.place,
      timer: null,
      linkList: [],
      page: 1,
      show: true,
      loading: false,
      finished: false,
      goodsList: [],
      total: 0,
      size: 7,
      searchList: [],
    };
  },

  methods: {
    async onLoad() {
      this.show = false;
      const resp = await getSearch(this.value, this.page, this.size);
      this.total = resp.total;
      this.goodsList = [...this.goodsList, ...resp.list];
      if (this.goodsList.length >= this.total) {
        this.finished = true;
      } else {
        this.page++;
        this.loading = false;
      }
    },

    async onSearch(value) {
      //确定搜索时触发
      // console.log(value);
      if (!value) {
        this.value = this.place;
      } else {
        this.value = value;
      }

      const result = this.searchList.find((item) => item.value === this.value);
      if (result) {
        result.timer = new Date().getTime();
        this.searchList.sort((a, b) => b.timer - a.timer);
      } else {
        this.searchList.unshift({
          value: this.value,
          timer: new Date().getTime(),
        });
        if (this.searchList.length >= 11) {
          this.searchList.pop();
        }
      }
      localStorage.setItem("search", JSON.stringify(this.searchList));

      this.goodsList = [];
      this.linkList = [];
      this.finished = false;
      this.page = 1;
      this.onLoad();
    },

    onfocus() {
      //输入框获得焦点时触发
      this.show = true;
    },

    async onInput(value) {
      //	输入框内容变化时触发
      if (this.value === "") {
        this.value = value;
        this.linkList = []
        // console.log(this.value);
        return;
      }

      if (this.timer) {
        clearTimeout(this.timer);
        this.timer = null;
      } else {
        this.timer = setTimeout(async () => {
          const resp = await getlikeSearch(value);
          this.linkList = resp.result;
          clearTimeout(this.timer);
          this.timer = null;
          // console.log(this.linkList);
        }, 500);
      }
    },
    keyword(item) {
      const rge = new RegExp(this.value, "g");
      return item.replace(rge, this.value.fontcolor("red"));
    },
  },

  created() {
    this.searchList = JSON.parse(localStorage.getItem("search")) || [];
  },
};
</script>

<style lang="less" scoped>
.search-container {
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: #fff;
  .search-header {
    width: 345px;
    background: #fff;
    margin: 0 auto;
    display: flex;
    align-items: center;
    position: fixed;
    left: 0.4rem;
    top: 0;
    z-index: 100;
    position: relative;
  }
  .icon {
    font-size: 20px;
  }
  .search-content {
    flex: 1;
    .shop {
      font-size: 25px;
    }
  }
  .link-search {
    position: absolute;
    top: 50px;
    left: 0;
    padding-left: 30px;
    width: 100%;
    box-sizing: border-box;
  }
  .list-goods {
    position: fixed;
    width: 345px;
    top: 50px;
    right: 0;
    bottom: 50px;
    overflow: auto;
  }
  .my-history-container{
    width: 350px;
    position:absolute;
    top: 35px;
    left: 10px;
    z-index: 1;
  }
}
</style>