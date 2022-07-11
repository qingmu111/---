<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        class="search-btn"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 频道列表 -->
    <van-tabs v-model="active" animated swipeable class="channel-tabs">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>

      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
  </div>
</template>

<script>
import ArticleList from './components/Article-list.vue'
import { getUserChannels } from '@/api/user'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []// 频道列表
    }
  },
  created () {
    this.LoadChannels()
  },
  methods: {
    async LoadChannels () {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }

  }

}
</script>

<style lang="less" scoped>
.home-container {
  padding-bottom: 100px;
  padding-top: 174px;
  // 导航栏
  /deep/ .van-nav-bar__content {
    .van-nav-bar__title {
      // max-width: unset;
      max-width: 80%;

      .search-btn {
        width: 555px;
        height: 64px;
        background-color: #5babfb;
        border: none;
        font-size: 28px;
        .van-icon-search {
          color: #fff;
          font-size: 32px;
        }
      }
    }
  }
  // 频道列表
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .van-tab {
      min-width: 200px;

      border-right: 1px solid #f9fafb;
      font-size: 32px;
      color: #777;
    }
    .van-tab--active {
      color: #333;
    }
    .van-tabs__nav {
      padding-bottom: 0;
    }
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .hamburger-btn {
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      // text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      // border-left: 1px solid #f9fafb;
      opacity: 0.9;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        position: absolute;
        left: 0;
        content: '';
        width: 1px;
        height: 100%;
        background-image: url(../../assets/gradient-gray-line.png);
        background-size: contain;
        // background-repeat: no-repeat;
        line-height: 82px;
      }
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }
  }
}
</style>
