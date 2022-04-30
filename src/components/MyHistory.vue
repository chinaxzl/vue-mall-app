<template>
  <div class="my-history-container">
    <h4>历史记录:</h4>
    <div
      class="his-item"
      v-for="item in searchList"
      :key="item.timer"
      @click="handleClick(item.value)"
    >{{item.value}}</div>
  </div>
</template>

<script>
export default {
  props: {
    searchList: {
      default: ()=>[],
    },
  },

  methods: {
    handleClick(value) {
      this.$emit("search", value);
    },
  },


};
</script>

<style scoped lang="less">

    .his-item{
        background: #eee;
        display: inline-block;
        padding: 10px;
        border-radius: 10px;
        margin-left: 10px;
        margin-bottom:10px ;
    }

</style>