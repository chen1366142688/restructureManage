<style scoped>
.width120 {
  width: 120px;
}
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">家长端成绩推送</h2>
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
<!--                    <Button :disabled="!firstSendTf" v-on:click="toSendChange" type="success">成绩变动学生报送</Button>-->
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
      resultColumns: [
            {
                title: "姓名",
                key: "studentName",
                align: "center",
                width:120,

            },
            {
                title: "性别",
                key: "studentName",
                align: "center",
                width:60,
                render: (h, params) => {
                    const row = params.row;
                    const text = row.gender == '1'?"男":"女";
                    return h("span", text);
                }
            },
            {
                title: "学籍号",
                key: "registerCode",
                align: "center",
                width:140
            },

            {
                title: "班级",
                key: "grade",
                align: "center",
                width:110,
                render: (h, params) => {
                    const row = params.row;
                    const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
                    return h("span", text+row.studentClass+"班");
                }
            },
          {
              title: "体质测试得分",
              key: "testScore",
              align: "center",
              minWidth:100,
              render: (h, params) => {
                  const row = params.row;
                  let text = row.testScore/100;
                  if(row.testScore < 0 ){
                      text = text.toFixed(1);
                  }else{
                      text = text.toFixed(1);
                  }
                  return h("span", text);
              }
          },
          {
              title: "体质测试等级",
              key: "testScore",
              align: "center",
              minWidth:100,
              render: (h, params) => {
                  const row = params.row;
                  let text = row.testScore;
                  if(text >= 9000){
                      text='优秀';
                  }else if(text >= 8000){
                      text='良好';
                  }else if(text >= 6000){
                      text='及格';
                  }else if(vm.firstYearSemesterScore.testScore >= 0){
                      text='不及格';
                  }else{
                      text='0.0';
                  }
                  return h("span", text);
              }
          },
            {
                title: "专项技能",
                key: "actionScore",
                align: "center",
                minWidth:100,
                render: (h, params) => {
                    const row = params.row;
                    let text = row.actionScore/100;
                    if(row.actionScore < 0 ){
                        text = text.toFixed(1);
                    }else{
                        text = text.toFixed(1);
                    }
                    return h("span", text);
                }
            },
            {
                title: "基础体能",
                key: "staminaScore",
                align: "center",
                minWidth:100,
                render: (h, params) => {
                    const row = params.row;
                    let text = row.staminaScore/100;
                    if(row.staminaScore < 0 ){
                        text = text.toFixed(1);
                    }else{
                        text = text.toFixed(1);
                    }
                    return h("span", text);
                }
            },
            {
                title: "体质健康监测",
                key: "healthScore",
                align: "center",
                minWidth:100,
                render: (h, params) => {
                    const row = params.row;
                    let text = row.healthScore/100;
                    if(this.secondYearSemester){
                        text = text.toFixed(1);
                    }else{
                        if(row.healthScore <= 0 ){
                            text = text.toFixed(1);
                        }else{
                            text = text.toFixed(1);
                        }
                    }

                    return h("span", text);
                }
            },
            {
                title: "竞赛加分",
                key: "contestScore",
                align: "center",
                minWidth:100,
                render: (h, params) => {
                    const row = params.row;
                    let text = row.contestScore/100;
                    if(this.secondYearSemester){
                        text = text.toFixed(1);
                    }else{
                        if(row.contestScore <= 0 ){
                            text = text.toFixed(1);
                        }else{
                            text = text.toFixed(1);
                        }
                    }

                    return h("span", text);
                }
            },
            {
                title: "中考体育成绩",
                key: "semesterScore",
                align: "center",
                minWidth:100,
                render: (h, params) => {
                    const row = params.row;

                    let text = row.semesterScore/100;
                    text = text.toFixed(1);
                    return h("span", text);
                }
            },

            {
                title: "操作",
                key: "action",
                align: "center",
                width:100,
                render: (h, params) => {
                    const row = params.row;
                    return h("div", [
                        h(
                            "Button",
                            {
                                props: {
                                    type: "success"
                                },
                                style: {
                                    marginRight: "10px"
                                },
                                on: {
                                    click: () => {
                                        this.toDetail(row);
                                    }
                                }
                            },
                            "详情"
                        ),
                    ]);
                }
            }
        ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
      toDetail(row){
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-studentId',row.studentId)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-studentName',row.studentName)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-registerCode',row.registerCode)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-gender',row.gender)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-grade',row.grade)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-startSchool',row.startSchool)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-studentClass',row.studentClass)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-firstYearSemester',this.firstYearSemester)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-secondYearSemester',this.secondYearSemester)
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-selectTabName',"");
          sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-selectYear',this.selectYear);
          this.$router.push({name: 'parentReportStudentDetailYN'})
      },
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
      this.$axios.get("/v1/dataReport/parentReportYN").then((res) => {
        if (res.data.code == 10000) {
                this.$Message.info("推送成功");
                this.search();
                 vm.getParentReportStatus();
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
          "/v1/dataReport/getParentReportStudentDetailListYN?gender=" +
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
          "/v1/dataReport/countParentReportStudentDetailYN?gender=" +
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
    // if( Number(yearSemester)%2==1){
    //     vm.resultColumns=vm.second
    // }else{
    //   vm.resultColumns = vm.first;
    // }
      if(Number(yearSemester)%2 == 1){
          vm.secondYearSemester = yearSemester;
          vm.firstYearSemester = (yearSemester-10+1);
      }else{
          vm.firstYearSemester = yearSemester;
          vm.secondYearSemester = (yearSemester-10+1);
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
    // vm.getParentReportStatus();
  },
};
</script>
