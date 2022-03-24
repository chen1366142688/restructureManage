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
      <h2 style="margin-top:15px;margin-bottom:13px;">成绩变动学生</h2>
    </div>
    <div>
      <div>
        <Card>
          <div class="top-search">
            <div class="left-input">
              <div style="margin:5px 10px;">
                <span>年级：</span>
                <Select v-model="grade" class="width120">
                  <Option
                    v-for="item in schoolGradeList"
                    :value="item.grade"
                    :key="item.grade"
                  >{{ item.label }}</Option>
                </Select>
              </div>
              <div style="margin:5px 10px;">
                <span>班级：</span>
                <Select v-model="studentClass" class="width120">
                  <Option
                    v-for="item in classList"
                    :value="item.value"
                    :key="item.value"
                  >{{ item.label }}</Option>
                </Select>
              </div>
              <div style="margin:5px 10px;">
                <span>性别：</span>
                <Select v-model="gender" class="width120">
                  <Option
                    v-for="item in genderType"
                    :value="item.typeId"
                    :key="item.typeId"
                  >{{ item.typeName }}</Option>
                </Select>
              </div>
              <div style="margin:5px 10px;" >
                <span>姓名：</span>
                <Input v-model="studentName" placeholder="学生姓名" class="width120" />
              </div>
              <div style="margin:5px 10px;">
                <span>学籍号：</span>
                <Input v-model="registerCode" placeholder="学生学籍号" class="width120" />
              </div>
            </div>
            <div class="right-btns">
              <Button  v-on:click="searchInfo()" type="success">查询</Button>
              <Button  v-on:click="restore()" type="success">重置查询条件</Button>
              <Button :disabled="firstSendTf" v-on:click="parentReport" type="success">推送变动学生成绩单给家长</Button>
              <Button   v-on:click="pageToList" type="success">返回</Button>
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
        firstSendTf:true,
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
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
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
        },
        {
          title: "体质测试得分",
          key: "height",
          align: "center",
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.testScore!=row.testScoreOld && row.testScore != null && row.testScoreOld != null){
              if(row.testScore != null){
                text = "<span style='color:red'>"+(row.testScore != null ?row.testScore:"")+"</span>"+"<span>(原"+(row.testScoreOld != null ?row.testScoreOld:"")+")</span>";
              }else{
                text = "<span>"+(row.testScoreOld != null ?row.testScoreOld:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.testScore != null ?row.testScore:row.testScoreOld != null ?row.testScoreOld:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.learnScore!=row.learnScoreOld && row.learnScore != null && row.learnScoreOld != null){
              if(row.learnScore != null){
                text = "<span style='color:red'>"+(row.learnScore != null ?row.learnScore/100:"")+"</span>"+"<span>(原"+(row.learnScoreOld != null ?row.learnScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.learnScoreOld != null ?row.learnScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.learnScore != null ?row.learnScore/100:row.learnScoreOld != null ?row.learnScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.healthScore!=row.healthScoreOld && row.healthScore != null && row.healthScoreOld != null){
              if(row.healthScore != null){
                text = "<span style='color:red'>"+(row.healthScore != null ?row.healthScore/100:"")+"</span>"+"<span>(原"+(row.healthScoreOld != null ?row.healthScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.healthScoreOld != null ?row.healthScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.healthScore != null ?row.healthScore/100:row.healthScoreOld != null ?row.healthScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.actionScore!=row.actionScoreOld && row.actionScore != null && row.actionScoreOld != null){
              if(row.actionScore != null){
                text = "<span style='color:red'>"+(row.actionScore != null ?row.actionScore/100:"")+"</span>"+"<span>(原"+(row.actionScoreOld != null ?row.actionScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.actionScoreOld != null ?row.actionScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.actionScore != null ?row.actionScore/100:row.actionScoreOld != null ?row.actionScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.staminaScore!=row.staminaScoreOld && row.staminaScore != null && row.staminaScoreOld != null){
              if(row.staminaScore != null){
                text = "<span style='color:red'>"+(row.staminaScore != null ?row.staminaScore/100:"")+"</span>"+"<span>(原"+(row.staminaScoreOld != null ?row.staminaScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.staminaScoreOld != null ?row.staminaScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.staminaScore != null ?row.staminaScore/100:row.staminaScoreOld != null ?row.staminaScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.homeworkScore!=row.homeworkScoreOld && row.homeworkScore != null && row.homeworkScoreOld != null){
              if(row.homeworkScore != null){
                text = "<span style='color:red'>"+(row.homeworkScore != null ?row.homeworkScore/100:"")+"</span>"+"<span>(原"+(row.homeworkScoreOld != null ?row.homeworkScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.homeworkScoreOld != null ?row.homeworkScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.homeworkScore != null ?row.homeworkScore/100:row.homeworkScoreOld != null ?row.homeworkScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";

            if (!row.subjectScore) {
              text = "<span style='color:red'>未完成</span>";
            } else {
              text = "<span>" + row.subjectScore/100 + "</span>";
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
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
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
        },
        {
          title: "学习态度",
          key: "vitalCapacityValue",
          align: "center",
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.learnScore!=row.learnScoreOld && row.learnScore != null && row.learnScoreOld != null){
              if(row.learnScore != null){
                text = "<span style='color:red'>"+(row.learnScore != null ?row.learnScore/100:"")+"</span>"+"<span>(原"+(row.learnScoreOld != null ?row.learnScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.learnScoreOld != null ?row.learnScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.learnScore != null ?row.learnScore/100:row.learnScoreOld != null ?row.learnScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.healthScore!=row.healthScoreOld && row.healthScore != null && row.healthScoreOld != null){
              if(row.healthScore != null){
                text = "<span style='color:red'>"+(row.healthScore != null ?row.healthScore/100:"")+"</span>"+"<span>(原"+(row.healthScoreOld != null ?row.healthScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.healthScoreOld != null ?row.healthScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.healthScore != null ?row.healthScore/100:row.healthScoreOld != null ?row.healthScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.actionScore!=row.actionScoreOld && row.actionScore != null && row.actionScoreOld != null){
              if(row.actionScore != null){
                text = "<span style='color:red'>"+(row.actionScore != null ?row.actionScore/100:"")+"</span>"+"<span>(原"+(row.actionScoreOld != null ?row.actionScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.actionScoreOld != null ?row.actionScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.actionScore != null ?row.actionScore/100:row.actionScoreOld != null ?row.actionScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.staminaScore!=row.staminaScoreOld && row.staminaScore != null && row.staminaScoreOld != null){
              if(row.staminaScore != null){
                text = "<span style='color:red'>"+(row.staminaScore != null ?row.staminaScore/100:"")+"</span>"+"<span>(原"+(row.staminaScoreOld != null ?row.staminaScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.staminaScoreOld != null ?row.staminaScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.staminaScore != null ?row.staminaScore/100:row.staminaScoreOld != null ?row.staminaScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";
            if(row.homeworkScore!=row.homeworkScoreOld && row.homeworkScore != null && row.homeworkScoreOld != null){
              if(row.homeworkScore != null){
                text = "<span style='color:red'>"+(row.homeworkScore != null ?row.homeworkScore/100:"")+"</span>"+"<span>(原"+(row.homeworkScoreOld != null ?row.homeworkScoreOld/100:"")+")</span>";
              }else{
                text = "<span>"+(row.homeworkScoreOld != null ?row.homeworkScoreOld/100:"")+"</span>";
              }
            }else{
                text = "<span>"+(row.homeworkScore != null ?row.homeworkScore/100:row.homeworkScoreOld != null ?row.homeworkScoreOld/100:"")+"</span>";
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
          render: (h, params) => {
            let row = params.row;
            let text = "";

            if (!row.subjectScore) {
              text = "<span style='color:red'>未完成</span>";
            } else {
              text = "<span>" + row.subjectScore/100 + "</span>";
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
      sessionStorage.setItem("parentReportChangeStudent-grade", vm.grade);
      sessionStorage.setItem("parentReportChangeStudent-studentClass", vm.studentClass);
      sessionStorage.setItem("parentReportChangeStudent-gender", vm.gender);
      sessionStorage.setItem("parentReportChangeStudent-registerCode", vm.registerCode);
      sessionStorage.setItem("parentReportChangeStudent-studentName", vm.studentName);
      sessionStorage.setItem("parentReportChangeStudent-pageNum", vm.pageNum);
      sessionStorage.setItem("parentReportChangeStudent-pageSize", vm.pageSize);
      vm.getParentReportStudentCompareList();
      vm.countParentReportStudentCompareList();
    },
    parentReport() {
      this.$axios.get("/v1/dataReport/parentReport?reportType=1").then((res) => {
        if (res.data.code == 10000) {
            if(res.data.response.code=="2"){
                this.noticeModal=true;
            }else{
                this.$Message.info("上报成功");
                this.search()
            }
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    getParentReportStudentCompareList() {
      this.$axios
        .get(
          "/v1/dataReport/getParentReportStudentCompareList?gender=" +
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
    countParentReportStudentCompareList() {
      this.$axios
        .get(
          "/v1/dataReport/countParentReportStudentCompareList?gender=" +
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
            if(this.total>0){
              this.firstSendTf=false
            }
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
    if( Number(sessionStorage.getItem('yearSemester'))%2==1){
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

    if (sessionStorage.getItem("parentReportChangeStudent-grade")) {
      this.grade = Number(
        sessionStorage.getItem("parentReportChangeStudent-grade")
      );
    } else {
      vm.grade = vm.schoolGradeList[0].grade;
    }

    if (sessionStorage.getItem("parentReportChangeStudent-studentClass")) {
      vm.studentClass = isNaN(
        Number(sessionStorage.getItem("parentReportChangeStudent-studentClass"))
      )
        ? ""
        : Number(sessionStorage.getItem("parentReportChangeStudent-studentClass"));
    } else {
      vm.studentClass = vm.classList[0].value;
    }

    if (sessionStorage.getItem("parentReportChangeStudent-gender")) {
      this.gender = sessionStorage.getItem("parentReportChangeStudent-gender");
    } else {
      this.gender = "999";
    }

    if (sessionStorage.getItem("parentReportChangeStudent-registerCode")) {
      this.registerCode = sessionStorage.getItem("parentReportChangeStudent-registerCode");
    }

    if (sessionStorage.getItem("parentReportChangeStudent-studentName")) {
      this.studentName = sessionStorage.getItem("parentReportChangeStudent-studentName");
    }

    if (sessionStorage.getItem("parentReportChangeStudent-pageNum")) {
      this.pageNum = Number(sessionStorage.getItem("parentReportChangeStudent-pageNum"));
    }

    if (sessionStorage.getItem("parentReportChangeStudent-pageSize")) {
      this.pageSize = Number(sessionStorage.getItem("parentReportChangeStudent-pageSize"));
    }

    this.schoolId = sessionStorage.getItem("schoolId");
    this.search();
  },
};
</script>
