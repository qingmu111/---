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
        to="/search"
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
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <!-- 频道编辑弹出层 -->
    <van-popup
      close-icon-position="top-left"
      v-model="isChannelEditShow"
      closeable
      position="bottom"
      :style="{ height: '100%' }"
    >
      <ChannelEdit
        :myChannels="channels"
        :active="active"
        @update-active="onUpdateActive"
        @push="push"
        @splice="splice"
      ></ChannelEdit>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/Article-list.vue'
import ChannelEdit from './components/ChannelEdit.vue'
import { getUserChannels } from '@/api/user'
import { mapState } from 'vuex'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChannelEditShow: false
    }
  },
  created () {
    this.LoadChannels()
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    splice (index) {
      this.channels.splice(index, 1)
    },
    push (channel) {
      this.channels.push(channel)
    },
    /*  async LoadChannels () {

      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    }, */
    async LoadChannels () {
      let channels = []
      try {
        if (this.user) {
          // 已经登录
          const { data } = await getUserChannels()

          channels = data.data.channels
          console.log('111111')
        } else {
          // 未登录
          const localChannels = getItem('TOUTIAO_CHANNELS')
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有,请求默认频道获取
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }
        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChannelEditShow = true) {
      // console.log('home', index)
      this.active = index
      this.isChannelEditShow = isChannelEditShow
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
