import Cookie from "js-cookie";
export default {
  state: {
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home"
      }
    ],
    currentMenu: null,
    menu: []
  },
  mutations: {
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
      console.log(val, "vuex");
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    addMenu(state, router) {
      let menu = Cookie.get("menu") ? JSON.parse(Cookie.get("menu")) : "";
      if (!menu) {
        return;
      }
      state.menu = menu;
      let currentMenu = [
        {
          path: "/",
          component: () => import(`@/views/Main`),
          children: []
        }
      ];
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`);
            return item;
          });
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      console.log(currentMenu, "cur");
      router.addRoutes(currentMenu);
    },
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val;
        let result = state.tabList.findIndex(item => item.name === val.name);
        if (result === -1) {
          state.tabList.push(val);
        }
      } else {
        state.currentMenu = null;
      }
    },
    closeTab(state, tag) {
      let result = state.tabList.findIndex(item => item.name === tag.name);
      state.tabList.splice(result, 1);
    }
  }
};
