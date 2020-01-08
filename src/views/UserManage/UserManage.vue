<template>
  <common-table
    :tableData="tableData"
    :tableLabel="tableLabel"
    :config="config"
    @changePage="getUserList()"
  ></common-table>
</template>

<script>
import CommonTable from "../../components/CommonTable";
export default {
  components: {
    CommonTable
  },
  data() {
    return {
      tableData: [],
      tableLabel: [
        { prop: "name", label: "姓名" },
        { prop: "age", label: "年龄" },
        { prop: "sexLabel", label: "性别" },
        { prop: "birth", label: "出生日期", width: 200 },
        { prop: "addr", label: "地址", width: 320 }
      ],
      config: {
        page: 1,
        total: 30,
        loading: false
      }
    };
  },
  methods: {
    getUserList() {
      this.$http
        .get("/api/user/getUser", {
          params: {
            page: this.config.page
          }
        })
        .then(res => {
          let data = res.data;
          if (data.code == 20000) {
            this.tableData = data.list.map(item => {
              item.sexLabel = item.sex == 0 ? "女" : "男";
              return item;
            });
            this.config.total = data.count;
            this.config.loading = false;
          }
        });
    },
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
    this.getUserList();
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/common";
</style>
