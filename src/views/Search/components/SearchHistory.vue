<template>
  <div class="search-history">
    <van-cell title="历史记录">
      <div v-if="isDeleteEdit">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;<span @click="isDeleteEdit = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isDeleteEdit = true"></van-icon>
    </van-cell>
    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
      @click="onSearchClick(item, index)"
    >
      <van-icon name="close" v-show="isDeleteEdit"></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  data () {
    return {
      isDeleteEdit: false
    }
  },
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  methods: {
    onSearchClick (item, index) {
      if (this.isDeleteEdit) {
        // 删除状态
        // this.searchHistories.splice(index, 1)
        this.$emit('updateSpliceHistories', index)
      } else {
        // 非删除状态,进入搜索
        this.$emit('search', item)
      }
    }
  }

}
</script>

<style>
</style>
