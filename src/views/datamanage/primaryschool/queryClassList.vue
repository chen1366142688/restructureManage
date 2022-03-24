<template>
  <div style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">按班级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span>年级：</span>
              <Select v-model="grade" style="width: 120px">
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
            <Button type="success" @click="querySearch">查询</Button>
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
          <div style="font-size: 18px; height: 40px">数据分析</div>
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
          <div style="font-size: 18px; height: 40px">平均分</div>
          <div id="myChart3" :style="{ width: '100%', height: '400px' }"></div>
        </Card>
      </div>
      <div :style="{ marginTop: '10px' }">
        <Card>
          <div style="font-size: 18px; height: 40px">合格率</div>
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
      myChart1: null,
      option1: {},
      myChart2: null,
      option2: {},
      myChart3: null,
      option3: {},
      myChart4: null,
      option4: {},
      primaryList: [
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      middleList: [
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      highList: [
        { grade: 10, label: "高一" },
        { grade: 11, label: "高二" },
        { grade: 12, label: "高三" },
      ],
      classId: 99,
      classList: [{ classId: 99, label: "全部" }],
      grade: "",
      schoolGradeList: [{ grade: 99, label: "全部" }],
      resultColumns: [
        {
          title: "总人数",
          key: "studentTotalCount",
          align: "center",
          minWidth: 96,
        },
        {
          title: "已完成体测人数/体测总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 96,
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
          minWidth: 96,
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          minWidth: 96,
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
          key: "excellent",
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
      ],
      resultData: [],
      overViewColumns: [
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            return h("div", params.row.studentClass + "班");
          },
        },
        {
          title: "总人数",
          key: "studentTotalCount",
          align: "center",
          minWidth: 96,
        },
        {
          title: "已完成体测人数/体测总人数",
          key: "overTestCount",
          align: "center",
          minWidth: 96,
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
          minWidth: 96,
        },
        {
          title: "平均分",
          key: "averageScore",
          align: "center",
          minWidth: 96,
          render: (h, params) => {
            let averageScore = params.row.totalFinishStudent
              ? (
                  params.row.totalScore /
                  params.row.totalFinishStudent /
                  100
                ).toFixed(2)
              : 0;
            return h("div", averageScore);
            // return h('div', params.row.averageScore/100)
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
          key: "excellent",
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
  created() {
    this.schoolDistrict = sessionStorage.getItem("schoolDistrict");
  },
  methods: {
    pageToList() {
      this.$router.go(-1);
    },
    toDetail(item) {
      var vm = this;
      // sessionStorage.setItem(
      //   "studentManage-schoolTestData-classTestResult-activityId",
      //   item.activityId
      // );
      // sessionStorage.setItem(
      //   "studentManage-schoolTestData-classTestResult-classId",
      //   item.classId
      // );
      // sessionStorage.setItem(
      //   "studentManage-schoolTestData-classTestResult-gradeName",
      //   item.studentClass + "班"
      // );
      // sessionStorage.setItem(
      //   "studentManage-schoolTestData-classTestResult-startSchool",
      //   item.startSchool
      // );
      // sessionStorage.setItem(
      //   "studentManage-schoolTestData-classTestResult-schoolYear",
      //   item.schoolYear
      // );
    
      let params = {
        grade: this.grade,
        classId: item.studentClass
      }
      sessionStorage.setItem("query-classlist-grade",JSON.stringify(params))
      this.$router.push({ name: "queryStudentList" });
    },
    querySearch() {
      let vm = this;
      this.pageNum = 1;
      this.pageNo = 1;
      this.scorexAxisData = [];
      this.scoreseriesData = [];
      this.passSeriesData = [];
      this.resultData = [];
      this.search();
    },
    restore() {
      var vm = this;
      (vm.activityId = vm.activityId), (vm.grade = "");
      vm.pageNo = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = "";
      vm.studentName = "";
      vm.college = "";
      vm.major = "";
      vm.testTypeId = "";
      vm.submitStatus = "";
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
      if (typeof vm.grade == "undefined") {
        vm.grade = "";
      }
      if (typeof vm.classId == "undefined") {
        vm.classId = "";
      }
      let url =
        this.$axios.defaults.baseURL +
        "/v1/test/export/exportThisYearClassData?grade=" +
        (vm.grade == 99 ? "" : vm.grade) +
        "&schoolId=1&classId=" +
        (vm.classId == 99 ? "" : vm.classId) +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    drawGenSLine(data) {
      var vm = this;
      var myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      myChart1.setOption(
        {
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
              sessionStorage.getItem("schoolDistrict") == 2000
                ? "免考率"
                : "免试率",
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
              data: data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
                normal: {
                  color: function (params) {
                    var colorList = [
                      "#4fa995",
                      "#f1d776",
                      "#e99954",
                      "#e58467",
                    ];
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
        },
        true
      );
    },
    drawGenSLine2(datas) {
      var vm = this;
      var myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart2.setOption(
        {
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
              data: datas,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: "rgba(0, 0, 0, 0.5)",
                },
                normal: {
                  color: function (params) {
                    var colorList = [
                      "#4abce4",
                      "#699bc9",
                      "#bdd685",
                      "#95c685",
                    ];
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
        },
        true
      );
    },
    drawBar1() {
      var vm = this;
      var myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      myChart3.setOption(
        {
          title: {
            // text: '平均分',
            subtext: "",
          },
          color: "#00C693",
          xAxis: {
            type: "category",
            name: "班级",
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
        },
        true
      );
    },
    drawBar2() {
      var vm = this;
      var myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      myChart4.setOption(
        {
          title: {
            // text: '合格率',
            subtext: "",
          },
          color: "#00C693",
          xAxis: {
            type: "category",
            name: "班级",
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
        },
        true
      );
    },
    search() {
      let vm = this;

      this.$axios
        .get(
          `/v1/test/query/queryThisYearActivityGradeList?grade=${
            vm.grade == 99 ? "" : vm.grade
          }&schoolId=${vm.schoolId}&type=2`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response;
            let data = [],
              datas = [];
            if (res.data.response.length <= 0) {
              data = [
                {
                  value: 0,
                  name: this.schoolDistrict == 2000 ? "免考率" : "免试率",
                },
                { value: 0, name: "完成率" },
                { value: 0, name: "未参加率" },
                { value: 0, name: "已参加未完成率" },
              ];
              datas = [
                { value: 0, name: "优秀率", itemStyle: {} },
                { value: 0, name: "良好率" },
                { value: 0, name: "及格率" },
                { value: 0, name: "不及格率" },
              ];
            } else {
              data = [
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
              ];
              datas = [
                {
                  value: vm.resultData[0].goodCount,
                  name: "优秀率",
                  itemStyle: {},
                },
                { value: vm.resultData[0].wellCount, name: "良好率" },
                { value: vm.resultData[0].passCount, name: "及格率" },
                { value: vm.resultData[0].notPassCount, name: "不及格率" },
              ];
            }
            this.drawGenSLine(data);
            this.drawGenSLine2(datas);

            let schoolType = sessionStorage.getItem("schoolType");
            if (vm.grade == "" || vm.grade == 99 || vm.grade == undefined) {
              if ("2" == schoolType) {
                vm.grade = 1;
              }
              if ("3" == schoolType) {
                vm.grade = 7;
              }
              if ("4" == schoolType) {
                vm.grade = 10;
              }
            }

            this.$axios
              .get(
                `/v1/test/query/queryThisYearActivityClassList?grade=${
                  vm.grade == 99 ? "" : vm.grade
                }&schoolId=${vm.schoolId}&classId=${
                  vm.classId == 99 ? "" : vm.classId
                }`
              )
              .then((res) => {
                if (res.data.code == 10000) {
                  this.overViewData = res.data.response;
                  for (let val of this.overViewData) {
                    this.scorexAxisData.push(val.studentClass + "班");
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
    vm.schoolYear = SchoolYear;

    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType) {
      if ("0" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList);
      }
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.primaryList;
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.middleList;
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.highList;
      }
    }

    if (sessionStorage.getItem("gradeTestData_grade")) {
      vm.grade = Number(sessionStorage.getItem("gradeTestData_grade"));
    } else {
      vm.grade =
        vm.schoolGradeList[0].grade == 99 ? "" : vm.schoolGradeList[0].grade;
    }
    if (vm.grade == "" || vm.grade == 99 || vm.grade == undefined) {
      if ("2" == schoolType) {
        vm.grade = 1;
      }
      if ("3" == schoolType) {
        vm.grade = 7;
      }
      if ("4" == schoolType) {
        vm.grade = 10;
      }
    }

    console.log(vm.grade);
    vm.search();
  },
};
</script>
