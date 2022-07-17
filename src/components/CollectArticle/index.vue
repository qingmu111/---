<template>
  <div class="collect-article">
    <van-icon
      :name="value ? 'star' : 'star-o'"
      :class="{ collected: value }"
      @click="onCollect"
    />
  </div>
</template>

<script>
import { addCollection, deleteCollection } from '@/api/article'
export default {
  name: 'CollectArticle',
  data () {
    return {

    }
  },
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      // this.loading = true
      try {
        if (this.value) {
          // 已经收藏 取消
          const { data } = await deleteCollection(this.articleId)
          console.log(data)
        } else {
          // 未收藏,收藏
          const { data } = await addCollection(this.articleId)
          console.log(data)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        console.log(err)
        this.$toast.fail('操作失败,请稍后重试')
      }
      // this.loading = false
    }
  }

}
</script>

<style lang="less" scoped>
.collected {
  color: #df9a1a;
}
</style>
