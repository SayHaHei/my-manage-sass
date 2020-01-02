<template>
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3>小滴课堂后台管理系统</h3>
    <el-menu-item
      :index="index"
      v-for="(item, index) in noChildren"
      :key="2 * index"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="index * 3"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subitem.path"
          v-for="(subitem, subindex) in item.children"
          :key="subindex"
          @click="clickMenu(subitem)"
        >
          <i :class="'el-icon-' + subitem.icon"></i>
          <span>{{ subitem.label }}</span>
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  computed: {
    hasChildren() {
      console.log(this.asideMenu.filter(item => item.children));
      return this.asideMenu.filter(item => item.children);
    },
    noChildren() {
      return this.asideMenu.filter(item => !item.children);
    }
  },
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home"
        },
        {
          path: "/video",
          name: "video",
          label: "视频管理页",
          icon: "video-play"
        },
        {
          path: "/user",
          name: "user",
          label: "用户管理页",
          icon: "user"
        },
        {
          label: "其他",
          icon: "location",
          children: [
            {
              path: "/page1",
              name: "page1",
              label: "页面1",
              icon: "setting"
            },
            {
              path: "/page2",
              name: "page2",
              label: "页面2",
              icon: "setting"
            }
          ]
        }
      ]
    };
  },
  methods: {
    clickMenu(item) {
      console.log(item.name);
      this.$router.push({ name: item.name }).catch(err => {
        err;
      });
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #fff;
    text-align: center;
    line-height: 40px;
  }
  .el-menu-item,
  .el-submenu {
    text-align: left;
    margin-left: 10px;
  }
}
// .el-menu-vertical-demo:not(.el-menu--collapse) {
//   width: 200px;
//   min-height: 400px;
// }
</style>
