<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生成绩详情</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input" style="align-items:center">
                <div style="margin:5px 20px;">
                    <span>姓名：{{studentName}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：{{registerCode}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：{{sportsClassName}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：{{gender=='1'?'男':'女'}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>学期：{{semesterName}}</span>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="goback">返回</Button>
            </div>
        </div>
      </Card>
      <br />
      <Card>
        <h3>体质测试</h3>
        <div>
          <div
            v-if="testExempt!='1'"
            style="margin-top: 10px"
          >得分：{{testScore}} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp等级：{{testScoreLevel}}</div>
          <span v-if="testExempt=='1'" style="margin-top: 10px">得分：{{testScore}}分（免试） 等级：良好</span>
          <div v-if="testExempt!='1'">
            <Row>
              <div style="margin-top: 10px">
                <Table
                  border
                  max-height="200"
                  :loading="loading"
                  :columns="testColumns"
                  :data="testResultData"
                ></Table>
              </div>
            </Row>
          </div>
        </div>
      </Card>
      <Card style="margin-top: 20px">
        <h3>运动技能</h3>
        <Tabs type="card" :value="selectTabName" @on-click="selectTabs" style="margin-top: 10px">
          <TabPane
            :name="classTest.classTestId+ ','+classTest.grade"
            :label="classTest.classTestName"
            v-for="classTest in classTestList"
            :key="classTest.classTestId"
          ></TabPane>
        </Tabs>
        <div>
          得分：{{actionScore/100}}分
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp等第：{{actionLevel=='5'?'A':actionLevel=='4'?'B':actionLevel=='3'?'C':actionLevel=='2'?'D':actionLevel=='1'?'E':actionLevel}}
          &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp学分：{{actionCredit}}
        </div>
        <h4 style="margin-top: 20px">
          考核成绩:
          <span
            v-if="examActionAllExempt == '1'"
          >&nbsp&nbsp&nbsp&nbsp得分：{{examActionScore/100}}分（免试）</span>
        </h4>
        <Table
          border
          max-height="200"
          :loading="loading"
          :columns="skillKHColumns"
          :data="skillKHResultData"
          v-if="examActionAllExempt == '0'"
        ></Table>
        <h4 style="margin-top: 20px">
          学习态度:
          <span v-if="learnExempt == '1'">&nbsp&nbsp&nbsp&nbsp得分：{{learnScore/100}}分（免试）</span>
        </h4>
        <Table
          border
          max-height="90"
          :loading="loading"
          :columns="skillXXColumns"
          :data="skillXXResultData"
          v-if="learnExempt == '0'"
        ></Table>
        <h4 style="margin-top: 20px">
          课外锻炼:
          <span v-if="homeworkExempt == '1'">&nbsp&nbsp&nbsp&nbsp得分：{{homeworkScore/100}}分（免试）</span>
        </h4>
        <Table
          border
          max-height="90"
          :loading="loading"
          :columns="skillKWColumns"
          :data="skillKWResultData"
          v-if="homeworkExempt == '0'"
        ></Table>
      </Card>
      <Card style="margin-top: 20px">
        <h3>健康知识</h3>
        <div
          style="margin-top: 10px"
          v-if="(healthExmeptStatus!='1')&&(selectYear!='3')"
        >考核时间：{{healthTime}} &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp考核得分：{{healthScore}}</div>
        <span
          v-if="(healthExmeptStatus=='1')&&(selectYear!='3')"
        >&nbsp&nbsp&nbsp&nbsp得分：{{healthScore}}分（免试）</span>
        <Table
          border
          max-height="90"
          :loading="loading"
          :columns="healthColumns"
          :data="healthResultData"
          v-if="selectYear=='3'"
        ></Table>
      </Card>
      <Card style="margin-top: 20px">
        <h3>体能</h3>
        <div>
          <div
            v-if="(staminaExmeptStatus!='1')&&(selectYear!='3')"
            style="margin-top: 10px"
          >得分：{{staminaScore}}</div>
          <span
            v-if="(staminaExmeptStatus=='1')&&(selectYear!='3')"
            style="margin-top: 10px"
          >&nbsp&nbsp&nbsp&nbsp得分：{{staminaScore}}分（免试）</span>
          <div style="margin-top: 10px" v-if="(staminaExmeptStatus!='1')||(selectYear=='3')">
            <Row>
              <div style>
                <Table
                  border
                  :loading="loading"
                  :columns="staminaColumns"
                  :data="staminaResultData"
                ></Table>
              </div>
            </Row>
          </div>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      staminaScore: "",
      staminaExmeptStatus: "",
      staminaExemptType: "",
      healthTime: "",
      healthScore: "",
      healthExmeptStatus: "",
      homeworkExempt: "",
      homeworkScore: "",
      examActionScore: "",
      learnExempt: "",
      learnScore: "",
      examActionAllExempt: "",
      actionScore: "",
      actionCredit: "",
      actionLevel: "",
      semesterName: "",
      testScoreLevel: "",
      testScore: "",
      testExempt: "",
      testExemptType: "",
      yearSemester: "",
      classTestList: [],
      sportsClassName: "",
      selectYear: "",
      signatureList: [],
      selectTabName: "",
      loading: false,
      studentId: "",
      studentName: "",
      registerCode: "",
      gender: "",
      grade: "",
      startSchool: "",
      studentClass: "",
      firstYearSemester: "",
      secondYearSemester: "",
      gradeName: "",
      testResultData: [],
      skillKHResultData: [],
      skillXXResultData: [],
      skillKWResultData: [],
      healthResultData: [],
      staminaResultData: [],
      healthColumns: [],
      healthColumnsGrade10: [
        {
          title: "高一上学期考核成绩",
          key: "firstUpScore",
          align: "center",
        },
        {
          title: "高一下学期考核成绩",
          key: "firstDownScore",
          align: "center",
        },
      ],
      healthColumnsGrade11: [
        {
          title: "高一上学期考核成绩",
          key: "firstUpScore",
          align: "center",
        },
        {
          title: "高一下学期考核成绩",
          key: "firstDownScore",
          align: "center",
        },
        {
          title: "高二上学期考核成绩",
          key: "secondUpScore",
          align: "center",
        },
        {
          title: "高二下学期考核成绩",
          key: "secondDownScore",
          align: "center",
        },
      ],
      healthColumnsGrade12: [
        {
          title: "高一上学期考核成绩",
          key: "firstUpScore",
          align: "center",
        },
        {
          title: "高一下学期考核成绩",
          key: "firstDownScore",
          align: "center",
        },
        {
          title: "高二上学期考核成绩",
          key: "secondUpScore",
          align: "center",
        },
        {
          title: "高二下学期考核成绩",
          key: "secondDownScore",
          align: "center",
        },
        {
          title: "高三上学期考核成绩",
          key: "thirdUpScore",
          align: "center",
        },
        {
          title: "健康知识最终得分",
          key: "creditScore",
          align: "center",
        },
        {
          title: "健康知识模块等第",
          key: "creditScoreLevel",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text =
              row.creditScoreLevel == "5"
                ? "A"
                : row.creditScoreLevel == "4"
                ? "B"
                : row.creditScoreLevel == "3"
                ? "C"
                : row.creditScoreLevel == "2"
                ? "D"
                : row.creditScoreLevel == "1"
                ? "E"
                : row.creditScoreLevel;
            return h("span", text);
          },
        },
        {
          title: "健康知识学分",
          key: "healthCredit",
          align: "center",
        },
      ],
      testColumns: [
        {
          title: "测试时间",
          key: "testTime",
          align: "center",
        },
        {
          title: "项目名称",
          key: "examItemName",
          align: "center",
        },
        {
          title: "成绩",
          key: "examResult",
          align: "center",
          width: 500,
          render: (h, params) => {
            const row = params.row;
            return h("div", {
              domProps: {
                innerHTML: row.examResult
              },
            });
          },
        },
        {
          title: "得分",
          key: "score",
          align: "center",
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.scoreLevel == "1"
                  ? "优秀"
                  : params.row.scoreLevel == "2"
                  ? "良好"
                  : params.row.scoreLevel == "3"
                  ? "及格"
                  : params.row.scoreLevel == "4"
                  ? "不及格"
                  : "-"
              ),
            ]);
          },
        },
      ],
      skillKHColumns: [
        {
          title: "考核项目",
          key: "examItemName",
          align: "center",
        },
        {
          title: "考核时间",
          key: "testTime",
          align: "center",
        },

        // {
        //   title: "考核内容",
        //   key: "examItemName",
        //   align: "center",
        // },
        {
          title: "成绩",
          key: "examResult",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.infoStatus == "1") {
              text = "免试";
            } else {
              text = row.examResult;
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "基础得分",
          key: "baseScore",
          align: "center",
        },
        {
          title: "技评得分",
          key: "teacherScore",
          align: "center",
        },
        {
          title: "得分",
          key: "score",
          align: "center",
        },
        // {
        //   title: "等级",
        //   key: "scoreLevel",
        //   align: "center",
        //   width: 150,
        //   render: (h, params) => {
        //     return h("font", params.row.scoreLevel == "1" ? "优秀" :params.row.scoreLevel == "2" ? "良好" :params.row.scoreLevel == "3" ? "及格" : "不及格");
        //   }
        // },
      ],
      skillXXColumns: [
        {
          title: "旷课",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.truancyCount == null) {
              row.truancyCount = 0;
            }
            return h("div", row.truancyCount);
          },
        },
        {
          title: "病假",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.sickCount == null) {
              row.sickCount = 0;
            }
            return h("div", row.sickCount);
          },
        },
        {
          title: "事假",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.thingCount == null) {
              row.thingCount = 0;
            }
            return h("div", row.thingCount);
          },
        },
        {
          title: "迟到",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.lateCount == null) {
              row.lateCount = 0;
            }
            return h("div", row.lateCount);
          },
        },
        {
          title: "早退",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.earlyCount == null) {
              row.earlyCount = 0;
            }
            return h("div", row.earlyCount);
          },
        },
        {
          title: "违反纪律",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.violateDisciplineCount == null) {
              row.violateDisciplineCount = 0;
            }
            return h("div", row.violateDisciplineCount);
          },
        },
        {
          title: "运动着装不符",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.notAccordClothing == null) {
              row.notAccordClothing = 0;
            }
            return h("div", row.notAccordClothing);
          },
        },
        {
          title: "大课间违法纪律",
          key: "bigViolateDisciplineCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.bigViolateDisciplineCount == null) {
              row.bigViolateDisciplineCount = 0;
            }
            return h("div", row.bigViolateDisciplineCount);
          },
        },
        {
          title: "大课间缺席",
          key: "bigAbsentCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.bigAbsentCount == null) {
              row.bigAbsentCount = 0;
            }
            return h("div", row.bigAbsentCount);
          },
        },
        {
          title: "扣分总次数",
          key: "sumCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.sumCount == null) {
              row.sumCount = 0;
            }
            return h("div", row.sumCount);
          },
        },
        {
          title: "扣除总分",
          key: "sumCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.learnDeductScore == null) {
              row.learnDeductScore = 0;
            } else {
              // row.learnDeductScore = row.learnDeductScore/100;
            }
            return h("div", row.learnDeductScore / 100);
          },
        },
        {
          title: "剩余得分",
          key: "sumCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if (row.learnScore == null) {
              row.learnScore = 0;
            }
            return h("div", row.learnScore / 100);
          },
        },
        // {
        //   title: '操作',
        //   key: 'action',
        //   align: 'center',
        //   width: 120,
        //   render: (h, params) => {
        //     return h('div', [
        //       h(
        //         'Button',
        //         {
        //           props: {
        //             type: 'success',
        //             disabled: (params.row.sumCount != null && params.row.sumCount > 0 )?false:true
        //           },
        //           style: {
        //             marginRight: '5px'
        //           },
        //           on: {
        //             click: () => {
        //               this.toLearnDetail(params.row.yearSemester)
        //             }
        //           }
        //         },
        //         "详情"
        //       )
        //     ])
        //   }
        // }
      ],
      skillKWColumns: [
        {
          title: "总锻炼次数",
          key: "homeworkAllCount",
          align: "center",
        },
        {
          title: "平均每周锻炼次数",
          key: "homeworkWeekCount",
          align: "center",
        },
        {
          title: "课外锻炼得分",
          key: "homeworkScore",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.homeworkScore / 100;
            return h("span", text);
          },
        },
      ],
      staminaColumns: [],
      staminaColumnsNormal: [
        {
          title: "项目名称",
          key: "examItemName",
          align: "center",
        },
        {
          title: "测试时间",
          key: "testTime",
          align: "center",
        },
        {
          title: "成绩",
          key: "examResult",
          align: "center",
          width: 500,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.infoStatus == "1") {
              text = "免试";
            } else {
              text = row.examResult;
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "得分",
          key: "score",
          align: "center",
        },
      ],
      staminaColumnsGrade10: [
        {
          title: "高一上学期考核成绩",
          key: "firstUpScore",
          align: "center",
        },
        {
          title: "高一下学期考核成绩",
          key: "firstDownScore",
          align: "center",
        },
      ],
      staminaColumnsGrade11: [
        {
          title: "高一上学期考核成绩",
          key: "firstUpScore",
          align: "center",
        },
        {
          title: "高一下学期考核成绩",
          key: "firstDownScore",
          align: "center",
        },
        {
          title: "高二上学期考核成绩",
          key: "secondUpScore",
          align: "center",
        },
        {
          title: "高二下学期考核成绩",
          key: "secondDownScore",
          align: "center",
        },
      ],
      staminaColumnsGrade12: [
        {
          title: "高一上学期考核成绩",
          key: "firstUpScore",
          align: "center",
        },
        {
          title: "高一下学期考核成绩",
          key: "firstDownScore",
          align: "center",
        },
        {
          title: "高二上学期考核成绩",
          key: "secondUpScore",
          align: "center",
        },
        {
          title: "高二下学期考核成绩",
          key: "secondDownScore",
          align: "center",
        },
        {
          title: "高三上学期考核成绩",
          key: "thirdUpScore",
          align: "center",
        },
        {
          title: "体能最终得分",
          key: "creditScore",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = (row.creditScore / 100).toFixed(2);
            return h("span", text);
          },
        },
        {
          title: "体能模块等第",
          key: "creditScoreLevel",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text =
              row.creditScoreLevel == "5"
                ? "A"
                : row.creditScoreLevel == "4"
                ? "B"
                : row.creditScoreLevel == "3"
                ? "C"
                : row.creditScoreLevel == "2"
                ? "D"
                : row.creditScoreLevel == "1"
                ? "E"
                : row.creditScoreLevel;
            return h("span", text);
          },
        },
        {
          title: "体能学分",
          key: "staminaCredit",
          align: "center",
        },
      ],
    };
  },
  methods: {
    selectTabs(name) {
      let vm = this;
      // sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-selectTabName', this.selectTabName);
      let yearSemester = null;
      var arr = name.split(",");
      for (let i = 0; i < vm.classTestList.length; i++) {
        if (vm.classTestList[i].classTestId == Number(arr[0])) {
          if (vm.classTestList[i].grade == Number(arr[1])) {
            yearSemester = vm.classTestList[i].yearSemester;
          }
        }
      }
      if (yearSemester != null) {
        vm.getStudentExamList(yearSemester, Number(arr[0]));
      }
    },
    goback() {
      //返回
      this.$router.go(-1);
    },
    queryStudentScoreByStudentId() {
      var vm = this;
      this.$axios
        .get(
          "/v1/semesterScore/queryStudentScoreByStudentId?studentId=" +
            vm.studentId +
            "&secondYearSemester=" +
            vm.secondYearSemester +
            "&firstYearSemester=" +
            vm.firstYearSemester
        )
        .then((res) => {
          if (res.data.code == 10000) {
            if (res.data.response != null && res.data.response.length > 0) {
              if (
                res.data.response.length == 1 &&
                res.data.response[0].yearSemester % 2 == 1
              ) {
                vm.secondYearSemesterScore = res.data.response[0];
                this.setShowLableName(res.data.response[0]);
                vm.haveSecond = "1";
              } else if (
                res.data.response.length == 1 &&
                res.data.response[0].yearSemester % 2 == 0
              ) {
                vm.firstYearSemesterScore = res.data.response[0];
                vm.haveFirst = "1";
                this.setShowLableName(res.data.response[0]);
              } else {
                vm.haveFirst = "1";
                vm.haveSecond = "1";
                if (res.data.response[0].yearSemester % 2 == 1) {
                  vm.secondYearSemesterScore = res.data.response[0];
                  vm.firstYearSemesterScore = res.data.response[1];
                  this.setShowLableName(res.data.response[0]);
                } else {
                  vm.secondYearSemesterScore = res.data.response[1];
                  vm.firstYearSemesterScore = res.data.response[0];
                  this.setShowLableName(res.data.response[1]);
                }
              }
            }
            if (
              vm.firstYearSemesterScore != null &&
              vm.firstYearSemesterScore.testScore > -1
            ) {
              this.getStudentTestList(vm.firstYearSemesterScore.yearSemester);
            }
            if (
              vm.secondYearSemesterScore != null &&
              vm.secondYearSemesterScore.testScore > -1
            ) {
              this.getStudentTestList(vm.secondYearSemesterScore.yearSemester);
            }
            if (vm.firstYearSemesterScore != null) {
              this.getStudentExamList(vm.firstYearSemester);
            }
            if (vm.secondYearSemesterScore != null) {
              this.getStudentExamList(vm.secondYearSemester);
            }
            if (
              vm.firstYearSemesterScore != null &&
              vm.firstYearSemesterScore.learnScore > -1
            ) {
              this.getStudentLearnList(vm.firstYearSemesterScore.yearSemester);
            }
            if (
              vm.secondYearSemesterScore != null &&
              vm.secondYearSemesterScore.learnScore > -1
            ) {
              this.getStudentLearnList(vm.secondYearSemesterScore.yearSemester);
            }

            if (
              vm.firstYearSemesterScore != null &&
              vm.firstYearSemesterScore.homeworkScore > -1
            ) {
              this.getStudentFamilyOver(vm.firstYearSemesterScore.yearSemester);
            }
            if (
              vm.secondYearSemesterScore != null &&
              vm.secondYearSemesterScore.homeworkScore > -1
            ) {
              this.getStudentFamilyOver(
                vm.secondYearSemesterScore.yearSemester
              );
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    toLearnDetail(yearSemester) {
      var vm = this;
      sessionStorage.setItem(
        "sportsClassManage-sportsClassStudentHis-studentId",
        vm.studentId
      );
      sessionStorage.setItem(
        "sportsClassManage-sportsClassStudentHis-yearSemester",
        yearSemester
      );
      this.$router.push({ name: "sportsClassStudentHis" });
    },
    s_to_hs(s) {
      var h;
      h = Math.floor(s / 60);
      s = s % 60;
      h += "";
      s += "";
      h = h.length == 1 ? "0" + h : h;
      s = s.length == 1 ? "0" + s : s;
      return h + "'" + s;
    },
    getStudentTestList(yearSemester) {
      var vm = this;
      let data = {
        pageNo: 1,
        pageSize: 99,
        studentId: vm.studentId,
        yearSemester: yearSemester,
      };
      this.$axios
        .post("/v1/cd/high/semester/getStudentTestList", data)
        .then((res) => {
          if (res.data.code == 10000) {
            let result = res.data.response.list;
            this.testExempt = res.data.response.exemptStatus;
            this.testExemptType = res.data.response.exemptType;
            this.testScore = res.data.response.testScore;
            if (this.testScore != null) {
              this.testScore = (this.testScore / 100).toFixed(2);
            }
            let level = "";
            if (this.testScore >= 90) {
              level = "优秀";
            } else if (this.testScore >= 80 && this.testScore < 90) {
              level = "良好";
            } else if (this.testScore >= 60 && this.testScore < 80) {
              level = "及格";
            } else {
              level = "不及格";
            }
            this.testScoreLevel = level;
            for (let i = 0; i < result.length; i++) {
              if (
                result[i].examItemName == "50米X8往返跑" ||
                result[i].examItemName == "1000米跑"
              ) {
                result[i].examResult =
                  vm.s_to_hs(result[i].examResult) + result[i].valueUnit;
              } else {
                result[i].examResult += result[i].valueUnit;
              }
              if (
                result[i].examItemName == "BMI" &&
                result[i].valueUnit == "kg"
              ) {
                result[i].examItemName = "体重";
                result[i].score = "-";
                result[i].scoreLevel = "-";
              }
              if (
                result[i].examItemName == "BMI" &&
                result[i].valueUnit == "cm"
              ) {
                result[i].examItemName = "身高";
                result[i].score = "-";
                result[i].scoreLevel = "-";
              }
            }
            vm.testResultData = result;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentExamList(yearSemester, classTestId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/cd/high/semester/getStudentExamList?studentId=" +
            vm.studentId +
            "&yearSemester=" +
            yearSemester +
            "&classTestId=" +
            classTestId
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let allData = res.data.response;
            vm.skillKHResultData = [];
            vm.skillXXResultData = [];
            vm.skillKWResultData = [];
            //考核项目
            let result = allData.studentExamResultVOS;
            for (let i = 0; i < result.length; i++) {
              if (
                result[i].examItemName == "50米X8往返跑" ||
                result[i].examItemName == "1000米跑"
              ) {
                result[i].examResult =
                  vm.s_to_hs(result[i].examResult) + result[i].examUnit;
              } else if (result[i].examUnit == "99") {
                result[i].examResult += "分";
              } else if (result[i].examUnit == "个数") {
                result[i].examResult += "个";
              } else {
                result[i].examResult += result[i].examUnit;
              }
              result[i].baseScore = result[i].baseScore;
              result[i].score = result[i].score;
              result[i].teacherScore = result[i].teacherScore;

              if (result[i].infoStatus == "1") {
                result[i].baseScore = "-";
                result[i].teacherScore = "-";
                if ((result[i].exemptType = "1")) {
                  result[i].score = 70;
                } else if ((result[i].exemptType = "2")) {
                  result[i].score = 80;
                }
              }
              vm.skillKHResultData.push(result[i]);
            }
            //学习态度
            if (allData.sportsLearnHighStudentSemesterVO != null) {
              vm.skillXXResultData.push(
                allData.sportsLearnHighStudentSemesterVO
              );
            }
            //课外锻炼
            if (allData.studentHighExerciseSemesterVO != null) {
              vm.skillKWResultData.push(allData.studentHighExerciseSemesterVO);
            }
            //基本信息
            vm.homeworkExempt = allData.homeworkExempt;
            vm.homeworkScore = allData.homeworkScore;
            vm.learnExempt = allData.learnExempt;
            vm.learnScore = allData.learnScore;
            vm.examActionAllExempt = allData.examActionAllExempt;
            vm.actionScore = allData.actionScore;
            vm.actionCredit = allData.actionCredit;
            vm.actionLevel = allData.actionLevel;
            vm.examActionScore = allData.examActionScore;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentExamNameList() {
      let vm = this;
      let firstYearSemester = -1;
      let secondYearSemester = -1;
      if (vm.selectYear == "1") {
        firstYearSemester = vm.firstYearSemester;
      }
      if (vm.selectYear == "2") {
        secondYearSemester = vm.secondYearSemester;
      }
      if (vm.selectYear == "3") {
        firstYearSemester = vm.firstYearSemester;
        secondYearSemester = vm.secondYearSemester;
      }
      if (vm.selectYear == "3" && vm.grade == 12) {
        firstYearSemester = -1;
        secondYearSemester = -1;
      }
      this.$axios
        .get(
          "/v1/cd/high/semester/getStudentExamNameList?studentId=" +
            vm.studentId +
            "&firstYearSemester=" +
            firstYearSemester +
            "&secondYearSemester=" +
            secondYearSemester +
            "&grade=" +
            this.grade +
            "&selectYear=" +
            this.selectYear
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            vm.classTestList = result;
            if (vm.classTestList.length > 0) {
              vm.getStudentExamList(
                vm.classTestList[0].yearSemester,
                vm.classTestList[0].classTestId
              );
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentHighHealth(yearSemester) {
      var vm = this;
      let data = {
        semesterStyle: vm.selectYear,
        schoolYear: parseInt(Number(vm.firstYearSemester) / 10),
        studentId: vm.studentId,
        yearSemester: yearSemester,
        grade: vm.grade,
      };
      if (vm.grade == 10 && vm.selectYear == "3") {
        vm.healthColumns = vm.healthColumnsGrade10;
      } else if (vm.grade == 11 && vm.selectYear == "3") {
        vm.healthColumns = vm.healthColumnsGrade11;
      } else if (vm.grade == 12 && vm.selectYear == "3") {
        vm.healthColumns = vm.healthColumnsGrade12;
      }
      this.$axios
        .post("/v1/cd/high/semester/getHighStudentHealthList", data)
        .then((res) => {
          vm.healthResultData = [];
          if (res.data.code == 10000) {
            let result = res.data.response;
            vm.healthTime = result.createTime;
            if (null == vm.healthTime) {
              vm.healthTime = "-";
            } else {
              vm.healthTime = vm.healthTime.substr(0, 19);
            }
            vm.healthScore = result.healthScore / 100;
            vm.healthExmeptStatus = result.exmeptStatus;
            result.firstUpScore =
              result.firstUpScore != null
                ? result.firstUpScore / 100
                : result.firstUpScore;
            result.firstDownScore =
              result.firstDownScore != null
                ? result.firstDownScore / 100
                : result.firstDownScore;
            result.secondUpScore =
              result.secondUpScore != null
                ? result.secondUpScore / 100
                : result.secondUpScore;
            result.secondDownScore =
              result.secondDownScore != null
                ? result.secondDownScore / 100
                : result.secondDownScore;
            result.thirdUpScore =
              result.thirdUpScore != null
                ? result.thirdUpScore / 100
                : result.thirdUpScore;
            result.creditScore =
              result.creditScore != null
                ? (result.creditScore / 100).toFixed(2)
                : result.creditScore;

            vm.healthResultData.push(result);
          } else {
            if (res.data.code > 39999) {
              // vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentStaminaList(yearSemester) {
      var vm = this;
      vm.staminaColumns = vm.staminaColumnsNormal;
      this.$axios
        .get(
          "/v1/cd/high/semester/getStudentStaminaList?studentId=" +
            vm.studentId +
            "&yearSemester=" +
            yearSemester
        )
        .then((res) => {
          if (res.data.code == 10000) {
            vm.staminaScore = res.data.response.staminaScore / 100;
            vm.staminaExmeptStatus = res.data.response.exmeptStatus;
            vm.staminaExemptType = res.data.response.exemptType;
            let result = res.data.response.studentHighStaminaResultVOS;
            vm.staminaResultData = [];
            for (let i = 0; i < result.length; i++) {
              if (
                result[i].examItemName == "50米X8往返跑" ||
                result[i].examItemName == "1000米跑"
              ) {
                result[i].examResult =
                  vm.s_to_hs(result[i].examResult) + result[i].examUnit;
              } else if (result[i].examUnit == "99") {
                result[i].examResult += "分";
              } else if (result[i].examUnit == "个数") {
                result[i].examResult += "个";
              } else {
                result[i].examResult += result[i].examUnit;
              }
              result[i].staminaScore = result[i].staminaScore / 100;
              if (result[i].infoStatus == "1") {
                if (result[i].exemptType == "1") {
                  result[i].score = 70;
                } else if (result[i].exemptType == "2") {
                  result[i].score = 80;
                }
              }
              vm.staminaResultData.push(result[i]);
            }
          } else {
            if (res.data.code > 39999) {
            }
          }
        });
    },
    getStudentStaminaAll(yearSemester) {
      var vm = this;
      let data = {
        semesterStyle: vm.selectYear,
        schoolYear: parseInt(Number(vm.firstYearSemester) / 10),
        studentId: vm.studentId,
        yearSemester: yearSemester,
        grade: vm.grade,
      };
      if (vm.grade == 10 && vm.selectYear == "3") {
        vm.staminaColumns = vm.staminaColumnsGrade10;
      } else if (vm.grade == 11 && vm.selectYear == "3") {
        vm.staminaColumns = vm.staminaColumnsGrade11;
      } else if (vm.grade == 12 && vm.selectYear == "3") {
        vm.staminaColumns = vm.staminaColumnsGrade12;
      }
      this.$axios
        .post("/v1/cd/high/semester/getStudentStaminaAll", data)
        .then((res) => {
          vm.staminaResultData = [];
          if (res.data.code == 10000) {
            let result = res.data.response;
            result.firstUpScore =
              result.firstUpScore != null
                ? result.firstUpScore / 100
                : result.firstUpScore;
            result.firstDownScore =
              result.firstDownScore != null
                ? result.firstDownScore / 100
                : result.firstDownScore;
            result.secondUpScore =
              result.secondUpScore != null
                ? result.secondUpScore / 100
                : result.secondUpScore;
            result.secondDownScore =
              result.secondDownScore != null
                ? result.secondDownScore / 100
                : result.secondDownScore;
            result.thirdUpScore =
              result.thirdUpScore != null
                ? result.thirdUpScore / 100
                : result.thirdUpScore;

            vm.staminaResultData.push(result);
          } else {
            if (res.data.code > 39999) {
              // vm.$Message.info(res.data.msg);
            }
          }
        });
    },
  },
  watch: {},
  created() {},
  mounted() {
    let vm = this;
    vm.studentId = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-studentId"
    );
    vm.studentName = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-studentName"
    );
    vm.registerCode = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-registerCode"
    );
    vm.gender = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-gender"
    );
    vm.grade = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-grade"
    );
    vm.startSchool = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-startSchool"
    );
    vm.studentClass = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-studentClass"
    );
    vm.firstYearSemester = Number(
      sessionStorage.getItem(
        "sportsScoreStudent-sportsScoreStudentDetail-firstYearSemester"
      )
    );
    vm.secondYearSemester = Number(
      sessionStorage.getItem(
        "sportsScoreStudent-sportsScoreStudentDetail-secondYearSemester"
      )
    );
    vm.gradeName =
      vm.grade == "1"
        ? "一年级"
        : vm.grade == "2"
        ? "二年级"
        : vm.grade == "3"
        ? "三年级"
        : vm.grade == "4"
        ? "四年级"
        : vm.grade == "5"
        ? "五年级"
        : vm.grade == "6"
        ? "六年级"
        : vm.grade == "7"
        ? "七年级"
        : vm.grade == "8"
        ? "八年级"
        : vm.grade == "9"
        ? "九年级"
        : vm.grade == "10"
        ? "高一"
        : vm.grade == "11"
        ? "高二"
        : vm.grade == "12"
        ? "高三"
        : "";
    vm.selectTabName = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-selectTabName"
    );
    vm.selectYear = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-selectYear"
    );
    vm.sportsClassName = sessionStorage.getItem(
      "sportsScoreStudent-sportsScoreStudentDetail-sportsClassName"
    );
    // this.queryStudentScoreByStudentId();
    if (vm.selectYear == "1") {
      vm.yearSemester = vm.firstYearSemester;
      vm.semesterName = "第一学期";
    } else if (vm.selectYear == "2") {
      vm.yearSemester = vm.secondYearSemester;
      vm.semesterName = "第二学期";
    } else {
      vm.yearSemester = vm.firstYearSemester;
      vm.semesterName = parseInt(vm.firstYearSemester / 10) + "学年";
    }

    //体测数据
    vm.getStudentTestList(vm.yearSemester);
    //查询学生参与项目列表
    vm.getStudentExamNameList();
    //健康知识
    vm.getStudentHighHealth(vm.yearSemester);
    //体能
    if (vm.selectYear == "3") {
      vm.getStudentStaminaAll(vm.yearSemester);
    } else {
      vm.getStudentStaminaList(vm.yearSemester);
    }

    // vm.getStudentParentSignature(sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-studentId'));
  },
};
</script>
