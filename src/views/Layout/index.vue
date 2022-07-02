<template>
  <div class="layout-container">
    <!-- 内容 -->
    <router-view></router-view>
    <!-- 底部导航 -->
    <van-tabbar class="layout-tabber" route>
      <van-tabbar-item to="/layout/home">
        <i slot="icon" class="toutiao toutiao-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/vedio">
        <i slot="icon" class="toutiao toutiao-shipin"></i>
        <span class="text"> 视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/qa">
        <i slot="icon" class="toutiao toutiao-wenda"></i>
        <span class="text"> 问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/layout/my">
        <i slot="icon" class="toutiao toutiao-wode"></i>
        <span class="text"> {{ $store.state.user ? '我的' : '未登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'

}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabber {
    i.toutiao {
      font-size: 40px;
    }
    span.text {
      font-size: 20px;
    }
  }
}
</style>
