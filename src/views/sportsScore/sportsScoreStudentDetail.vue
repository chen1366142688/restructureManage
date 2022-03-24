<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生成绩详情</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span >姓名：</span>{{studentName}}
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>{{registerCode}}
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>{{gradeName}}{{studentClass}}班
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：</span>{{gender=="1"?"男":"女"}}
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="goback">返回</Button>
            </div>
        </div>
      </Card>
      <br>
      <Card v-if="testPercentName == '' && actionPercentName == '' && healthPercentName == '' && learnPercentName == '' && homeworkPercentName == '' && athleticContestTopScoreName == ''">
         <div style="width:100%;text-align:center;"> 当前学生无任何考核项目</div>
      </Card>
      <Card v-if="testPercentName != '' || actionPercentName != '' || healthPercentName != '' || learnPercentName != '' || homeworkPercentName != '' || athleticContestTopScoreName != ''">
       <div style="font-size:20px;height:40px;">
            成绩明细
        </div>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
         <TabPane v-if="learnPercentName != ''"  name="learnScore" :label="learnPercentName">
          <div v-if="haveFirst == '1'" style="margin-top:0px;" >
              <div>
                  第一学期：{{firstYearSemesterScore.learnScore==-1?"不考核":(firstYearSemesterScore.learnScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270" :loading="loading" :columns="learnColumns" :data="learnResultDataFirst"></Table>
                  </div>
                </Row>
              </div>
          </div>
          <div v-if="haveSecond == '1'" style="margin-top:20px;" >
              <div>
                  第二学期：{{secondYearSemesterScore.learnScore==-1?"不考核":(secondYearSemesterScore.learnScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270" :loading="loading" :columns="learnColumns" :data="learnResultDataSecond"></Table>
                  </div>
                </Row>
              </div>
          </div>
       </TabPane>
       <TabPane v-if="healthPercentName != ''"  name="healthScore" :label="healthPercentName">
            <div v-if="haveFirst == '1'" style="margin-top:0px;" >
              <div>
                  第一学期：{{firstYearSemesterScore.healthScore==-1?"不考核":(firstYearSemesterScore.healthScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270" :loading="loading" :columns="examColumns" :data="healthResultDataFirst"></Table>
                  </div>
                </Row>
              </div>
          </div>
          <div v-if="haveSecond == '1'" style="margin-top:20px;" >
              <div>
                  第二学期：{{secondYearSemesterScore.healthScore==-1?"不考核":(secondYearSemesterScore.healthScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270" :loading="loading" :columns="examColumns" :data="healthResultDataSecond"></Table>
                  </div>
                </Row>
              </div>
          </div>
       </TabPane>
       <TabPane v-if="actionPercentName != ''"  name="actionScore" :label="actionPercentName">
            <div v-if="haveFirst == '1'" style="margin-top:0px;" >
              <div>
                  第一学期：{{firstYearSemesterScore.actionScore==-1?"不考核":(firstYearSemesterScore.actionScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270" :loading="loading" :columns="examColumns" :data="actionResultDataFirst"></Table>
                  </div>
                </Row>
              </div>
          </div>
          <div v-if="haveSecond == '1'" style="margin-top:20px;" >
              <div>
                  第二学期：{{secondYearSemesterScore.actionScore==-1?"不考核":(secondYearSemesterScore.actionScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270" :loading="loading" :columns="examColumns" :data="actionResultDataSecond"></Table>
                  </div>
                </Row>
              </div>
          </div>
       </TabPane>
       <TabPane v-if="homeworkPercentName != ''"  name="homeworkScore" :label="homeworkPercentName">
        <div v-if="haveFirst == '1'" style="margin-top:0px;" >
              <div>
                  第一学期：{{firstYearSemesterScore.homeworkScore==-1?"不考核":(firstYearSemesterScore.homeworkScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270" :loading="loading" :columns="homeworkColumns" :data="homeworkResultDataFirst"></Table>
                  </div>
                </Row>
              </div>
          </div>
          <div v-if="haveSecond == '1'" style="margin-top:20px;" >
              <div>
                  第二学期：{{secondYearSemesterScore.homeworkScore==-1?"不考核":(secondYearSemesterScore.homeworkScore/100).toFixed(1)+"分"}}
              </div>
              <div>
                <Row>
                  <div style>
                    <Table border max-height="270"  :loading="loading" :columns="homeworkColumns" :data="homeworkResultDataSecond"></Table>
                  </div>
                </Row>
              </div>
          </div>
       </TabPane>
        <TabPane v-if="testPercentName != ''"  name="testScore" :label="testPercentName">
        <div v-if="haveFirst == '1'" style="margin-top:0px;" >
             <div>
                第一学期：{{firstYearSemesterScore.testScore==-1?"不考核":(firstYearSemesterScore.testScore/100).toFixed(1)+"分"}}
            </div>
            <div>
              <Row>
                <div style>
                  <Table border max-height="500" :loading="loading" :columns="testColumns" :data="testResultDataFirst"></Table>
                </div>
              </Row>
            </div>
        </div>
        <div v-if="haveSecond == '1'" style="margin-top:20px;" >
            <div>
                 第二学期：{{secondYearSemesterScore.testScore==-1?"不考核":(secondYearSemesterScore.testScore/100).toFixed(1)+"分"}}
            </div>
            <div>
              <Row>
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="testColumns" :data="testResultDataSecond"></Table>
                </div>
              </Row>
            </div>
        </div>
       </TabPane>
      </Tabs>
      </Card>
      <Card style="margin-top:20px" :dis-hover="true">
         <div style="width:100%;text-align:left;"> 家长签名:</div>
         <div  v-for="signature in signatureList" style="display: inline-block;margin-left:20px;">
           <span >{{signature.yearSemester}}</span>
           <div style="width: 280px;height:390px;border:1px solid rgba(211,211,211,1);line-height:390px;text-align:center;">
              <img :src="signature.picAddr" v-if="signature.picAddr" style="width: 275px;height:385px" />
              <span v-else>暂无家长签名数据</span>
          </div>
         </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
       signatureList:[],
      selectTabName:"",
      loading: false,
      studentId:"",
      studentName:"",
      registerCode:"",
      gender:"",
      grade:"",
      startSchool:"",
      studentClass:"",
      firstYearSemester:"",
      secondYearSemester:"",
      gradeName:"",
      firstYearSemesterScore:null,
      secondYearSemesterScore:null,
      haveFirst:"0",
      haveSecond:"0",
      testPercentName:"体质测试",
      actionPercentName:"技能体能",
      healthPercentName:"健康教育知识",
      learnPercentName:"学习态度",
      homeworkPercentName:"体育课后作业",
      athleticContestTopScoreName:"体育竞赛",
      testResultDataFirst:[],
      testResultDataSecond:[],
      actionResultDataFirst:[],
      actionResultDataSecond:[],
      healthResultDataFirst:[],
      healthResultDataSecond:[],
      learnResultDataFirst:[],
      learnResultDataSecond:[],
      homeworkResultDataFirst:[],
      homeworkResultDataSecond:[],

      athleticColumns: [
        {
          title: "活动日期",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "活动名称",
          key: "studentName",
          align: "center",
          minWidth:100,
        },
        {
          title: "活动类型",
          key: "registerC12ode",
          align: "center",
          minWidth:100,
        },
        {
          title: "加分",
          key: "registerCo12de",
          align: "center",
          minWidth:100,
        },
      ],
      testColumns: [
        {
          title: "测试时间",
          key: "testTime",
          align: "center",
          minWidth:100
        },
        {
          title: "项目名称",
          key: "examItemName",
          align: "center",
          minWidth:100
        },
        {
          title: "测试结果",
          key: "examResult",
          align: "center",
          width:500,
          render: (h, params) => {
            const row = params.row;
            return h("div", {
              domProps: {
                innerHTML: row.examResult
              }
            });
          }
        },
        {
          title: "测试得分",
          key: "score",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text="";
            if(row.examItemName=="身高" || row.examItemName=="体重"){
              text="-"
            }else{
              text=row.score
            }
            return h("div", [
                h("span", text)
              ]);
          }
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            let text="";
            if(row.examItemName=="身高" || row.examItemName=="体重"){
              text="-"
            }else{
              text=params.row.scoreLevel == "1" ? "优秀" :params.row.scoreLevel == "2" ? "良好" :params.row.scoreLevel == "3" ? "及格" :params.row.scoreLevel == "4"?"不及格":"-"
            }
            return h("div", [
              h("span", text)
            ]);
          }
        },
      ],
      examColumns: [
        {
          title: "考核时间",
          key: "testTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
              const row = params.row;
              var text=row.testTime;
              if(text == null){
                   return h("div",  "未考核");
              }else{
                    return h("div",  text);
              }
          }
        },
        {
          title: "项目名称",
          key: "classTestName",
          align: "center",
          minWidth:100,
        },
        {
          title: "考核内容",
          key: "examItemName",
          align: "center",
          minWidth:100,
        },
        {
          title: "成绩",
          key: "examResult",
          align: "center",
          minWidth:100,
          render: (h, params) => {
              const row = params.row;
              var text=row.testTime;
              if(text == null){
                   return h("div", "");
              }else{
                    return h("div",  row.examResult);
              }
          }
        },
        {
          title: "考核得分",
          key: "score",
          align: "center",
          minWidth:100,
        },
        {
          title: "等级",
          key: "scoreLevel",
          align: "center",
          width: 150,
          render: (h, params) => {
            return h("font", params.row.scoreLevel == "1" ? "优秀" :params.row.scoreLevel == "2" ? "良好" :params.row.scoreLevel == "3" ? "及格" : params.row.scoreLevel == "4" ?"不及格":"");
          }
        },
      ],
      learnColumns: [
        {
          title: '旷课',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.truancyCount == null){
                row.truancyCount=0;
            }
            return h('div', row.truancyCount)
          }
        },
        {
          title: '病假',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.sickCount == null){
                row.sickCount=0;
            }
            return h('div', row.sickCount)
          }
        },
        {
          title: '事假',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.thingCount == null){
                row.thingCount=0;
            }
            return h('div', row.thingCount)
          }
        },
        {
          title: '迟到',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.lateCount == null){
                row.lateCount=0;
            }
            return h('div', row.lateCount)
          }
        },
        {
          title: '早退',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.earlyCount == null){
                row.earlyCount=0;
            }
            return h('div', row.earlyCount)
          }
        },
        // {
        //   title: '不认真',
        //   key: 'studentClass',
        //   align: 'center',
        //   render: (h, params) => {
        //     const row = params.row;
        //     if(row.notSeriousCount == null){
        //         row.notSeriousCount=0;
        //     }
        //     return h('div', row.notSeriousCount)
        //   }
        // },
        {
          title: '违反纪律',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.violateDisciplineCount == null){
                row.violateDisciplineCount=0;
            }
            return h('div', row.violateDisciplineCount)
          }
        },
        {
          title: '运动着装不符',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.notAccordClothing == null){
                row.notAccordClothing=0;
            }
            return h('div', row.notAccordClothing)
          }
        },
        {
          title: '扣分总次数',
          key: 'sumCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.sumCount == null){
                row.sumCount=0;
            }
            return h('div', row.sumCount)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    disabled: (params.row.sumCount != null && params.row.sumCount > 0 )?false:true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toLearnDetail(params.row.yearSemester)
                    }
                  }
                },
                "详情"
              )
            ])
          }
        }
      ],
      homeworkColumns: [
        {
          title: "考核时间",
          key: "semesterName",
          align: "center",
          minWidth:100,
        },
        {
          title: "有效完成/考核总次数",
          key: "studentClass",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let haveCount = row.comboCount == null ? 0 : row.comboCount;
            let needCount =
              row.needExerciseCount == null ? 0 : row.needExerciseCount;
            const text = haveCount + "/" + needCount;
            if(row.haveDate=='0'){
              return h("div", "-");
            }
            return h("div", text);
          }
        },
        {
          title: "累计锻炼总次数",
          key: "dateCount",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.homeworkType == '1'){
              return h("div", "-");
            }
            if(row.haveDate=='0'){
              return h("div", "-");
            }
            return h("div", row.comboCount==null?0:row.comboCount);
          }
        },
        {
          title: "累计锻炼总时长(分钟)",
          key: "comboTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.homeworkType == '1'){
              return h("div", "-");
            }
            let comboTime = row.comboTime == null ? 0 : row.comboTime;
            comboTime = comboTime/1000/60;
            comboTime = comboTime.toFixed(2);
            if(row.haveDate=='0'){
              return h("div", "-");
            }
            return h("div", comboTime);
          }
        },
        {
          title: "平均每天锻炼时长(分钟)",
          key: "comboTimeDay",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.homeworkType == '1'){
              return h("div", "-");
            }
            let comboTime = row.comboTime == null ? 0 : row.comboTime;
            if(row.comboCount > 0){
                comboTime = comboTime/row.comboCount/1000/60;
                comboTime = comboTime.toFixed(2);
            }else{
                comboTime = 0;
            }
            if(row.haveDate=='0'){
              return h("div", "-");
            }
            return h("div", comboTime);
          }
        },
        {
          title: "上传视频个数",
          key: "videoCount",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.homeworkType == '1'){
              return h("div", "-");
            }
            if(row.haveDate=='0'){
              return h("div", "-");
            }
            return h("div", row.videoCount==null?0:row.videoCount);
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    disabled: (params.row.comboTime != null && params.row.comboTime > 0 )?false:true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toHomeworkDetail(params.row.yearSemester,params.row.semesterOver)
                    }
                  }
                },
                "详情"
              )
            ])
          }
        }
      ],
      resultDataFirst:[],
    };
  },
  methods: {
     selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-selectTabName',this.selectTabName);
     },
     goback(){ //返回
        this.$router.go(-1);
     },
    toDetail(row){
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-studentId',row.studentId)
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-studentName',row.studentName)
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-registerCode',row.registerCode)
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-gender',row.gender)
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-grade',row.grade)
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-startSchool',row.startSchool)
        sessionStorage.setItem('sportsScoreStudent-sportsScoreStudentDetail-studentClass',row.studentClass)
        this.$router.push({name: 'sportsScoreStudentDetail'})
    },
    toHomeworkDetail(yearSemester,semesterOver){
        let vm = this;
        sessionStorage.setItem('exerciseManageStudent-exerciseManageStudentDetail-studentId',vm.studentId);
        sessionStorage.setItem('exerciseManageStudent-exerciseManageStudentDetail-studentName',vm.studentName);
        sessionStorage.setItem('exerciseManageStudent-exerciseManageStudentDetail-registerCode',vm.registerCode);
        sessionStorage.setItem('exerciseManageStudent-exerciseManageStudentDetail-yearSemester',yearSemester);
        sessionStorage.setItem('exerciseManageStudent-exerciseManageStudentDetail-semesterOver',semesterOver);
        this.$router.push({name: 'exerciseManageStudentDetail'})
    },
    queryStudentScoreByStudentId() {
      var vm = this;
      this.$axios.get("/v1/semesterScore/queryStudentScoreByStudentId?studentId="+vm.studentId+"&secondYearSemester="+vm.secondYearSemester+"&firstYearSemester="+vm.firstYearSemester).then(res => {
        if (res.data.code == 10000) {
          if(res.data.response != null && res.data.response.length > 0){
              if(res.data.response.length == 1 && res.data.response[0].yearSemester%2==1){
                  vm.secondYearSemesterScore = res.data.response[0];
                  this.setShowLableName(res.data.response[0]);
                  vm.haveSecond='1';
              }else if(res.data.response.length == 1 && res.data.response[0].yearSemester%2==0){
                  vm.firstYearSemesterScore = res.data.response[0];
                  vm.haveFirst='1';
                  this.setShowLableName(res.data.response[0]);
              }else{
                  vm.haveFirst='1';
                  vm.haveSecond='1';
                  if(res.data.response[0].yearSemester%2==1){
                      vm.secondYearSemesterScore = res.data.response[0];
                      vm.firstYearSemesterScore = res.data.response[1];
                      this.setShowLableName(res.data.response[0]);
                  }else{
                      vm.secondYearSemesterScore = res.data.response[1];
                      vm.firstYearSemesterScore = res.data.response[0];
                      this.setShowLableName(res.data.response[1]);
                  }
              }
          }
          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.testScore > -1){
              this.getStudentTestList(vm.firstYearSemesterScore.yearSemester);
          }
          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.testScore > -1){
              this.getStudentTestList(vm.secondYearSemesterScore.yearSemester);
          }
          if(vm.firstYearSemesterScore != null){
              this.getStudentExamList(vm.firstYearSemester);
          }
          if(vm.secondYearSemesterScore != null){
              this.getStudentExamList(vm.secondYearSemester);
          }
          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.learnScore > -1){
              this.getStudentLearnList(vm.firstYearSemesterScore.yearSemester);
          }
          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.learnScore > -1){
              this.getStudentLearnList(vm.secondYearSemesterScore.yearSemester);
          }

          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.homeworkScore > -1){
              this.getStudentFamilyOver(vm.firstYearSemesterScore.yearSemester);
          }
          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.homeworkScore > -1){
              this.getStudentFamilyOver(vm.secondYearSemesterScore.yearSemester);
          }


        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    setShowLableName(showSemesterScore){
      this.testPercentName=showSemesterScore.testPercent>0?"体质测试 ("+showSemesterScore.testPercent+"%)":"";
      this.actionPercentName=showSemesterScore.actionPercent>0?"技能体能 ("+showSemesterScore.actionPercent+"%)":"";
      this.healthPercentName=showSemesterScore.healthPercent>0?"健康教育知识 ("+showSemesterScore.healthPercent+"%)":"";
      this.learnPercentName=showSemesterScore.learnPercent>0?"学习态度 ("+showSemesterScore.learnPercent+"%)":"";
      this.homeworkPercentName=showSemesterScore.homeworkPercent>0?"体育课后作业 ("+showSemesterScore.homeworkPercent+"%)":"";
      this.athleticContestTopScoreName=showSemesterScore.athleticContestTopScore>0?"体育竞赛 (最多"+showSemesterScore.athleticContestTopScore+"分)":"";
    },
    toLearnDetail(yearSemester) {
      var vm = this
      sessionStorage.setItem('sportsClassManage-sportsClassStudentHis-studentId',vm.studentId)
      sessionStorage.setItem('sportsClassManage-sportsClassStudentHis-yearSemester',yearSemester)
      this.$router.push({ name: 'sportsClassStudentHis' })
    },
    s_to_hs(s) {
      var h;
      h = Math.floor(s / 60);
      s = s % 60;
      h += '';
      s += '';
      h = (h.length == 1) ? '0' + h : h;
      s = (s.length == 1) ? '0' + s : s;
      return h + '\'' + s;
    },
    getStudentTestList(yearSemester) {
      var vm = this
      let data = {
        "pageNo":1,
        "pageSize":99,
        "studentId": vm.studentId,
        "yearSemester":yearSemester,
      }
      this.$axios.post('/v1/exam/getStudentTestListV2', data).then(res => {
        if (res.data.code == 10000) {
          let result = res.data.response.list;
          for(let i=0;i<result.length;i++){
            if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"){
              result[i].examResult = vm.s_to_hs(result[i].examResult)+result[i].valueUnit
            }else{
              result[i].examResult += result[i].valueUnit
            }
            if(result[i].examItemName == "BMI" && result[i].valueUnit == "kg"){
              result[i].examItemName = "体重";
              result[i].score="-";
              result[i].scoreLevel="-";
            }
            if(result[i].examItemName == "BMI" && result[i].valueUnit == "cm"){
              result[i].examItemName = "身高"
              result[i].score="-";
              result[i].scoreLevel="-";
            }
          }
          vm.testResultDataFirst = result
        } else {
          if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    getStudentExamList(yearSemester){
        var vm = this
        let data = {
          "endTime": vm.examEndTime,
          "pageNo": 1,
          "pageSize": 99,
          "yearSemester": yearSemester,
          "studentId": vm.studentId
        }
        this.$axios.post('/v1/exam/getStudentExamListV2', data).then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            if(yearSemester%2 == 0){
               vm.actionResultDataFirst=[];
               vm.healthResultDataFirst=[];
                for(let i=0;i<result.length;i++){
                    if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"){
                      result[i].examResult = vm.s_to_hs(result[i].examResult)+result[i].examUnit
                    }else if(result[i].examUnit == '99'){
                      result[i].examResult += "分"
                    }else if(result[i].examUnit == '个数'){
                      result[i].examResult += "个"
                    }else{
                      result[i].examResult += result[i].examUnit
                    }
                    if(result[i].examItemType == '1'){
                        vm.healthResultDataFirst.push(result[i]);
                    }else{
                        vm.actionResultDataFirst.push(result[i]);
                    }
                }
            }else{
                vm.actionResultDataSecond=[];
                vm.healthResultDataSecond=[];
                for(let i=0;i<result.length;i++){
                    if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"){
                      result[i].examResult = vm.s_to_hs(result[i].examResult)+result[i].examUnit
                    }else if(result[i].examUnit == '99'){
                      result[i].examResult += "分"
                    }else if(result[i].examUnit == '个数'){
                      result[i].examResult += "个"
                    }else{
                      result[i].examResult += result[i].examUnit
                    }
                    if(result[i].examItemType == '1'){
                        vm.healthResultDataSecond.push(result[i]);
                    }else{
                        vm.actionResultDataSecond.push(result[i]);
                    }
                }
            }
          } else {
            if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getStudentLearnList(yearSemester){
        var vm = this
        this.$axios.get('/v1/sports/learn/queryStudentSemesterLearnInfo?studentId='+vm.studentId+"&yearSemester="+yearSemester).then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            if(result == null){
                result = {};
                result.yearSemester = yearSemester;
            }
            if(yearSemester%2 == 0){
               vm.learnResultDataFirst=[];
               vm.learnResultDataFirst.push(result);
            }else{
               vm.learnResultDataSecond=[];
               vm.learnResultDataSecond.push(result);
            }
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getStudentFamilyIn(yearSemester){
        var vm = this
        this.$axios.get('/v1/familyexerciseanalyze/queryStudentYearSemesterExercise?studentId='+vm.studentId+"&yearSemester="+yearSemester+"&semesterOver=1").then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            if(result == null){
                result={
                   haveDate:"0"
                };
            }else{
               result.haveDate="1";
            }
            if(yearSemester%2 == 0){
               result.semesterName = "第一学期";
               vm.homeworkResultDataFirst.push(result);
            }else{
               result.semesterName = "第二学期";
               vm.homeworkResultDataSecond.push(result);
            }
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getStudentFamilyOver(yearSemester){
        var vm = this
        let overSemester = 0
        if(yearSemester%2==0){
            overSemester = yearSemester - 1;
        }else{
            overSemester = yearSemester - 10 + 1 ;
        }
        this.$axios.get('/v1/familyexerciseanalyze/queryStudentYearSemesterExercise?studentId='+vm.studentId+"&yearSemester="+overSemester+"&semesterOver=0").then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            if(result == null){
                result={
                   haveDate:"0"
                };
            }else{
               result.haveDate="1";
            }
            if(yearSemester%2 == 0){
               vm.homeworkResultDataFirst=[];
               result.semesterName = (yearSemester/10).toFixed(0)+"年暑假";
               vm.homeworkResultDataFirst.push(result);
            }else{
               vm.homeworkResultDataSecond=[];
               result.semesterName = ((yearSemester - 10)/10).toFixed(0)+"年寒假";
               vm.homeworkResultDataSecond.push(result);
            }
            this.getStudentFamilyIn(yearSemester);
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getStudentParentSignature(studentId){
        var vm = this
        this.$axios.get('/v1/parentSignature/getStudentParentSignature?studentId='+studentId).then(res => {
          if (res.data.code == 10000) {
            let result = res.data.response?res.data.response:[];
            let finalList=[];
            let one={
              yearSemester:"第一学期",
              picAddr:"",
            }
            let two={
              yearSemester:"第二学期",
              picAddr:"",
            }
            if(result.length==0){
              finalList.push(one)
              finalList.push(two)
            }
            if(result.length==1){
             if(result[0].yearSemester=='第一学期'){
               finalList.push(result[0])
               finalList.push(two)
             }else{
               finalList.push(one)
               finalList.push(result[0])
             }
            }
            vm.signatureList=finalList;
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },
  },
  watch: {

  },
  created() {},
  mounted() {
    let vm = this;
    vm.studentId = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-studentId')
    vm.studentName = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-studentName')
    vm.registerCode = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-registerCode')
    vm.gender = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-gender')
    vm.grade = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-grade')
    vm.startSchool = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-startSchool')
    vm.studentClass = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-studentClass')
    vm.firstYearSemester = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-firstYearSemester')
    vm.secondYearSemester = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-secondYearSemester')
    vm.gradeName = vm.grade == "1" ?'一年级':vm.grade == "2" ?'二年级':vm.grade == "3" ?'三年级':vm.grade == "4" ?'四年级':vm.grade == "5" ?'五年级':vm.grade == "6" ?'六年级':vm.grade == "7" ?'七年级':vm.grade == "8" ?'八年级':vm.grade == "9" ?'九年级':vm.grade == "10" ?'高一':vm.grade == "11" ?'高二':vm.grade == "12" ?'高三':'';
    vm.selectTabName = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-selectTabName');
    this.queryStudentScoreByStudentId();
    vm. getStudentParentSignature(sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-studentId'));
  }
};
</script>
