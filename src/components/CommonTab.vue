<template>
  <div class="tabs">
    <el-tag
      size="small"
      v-for="(tag, index) in tags"
      :key="tag.name"
      :closable="tag.name !== 'home'"
      :type="tag.type"
      :disable-transitions="false"
      @close="handleClose(tag, index)"
      @click="changeMenu(tag)"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  computed: {
    ...mapState({
      tags: state => state.tab.tabList
    })
  },
  methods: {
    ...mapMutations({
      close: "closeTab"
    }),
    handleClose(tag, index) {
      let length = this.tags.length - 1;
      this.close(tag);
      if(tag.name !== this.$route.name){
          return
      }
      /* 如果是最右边，则往左跳；如果是最左边，则往右跳 */
      if(index === length){
          this.$router.push({name: this.tags[index-1].name})
      }else{
          this.$router.push({name: this.tags[index].name});
      }
    },
    changeMenu(item) {
      this.$router.push({ name: item.name });
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  padding: 20px;
  .el-tag {
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
