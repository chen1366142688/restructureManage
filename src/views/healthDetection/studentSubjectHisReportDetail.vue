<style scoped>
.mar-r40 {
  margin-right: 40px;
}
.width120 {
  width: 120px;
}
@media screen and (max-width: 1650px) {
  .mar-r40 {
    margin-right: 15px;
  }
  .width120 {
    width: 100px;
  }
}
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{title}}</h2>
    </div>
    <div>
      <div>
        <Card>
          <div class="top-search">
              <div class="left-input">
                    <div style="margin:5px 20px;">
                        <span style="" >年级：</span>
                        <Select v-model="gradeCode" class="width120">
                            <Option v-for="item in gradeCodeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span >班级：</span>
                        <Select v-model="classCode" class="width120">
                            <Option v-for="(item,index) in classCodeList" :value="item.classCode" :key="item.classCode">{{ item.className }}</Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>性别：</span>
                        <Select v-model="gender" class="width120">
                            <Option
                            v-for="item in genderType"
                            :value="item.typeId"
                            :key="item.typeId"
                            >{{ item.typeName }}</Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>姓名：</span>
                        <Input v-model="studentName" placeholder="学生姓名" class="width120" />
                    </div>
                    <div style="margin:5px 20px;">
                        <span>学籍号：</span>
                        <Input v-model="registerCode" placeholder="学生学籍号" class="width120" />
                    </div>
                </div>
              <div class="right-btns">
                    <Button v-on:click="searchInfo()" type="success">查询</Button>
                    <Button v-on:click="toImportStudent" type="success">上报学生导入</Button>
                    <Button v-on:click="createReportStudentBySchool" type="success">按学生信息生成</Button>
                    <Button v-on:click="restore()" type="success">重置查询条件</Button>
                    <Button v-on:click="pageToList" type="success">返回</Button>
              </div>
          </div>
        </Card>
      </div>
      <Card style="margin-top:20px;">
        <div style="font-size:18px;height:40px;">数据明细</div>
        <div>
          <Row>
            <div>
              <Table border width="100%" max-height="570" :columns="resultColumns" :data="resultData"></Table>
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
      </Card>
    </div>
     <!-- <Modal
              v-model="noticeModal"
              title="提醒"
              width="400px"
      >
        <Row style="margin-top: 10px;">
          <Col span="24">
            <span style="margin-left: 20px;">请先将数据上报到教育局端，然后再推送给家长。</span>
          </col>
          </Row>
        <div slot="footer">
            <Button type="text" size="large" @click="cancel">知道了</Button>
        </div>
      </Modal> -->
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolId: "",
      gender: "",
      yearSemester:'',
      title:'',
      registerCode: "",
      studentName: "",
      gradeCode: "",
      gradeCodeList:[],
      primaryList: [
        {
          grade: '999',
          label: '全部'
        },
        {
          grade: '11',
          label: '一年级'
        },
        {
          grade: '12',
          label: '二年级'
        },
        {
          grade: '13',
          label:'三年级'
        },
        {
          grade: '14',
          label: '四年级'
        },
        {
          grade: '15',
          label: '五年级'
        },
        {
          grade: '16',
          label: '六年级'
        }
      ],
      middleList: [
        {
          grade: "999",
          label: '全部'
        },
        {
          grade: '21',
          label: '七年级'
        },
        {
          grade: '22',
          label: '八年级'
        },
        {
          grade: '23',
          label: '九年级'
        }
      ],
      classCode: '',
      classCodeList:[],
      genderType: [
        {
          typeId: "999",
          typeName: "全部",
        },
        {
          typeId: "1",
          typeName: "男生",
        },
        {
          typeId: "2",
          typeName: "女生",
        },
      ],
      first: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" ? "男" : "女"),
            ]);
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          minWidth:100,
          render: (h, params) => {
              let text=params.row.className;
              if(params.row.startSchool){
                  text=text+"("+params.row.startSchool+"级)"
              }
            return h("div", [
              h("span", text),
            ]);
          },
        },
        {
          title: "学习态度",
          key: "vitalCapacityValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.learnScore && row.learnScoreOld){
                if(row.learnScore!=row.learnScoreOld){
                text = "<span style='color:red'>"+(row.learnScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.learnScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.learnScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.learnScore){
                    text = "<span>"+(row.learnScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }

            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "健康教育知识",
          key: "runFiftyValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.healthScore && row.healthScoreOld){
                if(row.healthScore!=row.healthScoreOld){
                text = "<span style='color:red'>"+(row.healthScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.healthScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.healthScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.healthScore){
                    text = "<span>"+(row.healthScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "运动技能",
          key: "sitAndReachValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.actionScore && row.actionScoreOld){
                if(row.actionScore!=row.actionScoreOld){
                text = "<span style='color:red'>"+(row.actionScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.actionScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.actionScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.actionScore){
                    text = "<span>"+(row.actionScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "体能",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.staminaScore && row.staminaScoreOld){
                if(row.staminaScore!=row.staminaScoreOld){
                text = "<span style='color:red'>"+(row.staminaScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.staminaScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.staminaScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.staminaScore){
                    text = "<span>"+(row.staminaScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "课后作业",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.homeworkScore && row.homeworkScoreOld){
                if(row.homeworkScore!=row.homeworkScoreOld){
                text = "<span style='color:red'>"+(row.homeworkScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.homeworkScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.homeworkScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.homeworkScore){
                    text = "<span>"+(row.homeworkScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }

            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "学科评价得分",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";

            if (!row.subjectScore) {
              text = "<span style='color:red'>未完成</span>";
            } else {
              text = "<span>" + (row.subjectScore/100).toFixed(2) + "</span>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "学科评价等级",
          key: "resultValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if (!row.subjectScore) {
              text = "<span>--</span>";
            } else {
              let aa =
                row.subjectLevel == "1"
                  ? "优秀"
                  : row.subjectLevel == "2"
                  ? "良好"
                  : row.subjectLevel == "3"
                  ? "及格"
                  : row.subjectLevel == "4"
                  ? "不及格"
                  : "--";
              text = "<span>" + aa + "</span>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "体质测试得分",
          key: "height",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.testScore && row.testScoreOld){
                if(row.testScore/100 !=row.testScoreOld){
                text = "<span style='color:red'>"+(row.testScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.testScoreOld).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.testScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.testScore){
                    text = "<span>"+(row.testScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "体质测试等级",
          key: "weight",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.testScore){
                let aa =
                  (row.testScore/100).toFixed(2) >=90
                    ? "优秀"
                    : (row.testScore/100).toFixed(2) >=80
                    ? "良好"
                    : (row.testScore/100).toFixed(2) >=60
                    ? "及格"
                    : (row.testScore/100).toFixed(2) >=0
                    ? "不及格"
                    : "--";
                text = "<span>" + aa + "</span>";
            }else{
                text = "<span></span>";
            }

            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
      ],
      second: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth:100,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" || params.row.gender == "男" ? "男" : "女"),
            ]);
          },
        },
        {
          title: "班级",
          key: "className",
          align: "center",
          minWidth:100,
          render: (h, params) => {
              let text=params.row.className;
              if(params.row.startSchool){
                  text=text+"("+params.row.startSchool+"级)"
              }
            return h("div", [
              h("span", text),
            ]);
          },
        },
        {
          title: "学习态度",
          key: "vitalCapacityValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.learnScore && row.learnScoreOld){
                if(row.learnScore!=row.learnScoreOld){
                text = "<span style='color:red'>"+(row.learnScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.learnScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.learnScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.learnScore){
                    text = "<span>"+(row.learnScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }

            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "健康教育知识",
          key: "runFiftyValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.healthScore && row.healthScoreOld){
                if(row.healthScore!=row.healthScoreOld){
                text = "<span style='color:red'>"+(row.healthScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.healthScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.healthScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.healthScore){
                    text = "<span>"+(row.healthScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "运动技能",
          key: "sitAndReachValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.actionScore && row.actionScoreOld){
                if(row.actionScore!=row.actionScoreOld){
                text = "<span style='color:red'>"+(row.actionScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.actionScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.actionScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.actionScore){
                    text = "<span>"+(row.actionScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "体能",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.staminaScore && row.staminaScoreOld){
                if(row.staminaScore!=row.staminaScoreOld){
                text = "<span style='color:red'>"+(row.staminaScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.staminaScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.staminaScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.staminaScore){
                    text = "<span>"+(row.staminaScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "课后作业",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.homeworkScore && row.homeworkScoreOld){
                if(row.homeworkScore!=row.homeworkScoreOld){
                text = "<span style='color:red'>"+(row.homeworkScore/100).toFixed(2)+"</span>"+"<span>(原"+(row.homeworkScoreOld/100).toFixed(2)+")</span>";
                }else{
                    text = "<span>"+(row.homeworkScore/100).toFixed(2)+"</span>";
                }
            }else{
                if(row.homeworkScore){
                    text = "<span>"+(row.homeworkScore/100).toFixed(2)+"</span>";
                }else{
                    text = "<span></span>";
                }
            }

            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "学科评价得分",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";

            if (!row.subjectScore) {
              text = "<span style='color:red'>未完成</span>";
            } else {
              text = "<span>" + (row.subjectScore/100).toFixed(2) + "</span>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "学科评价等级",
          key: "resultValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if (!row.subjectScore) {
              text = "<span>--</span>";
            } else {
              let aa =
                row.subjectLevel == "1"
                  ? "优秀"
                  : row.subjectLevel == "2"
                  ? "良好"
                  : row.subjectLevel == "3"
                  ? "及格"
                  : row.subjectLevel == "4"
                  ? "不及格"
                  : "--";
              text = "<span>" + aa + "</span>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
      ],
      resultColumns: [],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
      cancel(){
          var vm=this;
          vm.noticeModal=false;
      },
      preReport(){
          var vm=this;
          vm.noticeModal=true;
      },
      toSendChange(){

      },
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    restore() {
      var vm = this;
      vm.gradeCode = '999';
      vm.pageNum = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.classCode = '999';
      vm.gender = "999";
      vm.studentName = "";
      vm.search();
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

    searchInfo() {
      this.pageNum = 1;
      this.search();
    },

    search() {
      var vm = this;
      sessionStorage.setItem('reportStudentManage-studentName',vm.studentName);
      sessionStorage.setItem('reportStudentManage-gradeCode',vm.gradeCode);
      sessionStorage.setItem('reportStudentManage-gender',vm.gender);
      sessionStorage.setItem('reportStudentManage-classCode',vm.classCode);
      sessionStorage.setItem('reportStudentManage-registerCode',vm.registerCode);
      sessionStorage.setItem('reportStudentManage-pageNo',vm.pageNo);
      sessionStorage.setItem('reportStudentManage-pageSize',vm.pageSize);
      vm.getEducationReportHisStudentDetailList();
      vm.countEducationReportHisStudentDetailList();
    },
    parentReport() {
      this.$axios.get("/v1/dataReport/parentReport?reportType=1").then((res) => {
        if (res.data.code == 10000) {
            if(res.data.response.code=="2"){
                this.noticeModal=true;
            }else{
                this.$Message.info("上报成功");
            }
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    getEducationReportHisStudentDetailList() {
      this.$axios
        .get(
          "/v1/dataReport/getEducationReportHisStudentDetailList?gender=" +
            (this.gender == "999" ? "" : this.gender) +
            "&registerCode=" +
            this.registerCode +
            "&gradeCode=" +
            (this.gradeCode == "999" ? "" : this.gradeCode) +
            "&pageNo=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize +
            "&classCode=" +
            (this.classCode == "999" ? "" : this.classCode) +
            "&studentName=" +
            this.studentName+'&yearSemester='+this.yearSemester
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    countEducationReportHisStudentDetailList() {
      this.$axios
        .get(
          "/v1/dataReport/countEducationReportHisStudentDetailList?gender=" +
            (this.gender == "999" ? "" : this.gender) +
            "&registerCode=" +
            this.registerCode +
            "&gradeCode=" +
            (this.gradeCode == "999" ? "" : this.gradeCode) +
            "&classCode=" +
            (this.classCode == "999" ? "" : this.classCode) +
            "&studentName=" +
            this.studentName+'&yearSemester='+this.yearSemester
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
    createReportStudentBySchool(){
        var vm = this
      this.$axios
              .get('/v1/dataReport/createReportStudentBySchool?schoolId=1&yearSemester='+vm.yearSemester+'&wasNow=1')
              .then(res => {
                if (res.data.code == 10000) {
                   vm.$Message.info(res.data.msg)
                   vm.search()
                } else {
                  if (res.data.code > 39999) {
                    vm.$Message.info(res.data.msg)
                  }
                }
              })
    },
    toImportStudent() {
      var vm = this
      sessionStorage.setItem('studentSubjectHisReportDetail-importStudentInfo-yearSemester',vm.yearSemester)
      sessionStorage.setItem('schoolTestDetail-importStudentInfo-taskType',"3")
      this.$router.push({ name: 'importStudentInfo' })
    },
    getReportStudentClassCodeList(gradeCode,type){
      var vm = this
      this.$axios
              .get('/v1/dataReport/getReportStudentClassCodeList?schoolId=1&gradeCode='+gradeCode+'&yearSemester='+vm.yearSemester)
              .then(res => {
                  this.classCodeList=[]
                if (res.data.code == 10000) {
                    let data= res.data.response;
                    if(type=="1"){
                        let all= {
                             classCode:'999',
                             className:'全部',
                            };
                           this.classCodeList.push(all);
                           for(let i=0;i<data.length;i++){
                             data[i].className=Number(data[i].classCode.substring(data[i].classCode.length-2,data[i].classCode.length))+"班"
                           }
                        this.classCodeList =this.classCodeList.concat(data)
                        this.classCode="999"
                    }else{
                        this.classCodeListChange =data
                    }

                } else {
                  if (res.data.code > 39999) {
                    vm.$Message.info(res.data.msg)
                  }
                }
              })
    },
    paramsCheck(){
        var vm=this;
        vm.yearSemester=Number(sessionStorage.getItem('educationHistoryReport-studentSubjectHisReportDetail-yearSemester'));
        console.log(vm.yearSemester)

        if(vm.yearSemester%2==1){
            vm.title=(vm.yearSemester-9+"").substring(0,4)+"第二学期"
            vm.resultColumns = vm.second;
        }else{
            vm.title=(vm.yearSemester+"").substring(0,4)+"第一学期"
            vm.resultColumns = vm.first;
        }

        let studentName=sessionStorage.getItem('reportStudentManage-studentName');
        let gradeCode=  sessionStorage.getItem('reportStudentManage-gradeCode');
        let gender=  sessionStorage.getItem('reportStudentManage-gender');
        let classCode=  sessionStorage.getItem('reportStudentManage-classCode');
        let registerCode=  sessionStorage.getItem('reportStudentManage-registerCode');
        let pageNo=  sessionStorage.getItem('reportStudentManage-pageNo');
        let pageSize=  sessionStorage.getItem('reportStudentManage-pageSize');

        if(studentName != null && studentName != undefined && studentName != "" ){
            vm.studentName = studentName;
        }
        if(gradeCode != null && gradeCode != undefined && gradeCode != "" ){
            vm.gradeCode = gradeCode;
        }else{
            vm.gradeCode='999'

        }
        if(gender != null && gender != undefined && gender != "" ){
            vm.gender = gender;
        }else{
            vm.gender='999'
        }
        if(classCode != null && classCode != undefined && classCode != "" ){
            vm.classCode = classCode;
        }else{
            vm.classCode='999'
        }
        if(registerCode != null && registerCode != undefined && registerCode != "" ){
            vm.registerCode = registerCode;
        }
      if(pageNo != null && pageNo != undefined && pageNo > 0){
        vm.pageNo = Number(pageNo);;
      }
       if(pageSize != null && pageSize != undefined && pageSize > 0){
        vm.pageSize = Number(pageSize);;
      }

        this.search();
    }
  },
  watch: {
    gradeCode:function(){
       var vm=this;
      //  vm.classCode='全部';
       if(vm.gradeCode && vm.gradeCode != '999'){
           vm.getReportStudentClassCodeList(vm.gradeCode,"1")
       }else{
           let   data=[
                            {
                             classCode:'999',
                             className:'全部',
                            }
                        ]
                  this.classCodeList =data
                  this.classCode="999"
       }
   },
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm = this;
    let schoolType = sessionStorage.getItem("schoolType");
    this.schoolId = sessionStorage.getItem("schoolId");

    if (schoolType) {
     if ('2' == schoolType) {
          vm.gradeCodeList = vm.gradeCodeList.concat(vm.primaryList)
      }
      if ('3' == schoolType) {
          vm.gradeCodeList = vm.gradeCodeList.concat(vm.middleList)
      }
    }
    vm.paramsCheck();

  },
};
</script>
