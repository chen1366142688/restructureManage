<template>
  <div>
    <div>
      <h1>学生锻炼管理</h1>
    </div>

    <div style="margin-top:15px;">
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span style>年级：</span>
              <Select v-model="grade" size="small" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>班级：</span>
              <Select v-model="studentClass" size="small" style="width:120px;">
                <Option
                  v-for="item in classList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>姓名：</span>
              <Input v-model="studentName" size="small" placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 10px;">
              <span>学籍号：</span>
              <Input v-model="registerCode" size="small" placeholder="学生学籍号" style="width: 120px;" />
            </div>
            <div style="margin:5px 10px;">
              <span>学期：</span>
              <Select v-model="semesterYear" size="small" style="width:180px;">
                <Option
                  v-for="item in semesterYearList"
                  :value="item.yearSemester"
                  :key="item.yearSemester"
                >{{ item.semesterName }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" @click="restore">重置查询条件</Button>
          </div>
        </div>
      </Card>
      <br />
      <Tabs type="card">
        <TabPane name="operator" :label="semesterName">
          <div>
            <Row>
              <div style>
                <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
              </div>
              <br />
              <div style="float: right;">
                <Page
                  :total="total"
                  :current="pageNum"
                  :page-size="pageSize"
                  @on-change="pageNumChange"
                  @on-page-size-change="pageSizechange"
                  show-total
                  show-sizer
                ></Page>
              </div>
            </Row>
          </div>
        </TabPane>
        <TabPane name="group" v-if="holidayTf" :label="holiday">
          <div>
            <Row>
              <div style>
                <Table border :loading="loading" :columns="resultColumns" :data="resultData1"></Table>
              </div>
              <br />
              <div style="float: right;">
                <Page
                  :total="total1"
                  :current="pageNum1"
                  :page-size="pageSize1"
                  @on-change="pageNumChange1"
                  @on-page-size-change="pageSizechange1"
                  show-total
                  show-sizer
                ></Page>
              </div>
            </Row>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      primaryList: [
        {
          grade: "",
          label: "全部",
        },
        {
          grade: 1,
          label: "一年级",
        },
        {
          grade: 2,
          label: "二年级",
        },
        {
          grade: 3,
          label: "三年级",
        },
        {
          grade: 4,
          label: "四年级",
        },
        {
          grade: 5,
          label: "五年级",
        },
        {
          grade: 6,
          label: "六年级",
        },
      ],
      middleList: [
        {
          grade: "",
          label: "全部",
        },
        {
          grade: 7,
          label: "七年级",
        },
        {
          grade: 8,
          label: "八年级",
        },
        {
          grade: 9,
          label: "九年级",
        },
      ],
      highList: [
        {
          grade: "",
          label: "全部",
        },
        {
          grade: 10,
          label: "高一",
        },
        {
          grade: 11,
          label: "高二",
        },
        {
          grade: 12,
          label: "高三",
        },
      ],
      collegeList: [
        {
          grade: "",
          label: "全部",
        },
        {
          grade: 13,
          label: "大一",
        },
        {
          grade: 14,
          label: "大二",
        },
        {
          grade: 15,
          label: "大三",
        },
        {
          grade: 16,
          label: "大四",
        },
      ],
      schoolGradeList: [],
      studentClass: "",
      classList: [
        {
          value: "",
          label: "全部",
        },
        {
          value: 1,
          label: "1班",
        },
        {
          value: 2,
          label: "2班",
        },
        {
          value: 3,
          label: "3班",
        },
        {
          value: 4,
          label: "4班",
        },
        {
          value: 5,
          label: "5班",
        },
        {
          value: 6,
          label: "6班",
        },
        {
          value: 7,
          label: "7班",
        },
        {
          value: 8,
          label: "8班",
        },
        {
          value: 9,
          label: "9班",
        },
        {
          value: 10,
          label: "10班",
        },
        {
          value: 11,
          label: "11班",
        },
        {
          value: 12,
          label: "12班",
        },
        {
          value: 13,
          label: "13班",
        },
        {
          value: 14,
          label: "14班",
        },
        {
          value: 15,
          label: "15班",
        },
        {
          value: 16,
          label: "16班",
        },
        {
          value: 17,
          label: "17班",
        },
        {
          value: 18,
          label: "18班",
        },
        {
          value: 19,
          label: "19班",
        },
        {
          value: 20,
          label: "20班",
        },
        {
          value: 21,
          label: "21班",
        },
        {
          value: 22,
          label: "22班",
        },
        {
          value: 23,
          label: "23班",
        },
        {
          value: 24,
          label: "24班",
        },
        {
          value: 25,
          label: "25班",
        },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
      ],
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          //   minWidth: 250
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          //   width: 150
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        // {
        //   title: "年级",
        //   key: "gradeName",
        //   align: "center"
        //   //   width: 150
        // },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gradeName + row.studentClass + "班";
            return h("div", text);
          },
        },
        // {
        //   title: "T1完成次数",
        //   key: "levelOneCount",
        //   align: "center",
        //   render: (h, params) => {
        //     const row = params.row;
        //     const text =
        //       (row.levelOneCount == null ? 0 : row.levelOneCount) + "次";
        //     return h("div", text);
        //   }
        // },
        // {
        //   title: "T2完成次数",
        //   key: "levelTwoCount",
        //   align: "center",
        //   render: (h, params) => {
        //     const row = params.row;
        //     const text =
        //       (row.levelTwoCount == null ? 0 : row.levelTwoCount) + "次";
        //     return h("div", text);
        //   }
        // },
        // {
        //   title: "T3完成次数",
        //   key: "levelThreeCount",
        //   align: "center",
        //   render: (h, params) => {
        //     const row = params.row;
        //     const text =
        //       (row.levelThreeCount == null ? 0 : row.levelThreeCount) + "次";
        //     return h("div", text);
        //   }
        // },
        {
          title: "已完成/总次数(次)",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let haveCount = row.comboCount == null ? 0 : row.comboCount;
            let needCount =
              row.needExerciseCount == null ? 0 : row.needExerciseCount;
            const text = haveCount + "/" + needCount;
            return h("div", text);
          },
        },
        // {
        //   title: "已完成/总时长(分钟)",
        //   key: "studentClass",
        //   align: "center",
        //   render: (h, params) => {
        //     const row = params.row;
        //     let haveTime = row.comboTime == null ? 0 : row.comboTime;
        //     let needTime =
        //       row.needExerciseTime == null ? 0 : row.needExerciseTime;
        //     const text =
        //       (haveTime / 1000 / 60).toFixed() +
        //       "/" +
        //       (needTime / 1000 / 60).toFixed();
        //     return h("div", text);
        //   }
        // }
      ],
      collegeColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          //   minWidth: 250
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          //   width: 150
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        {
          title: "学院",
          key: "collegeName",
          align: "center",
          //   width: 150
        },
        {
          title: "专业",
          key: "majorName",
          align: "center",
          //   width: 150
        },
        {
          title: "学级",
          key: "startSchool",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.startSchool + "级";
            return h("div", text);
          },
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.studentClass + "班";
            return h("div", text);
          },
        },
      ],
      resultData: [],
      resultData1: [],
      isCollege: false,
      college: "",
      collegesList: [],
      major: "",
      majorList: [],
      chooseCollege: true,
      collegeName: "",
      semesterYear: "",
      semesterName: "",
      semesterYearList: [],
      holiday: "",
      holidayTf: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageNum1: 1,
      pageSize1: 10,
      total1: 0,
    };
  },
  methods: {
    getSchoolAllYearSemester() {
      var vm = this;
      this.$axios
        .get("/v1/sports/class/getSchoolAllYearSemester")
        .then((res) => {
          if (res.data.code == 10000) {
            vm.semesterYearList = res.data.response;
            if (res.data.response) {
              vm.semesterYear = res.data.response[0].yearSemester;
              vm.semesterName = res.data.response[0].semesterName;
              if (res.data.response[0].semesterOver === "0") {
                let semester = (vm.semesterYear + "").substr(4, 1);
                vm.holidayTf = true;
                // console.log(semester)
                if (semester == "1") {
                  this.holiday = "暑假";
                } else {
                  this.holiday = "寒假";
                }
              }
              vm.search();
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentInfoList(schoolId) {
      var vm = this;
      vm.loading = true;

      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        yearSemester: vm.semesterYear,
        semesterOver: "1",
      };
      this.$axios
        .post("/v1/exercisecombo/queryStudentExerciseList", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.resultData = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countStudentList(schoolId) {
      var vm = this;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        yearSemester: vm.semesterYear,
        semesterOver: "1",
      };
      this.$axios
        .post("/v1/exercisecombo/queryStudentExerciseListCount", data)
        .then((res) => {
          if (res.data.code == 10000) {
            this.total = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentInfoListHoliday(schoolId) {
      var vm = this;
      vm.loading = true;

      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum1,
        pageSize: vm.pageSize1,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        yearSemester: vm.semesterYear,
        semesterOver: "0",
      };
      this.$axios
        .post("/v1/exercisecombo/queryStudentExerciseList", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.resultData1 = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countStudentListHoliday(schoolId) {
      var vm = this;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum1,
        pageSize: vm.pageSize1,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        yearSemester: vm.semesterYear,
        semesterOver: "0",
      };
      this.$axios
        .post("/v1/exercisecombo/queryStudentExerciseListCount", data)
        .then((res) => {
          if (res.data.code == 10000) {
            this.total1 = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
      let schoolId = vm.schoolId;
      vm.getStudentInfoList(schoolId);
      vm.countStudentList(schoolId);
      vm.getStudentInfoListHoliday(schoolId);
      vm.countStudentListHoliday(schoolId);
    },
    restore() {
      var vm = this;
      vm.grade = "";
      vm.pageNo = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = "";
      vm.studentName = "";

      let schoolId = vm.schoolId;
      vm.querySearch();
    },

    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value;
        this.search();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNum = 1;
        this.search();
      }
    },
    pageNumChange1(value) {
      //页码改变方法处理
      if (this.pageNum1 != value) {
        this.pageNum1 = value;
        this.search();
      }
    },
    pageSizechange1(value) {
      //页面大小改变方法处理
      if (this.pageSize1 != value) {
        this.pageNum1 = 1;
        this.pageSize1 = value;
        this.search();
      }
    },
  },
  watch: {
    semesterYear: function () {
      var vm = this;
      if (vm.semesterYearList) {
        for (var i = 0; i < vm.semesterYearList.length; i++) {
          if (vm.semesterYear == vm.semesterYearList[i].yearSemester) {
            vm.semesterName = vm.semesterYearList[i].semesterName;
            if (vm.semesterYearList[i].semesterOver === "0") {
              let semester = (vm.semesterYear + "").substr(4, 1);
              vm.holidayTf = true;
              // console.log(semester)
              if (semester == "1") {
                this.holiday = "暑假";
              } else {
                this.holiday = "寒假";
              }
            } else {
              vm.holidayTf = false;
            }
            vm.search();
          }
        }
      }
    },
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.schoolType = schoolType;
    if ("2" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
    }
    if ("3" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
    }
    if ("4" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
    }
    // vm.search()
    vm.getSchoolAllYearSemester();
  },
};
</script>
