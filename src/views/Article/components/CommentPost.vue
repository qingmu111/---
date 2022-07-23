<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button
      type="primary"
      size="small"
      class="align-items"
      @click="onPost"
      :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  // 接收父组件数据
  inject: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  props: {
    target: {
      type: [Number, String],
      required: true

    }
  },

  data () {
    return {
      message: ''
      // art_id: null
    }
  },
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    async onPost () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await addComment({ target: this.target, content: this.message, art_id: null })
        console.log(data)
        // const newObj = data.data.new_obj
        // 关闭弹出层
        // 将发布内容显示到列表顶层
        // 清空文本
        this.message = ''
        this.$emit('postSuccess', data.data)
        this.$toast.success('发布成功')
      } catch (err) {
        // console.log()
        this.$toast.fail('操作失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.post-comment {
  display: flex;
  padding: 15px;
  align-items: center;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
  .align-items {
    white-space: nowrap;
  }
}
</style>
