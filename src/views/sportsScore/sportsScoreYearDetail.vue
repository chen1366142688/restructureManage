<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">分值详情</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input" style="align-items:center">
                <div style="margin:5px 20px;">
                    <span>姓名：{{studentName}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：{{registerCode}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：{{gradeId==1?"一年级":gradeId==2?"二年级":gradeId==3?"三年级":gradeId==4?"四年级":gradeId==5?"五年级":gradeId==6?"六年级":gradeId==7?"七年级":gradeId==8?"八年级":gradeId==9?"九年级":gradeId==10?"高一":gradeId==11?"高二":gradeId==12?"高三":""}}{{studentClass}}班</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：{{gender=="1"?"男":"女"}}</span>
                </div>
            </div>
            <div class="right-btns">
                <Button
                  class="add-button"
                  v-on:click="pageToList()"
                  type="success"
                >返回</Button>
            </div>
        </div>
      </Card>
      <Tabs type="card" :value="selectTabName" style="margin-top:20px;">
        <TabPane name="seven" label="七年级">
          <Card>
            <div>
              <p>
                年级中考体育分值：{{sevenTotalScore?sevenTotalScore+"分":"--"}}
              </p>
            </div>
            <div>
              <Row>
                <div style>
                  <Table
                    border
                    :loading="loading"
                    :columns="resultColumns"
                    :data="sevenData"
                  ></Table>
                </div>
              </Row>
            </div>
          </Card>
        </TabPane>
        <TabPane name="eight" label="八年级">
          <Card>
            <div>
              <p>
                年级中考体育分值：{{eightTotalScore?eightTotalScore+"分":"--"}}
              </p>
            </div>
            <div>
              <Row>
                <div style>
                  <Table
                    border
                    :loading="loading"
                    :columns="resultColumns"
                    :data="eightData"
                  ></Table>
                </div>
              </Row>
            </div>
          </Card>
        </TabPane>
        <TabPane name="nine" label="九年级">
          <Card>
            <div>
              <p>
                年级中考体育分值：{{nineTotalScore?nineTotalScore+"分":"--"}}
              </p>
            </div>
            <div>
              <Row>
                <div style>
                  <Table
                    border
                    :loading="loading"
                    :columns="resultColumns"
                    :data="nineData"
                  ></Table>
                </div>
              </Row>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      selectTabName: "seven",
      schoolId: "",
      schoolType: "",
      studentId: "",
      gradeId: "",
      gender: "",
      resultColumns: [
        {
          title: "时间",
          key: "yearSemester",
          align: "center",
          minWidth:100
        },
        {
          title: "体质测试得分",
          key: "testScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.testScore !=null && row.testScore >= 0 ){
              return h("div", row.testScore.toFixed(1));
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "体质测试等级",
          key: "testScoreLevel",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.testScore !=null && row.testScore >= 0 ){
              return h("div", row.testScoreLevel);
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "中考体育分值",
          key: "testCredit",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.testCredit !=null && row.testCredit != '' && row.testCredit >= 0 ){
              return h("div", row.testCredit);
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.learnScore !=null && row.learnScore >= 0 ){
              return h("div", row.learnScore.toFixed(1));
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.healthScore !=null && row.healthScore >= 0 ){
              return h("div", row.healthScore.toFixed(1));
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.actionScore !=null && row.actionScore >= 0 ){
              return h("div", row.actionScore.toFixed(1));
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.staminaScore !=null && row.staminaScore >= 0 ){
              return h("div", row.staminaScore.toFixed(1));
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.homeworkScore !=null && row.homeworkScore >= 0 ){
              return h("div", row.homeworkScore.toFixed(1));
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "学科评价得分",
          key: "totalScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.totalScore != '--' && row.totalScore !=null && row.totalScore >= 0 ){
              return h("div", Number(row.totalScore).toFixed(1));
            }else{
              return h("div", "--");
            }
          }
        },
         {
          title: "学科评价等级",
          key: "totalScoreLevel",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.totalScore != '--' && row.totalScore !=null && row.totalScore >= 0 ){
              return h("div", row.totalScoreLevel);
            }else{
              return h("div", "--");
            }
          }
        },
        {
          title: "学科评价中考体育分值",
          key: "totalScoreCredit",
          align: "center",
          minWidth:100,
        },
      ],
      sevenData: [],
      eightData: [],
      nineData: [],
      studentClass: "",
      registerCode: "",
      studentName: "",
      sevenTotalScore:'',
      eightTotalScore:'',
      nineTotalScore:'',
    };
  },
  methods: {
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    getStudentScoreDetail(studentId) {
      var vm = this;
      this.$axios
        .get("/v1/semesterScore/getStudentScoreDetail?studentId="+studentId)
        .then(res => {
          if (res.data.code == 10000) {
            vm.dealData(res.data.response) ;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    dealData(data){
      var vm=this;
      var sevenData1=[];
      var eightData1=[];
      var nineData1=[];
      if(data){
        for(var i=0;i<data.length;i++){
          if(data[i].gradeId==7){
            if(data[i].testScore >=0 ){
              let score=0;
              let level=""
              if(data[i].testScore>=90){
                score+=1;
                level="优秀"
              }else if(data[i].testScore>=80 && data[i].testScore<90){
                score+=0.75;
                level="良好"
              }else if(data[i].testScore>=60 && data[i].testScore<80){
                score+=0.5;
                level="及格"
              }else{
                score+=0.25;
                level="不及格"
              }
              data[i].testCredit=score;
              data[i].testScoreLevel=level;
            }
            if( data[i].totalScore >=0){
              let score=0;
              let level=""
              if(data[i].totalScore>=90){
                score+=2;
                level="优秀"
              }else if(data[i].totalScore>=80 && data[i].totalScore<90){
                score+=1.5;
                level="良好"
              }else if(data[i].totalScore>=60 && data[i].totalScore<80){
                score+=1;
                level="及格"
              }else{
                score+=0.5;
                level="不及格"
              }
              data[i].totalScoreCredit="-";
              data[i].totalScoreLevel=level;
            }
            sevenData1.push(data[i]);
          }

        if(data[i].gradeId==8){
            if(data[i].testScore>=0 ){
              let score=0;
              let level=""
              if(data[i].testScore>=90){
                score+=1;
                level="优秀"
              }else if(data[i].testScore>=80 && data[i].testScore<90){
                score+=0.75;
                level="良好"
              }else if(data[i].testScore>=60 && data[i].testScore<80){
                score+=0.5;
                level="及格"
              }else{
                score+=0.25;
                level="不及格"
              }
              data[i].testCredit=score;
              data[i].testScoreLevel=level;
            }
            if( data[i].totalScore >=0){
              let score=0;
              let level=""
              if(data[i].totalScore>=90){
                score+=2;
                level="优秀"
              }else if(data[i].totalScore>=80 && data[i].totalScore<90){
                score+=1.5;
                level="良好"
              }else if(data[i].totalScore>=60 && data[i].totalScore<80){
                score+=1;
                level="及格"
              }else{
                score+=0.5;
                level="不及格"
              }
              data[i].totalScoreCredit="-";
              data[i].totalScoreLevel=level;
            }
            eightData1.push(data[i]);
        }

        if(data[i].gradeId==9){
            if(data[i].testScore >=0){
              let score=0;
              let level=""
              if(data[i].testScore>=90){
                score+=2;
                level="优秀"
              }else if(data[i].testScore>=80 && data[i].testScore<90){
                score+=1.5;
                level="良好"
              }else if(data[i].testScore>=60 && data[i].testScore<80){
                score+=1;
                level="及格"
              }else{
                score+=0.5;
                level="不及格"
              }
              data[i].testCredit=score;
              data[i].testScoreLevel=level;
            }
            if( data[i].totalScore >=0){
              let score=0;
              let level=""
              if(data[i].totalScore>=90){
                score+=2;
                level="优秀"
              }else if(data[i].totalScore>=80 && data[i].totalScore<90){
                score+=1.5;
                level="良好"
              }else if(data[i].totalScore>=60 && data[i].totalScore<80){
                score+=1;
                level="及格"
              }else{
                score+=0.5;
                level="不及格"
              }
              data[i].totalScoreCredit="-";
              data[i].totalScoreLevel=level;
            }
            nineData1.push(data[i]);
        }
        }
      }
      console.log(sevenData1)
      if(sevenData1 && sevenData1.length>0){
        vm.finalData(sevenData1,7);
      }
       if(eightData1 && eightData1.length>0){
        //  console.log(eightData)
        vm.finalData(eightData1,8);
      }
       if(nineData1 && nineData1.length>0){
        vm.finalData(nineData1,9);
      }
    },
    finalData(data,gradeId){
      var vm=this;
      let yearName="";
      let testCredit="";
      let totalScore="";
      let totalLevel="";
      let totalCredit="";
      for(let i=0;i<data.length;i++){

        let yearSemester=data[i].yearSemester+"";
        let year=yearSemester.substring(0,4);
        let last=yearSemester.substring(4,5);

        let name="";
        if(last==1){
          year-=1;
          name=year+"学年第二学期"
          data[i].totalScoreCredit="-"
        }else{
          name=year+"学年第一学期"
          if(data[i].testCredit){
            testCredit=Number(testCredit)+Number(data[i].testCredit)
          }
        }
        if(data[i].totalScore){
          totalScore=Number(totalScore)+Number(data[i].totalScore)
        }
        yearName=year+"学年";

        data[i].yearSemester=name;
      }

      let scores="-";
      if( totalScore){
              scores = Math.round(totalScore/2*10)/10;
              // scores=(totalScore/2).toFixed(1)
              let score="";
              let level=""
              if(scores>=90){
                score+=2;
                level="优秀"
              }else if(scores>=80 && scores<90){
                score+=1.5;
                level="良好"
              }else if(scores>=60 && scores<80){
                score+=1;
                level="及格"
              }else{
                score+=0.5;
                level="不及格"
              }
              totalCredit=score;
              totalLevel=level;
            }
      let param={
        yearSemester:yearName,
        testCredit:testCredit,
        totalScore:scores,
        totalScoreCredit:totalCredit,
        totalScoreLevel:totalLevel
      }
      if(data.length < 2){
          param={
            yearSemester:yearName,
            testCredit:'--',
            totalScore:'--',
            totalScoreCredit:'--',
            totalScoreLevel:'--'
          }
      }
      data.push(param)
      // console.log(data)
      if(gradeId==7){
        if(data.length==3){
        vm.sevenTotalScore=Number(testCredit)+Number(totalCredit)
      }
        vm.sevenData=data;
      }
      if(gradeId==8){
         if(data.length==3){
        vm.eightTotalScore=Number(testCredit)+Number(totalCredit)
      }
        vm.eightData=data;
      }
      if(gradeId==9){
         if(data.length==3){
        vm.nineTotalScore=Number(testCredit)+Number(totalCredit)
      }

        vm.nineData=data;
      }

      if(data.length < 3){
         if(gradeId==7){
            vm.sevenTotalScore = "--";
         }else if(gradeId==8){
            vm.eightTotalScore = "--";
         }else if(gradeId==9){
            vm.nineTotalScore = "--";
         }
      }

    },

  },
  watch: {},
  created() {},
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.schoolType = schoolType;
    vm.studentId = sessionStorage.getItem(
      "sportsScoreYear-sportsScoreYearDetail-studentId"
    );
    vm.studentName = sessionStorage.getItem(
      "sportsScoreYear-sportsScoreYearDetail-studentName"
    );
    vm.registerCode = sessionStorage.getItem(
      "sportsScoreYear-sportsScoreYearDetail-registerCode"
    );
    vm.gradeId = sessionStorage.getItem(
      "sportsScoreYear-sportsScoreYearDetail-gradeId"
    );
    vm.studentClass = sessionStorage.getItem(
      "sportsScoreYear-sportsScoreYearDetail-studentClass"
    );
    vm.gender = sessionStorage.getItem(
      "sportsScoreYear-sportsScoreYearDetail-gender"
    );
    vm.getStudentScoreDetail(sessionStorage.getItem("sportsScoreYear-sportsScoreYearDetail-studentId"))
  }
};
</script>
