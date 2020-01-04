<template>
  <header>
    <div class="l-content">
      <el-button type="primary" icon="el-icon-menu"></el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{ path: currentMenu.path }"
          :key="currentMenu.name"
          v-if="currentMenu"
        >
          {{ currentMenu.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-content">
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img :src="userImg" alt="" class="user" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      currentMenu: state => state.tab.currentMenu
    })
  },
  data() {
    return {
      userImg: require("../assets/images/user.png")
    };
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
}
.r-content {
  .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
.l-content {
  display: flex;
  align-items: center;
  .el-button {
    margin-right: 20px;
  }
}
</style>
<style lang="scss">
.l-content {
  .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: #666;
      font-weight: normal;
    }
    &:last-child {
      .el-breadcrumb__inner {
        color: #fff;
      }
    }
  }
}
</style>
