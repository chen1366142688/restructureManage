<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentName}}</h2>
    </div>
    <Card>
      <div class="top-search">
        <div style="width:62%">
          <span>年级：{{gradeId==1?"一年级":gradeId==2?"二年级":gradeId==3?"三年级":gradeId==4?"四年级":gradeId==5?"五年级":gradeId==6?"六年级":gradeId==7?"七年级":gradeId==8?"八年级":gradeId==9?"九年级":gradeId==10?"高一":gradeId==11?"高二":gradeId==12?"高三":""}}</span>
          <span style="margin-left:20px">班级：{{studentClass}}班</span>
          <span style="margin-left:20px">性别：{{gender==1?"男":"女"}}</span>
        </div>
        <div style="width:38%;">
          <Button
            @click="pageToClassList"
            type="success"
          >返回</Button>
        </div>
      </div>
    </Card>
    <Card style="margin-top:20px;" :dis-hover="true">
    <div style="font-size:20px;height:40px;">
         考核记录
     </div>
    <Tabs type="card"  @on-click="tagClick" v-model="examItemName">
      <TabPane
        v-for="(examItem,index) in examItemList"
        :key="index"
        :label="examItem.examItemName"
        :name="examItem.examItemName"
      ></TabPane>
    </Tabs>
      <Form :label-width="100" class="function">
        <FormItem label="历史数据">
          <Table border :columns="resultColumns" :data="resultData"></Table>
        </FormItem>
      </Form>
    </Card>
    <Card  style="margin-top:20px;" :dis-hover="true">
      <Form :label-width="100" class="function">
        <FormItem label="学生签名">
          <div style="width: 280px;height:390px;border:1px solid rgba(211,211,211,1);line-height:390px;text-align:center;">
            <img :src="signatureAddr" v-if="signatureAddr" style="width: 275px;height:385px" />
            <span v-else>暂无学生签名数据</span>
          </div>
          <div style="position:absolute;top:2px;left:350px;">
          <Button @click="clearSignPre" type="success" :disabled="signatureAddrTf">清除签名</Button>
          </div>
        </FormItem>
      </Form>
    </Card>
    <Modal v-model="showModel11" title="修改成绩" @on-ok="submit" >
      <p v-if="examItemType==1">
        <span>
          成绩：
          <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
        </span>
        <span style="margin-left:20px;">得分：{{score}}</span>
        <!-- <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span> -->
      </p>
      <p v-if="examItemType==2">
        <span>
          得分：
          <Input v-model="teacherScore" size="small" style="width:180px;" placeholder="得分"></Input>
        </span>
        <!-- <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span> -->
      </p>
      <div v-if="examItemType==4">
          <p>
          <span>
            成绩：
            <Input v-model="resultValueShow" size="small" style="width:180px;" placeholder="成绩"></Input>
          </span>
          <span style="margin-left:20px;">得分范围：{{scoreStart}}--{{scoreEnd}}</span>
          <!-- <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span> -->
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
          <!-- <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span> -->
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
          <!-- <span style="margin-left:20px;">等级：{{scoreLevelNew==1?"优秀":scoreLevelNew==2?"良好":scoreLevelNew==3?"及格":scoreLevelNew==4?"不及格":"未测试"}}</span> -->
          </p>
          <p style="margin-top:20px;">
            请老师填写技评得分：<Input v-model="teacherScore" size="small" style="width:180px;" placeholder="技评得分"></Input>
          </p>
          
      </div>
      
    </Modal>
    <Modal v-model="updateModal" title="提醒" @on-ok="saveShowType" @on-cancel="cancel">
            <p>学生已签名，修改成绩后，将删除签名，学生需重新签名，是否确认修改？</p>
        </Modal>
        <Modal v-model="clearModal" title="清除签名" @on-ok="clearSign" @on-cancel="cancel">
            <p style="color:red">执行此操作后，将清除学生签名，是否确定开启学生重新签名？</p>
        </Modal>
  </div>
</template>

<script>
export default {
  name: "teacherDetail",
  data() {
    return {
      updateModal:false,
      clearModal:false,
      showModel11: false,
      studentId: "",
      studentName: "",
      examItemName: "",
      gradeId: "",
      gender: "",
      studentClass: "",
      schoolId: "",
      examItemList: [],
      examItemId: "",
      totalScore: "",
      scoreLevel: "",
      signatureAddr: "",
      signatureAddrTf: true,
      resultData: [],
      resultColumns: [
        {
          title: "成绩",
          key: "resultValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm=this;
            let data=params.row.resultValue;
            if(vm.examItemExempt=="1"){
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
          title: "成绩得分",
          key: "baseScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm=this;
            const row = params.row;
            const text = row.baseScore;
            if(vm.examItemExempt=="1"){
              return h("div", [h("span", "--")]);
            }else{
              return h("div", text);
            }
          }
        },
        {
          title: "技评得分",
          key: "teacherScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm=this;
            const row = params.row;
            const text = row.teacherScore;
            if(vm.examItemExempt=="1"){
              return h("div", [h("span", "--")]);
            }else{
              return h("div", text);
            }
          }
        },
        {
          title: "总得分",
          key: "score",
          align: "center",
         minWidth:100,
        },
        // {
        //   title: "等级",
        //   key: "scoreLevel",
        //   align: "center",
        //   minWidth:100,
        //   render: (h, params) => {
        //     var vm=this;
        //     const row = params.row;
        //     var text = row.scoreLevel;
        //     if(vm.examItemExempt=="1"){
        //       return h("div", [h("span", params.row.scoreLevel)]);
        //     }else{
        //       text = text=='1'?"优秀":text=='2'?"良好":text=='3'?"及格":text=='4'?"不及格":""
        //       return h("div", text);
        //     }
        //   }
        // },
        {
          title: "录入老师",
          key: "teacherName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm=this;
            const row = params.row;
            const text = row.score;
            if(vm.examItemExempt=="1"){
              return h("div", [h("span", "--")]);
            }else{
              return h("div", params.row.teacherName);
            }
          }
        },
        {
          title: "录入时间",
          key: "createTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm=this;
            const row = params.row;
            const text = row.score;
            if(vm.examItemExempt=="1"){
              return h("div", [h("span", "--")]);
            }else{
              return h("div", params.row.createTime);
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:200,
          render: (h, params) => {
            var vm = this;
            return h("div", [
              params.row.infoStatus == 1
                ? h(
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
                          this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
                            if (res.data.code === 10000) {
                              let {editStatus} = res.data.response
                              if (editStatus === '1') {
                                if(vm.signatureAddr){
                                  vm.updateModal=true
                                }else{
                                  this.saveShowType();
                                }
                              } else {
                                this.$Modal.info({
                                    title: '提醒',
                                    okText: '知道了',
                                    closable: false,
                                    content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
                                });
                              }
                            }
                          })
                        }
                      }
                    },
                    "修改"
                  )
                : ""
            ]);
          }
        },
        {
          title: "备注",
          key: "createTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            // console.log(params.row);
            return h("div", [
              h(
                "span",
                vm.signatureAddr&&params.row._index==0
                  ? "该学生已确认已签名，成绩修改之后，需要学生在教师端小程序重新确认签名。"
                  : "~"
              )
            ]);
          }
        }
      ],
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
      ],
      examItemExempt:'',
      examItemExemptType:'',
    };
  },
  methods: {
    pageToClassList() {
      //返回
      this.$router.go(-1);
    },
    cancel(){
      var vm=this;
      vm.updateModal=false;
      vm.clearModal=false;
    },
    saveShowType() {
      var vm = this;
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
    tagClick(examItemName) {
      var vm = this;
      vm.scoreLevelNew='';
      vm.score='';
      vm.teacherScore='';
      vm.baseScore='';
      vm.resultValue="";
      vm.resultValueShow="";
      for (var i = 0; i < vm.examItemList.length; i++) {
        if (examItemName == vm.examItemList[i].examItemName) {
          vm.examItemId = vm.examItemList[i].examItemId;
        }
      }
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
      // console.log(item)
      
      document.getElementById("div1"+idindex).style.background = "#00C693"
      for(var i=0;i<vm.scoreList.length;i++){
        if(i!=idindex){
          document.getElementById("div1"+i).style.background = "#E9E9E9"
        }
      };
      vm.score=item
      // console.log(vm.score)
    },
    clearSignPre(){
      var vm=this;
      this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
                            if (res.data.code === 10000) {
                              let {editStatus} = res.data.response
                              if (editStatus === '1') {
                                vm.clearModal=true;
                              } else {
                                this.$Modal.info({
                                    title: '提醒',
                                    okText: '知道了',
                                    closable: false,
                                    content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
                                });
                              }
                            }
                          })
    },
    clearSign() {
      var vm = this;
      this.$axios
        .get(
          "/v1/studentexam/clearSign?studentId=" +vm.studentId 
        )
        .then(function(res) {
          if (res.data.code == 10000) {
            if (res.data.response.code == 1) {
              vm.$Message.info("操作成功！");
              vm.getStudentTestDetailInfo(vm.studentId,vm.examItemId )
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
    getStudentJoinExamItemList(studentId, classTestType) {
      var vm = this;
      this.$axios
        .get(
          "/v1/studentexam/getStudentJoinExamItemList?studentId=" +
            studentId +
            "&classTestType=" +
            classTestType
        )
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.examItemList = data;
            for (var i = 0; i < vm.examItemList.length; i++) {
              if (vm.examItemId == vm.examItemList[i].examItemId) {
                vm.examItemName = vm.examItemList[i].examItemName;
                vm.examItemExempt=vm.examItemList[i].exemptStatus;
                vm.examItemExemptType=vm.examItemList[i].exemptType;
              }
            }
            if(vm.examItemId == null || vm.examItemId == ""){
                vm.examItemId = vm.examItemList[0].examItemId;
                vm.examItemName = vm.examItemList[0].examItemName;
                 vm.examItemExempt=vm.examItemList[0].exemptStatus;
                vm.examItemExemptType=vm.examItemList[0].exemptType;
            }
            vm.getStudentTestDetailInfo(
                sessionStorage.getItem("classExamManage1-studentExamDetail1-studentId"),
                vm.examItemId
            );
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentTestDetailInfo(studentId, examItemId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/studentexam/getStudentTestDetailInfo?studentId=" +
            studentId +
            "&examItemId=" +
            examItemId
        )
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            
            vm.totalScore = data.totalScore;
            vm.scoreLevel = data.scoreLevel;
            if(vm.examItemExempt=="1"){
              console.log(vm.examItemExemptType)
              console.log(vm.examItemExemptType=="1")
              vm.resultData=[
                {
                   "baseScore": vm.examItemExemptType=="1"?70:80,
                  "createTime": "",
                  "infoStatus": "0",
                  "resultValue": "免试",
                  "score": vm.examItemExemptType=="1"?70:80,
                  "scoreLevel": vm.examItemExemptType=="1"?'及格':'良好',
                  "teacherScore": vm.examItemExemptType=="1"?70:80
                }
              ]
            }else{
              vm.resultData = data.historyVOS;
            }
            vm.yearSemester = data.yearSemester;
            vm.signatureAddr = data.signatureAddr;
            vm.signatureAddrTf=data.signatureAddr?false:true
          } else {
            if (res.data.code== 40002) {
             if(vm.examItemExempt=="1"){
              console.log(vm.examItemExemptType)
              console.log(vm.examItemExemptType=="1")
              vm.resultData=[
                {
                   "baseScore": vm.examItemExemptType=="1"?70:80,
                  "createTime": "",
                  "infoStatus": "0",
                  "resultValue": "免试",
                  "score": vm.examItemExemptType=="1"?70:80,
                  "scoreLevel": vm.examItemExemptType=="1"?'及格':'良好',
                  "teacherScore": vm.examItemExemptType=="1"?70:80
                }
              ]
            }
            }
            if (res.data.code > 39999) {
              // this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getTestUpdateRule(examItemId) {
      var vm = this;
      vm.standardList=[]
      this.$axios
        .get(
          "/v1/studentexam/getTestUpdateRule?grade=" +
            vm.gradeId +
            "&gender=" +
            vm.gender +
            "&classId=" +
            vm.classId +
            "&schoolType=" +
            vm.schoolType +
            "&examItemId=" +
            examItemId
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
      console.log(vm.teacherScore)
      console.log(vm.scoreLevelNew)
      // if(vm.examItemType==2){
      //   vm.teacherScore="";
      // }
      if(!vm.scoreLevelNew){
        vm.$Message.info("数据有误，请核对后提交");
        return false;
      }
      this.$axios
        .get(
          "/v1/studentexam/saveTestResult?grade=" +
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
              vm.getStudentTestDetailInfo(vm.studentId, vm.examItemId);
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
      // console.log(vm.examItemType)
      //  console.log(vm.resultValue)
      let type=vm.examItemType;
      let standList=vm.standardList;
      // console.log(standList)
      let examItemPercent=vm.examItemPercent;
      // console.log(examItemPercent)
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
        // console.log(standList)
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
          // if(vm.resultValue>=standList[i].scoringCriteriaStart && vm.resultValue<=standList[i].scoringCriteriaEnd ){
            vm.baseScore=standList[i].score;
          }
        }
        if(!vm.baseScore){
          vm.baseScore=0
        }
        // console.log(vm.baseScore)
        // console.log(examItemPercent)
        // console.log(vm.teacherScore)
        let mScore=vm.baseScore*examItemPercent/100;
        console.log(mScore)
        console.log((vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100)
        vm.score=mScore+(vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100
        console.log(vm.score)
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
        // console.log(standList)
        for(var i=0;i<standList.length;i++){
          if(Number(vm.resultValue)>=Number(standList[i].scoringCriteriaStart) && Number(vm.resultValue)<=Number(standList[i].scoringCriteriaEnd) ){
          // if(vm.resultValue>=standList[i].scoringCriteriaStart && vm.resultValue<=standList[i].scoringCriteriaEnd ){
            vm.baseScore=standList[i].score;
          }
        }
        if(!vm.baseScore){
          vm.baseScore=0
        }
        // console.log(vm.baseScore)
        // console.log(examItemPercent)
        // console.log(vm.teacherScore)
        let mScore=vm.baseScore*examItemPercent/100;
        console.log(mScore)
        console.log((vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100)
        vm.score=mScore+(vm.teacherScore?vm.teacherScore:0)*(100-examItemPercent)/100
        console.log(vm.score)
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
    vm.studentId = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-studentId"
    );
    vm.studentName = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-studentName"
    );
    vm.examItemId = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-examItemId"
    );
    vm.gradeId = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-gradeId"
    );
    vm.studentClass = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-studentClass"
    );
    vm.gender = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-gender"
    );
    vm.classId = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-classId"
    );
    vm.classTestType = sessionStorage.getItem(
      "classExamManage1-studentExamDetail1-classTestType"
    );
    
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.schoolType = sessionStorage.getItem("schoolType");
    vm.getStudentJoinExamItemList(
      sessionStorage.getItem("classExamManage1-studentExamDetail1-studentId"),
      sessionStorage.getItem(
        "classExamManage1-studentExamDetail1-classTestType"
      )
    );
  },
  watch: {
    examItemId: function() {
      var vm = this;
      vm.resultData = [];
      vm.totalScore = "";
      vm.scoreLevel = "";
      vm.yearSemester = "";
      vm.signatureAddr = "";
      for (var i = 0; i < vm.examItemList.length; i++) {
              if (vm.examItemId == vm.examItemList[i].examItemId) {
                vm.examItemName = vm.examItemList[i].examItemName;
                vm.examItemExempt=vm.examItemList[i].exemptStatus;
                vm.examItemExemptType=vm.examItemList[i].exemptType;
              }
      }
      vm.getStudentTestDetailInfo(vm.studentId, vm.examItemId);
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