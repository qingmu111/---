<template>
  <div class="update-gender">
    <van-picker
      title="修改性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { editUserProfile } from '@/api/user'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onChange (picker, value, index) {
      // console.log(picker, value, index)
      this.localGender = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '保存中',
        forbidClick: true,
        duration: 0
      })
      try {
        /*   if (!this.localGender.length) {
            this.$toast('昵称不能为空')
            return
          } */
        const { data } = await editUserProfile({ gender: this.localGender })
        console.log(data, 'localGender')
        // 修改value
        this.$emit('input', this.localGender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('操作失败')
      }
    }

  }
}
</script>

<style>
</style>
