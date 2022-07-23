<template>
  <div class="comment-reply">
    <!-- 导航 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('closeReply')"
      ></van-icon>
    </van-nav-bar>
    <div class="scroll-wrap">
      <!-- 当前评论项目 -->
      <van-cell>
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d" slot="title">{{ comment.aut_name }}</span>
        <div slot="label">
          <p style="color: #363636">{{ comment.content }}</p>
          <p>
            <span style="margin-right: 10px">{{
              comment.pubdate | relativeTime
            }}</span>
            <van-button size="mini" type="default"
              >回复{{ comment.reply_count }}</van-button
            >
          </p>
        </div>
        <van-icon
          @click="onLike(comment)"
          slot="right-icon"
          :name="comment.is_liking ? 'like' : 'like-o'"
          :class="{ liked: comment }"
        />
      </van-cell>
      <van-cell title="全部回复"></van-cell>
      <ArticleComment
        :source="comment.com_id"
        type="c"
        :list="commentList"
      ></ArticleComment>
    </div>

    <!-- 发布评论 -->
    <div class="post-wrap">
      <van-button size="small" round class="post-btn" @click="isPostShow = true"
        >写评论</van-button
      >
    </div>
    <!-- 发布评论弹框 -->
    <!-- 弹出层 -->
    <van-popup v-model="isPostShow" position="bottom">
      <CommentPost :target="comment.com_id" @postSuccess="onPostSuccess">
      </CommentPost>
    </van-popup>
  </div>
</template>

<script>
import ArticleComment from './ArticleComments.vue'
import CommentPost from './CommentPost.vue'
export default {
  name: 'CommentReply',
  components: {
    ArticleComment,
    CommentPost
  },
  // 接收父组件数据
  inject: {
    articleId: {
      type: [Number, String],
      required: true
    }

  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isPostShow: false,
      commentList: []
    }
  },
  methods: {
    onPostSuccess (data) {
      console.log(data)
      // 更新回复数量
      // this.comment.reply_count++
      // 关闭弹层
      this.isPostShow = false
      // 将最新回复放在顶部
      this.commentList.unshift(data.new_obj)
    }
  }

}
</script>

<style lang="less" scoped>
.scroll-wrap {
  position: fixed;
  top: 92px;
  left: 0;
  right: 0;
  bottom: 88px;
  overflow-y: auto;
}
.post-wrap {
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-top: 1px solid #d8d8d8;
  .post-btn {
    width: 60%;
  }
}
</style>
