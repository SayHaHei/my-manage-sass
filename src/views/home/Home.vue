<template>
  <el-row class="home">
    <el-col :span="8" :offset="index > 0 ? 2 : 0">
      <el-card :body-style="{ padding: '0px' }">
        <div class="user">
          <img :src="userImage" class="userImage" />
          <div class="userinfo">
            <p class="name">Nick</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>上次登录时间:<span>2019年11月23日</span></p>
          <p>上次登录地点:<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" style="height:522px; margin-top:20px;">
        <el-table :data="tableData">
          <el-table-column
            show-overflow-tooltip
            v-for="(val, key) in tableLabel"
            :key="key"
            :prop="key"
            :label="val"
          ></el-table-column>
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16">
      <div class="num">
        <el-card
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{ display: 'flex', padding: 0 }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="number">￥ {{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <el-card shadow="hover">
        <echart style="height:280px" :chartData="echartData.order"></echart>
      </el-card>
      <div class="graph">
        <el-card shadow="hover">
          <echart style="height:260px" :chartData="echartData.user"></echart>
        </el-card>
        <el-card shadow="hover">
          <echart
            style="height:260px"
            :chartData="echartData.video"
            :isAxisChart="false"
          ></echart>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import Echart from "../../components/Echart";
export default {
  components: {
    Echart
  },
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "课程名",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9"
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980"
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef"
        }
      ],
      echartData: {
        order: {
          xData: [],
          series: []
        },
        user: {
          xData: [],
          series: []
        },
        video: {
          series: []
        }
      },
      userImage: require("../../assets/images/user.png")
    };
  },
  methods: {
    getTableData() {
      this.$http.get("/home/getData").then(res => {
        const resData = res.data;
        this.tableData = resData.data.tableData;
        console.log(resData.data);
        /* order折线图 */
        const orderData = resData.data.orderData;
        /* 取日期=====x轴数据 */
        this.echartData.order.xData = orderData.date;
        /* 1.取所有键名 */
        const orderKeys = Object.keys(orderData.data[0]);
        /* 2.根据键名提取数据 */
        orderKeys.forEach(key => {
          this.echartData.order.series.push({
            name: key === "wechat" ? "小程序" : key,
            data: orderData.data.map(item => item[key]),
            type: "line"
          });
        });
        /* user折现图 */
        const userData = resData.data.userData;
        this.echartData.user.xData = userData.map(item => item.date);
        this.echartData.user.series.push({
          name: "新增用户",
          data: userData.map(item => item.new),
          type: "bar"
        });
        this.echartData.user.series.push({
          name: "活跃用户",
          data: userData.map(item => item.active),
          type: "bar",
          barGap: 0
        });
        /* video饼图 */
        const videoData = resData.data.videoData;
        this.echartData.video.series.push({
          data: videoData,
          type: "pie"
        });
      });
    }
  },
  created() {
    this.getTableData();
  }
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/home";
</style>
