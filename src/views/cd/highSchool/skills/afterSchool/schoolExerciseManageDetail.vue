<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生：{{studentName}}</h2>
    </div>
    <div>
      <Card>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading"  :columns="resultColumns" :data="resultData"></Table>
          </div>
        </Row>
        <Row>
            <div style="margin-top:10px;padding-left:45%">
                <Button size="large" type="success" style="margin-right:40px;" @click="goback">返回</Button>
            </div>
        </Row>
     </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      studentName:'',
      studentId:'',
      resultColumns: [
        {
          title: "项目",
          key: "classTestNameDetail",
          type:"html",
          align: "center",
          minWidth:100
        },
        {
          title: "锻炼时间",
          key: "exerciseTime",
          type:"html",
          align: "center",
          minWidth:100
        },
        {
          title: "审核老师",
          key: "auditTeacher",
          type:"html",
          align: "center",
          minWidth:100
        }
      ],
      resultData: []
    };
  },
  methods: {
    goback() {
    this.$router.go(-1);
    },
    getStudentInfoList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get("/v1/cd/high/schoolexercise/getStudentSchoolExerciseInfoDetail?studentId="+vm.studentId)
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            //vm.resultData = res.data.response;
           let result = res.data.response;
           for(let i = 0;i<result.length;i++){
            let className = '<div>'
            let date = ''
            let teacher = ''
            let items = result[i].items; 
            let borderStyle = ''
            if(items &&items.length >1){
                borderStyle="border-top:1px #DFD9DE solid;";
              }
            className = className+"<div>"+result[i].classTestName+"</div>";
            className = className+"<div>锻炼总次数："+result[i].homeworkCount+"次 平均每周锻炼次数："+result[i].averageCount+"次 课外锻炼得分："+result[i].homeworkScore+"分</div>";
            className = className+"</div>";
            result[i].classTestNameDetail = className;
            if(items && items.length >0){
               date = '<div>'
               teacher = '<div>'
               for(let j = 0;j<items.length;j++){
                  if(date == "<div>"){
                      borderStyle="";
                  }else{
                      borderStyle="border-top:1px #DFD9DE solid;";
                  }
                  date = date + "<div style='text-align:center;width:100%;"+borderStyle+"height:30px;line-height:30px;' >"+items[j].completeDay+"</div>"
                  teacher = teacher + "<div style='text-align:center;width:100%;"+borderStyle+"height:30px;line-height:30px;' >"+items[j].teacherName+"</div>"
              }
              date = date + '</div>'
              teacher = teacher + '</div>'
            }
            result[i].exerciseTime = date;
            result[i].auditTeacher = teacher;
           }
           vm.resultData = result;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    
    
    
  },
  watch: {

  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm = this;
    let studentId = sessionStorage.getItem('schoolExerciseManage-schoolExerciseManageDetail-studentId');
    let studentName = sessionStorage.getItem('schoolExerciseManage-schoolExerciseManageDetail-studentName');
    vm.studentName = studentName;
    vm.studentId = studentId;
    vm. getStudentInfoList();
    //vm.search();
  }
};
</script>
