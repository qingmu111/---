<template>
  <div>
    <div class="father"></div>
  </div>
</template>

<script>
export default {
  name: 'VedioIndex'

}
</script>

<style lang="less" scoped>
.father {
  position: relative;
  width: 400px;
  height: 400px;
  background-color: #fff;
  margin: 0 auto;
  &:before {
    position: fixed;
    left: 0;
    width: 10px;
    height: 400px;
    background-image: url(../../assets/gradient-gray-line.png);
    background-size: contain;
    position: absolute;
    content: '';
    // background-repeat: no-repeat;
  }
}
</style>
