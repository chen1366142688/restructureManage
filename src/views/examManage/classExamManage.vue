<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{examItemName}}({{gradeName}}、{{studentClass}}班)</h2>
    </div>
    <Card>
      <div class="top-search">
        <div class="left-input">
          <div style="margin:5px 10px;">
            <span>性别：</span>
            <Select v-model="gender"  style="width:120px;">
                <Option
                  v-for="item in genderType"
                  :value="item.typeId"
                  :key="item.typeId"
                >{{ item.typeName }}</Option>
            </Select>
          </div>
          <div style="margin:5px 10px;">
            <span>学籍号：</span>
            <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;"/>
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="search">查询</Button>
          <Button type="success" @click="pageToList">返回</Button>
        </div>
      </div>
      </Card>
      <br/>
      <Card>
        <div style="font-size:18px;height:40px;">
            数据概览
        </div>
        <div>
          <Row>
            <div style>
              <Table border :loading="loading" :columns="resultColumnsTotal" :data="resultDataTotal"></Table>
            </div>
          </Row>
        </div>
      </Card>
      </br>
      <Card >
      <div style="font-size:18px;height:40px;">
            数据明细
      </div>
      <div>
        <div>
          <Row>
            <div>
              <Table border max-height="500" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolName: "",
      gradeName: "",
      loading:false,
      studentClass: "",
      examItemId: "",
      examItemName: "",
      yearSemester: "",
      classId: "",
      gender: "",
      registerCode: "",
      allCount: 0,
      overCount: 0,
      excellentCount: 0,
      wellCount: 0,
      passCount: 0,
      noPassCount: 0,
      noTestCount: 0,
      resultDataTotal:[],
      resultColumnsTotal:[
        {
          title: "总人数",
          key: "allCount",
          align: "center",
        },
        {
          title: "未考核完成人数",
          key: "noTestCount",
          align: "center",
        },
        {
          title: "考核完成人数",
          key: "overCount",
          align: "center",
        },
        {
          title: "优秀人数",
          key: "excellentCount",
          align: "center",
        },
        {
          title: "良好人数",
          key: "wellCount",
          align: "center",
        },
        {
          title: "及格人数",
          key: "passCount",
          align: "center",
        },
        {
          title: "不及格人数",
          key: "noPassCount",
          align: "center",
        },
      ],
      genderType: [
        {
          typeId: "",
          typeName: "全部"
        },
        {
          typeId: '1',
          typeName: "男生"
        },
        {
          typeId: '2',
          typeName: "女生"
        }
      ],
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" ? "男" : "女")
            ]);
          }
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
        },
        {
          title: "成绩",
          key: "examResult",
          align: "center",
          render: (h, params) => {

            let data=params.row.examResult;

            if(params.row.examUnit && params.row.examUnit == "分.秒"){
              data=Number(data)%60>0?(Math.floor(Number(data)/60)+'分'+(Number(data)%60)+'秒'):Number(data)/60+'分'
            }else{
              data=params.row.examUnit != '99' ? params.row.examResult + params.row.examUnit : params.row.examResult
            }

            if (!params.row.examResult) {
              return h("div", [h("span", "-")]);
            }else {
              return h("div", [
                h(
                  "span",
                  data
                )
              ]);
            }
          }
        },
        {
          title: "得分",
          key: "score",
          align: "center",
          render: (h, params) => {
            if (!params.row.examResult) {
              return h("div", [h("span", "未完成测试")]);
            } else {
              return h("div", [
                h(
                  "span",
                  params.row.score != null
                    ? params.row.score + "分"
                    : ""
                )
              ]);
            }
          }
        },
        {
          title: "得分等级",
          key: "scoreLevel",
          align: "center",
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
                  : ""
              )
            ]);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {

              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success"
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.toClassTestDetail(
                          params.row.studentId,
                          params.row.studentName,
                          params.row.registerCode,
                          params.row.examResult
                        );
                      }
                    }
                  },
                  "编辑"
                )
              ]);
            }
        }
      ],
      resultData: []
    };
  },
  methods: {
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    search(){
        var vm=this;
        vm.getClassExamList(vm.classId,vm.examItemId,vm.yearSemester)
    },
    getClassExamList(classId,examItemId,yearSemester) {
      var vm = this;
      vm.loading = true;
      let data = {
        classId: classId,
        examItemId: examItemId,
        yearSemester: yearSemester,
        gender: vm.gender,
        registerCode: vm.registerCode
      };
      this.$axios.post("/v1/studentexam/getClassExamList", data).then(res => {
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
    toClassTestDetail(studentId,studentName,registerCode,examResult) {
        var vm=this;
      sessionStorage.setItem(
        "classExamManage-studentExamDetail-studentId",
        studentId
      );
      sessionStorage.setItem(
        'classExamManage-studentExamDetail-classId',
        vm.classId
      )
       sessionStorage.setItem(
        'classExamManage-studentExamDetail-examItemId',
        vm.examItemId
      )
       sessionStorage.setItem(
        'classExamManage-studentExamDetail-yearSemester',
        vm.yearSemester
      )

      sessionStorage.setItem(
        "classExamManage-studentExamDetail-schoolName",
        vm.schoolName
      );
      sessionStorage.setItem(
        'classExamManage-studentExamDetail-gradeName',
        vm.gradeName
      )
       sessionStorage.setItem(
        'classExamManage-studentExamDetail-studentClass',
        vm.studentClass
      )
       sessionStorage.setItem(
        'classExamManage-studentExamDetail-studentName',
        studentName
      )
       sessionStorage.setItem(
        'classExamManage-studentExamDetail-registerCode',
        registerCode
      )
      sessionStorage.setItem(
        'classExamManage-studentExamDetail-examResult',
        examResult?"1":"0"
      )
      sessionStorage.setItem(
        'classExamManage-studentExamDetail-examItemName',
        vm.examItemName
      )
      this.$router.push({ name: "studentExamDetail" });
    },
    getClassExamInfo(classId,examItemId,yearSemester) {
      var vm = this;
      this.$axios
        .get(
          "/v1/studentexam/getClassExamInfo?classId=" +
            classId +
            "&examItemId=" +
            examItemId +
            "&yearSemester=" +
            yearSemester
        )
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.allCount =data.totalStudent;
            vm.overCount = data.examFinish;
            vm.excellentCount = data.vgStudent
            vm.wellCount = data.goodStudent
            vm.passCount = data.passStudent
            vm.noPassCount = data.notPass
            vm.noTestCount = data.noExam

            vm.examItemName=data.examItemName
            vm.schoolName=data.schoolName;
            vm.gradeName=data.gradeName;
            vm.studentClass=data.studentClass;


            vm.resultDataTotal=[];
            let aotal = {
                allCount:vm.allCount,
                noTestCount:vm.noTestCount,
                overCount:vm.overCount,
                excellentCount:vm.excellentCount,
                wellCount:vm.wellCount,
                passCount:vm.passCount,
                noPassCount:vm.noPassCount,
            }
            vm.resultDataTotal.push(aotal);
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    }
  },
  watch: {
    //   provinceId:'getCityList',
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm = this;
    let schoolType = sessionStorage.getItem("schoolType");

    this.classId = sessionStorage.getItem("examAchievement-classExamManage-classId");
    this.examItemId = sessionStorage.getItem("examAchievement-classExamManage-examItemId");
    this.yearSemester = sessionStorage.getItem("examAchievement-classExamManage-yearSemester");
    this.schoolId = sessionStorage.getItem("schoolId");
    vm.getClassExamInfo(sessionStorage.getItem("examAchievement-classExamManage-classId"),
    sessionStorage.getItem("examAchievement-classExamManage-examItemId"),
     sessionStorage.getItem("examAchievement-classExamManage-yearSemester")
    );
    vm.getClassExamList(sessionStorage.getItem("examAchievement-classExamManage-classId"),
    sessionStorage.getItem("examAchievement-classExamManage-examItemId"),
     sessionStorage.getItem("examAchievement-classExamManage-yearSemester"));
  }
};
</script>
