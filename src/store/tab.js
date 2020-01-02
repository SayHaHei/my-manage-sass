export default {
  state: {
    tabList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "home"
      }
    ]
  },
  mutations: {
    selectMenu(state, val) {
      if (val.name !== "home") {
        console.log(val);
        let result = state.tabList.findIndex(item => item.name === val.name);
        if (result === -1) {
          state.tabList.push(val);
        }
      }
    }
  }
};
