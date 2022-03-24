<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{gradeName}}、{{studentClass}}班 - {{studentName}} - {{registerCode}}<font style="color:red;">（{{testStatus?"已完成测试":"未完成测试"}}）</font></h2>
    </div>
   <Card>
        <Form :label-width="50" class="function">
          <FormItem>
            <Row>
              <Col span="6">
                <font style="margin-left:" v-if="examUnit=='分.秒'">{{examItemName}}({{examUnit}}):{{Number(resultNew)%60>0?(Math.floor(Number(resultNew)/60)+'分'+(Number(resultNew)%60)+'秒'):Number(resultNew)/60+'分'}}</font>
                 <font style="margin-left:" v-if="examUnit!='分.秒'">{{examItemName}}({{examUnit}}):{{resultNew}}</font>
                <font style="margin-left:30px;">得分：{{examScore}}</font>
                <font style="margin-left:20px;">等级：{{scoreLevel=="1"?"优秀":scoreLevel=="2"?"良好":scoreLevel=="3"?"及格":scoreLevel=="4"?"不及格":""}}</font>
              </Col>
              <Col span="3">
                <Input v-model="resultValue" placeholder="成绩" :maxlength="11"/>
              </Col>
              <Col span="3">
                <Input v-model="score" placeholder="录入分" :maxlength="11"/>
              </Col>
              <Col span="3">
                <Select v-model="scoreLevel" style="width:200px">
                  <Option
                    v-for="item in levelList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.name }}</Option>
                </Select>
              </Col>
              <Col span="2">
                <Button
                  style="margin-left:10px;"
                  @click="submit"
                  type="success"
                >保存</Button>
              </Col>
            </Row>
            <Row>
              <Col span="10">
                历史值
                <Table border :columns="resultColumns" :data="resultData"></Table>
              </Col>
            </Row>
          </FormItem>
      </Form>
  </Card>
      <div style="margin-top:20px;padding-left:45%;padding-bottom:50px;">
        <Button
          @click="pageToClassList"
          style="float:left; margin-right:50px;width:100px"
          type="success"
        >返回</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "teacherDetail",
  data() {
    return {
      studentName: "",
      registerCode: "",
      testStatus: "",
      schoolName: "",
      gradeName: "",
      studentClass: "",
      examItemName: "",
      examUnit: "",
      resultValue:'',
      examScore:'',
      scoreLevel:'',
      resultNew:'',
      resultData: [],
      resultColumns: [
        {
          title: "成绩",
          key: "resultValue",
          align: "center",
          // render: (h, params) => {
          //   var vm=this;
          //   let data=params.row.examResult;

          //   if(vm.examUnit && vm.examUnit == "分.秒"){
          //     data=Number(data)%60>0?(Math.floor(Number(data)/60)+'分'+(Number(data)%60)+'秒'):Number(data)/60+'分'
          //   }else{
          //     data=vm.examUnit != '99' ? params.row.resultValue + vm.examUnit : params.row.resultValue
          //   }

          //   if (!vm.examResult) {
          //     return h("div", [h("span", "-")]);
          //   }else {
          //     return h("div", [
          //       h(
          //         "span",
          //         data
          //       )
          //     ]);
          //   }
          // }
        },
        {
          title: "录入时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "录入老师",
          key: "teacherName",
          align: "center"
        }
      ],
      	levelList:[
        {
          name:"优秀",
          value:"1"
        },
        {
          name:"良好",
          value:"2"
        },
        {
          name:"及格",
          value:"3"
        },
        {
          name:"不及格",
          value:"4"
        },
      ],
       scoreLevel:'1',
      score:''
    };
  },
  methods: {
    pageToClassList() {
      //返回
      this.$router.go(-1);
    },
    getExamItemInfo(examItemId) {
      var vm = this;
      this.$axios
        .get("/v1/studentexam/getExamItemInfo?examItemId=" + examItemId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.examUnit =
              data.examUnit == "99" ? "无计算标准-人工打分值" : data.examUnit;
          } else {
            if (res.data.code > 39999) {
              // this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getHistoryList(studentId,examItemId,yearSemester) {
      var vm = this;
      this.$axios
        .get("/v1/studentexam/getHistoryList?studentId="+studentId+"&examItemId="+examItemId+"&yearSemester=" + yearSemester)
        .then(res => {
          if (res.data.code == 10000) {
            vm.resultData = res.data.response;
          } else {
            if (res.data.code > 39999) {
              // this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getLastResult(studentId,examItemId,yearSemester) {
      var vm = this;
      this.$axios
        .get("/v1/studentexam/getLastResult?studentId="+studentId+"&examItemId="+examItemId+"&yearSemester=" + yearSemester)
        .then(res => {
          if (res.data.code == 10000) {
            vm.examScore = res.data.response.score;
             vm.scoreLevel = res.data.response.scoreLevel;
             vm.resultNew=res.data.response.examResult
          } else {
            if (res.data.code > 39999) {
              // this.$Message.info(res.data.msg);
            }
          }
        });
    },
    search(){
      var vm=this;
      vm.getHistoryList(vm.studentId,vm.examItemId,vm.yearSemester);
      vm.getLastResult(vm.studentId,vm.examItemId,vm.yearSemester);
      vm.resultValue='';
    },
    submit() {
      var vm = this;
      let data = {
        examItemId: vm.examItemId,
        yearSemester: vm.yearSemester,
        resultValue: vm.resultValue,
        studentId: vm.studentId,
        score:vm.score,
        scoreLevel:vm.scoreLevel
      };
      this.$axios
        .post("/v1/studentexam/addStudentExam", data)
        .then(function(res) {
          if (res.data.code == 10000) {

            if(res.data.response.code==1){
                vm.$Message.info("操作成功！");
                vm.search();
            }else{
              vm.$Message.info(res.data.response.msg);
            }
            
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    }
  },
  mounted() {
    var vm = this;
    vm.schoolType = sessionStorage.getItem("schoolType");
    vm.studentId = sessionStorage.getItem(
      "classExamManage-studentExamDetail-studentId"
    );
    vm.classId = sessionStorage.getItem(
      "classExamManage-studentExamDetail-classId"
    );
    vm.examItemId = sessionStorage.getItem(
      "classExamManage-studentExamDetail-examItemId"
    );
    vm.yearSemester = sessionStorage.getItem(
      "classExamManage-studentExamDetail-yearSemester"
    );
    vm.schoolName = sessionStorage.getItem(
      "classExamManage-studentExamDetail-schoolName"
    );
    vm.gradeName = sessionStorage.getItem(
      "classExamManage-studentExamDetail-gradeName"
    );
    vm.studentClass = sessionStorage.getItem(
      "classExamManage-studentExamDetail-studentClass"
    );
    vm.studentName = sessionStorage.getItem(
      "classExamManage-studentExamDetail-studentName"
    );
    vm.registerCode = sessionStorage.getItem(
      "classExamManage-studentExamDetail-registerCode"
    );
    vm.testStatus =
      sessionStorage.getItem("classExamManage-studentExamDetail-examResult") ==
      "1"
        ? true
        : false;
    vm.examItemName = sessionStorage.getItem(
      "classExamManage-studentExamDetail-examItemName"
    );

    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.getExamItemInfo(
      sessionStorage.getItem("classExamManage-studentExamDetail-examItemId")
    );
    vm.getHistoryList(sessionStorage.getItem(
      "classExamManage-studentExamDetail-studentId"
    ),sessionStorage.getItem(
      "classExamManage-studentExamDetail-examItemId"
    ),
    sessionStorage.getItem(
      "classExamManage-studentExamDetail-yearSemester"
    )
    
    );
    vm.getLastResult(sessionStorage.getItem(
      "classExamManage-studentExamDetail-studentId"
    ),sessionStorage.getItem(
      "classExamManage-studentExamDetail-examItemId"
    ),
    sessionStorage.getItem(
      "classExamManage-studentExamDetail-yearSemester"
    )
    
    );
  },
  watch: {}
};
</script>