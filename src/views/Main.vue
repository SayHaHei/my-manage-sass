<template>
  <el-container>
    <el-aside width="300px">
      <common-aside></common-aside>
    </el-aside>
    <el-container>
      <el-header>
        <common-header></common-header>
      </el-header>
      <common-tab></common-tab>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from "../components/CommonAside";
import CommonHeader from "../components/CommonHeader";
import CommonTab from "../components/CommonTab";
export default {
  components: {
    CommonAside,
    CommonHeader,
    CommonTab
  }
};
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #333;
}
.el-main {
  padding-top: 3px;
}
</style>
