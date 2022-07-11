<template>
  <div class="my-container">
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
          <van-image :src="userInfo.photo" class="avater" round />

          <span class="text">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="edit" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="data-info">
        <div class="data-item">
          <div class="count">{{ userInfo.art_count }}</div>
          <span class="text">头条</span>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.follow_count }}</div>
          <span class="text">关注</span>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.fans_count }}</div>
          <span class="text">粉丝</span>
        </div>
        <div class="data-item">
          <div class="count">{{ userInfo.like_count }}</div>
          <span class="text">获赞</span>
        </div>
      </div>
    </div>
    <div class="header no-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="login-img" />
        <span class="login-text">登录/注册</span>
      </div>
    </div>

    <van-grid :column-num="2" class="grid-nav">
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <div class="group cell-item">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </div>
    <div class="group" v-if="user">
      <van-cell title="退出登录" class="login-out" @click="loginOut" />
    </div>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'
import { mapState } from 'vuex'
export default {
  data () {
    return {
      userInfo: {}
    }
  },
  name: 'MyIndex',
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        // console.log(res, 555)
        this.userInfo = data.data
      } catch (err) {
        // console.log(err, 555)
      }
    },
    loginOut () {
      this.$dialog.confirm({
        title: '确认退出吗'
        // message: '弹窗内容',
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
      console.log('loginout')
    }

  }

}
</script>

<style lang="less" scoped>
.my-container {
  .header {
    height: 400px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .no-login {
    display: flex;
    justify-content: center;
    align-items: center;

    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .login-img {
        width: 132px;
        height: 132px;
        margin-bottom: 8px;
        // border: 2px solid #fff;
      }
      .login-text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  .user-info {
    .base-info {
      height: 270px;
      // background-color: pink;
      padding: 78px 32px 24px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left {
        // background-color: rgb(35, 24, 158);
        display: flex;
        // flex-direction: column;
        align-items: center;

        .avater {
          width: 134px;
          height: 134px;
          margin-right: 23px;
          border: 2px solid #fff;
        }
        .text {
          font-size: 30px;
          color: #fff;
        }
      }
      .right {
        .edit {
          width: 118px;
          // height: 34px;
          font-size: 20px;
        }
      }
    }
    .data-info {
      height: 130px;
      // background-color: #fff;
      display: flex;
      .data-item {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        // height: 130px;
        color: #fff;
        .count {
          font-size: 36px;
          margin-bottom: 6px;
        }
        .text {
          font-size: 24px;
        }
      }
    }
  }
  .grid-nav {
    margin-bottom: 10px;
    height: 140px;
    .grid-item {
      height: 140px;

      i.toutiao-shoucang {
        font-size: 45px;
        color: #eb5253;
      }
      i.toutiao-lishi {
        font-size: 45px;
        color: #ff9d1d;
      }
      span.text {
        font-size: 28px;
        margin-top: 6px;
      }
    }
  }
  .group {
    margin-bottom: 10px;
    .login-out {
      text-align: center;
      color: #d86262;
      font-size: 30px;
      height: 104px;
      .van-cell__title {
        line-height: 64px;
      }
    }
  }
}
</style>
