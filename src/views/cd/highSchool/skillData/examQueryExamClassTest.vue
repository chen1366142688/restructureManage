<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按项目查询</h2>
    </div>
    <div>
      <Card :dis-hover="true">
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>年级：</span>
              <Select v-model="gradeId" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.gradeId"
                  :key="item.gradeId"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="getGradeExamItemClassTestList">查询</Button>
            <Button type="success" @click="exportSchoolTestData">导出EXCEL</Button>
          </div>
        </div>
      </Card>
      <br />
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
        <TabPane
          :name="classTest.classTestName"
          :label="classTest.classTestName"
          v-for="classTest in classTestList"
          :key="classTest.classTestId"
        ></TabPane>
      </Tabs>
      <div>
        <Card :dis-hover="true">
          <div style="font-size:18px;height:40px;">数据概览</div>
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </Card>
      </div>
      <div style="margin-top:20px">
        <Card :dis-hover="true">
          <div style="font-size:18px;height:40px;">数据明细</div>
          <Row>
            <div style>
              <Table
                border
                max-height="400"
                :loading="loading"
                :columns="classColumns"
                :data="classData"
              ></Table>
            </div>
          </Row>
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
      selectTabName: "",
      schoolId: "",
      loading: false,
      highList: [
        { gradeId: 10, label: "高一" },
        { gradeId: 11, label: "高二" },
        { gradeId: 12, label: "高三" },
      ],
      gradeId: "",
      schoolGradeList: [],
      classTestList: [],
      classTestId: "",
      resultColumns: [
        {
          title: "总人数",
          key: "studentCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "已完成/考核总人数",
          key: "overStudentCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "平均考核得分",
          key: "averageExamScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学习态度平均成绩",
          key: "averageLearnScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "课外锻炼平均成绩",
          key: "averageHomeworkScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "项目平均得分",
          key: "averageActionScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "合格人数",
          key: "creditStudentCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "合格率",
          key: "creditPercent",
          align: "center",
          minWidth: 100,
        },
      ],
      resultData: [],
      classColumns: [
        // 数据明细
        {
          title: "班级",
          key: "sportsClassName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "总人数",
          key: "studentCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "已完成/考核总人数",
          key: "overStudentCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "平均考核得分",
          key: "averageExamScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学习态度平均成绩",
          key: "averageLearnScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "课外锻炼平均成绩",
          key: "averageHomeworkScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "项目平均得分",
          key: "averageActionScore",
          align: "center",
          minWidth: 100,
        },
        {
          title: "合格人数",
          key: "creditStudentCount",
          align: "center",
          minWidth: 100,
        },
        {
          title: "合格率",
          key: "creditPercent",
          align: "center",
          minWidth: 100,
        },
      ],
      classData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    selectTabs(name) {
      this.selectTabName = name;
      sessionStorage.setItem(
        "examQueryExamClassTest-selectTabName",
        this.selectTabName
      );
      this.getGradeExamItemClassTestList();
    },
    /** 选项卡数据 */
    getGradeExamItemClassTestList() {
      this.loading = true;
      this.$axios
        .get(
          `/v1/cd/high/semester/queryHighExamItemTest?gradeId=${this.gradeId}`
        )
        .then((res) => {
          this.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            this.classTestList = data;
            if (
              sessionStorage.getItem("examQueryExamClassTest-selectTabName")
            ) {
              this.selectTabName = sessionStorage.getItem(
                "examQueryExamClassTest-selectTabName"
              );
            } else {
              this.selectTabName = data[0].classTestName;
            }
            this.search();
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    /** 数据概览 */
    getChartTotalInfo() {
      this.loading = true;
      this.$axios
        .get(
          "/v1/cd/high/semester/queryHighExamItemTestGradeTotal?gradeId=" +
            this.gradeId +
            "&classTestId=" +
            this.classTestId
        )
        .then((res) => {
          this.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            let arr = [
              {
                studentCount: Number(data.studentCount) || 0, // 总人数
                overStudentCount:
                  `${Number(data.overStudentCount)}/${Number(
                    data.studentCount
                  )}` || 0, // 已完成/考核总人数
                averageExamScore:
                  Number(data.averageExamScore) == 0
                    ? 0
                    : (Number(data.averageExamScore) / 100).toFixed(2) || 0, // 平均考核得分
                averageLearnScore:
                  Number(data.averageLearnScore) == 0
                    ? 0
                    : (Number(data.averageLearnScore) / 100).toFixed(2) || 0, // 学习态度平均成绩
                averageHomeworkScore:
                  Number(data.averageHomeworkScore) == 0
                    ? 0
                    : (Number(data.averageHomeworkScore) / 100).toFixed(2) || 0, // 课外锻炼平均成绩
                averageActionScore:
                  Number(data.averageActionScore) == 0
                    ? 0
                    : (Number(data.averageActionScore) / 100).toFixed(2) || 0, // 项目平均得分
                creditStudentCount: Number(data.creditStudentCount) || 0, // 合格人数
                creditPercent: data.creditPercent
                  ? `${Number(data.creditPercent)}%`
                  : 0, // 合格率
              },
            ];
            this.resultData = arr || [];
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    /** 导出 */
    exportSchoolTestData() {
      var vm = this;
      if (typeof vm.gradeId == "undefined") {
        vm.gradeId = "";
      }
      if (typeof vm.classTestId == "undefined") {
        vm.classTestId = "";
      }
      let url =
        this.$axios.defaults.baseURL +
        "/v1/cd/high/semester/exportExamTestListByGrade?gradeId=" +
        vm.gradeId +
        "&classTestId=" +
        vm.classTestId +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    search() {
      for (let i = 0; i < this.classTestList.length; i++) {
        if (this.selectTabName == this.classTestList[i].classTestName) {
          this.classTestId = this.classTestList[i].classTestId;
        }
      }
      this.getChartTotalInfo();
      this.$axios
        .get(
          `/v1/cd/high/semester/queryHighExamItemTestGradeDetail?gradeId=${this.gradeId}&classTestId=${this.classTestId}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let list = [];
            let data = res.data.response;
            data.forEach((item) => {
              list.push({
                sportsClassName: item.sportsClassName,
                studentCount: Number(item.studentCount) || 0,
                overStudentCount: `${Number(item.overStudentCount)}/${Number(
                  item.studentCount
                )}`,
                averageExamScore:
                  Number(item.averageExamScore) == 0
                    ? 0
                    : (Number(item.averageExamScore) / 100).toFixed(2) || 0,
                averageLearnScore:
                  Number(item.averageLearnScore) == 0
                    ? 0
                    : (Number(item.averageLearnScore) / 100).toFixed(2) || 0,
                averageHomeworkScore:
                  Number(item.averageHomeworkScore) == 0
                    ? 0
                    : (Number(item.averageHomeworkScore) / 100).toFixed(2) || 0,
                averageActionScore:
                  Number(item.averageActionScore) == 0
                    ? 0
                    : (Number(item.averageActionScore) / 100).toFixed(2) || 0,
                creditStudentCount: Number(item.creditStudentCount) || 0,
                creditPercent: Number(item.creditPercent)
                  ? `${Number(item.creditPercent)}%`
                  : 0,
              });
            });
            this.classData = list || [];
          }
        });
    },
  },
  mounted() {
    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType == 4) {
      this.schoolGradeList = this.highList;
    }
    this.gradeId = this.schoolGradeList[0].gradeId;
    let schoolId = sessionStorage.getItem("schoolId");
    this.schoolId = schoolId;
    this.getGradeExamItemClassTestList();
  },
};
</script>
