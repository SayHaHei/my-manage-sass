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
    currentMenu: null
  },
  mutations: {
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
      if (tag.name === state.currentMenu.name) {
        return true;
      }
    }
  }
};
