<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchText"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>
    <!-- 搜索结果 searchText不为空,且搜索-->
    <SearchResult v-if="isResultShow" :searchText="searchText"></SearchResult>
    <!-- 联想建议  searchText不为空,且没搜索-->
    <SearchSuggest
      v-else-if="searchText"
      :searchText="searchText"
      @search="onSearch"
    ></SearchSuggest>
    <!-- 历史记录  searchText为空 且没搜索-->
    <SearchHistory
      v-else
      :searchHistories="searchHistories"
      @search="onSearch"
      @clear-search-histories="searchHistories = []"
      @updateSpliceHistories="updateSpliceHistories"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchResult from './components/SearchResult.vue'
import SearchSuggest from './components/SearchSuggest.vue'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex',
  components: {
    SearchHistory,
    SearchResult,
    SearchSuggest

  },
  data () {
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果展示
      searchHistories: getItem('TOUTIAO_SEARCHHISTORIES') || []
    }
  },
  methods: {
    onSearch (val) {
      // console.log(val)
      this.searchText = val

      // 要求不要有重复历史记录,且最新的在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      // 存储搜索历史记录
      this.searchHistories.unshift(val)

      this.isResultShow = true
    },
    onCancel () {
      // console.log('取消')
      this.$router.back()
    },
    updateSpliceHistories (index) {
      this.searchHistories.splice(index, 1)
    }
  },
  watch: {
    searchHistories (value) {
      // console.log('11111')
      setItem('TOUTIAO_SEARCHHISTORIES', value)
    }
  }

}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
