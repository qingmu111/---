<template>
  <div class="search-suggest">
    <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search', text)"
    >
      <div slot="title" v-html="hightLight(text)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggest',
  data () {
    return {
      suggestions: []

    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {

      handler: debounce(function (value) {
        // console.log(value)
        this.loadSearchSuggestions(value)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestions(q)
        this.suggestions = data.data.options

        // console.log(data)
      } catch (err) {
        // console.log(err)
        this.$toast('获取数据失败,稍后重试')
      }
    },
    hightLight (text) {
      const hightLightStr = `<span class='active'>${this.searchText}</span>`
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, hightLightStr)
    }

  }

}
</script>

<style lang="less" scoped>
.search-suggest {
  /deep/ .active {
    color: #3296fa;
  }
}
</style>
