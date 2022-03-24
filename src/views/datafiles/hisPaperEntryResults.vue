<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">录入成绩-{{gradeId==1?"一年级":gradeId==2?"二年级":gradeId==3?"三年级":gradeId==4?"四年级":gradeId==5?"五年级":gradeId==6?"六年级":
        gradeId==7?"七年级":gradeId==8?"八年级":gradeId==9?"九年级":
        gradeId==10?"高一":gradeId==11?"高二":gradeId==12?"高三":"未知"}}{{studentClass}}班</h2>
    </div>
          <div style>
            <Card style="height: 60px" :dis-hover="true">
              <div>
                {{gradeId==1?"一年级":gradeId==2?"二年级":gradeId==3?"三年级":gradeId==4?"四年级":gradeId==5?"五年级":gradeId==6?"六年级":
            gradeId==7?"七年级":gradeId==8?"八年级":gradeId==9?"九年级":
            gradeId==10?"高一":gradeId==11?"高二":gradeId==12?"高三":"未知"}}{{studentClass}}班
                <Button type="success" @click="back" style="float:right;">返回</Button>
              </div>
            </Card>
            <Card  :dis-hover="true">
                <div>
                    <Table border max-height="650"  :loading="loading" :columns="resultColumns" :data="resultData"></Table>
                </div>
            </Card>
             <div style="margin-top:10px;padding-left:46%">
                <Button
                  style="float:left;width:100px"
                  @click="dataCheck"
                  type="success"
                >提交</Button>
              </div>
          </div>
          <Modal v-model="modal1" :mask-closable="false" title="确认提交" @on-ok="saveAllStudentScore">
              <p>当前有学生未录入，是否确认提交？</p>
            </Modal>
        <Spin v-if="submitInfo" fix></Spin>
  </div>
</template>
<script>
export default {
  name: "paperEntryResults",
  data() {
    return {
      modal1: false,
      loading:false,
      yearSemester:'',
      gradeId:'',
      classId:'',
      studentClass:'',
      paperId:"",
      submitInfo:false,
      resultColumns: [
        {
          title: "序号",
          key: "studentName",
          align: "center",
          width: "80px",
          render: (h, params) => {
            const row = params.row;
            return h("div", params.index+1);
          }
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center"
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          width: 100,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" ? "男" : "女")
            ]);
          }
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center"
        },
        {
          title: "得分",
          key: "teacherScore",
          align: "center",
          width: "260px",
          render: (h, params) => {
            if(params.row.homeworkExempt == 1){
               return h("div", [
              h("span","免试")
            ]);
            }
            if(params.row.teacherScore === ''){
              return h("div", [
              h("Input", {
                props: {
                  type: 'text',
                  id:"score"+params.index,
                  value:params.row.teacherScore
                },
                style: {
                  width:"120px",
                  "text-align": "center"
                },
                on: {
                  'on-blur': (event) => {
                    var reg=/^\d{0,3}.[0-9]?$/;
                    if(!reg.test(event.target.value)){
                          this.$Message.info("请输入0-100的得分,且只能是一位小数");
                          console.log(this.resultData[params.index])
                         this.resultData[params.index].teacherScore = '';
                    }else{
                      if(event.target.value>=0 && event.target.value <= 100){
                          this.resultData[params.index].teacherScore = event.target.value;
                      }else {
                          this.resultData[params.index].teacherScore = '';
                          this.$Message.info("请输入0-100的得分");
                      }
                    }
                  },
                  'on-keydown':(event)=>{
                    var reg=/^\d{0,3}.[0-9]?$/;
                    let ivuInputLength = document.getElementsByClassName('ivu-input').length;
                    let paramsLength = params.index + 1;
                    if(event.keyCode == 38){//键盘上
                      if(params.index == 0){ return ;}
                       if(!reg.test(event.target.value)){
                          this.$Message.info("请输入0-100的得分,且只能是一位小数");
                         this.resultData[params.index].teacherScore = '';
                    }else{
                      if(event.target.value>=0 && event.target.value <= 100){
                        this.resultData[params.index].teacherScore = event.target.value;
                      }else{
                        this.resultData[params.index].teacherScore = '';
                      }
                    }
                      document.getElementsByClassName('ivu-input')[params.index-1].focus();
                    }
                    if(event.keyCode == 40 || event.keyCode == 13){//键盘下
                      if(paramsLength+1 > ivuInputLength ){ return; }
                      if(event.target.value>=0 && event.target.value <= 100){
                        this.resultData[params.index].teacherScore = event.target.value;
                      }else{
                        this.resultData[params.index].teacherScore = '';
                      }
                      document.getElementsByClassName('ivu-input')[params.index+1].focus();
                    }
                  }
                },
              }),
               h('Icon', {
                props: {
                  type: 'ios-alert-outline'
                },
                style: {
                  fontSize: '24px',
                  color: '#C23531'
                },
                on: {

                }
              })
            ]);
            }else{
              return h("div", [
              h("Input", {
                props: {
                  type: 'text',
                  id:"score"+params.index,
                  value:params.row.teacherScore
                },
                style: {
                  width:"120px",
                  "text-align": "center"
                },
                on: {

                  'on-blur': (event) => {
                    var reg=/^\d{0,3}.[0-9]?$/;
                    console.log(reg.test(event.target.value))
                    if(!reg.test(event.target.value)){
                          this.$Message.info("请输入0-100的得分,且只能是一位小数");
                        //  this.resultData[params.index].teacherScore = '';
                        this.resultData[params.index].teacherScore = event.target.value;
                    }else{
                      if(event.target.value>=0 && event.target.value <= 100){
                          this.resultData[params.index].teacherScore = event.target.value;
                      }else {
                          this.$Message.info("请输入0-100的得分");
                        //  this.resultData[params.index].teacherScore = '';
                        this.resultData[params.index].teacherScore = event.target.value;
                      }
                    }
                  },
                  'on-keydown':(event)=>{
                    let ivuInputLength = document.getElementsByClassName('ivu-input').length;
                    let paramsLength = params.index + 1;
                    if(event.keyCode == 38){//键盘上
                      if(params.index == 0){ return ;}
                      var reg=/^\d{0,3}.[0-9]?$/;
                    if(!reg.test(event.target.value)){
                          this.$Message.info("请输入0-100的得分,且只能是一位小数");
                        //  this.resultData[params.index].teacherScore = '';
                        this.resultData[params.index].teacherScore = event.target.value;
                    }else{
                      if(event.target.value>=0 && event.target.value <= 100){
                        this.resultData[params.index].teacherScore = event.target.value;
                      }else{
                        // this.resultData[params.index].teacherScore = '';
                        this.resultData[params.index].teacherScore = event.target.value;
                      }
                    }
                      document.getElementsByClassName('ivu-input')[params.index-1].focus();
                    }
                    if(event.keyCode == 40 || event.keyCode == 13){//键盘下
                      if(paramsLength+1 > ivuInputLength ){ return; }
                        var reg=/^\d{0,3}.[0-9]?$/;
                    if(!reg.test(event.target.value)){
                          this.$Message.info("请输入0-100的得分,且只能是一位小数");
                        //  this.resultData[params.index].teacherScore = '';
                        this.resultData[params.index].teacherScore = event.target.value;
                    }else{
                      if(event.target.value>=0 && event.target.value <= 100){
                        this.resultData[params.index].teacherScore = event.target.value;
                      }else{
                        // this.resultData[params.index].teacherScore = '';
                        this.resultData[params.index].teacherScore = event.target.value;
                      }
                      }
                      document.getElementsByClassName('ivu-input')[params.index+1].focus();
                    }
                    // console.log(event.keyCode)
                  }

                },
              }),
            ]);
            }
          }
        }
      ],
      resultData: []
    };
  },
  methods: {
    getClassStudentScoreList(classId,paperId) {
      var vm = this;
      this.$axios
        .get("/v1/datafiles/getHisClassStudentScoreList?classId="+classId+"&paperId="+paperId+"&yearSemester="+vm.yearSemester)
        .then(function(response) {
          let data = response.data.response;
          for(let i=0;i<data.length;i++){
            if(data[i].teacherScore){
              data[i].teacherScore=data[i].teacherScore/100
            }
          }
          vm.resultData = data ? data : [];

        })
        .catch(function(response) {
          console.log(response);
        });
    },
    dataCheck(){
        var vm=this;
        let list=vm.resultData;
        for(var i=0;i<list.length;i++){
            let data=list[i];
            if(data.homeworkExempt != 1 && data.teacherScore== null){
                vm.modal1=true;
                break
            }
        }
        if(!vm.modal1){
          vm.saveAllStudentScore()
        }
    },
    saveAllStudentScore() {
        var vm = this
        let list=vm.resultData;
        if(vm.submitInfo==true){
            return false;
        }
      vm.submitInfo=true;
      let data=list
      var reg=/^\d{0,3}.[0-9]?$/;
      for(let i=0;i<data.length;i++){
        data.yearSemester = vm.yearSemester
        if(data[i].teacherScore){
          if (data[i].teacherScore > 100 || !reg.test(data[i].teacherScore)) {
            vm.$Message.info(data[i].studentName+"的分值输入有误！")
             vm.submitInfo=false;
            return false;
          }
        }
      }
      this.$axios
        .post(
          '/v1/healthyScore/bathUpsertScore',data
        )
        .then(function(response) {
          vm.submitInfo=false;
            // console.log(response)
          if(response.data.response.code=='1'){
              vm.$Message.info("提交成功")
              vm.$router.go(-1);
          }else{
              vm.$Message.info("提交失败,请勿重复提交！")
          }
        })
        .catch(function(response) {
          vm.submitInfo=false;
        //   console.log(response)
          vm.$Message.info("提交失败")
        })
    },
    back() {
      this.$router.go(-1);
    },
    ok1() {}
  },
  watch:{

  },
  created() {},
  mounted() {
    var vm = this;
    vm.gradeId=sessionStorage.getItem("hisPaperScoreManage-hisPaperEntryResults-gradeId");
    vm.studentClass=sessionStorage.getItem("hisPaperScoreManage-hisPaperEntryResults-studentClass");
    vm.classId=sessionStorage.getItem("hisPaperScoreManage-hisPaperEntryResults-classId");
    vm.paperId=sessionStorage.getItem("hisPaperScoreManage-hisPaperEntryResults-paperId");
    vm.yearSemester = sessionStorage.getItem("hisPaperScoreManage-hisPaperEntryResults-yearSemester");
    vm.getClassStudentScoreList(sessionStorage.getItem("hisPaperScoreManage-hisPaperEntryResults-classId"),sessionStorage.getItem("hisPaperScoreManage-hisPaperEntryResults-paperId"))
  }
};
</script>

