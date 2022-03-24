<template>
  <div style="padding-left: 10px">
    <h2 style="margin-top: 15px; margin-bottom: 13px">详细数据</h2>
    <Card>
      <div class="top-search">
        <div class="left-input" style="align-items: center">
          <div style="margin: 5px 20px">
            <span>姓名：</span>{{ studentName }}
          </div>
          <div style="margin: 5px 20px">
            <span>学籍号：</span>{{ registerCode }}
          </div>
          <div style="margin: 5px 20px">
            <span>学年：{{startSchool}}</span>
          </div>
          <div style="margin: 5px 20px">
            <span>班级：</span>{{ gradeName }}{{ studentClass }}班
          </div>
          <div style="margin: 5px 20px">
            <span>性别：</span>{{ gender == "1" ? "男" : "女" }}
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="goback">返回</Button>
        </div>
      </div>
    </Card>
    <Card name="homeworkScore" label="综合评价" style="margin-top:16px;">
      <div style="font-size: 20px; height: 40px">综合评价数据</div>
      <div style="margin-top: 10px" v-for="item in studentScoreColumnsData">
        <div>
          {{
            item.yearSemester % 2 == 0
              ? (item.yearSemester / 10).toFixed(0) + "学年第一学期"
              : (item.yearSemester / 10).toFixed(0) - 1 + "学年第二学期"
          }}
        </div>
        <div>
          <Row>
            <div>
              <Table
                border
                max-height="90"
                :loading="loading"
                :columns="scoreColumns"
                :data="[item]"
              ></Table>
            </div>
          </Row>
        </div>
      </div>
      <div
        v-if="studentScoreColumnsData.length <= 0"
        style="width: 100%; text-align: center; line-height: 600px"
      >
        暂无数据
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      schoolId: "",
      loading: false,
      stuntId: "",
      studentName: "",
      registerCode: "",
      gender: "",
      grade: "",
      startSchool: '',
      studentClass: "",
      schoolName: "",
      genderName: "",
      gradeName: "",
      studentClassName: "",
      studentScoreColumnsData: [],
      scoreColumns: [
        {
          title: "体测得分",
          key: "finishCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (row.testScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "运动技能得分",
          key: "actionScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore / 100;
            if (row.actionScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "健康知识得分",
          key: "healthScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore / 100;
            if (row.healthScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学习态度得分",
          key: "learnScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore / 100;
            if (row.learnScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "课后作业得分",
          key: "homeworkScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore / 100;
            if (row.homeworkScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学期总成绩得分",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore / 100;
            text = text.toFixed(1);
            if (text <= 0) {
              text = 0.0;
            }
            return h("span", text);
          },
        },
        {
          title: "等级",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (row.semesterLevel == "1") {
              text = "优秀";
            } else if (row.semesterLevel == "2") {
              text = "良好";
            } else if (row.semesterLevel == "3") {
              text = "及格";
            } else {
              text = "不及格";
            }
            return h("span", text);
          },
        },
      ],
    };
  },
  methods: {
    goback() {
      //返回
      this.$router.go(-1);
    },
    queryStudentScoreByStudentId() {
      var vm = this;
      this.$axios
        .get(
          "/v1/semesterScore/queryStudentScoreByStudentId?studentId=" +
            vm.studentId
        )
        .then((res) => {
          if (res.data.code == 10000) {
            vm.studentScoreColumnsData = res.data.response;
            if (
              vm.studentScoreColumnsData != null &&
              vm.studentScoreColumnsData.length > 0
            ) {
              for (let i = 0; i < vm.studentScoreColumnsData.length; i++) {
                let actionPercent =
                  vm.studentScoreColumnsData[i].actionScore == null ||
                  vm.studentScoreColumnsData[i].actionScore >= 0
                    ? vm.studentScoreColumnsData[i].actionPercent
                    : 0;
                let healthPercent =
                  vm.studentScoreColumnsData[i].healthScore == null ||
                  vm.studentScoreColumnsData[i].healthScore >= 0
                    ? vm.studentScoreColumnsData[i].healthPercent
                    : 0;
                let homeworkPercent =
                  vm.studentScoreColumnsData[i].homeworkScore == null ||
                  vm.studentScoreColumnsData[i].homeworkScore >= 0
                    ? vm.studentScoreColumnsData[i].homeworkPercent
                    : 0;
                let learnPercent =
                  vm.studentScoreColumnsData[i].learnScore == null ||
                  vm.studentScoreColumnsData[i].learnScore >= 0
                    ? vm.studentScoreColumnsData[i].learnPercent
                    : 0;
                let testPercent =
                  vm.studentScoreColumnsData[i].testScore == null ||
                  vm.studentScoreColumnsData[i].testScore >= 0
                    ? vm.studentScoreColumnsData[i].testPercent
                    : 0;
                vm.studentScoreColumnsData[i].semesterPercent =
                  actionPercent +
                  healthPercent +
                  homeworkPercent +
                  learnPercent +
                  testPercent;
              }
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
  },
  mounted() {
    let vm = this;
    const {studentId, studentName, registerCode, gender, studentClass, grade, startSchool} = this.$route.query
    this.studentId = studentId
    this.studentName = studentName
    this.registerCode = registerCode
    this.gender = gender
    this.studentClass = studentClass
    this.grade = grade
    this.startSchool = startSchool
    this.gradeName =
      this.grade == "1"
        ? "一年级"
        : this.grade == "2"
        ? "二年级"
        : this.grade == "3"
        ? "三年级"
        : this.grade == "4"
        ? "四年级"
        : this.grade == "5"
        ? "五年级"
        : this.grade == "6"
        ? "六年级"
        : this.grade == "7"
        ? "七年级"
        : this.grade == "8"
        ? "八年级"
        : this.grade == "9"
        ? "九年级"
        : this.grade == "10"
        ? "高一"
        : this.grade == "11"
        ? "高二"
        : this.grade == "12"
        ? "高三"
        : "";
    this.genderName = this.gender == "1" ? "男" : "女";
    this.studentClassName = this.studentClass + "班";
    this.schoolName = sessionStorage.getItem("schoolName");
    this.queryStudentScoreByStudentId();
  },
};
</script>
