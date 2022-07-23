<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    ></van-nav-bar>
    <!-- 输入框 -->
    <div class="field-wrap">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateName',
  data () {
    return {
      localName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        if (!this.localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        const { data } = await editUserProfile({ name: this.localName })
        console.log(data, 'editUserProfile')
        // 修改value
        this.$emit('input', this.localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }
  }

}
</script>

<style lang="less" scoped>
.update-name {
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
  .field-wrap {
    padding: 20px;
  }
}
</style>
