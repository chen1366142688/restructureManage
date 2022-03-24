<template>
  <div style="padding-left:10px;">

    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentName}}</h2>
    </div>
    <Card :dis-hover="true">
      <p>
        <span>性别：{{gender==1?"男":"女"}}</span>
        <span style="margin-left:20px">学籍号：{{registerCode}}</span>
        <span style="margin-left:20px">班级：{{sportsClassName}}</span>
        <Button
          @click="pageToClassList"
          style="right:38%;position:absolute;top:12px;"
          type="success"
        >返回</Button>
      </p>
    </Card>
    <Card style="margin-top:20px;" :dis-hover="true">
    <Tabs type="card"  @on-click="tagClick" v-model="classTestName">
      <TabPane
        v-for="(classTest,index) in classTestList"
        :key="index"
        :name="classTest.classTestName"
        :label="classTest.commonStatus=='1'? classTest.classTestName : classTest.classTestName+'('+classTest.sportsClassName+')'"
      ></TabPane>
    </Tabs>
    <div style="margin:10px 0;">
        <p>
            <span>项目总得分：{{classTestScore/100}}</span>
            <span>模块等第：{{modelLevel==5?"A":modelLevel==4?"B":modelLevel==3?"C":modelLevel==2?"D":modelLevel==1?"E":""}}</span>
            <span>学分：{{credit}}</span>
        </p>
    </div>
    <Table border :columns="resultColumns" :data="resultData"></Table>
    <div style="margin:10px 0;">
        <p v-if="learnAttitudeExempt">
            <span>学习态度：</span>
            <span>得分：{{learnScore/100}}（免试）</span>
        </p>
        <p v-else>
            <span>学习态度：</span>
            <span>被扣分数：{{100-(learnScore/100)}}</span>
            <span>剩余分数：{{learnScore/100}}</span>
        </p>
    </div>
    <Table v-if="!learnAttitudeExempt" border :columns="resultColumnsLearn" :data="resultDataLearn"></Table>
    <div style="margin:10px 0;">
        <p v-if="homeWorkExempt">
            <span>课外锻炼：</span>
            <span>得分：{{homeworkScore/100}}（免试）</span>
        </p>
        <p v-else>
            <span>课外锻炼：</span>
            <span>锻炼总次数：{{homeworkCount}}</span>
            <span>得分：{{homeworkScore/100}}</span>
        </p>
    </div>
    <Table v-if="!homeWorkExempt" border :columns="resultColumnsHomework" :data="resultDataHomework"></Table>
    </Card>
    <Modal v-model="showModel11" title="修改成绩" @on-ok="submit" >
      <p v-if="examItemType==1">
        <span>
          成绩：
          <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
        </span>
        <span style="margin-left:20px;">得分：{{score}}</span>
        <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
      </p>
      <p v-if="examItemType==2">
        <span>
          得分：
          <Input v-model="teacherScore" size="small" style="width:180px;" placeholder="得分"></Input>
        </span>
        <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
      </p>
      <div v-if="examItemType==4">
          <p>
          <span>
            成绩：
            <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
          </span>
          <span style="margin-left:20px;">得分范围：{{scoreStart}}--{{scoreEnd}}</span>
          <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
          </p>
          <p style="margin-top:20px;">
            请老师选择得分：
          </p>
          <div style="height:24px;width:18px;display: inline-table;background-color: #E9E9E9;margin-left:20px;" @click="chosse1(idindex,item.value)" class="fwdf" :id="'div1'+idindex" v-for="item,idindex in scoreList">
             <p style="text-align:center">{{item.name}}</p>
          </div>
          <!-- <Tag type="border" color="default" v-for="item in scoreList">{{item.name}}</Tag> -->
      </div>
      <div v-if="examItemType==3">
          <p>
          <span>
            成绩：
            <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
          </span>
          <span style="margin-left:20px;">得分：{{score}}</span>
          <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
          </p>
          <p style="margin-top:20px;">
            请老师选择技评分数：
          </p>
          <br/>
          <div style="height:43px;width:89px;display: inline-table;background-color: #E9E9E9;margin-left:20px;" @click="chosse(idindex,item.testScore)" class="jpdf" :id="'div'+idindex" v-for="item,idindex in scoreRemarkList">
             <p style="text-align:center">{{item.scoreRemark}}</p>
              <p style="text-align:center">{{parseInt(item.testScore*(100-examItemPercent)/100)}}</p>
          </div>
      </div>
      <div v-if="examItemType==5">
          <p>
          <span>
            成绩：
            <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
          </span>
          <span style="margin-left:20px;">得分：{{score}}</span>
          <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span>
          </p>
          <p style="margin-top:20px;">
            请老师填写技评得分：<Input v-model="teacherScore" size="small" style="width:180px;" placeholder="技评得分"></Input>
          </p>

      </div>

    </Modal>
  </div>
</template>

<script>
export default {
  name: "teacherDetail",
  data() {
    return {
      classTestScore:'',
      modelLevel:'',
      credit:'',
      learnScore:'',
      learnAttitudeExempt:false,
      homeWorkExempt:false,
      homeworkScore:'',
      homeworkCount:'',
      showModel11: false,
      studentId: "",
      studentName: "",
      examItemId: "",
      examItemName: "",
      gradeId: "",
      gender: "",
      sportsClassName: "",
      sportsClassId:'',
      registerCode:'',
      schoolId: "",
      classTestName:'',
      classTestId:'',
      classTestList: [],
      examItemId: "",
      totalScore: "",
      scoreLevel: "",
      signatureAddr: "",
      resultData: [],
      resultColumns: [
        {
          title: "考核项目",
          key: "examItemName",
          align: "center",
          minWidth:100
        },
        {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm=this;
            let data=params.row.resultValue;
            if(params.row.exempt=="1"){
              return h("div", [h("span", "免试")]);
            }
            if(params.row.examUnit && params.row.examUnit == "分.秒"){
              data=Number(data)%60>0?(Math.floor(Number(data)/60)+'\''+(Number(data)%60)+'\"'):Number(data)/60+'\"'
            }else{
              data=params.row.examUnit != '99' ? (data + params.row.examUnit) : params.row.resultValue
            }
            if (!params.row.resultValue) {
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
          title: "基础得分",
          key: "baseScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.baseScore;
            if(params.row.exempt=="1"){
              return h("div", [h("span", params.row.exemptType=="1"?70:80)]);
            }
            return h("div", text);
          }
        },
        {
          title: "技评得分",
          key: "teacherScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.teacherScore;
            if(params.row.exempt=="1"){
              return h("div", [h("span", params.row.exemptType=="1"?70:80)]);
            }
            return h("div", text);
          }
        },
        {
          title: "得分",
          key: "score",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.score;
            if(params.row.exempt=="1"){
              return h("div", [h("span", params.row.exemptType=="1"?70:80)]);
            }
            return h("div", text);
          }
        },
        {
          title: "录入老师",
          key: "teacherName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.score;
            if(params.row.exempt=="1"){
              return h("div", [h("span", "--")]);
            }
            return h("div", params.row.teacherName);
          }
        },
        {
          title: "考核时间",
          key: "createTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.score;
            if(params.row.exempt=="1"){
              return h("div", [h("span", "--")]);
            }
            return h("div", params.row.createTime);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            if(params.row.exempt=="1"){
              return h("div", [h("span", "--")]);
            }
            return h("div", [
              params.row.infoStatus == 1
                ? h(
                    "Button",
                    {
                      props: {
                        type: "success",
                        disabled:params.row.exempt=="1"?true:false
                      },
                      style: {
                        marginRight: "5px"
                      },
                      on: {
                        click: () => {
                          this.saveShowType(params.row);
                        }
                      }
                    },
                    "修改"
                  )
                : ""
            ]);
          }
        },
      ],
      resultColumnsLearn: [
        {
          title: "扣分项",
          key: "item",
          align: "center",
          minWidth:100
        },
        {
          title: "扣除分数",
          key: "score",
          align: "center",
          minWidth:100
        },
        {
          title: "考核老师",
          key: "teacherName",
          align: "center",
          minWidth:100
        },
        {
          title: "考核时间",
          key: "time",
          align: "center",
          minWidth:100
        },
      ],
      resultDataLearn: [],
      resultColumnsHomework: [
        {
          title: "完成时间",
          key: "createTime",
          align: "center",
          minWidth:100
        },
        {
          title: "考核老师",
          key: "teacherName",
          align: "center",
          minWidth:100
        },
      ],
      resultDataHomework: [],
      classTestType: "",
      resultValue: "",
      resultValueShow:"",
      score: "",
      scoreLevelNew: "",
      baseScore: "",
      teacherScore: "",
      examItemType: "",
      scoreStart:'',
      scoreEnd:'',
      scoreList:[],
      scoreRemarkList:[],
      examUnit:'',
      examItemPercent:'',
      standardList:[],
      baseStandard:[
        {
          start:10,
          end:59,
          level:"4"
        },
        {
          start:60,
          end:74,
          level:"3"
        },
        {
          start:75,
          end:89,
          level:"2"
        },
        {
          start:90,
          end:100,
          level:"1"
        },
      ]
    };
  },
  methods: {
    pageToClassList() {
      //返回
      this.$router.go(-1);
    },
    saveShowType(examItem) {
      var vm = this;
      vm.examItemId=examItem.examItemId;
      // vm.getTestUpdateRule(examItem.examItemId);
      var list1=document.getElementsByClassName("jpdf")
      var list2=document.getElementsByClassName("fwdf")

      if(list1){
        for(let i=0;i<list1.length;i++){
          list1[i].style.background = "#E9E9E9"
        }
      }
      if(list2){
        for(let i=0;i<list2.length;i++){
          list2[i].style.background = "#E9E9E9"
        }
      }
      vm.resultValue="";
      vm.resultValueShow="";
      vm.scoreStart='';
      vm.scoreEnd="";
      vm.scoreList=[];
      vm.score='';
      vm.scoreLevelNew="5"
      vm.baseScore='';
      vm.teacherScore='';
      vm.showModel11 = true;
    },
    tagClick(classTestName) {
      var vm = this;
      vm.resultDataLearn=[];
            vm.resultData=[];
            vm.resultDataHomework=[];
      vm.scoreLevelNew='';
      vm.score='';
      vm.teacherScore='';
      vm.baseScore='';
      vm.resultValue="";
      vm.resultValueShow="";
      sessionStorage.setItem("studentExamDetailHighCD-classTestName-classTestName",classTestName);
      for (var i = 0; i < vm.classTestList.length; i++) {
        if (classTestName == vm.classTestList[i].classTestName) {
          vm.classTestId = vm.classTestList[i].classTestId;
          vm.classTestScore = vm.classTestList[i].actionScore;
            vm.modelLevel = vm.classTestList[i].modelLevel;
            vm.credit = vm.classTestList[i].credit;
            vm.learnScore = vm.classTestList[i].learnAttitudeScore;
            vm.homeworkCount = vm.classTestList[i].homeworkNum;
            vm.homeworkScore=vm.classTestList[i].homeworkScore;
            vm.learnAttitudeExempt=vm.classTestList[i].learnAttitudeExempt=="1"?true:false;
                    vm.homeWorkExempt=vm.classTestList[i].homeworkExempt=="1"?true:false;
            break;
        }
      }
      vm.getStudentExamHistoryList();
    },
    chosse(idindex,testScore){
      var vm=this;
      document.getElementById("div"+idindex).style.background = "#00C693"
      for(var i=0;i<vm.scoreRemarkList.length;i++){
        if(i!=idindex){
          document.getElementById("div"+i).style.background = "#E9E9E9"
        }
      };
      vm.teacherScore=testScore
    },
    chosse1(idindex,item){
      var vm=this;
      document.getElementById("div1"+idindex).style.background = "#00C693"
      for(var i=0;i<vm.scoreList.length;i++){
        if(i!=idindex){
          document.getElementById("div1"+i).style.background = "#E9E9E9"
        }
      };
      vm.score=item
    },
    getStudentClassTestList() {
      var vm = this;
      this.$axios.get("/v1/cd/high/skills/getStudentClassTestList?schoolId=1&yearSemester=1&sportsClassId="+vm.sportsClassId+"&studentId="+vm.studentId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.classTestList = data;
            // for(let i=0;i<data.length;i++){
            //   if(data[i].commonStatus=='1'){
            //     continue;
            //   }else{
            //     data[i].classTestName=data[i].classTestName+"("+data[i].sportsClassName+")"
            //   }
            // }
            if(sessionStorage.getItem("studentExamDetailHighCD-classTestName-classTestName")){
              let classTestName=sessionStorage.getItem("studentExamDetailHighCD-classTestName-classTestName")
              vm.classTestName=classTestName;
              for (var i = 0; i < vm.classTestList.length; i++) {
                if (classTestName == vm.classTestList[i].classTestName) {
                  vm.classTestId = vm.classTestList[i].classTestId;
                  vm.classTestScore = vm.classTestList[i].actionScore;
                    vm.modelLevel = vm.classTestList[i].modelLevel;
                    vm.credit = vm.classTestList[i].credit;
                    vm.learnScore = vm.classTestList[i].learnAttitudeScore;
                    vm.homeworkCount = vm.classTestList[i].homeworkNum;
                    vm.homeworkScore=vm.classTestList[i].homeworkScore;
                    vm.learnAttitudeExempt=vm.classTestList[i].learnAttitudeExempt=="1"?true:false;
                    vm.homeWorkExempt=vm.classTestList[i].homeworkExempt=="1"?true:false;
                    break;
                }
              }
            }else{
              vm.classTestId=data[0].classTestId
              vm.classTestScore = data[0].actionScore;
              vm.modelLevel = data[0].modelLevel;
              vm.credit = data[0].credit;
              vm.learnScore = data[0].learnAttitudeScore;
              vm.homeworkCount = data[0].homeworkNum;
              vm.homeworkScore=data[0].homeworkScore
              vm.learnAttitudeExempt=data[0].learnAttitudeExempt=="1"?true:false;
              vm.homeWorkExempt=data[0].homeworkExempt=="1"?true:false;
            }
            vm.getStudentExamHistoryList();
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentExamHistoryList() {
      var vm = this;
      this.$axios.get("/v1/cd/high/skills/getStudentExamHistoryList?schoolId=1&yearSemester=1&sportsClassId="+vm.sportsClassId+"&studentId="+vm.studentId+"&classTestId="+vm.classTestId)
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.resultDataLearn=[];
            vm.resultData=[];
            for(let i=0;i<data.examItemList.length;i++){
              let examItem=data.examItemList[i];
              if(!examItem.resultValue && examItem.exempt=='0'){
                continue;
              }else{
                if(examItem.exempt=='1' && examItem.exemptType=="1"){
                  examItem.score=80;
                  examItem.baseScore=80;
                  examItem.teacherScore=80;
                  examItem.teacherName="--";
                  examItem.createTime="--";
                }else if(examItem.exempt=='1' && examItem.exemptType=="2"){
                  examItem.score=70;
                  examItem.baseScore=70;
                  examItem.teacherScore=70;
                  examItem.teacherName="--";
                  examItem.createTime="--";
                }
                vm.resultData.push(examItem)
              }
            }
            vm.dealLearnData(data.learnList?data.learnList:[]);
            vm.resultDataHomework=data.homeworkList?data.homeworkList:[];
          } else {
            if (res.data.code > 39999) {
              // this.$Message.info(res.data.msg);
            }
          }
        });
    },
    dealLearnData(learnList){
      var vm=this;
      if(learnList.length>0){
        for(let i=0;i<learnList.length;i++){
          let data=learnList[i];
          if(data.earlyCount){
            let parmas={
              item:'早退',
              score:data.earlyCount*data.earlyScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
          if(data.lateCount){
            let parmas={
              item:'迟到',
              score:data.lateCount*data.lateScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
          if(data.notAccordClothing){
            let parmas={
              item:'运动着装不符',
              score:data.notAccordClothing*data.notAccordClothingScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
          if(data.notSeriousCount){
            let parmas={
              item:'不认真',
              score:data.notSeriousCount*data.notSeriousScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
          if(data.sickCount){
            let parmas={
              item:'病假',
              score:data.sickCount*data.sickScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
          if(data.thingCount){
            let parmas={
              item:'事假',
              score:data.thingCount*data.thingScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
          if(data.truancyCount){
            let parmas={
              item:'旷课',
              score:data.truancyCount*data.truancyScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
          if(data.violateDisciplineCount){
            let parmas={
              item:'违反纪律',
              score:data.violateDisciplineCount*data.violateDisciplineScore/100,
              teacherName:data.teacherName,
              time:data.createTime
            }
            vm.resultDataLearn.push(parmas);
          }
        }
      }else{
        vm.resultDataLearn=learnList
      }
    },
    getTestUpdateRule(examItemId) {
      var vm = this;
      vm.standardList=[]
      this.$axios
        .get(
          "/v1/cd/high/skills/getTestUpdateRule?grade=" +
            vm.gradeId +
            "&gender=" +
            vm.gender +
            "&sportsClassId=" +
            vm.sportsClassId +
            "&schoolType=" +
            "&examItemId=" +
            examItemId+
            "&studentId=" +
            vm.studentId
        )
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.examItemType=data.examItemType2
            vm.examUnit=data.examUnit;
            vm.examItemPercent=data.examItemPercent;
            vm.scoreRemarkList=data.scoreRemarkList;
            if(data.standardVOS){
              for(let i=0;i<data.standardVOS.length;i++){
                if(vm.gender==data.standardVOS[i].gender){
                  vm.standardList.push(data.standardVOS[i]);
                }
              }
            }
            // vm.standardList=data.standardVOS;
          } else {
            if (res.data.code > 39999) {
              // this.$Message.info(res.data.msg);
            }
          }
        });
    },
    submit() {
      var vm = this;
      // if(vm.examItemType==2){
      //   vm.teacherScore="";
      // }
      if(!vm.scoreLevelNew){
        vm.$Message.info("数据有误，请核对后提交");
        return false;
      }
      this.$axios
        .get(
          "/v1/cd/high/skills/saveTestResult?grade=" +
            vm.gradeId +
            "&studentId=" +
            vm.studentId +
            "&examItemId=" +
            vm.examItemId +
            "&resultValue=" +
            vm.resultValue +
            "&schoolType=" +
            vm.schoolType +
            "&score=" +
            vm.score +
            "&examItemType=" +
            vm.examItemType +
            "&scoreLevel=" +
            vm.scoreLevelNew +
            "&baseScore=" +
            vm.baseScore +
            "&teacherScore=" +
           (vm.examItemType==2?"":vm.teacherScore)

        )
        .then(function(res) {
          if (res.data.code == 10000) {
            if (res.data.response.code == 1) {
              vm.$Message.info("操作成功！");
              vm.getStudentClassTestList();
            } else {
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
    },
    resultValueChange(){
      var vm=this;
      let type=vm.examItemType;
      let standList=vm.standardList;
      let examItemPercent=vm.examItemPercent;
      let scoreRemarkList=vm.scoreRemarkList;
      if(type=="2"){
        return;
      }
      if(!vm.teacherScore || !vm.score){
        vm.score='';
        vm.scoreLevelNew="5";
        vm.baseScore='';
      }

      if(type==1){
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
          // if(vm.resultValue>=standList[i].scoringCriteriaStart && vm.resultValue<=standList[i].scoringCriteriaEnd ){
            vm.score=standList[i].score;
            vm.scoreLevelNew=standList[i].scoreLevel;
          }
        }
      }else if(type==3){
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
          // if(vm.resultValue>=standList[i].scoringCriteriaStart && vm.resultValue<=standList[i].scoringCriteriaEnd ){
            vm.baseScore=standList[i].score;
          }
        }
        if(!vm.baseScore){
          vm.baseScore=0
        }
        let mScore=vm.baseScore*examItemPercent/100;
        vm.score=mScore+(vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100
        if(vm.score<10){
          vm.score=10;
        }
        for(var i=0;i<vm.baseStandard.length;i++){
          if(vm.score>=vm.baseStandard[i].start && vm.score<=vm.baseStandard[i].end ){
            vm.scoreLevelNew=vm.baseStandard[i].level;
          }
        }
      }else if(type==4){
        vm.scoreList=[];
        let scoreOne=0;
        let scoreTwo=0;
        let scoreThree=0;
        let scoreFour=0;
        vm.scoreStart=0;
        vm.scoreEnd=0;
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.scoreLevelNew=standList[i].scoreLevel;
          }
          if(standList[i].scoreLevel==1){
               scoreOne=standList[i].score;
            }
            if(standList[i].scoreLevel==2){
              scoreTwo=standList[i].score;
            }
            if(standList[i].scoreLevel==3){
              scoreThree=standList[i].score;
            }
            if(standList[i].scoreLevel==4){
               scoreFour=standList[i].score;
            }
        }
        if(vm.scoreLevelNew==1){
               vm.scoreStart=scoreOne;
               vm.scoreEnd=100;
            }
            if(vm.scoreLevelNew==2){
             vm.scoreStart=scoreTwo;
               vm.scoreEnd=scoreOne-1;
            }
            if(vm.scoreLevelNew==3){
              vm.scoreStart=scoreThree;
               vm.scoreEnd=scoreTwo-1;
            }
            if(vm.scoreLevelNew==4){
               vm.scoreStart=scoreFour;
               vm.scoreEnd=scoreThree-1;
            }
            if(!vm.scoreLevelNew){
              vm.scoreLevelNew=4;
            }
        let length=vm.scoreEnd-vm.scoreStart+1;
            for(var j=0;j<length;j++){
              let num=Number(vm.scoreStart)+Number(j)
                let data={
                  name:num,
                  value:num
                }
                vm.scoreList.push(data)
            }
      }else if(type==5){
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
          // if(vm.resultValue>=standList[i].scoringCriteriaStart && vm.resultValue<=standList[i].scoringCriteriaEnd ){
            vm.baseScore=standList[i].score;
          }
        }
        if(!vm.baseScore){
          vm.baseScore=0
        }
        let mScore=vm.baseScore*examItemPercent/100;
        vm.score=mScore+(vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100
        if(vm.score<10){
          vm.score=10;
        }
        for(var i=0;i<vm.baseStandard.length;i++){
          if(vm.score>=vm.baseStandard[i].start && vm.score<=vm.baseStandard[i].end ){
            vm.scoreLevelNew=vm.baseStandard[i].level;
          }
        }
      }
    }
  },
  mounted() {
    var vm = this;
    vm.schoolType=sessionStorage.getItem("schoolType");
    vm.studentId=sessionStorage.getItem("examQueryStudent-studentExamDetailHighCD-studentId");
    vm.studentName=  sessionStorage.getItem('examQueryStudent-studentExamDetailHighCD-studentName')
    vm.gradeId=  sessionStorage.getItem("examQueryStudent-studentExamDetailHighCD-gradeId");
    vm.gender=  sessionStorage.getItem('examQueryStudent-studentExamDetailHighCD-gender')
    vm.sportsClassName=  sessionStorage.getItem('examQueryStudent-studentExamDetailHighCD-sportsClassName')
    vm.sportsClassId=  sessionStorage.getItem('examQueryStudent-studentExamDetailHighCD-sportsClassId')
    vm.registerCode=  sessionStorage.getItem('examQueryStudent-studentExamDetailHighCD-registerCode')
    vm.getStudentClassTestList();

  },
  watch: {
    examItemId: function() {
      var vm = this;
      vm.totalScore = "";
      vm.scoreLevel = "";
      vm.yearSemester = "";
      vm.getTestUpdateRule(vm.examItemId);
    },
    resultValueShow:function(){
      let vm = this;
      if(vm.resultValueShow==null || vm.resultValueShow == ""){
        return;
      }
      let data = vm.resultValueShow;
      if(vm.examUnit && vm.examUnit == "分.秒"){
           data = data.replace("\"","");
           data = data.replace("\“","");
           data = data.replace("\”","");

            let seconds = data.split("′");
            if (seconds.length == 1) {
                seconds = data.split("'");
            }
            if (seconds.length == 1) {
                seconds = data.split("’");
            }
            if (seconds.length == 1) {
                seconds = data.split("‘");
            }
            let totalTime = 0;
            if (seconds.length > 1) {
                totalTime = Number(seconds[0]) * 60 + Number(seconds[1]);
            } else {
                totalTime = Number(seconds[0]) * 60;
            }
            data=totalTime;
      }
      vm.resultValue = data;
      vm.resultValueChange();
    },
    teacherScore:function(){
      var vm=this;
      if(vm.teacherScore==null || vm.teacherScore == ""){
        return;
      }
      let standList=vm.standardList;
      if(vm.examItemType==2){
        for(var i=0;i<standList.length;i++){
          if(Number(vm.teacherScore)>=Number(standList[i].scoringCriteriaStart) && Number(vm.teacherScore)<=Number(standList[i].scoringCriteriaEnd) ){
            vm.resultValue=vm.teacherScore
            vm.score=standList[i].score;
            vm.scoreLevelNew=standList[i].scoreLevel;
          }
        }
      }else{
        let examItemPercent=vm.examItemPercent;
        let mScore=vm.baseScore*examItemPercent/100;
        vm.score=mScore+parseInt((vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100)
        if(vm.score<10){
          vm.score=10;
        }
        for(var i=0;i<vm.baseStandard.length;i++){
          if(vm.score>=vm.baseStandard[i].start && vm.score<=vm.baseStandard[i].end ){
            vm.scoreLevelNew=vm.baseStandard[i].level;
          }
        }
      }
    },
  }
};
</script>
