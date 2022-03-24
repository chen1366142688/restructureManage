<template>
  <div style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">按年级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span>年级：</span>
              <Select v-model="grade" disabled style="width: 120px">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="exportSchoolTestData"
              >导出EXCEL</Button
            >
          </div>
        </div>
      </Card>
      <br />
      <div>
        <Card>
          <div style="font-size: 18px; height: 40px">数据概览</div>
          <Row>
            <div>
              <Table
                border
                :loading="loading"
                :columns="resultColumns"
                :data="resultData"
              ></Table>
            </div>
          </Row>
        </Card>
      </div>
      <div style="margin-top: 20px">
        <Card>
          <div style="font-size: 18px; height: 40px">数据明细</div>
          <Row>
            <div style="">
              <Table
                border
                :loading="loading"
                :columns="overViewColumns"
                :data="overViewData"
              ></Table>
            </div>
            <br />
            <!-- <div style="float: right;">
              <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
            </div> -->
          </Row>
        </Card>
      </div>
      <div :style="{ marginTop: '20px' }">
        <Card>
          <div style="font-size: 20px; height: 40px">数据分析</div>
          <div :style="{ backgroundColor: '#FFFFFF' }">
            <Row :style="{ textAlign: 'center' }">
              <div
                id="myChart1"
                :style="{
                  width: '40%',
                  height: '400px',
                  marginTop: '50px',
                  display: 'inline-block',
                }"
              ></div>
              <div
                id="myChart2"
                :style="{
                  width: '40%',
                  height: '400px',
                  marginTop: '50px',
                  display: 'inline-block',
                }"
              ></div>
            </Row>
          </div>
        </Card>
      </div>
      <div :style="{ marginTop: '10px' }">
        <Card>
          <div style="font-size: 20px; height: 40px">平均分</div>
          <div id="myChart3" :style="{ width: '100%', height: '400px' }"></div>
        </Card>
      </div>
      <div :style="{ marginTop: '10px' }">
        <Card>
          <div style="font-size: 20px; height: 40px">合格率</div>
          <div id="myChart4" :style="{ width: '100%', height: '400px' }"></div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      schoolDistrict: "",
      schoolYear: "",
      schoolId: "",
      loading: false,
      grade: 99,
      myChart1: null,
      option1: {},
      myChart2: null,
      option2: {},
      myChart3: null,
      option3: {},
      myChart4: null,
      option4: {},
      schoolGradeList: [{ grade: 99, label: "全部" }],
      resultColumns: [
        {
          title: "总人数",
          key: "studentTotalCount",
          align: "center",
        },
        {
          title: "已完成体测人数/体测总人数",
          key: "overTestCount",
          align: "center",
          width: 200,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title:
            sessionStorage.getItem("schoolDistrict") == 2000
              ? "免考人数"
              : "免试人数",
          key: "exemptCount",
          align: "center",
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          render: (h, params) => {
            return h("div", params.row.averageScore / 100);
          },
        },
        {
          title: "优秀率（人数）",
          key: "goodCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text =
              `${
                params.row.goodCount == 0
                  ? "0.00"
                  : (
                      (params.row.goodCount / params.row.overTestCount) *
                      100
                    ).toFixed(2)
              }%` +
              " （" +
              params.row.goodCount +
              "人）";
            return h("div", text);
          },
        },
        {
          title: "良好率（人数）",
          key: "wellCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text =
              `${
                params.row.wellCount == 0
                  ? "0.00"
                  : (
                      (params.row.wellCount / params.row.overTestCount) *
                      100
                    ).toFixed(2)
              }%` +
              " （" +
              params.row.wellCount +
              "人）";
            return h("div", text);
          },
        },
        {
          title: "及格率（人数）",
          key: "passCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text =
              `${
                params.row.passCount == 0
                  ? "0.00"
                  : (
                      (params.row.passCount / params.row.overTestCount) *
                      100
                    ).toFixed(2)
              }%` +
              " （" +
              params.row.passCount +
              "人）";
            return h("div", text);
          },
        },
        {
          title: "优良率（人数）",
          key: "excellent",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let excellent = `${
              params.row.goodCount == 0
                ? "0.00"
                : (
                    (params.row.goodCount / params.row.overTestCount) *
                    100
                  ).toFixed(2)
            }`;
            let good = `${
              params.row.wellCount == 0
                ? "0.00"
                : (
                    (params.row.wellCount / params.row.overTestCount) *
                    100
                  ).toFixed(2)
            }`;
            let all = Number(excellent) + Number(good);
            all = all.toFixed(2);
            all = all > 100 ? 100 : all;
            let count = params.row.goodCount + params.row.wellCount;
            const text = all + "%" + " （" + count + "人）";
            return h("div", text);
          },
        },
        {
          title: "合格率（人数）",
          key: "qualifiedCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let notPass = `${
                    params.row.notPassCount == 0
                            ? "0.00"
                            : (
                                    (params.row.notPassCount / params.row.overTestCount) *
                                    100
                            ).toFixed(2)
            }`;
            let all = params.row.overTestCount == 0 ? "0.00" : (100 - Number(notPass)).toFixed(2);
            all = all > 100 ? 100 : all;
            let count =
              params.row.goodCount +
              params.row.wellCount +
              params.row.passCount;
            const text = all + "%" + " （" + count + "人）";
            return h("div", text);
          },
        },
      ],
      resultData: [],
      overViewColumns: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          minWidth: 90,
          render: (h, params) => {
            return h(
              "div",
              params.row.grade == 1
                ? "一年级"
                : params.row.grade == 2
                ? "二年级"
                : params.row.grade == 3
                ? "三年级"
                : params.row.grade == 4
                ? "四年级"
                : params.row.grade == 5
                ? "五年级"
                : params.row.grade == 6
                ? "六年级"
                : params.row.grade == 7
                ? "七年级"
                : params.row.grade == 8
                ? "八年级"
                : params.row.grade == 9
                ? "九年级"
                : params.row.grade == 10
                ? "高一"
                : params.row.grade == 11
                ? "高二"
                : params.row.grade == 12
                ? "高三"
                : "全校"
            );
          },
        },
        {
          title: "班级个数",
          key: "classCount",
          align: "center",
          minWidth: 90,
        },
        {
          title: "总人数",
          key: "studentTotalCount",
          align: "center",
          minWidth: 90,
        },
        {
          title: "已完成体测人数/体测总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 90,
          render: (h, params) => {
            return h(
              "div",
              params.row.overTestCount + "/" + params.row.needJoinTestCount
            );
          },
        },
        {
          title:
            sessionStorage.getItem("schoolDistrict") == 2000
              ? "免考人数"
              : "免试人数",
          key: "exemptCount",
          align: "center",
          minWidth: 90,
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          minWidth: 90,
          render: (h, params) => {
            return h("div", params.row.averageScore / 100);
          },
        },
        {
          title: "优秀率（人数）",
          key: "goodCount",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            const row = params.row;
            const text =
              `${
                params.row.goodCount == 0
                  ? "0.00"
                  : (
                      (params.row.goodCount / params.row.overTestCount) *
                      100
                    ).toFixed(2)
              }%` +
              " （" +
              params.row.goodCount +
              "人）";
            return h("div", text);
          },
        },
        {
          title: "良好率（人数）",
          key: "wellCount",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            const row = params.row;
            const text =
              `${
                params.row.wellCount == 0
                  ? "0.00"
                  : (
                      (params.row.wellCount / params.row.overTestCount) *
                      100
                    ).toFixed(2)
              }%` +
              " （" +
              params.row.wellCount +
              "人）";
            return h("div", text);
          },
        },
        {
          title: "及格率（人数）",
          key: "passCount",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            const row = params.row;
            const text =
              `${
                params.row.passCount == 0
                  ? "0.00"
                  : (
                      (params.row.passCount / params.row.overTestCount) *
                      100
                    ).toFixed(2)
              }%` +
              " （" +
              params.row.passCount +
              "人）";
            return h("div", text);
          },
        },
        {
          title: "优良率（人数）",
          key: "qualifiedCount",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            const row = params.row;
            let excellent = `${
              params.row.goodCount == 0
                ? "0.00"
                : (
                    (params.row.goodCount / params.row.overTestCount) *
                    100
                  ).toFixed(2)
            }`;
            let good = `${
              params.row.wellCount == 0
                ? "0.00"
                : (
                    (params.row.wellCount / params.row.overTestCount) *
                    100
                  ).toFixed(2)
            }`;
            let all = Number(excellent) + Number(good);
            all = all.toFixed(2);
            all = all > 100 ? 100 : all;
            let count = params.row.goodCount + params.row.wellCount;
            const text = all + "%" + " （" + count + "人）";
            return h("div", text);
          },
        },
        {
          title: "合格率（人数）",
          key: "qualifiedCount",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            const row = params.row;
            let notPass = `${
                    params.row.notPassCount == 0
                            ? "0.00"
                            : (
                                    (params.row.notPassCount / params.row.overTestCount) *
                                    100
                            ).toFixed(2)
            }`;
            let all = params.row.overTestCount == 0 ? "0.00" : (100 - Number(notPass)).toFixed(2);
            all = all > 100 ? 100 : all;
            let count =
              params.row.goodCount +
              params.row.wellCount +
              params.row.passCount;
            const text = all + "%" + " （" + count + "人）";
            return h("div", text);
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      overViewData: [],
      scorexAxisData: [],
      scoreseriesData: [],
      passSeriesData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  watch: {},
  created() {
    this.schoolDistrict = sessionStorage.getItem("schoolDistrict");
  },

  methods: {
    pageToList() {
      this.$router.go(-1);
    },
    toDetail(item) {
      var vm = this;
      console.log(item);
      sessionStorage.setItem("gradeTestData_grade", item.grade);
      this.$router.push({ name: "queryClassList" });
    },
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      // this.search();
    },
    search() {
      var vm = this;
      let schoolId = vm.schoolId;
    },

    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value;
        // this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageNum = 1;
        this.pageSize = value;
        // this.search()
      }
    },
    exportSchoolTestData() {
      var vm = this;
      if (typeof vm.schoolYear == "undefined") {
        vm.schoolYear = "";
      }
      let url =
        this.$axios.defaults.baseURL +
        "/v1/test/export/exportThisYearGradeData?grade=&schoolYear=" +
        vm.schoolYear +
        "&schoolId=1&type=1" +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    drawGenSLine() {
      var vm = this;
      vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      vm.option1 = {
        title: {
          text: "体测情况图形分布",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} :  {d}%",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: [
            this.schoolDistrict == 2000 ? "免考率" : "免试率",
            "完成率",
            "未参加率",
            "已参加未完成率",
          ],
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: vm.resultData[0].exemptCount,
                name: this.schoolDistrict == 2000 ? "免考率" : "免试率",
              },
              { value: vm.resultData[0].overTestCount, name: "完成率" },
              {
                value:
                  vm.resultData[0].needJoinTestCount -
                  vm.resultData[0].joinTestCount,
                name: "未参加率",
              },
              {
                value:
                  vm.resultData[0].joinTestCount -
                  vm.resultData[0].overTestCount,
                name: "已参加未完成率",
              },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              normal: {
                color: function (params) {
                  var colorList = ["#4fa995", "#f1d776", "#e99954", "#e58467"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              formatter: "{b} : ({d}%)",
            },
          },
        ],
      };
      vm.myChart1.setOption(vm.option1);
    },
    drawGenSLine2() {
      var vm = this;
      vm.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      vm.option2 = {
        title: {
          text: "等级情况图形分布",
          subtext: "",
          x: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {d}%",
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["优秀率", "良好率", "及格率", "不及格率"],
        },
        series: [
          {
            name: "占比",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              {
                value: vm.resultData[0].goodCount,
                name: "优秀率",
                itemStyle: {},
              },
              { value: vm.resultData[0].wellCount, name: "良好率" },
              { value: vm.resultData[0].passCount, name: "及格率" },
              { value: vm.resultData[0].notPassCount, name: "不及格率" },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
              normal: {
                color: function (params) {
                  var colorList = ["#4abce4", "#699bc9", "#bdd685", "#95c685"];
                  return colorList[params.dataIndex];
                },
              },
            },
            label: {
              show: true,
              formatter: "{b} : ({d}%)",
            },
          },
        ],
      };
      vm.myChart2.setOption(vm.option2);
    },
    drawBar1() {
      var vm = this;
      vm.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      vm.option3 = {
        title: {
          // text: '平均分',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "年级",
          data: vm.scorexAxisData,
        },
        yAxis: {
          type: "value",
          name: "分",
        },
        series: [
          {
            data: vm.scoreseriesData,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      vm.myChart3.setOption(vm.option3);
    },
    drawBar2() {
      var vm = this;
      vm.myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      vm.option4 = {
        title: {
          // text: '合格率',
          subtext: "",
        },
        color: "#00C693",
        xAxis: {
          type: "category",
          name: "年级",
          data: vm.scorexAxisData,
        },
        yAxis: {
          type: "value",
          name: "%",
        },
        series: [
          {
            data: vm.passSeriesData,
            barCategoryGap: "50%", //柱图间距
            barWidth: 30, //柱图宽度
            type: "bar",
            label: {
              show: true,
              position: "top",
            },
          },
        ],
      };
      vm.myChart4.setOption(vm.option4);
    },
    search() {
      this.$axios
        .get(
          `/v1/test/query/queryThisYearActivityGradeList?grade=${
            this.grade == 99 ? "" : this.grade
          }&schoolId=${this.schoolId}&type=2`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response;
            this.drawGenSLine();
            this.drawGenSLine2();
            this.$axios
              .get(
                `/v1/test/query/queryThisYearActivityGradeList?grade=${
                  this.grade == 99 ? "" : this.grade
                }&schoolId=${this.schoolId}&type=1`
              )
              .then((res) => {
                if (res.data.code == 10000) {
                  this.overViewData = res.data.response;
                  for (let val of this.overViewData) {
                    this.scorexAxisData.push(
                      val.grade == 1
                        ? "一年级"
                        : val.grade == 2
                        ? "二年级"
                        : val.grade == 3
                        ? "三年级"
                        : val.grade == 4
                        ? "四年级"
                        : val.grade == 5
                        ? "五年级"
                        : val.grade == 6
                        ? "六年级"
                        : val.grade == 7
                        ? "七年级"
                        : val.grade == 8
                        ? "八年级"
                        : val.grade == 9
                        ? "九年级"
                        : val.grade == 10
                        ? "高一"
                        : val.grade == 11
                        ? "高二"
                        : val.grade == 12
                        ? "高三"
                        : "全校"
                    );
                    this.scoreseriesData.push(val.averageScore / 100);
                    let excellent = `${
                      val.goodCount == 0
                        ? "0.00"
                        : ((val.goodCount / val.overTestCount) * 100).toFixed(2)
                    }`;
                    let good = `${
                      val.wellCount == 0
                        ? "0.00"
                        : ((val.wellCount / val.overTestCount) * 100).toFixed(2)
                    }`;
                    let pass = `${
                      val.passCount == 0
                        ? "0.00"
                        : ((val.passCount / val.overTestCount) * 100).toFixed(2)
                    }`;
                    let all = Number(excellent) + Number(good) + Number(pass);
                    all = all.toFixed(2);
                    all = all > 100 ? 100 : all;

                    this.passSeriesData.push(all);
                    // this.passSeriesData.push(val.qualifiedCount == 0? val.qualifiedCount : Math.floor(val.qualifiedCount/val.overTestCount*100))
                  }
                  this.drawBar1();
                  this.drawBar2();
                }
              });
          }
        });
    },
  },
  watch: {},

  mounted() {
    let vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let SchoolYear = sessionStorage.getItem("historyData_SchoolYear");
    this.schoolYear = SchoolYear;
    this.search();
  },
};
</script>
