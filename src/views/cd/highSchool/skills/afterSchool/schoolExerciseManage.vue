<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">课外锻炼管理</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>年级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>班级：</span>
              <Select v-model="sportsClassId" style="width:120px;">
                <Option
                  v-for="item in gradeSportsClassList"
                  :value="item.sportsClassId"
                  :key="item.sportsClassId"
                >{{ item.sportsClassName }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>姓名：</span>
              <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 20px;">
              <span>学籍号：</span>
              <Input v-model="registerCode" placeholder="学生学籍号" style="width: 120px;" />
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" @click="restore">重置查询条件</Button>
            <Button type="success" @click="toComplete">锻炼数据录入</Button>
          </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">数据明细</div>
        <Row>
          <div>
            <Table
              border
              max-height="550"
              :loading="loading"
              :columns="resultColumns"
              :data="resultData"
            ></Table>
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
      </Card>
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
      gender: "",
      genderList: [
        {
          itemId: "",
          itemName: "全部",
        },
        {
          itemId: "1",
          itemName: "男",
        },
        {
          itemId: "2",
          itemName: "女",
        },
      ],
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
      classList: [
            {
                value: '',
                label: '全部'
            },
            {
                value: 1,
                label: '1班'
            },
            {
                value: 2,
                label: '2班'
            },
            {
                value: 3,
                label: '3班'
            },
            {
                value: 4,
                label: '4班'
            },
            {
                value: 5,
                label: '5班'
            },
            {
                value: 6,
                label: '6班'
            },
            {
                value: 7,
                label: '7班'
            },
            {
                value: 8,
                label: '8班'
            },
            {
                value: 9,
                label: '9班'
            },
            {
                value: 10,
                label: '10班'
            },
            {
                value: 11,
                label: '11班'
            },
            {
                value: 12,
                label: '12班'
            },
            {
                value: 13,
                label: '13班'
            },
            {
                value: 14,
                label: '14班'
            },
            {
                value: 15,
                label: '15班'
            },
            {
                value: 16,
                label: '16班'
            },
            {
                value: 17,
                label: '17班'
            },
            {
                value: 18,
                label: '18班'
            },
            {
                value: 19,
                label: '19班'
            },
            {
                value: 20,
                label: '20班'
            },
            {
                value: 21,
                label: '21班'
            },
            {
                value: 22,
                label: '22班'
            },
            {
                value: 23,
                label: '23班'
            },
            {
                value: 24,
                label: '24班'
            },
            {
                value: 25,
                label: '25班'
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
            },
            {
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
      schoolGradeList: [],
      studentClass: "",
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        {
          title: "班级",
          key: "gradeName",
          align: "center",
          width: 100,
          // render: (h, params) => {
          //   const row = params.row;
          //   // const color = row.exemptId != null ? 'green' : 'red'
          //   const text = row.gradeName + row.studentClass + "班";
          //   return h("div", text);
          // }
        },
        {
          title: "项目名称",
          key: "classTestName",
          align: "center",
          type: "html",
          width: 250,
        },
        {
          title: "锻炼次数",
          key: "homeworkCount",
          align: "center",
          type: "html",
          minWidth:100
        },
        {
          title: "得分",
          key: "homeworkScore",
          align: "center",
          type: "html",
          minWidth:100
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "5px",
                  },
                  attrs: {
                    disabled: params.row.detail == 1 ? true : false,
                  },
                  on: {
                    click: () => {
                      this.toDetail(
                        params.row.studentId,
                        params.row.studentName,
                        params.row.registerCode
                      );
                    },
                  },
                },
                "详情"
              ),
            ]);
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
      gradeSportsClassList: [],
      sportsClassId: -1,
    };
  },
  methods: {
    getGradeSportsClassList() {
      var vm = this;
      this.$axios
        .get(
          "/v1/cd/high/skills/getGradeSportsClassList?schoolId=" +
            vm.schoolId +
            "&gradeId=" +
            vm.grade
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            let a = {
              sportsClassId: -1,
              sportsClassName: "全部",
            };
            vm.gradeSportsClassList = data;
            vm.gradeSportsClassList.unshift(a);
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    toDetail(studentId, studentName, registerCode) {
      sessionStorage.setItem(
        "schoolExerciseManage-schoolExerciseManageDetail-studentId",
        studentId
      );
      sessionStorage.setItem(
        "schoolExerciseManage-schoolExerciseManageDetail-studentName",
        studentName
      );
      this.$router.push({ name: "schoolExerciseManageDetail" });
    },
    toComplete() {
      this.$router.push({ name: "schoolExerciseRecordingManage" });
    },
    getStudentInfoList(schoolId) {
      var vm = this;
      sessionStorage.setItem("schoolExerciseManage-grade", vm.grade);
      sessionStorage.setItem(
        "schoolExerciseManage-sportsClassId",
        vm.sportsClassId
      );
      sessionStorage.setItem(
        "schoolExerciseManage-studentClass",
        vm.studentClass
      );
      sessionStorage.setItem(
        "schoolExerciseManage-registerCode",
        vm.registerCode
      );
      sessionStorage.setItem(
        "schoolExerciseManage-studentName",
        vm.studentName
      );
      sessionStorage.setItem("schoolExerciseManage-pageNum", vm.pageNum);
      sessionStorage.setItem("schoolExerciseManage-pageSize", vm.pageSize);

      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        sportsClassId: vm.sportsClassId == -1 ? "" : vm.sportsClassId,
        studentName: vm.studentName,
        gender: vm.gender,
      };
      this.$axios
        .post("/v1/cd/high/schoolexercise/getStudentSchoolExerciseInfos", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            //vm.resultData = res.data.response;
            let result = res.data.response;
            for (let i = 0; i < result.length; i++) {
              let items = result[i].items;
              let className = "";
              let homeCount = "";
              let homeScore = "";
              let borderStyle = "";
              if (items && items.length > 1) {
                borderStyle = "border-top:1px #DFD9DE solid;";
              }
              if (items && items.length > 0) {
                className = "<div>";
                homeCount = "<div>";
                homeScore = "<div>";
                for (let j = 0; j < items.length; j++) {
                  let classNameItem = items[j].classTestName;
                  if (classNameItem == null) {
                    classNameItem = "";
                  } else {
                    if (result[i].sportsClassId != items[j].sportsClassId) {
                      classNameItem =
                        classNameItem + "（" + items[j].sportsClassName + "）";
                    }
                  }
                  let homeworkCountItem = items[j].homeworkCount;
                  let homeworkScoreItem = items[j].homeworkScore;
                  if ("1" == items[j].homeworkExempt) {
                    homeworkCountItem = "免试";
                    if ("1" == items[j].exemptType) {
                      homeworkScoreItem = 70;
                    } else if ("2" == items[j].exemptType) {
                      homeworkScoreItem = 80;
                    }
                  }
                  if (className == "<div>") {
                    borderStyle = "";
                  } else {
                    borderStyle = "border-top:1px #DFD9DE solid;";
                  }
                  className =
                    className +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:30px;line-height:30px;' >" +
                    classNameItem +
                    "</div>";
                  homeCount =
                    homeCount +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:30px;line-height:30px;' >" +
                    homeworkCountItem +
                    "</div>";
                  homeScore =
                    homeScore +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:30px;line-height:30px;' >" +
                    homeworkScoreItem +
                    "</div>";
                }
                className = className + "</div>";
                homeCount = homeCount + "</div>";
                homeScore = homeScore + "</div>";
              }
              result[i].classTestName = className;
              result[i].homeworkCount = homeCount;
              result[i].homeworkScore = homeScore;
            }
            vm.resultData = result;
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
        sportsClassId: vm.sportsClassId == -1 ? "" : vm.sportsClassId,
        studentName: vm.studentName,
        gender: vm.gender,
      };
      this.$axios
        .post(
          "/v1/cd/high/schoolexercise/getStudentSchoolExerciseInfosCount",
          data
        )
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
        this.pageNum = 1;
        this.pageSize = value;
        this.search();
      }
    },
  },
  watch: {
    grade: function () {
      var vm = this;
      vm.getGradeSportsClassList();
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

    let grade = sessionStorage.getItem("schoolExerciseManage-grade");
    let studentClass = sessionStorage.getItem(
      "schoolExerciseManage-studentClass"
    );
    let registerCode = sessionStorage.getItem(
      "schoolExerciseManage-registerCode"
    );
    let studentName = sessionStorage.getItem(
      "schoolExerciseManage-studentName"
    );
    let pageNum = sessionStorage.getItem("schoolExerciseManage-pageNum");
    let pageSize = sessionStorage.getItem("schoolExerciseManage-pageSize");
    let sportsClassId = sessionStorage.getItem(
      "schoolExerciseManage-sportsClassId"
    );

    if (grade != null && grade != "" && grade != undefined && grade > 0) {
      vm.grade = Number(grade);
    } else {
      vm.grade = 10;
    }
    if (
      studentClass != null &&
      studentClass != "" &&
      studentClass != undefined &&
      studentClass > 0
    ) {
      vm.studentClass = Number(studentClass);
    }
    if (
      registerCode != null &&
      registerCode != "" &&
      registerCode != undefined
    ) {
      vm.registerCode = registerCode;
    }
    if (studentName != null && studentName != "" && studentName != undefined) {
      vm.studentName = studentName;
    }
    if (
      pageNum != null &&
      pageNum != "" &&
      pageNum != undefined &&
      pageNum > 0
    ) {
      vm.pageNum = Number(pageNum);
    }
    if (
      pageSize != null &&
      pageSize != "" &&
      pageSize != undefined &&
      pageSize > 0
    ) {
      vm.pageSize = Number(pageSize);
    }
    if (
      sportsClassId != null &&
      sportsClassId != undefined &&
      sportsClassId != ""
    ) {
      vm.sportsClassId = Number(sportsClassId);
    }
    // vm.search()

    vm.search();
    vm.getGradeSportsClassList();
  },
};
</script>
