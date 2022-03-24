<style scoped>
.width120 {
  width: 120px;
}
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">家长端成绩推送</h2>
      <!-- <Button type="success" @click="goMyPage('1')">跳转-体测数据报送</Button>
      <Button type="success" @click="goMyPage('2')">跳转-原来的教育局上报</Button> -->
    </div>
    <div>
      <div>
        <Card>
          <div class="top-search">
              <div class="left-input">
                    <div style="margin:5px 20px;">
                        <span>年<span style="visibility:hidden">空</span>级：</span>
                        <Select v-model="grade" class="width120">
                            <Option
                            v-for="item in schoolGradeList"
                            :value="item.grade"
                            :key="item.grade"
                            >{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>班<span style="visibility:hidden">空</span>级：</span>
                        <Select v-model="studentClass" class="width120">
                            <Option
                            v-for="item in classList"
                            :value="item.value"
                            :key="item.value"
                            >{{ item.label }}</Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>性<span style="visibility:hidden">空</span>别：</span>
                        <Select v-model="gender" class="width120">
                            <Option
                            v-for="item in genderType"
                            :value="item.typeId"
                            :key="item.typeId"
                            >{{ item.typeName }}</Option>
                        </Select>
                    </div>
                    <div style="margin:5px 20px;">
                        <span>姓<span style="visibility:hidden">空</span>名：</span>
                        <Input v-model="studentName" placeholder="学生姓名" class="width120" />
                    </div>
                    <div style="margin:5px 20px;">
                        <span>学籍号：</span>
                        <Input v-model="registerCode" placeholder="学生学籍号" class="width120" />
                    </div>
                </div>
                <div class="right-btns">
                    <Button v-on:click="searchInfo()" type="success">查询</Button>
                    <Button v-on:click="restore()" type="success">重置查询条件</Button>
                    <Button :disabled="firstSendTf" v-on:click="parentReport" type="success">推送成绩单给家长</Button>
                    <Button :disabled="!firstSendTf" v-on:click="toSendChange" type="success">成绩变动学生报送</Button>
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
     <Modal
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
      </Modal>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
        noticeModal:false,
        firstSendTf:false,
      schoolId: "",
      gender: "",
      registerCode: "",
      studentName: "",
      grade: "",
      schoolGradeList: [],
      studentClass: "",
      classList: [
        {
          value: 999,
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
      primaryList: [
        { grade: 999, label: "全部" },
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      middleList: [
        { grade: 999, label: "全部" },
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      genderType: [
        {
          typeId: "999",
          typeName: "全部",
        },
        {
          typeId: "1",
          typeName: "男",
        },
        {
          typeId: "2",
          typeName: "女",
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
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100,
        },
        {
          title: "体质测试得分",
          key: "height",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if (row.exemptType) {
              if (row.exemptType == "2") {
                text = "<span>80(免试)</span>";
              } else {
                text = "<span>70(免试)</span>";
              }
            } else {
              if (row.testScore==null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + row.testScore.toFixed(2) + "</span>";
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
            if (row.testExempt == "2") {
              if (row.exemptType == "2") {
                text = "<span>良好</span>";
              } else {
                text = "<span>及格</span>";
              }
            } else {
              if (row.testScore==null) {
                text = "<span>--</span>";
              } else {
                let aa =
                  row.testLevel == "1"
                    ? "优秀"
                    : row.testLevel == "2"
                    ? "良好"
                    : row.testLevel == "3"
                    ? "及格"
                    : row.testLevel == "4"
                    ? "不及格"
                    : "--";
                text = "<span>" + aa + "</span>";
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
          title: "学习态度",
          key: "vitalCapacityValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if (row.learnExempt == "2") {
              if (row.exemptType == "2") {
                text = "<span>80(免试)</span>";
              } else {
                text = "<span>70(免试)</span>";
              }
            } else {
              if (row.learnScore == null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.learnScore/100).toFixed(2) + "</span>";
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
            if (row.healthExempt == "2") {
              if (row.exemptType == "2") {
                text = "<span>80(免试)</span>";
              } else {
                text = "<span>70(免试)</span>";
              }
            } else {
              if (row.healthScore== null ) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.healthScore/100).toFixed(2) + "</span>";
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
            if (row.actionExempt == "1") {
              if (row.actionScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.actionScore/100).toFixed(2) + "(部分免试)</span>";
              }
            } else if (row.actionExempt == "2") {
              if (row.actionScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.actionScore/100).toFixed(2) + "(免试)</span>";
              }
            } else {
              if (row.actionScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.actionScore/100).toFixed(2) + "</span>";
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
            if (row.staminaExempt == "1") {
              if (row.staminaScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.staminaScore/100).toFixed(2) + "(部分免试)</span>";
              }
            } else if (row.staminaExempt == "2") {
              if (row.staminaScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.staminaScore/100).toFixed(2) + "(免试)</span>";
              }
            } else {
              if (row.staminaScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.staminaScore/100).toFixed(2) + "</span>";
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
            if (row.healthExempt == "2") {
              if (row.exemptType == "2") {
                text = "<span>80(免试)</span>";
              } else {
                text = "<span>70(免试)</span>";
              }
            } else {
              if (row.homeworkScore == null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.homeworkScore/100).toFixed(2) + "</span>";
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

            if (row.subjectScore== null) {
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
      second: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth:100
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
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100,
        },
        {
          title: "学习态度",
          key: "vitalCapacityValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if (row.learnExempt == "2") {
              if (row.exemptType == "2") {
                text = "<span>80(免试)</span>";
              } else {
                text = "<span>70(免试)</span>";
              }
            } else {
              if (row.learnScore == null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.learnScore/100).toFixed(2) + "</span>";
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
            if (row.healthExempt == "2") {
              if (row.exemptType == "2") {
                text = "<span>80(免试)</span>";
              } else {
                text = "<span>70(免试)</span>";
              }
            } else {
              if (row.healthScore== null ) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.healthScore/100).toFixed(2) + "</span>";
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
            if (row.actionExempt == "1") {
              if (row.actionScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.actionScore/100).toFixed(2) + "(部分免试)</span>";
              }
            } else if (row.actionExempt == "2") {
              if (row.actionScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.actionScore/100).toFixed(2) + "(免试)</span>";
              }
            } else {
              if (row.actionScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.actionScore/100).toFixed(2) + "</span>";
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
            if (row.staminaExempt == "1") {
              if (row.staminaScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.staminaScore/100).toFixed(2) + "(部分免试)</span>";
              }
            } else if (row.staminaExempt == "2") {
              if (row.staminaScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.staminaScore/100).toFixed(2) + "(免试)</span>";
              }
            } else {
              if (row.staminaScore== null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.staminaScore/100).toFixed(2) + "</span>";
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
            if (row.healthExempt == "2") {
              if (row.exemptType == "2") {
                text = "<span>80(免试)</span>";
              } else {
                text = "<span>70(免试)</span>";
              }
            } else {
              if (row.homeworkScore == null) {
                text = "<span style='color:red'>未完成</span>";
              } else {
                text = "<span>" + (row.homeworkScore/100).toFixed(2) + "</span>";
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

            if (row.subjectScore== null) {
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
    // goMyPage(type) {
    //   if (type == 1) {
    //    this.$router.push({name: 'physicalTestReport'})
    //   } else {
    //    this.$router.push({name: 'physicalTestReport'})
    //   }
    // },
      cancel(){
          var vm=this;
          vm.noticeModal=false;
      },
      preReport(){
          var vm=this;
          vm.noticeModal=true;
      },
      toSendChange(){
          var vm = this
    //   sessionStorage.setItem('schoolTestDetail-importStudentInfo-taskType',"3")
      this.$router.push({ name: 'parentReportChangeStudent' })
      },
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    restore() {
      var vm = this;
      vm.grade = 999;
      vm.pageNum = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = 999;
      vm.gender = "";
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
      sessionStorage.setItem("parentReport-grade", vm.grade);
      sessionStorage.setItem("parentReport-studentClass", vm.studentClass);
      sessionStorage.setItem("parentReport-gender", vm.gender);
      sessionStorage.setItem("parentReport-registerCode", vm.registerCode);
      sessionStorage.setItem("parentReport-studentName", vm.studentName);
      sessionStorage.setItem("parentReport-pageNum", vm.pageNum);
      sessionStorage.setItem("parentReport-pageSize", vm.pageSize);
      vm.getParentReportStudentDetailList();
      vm.countParentReportStudentDetail();
    },
    getParentReportStatus() {
      this.$axios.get("/v1/dataReport/getParentReportStatus").then((res) => {
        if (res.data.code == 10000) {
            if(res.data.response.data==0){
                this.firstSendTf=false
            }else{
                this.firstSendTf=true
            }
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    parentReport() {
      this.$axios.get("/v1/dataReport/parentReport?reportType=1").then((res) => {
        if (res.data.code == 10000) {
            if(res.data.response.code=="2"){
                this.noticeModal=true;
            }else{
                this.$Message.info("上报成功");
                this.search();
                 vm.getParentReportStatus();
            }
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    getParentReportStudentDetailList() {
      this.$axios
        .get(
          "/v1/dataReport/getParentReportStudentDetailList?gender=" +
            (this.gender == "999" ? "" : this.gender) +
            "&registerCode=" +
            this.registerCode +
            "&grade=" +
            (this.grade == "999" ? "" : this.grade) +
            "&pageNo=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize +
            "&studentClass=" +
            (this.studentClass == "999" ? "" : this.studentClass) +
            "&studentName=" +
            this.studentName
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
    countParentReportStudentDetail() {
      this.$axios
        .get(
          "/v1/dataReport/countParentReportStudentDetail?gender=" +
            (this.gender == "999" ? "" : this.gender) +
            "&registerCode=" +
            this.registerCode +
            "&grade=" +
            (this.grade == "999" ? "" : this.grade) +
            "&studentClass=" +
            (this.studentClass == "999" ? "" : this.studentClass) +
            "&studentName=" +
            this.studentName
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
    let schoolDistrict = sessionStorage.getItem("schoolDistrict");

    let yearSemester=sessionStorage.getItem('yearSemester');
    if( Number(yearSemester)%2==1){
        vm.resultColumns=vm.second
    }else{
      vm.resultColumns = vm.first;
    }

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

    if (sessionStorage.getItem("parentReport-grade")) {
      this.grade = Number(
        sessionStorage.getItem("parentReport-grade")
      );
    } else {
      vm.grade = vm.schoolGradeList[0].grade;
    }

    if (sessionStorage.getItem("parentReport-studentClass")) {
      vm.studentClass = isNaN(
        Number(sessionStorage.getItem("parentReport-studentClass"))
      )
        ? ""
        : Number(sessionStorage.getItem("parentReport-studentClass"));
    } else {
      vm.studentClass = vm.classList[0].value;
    }

    if (sessionStorage.getItem("parentReport-gender")) {
      this.gender = sessionStorage.getItem("parentReport-gender");
    } else {
      this.gender = "999";
    }

    if (sessionStorage.getItem("parentReport-registerCode")) {
      this.registerCode = sessionStorage.getItem("parentReport-registerCode");
    }

    if (sessionStorage.getItem("parentReport-studentName")) {
      this.studentName = sessionStorage.getItem("parentReport-studentName");
    }

    if (sessionStorage.getItem("parentReport-pageNum")) {
      this.pageNum = Number(sessionStorage.getItem("parentReport-pageNum"));
    }

    if (sessionStorage.getItem("parentReport-pageSize")) {
      this.pageSize = Number(sessionStorage.getItem("parentReport-pageSize"));
    }

    this.schoolId = sessionStorage.getItem("schoolId");
    this.search();
    vm.getParentReportStatus();
  },
};
</script>
