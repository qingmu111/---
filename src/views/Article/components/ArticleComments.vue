<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      :immediate-check="false"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item, index) in list" :key="index">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ item.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              item.pubdate | relativeTime
            }}</span>
            <van-button
              size="mini"
              type="default"
              @click="$emit('onReply', item)"
              >回复{{ item.reply_count }}</van-button
            >
          </p>
        </div>
        <van-icon
          @click="onLike(item)"
          slot="right-icon"
          :name="item.is_liking ? 'like' : 'like-o'"
          :class="{ liked: item.is_liking }"
        />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->
    <!-- 发布评论 -->
    <!--   <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>
<script>
import { getComments, addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'ArticleComment',
  props: {
    source: {
      type: [Number, String],
      required: true
    },
    list: {
      type: Array,
      default: () => []
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  data () {
    return {
      /*  list: [], */ // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束

      offset: null,
      limit: 20,
      error: false
      // commentList: []

    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },

  methods: {
    async onLoad () {
      // 1.获取数据
      try {
        const { data } = await getComments({ type: this.type, source: this.source.toString(), offset: this.offset, limit: this.limit })
        console.log(data)
        const { results } = data.data
        // 把文章评论数量传给父组件
        this.$emit('onloadSucess', data.data)
        // 2.将数据添加到列表中

        this.list.push(...results)
        // 3.将loading关闭
        this.loading = false
        // 4.确认是否关闭finished
        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onLike (item) {
      // console.log(isLike)
      try {
        if (item.is_liking) {
          // 点赞了 取消
          const { data } = await deleteCommentLike(item.com_id)
          console.log(data, '点赞了 取消')
        } else {
          // 未点赞 点赞
          const { data } = await addCommentLike(item.com_id)
          console.log(data, '未点赞 点赞')
        }
        item.is_liking = !item.is_liking
        this.$toast.success(!item.is_liking ? '取消点赞' : '点赞成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败,请稍后重试')
      }
    }
  }

}
</script>
<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
.liked {
  color: #e5645f;
}
</style>
