<template>
  <div class="tabs">
    <el-tag v-for="tag in tags" :key="tag.name" closable :type="tag.type">
      {{ tag.name }}
    </el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tags: [
        {
          name: "home",
          label: "首页"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
