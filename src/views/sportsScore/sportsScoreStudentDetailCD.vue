<template>
  <div style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">学生成绩详情</h2>
    <!-- 学生信息 -->
    <Card>
      <div class="top-search">
          <div class="left-input" style="align-items:center">
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
    <br/>
    <!-- 体质测试 -->
    <Card>
      <div style="font-size:20px;height:40px;">体质测试</div>
      <div  style="margin-top:0px;" >
        <div style="float:left;">
          第一学期：{{(firstYearSemesterScore != null && firstYearSemesterScore.testChoose == 1)?(firstYearSemesterScore.testExemptType == 1?70:
          firstYearSemesterScore.testExemptType == 2?80:''):(firstYearSemesterScore == null || firstYearSemesterScore.testScore <=0)?"--":(firstYearSemesterScore.testScore/100).toFixed(1)+"分"}}
          {{firstYearSemesterScore != null && firstYearSemesterScore.testChoose == 1?'（免试）':""}}
        </div>
        <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null?"--":firstYearSemesterScore.testScoreLevel}} </div>
        <div style="clear:both" >
          <Row v-if="firstYearSemesterScore!=null&&'1'!=firstYearSemesterScore.testChoose" >
            <div style>
              <Table border max-height="240" :loading="loading" :columns="testColumns" :data="testResultDataFirst"></Table>
            </div>
          </Row>
        </div>
      </div>
    </Card>
    <br/>
    <!-- 学科评价 -->
    <Card>
      <div style="font-size:20px;height:40px;">学科评价</div>
      <Tabs type="card" value="learnScore">
        <!-- 学习态度 -->
        <TabPane name="learnScore" :label="learnPercentName">
            <div style="margin-top:0px;" >
                <div>
                    <div style="float:left;">第一学期</div>
                    <div style="margin-left:20px;float:left;width:160px;" >
                      得分：{{firstYearSemesterScore ==null?"--":(firstYearSemesterScore.learnScore/100).toFixed(1)+"分"}}{{firstYearSemesterScore != null && firstYearSemesterScore.classChoose == 1?'（免试）':""}}

                    </div>
                    <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null?"--":firstYearSemesterScore.learnScoreLevel}} </div>
                    <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null?"--":firstYearSemesterScore.learnScoreScore+'分'}}</div>
                </div>
                <div style="clear:both" >
                  <Row v-if="firstYearSemesterScore!=null&& 1 != firstYearSemesterScore.classChoose">
                    <div style >
                      <Table border max-height="270" :loading="loading" :columns="learnColumns" :data="learnResultDataFirst"></Table>
                    </div>
                  </Row>
                </div>
            </div>
            <div v-if="secondYearSemesterScore && secondYearSemesterScore.learnScore" style="margin-top:20px;" >
                <div>
                    <div style="float:left;">第二学期</div>
                    <div style="margin-left:20px;float:left;width:160px;" >得分：{{secondYearSemesterScore ==null?"--":(secondYearSemesterScore.learnScore/100).toFixed(1)+"分"}}{{secondYearSemesterScore != null && secondYearSemesterScore.classChoose == 1?'（免试）':""}} </div>
                    <div style="margin-left:60px;float:left;width:160px;" >等级：{{secondYearSemesterScore ==null?"--":secondYearSemesterScore.learnScoreLevel}} </div>
                    <div style="margin-left:60px;float:left;" >综合评价得分：{{secondYearSemesterScore ==null?"--":secondYearSemesterScore.learnScoreScore+'分'}}</div>
                </div>
                <div style="clear:both">
                  <Row v-if="1 != secondYearSemesterScore.classChoose">
                    <div style>
                      <Table border max-height="270" :loading="loading" :columns="learnColumns" :data="learnResultDataSecond"></Table>
                    </div>
                  </Row>
                </div>
            </div>
        </TabPane>
        <!-- 健康教育知识 -->
        <TabPane name="healthScore" :label="healthPercentName">
          <div  style="margin-top:0px;" >
            <div>
                <div style="float:left;">第一学期</div>
                <div style="margin-left:20px;float:left;width:160px;" >得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.healthOver != '1' ?"--":(firstYearSemesterScore.healthScore/100).toFixed(1)+"分"}}{{firstYearSemesterScore != null && firstYearSemesterScore.healthChoose == 1?'（免试）':""}}</div>
                <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null || firstYearSemesterScore.healthOver != '1' ?"--":firstYearSemesterScore.healthScoreLevel}} </div>
                <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.healthOver != '1' ?"--":firstYearSemesterScore.healthScoreScore+'分'}}</div>
            </div>
            <div  style="clear:both">
              <Row v-if="firstYearSemesterScore!=null&& 1 != firstYearSemesterScore.healthChoose">
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="examColumns" :data="healthResultDataFirst"></Table>
                </div>
              </Row>
            </div>
          </div>
          <div style="margin-top:20px;" v-if="secondYearSemesterScore && secondYearSemesterScore.healthScore" >
            <div>
                <div style="float:left;">第二学期</div>
                <div style="margin-left:20px;float:left;width:160px;" >得分：{{secondYearSemesterScore ==null || secondYearSemesterScore.healthOver != '1' ?"--":(secondYearSemesterScore.healthScore/100).toFixed(1)+"分"}}{{secondYearSemesterScore != null && secondYearSemesterScore.healthChoose == 1?'（免试）':""}} </div>
                <div style="margin-left:60px;float:left;width:160px;" >等级：{{secondYearSemesterScore ==null || secondYearSemesterScore.healthOver != '1' ?"--":secondYearSemesterScore.healthScoreLevel}} </div>
                <div style="margin-left:60px;float:left;" >综合评价得分：{{secondYearSemesterScore ==null || secondYearSemesterScore.healthOver != '1' ?"--":secondYearSemesterScore.healthScoreScore+'分'}}</div>
            </div>
            <div  style="clear:both">
              <Row v-if="1 != secondYearSemesterScore.healthChoose">
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="examColumns" :data="healthResultDataSecond"></Table>
                </div>
              </Row>
            </div>
          </div>
        </TabPane>
        <!-- 运动技能 -->
        <TabPane  name="actionScore" :label="actionPercentName">
          <div  style="margin-top:0px;" >
            <div>
                <div style="float:left;">第一学期</div>
                <div style="margin-left:20px;float:left;width:100px;" >得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.actionOver != '1' ?"--":(firstYearSemesterScore.actionScore/100).toFixed(1)+"分"}} </div>
                <div style="margin-left:60px;float:left;width:100px;" >等级：{{firstYearSemesterScore ==null || firstYearSemesterScore.actionOver != '1' ?"--":firstYearSemesterScore.actionScoreLevel}} </div>
                <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.actionOver != '1' ?"--":firstYearSemesterScore.actionScoreScore+'分'}}</div>
            </div>
            <div  style="clear:both">
              <Row>
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="examColumns" :data="actionResultDataFirst"></Table>
                </div>
              </Row>
            </div>
          </div>
          <div style="margin-top:20px;" v-if="secondYearSemesterScore && secondYearSemesterScore.actionScore">
            <div>
                <div style="float:left;">第二学期</div>
                <div style="margin-left:20px;float:left;width:100px;" >得分：{{secondYearSemesterScore ==null || secondYearSemesterScore.actionOver != '1' ?"--":(secondYearSemesterScore.actionScore/100).toFixed(1)+"分"}} </div>
                <div style="margin-left:60px;float:left;width:100px;" >等级：{{secondYearSemesterScore ==null || secondYearSemesterScore.actionOver != '1' ?"--":secondYearSemesterScore.actionScoreLevel}} </div>
                <div style="margin-left:60px;float:left;" >综合评价得分：{{secondYearSemesterScore ==null || secondYearSemesterScore.actionOver != '1' ?"--":secondYearSemesterScore.actionScoreScore+'分'}}</div>
            </div>
            <div  style="clear:both">
              <Row>
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="examColumns" :data="actionResultDataSecond"></Table>
                </div>
              </Row>
            </div>
          </div>
        </TabPane>
        <!-- 体能 -->
        <TabPane  name="staminaScore" v-if="staminaPercentName" :label="staminaPercentName">
          <div  style="margin-top:0px;" >
            <div>
                <div style="float:left;">第一学期</div>
                <div style="margin-left:20px;float:left;width:100px;" >得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.staminaOver != '1' ?"--":(firstYearSemesterScore.staminaScore/100).toFixed(1)+"分"}} </div>
                <div style="margin-left:60px;float:left;width:100px;" >等级：{{firstYearSemesterScore ==null || firstYearSemesterScore.staminaOver != '1' ?"--":firstYearSemesterScore.staminaScoreLevel}} </div>
                <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null || firstYearSemesterScore.staminaOver != '1' ?"--":firstYearSemesterScore.staminaScoreScore+'分'}}</div>
            </div>
            <div  style="clear:both">
              <Row>
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="examColumns" :data="staminaResultDataFirst"></Table>
                </div>
              </Row>
            </div>
          </div>
          <div style="margin-top:20px;" v-if="secondYearSemesterScore && secondYearSemesterScore.staminaScore">
            <div>
                <div style="float:left;">第二学期</div>
                <div style="margin-left:20px;float:left;width:100px;" >得分：{{secondYearSemesterScore ==null || secondYearSemesterScore.staminaOver != '1' ?"--":(secondYearSemesterScore.staminaScore/100).toFixed(1)+"分"}} </div>
                <div style="margin-left:60px;float:left;width:100px;" >等级：{{secondYearSemesterScore ==null || secondYearSemesterScore.staminaOver != '1' ?"--":secondYearSemesterScore.staminaScoreLevel}} </div>
                <div style="margin-left:60px;float:left;" >综合评价得分：{{secondYearSemesterScore ==null || secondYearSemesterScore.staminaOver != '1' ?"--":secondYearSemesterScore.staminaScoreScore+'分'}}</div>
            </div>
            <div  style="clear:both">
              <Row>
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="examColumns" :data="staminaResultDataSecond"></Table>
                </div>
              </Row>
            </div>
          </div>
        </TabPane>
        <!-- 体育课后作业 -->
        <TabPane name="homeworkScore" :label="homeworkPercentName">
          <div style="margin-top:0px;" >
            <div>
                <div style="float:left;">第一学期</div>
                <div style="margin-left:20px;float:left;width:160px;" >得分：{{firstYearSemesterScore ==null ?"--":(firstYearSemesterScore.homeworkScore/100).toFixed(1)+"分"}}{{firstYearSemesterScore != null && firstYearSemesterScore.afterClassChoose == 1?'（免试）':""}} </div>
                <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null ?"--":firstYearSemesterScore.homeworkScoreLevel}} </div>
                <div style="margin-left:60px;float:left;" >综合评价得分：{{firstYearSemesterScore ==null ?"--":firstYearSemesterScore.homeworkScoreScore+'分'}}</div>
            </div>
            <div  style="clear:both">
              <Row  v-if="firstYearSemesterScore!=null&&1 != firstYearSemesterScore.afterClassChoose">
                <div style>
                  <Table border max-height="270" :loading="loading" :columns="homeworkColumns" :data="homeworkResultDataFirst"></Table>
                </div>
              </Row>
            </div>
          </div>
          <div style="margin-top:20px;" v-if="secondYearSemesterScore && secondYearSemesterScore.homeworkScore != null" >
              <div>
                  <div style="float:left;"> 第二学期</div>
                  <div style="margin-left:20px;float:left;width:160px;" >得分：{{secondYearSemesterScore ==null ?"--":(secondYearSemesterScore.homeworkScore/100).toFixed(1)+"分"}}{{secondYearSemesterScore != null && secondYearSemesterScore.afterClassChoose == 1?'（免试）':""}} </div>
                  <div style="margin-left:60px;float:left;width:160px;" >等级：{{secondYearSemesterScore ==null ?"--":secondYearSemesterScore.homeworkScoreLevel}} </div>
                  <div style="margin-left:60px;float:left;" >综合评价得分：{{secondYearSemesterScore ==null ?"--":secondYearSemesterScore.homeworkScoreScore+'分'}}</div>
              </div>
              <div  style="clear:both">
                <Row v-if="1 != secondYearSemesterScore.afterClassChoose">
                  <div style>
                    <Table border max-height="270"  :loading="loading" :columns="homeworkColumns" :data="homeworkResultDataSecond"></Table>
                  </div>
                </Row>
              </div>
          </div>
        </TabPane>
      </Tabs>
    </Card>
    <!-- 签名 -->
    <Card style="margin-top:20px;height:1500px;" :dis-hover="true">
        <div style="width:100%;text-align:left;"> 家长签名:</div>
        <div  v-for="signature in signatureList" style="float:left;margin-left:40px;height:1280px;margin-top:10px;">
          <span >{{signature.yearSemester}}</span>
          <div style="width: 285px;height:1280px;border:1px solid rgba(211,211,211,1);line-height:1280px;text-align:center;margin-top:10px;">
            <img :src="signature.picAddr" v-if="signature.picAddr" style="width: 280px;height:1280px" />
            <span v-else>暂无家长签名数据</span>
        </div>
        </div>
    </Card>
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
      schoolType:"",
      firstYearSemester:"",
      secondYearSemester:"",
      gradeName:"",
      firstYearSemesterScore:null,
      secondYearSemesterScore:null,
      haveFirst:"0",
      haveSecond:"0",
      testPercentName:"体质测试",
      actionPercentName:"运动技能",
      healthPercentName:"健康教育知识",
      staminaPercentName:"体能",
      learnPercentName:"学习态度",
      homeworkPercentName:"体育课后作业",
      athleticContestTopScoreName:"体育竞赛",
      testResultDataFirst:[],
      testResultDataSecond:[],
      actionResultDataFirst:[],
      actionResultDataSecond:[],
      healthResultDataFirst:[],
      healthResultDataSecond:[],
      staminaResultDataFirst:[],
      staminaResultDataSecond:[],
      learnResultDataFirst:[],
      learnResultDataSecond:[],
      homeworkResultDataFirst:[],
      homeworkResultDataSecond:[],

      athleticColumns: [
        {
          title: "活动日期",
          key: "registerCode",
          align: "center",
          minWidth:100,
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
          width:250,
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
          title: "成绩",
          key: "examResult",
          align: "center",
          width:600,
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
          title: "得分",
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
          minWidth:100,
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
          title: "得分",
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
            let teacherCount = row.teacherCount == null ? 0 : row.teacherCount;
            let needCount =
              row.needExerciseCount == null ? 0 : row.needExerciseCount;
            const text = (haveCount + teacherCount) + "/" + needCount;
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
            let haveCount = row.comboCount == null ? 0 : row.comboCount;
            let teacherCount = row.teacherCount == null ? 0 : row.teacherCount;
            return h("div", haveCount + teacherCount);
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
        selectYear: ''
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

          // if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.testScore > -1){
          //     this.getStudentTestList(vm.secondYearSemesterScore.yearSemester);
          // }
          if(vm.firstYearSemesterScore != null){
              this.getStudentExamList(vm.firstYearSemester);
              //一学期免试计算
              if(1 == vm.firstYearSemesterScore.testChoose && 1 ==vm.firstYearSemesterScore.testExemptType){
                vm.firstYearSemesterScore.testScore = 7000
             }else if(1 == vm.firstYearSemesterScore.testChoose && 2 ==vm.firstYearSemesterScore.testExemptType){
                vm.firstYearSemesterScore.testScore = 8000
             }
              if(1 == vm.firstYearSemesterScore.classChoose && 1 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.learnScore = 7000
             }else if(1 == vm.firstYearSemesterScore.classChoose && 2 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.learnScore = 8000
             }
             if(1 == vm.firstYearSemesterScore.healthChoose && 1 ==vm.firstYearSemesterScore.exemptType){
               vm.firstYearSemesterScore.healthOver = '1';
                vm.firstYearSemesterScore.healthScore = 7000
             }else if(1 == vm.firstYearSemesterScore.healthChoose && 2 ==vm.firstYearSemesterScore.exemptType){
               vm.firstYearSemesterScore.healthOver = '1';
                vm.firstYearSemesterScore.healthScore = 8000
             }
             if(1 == vm.firstYearSemesterScore.afterClassChoose && 1 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.homeworkScore = 7000
             }else if(1 == vm.firstYearSemesterScore.afterClassChoose && 2 ==vm.firstYearSemesterScore.exemptType){
                vm.firstYearSemesterScore.homeworkScore = 8000
             }
          }
          if(vm.secondYearSemesterScore != null){

              this.getStudentExamList(vm.secondYearSemester);
              //二学期免试计算
              if(1 == vm.secondYearSemesterScore.classChoose && 1 ==vm.secondYearSemesterScore.exemptType){
                vm.secondYearSemesterScore.learnScore = 7000
              }else if(1 == vm.secondYearSemesterScore.classChoose && 2 ==vm.secondYearSemesterScore.exemptType){
                  vm.secondYearSemesterScore.learnScore = 8000
              }
              if(1 == vm.secondYearSemesterScore.healthChoose && 1 ==vm.secondYearSemesterScore.exemptType){
                vm.secondYearSemesterScore.healthOver = '1';
                vm.secondYearSemesterScore.healthScore = 7000
              }else if(1 == vm.secondYearSemesterScore.healthChoose && 2 ==vm.secondYearSemesterScore.exemptType){
                vm.secondYearSemesterScore.healthOver = '1';
                vm.secondYearSemesterScore.healthScore = 8000
              }
              if(1 == vm.secondYearSemesterScore.afterClassChoose && 1 ==vm.secondYearSemesterScore.exemptType){
                vm.secondYearSemesterScore.homeworkScore = 7000
              }else if(1 == vm.secondYearSemesterScore.afterClassChoose && 2 ==vm.secondYearSemesterScore.exemptType){
                  vm.secondYearSemesterScore.homeworkScore = 8000
              }
          }

          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.testScore > -1){
                this.getStudentTestList(vm.firstYearSemesterScore.yearSemester);
                if(vm.firstYearSemesterScore.testScore >= 9000){
                  vm.firstYearSemesterScore.testScoreLevel='优秀';
                }else if(vm.firstYearSemesterScore.testScore >= 8000){
                  vm.firstYearSemesterScore.testScoreLevel='良好';
                }else if(vm.firstYearSemesterScore.testScore >= 6000){
                  vm.firstYearSemesterScore.testScoreLevel='及格';
                }else if(vm.firstYearSemesterScore.testScore >= 0){
                  vm.firstYearSemesterScore.testScoreLevel='不及格';
                }else{
                  vm.firstYearSemesterScore.testScoreLevel='--';
                }
            }

          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.healthScore > -1){
              if(vm.firstYearSemesterScore.healthScore >= 9000){
                 vm.firstYearSemesterScore.healthScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.healthScore >= 8000){
                 vm.firstYearSemesterScore.healthScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.healthScore >= 6000){
                 vm.firstYearSemesterScore.healthScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.healthScore >= 0){
                 vm.firstYearSemesterScore.healthScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.healthScoreLevel='--';
              }
              vm.firstYearSemesterScore.healthScoreScore = (vm.firstYearSemesterScore.healthScore*vm.firstYearSemesterScore.healthPercent/10000).toFixed(1);
              if(vm.firstYearSemesterScore.healthOver && vm.firstYearSemesterScore.healthOver != '1'){
                  vm.firstYearSemesterScore.healthScoreLevel='--';
                  vm.firstYearSemesterScore.healthScoreScore='--';
              }
          }

          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.healthScore > -1){
              if(vm.secondYearSemesterScore.healthScore >= 9000){
                 vm.secondYearSemesterScore.healthScoreLevel='优秀';
              }else if(vm.secondYearSemesterScore.healthScore >= 8000){
                 vm.secondYearSemesterScore.healthScoreLevel='良好';
              }else if(vm.secondYearSemesterScore.healthScore >= 6000){
                 vm.secondYearSemesterScore.healthScoreLevel='及格';
              }else if(vm.secondYearSemesterScore.healthScore >= 0){
                 vm.secondYearSemesterScore.healthScoreLevel='不及格';
              }else{
                 vm.secondYearSemesterScore.healthScoreLevel='--';
              }
              vm.secondYearSemesterScore.healthScoreScore = (vm.secondYearSemesterScore.healthScore*vm.secondYearSemesterScore.healthPercent/10000).toFixed(1);
              if(vm.secondYearSemesterScore.healthOver && vm.secondYearSemesterScore.healthOver != '1'){
                  vm.secondYearSemesterScore.healthScoreLevel='--';
                  vm.secondYearSemesterScore.healthScoreScore='--';
              }
          }



          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.actionScore > -1){
              if(vm.firstYearSemesterScore.actionScore >= 9000){
                 vm.firstYearSemesterScore.actionScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.actionScore >= 8000){
                 vm.firstYearSemesterScore.actionScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.actionScore >= 6000){
                 vm.firstYearSemesterScore.actionScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.actionScore >= 0){
                 vm.firstYearSemesterScore.actionScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.actionScoreLevel='--';
              }
              vm.firstYearSemesterScore.actionScoreScore = (vm.firstYearSemesterScore.actionScore*vm.firstYearSemesterScore.actionPercent/10000).toFixed(1);

              if(vm.firstYearSemesterScore.actionOver && vm.firstYearSemesterScore.actionOver != '1'){
                  vm.firstYearSemesterScore.actionScoreLevel='--';
                  vm.firstYearSemesterScore.actionScoreScore='--';
              }
          }

          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.actionScore > -1){
              if(vm.secondYearSemesterScore.actionScore >= 9000){
                 vm.secondYearSemesterScore.actionScoreLevel='优秀';
              }else if(vm.secondYearSemesterScore.actionScore >= 8000){
                 vm.secondYearSemesterScore.actionScoreLevel='良好';
              }else if(vm.secondYearSemesterScore.actionScore >= 6000){
                 vm.secondYearSemesterScore.actionScoreLevel='及格';
              }else if(vm.secondYearSemesterScore.actionScore >= 0){
                 vm.secondYearSemesterScore.actionScoreLevel='不及格';
              }else{
                 vm.secondYearSemesterScore.actionScoreLevel='--';
              }
              vm.secondYearSemesterScore.actionScoreScore = (vm.secondYearSemesterScore.actionScore*vm.secondYearSemesterScore.actionPercent/10000).toFixed(1);
              if(vm.secondYearSemesterScore.actionOver && vm.secondYearSemesterScore.actionOver != '1'){
                  vm.secondYearSemesterScore.actionScoreLevel='--';
                  vm.secondYearSemesterScore.actionScoreScore='--';
              }
          }



          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.staminaScore > -1){
              if(vm.firstYearSemesterScore.staminaScore >= 9000){
                 vm.firstYearSemesterScore.staminaScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.staminaScore >= 8000){
                 vm.firstYearSemesterScore.staminaScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.staminaScore >= 6000){
                 vm.firstYearSemesterScore.staminaScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.staminaScore >= 0){
                 vm.firstYearSemesterScore.staminaScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.staminaScoreLevel='--';
              }
              vm.firstYearSemesterScore.staminaScoreScore = (vm.firstYearSemesterScore.staminaScore*vm.firstYearSemesterScore.staminaPercent/10000).toFixed(1);
              if(vm.firstYearSemesterScore.staminaOver && vm.firstYearSemesterScore.staminaOver != '1'){
                  vm.firstYearSemesterScore.staminaScoreLevel='--';
                  vm.firstYearSemesterScore.staminaScoreScore='--';
              }
          }

          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.staminaScore > -1){
              if(vm.secondYearSemesterScore.staminaScore >= 9000){
                 vm.secondYearSemesterScore.staminaScoreLevel='优秀';
              }else if(vm.secondYearSemesterScore.staminaScore >= 8000){
                 vm.secondYearSemesterScore.staminaScoreLevel='良好';
              }else if(vm.secondYearSemesterScore.staminaScore >= 6000){
                 vm.secondYearSemesterScore.staminaScoreLevel='及格';
              }else if(vm.secondYearSemesterScore.staminaScore >= 0){
                 vm.secondYearSemesterScore.staminaScoreLevel='不及格';
              }else{
                 vm.secondYearSemesterScore.staminaScoreLevel='--';
              }
              vm.secondYearSemesterScore.staminaScoreScore = (vm.secondYearSemesterScore.staminaScore*vm.secondYearSemesterScore.staminaPercent/10000).toFixed(1);
              if(vm.secondYearSemesterScore.staminaOver && vm.secondYearSemesterScore.staminaOver != '1'){
                  vm.secondYearSemesterScore.staminaScoreLevel='--';
                  vm.secondYearSemesterScore.staminaScoreScore='--';
              }
          }



          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.learnScore > -1){
              if(vm.firstYearSemesterScore.learnScore >= 9000){
                 vm.firstYearSemesterScore.learnScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.learnScore >= 8000){
                 vm.firstYearSemesterScore.learnScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.learnScore >= 6000){
                 vm.firstYearSemesterScore.learnScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.learnScore >= 0){
                 vm.firstYearSemesterScore.learnScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.learnScoreLevel='--';
              }
              vm.firstYearSemesterScore.learnScoreScore = (vm.firstYearSemesterScore.learnScore*vm.firstYearSemesterScore.learnPercent/10000).toFixed(1);
              this.getStudentLearnList(vm.firstYearSemesterScore.yearSemester);
          }
          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.learnScore > -1){
              if(vm.secondYearSemesterScore.learnScore >= 9000){
                 vm.secondYearSemesterScore.learnScoreLevel='优秀';
              }else if(vm.secondYearSemesterScore.learnScore >= 8000){
                 vm.secondYearSemesterScore.learnScoreLevel='良好';
              }else if(vm.secondYearSemesterScore.learnScore >= 6000){
                 vm.secondYearSemesterScore.learnScoreLevel='及格';
              }else if(vm.secondYearSemesterScore.learnScore >= 0){
                 vm.secondYearSemesterScore.learnScoreLevel='不及格';
              }else{
                 vm.secondYearSemesterScore.learnScoreLevel='--';
              }
              vm.secondYearSemesterScore.learnScoreScore = (vm.secondYearSemesterScore.learnScore*vm.secondYearSemesterScore.learnPercent/10000).toFixed(1);
              this.getStudentLearnList(vm.secondYearSemesterScore.yearSemester);
          }

          if(vm.firstYearSemesterScore != null && vm.firstYearSemesterScore.homeworkScore > -1){
              if(vm.firstYearSemesterScore.homeworkScore >= 9000){
                 vm.firstYearSemesterScore.homeworkScoreLevel='优秀';
              }else if(vm.firstYearSemesterScore.homeworkScore >= 8000){
                 vm.firstYearSemesterScore.homeworkScoreLevel='良好';
              }else if(vm.firstYearSemesterScore.homeworkScore >= 6000){
                 vm.firstYearSemesterScore.homeworkScoreLevel='及格';
              }else if(vm.firstYearSemesterScore.homeworkScore >= 0){
                 vm.firstYearSemesterScore.homeworkScoreLevel='不及格';
              }else{
                 vm.firstYearSemesterScore.homeworkScoreLevel='--';
              }
              vm.firstYearSemesterScore.homeworkScoreScore = (vm.firstYearSemesterScore.homeworkScore*vm.firstYearSemesterScore.homeworkPercent/10000).toFixed(1);
              this.getStudentFamilyOver(vm.firstYearSemesterScore.yearSemester);
          }
          if(vm.secondYearSemesterScore != null && vm.secondYearSemesterScore.homeworkScore > -1){
              if(vm.secondYearSemesterScore.homeworkScore >= 9000){
                 vm.secondYearSemesterScore.homeworkScoreLevel='优秀';
              }else if(vm.secondYearSemesterScore.homeworkScore >= 8000){
                 vm.secondYearSemesterScore.homeworkScoreLevel='良好';
              }else if(vm.secondYearSemesterScore.homeworkScore >= 6000){
                 vm.secondYearSemesterScore.homeworkScoreLevel='及格';
              }else if(vm.secondYearSemesterScore.homeworkScore >= 0){
                 vm.secondYearSemesterScore.homeworkScoreLevel='不及格';
              }else{
                 vm.secondYearSemesterScore.homeworkScoreLevel='--';
              }
              vm.secondYearSemesterScore.homeworkScoreScore = (vm.secondYearSemesterScore.homeworkScore*vm.secondYearSemesterScore.homeworkPercent/10000).toFixed(1);
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
      this.actionPercentName=showSemesterScore.actionPercent>0?"运动技能 ("+showSemesterScore.actionPercent+"%)":"";
      this.staminaPercentName=showSemesterScore.staminaPercent>0?"体能 ("+showSemesterScore.staminaPercent+"%)":"";
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
            if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"
                || result[i].examItemName == "800米跑"){
              result[i].examResult = vm.s_to_hs(result[i].examResult)
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
               vm.staminaResultDataFirst=[];
                for(let i=0;i<result.length;i++){
                    if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"){
                      result[i].examResult = vm.s_to_hs(result[i].examResult)+result[i].examUnit
                    }else if(result[i].examUnit == '99'){
                      result[i].examResult += "分"
                    }else if(result[i].examUnit == '个数'){
                      result[i].examResult += "个"
                    } else if(result[i].examUnit && result[i].examUnit == "分.秒"){
                      let data = result[i].examResult;
                      result[i].examResult=Number(data)%60>0?(Math.floor(Number(data)/60)+'\''+(Number(data)%60)+'\"'):Number(data)/60+'\'';
                    }else{
                      result[i].examResult += result[i].examUnit
                    }

                    if(result[i].examItemType == '1'){
                        vm.healthResultDataFirst.push(result[i]);
                    }else if(result[i].examItemType == '3'){
                        if('1' == result[i].infoStatus){
                            result[i].testTime = result[i].createTime
                            result[i].examResult='免试'
                            if(1 == result[i].exemptType){
                                result[i].score = '70'
                                result[i].scoreLevel = 3
                            }else if(2 == result[i].exemptType){
                                result[i].score = '80'
                                result[i].scoreLevel = 2
                            }
                        }
                        vm.staminaResultDataFirst.push(result[i]);
                    }else{
                        vm.actionResultDataFirst.push(result[i]);
                        if('1' == result[i].infoStatus){
                        result[i].testTime = result[i].createTime
                        result[i].examResult='免试'
                        if(1 == result[i].exemptType){
                          result[i].score = '70'
                          result[i].scoreLevel = 3
                        }else if(2 == result[i].exemptType){
                          result[i].score = '80'
                          result[i].scoreLevel = 2
                        }
                      }
                    }
                }
            }else{
                vm.actionResultDataSecond=[];
                vm.healthResultDataSecond=[];
                vm.staminaResultDataSecond=[];
                for(let i=0;i<result.length;i++){
                    if(result[i].examItemName == "50米X8往返跑" || result[i].examItemName == "1000米跑"){
                      result[i].examResult = vm.s_to_hs(result[i].examResult)+result[i].examUnit
                    }else if(result[i].examUnit == '99'){
                      result[i].examResult += "分"
                    }else if(result[i].examUnit == '个数'){
                      result[i].examResult += "个"

                    }else if(result[i].examUnit && result[i].examUnit == "分.秒"){
                      let data = result[i].examResult;
                      result[i].examResult=Number(data)%60>0?(Math.floor(Number(data)/60)+'\''+(Number(data)%60)+'\"'):Number(data)/60+'\'';
                    }else{
                      result[i].examResult += result[i].examUnit
                    }

                    if(result[i].examItemType == '1'){
                        vm.healthResultDataSecond.push(result[i]);
                    }else if(result[i].examItemType == '3'){
                        if('1' == result[i].infoStatus){
                            result[i].testTime = result[i].createTime
                            result[i].examResult='免试'
                            if(1 == result[i].exemptType){
                                result[i].score = '70'
                                result[i].scoreLevel = 3
                            }else if(2 == result[i].exemptType){
                                result[i].score = '80'
                                result[i].scoreLevel = 2
                            }
                        }
                        vm.staminaResultDataSecond.push(result[i]);
                    }else{
                        if('1' == result[i].infoStatus){
                          result[i].testTime = result[i].createTime
                          result[i].examResult='免试'
                          if(1 == result[i].exemptType){
                            result[i].score = '70'
                            result[i].scoreLevel = 3
                          }else if(2 == result[i].exemptType){
                            result[i].score = '80'
                            result[i].scoreLevel = 2
                          }
                        }
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
      this.getStudentFamilyIn(yearSemester);
      return ;


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

    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;

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
    vm.selectYear = sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-selectYear');

      this.queryStudentScoreByStudentId();
    vm. getStudentParentSignature(sessionStorage.getItem('sportsScoreStudent-sportsScoreStudentDetail-studentId'));


  }
};
</script>
