<template>
  <div class="collect-article">
    <van-icon
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :class="{ liked: value === 1 }"
      @click="onLike"
    />
  </div>
</template>

<script>
import { addLike, deleteLike } from '@/api/article'
export default {

  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLike () {
      try {
        if (this.value) {
          // 已经点赞 取消
          const { data } = await deleteLike(this.articleId)
          console.log(data)
          this.$emit('input', 0)
        } else {
          // 未收藏,收藏
          const { data } = await addLike(this.articleId)
          console.log(data)
          this.$emit('input', 1)
        }

        this.$toast.success(this.value === 1 ? '取消点赞' : '点赞成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败,请稍后重试')
      }
    }
  }

}
</script>

<style lang="less" scoped>
/deep/ .liked {
  color: #f0563e;
  // font-size: 40px;
}
</style>
