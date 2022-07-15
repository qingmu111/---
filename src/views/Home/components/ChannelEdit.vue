<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">我的频道</div>
      <van-button
        type="danger"
        plain
        round
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        v-for="(Channel, index) in myChannels"
        :key="index"
        class="grid-item"
        @click="onMyChannelClick(Channel, index)"
      >
        <van-icon
          slot="icon"
          name="clear"
          v-show="isEdit && !fiexChannels.includes(Channel.id)"
        ></van-icon>
        <span slot="text" class="text" :class="{ active: index === active }">{{
          Channel.name
        }}</span>
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title-text">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" direction="horizontal">
      <van-grid-item
        icon="plus"
        v-for="(channel, index) in recommendChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        @click="onAddChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels, setUserChannels, deteleUserChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fiexChannels: [0]
    }
  },
  props: {
    myChannels: {
      type: Array,
      requires: true
    },
    active: {
      type: Number,
      requires: true
    }

  },
  created () {
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        // console.log(data, '999')
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败')
      }
    },
    async onAddChannel (channel) {
      // console.log(channel)
      this.$emit('push', channel)
      // this.myChannels.push(channel)
      if (this.user) {
        try {
          setUserChannels({ id: channel.id, seq: this.myChannels.length })
        } catch (err) {
          this.$toast('保存失败,请稍后重试')
        }
        // 已经登录 把数据存储线上
      } else {
        // 未登录 存储本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (Channel, index) {
      // console.log(Channel, index)
      // 如果编辑状态,删除
      if (this.fiexChannels.includes(Channel.id)) {
        return
      }

      if (this.isEdit) {
        this.$emit('splice', index)
        // this.myChannels.splice(index, 1)
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        // 处理删除持久化
        this.deleteChannel(Channel)
        console.log(Channel)
      } else {
        // 如果非编辑,切换频道
        this.$emit('update-active', index, false)
      }
    },
    async deleteChannel (Channel) {
      console.log('处理持久化')
      try {
        if (this.user) {
          // 登录状态,线上删除
          await deteleUserChannels(Channel.id)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败,请稍后重试')
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      const channels = []
      this.allChannels.forEach(channel => {
        const ret = this.myChannels.find(mychannel => {
          return mychannel.id === channel.id
        })
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    }

  }

}
</script>

<style lang="less" scoped>
.channel-edit {
  padding: 85px 0;
  .title-text {
    font-size: 32px;
    color: #333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/ .grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        color: #222;
        font-size: 28px;
        margin-left: 6px;
        margin-top: 0;
      }
      .active {
        color: #f85959;
      }
      .van-icon-plus {
        font-size: 28px;
      }
    }
  }
  /deep/ .my-grid {
    .grid-item {
      .van-grid-item__icon-wrapper {
        position: unset;
      }
      .van-icon-clear {
        position: absolute;
        right: -10px;
        top: -10px;
        z-index: 2;
        font-size: 30px;
        color: #999;
      }
    }
  }
}
</style>
