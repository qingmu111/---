<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    ></van-nav-bar>
    <input type="file" hidden ref="file" @change="onFileChange" />
    <!-- 个人信息 -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isNameShow = true"
    ></van-cell>
    <van-cell
      title="性别"
      :value="user.gender === 1 ? '女' : '男'"
      is-link
      @click="isGenderShow = true"
    ></van-cell>
    <van-cell
      title="生日"
      :value="user.birthday"
      is-link
      @click="isBirthdayShow = true"
    ></van-cell>
    <!-- 弹出层 修改昵称 -->
    <van-popup
      v-model="isNameShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        @close="isNameShow = false"
        v-model="user.name"
        v-if="isNameShow"
      ></UpdateName
    ></van-popup>
    <!-- 修改性别 -->
    <van-popup v-model="isGenderShow" position="bottom">
      <UpdateGender
        @close="isGenderShow = false"
        v-model="user.gender"
        v-if="isGenderShow"
      ></UpdateGender>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup v-model="isBirthdayShow" position="bottom">
      <UpdateBirthday
        v-model="user.birthday"
        @close="isBirthdayShow = false"
        v-if="isBirthdayShow"
      ></UpdateBirthday>
    </van-popup>
    <!-- 编辑头像 -->
    <van-popup
      v-model="isPhotoShow"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdatePhoto :img="img" @close="isPhotoShow = false"></UpdatePhoto>
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdatePhoto from './components/UpdatePhoto.vue'
export default {
  name: 'UserProfile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  data () {
    return {
      user: {},
      isNameShow: false,
      isGenderShow: false,
      isBirthdayShow: false,
      isPhotoShow: false,
      img: ''
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        console.log(data, 'Profile')
        this.user = data.data
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      // 基于文章对象获取blob数据
      this.img = window.URL.createObjectURL(file)
      // console.log(data)

      this.isPhotoShow = true
      // file-input 选择同一文件不触发
      this.$refs.file.value = ''
    }

  }

}
</script>

<style lang="less" scoped>
.user-profile {
  .avatar {
    width: 60px;
    height: 60px;
  }
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  .van-popup {
    background-color: #f5f7f9;
  }
}
</style>
