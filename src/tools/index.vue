<template>
  <div class="new-img"
    :style="{
        width,
        height,
        transform:`translate(${sx}px,${sy}px) scale(${x},${y})`,
        opacity
    }"
    v-if="show"
  >
      <img :src="src" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>

.new-img{
    position:fixed;
    top:0;
    left:0;
    z-index: 999;
    transition: all 0.5s;
    transform-origin: 0 0;
    img{
        border-radius: 50%;
        width: 100%;
    }
}

</style>