<template>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-if="value"
    @click="onFollow"
    :loading="followloading"
    >已关注</van-button
  >
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    @click="onFollow"
    :loading="followloading"
    >关注</van-button
  >
</template>

<script>
import { addUser, deleteUser } from '@/api/user'
export default {
  name: 'FollowUser',
  data () {
    return {
      followloading: false

    }
  },
  props: {
    value: {
      type: Boolean,
      required: true

    },
    userId: {
      type: [Number, String],
      required: true
    }
  },
  methods: {
    async onFollow () {
      this.followloading = true
      try {
        if (this.value) {
          // 已经关注,取消
          console.log('已经关注')
          const { data } = await deleteUser(this.userId)
          console.log(data)
        } else {
          console.log('未关注')
          // 未关注,去关注
          const { data } = await addUser(this.userId)
          console.log(data)
        }
        // this.article.is_followed = !this.article.is_followed
        this.$emit('input', !this.value)
      } catch (err) {
        console.log(err.response.status)
        // this.$toast('操作失败,请重试')
        if (err.response && err.response.status === 400) {
          this.$toast('你不能关注自己')
        } else { this.$toast('操作失败') }
      }
      this.followloading = false
    }
  }

}
</script>

<style>
</style>
