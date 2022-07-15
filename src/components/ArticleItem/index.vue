<template>
  <div>
    <van-cell class="article-item">
      <div slot="title" class="title van-multi-ellipsis--l2">
        {{ article.title }}11111111111111111
      </div>
      <div slot="label">
        <div class="cover-wrap" v-if="article.cover.type === 3">
          <div
            class="cover-item"
            v-for="(img, index) in article.cover.images"
            :key="index"
          >
            <van-image :src="img" class="cover-item-img" />
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <van-image
        class="right-img"
        v-if="article.cover.type === 1"
        slot="default"
        :src="article.cover.images[0]"
        fit="cover"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }

  }

}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }
  .right-img {
    width: 232px;
    height: 146px;
  }
  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }
  .cover-wrap {
    display: flex;
    padding: 30px 0;
    // background-color: rgb(255, 167, 167);

    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      // margin-right: 4px;
      // background-color: rgb(144, 237, 78);

      .cover-item-img {
        width: 100%;
        height: 146px;
      }
    }
  }
}
</style>
