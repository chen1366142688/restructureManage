<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生成绩详情</h2>
    </div>
    <div>
      <Card :dis-hover="true">
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
      <Card :dis-hover="true">
       <div style="font-size:20px;height:40px;">
            体质测试
        </div>
        <div  style="margin-top:0px;" >
             <div style="float:left;">
                第一学期：{{(firstYearSemesterScore == null || firstYearSemesterScore.testScore <=0)?"--":(firstYearSemesterScore.testScore/100).toFixed(1)+"分"}}
            </div>
            <div style="margin-left:60px;float:left;width:160px;" >等级：{{firstYearSemesterScore ==null?"--":firstYearSemesterScore.testScoreLevel}} </div>
            <div style="clear:both" >
              <Row v-if="firstYearSemesterScore!=null" >
                <div style>
                  <Table border max-height="240" :loading="loading" :columns="testColumns" :data="testResultDataFirst"></Table>
                </div>
              </Row>
            </div>
        </div>
      </Card>

      <Card :dis-hover="true">
      <Tabs type="card" value="actionScore">
          <TabPane  name="actionScore" :label="actionPercentName">
              <div  style="margin-top:0px;" >
                  <div>
                      <div style="float:left;">第一学期</div>
                      <div style="margin-left:20px;float:left;width:100px;" >得分：{{firstYearSemesterScore ==null  ?"--":(firstYearSemesterScore.actionScore/100).toFixed(1)+"分"}} </div>

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
                  <!--          <div style="margin-top:20px;" v-if="selectYear!='1'">-->
                  <div>
                      <div style="float:left;">第二学期</div>
                      <div style="margin-left:20px;float:left;width:100px;" >得分：{{secondYearSemesterScore ==null  ?"--":(secondYearSemesterScore.actionScore/100).toFixed(1)+"分"}} </div>
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
          <TabPane  name="staminaScore" v-if="staminaPercentName" :label="staminaPercentName">
              <div  style="margin-top:0px;" >
                  <div>
                      <div style="float:left;">第一学期</div>
                      <div style="margin-left:20px;float:left;width:100px;" >得分：{{firstYearSemesterScore ==null  ?"--":(firstYearSemesterScore.staminaScore/100).toFixed(1)+"分"}} </div>
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
                  <!--          <div style="margin-top:20px;" v-if="selectYear!='1'">-->
                  <div>
                      <div style="float:left;">第二学期</div>
                      <div style="margin-left:20px;float:left;width:100px;" >得分：{{secondYearSemesterScore ==null  ?"--":(secondYearSemesterScore.staminaScore/100).toFixed(1)+"分"}} </div>
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
          <TabPane name="healthScore" :label="healthPercentName">
            <div  style="margin-top:0px;" >
                <div style="margin-top:0px;" >
                    <div>
                        <div style="float:left;">第一学期: 暂无数据</div>
                    </div>
                </div>
                <div style="margin-top:20px;" v-if="secondYearSemesterScore" >
                    <div>
                        <div style="float:left;"> 第二学期: 暂无数据</div>
                    </div>
                </div>
          </div>

       </TabPane>
          <TabPane name="homeworkScore" :label="athleticContestTopScoreName">
        <div style="margin-top:0px;" >
              <div>
                  <div style="float:left;">第一学期: 暂无数据</div>
              </div>
          </div>
          <div style="margin-top:20px;" v-if="secondYearSemesterScore" >
              <div>
                  <div style="float:left;"> 第二学期: 暂无数据</div>
              </div>
          </div>
       </TabPane>
      </Tabs>
      </Card>
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
      actionPercentName:"专项技能",
      healthPercentName:"体质健康监测",
      staminaPercentName:"基础体能",
      athleticContestTopScoreName:"竞赛加分",
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
          width:500,
          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.visionType == '1'){
                  text+="<div style='float:left;border-right:1px #BFC9CE solid;width:25%;padding-top:5px;'><div>裸眼视力</div><div style='text-align:center;'>左眼："+row.leftVision+"</div>"
                  text+='<div style="text-align:center;">右眼：'+row.rightVision+"</div></div>"
                  text+="<div  style='float:left;border-right:1px #BFC9CE solid;width:50%;padding-top:5px;'><div>串镜</div><div style='text-align:left;'>&nbsp;&nbsp;&nbsp;&nbsp;左眼："+(row.leftMirror=="0"?"正常":row.leftMirror=="1"?"正片上升、负片下降":row.leftMirror=="-1"?"正片下降、负片上升":row.leftMirror=="2"?"其他":row.leftMirror=="9"?"未测试":"--")+"</div>"
                  text+='<div style="text-align:left;">&nbsp;&nbsp;&nbsp;&nbsp;右眼：'+(row.rightMirror=="0"?"正常":row.rightMirror=="1"?"正片上升、负片下降":row.rightMirror=="-1"?"正片下降、负片上升":row.rightMirror=="2"?"其他":row.rightMirror=="9"?"未测试":"--")+"</div></div>"
                  text+="<div  style='float:left;width:25%;padding-top:5px;padding-bottom:5px;'><div>屈光不正</div><div style='text-align:center;' >左眼："+(row.leftLight=="0"?"正常":row.leftLight=="1"?"近视":row.leftLight=="2"?"远视":row.leftLight=="3"?"其他":"未测试")+"</div>"
                  text+='<div  style="text-align:center;">右眼：'+(row.rightLight=="0"?"正常":row.rightLight=="1"?"近视":row.rightLight=="2"?"远视":row.rightLight=="3"?"其他":"未测试")+"</div></div>"
            }else{
              text = row.examResult;
            }
            return h("div", {
              domProps: {
                innerHTML: text
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
          title: "得分",
          key: "score",
          align: "center",
          minWidth:100,
        render: (h, params) => {
            const row = params.row;
            var text=(row.score/100).toFixed(1);
            if(text == null){
                return h("div", "");
            }else{
                return h("div", text);
            }
        }
        },
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

    queryStudentScoreByStudentId() {
      var vm = this;
      this.$axios.get("/v1/semesterScore/queryStudentScoreByStudentIdKM?studentId="+vm.studentId+"&secondYearSemester="+vm.secondYearSemester+"&firstYearSemester="+vm.firstYearSemester).then(res => {
        if (res.data.code == 10000) {
          if(res.data.response != null && res.data.response.length > 0){
              if(res.data.response.length == 1 && res.data.response[0].yearSemester%2==1){
                  vm.secondYearSemesterScore = res.data.response[0];
                  vm.haveSecond='1';
              }else if(res.data.response.length == 1 && res.data.response[0].yearSemester%2==0){
                  vm.firstYearSemesterScore = res.data.response[0];
                  vm.haveFirst='1';
              }else{
                  vm.haveFirst='1';
                  vm.haveSecond='1';
                  if(res.data.response[0].yearSemester%2==1){
                      vm.secondYearSemesterScore = res.data.response[0];
                      vm.firstYearSemesterScore = res.data.response[1];
                  }else{
                      vm.secondYearSemesterScore = res.data.response[1];
                      vm.firstYearSemesterScore = res.data.response[0];
                  }
              }
          }

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

          if(vm.firstYearSemesterScore != null ){
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

        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
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
          let vision = res.data.response.vision;
          if(vision){
              vision.score='-';
              vision.scoreLevel='-';
              vision.examItemName='视力';
              vision.testTime=vision.createTime;
              vision.visionType='1';
              result.push(vision);
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
        this.$axios.post('/v1/exam/getStudentExamListV2KM', data).then(res => {
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
