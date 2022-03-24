
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">历史数据查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>年级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.gradeId"
                  :key="item.gradeId"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>性别：</span>
              <Select v-model="genderId" style="width:120px;">
                <Option
                  v-for="item in schoolGenderList"
                  :value="item.id"
                  :key="item.id"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="getSchoolTestYearList">查询</Button>
          </div>
        </div>
      </Card>
      <div style="margin-bottom:20px;margin-top:20px;">
        <Card :dis-hover="true">
          <div style="font-size:18px;" class="tit">数据概览</div>
          <Row>
            <div style>
              <Table
                border
                :loading="loading"
                :columns="overViewYearColumns"
                :data="overViewYearData"
              ></Table>
            </div>
            <br />
          </Row>
        </Card>
      </div>
      <div>
        <Card :dis-hover="true">
          <div style="font-size:18px;height" class="tit">数据明细</div>
          <Row>
            <div style>
              <Table
                border
                :loading="loading"
                :columns="grade==999?overViewColumns:overViewColumns1"
                :data="overViewData"
              ></Table>
            </div>
            <br />
          </Row>
        </Card>
      </div>
      <div :style="{marginTop:'20px'}">
        <Card :dis-hover="true">
          <div style="width:100%;display:flex">
            <div id="chart1" :style="{width:'65%',height: '500px'}"></div>
            <div id="verticleSlot" style="width:2px;height:550px;background:#eee"></div>
            <div id="chart2" :style="{width:'35%',height: '500px'}"></div>
          </div>
        </Card>
      </div>
      <div style="position:relative;margin-top:20px">
        <Card>
          <div style="font-size:18px" class="tit">各项目详情</div>
          <Tabs type="card" @on-click="selectTabs" v-model="tittleTabs">
            <TabPane
              v-model="schoolTestId"
              :name="testitem.schoolTestId+''"
              :label="testitem.schoolTestName"
              v-for="testitem in testList"
              :key="testitem.schoolTestId"
              :value="testitem.schoolTestId"
            ></TabPane>
          </Tabs>
          <div class="normal">
            <div id="chart3" :style="{width:'98%',height: '300px'}"></div>
            <div id="chart4" :style="{width:'98%',height: '300px'}"></div>
          </div>
          <div
            class="normalLine"
            style="display:flex;justify-content: space-between;padding:30px 0"
            v-if="schoolTestId != 1 &&schoolTestId != 12&&schoolTestId != 13"
          >
            <div id="chart5" :style="{width:'49.5%',height: '300px'}"></div>
            <div id="chart6" :style="{width:'49.5%',height: '300px'}"></div>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>
<style>
</style>
<script>
export default {
  name: "schoolList",
  data() {
    return {
      colorList: [
        "#4fa995",
        "#e99954",
        "#e58467",
        "#4abce4",
        "#f1d776",
        "#699bc9",
        "#bdd685",
        "#95c685",
      ],
      loading: false,
      schoolYear: "",
      schoolId: "",
      type: 2,
      schoolTestId: null,
      grade: 999,
      schoolGradeList: [{ gradeId: 999, label: "全校" }],
      genderId: 3,
      schoolGenderList: [
        { id: 3, label: "全部" },
        { id: 1, label: "男生" },
        { id: 2, label: "女生" },
      ],
      overViewYearColumns: [
        {
          title: "学年",
          key: "activityYear",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h("div", params.row.activityYear + "学年");
          },
        },
        {
          title: "总人数",
          key: "totalStudent",
          align: "center",
          minWidth:90
        },
        {
          title: "完成体测人数/测试总人数",
          key: "finishStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent +
                "/" +
                (params.row.totalStudent - params.row.exemptStudent)
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptStudent",
          align: "center",
          minWidth:90,
        },
        {
          title: "平均分",
          key: "totalScore",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text =
              params.row.finishStudent == 0
                ? params.row.finishStudent
                :(params.row.totalScore / params.row.finishStudent).toFixed(2);
            return h("div", text);
          },
        },
        {
          title: "优秀率（人数）",
          key: "excellentStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const row = params.row;
            const text = `${
              params.row.finishStudent == 0
                ? '0.00'
                : (
                    (params.row.excellentStudent / params.row.finishStudent) *
                      100
                  ).toFixed(2)
            }%` + ' （' + params.row.excellentStudent + '人）';
            return h("div", text);
          },
        },
        {
          title: "良好率（人数）",
          key: "goodStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.finishStudent == 0
                ? '0.00'
                : (
                    (params.row.goodStudent / params.row.finishStudent) * 100
                  ).toFixed(2)
            }%` + ' （' + params.row.goodStudent + '人）';
            return h("div", text);
          },
        },
        {
          title: "及格率（人数）",
          key: "passStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.finishStudent == 0
                ? '0.00'
                :(
                    (params.row.passStudent / params.row.finishStudent) * 100
                  ).toFixed(2)
            }%` + ' （' + params.row.passStudent + '人）';
            return h("div", text);
          },
        },
        {
          title: "优良率（人数）",
          key: "finishStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            let excellent=`${params.row.excellentStudent == 0? '0.00' : (params.row.excellentStudent/params.row.finishStudent*100).toFixed(2)}`;
            let good=`${params.row.goodStudent == 0? '0.00' : (params.row.goodStudent/params.row.finishStudent*100).toFixed(2)}`;
            let all=Number(excellent)+Number(good);
            all=all.toFixed(2)
            all=all>100?100:all;
            let count = params.row.excellentStudent + params.row.goodStudent
            const text = all+"%" + ' （' + count + '人）';
            return h("div", text);
          },
        },
        {
          title: "合格率（人数）",
          key: "finishStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            let notPass = `${
                    params.row.notPassStudent == 0
                            ? "0.00"
                            : (
                                    (params.row.notPassStudent / params.row.finishStudent) *
                                    100
                            ).toFixed(2)
            }`;
            let all = params.row.finishStudent == 0 ? "0.00" : (100 - Number(notPass)).toFixed(2);
            all=all>100?100:all;
            let count = params.row.excellentStudent + params.row.goodStudent + params.row.passStudent
            const text = all+"%" + ' （' + count + '人）';
            return h("div", text);
          },
        }
      ],
      overViewYearData: [],
      overViewColumns: [
        {
          title: "学年",
          key: "activityYear",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h("div", params.row.activityYear + "学年");
          },
        },
        {
          title: "年级",
          key: "gradeId",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h(
              "div",
              params.row.gradeId == 1
                ? "一年级"
                : params.row.gradeId == 2
                ? "二年级"
                : params.row.gradeId == 3
                ? "三年级"
                : params.row.gradeId == 4
                ? "四年级"
                : params.row.gradeId == 5
                ? "五年级"
                : params.row.gradeId == 6
                ? "六年级"
                : params.row.gradeId == 7
                ? "七年级"
                : params.row.gradeId == 8
                ? "八年级"
                : params.row.gradeId == 9
                ? "九年级"
                : params.row.gradeId == 10
                ? "高一"
                : params.row.gradeId == 11
                ? "高二"
                : params.row.gradeId == 12
                ? "高三"
                : "全校"
            );
          },
        },
        {
          title: "班级个数",
          key: "classNum",
          align: "center",
          minWidth:90,
        },
        {
          title: "总人数",
          key: "totalStudent",
          align: "center",
          minWidth:90,
        },
        {
          title: "完成体测人数/测试总人数",
          key: "finishStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent +
                "/" +
                (params.row.totalStudent - params.row.exemptStudent)
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptStudent",
          align: "center",
          minWidth:90,
        },
        {
          title: "平均分",
          key: "totalScore",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text =
              params.row.finishStudent == 0
                ? params.row.finishStudent
                : (params.row.totalScore / params.row.finishStudent).toFixed(2);
            return h("div", text);
          },
        },
        {
          title: "优秀率（人数）",
          key: "excellentStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.excellentStudent == 0
                ? '0.00'
                :(
                    (params.row.excellentStudent / params.row.finishStudent) *
                      100
                  ).toFixed(2)
            }%` + ' （' + params.row.excellentStudent + '人）';
            return h("div", text);
          },
        },
        {
          title: "良好率（人数）",
          key: "goodStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.goodStudent == 0
                ? '0.00'
                : (
                    (params.row.goodStudent / params.row.finishStudent) * 100
                  ).toFixed(2)
            }%` + ' （' + params.row.goodStudent + '人）';
            return h("div", text);
          },
        },
        {
          title: "及格率（人数）",
          key: "passStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.passStudent == 0
                ? '0.00'
                : (
                    (params.row.passStudent / params.row.finishStudent) * 100
                  ).toFixed(2)
            }%` + ' （' + params.row.passStudent + '人）';
            return h("div", text);
          },
        },
        {
          title: "优良率（人数）",
          key: "passStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            let excellent=`${params.row.excellentStudent == 0? '0.00' : (params.row.excellentStudent/params.row.finishStudent*100).toFixed(2)}`;
            let good=`${params.row.goodStudent == 0? '0.00' : (params.row.goodStudent/params.row.finishStudent*100).toFixed(2)}`;
            let all=Number(excellent)+Number(good)
            all=all.toFixed(2)
            all=all>100?100:all;
            let count = params.row.excellentStudent + params.row.goodStudent
            const text = all+"%" + ' （' + count + '人）'
            return h("div", text);
          },
        },
        {
          title: "合格率（人数）",
          key: "passStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            let notPass = `${
                    params.row.notPassStudent == 0
                            ? "0.00"
                            : (
                                    (params.row.notPassStudent / params.row.finishStudent) *
                                    100
                            ).toFixed(2)
            }`;
            let all = params.row.finishStudent == 0 ? "0.00" : (100 - Number(notPass)).toFixed(2);
            all=all>100?100:all;
            let count = params.row.excellentStudent + params.row.goodStudent + params.row.passStudent
            const text = all+"%" + ' （' + count + '人）'
            return h("div", text);
          },
        }
      ],
      overViewColumns1: [
        {
          title: "学年",
          key: "activityYear",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h("div", params.row.activityYear + "学年");
          },
        },
        {
          title: "年级",
          key: "gradeId",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h(
              "div",
              params.row.gradeId == 1
                ? "一年级"
                : params.row.gradeId == 2
                ? "二年级"
                : params.row.gradeId == 3
                ? "三年级"
                : params.row.gradeId == 4
                ? "四年级"
                : params.row.gradeId == 5
                ? "五年级"
                : params.row.gradeId == 6
                ? "六年级"
                : params.row.gradeId == 7
                ? "七年级"
                : params.row.gradeId == 8
                ? "八年级"
                : params.row.gradeId == 9
                ? "九年级"
                : params.row.gradeId == 10
                ? "高一"
                : params.row.gradeId == 11
                ? "高二"
                : params.row.gradeId == 12
                ? "高三"
                : "全校"
            );
          },
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth:90,
        },
        {
          title: "总人数",
          key: "totalStudent",
          align: "center",
          minWidth:90,
        },
        {
          title: "完成体测人数/测试总人数",
          key: "finishStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            return h(
              "div",
              params.row.finishStudent +
                "/" +
                (params.row.totalStudent - params.row.exemptStudent)
            );
          },
        },
        {
          title: sessionStorage.getItem('schoolDistrict') == 2000 ? '免考人数' : '免试人数',
          key: "exemptStudent",
          align: "center",
          minWidth:90,
        },
        {
          title: "平均分",
          key: "totalScore",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text =
              params.row.finishStudent == 0
                ? params.row.finishStudent
                : (params.row.totalScore / params.row.finishStudent).toFixed(2);
            return h("div", text);
          },
        },
        {
          title: "优秀率",
          key: "excellentStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.excellentStudent == 0
                ? '0.00'
                : (
                    (params.row.excellentStudent / params.row.finishStudent) *
                      100
                  ).toFixed(2)
            }%`;
            return h("div", text);
          },
        },
        {
          title: "良好率",
          key: "goodStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.goodStudent == 0
                ? '0.00'
                : (
                    (params.row.goodStudent / params.row.finishStudent) * 100
                  ).toFixed(2)
            }%`;
            return h("div", text);
          },
        },
        {
          title: "及格率",
          key: "passStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            const text = `${
              params.row.passStudent == 0
                ? '0.00'
                : (
                    (params.row.passStudent / params.row.finishStudent) * 100
                  ).toFixed(2)
            }%`;
            return h("div", text);
          },
        },
        {
          title: "合格率",
          key: "passStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            let excellent=`${params.row.excellentStudent == 0? '0.00' : (params.row.excellentStudent/params.row.finishStudent*100).toFixed(2)}`;
            let good=`${params.row.goodStudent == 0? '0.00' : (params.row.goodStudent/params.row.finishStudent*100).toFixed(2)}`;
            let pass=`${params.row.passStudent == 0? '0.00' : (params.row.passStudent/params.row.finishStudent*100).toFixed(2)}`;
            let all=Number(excellent)+Number(good)+Number(pass);
            all=all.toFixed(2)
            all=all>100?100:all;

            const text = all+"%"
            return h("div", text);
          },
        },
        {
          title: "优良率",
          key: "passStudent",
          align: "center",
          minWidth:90,
          render: (h, params) => {
            let excellent=`${params.row.excellentStudent == 0? '0.00' : (params.row.excellentStudent/params.row.finishStudent*100).toFixed(2)}`;
            let good=`${params.row.goodStudent == 0? '0.00' : (params.row.goodStudent/params.row.finishStudent*100).toFixed(2)}`;
            let all=Number(excellent)+Number(good)
            all=all.toFixed(2)
            all=all>100?100:all;
            const text = all+"%"
            return h("div", text);
          },
        },
      ],
      overViewData: [],
      primaryList: [
        { gradeId: 1, label: "一年级" },
        { gradeId: 2, label: "二年级" },
        { gradeId: 3, label: "三年级" },
        { gradeId: 4, label: "四年级" },
        { gradeId: 5, label: "五年级" },
        { gradeId: 6, label: "六年级" },
      ],
      middleList: [
        { gradeId: 7, label: "七年级" },
        { gradeId: 8, label: "八年级" },
        { gradeId: 9, label: "九年级" },
      ],
      highList: [
        { gradeId: 10, label: "高一" },
        { gradeId: 11, label: "高二" },
        { gradeId: 12, label: "高三" },
      ],
      tittleTabs: "",
      testList: [],
      chart1FunData: {},
      finishCount: [],
      goodCount: [],
      finishAndGoodData: [],
      chart3FunData: {},
      chart3Y: "平均成绩",
      chart4Y: "平均分",
    };
  },
  methods: {
    //获取体测学年成绩列表
    getSchoolTestYearList() {
      this.loading = true;
      this.$axios
        .get(
          `/v1/test/query/getSchoolTestYearList?gradeId=${this.grade}&gender=${this.genderId}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let finishCount = [],
              goodCount = [],
              finishAndGoodData = [];
            for (let val of res.data.response) {
              finishCount.push(
                val.finishStudent == null
                  ? 0
                  : Math.floor(
                      ((val.excellentStudent +
                        val.goodStudent +
                        val.passStudent) /
                        val.finishStudent) *
                        100
                    )
              );
              goodCount.push(
                val.finishStudent == null
                  ? 0
                  : Math.floor(
                      ((val.excellentStudent + val.goodStudent) /
                        val.finishStudent) *
                        100
                    )
              );
              finishAndGoodData.push(val.activityYear + "学年");
            }
            this.overViewYearData = res.data.response;
            this.overViewYearData.sort(function (a, b) {
              return b.activityYear - a.activityYear;
            });
            this.finishCount = finishCount;
            console.log(finishCount);
            console.log(goodCount);
            this.goodCount = goodCount;
            this.finishAndGoodData = finishAndGoodData;
            this.chart2Fun();
            //获取详情列表
            this.getSchoolTestYearDetailList();
          }
        });
    },
    //获取详情列表
    getSchoolTestYearDetailList() {
      let _this = this;
      this.$axios
        .get(
          `/v1/test/query/getSchoolTestYearDetailList?gradeId=${this.grade}&gender=${this.genderId}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.overViewData = res.data.response;
            this.overViewData.sort(function (a, b) {
              if (_this.grade != 999) {
                if (a.studentClass === b.studentClass) {
                  //如果id相同，按照age的降序
                  return b.activityYear - a.activityYear;
                } else {
                  return a.studentClass - b.studentClass;
                }
              } else {
                if (a.gradeId === b.gradeId) {
                  //如果年级相同，按照的降序
                  return b.activityYear - a.activityYear;
                } else {
                  return a.gradeId - b.gradeId;
                }
              }
            });
            this.getSchoolNeedTestItem();
          }
        });
    },
    //获取该学校需要测试的体测项目
    getSchoolNeedTestItem() {
      this.$axios
        .get(
          `/v1/test/query/getSchoolNeedTestItem?gradeId=${this.grade}&gender=${this.genderId}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.testList = res.data.response;
            if (this.testList != null && this.testList.length > 0) {
              if (this.genderId == "9") {
                for (let i = 0; i < this.testList.length; i++) {
                  if (this.testList[i].testGender == 1) {
                    this.testList[i].schoolTestName =
                      this.testList[i].schoolTestName + "(男)";
                  } else if (this.testList[i].testGender == 2) {
                    this.testList[i].schoolTestName =
                      this.testList[i].schoolTestName + "(女)";
                  }
                }
              }
            }
            if (this.testList != null && this.testList.length > 0) {
              this.tittleTabs = this.testList[0].schoolTestId + "";
              this.selectTabs(this.testList[0].schoolTestId);
            }
            this.getTestItemYearList();
          }
        });
    },
    //获取项目年度列表
    getTestItemYearList() {
      this.$axios
        .get(
          `/v1/test/query/getTestItemYearList?gradeId=${this.grade}&gender=${this.genderId}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let result = this.factoryArray(res.data.response);
            let chart1FunData = {},
              lengData = [],
              xAxisData = [],
              series = [],
              bdudn = [];
            let max = 0;
            let resultData = [];
            for (let k = 0; k < result.length; k++) {
              resultData.push(result[k].data.length);
            }
            max = resultData.reduce(function (a, b) {
              return b > a ? b : a;
            });
            for (let i = 0; i < result.length; i++) {
              if (result[i].data.length >= max) {
                bdudn = result[i].data;
                break;
              }
            }
            if (bdudn.length <= 1) {
              bdudn = [
                { activityYear: bdudn[0].activityYear },
                { activityYear: bdudn[0].activityYear },
              ];
            }
            for (let [index, vals] of bdudn.entries()) {
              series.push({
                name: vals.activityYear + "学年",
                type: "bar",
                barWidth: 30,
                color: this.colorList[index],
                data: [],
                barGap: "0%",
                label: {
                  show: true,
                  position: "top",
                },
              });
            }
            for (let [key, val] of result.entries()) {
              lengData.push(val.activityYear);
              xAxisData.push(val.schoolTestName);
              for (let [keys, vals1] of val.data.entries()) {
                if (val.data.length > 1) {
                  if (vals1.activityYear == series[keys].name.substring(0, 4)) {
                    series[keys].data.push(
                      vals1.studentNum == null || vals1.studentNum <= 0
                        ? 0
                        : Math.floor(
                            vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.studentNum
                          )
                    );
                  } else {
                    series[keys + 1].data.push(
                      vals1.studentNum == null || vals1.studentNum <= 0
                        ? 0
                        : Math.floor(
                            vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.studentNum
                          )
                    );
                  }
                } else {
                  if (vals1.activityYear == series[0].name.substring(0, 4)) {
                    series[keys].data.push(
                      vals1.studentNum == null || vals1.studentNum <= 0
                        ? 0
                        : Math.floor(
                            vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.studentNum
                          )
                    );
                    series[keys + 1].data.push(0);
                  } else {
                    series[keys].data.push(
                      vals1.studentNum == null || vals1.studentNum <= 0
                        ? 0
                        : Math.floor(
                            vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.studentNum
                          )
                    );
                    series[keys + 1].data.push(0);
                  }
                }
              }
            }
            chart1FunData = {
              legend: lengData,
              xAxisData: xAxisData,
              series: series,
            };
            this.chart1FunData = chart1FunData;
            this.chart1Fun();
            this.loading = false;
          }
        });
    },
    factoryArray(arr) {
      let map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.schoolTestId]) {
          dest.push({
            activityId: ai.activityId,
            activityYear: ai.activityYear,
            schoolTestId: ai.schoolTestId,
            schoolTestName: ai.schoolTestName,
            studentNum: ai.studentNum,
            totalScore: ai.totalScore,
            data: [ai],
          });
          map[ai.schoolTestId] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.schoolTestId == ai.schoolTestId) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    factoryArray1(arr) {
      let map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.gradeId]) {
          dest.push({
            activityId: ai.activityId,
            activityYear: ai.activityYear,
            excellentStudent: ai.excellentStudent,
            exemptStudent: ai.exemptStudent,
            finishStudent: ai.finishStudent,
            goodStudent: ai.goodStudent,
            gradeId: ai.gradeId,
            hyperopia: ai.hyperopia,
            myopia: ai.myopia,
            normal: ai.normal,
            notPassStudent: ai.notPassStudent,
            passStudent: ai.passStudent,
            studentClass: ai.studentClass,
            totalBmiValue: ai.totalBmiValue,
            totalHeight: ai.totalHeight,
            totalScore: ai.totalScore,
            totalStudent: ai.totalStudent,
            totalValue: ai.totalValue,
            totalWeight: ai.totalWeight,
            data: [ai],
          });
          map[ai.gradeId] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.gradeId == ai.gradeId) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    factoryArray5(arr) {
      let map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.studentClass]) {
          dest.push({
            activityId: ai.activityId,
            activityYear: ai.activityYear,
            excellentStudent: ai.excellentStudent,
            exemptStudent: ai.exemptStudent,
            finishStudent: ai.finishStudent,
            goodStudent: ai.goodStudent,
            gradeId: ai.gradeId,
            hyperopia: ai.hyperopia,
            myopia: ai.myopia,
            normal: ai.normal,
            notPassStudent: ai.notPassStudent,
            passStudent: ai.passStudent,
            studentClass: ai.studentClass,
            totalBmiValue: ai.totalBmiValue,
            totalHeight: ai.totalHeight,
            totalScore: ai.totalScore,
            totalStudent: ai.totalStudent,
            totalValue: ai.totalValue,
            totalWeight: ai.totalWeight,
            data: [ai],
          });
          map[ai.studentClass] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.studentClass == ai.studentClass) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    factoryArray2(arr) {
      let map = {},
        dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        if (!map[ai.activityId]) {
          dest.push({
            activityId: ai.activityId,
            activityYear: ai.activityYear,
            excellentStudent: ai.excellentStudent,
            exemptStudent: ai.exemptStudent,
            finishStudent: ai.finishStudent,
            goodStudent: ai.goodStudent,
            gradeId: ai.gradeId,
            hyperopia: ai.hyperopia,
            myopia: ai.myopia,
            normal: ai.normal,
            notPassStudent: ai.notPassStudent,
            passStudent: ai.passStudent,
            studentClass: ai.studentClass,
            totalBmiValue: ai.totalBmiValue,
            totalHeight: ai.totalHeight,
            totalScore: ai.totalScore,
            totalStudent: ai.totalStudent,
            totalValue: ai.totalValue,
            totalWeight: ai.totalWeight,
            data: [ai],
          });
          map[ai.activityId] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            if (dj.activityId == ai.activityId) {
              dj.data.push(ai);
              break;
            }
          }
        }
      }
      return dest;
    },
    //获取项目详情列表
    getTestItemDetailList(name) {
      this.$axios
        .get(
          `/v1/test/query/getTestItemDetailList?gradeId=${this.grade}&gender=${this.genderId}&schoolTestId=${this.schoolTestId}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            if (res.data.response.length <= 0) {
              chart3FunData = {
                legend: [],
                xAxisData: [],
                series: [],
                series4: [],
                passRate: [], //合格率
                excellentAndGoodRate: [], //优良率
                passRateAndGoodData: [], //学年
                excellentGoodRate: [], //优秀率
                goodRate: [], //良好率
                passLineRate: [], //及格率
                excellentCount: [], //优秀数量
                goodCount: [], //良好数量
                passCount: [], //及格数量
                notPassCount: [], //不及格数量
                hyperopia: [],
                myopia: [],
                normalEye: [],
              };
              this.chart3FunData = chart3FunData;
              if (this.schoolTestId == 1 || this.schoolTestId == 12) {
                //身高体重算BMI
                this.chart3Y = "平均BMI值";
                this.chart4Y = this.schoolTestId == 1 ? "平均身高" : "平均体重";
                this.chart3Fun();
                this.chart4Fun();
              } else {
                //其他项目
                this.chart3Y = "平均成绩";
                this.chart4Y = "平均分";
                this.chart3Fun();
                this.chart4Fun();
                this.chart5Fun();
                this.chart6Fun();
                this.chart7Fun();
                this.chart8Fun();
              }
              return;
            }
            //是否保留小数
            let isFloatBNum = false;
            if (name == 1 || name == 12 || name == 13 || name == 3) {
              isFloatBNum = false;
            } else {
              isFloatBNum = true;
            }
            let isNormalNum = false;
            if (name == 1 || name == 12 || name == 13) {
              isNormalNum = false;
            } else {
              isNormalNum = true;
            }
            let result = [];
            if (this.grade == 999) {
              result = this.factoryArray1(res.data.response);
            } else {
              result = this.factoryArray5(res.data.response);
            }
            let chart3FunData = {},
              lengData3 = [],
              xAxisData3 = [],
              series3 = [],
              series4 = [],
              bdudn = null;
            let max = 0;
            let resultData = [];
            for (let k = 0; k < result.length; k++) {
              resultData.push(result[k].data.length);
            }
            max = resultData.reduce(function (a, b) {
              return b > a ? b : a;
            });
            for (let i = 0; i < result.length; i++) {
              if (result[i].data.length >= max) {
                bdudn = result[i].data;
                break;
              }
            }
            if (bdudn.length < 2) {
              bdudn = [
                { activityYear: bdudn[0].activityYear },
                { activityYear: bdudn[0].activityYear },
              ];
            }
            for (let [index, vals] of bdudn.entries()) {
              series3.push({
                name: vals.activityYear + "学年",
                type: "bar",
                color: this.colorList[index],
                barWidth: 30,
                data: [],
                barGap: "0%",
                label: {
                  show: true,
                  position: "top",
                  formatter: (params) => {
                    return this.bid == "m‘s“"
                      ? Math.floor(params.data / 60) +
                          "'" +
                          (params.data % 60) +
                          "''"
                      : isNormalNum
                      ? params.data + this.bid
                      : params.data;
                  },
                },
              });
              series4.push({
                name: vals.activityYear + "学年",
                type: "bar",
                color: this.colorList[index],
                barWidth: 30,
                data: [],
                barGap: "0%",
                label: {
                  show: true,
                  position: "top",
                  formatter: (params) => {
                    return this.schoolTestId == "1" || this.schoolTestId == "12"
                      ? this.bid == "m‘s“"
                        ? Math.floor(params.data / 60) +
                          "'" +
                          (params.data % 60) +
                          "''"
                        : params.data + this.bid
                      : params.data;
                  },
                },
              });
            }
            for (let [key, val] of result.entries()) {
              lengData3.push(val.activityYear);
              if (this.grade == 999) {
                xAxisData3.push(
                  val.gradeId == 1
                    ? "一年级"
                    : val.gradeId == 2
                    ? "二年级"
                    : val.gradeId == 3
                    ? "三年级"
                    : val.gradeId == 4
                    ? "四年级"
                    : val.gradeId == 5
                    ? "五年级"
                    : val.gradeId == 6
                    ? "六年级"
                    : val.gradeId == 7
                    ? "七年级"
                    : val.gradeId == 8
                    ? "八年级"
                    : val.gradeId == 9
                    ? "九年级"
                    : val.gradeId == 10
                    ? "高一"
                    : val.gradeId == 11
                    ? "高二"
                    : val.gradeId == 12
                    ? "高三"
                    : "全校"
                );
              } else {
                xAxisData3.push(val.studentClass + "班");
              }

              for (let [keys, vals1] of val.data.entries()) {
                if (val.data.length > 1) {
                  if (this.schoolTestId == 1) {
                    if (vals1.activityYear == series3[0].name.substring(0, 4)) {
                      series3[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                    } else {
                      series3[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                    }
                    if (vals1.activityYear == series4[0].name.substring(0, 4)) {
                      series4[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalHeight == null ||
                                vals1.totalHeight <= 0
                                ? 0
                                : vals1.totalHeight / vals1.finishStudent
                            )
                          : (vals1.totalHeight == null || vals1.totalHeight <= 0
                              ? 0
                              : vals1.totalHeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                    } else {
                      series4[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalHeight == null ||
                                vals1.totalHeight <= 0
                                ? 0
                                : vals1.totalHeight / vals1.finishStudent
                            )
                          : (vals1.totalHeight == null || vals1.totalHeight <= 0
                              ? 0
                              : vals1.totalHeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                    }
                  } else if (this.schoolTestId == 12) {
                    if (vals1.activityYear == series3[0].name.substring(0, 4)) {
                      series3[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                    } else {
                      series3[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                    }
                    if (vals1.activityYear == series4[0].name.substring(0, 4)) {
                      series4[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalWeight == null ||
                                vals1.totalWeight <= 0
                                ? 0
                                : vals1.totalWeight / vals1.finishStudent
                            )
                          : (vals1.totalWeight == null || vals1.totalWeight <= 0
                              ? 0
                              : vals1.totalWeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                    } else {
                      series4[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalWeight == null ||
                                vals1.totalWeight <= 0
                                ? 0
                                : vals1.totalWeight / vals1.finishStudent
                            )
                          : (vals1.totalWeight == null || vals1.totalWeight <= 0
                              ? 0
                              : vals1.totalWeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                    }
                  } else {
                    if (vals1.activityYear == series3[0].name.substring(0, 4)) {
                      series3[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalValue == null || vals1.totalValue <= 0
                                ? 0
                                : vals1.totalValue / vals1.finishStudent
                            )
                          : (vals1.totalValue == null || vals1.totalValue <= 0
                              ? 0
                              : vals1.totalValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                    } else {
                      series3[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalValue == null || vals1.totalValue <= 0
                                ? 0
                                : vals1.totalValue / vals1.finishStudent
                            )
                          : (vals1.totalValue == null || vals1.totalValue <= 0
                              ? 0
                              : vals1.totalValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                    }
                    if (vals1.activityYear == series4[0].name.substring(0, 4)) {
                      series4[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalScore == null || vals1.totalScore <= 0
                                ? 0
                                : vals1.totalScore / vals1.finishStudent
                            )
                          : (vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.finishStudent
                            ).toFixed(1)
                      );
                    } else {
                      series4[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalScore == null || vals1.totalScore <= 0
                                ? 0
                                : vals1.totalScore / vals1.finishStudent
                            )
                          : (vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.finishStudent
                            ).toFixed(1)
                      );
                    }
                  }
                } else {
                  if (this.schoolTestId == 1) {
                    if (vals1.activityYear == series3[0].name.substring(0, 4)) {
                      series3[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series3[1].data.push(0);
                    } else {
                      series3[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series3[0].data.push(0);
                    }
                    if (vals1.activityYear == series4[0].name.substring(0, 4)) {
                      series4[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalHeight == null ||
                                vals1.totalHeight <= 0
                                ? 0
                                : vals1.totalHeight / vals1.finishStudent
                            )
                          : (vals1.totalHeight == null || vals1.totalHeight <= 0
                              ? 0
                              : vals1.totalHeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series4[1].data.push(0);
                    } else {
                      series4[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalHeight == null ||
                                vals1.totalHeight <= 0
                                ? 0
                                : vals1.totalHeight / vals1.finishStudent
                            )
                          : (vals1.totalHeight == null || vals1.totalHeight <= 0
                              ? 0
                              : vals1.totalHeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series4[0].data.push(0);
                    }
                  } else if (this.schoolTestId == 12) {
                    if (vals1.activityYear == series3[0].name.substring(0, 4)) {
                      series3[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series3[1].data.push(0);
                    } else {
                      series3[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalBmiValue == null ||
                                vals1.totalBmiValue <= 0
                                ? 0
                                : vals1.totalBmiValue / vals1.finishStudent
                            )
                          : (vals1.totalBmiValue == null ||
                            vals1.totalBmiValue <= 0
                              ? 0
                              : vals1.totalBmiValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series3[0].data.push(0);
                    }
                    if (vals1.activityYear == series4[0].name.substring(0, 4)) {
                      series4[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalWeight == null ||
                                vals1.totalWeight <= 0
                                ? 0
                                : vals1.totalWeight / vals1.finishStudent
                            )
                          : (vals1.totalWeight == null || vals1.totalWeight <= 0
                              ? 0
                              : vals1.totalWeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series4[1].data.push(0);
                    } else {
                      series4[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalWeight == null ||
                                vals1.totalWeight <= 0
                                ? 0
                                : vals1.totalWeight / vals1.finishStudent
                            )
                          : (vals1.totalWeight == null || vals1.totalWeight <= 0
                              ? 0
                              : vals1.totalWeight / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series4[0].data.push(0);
                    }
                  } else {
                    if (vals1.activityYear == series3[0].name.substring(0, 4)) {
                      series3[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalValue == null || vals1.totalValue <= 0
                                ? 0
                                : vals1.totalValue / vals1.finishStudent
                            )
                          : (vals1.totalValue == null || vals1.totalValue <= 0
                              ? 0
                              : vals1.totalValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series3[1].data.push(0);
                    } else {
                      series3[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalValue == null || vals1.totalValue <= 0
                                ? 0
                                : vals1.totalValue / vals1.finishStudent
                            )
                          : (vals1.totalValue == null || vals1.totalValue <= 0
                              ? 0
                              : vals1.totalValue / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series3[0].data.push(0);
                    }
                    if (vals1.activityYear == series4[0].name.substring(0, 4)) {
                      series4[0].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalScore == null || vals1.totalScore <= 0
                                ? 0
                                : vals1.totalScore / vals1.finishStudent
                            )
                          : (vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series4[1].data.push(0);
                    } else {
                      series4[1].data.push(
                        vals1.finishStudent == null || vals1.finishStudent <= 0
                          ? 0
                          : isFloatBNum
                          ? Math.floor(
                              vals1.totalScore == null || vals1.totalScore <= 0
                                ? 0
                                : vals1.totalScore / vals1.finishStudent
                            )
                          : (vals1.totalScore == null || vals1.totalScore <= 0
                              ? 0
                              : vals1.totalScore / vals1.finishStudent
                            ).toFixed(1)
                      );
                      series4[0].data.push(0);
                    }
                  }
                }
              }
            }

            let resultsPate = this.factoryArray2(res.data.response);
            let passRate = [],
              excellentAndGoodRate = [],
              passRateAndGoodData = [],
              excellentGoodRate = [],
              goodRate = [],
              passLineRate = [],
              excellentCount = [0, 0],
              goodCount = [0, 0],
              passCount = [0, 0],
              notPassCount = [0, 0],
              hyperopia = [0, 0],
              myopia = [0, 0],
              normalEye = [0, 0];
            resultsPate = resultsPate.sort(this.compare("activityYear"));
            for (let [keyP, valPate] of resultsPate.entries()) {
              excellentAndGoodRate[keyP] =
                excellentAndGoodRate[keyP] == null
                  ? 0
                  : excellentAndGoodRate[keyP];
              passRateAndGoodData.push(valPate.activityYear + "学年");
              if (keyP == 1) {
                for (let valP of valPate.data) {
                  valP.excellentStudent =
                    valP.excellentStudent == null ? 0 : valP.excellentStudent;
                  valP.goodStudent =
                    valP.goodStudent == null ? 0 : valP.goodStudent;
                  valP.passStudent =
                    valP.passStudent == null ? 0 : valP.passStudent;
                  valP.notPassStudent =
                    valP.notPassStudent == null ? 0 : valP.notPassStudent;
                  valP.hyperopia = valP.hyperopia == null ? 0 : valP.hyperopia;
                  valP.myopia = valP.myopia == null ? 0 : valP.myopia;
                  valP.normal = valP.normal == null ? 0 : valP.normal;

                  passRate[keyP] = passRate[keyP] == null ? 0 : passRate[keyP];
                  let excellentRate=valP.finishStudent == null? 0: (((valP.excellentStudent == null? 0: valP.excellentStudent) /valP.finishStudent) *100).toFixed(2);
                  let goodRat=valP.finishStudent == null? 0: (((valP.goodStudent == null? 0: valP.goodStudent) /valP.finishStudent) *100).toFixed(2);
                  let passLineRat=valP.finishStudent == null? 0: (((valP.passStudent == null? 0: valP.passStudent) /valP.finishStudent) *100).toFixed(2);
                  excellentGoodRate[keyP] =excellentRate;
                  goodRate[keyP] =goodRat;
                  passLineRate[keyP] =passLineRat;
                  let passRat=Number(excellentRate)+Number(goodRat)+Number(passLineRat);
                  passRat=passRat.toFixed(2)
                  passRate[keyP] +=(passRat>100?100:passRat);
                  let excellentAndGood=Number(excellentRate)+Number(goodRat);
                  excellentAndGood=excellentAndGood.toFixed(2)
                  excellentAndGoodRate[keyP] +=(excellentAndGood>100?100:excellentAndGood);

                  excellentCount[keyP] +=
                    valP.excellentStudent == null ? 0 : valP.excellentStudent;
                  goodCount[keyP] +=
                    valP.goodStudent == null ? 0 : valP.goodStudent;
                  passCount[keyP] +=
                    valP.passStudent == null ? 0 : valP.passStudent;
                  notPassCount[keyP] +=
                    valP.notPassStudent == null ? 0 : valP.notPassStudent;

                  hyperopia[keyP] +=
                    valP.hyperopia == null ? 0 : valP.hyperopia;
                  myopia[keyP] += valP.myopia == null ? 0 : valP.myopia;
                  normalEye[keyP] += valP.normal == null ? 0 : valP.normal;
                }
              } else {
                for (let valP of valPate.data) {
                  valP.excellentStudent =
                    valP.excellentStudent == null ? 0 : valP.excellentStudent;
                  valP.goodStudent =
                    valP.goodStudent == null ? 0 : valP.goodStudent;
                  valP.passStudent =
                    valP.passStudent == null ? 0 : valP.passStudent;
                  valP.notPassStudent =
                    valP.notPassStudent == null ? 0 : valP.notPassStudent;
                  valP.hyperopia = valP.hyperopia == null ? 0 : valP.hyperopia;
                  valP.myopia = valP.myopia == null ? 0 : valP.myopia;
                  valP.normal = valP.normal == null ? 0 : valP.normal;
                  passRate[keyP] = passRate[keyP] == null ? 0 : passRate[keyP];
                  let excellentRate=valP.finishStudent == null? 0: (((valP.excellentStudent == null? 0: valP.excellentStudent) /valP.finishStudent) *100).toFixed(2);
                  let goodRat=valP.finishStudent == null? 0: (((valP.goodStudent == null? 0: valP.goodStudent) /valP.finishStudent) *100).toFixed(2);
                  let passLineRat=valP.finishStudent == null? 0: (((valP.passStudent == null? 0: valP.passStudent) /valP.finishStudent) *100).toFixed(2);
                  excellentGoodRate[keyP] =excellentRate;
                  goodRate[keyP] =goodRat;
                  passLineRate[keyP] =passLineRat;
                  let passRat=Number(excellentRate)+Number(goodRat)+Number(passLineRat);
                  passRat=passRat.toFixed(2)
                  passRate[keyP] +=(passRat>100?100:passRat);
                  let excellentAndGood=Number(excellentRate)+Number(goodRat);
                  excellentAndGood=excellentAndGood.toFixed(2)
                  excellentAndGoodRate[keyP] +=(excellentAndGood>100?100:excellentAndGood);

                  excellentCount[keyP] +=
                    valP.excellentStudent == null ? 0 : valP.excellentStudent;
                  goodCount[keyP] +=
                    valP.goodStudent == null ? 0 : valP.goodStudent;
                  passCount[keyP] +=
                    valP.passStudent == null ? 0 : valP.passStudent;
                  notPassCount[keyP] +=
                    valP.notPassStudent == null ? 0 : valP.notPassStudent;

                  hyperopia[keyP] +=
                    valP.hyperopia == null ? 0 : valP.hyperopia;
                  myopia[keyP] += valP.myopia == null ? 0 : valP.myopia;
                  normalEye[keyP] += valP.normal == null ? 0 : valP.normal;
                }
              }
            }
            for(let i=0;i<passRate.length;i++){
              passRate[i]=(Number(excellentGoodRate[i])+Number(goodRate[i])+Number(passLineRate[i])).toFixed(2);
              excellentAndGoodRate[i]=(Number(excellentGoodRate[i])+Number(goodRate[i])).toFixed(2);
            }
            chart3FunData = {
              legend: [...new Set(lengData3)],
              xAxisData: xAxisData3,
              series: series3,
              series4: series4,
              passRate: passRate, //合格率
              excellentAndGoodRate: excellentAndGoodRate, //优良率
              passRateAndGoodData: passRateAndGoodData, //学年
              excellentGoodRate: excellentGoodRate, //优秀率
              goodRate: goodRate, //良好率
              passLineRate: passLineRate, //及格率
              excellentCount: excellentCount, //优秀数量
              goodCount: goodCount, //良好数量
              passCount: passCount, //及格数量
              notPassCount: notPassCount, //不及格数量
              hyperopia: hyperopia,
              myopia: myopia,
              normalEye: normalEye,
            };
            this.chart3FunData = chart3FunData;
            if (this.schoolTestId == 1 || this.schoolTestId == 12) {
              //身高体重算BMI
              this.chart3Y = "平均BMI值";
              this.chart4Y = this.schoolTestId == 1 ? "平均身高" : "平均体重";
              this.chart3Fun();
              this.chart4Fun();
            } else {
              //其他项目
              this.chart3Y = "平均成绩";
              this.chart4Y = "平均分";
              this.chart3Fun();
              this.chart4Fun();
              this.chart5Fun();
              this.chart6Fun();
            }
          }
        });
    },
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    selectTabs(name) {
      this.schoolTestId = name;
      this.nowCheckNum = name;
      this.bid =
        name == 1
          ? "cm"
          : name == 2
          ? "ml"
          : name == 3
          ? "s"
          : name == 4
          ? "cm"
          : name == 5
          ? "次"
          : name == 6
          ? "次"
          : name == 7
          ? "m‘s“"
          : name == 8
          ? "cm"
          : name == 9
          ? "次"
          : name == 10
          ? "m‘s“"
          : name == 11
          ? "m‘s“"
          : name == 12
          ? "kg"
          : "";
      if (name == 1) {
        this.normalTest = false;
        this.eyesTest = false;
        this.weightTest = false;
        this.highTest = true;
        this.getTestItemDetailList(name);
      } else if (name == 12) {
        this.normalTest = false;
        this.eyesTest = false;
        this.weightTest = true;
        this.highTest = false;
        this.getTestItemDetailList(name);
      } else {
        this.normalTest = true;
        this.eyesTest = false;
        this.weightTest = false;
        this.highTest = false;
        this.getTestItemDetailList(name);
      }
    },
    unique(arr) {
      const res = new Map();
      return arr.filter((a) => !res.has(a) && res.set(a, 1));
    },
    chart1Fun() {
      let chart1 = this.$echarts.init(document.getElementById("chart1"));
      chart1.setOption(
        {
          title: {
            text: "各项目平均分",
            subtext: "",
            x: "left",
            y: "top",
            textAlign: "left",
            textStyle:{

              color:'#333333',
              fontWeight:'normal'
            }
          },
          grid: {
            x: 40,
            y: 60,
            x2: 40,
            y2: 40

          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: this.chart1FunData.legendData,
            right: 0,
            orient: "vertical",
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              axisTick: {
                show: false,
              },
              data: this.chart1FunData.xAxisData,
            },
          ],
          yAxis: [
            {
              name: "平均分",
              nameGap: 15,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: this.chart1FunData.series
        },
        true
      );
    },
    chart2Fun() {
      let chart2 = this.$echarts.init(document.getElementById("chart2"));
      chart2.setOption(
        {
          title: {
            text: "合格率、优良率走势",
            subtext: "",
            x: "left",
            y: "top",
            left: '10',
            textAlign: "left",
            textStyle:{
              color:'#333333',
              fontWeight:'normal'
            }
          },
          tooltip: {
            trigger: "axis",
          },
          grid: {
            x: 40,
            y: 60,
            x2: 40,
            y2: 40
          },
          legend: {
            data: ["合格率", "优良率"],
            right: 0,
            orient: "vertical",
          },
          xAxis: {
            type: "category",
            name: "",
            axisTick: { show: false },
            splitLine: { show: false },
            boundaryGap: true,
            data: this.finishAndGoodData,
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            type: "value",
            name: "百分比",
            max: 100,
            interval: 10,
            axisTick: { show: true },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
            axisLabel: { show: true },
          },
          series: [
            {
              data: this.finishCount,
              name: "合格率",
              type: "line",
              label: {
                show: true,
                position: "top",
              },
            },
            {
              data: this.goodCount,
              name: "优良率",
              type: "line",
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
    chart3Fun() {
      let chart3 = this.$echarts.init(document.getElementById("chart3"));
      chart3.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
            y: "top",
            textAlign: "center",
            textStyle:{
              color:'#333333',
              fontWeight:'normal'
            }
          },
          grid: {
            x: 60,
            y: 40,
            x2: 10,
            y2: 40,
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: this.chart3FunData.legendData,
            right: 0,
            orient: "vertical",
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: this.chart3FunData.xAxisData,
              axisTick: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              name: this.chart3Y,
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: this.chart3FunData.series,
        },
        true
      );
    },
    chart4Fun() {
      let chart4 = this.$echarts.init(document.getElementById("chart4"));
      chart4.setOption(
        {
          title: {
            text: "",
            subtext: "",
            x: "center",
            y: "top",
            textAlign: "center",
            textStyle:{
              color:'#333333',
              fontWeight:'normal'
            }
          },
          grid: {
            x: 60,
            y: 60,
            x2: 10,
            y2: 40,
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: this.chart3FunData.legendData,
            right: 0,
            orient: "vertical",
          },
          calculable: true,
          xAxis: [
            {
              type: "category",
              data: this.chart3FunData.xAxisData,
              axisTick: {
                show: false,
              },
            },
          ],
          yAxis: [
            {
              name: this.chart4Y,
              nameGap: 20,
              type: "value",
              splitLine: {
                show: true,
                lineStyle: {
                  type: "dashed",
                },
              },
            },
          ],
          series: this.chart3FunData.series4,
        },
        true
      );
    },
    chart5Fun() {
      let chart5 = this.$echarts.init(document.getElementById("chart5"));
      console.log(this.chart3FunData)
      chart5.setOption(
        {
          title: {
            text: "合格率、优良率走势",
            subtext: "",
            x: "left",
            y: "top",
            textAlign: "left",
            left: "5%",
            textStyle:{
              color:'#333333',
              fontWeight:'normal'
            }
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["合格率", "优良率"],
            right: "5%",
            orient: "vertical",
          },
          grid: {
            left: "6%",
            right: "12%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            show: true,
            type: "category",
            name: "",
            axisLine: { show: true },
            axisTick: { show: true },
            splitLine: { show: false },
            boundaryGap: true,
            data: this.chart3FunData.passRateAndGoodData,
            axisTick: {
              show: false,
            },
          },
          yAxis: {
            show: true,
            type: "value",
            name: "百分比",
            interval: 10,
            axisLine: { show: true },
            axisTick: { show: true },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
              },
            },
            axisLabel: { show: true },
          },
          series: [
            {
              data: this.chart3FunData.passRate,
              name: "合格率",
              type: "line",
              label: {
                show: true,
                position: "top",
              },
            },
            {
              data: this.chart3FunData.excellentAndGoodRate,
              name: "优良率",
              type: "line",
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
    chart6Fun() {
      let chart6 = this.$echarts.init(document.getElementById("chart6"));
      chart6.setOption(
        {
          title: {
            text: "优秀率、良好率、及格率走势",
            subtext: "",
            x: "left",
            y: "top",
            textAlign: "left",
            left: "5%",
            textStyle:{
              color:'#333333',
              fontWeight:'normal'
            }
          },
          tooltip: {
            trigger: "axis",
          },
          legend: {
            data: ["优秀率", "良好率", "及格率"],
            right: "3%",
            orient: "vertical",
          },
          grid: {
            left: "6%",
            right: "12%",
            bottom: "3%",
            containLabel: true,
          },
          xAxis: {
            show: true,
            type: "category",
            name: "",
            axisLine: { show: true },
            axisTick: { show: true },
            splitLine: { show: false },
            boundaryGap: true,
            data: this.chart3FunData.passRateAndGoodData,
            axisTick: {
              show: true,
            },
          },
          yAxis: {
            show: true,
            type: "value",
            name: "百分比",
            interval: 10,
            axisLine: { show: true },
            axisTick: { show: true },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLabel: { show: true },
          },
          series: [
            {
              data: this.chart3FunData.excellentGoodRate,
              name: "优秀率",
              type: "line",
              label: {
                show: true,
                position: "top",
              },
            },
            {
              data: this.chart3FunData.goodRate,
              name: "良好率",
              type: "line",
              label: {
                show: true,
                position: "top",
              },
            },
            {
              data: this.chart3FunData.passLineRate,
              name: "及格率",
              type: "line",
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
    chart7Fun() {
      let chart7 = this.$echarts.init(document.getElementById("chart7"));
      chart7.setOption(
        {
          title: {
            text: `${
              this.chart3FunData.passRateAndGoodData[0] == undefined
                ? "--"
                : this.chart3FunData.passRateAndGoodData[0]
            }等级情况分布`,
            subtext: "",
            x: "center",
            textStyle:{
              color:'#333333',
              fontWeight:'normal'
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "5%",
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "等级情况",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: this.chart3FunData.excellentCount[0], name: "优秀数" },
                { value: this.chart3FunData.goodCount[0], name: "良好数" },
                { value: this.chart3FunData.passCount[0], name: "及格数" },
                { value: this.chart3FunData.notPassCount[0], name: "不及格数" },
              ],
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
                      "#e99954",
                      "#e58467",
                      "#4abce4",
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
    chart8Fun() {
      let chart8 = this.$echarts.init(document.getElementById("chart8"));
      chart8.setOption(
        {
          title: {
            text: `${
              this.chart3FunData.passRateAndGoodData[1] == undefined
                ? "--"
                : this.chart3FunData.passRateAndGoodData[1]
            }等级情况分布`,
            subtext: "",
            x: "center",
            textStyle:{
              color:'#333333',
              fontWeight:'normal'
            }
          },
          tooltip: {
            trigger: "item",
            formatter: "{a} <br/>{b} : {c} ({d}%)",
          },
          legend: {
            orient: "vertical",
            left: "5%",
            data: ["优秀数", "良好数", "及格数", "不及格数"],
          },
          series: [
            {
              name: "等级情况",
              type: "pie",
              radius: "55%",
              center: ["50%", "60%"],
              data: [
                { value: this.chart3FunData.excellentCount[1], name: "优秀数" },
                { value: this.chart3FunData.goodCount[1], name: "良好数" },
                { value: this.chart3FunData.passCount[1], name: "及格数" },
                { value: this.chart3FunData.notPassCount[1], name: "不及格数" },
              ],
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
                      "#e99954",
                      "#e58467",
                      "#4abce4",
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
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    vm.schoolYear = sessionStorage.getItem("historyData_SchoolYear");
    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType) {
      if ("0" == schoolType) {
        vm.schoolGradeList = [...vm.schoolGradeList, ...vm.primaryList, ...vm.middleList, ...vm.highList]
      }
      if ("2" == schoolType) {
        vm.schoolGradeList = [...vm.schoolGradeList, ...vm.primaryList]
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = [...vm.schoolGradeList, ...vm.middleList]
      }
      if ("4" == schoolType) {
          vm.schoolGradeList = [...vm.schoolGradeList, ...vm.highList]
      }
    }
    vm.grade = vm.schoolGradeList[0].gradeId;
    vm.genderId = "3";
    if (schoolId) {
      //获取体测学年成绩列表
      vm.getSchoolTestYearList();
    }
  },
};
</script>
<style scoped>
  .tit{
    margin-bottom: 15px;
  }
</style>
