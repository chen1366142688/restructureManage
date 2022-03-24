<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按班级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>年级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>班级：</span>
              <Select v-model="studentClass" style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"  @click="querySearch">查询</Button>
          </div>
         </div>
      </Card>
      <br   v-if="showAll" >
      <Card   v-if="showAll">
        <div style="font-size:18px;height:40px;">
            数据概览
        </div>
        <div>
          <Row>
            <div style>
              <Table border :loading="loading" :columns="resultColumnsTotal" :data="resultDataTotal"></Table>
            </div>
          </Row>
        </div>
      </Card>
      </br>
      <Card>
       <div style="font-size:18px;height:40px;">
            数据明细
        </div>
        <div>
          <Row>
            <div style="">
              <Table border max-height="430" :loading="loading"  :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
      loading:false,
      updateUrl: '',
      schoolId: '',
      schoolType: '',
      grade: '',
      orderType:"",
      allNeedCount:0,
      allNeedBoyCount:0,
      allNeedGirlCount:0,
      finishCount:0,
      finishBoyCount:0,
      finishGirlCount:0,
      finishRatio:0,
      finishBoyRatio:0,
      finishGirlRatio:0,
      boyTime:0,
      girlTime:0,
      orderField:"student_class",
      orderSort:"asc",
      showAll:true,
      resultDataTotal:[],
      resultColumnsTotal: [
        {
          title: "总考核人数",
          key: "totalStudent",
          align: "center",
        },
        {
          title: "总完成考核",
          key: "finishCount",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let boy = row.boyFinish  ? row.boyFinish : 0;
            let girl =row.girlFinish  ? row.girlFinish : 0;
            return h("div", boy+girl);
          }
        },
        {
          title: "总完成率",
          key: "finishRatio",
          align: "center",
           render: (h, params) => {
            const row = params.row;
            let boy = row.boyFinish ?  row.boyFinish: 0;
            let girl =row.girlFinish ?  row.girlFinish: 0;
            let total=boy+girl;
            return h("div",row.totalStudent?(100*(total/row.totalStudent)).toFixed(0)+"%":"--");
          }
        },
        {
          title: "男生完成次数",
          key: "boyFinishTime",
          align: "center",
        },
        {
          title: "女生完成次数",
          key: "girlFinishTime",
          align: "center",
        },
        {
          title: "总完成次数",
          key: "finishRatio",
          align: "center",
           render: (h, params) => {
            const row = params.row;
            let boy = row.boyFinishTime ?  row.boyFinishTime: 0;
            let girl =row.girlFinishTime ?  row.girlFinishTime: 0;
            let total=boy+girl;
            return h("div",total);
          }
        },
        {
          title: "男生考核",
          key: "boyStudent",
          align: "center",
        },
         {
          title: "男生完成考核",
          key: "boyFinish",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let boy = row.boyFinish ? row.boyFinish:0 ;
            return h("div",boy);
          }
        },
         {
          title: "男生完成率",
          key: "finishBoyRatio",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let boy = row.boyStudent ? row.boyStudent:0 ;
            let finish =row.boyFinish  ?  row.boyFinish:0 ;
            return h("div",boy?(100*(finish/boy)).toFixed(0)+"%":"--");
          }
        },
         {
          title: "女生考核",
          key: "girlStudent",
          align: "center",
        },
         {
          title: "女生完成考核",
          key: "girlFinish",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let girl = row.girlFinish ? row.girlFinish:0 ;
            return h("div",girl);
          }
        },
        {
          title: "女生完成率",
          key: "finishGirlRatio",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let boy = row.girlStudent  ?  row.girlStudent:0 ;
            let finish =row.girlFinish ?  row.girlFinish:0 ;
            return h("div",boy?(100*(finish/boy)).toFixed(0)+"%":"--");
          }
        },
      ],
      orderTypeList:[
        {
          value: "1",
          label: '降序'
        },
        {
          value: "2",
          label: '升序'
        }
      ],
      primaryList: [
        {
          grade: 1,
          label: '一年级'
        },
        {
          grade: 2,
          label: '二年级'
        },
        {
          grade: 3,
          label: '三年级'
        },
        {
          grade: 4,
          label: '四年级'
        },
        {
          grade: 5,
          label: '五年级'
        },
        {
          grade: 6,
          label: '六年级'
        }
      ],
      middleList: [
        {
          grade: 7,
          label: '七年级'
        },
        {
          grade: 8,
          label: '八年级'
        },
        {
          grade: 9,
          label: '九年级'
        }
      ],
      highList: [
        {
          grade: 10,
          label: '高一'
        },
        {
          grade: 11,
          label: '高二'
        },
        {
          grade: 12,
          label: '高三'
        }
      ],
      collegeList: [
        {
          grade: 13,
          label: '大一'
        },
        {
          grade: 14,
          label: '大二'
        },
        {
          grade: 15,
          label: '大三'
        },
        {
          grade: 16,
          label: '大四'
        }
      ],
      schoolGradeList: [],
      studentClass: '',
      classList: [
        {
          value: "",
          label: '全部'
        },
        {
          value: 1,
          label: '1班'
        },
        {
          value: 2,
          label: '2班'
        },
        {
          value: 3,
          label: '3班'
        },
        {
          value: 4,
          label: '4班'
        },
        {
          value: 5,
          label: '5班'
        },
        {
          value: 6,
          label: '6班'
        },
        {
          value: 7,
          label: '7班'
        },
        {
          value: 8,
          label: '8班'
        },
        {
          value: 9,
          label: '9班'
        },
        {
          value: 10,
          label: '10班'
        },
        {
          value: 11,
          label: '11班'
        },
        {
          value: 12,
          label: '12班'
        },
        {
          value: 13,
          label: '13班'
        },
        {
          value: 14,
          label: '14班'
        },
        {
          value: 15,
          label: '15班'
        },
        {
          value: 16,
          label: '16班'
        },
        {
          value: 17,
          label: '17班'
        },
        {
          value: 18,
          label: '18班'
        },
        {
          value: 19,
          label: '19班'
        },
        {
          value: 20,
          label: '20班'
        },
        {
          value: 21,
          label: '21班'
        },
        {
          value: 22,
          label: '22班'
        },
        {
            value: 23,
            label: '23班'
        },
        {
            value: 24,
            label: '24班'
        },
        {
            value: 25,
            label: '25班'
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
      registerCode: '',
      studentName: '',
      resultColumns: [],
      normal: [
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.studentClass +'班'
            return h('div', text)
          }
        },
        {
          title: '班级总人数',
          key: 'totalStudent',
          align: 'center',
        },
        {
          title: '完成考核人数',
          key: 'finishCount',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            let boy=row.boyFinish?row.boyFinish:0
            let girl=row.girlFinish?row.girlFinish:0
                return h('div', boy+girl)
          }
        },
        {
          title: "完成次数/总次数(男生)",
          key: "boyFinishTime",
          align: "center",
          width: 140,
           render: (h, params) => {
            const row = params.row
            let boy=row.boyFinishTime?row.boyFinishTime:0
            let girl=row.needFinishTime?row.needFinishTime:0
                return h('div', boy+"/"+girl*row.boyTotal)
          }
        },
         {
          title: "完成次数/总次数(女生)",
          key: "girlFinishCount",
          align: "center",
         render: (h, params) => {
            const row = params.row
            let boy=row.girlFinishTime?row.girlFinishTime:0
            let girl=row.needFinishTime?row.needFinishTime:0
                return h('div', boy+"/"+girl*row.girlTotal)
          }
        },
        {
          title: "完成人数/总人数(男生)",
          key: "boyFinishCount",
          align: "center",
          width: 140,
           render: (h, params) => {
            const row = params.row
            let boy=row.boyFinish?row.boyFinish:0
            let girl=row.boyTotal?row.boyTotal:0
                return h('div', boy+"/"+girl)
          }
        },
         {
          title: "完成人数/总人数(女生)",
          key: "girlFinishCount",
          align: "center",
         render: (h, params) => {
            const row = params.row
            let boy=row.girlFinish?row.girlFinish:0
            let girl=row.girlTotal?row.girlTotal:0
                return h('div', boy+"/"+girl)
          }
        },
         {
          title: "完成率",
          key: "finishCountRatio",
          align: "center",
          render: (h, params) => {
            const row = params.row
            let boy=row.boyFinish?row.boyFinish:0
            let girl=row.girlFinish?row.girlFinish:0
            let total=boy+girl;
            let allTotal=row.totalStudent?row.totalStudent:0
                return h('div', allTotal?(100*(total/allTotal)).toFixed(0)+"%":"--")
          }
        },
        {
          title: "完成进度",
          key: "finishComboRatio",
          align: "center",
          render: (h, params) => {
            const row = params.row
            let totalFinishTime=row.totalFinishTime?row.totalFinishTime:0
            let needFinishTime=row.needFinishTime?row.needFinishTime:0
            let allTotal=row.totalStudent?row.totalStudent:0
            let total=allTotal*needFinishTime;
                return h('div', total?(100*(totalFinishTime/total)).toFixed(0)+"%":"--")
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
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentClass)
                    }
                  }
                },
                "详情"
              )
            ])
          }
        }
      ],
      collegeColumns: [
        {
          title: '学生姓名',
          key: 'studentName',
          align: 'center'
          //   minWidth: 250
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center'
          //   width: 150
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '学院',
          key: 'collegeName',
          align: 'center'
          //   width: 150
        },
        {
          title: '专业',
          key: 'majorName',
          align: 'center'
          //   width: 150
        },
        {
          title: '学级',
          key: 'startSchool',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.startSchool+'级'
            return h('div', text)
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.studentClass+'班'
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          //   width: 400,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '详情'
              )
            ])
          }
        }
      ],
      resultData: [],
      isCollege: false,
      college: '',
      collegesList: [],
      major: '',
      majorList: [],
      chooseCollege:true,
      collegeName:'',
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    getTestClassSingle() {
      var vm = this;
      vm.loading = true;
      this.$axios.get("/v1/schoolteststudent/getTestClassSingle?schoolId=1&gradeId="+vm.grade+"&studentClass="+vm.studentClass).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          vm.resultDataTotal=[]
          let resultDataTotal = res.data.response;
          vm.resultDataTotal.push(resultDataTotal)
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    getTestClassSingleList() {
      var vm = this;
      vm.loading = true;
      this.$axios.get("/v1/schoolteststudent/getTestClassSingleList?schoolId=1&gradeId="+vm.grade+"&studentClass="+vm.studentClass).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    querySearch(){
      this.pageNum = 1;
      this.pageNo = 1
      this.search();
      sessionStorage.setItem('exerciseManageClassSingle-grade',vm.grade);
      sessionStorage.setItem('exerciseManageClassSingle-studentClass',vm.studentClass);
    },
    search() {
      var vm = this
      vm.getTestClassSingle()
      vm.getTestClassSingleList()
    },
    restore() {
      var vm = this
      vm.grade = ''
      vm.pageNo = 1
      vm.pageSize = 10
      vm.registerCode = ''
      vm.studentClass = ''
      vm.studentName = ''
      vm.college = ''
      vm.major = ''

      let schoolId = vm.schoolId
      vm.getExerciseList(schoolId)
      vm.getExerciseListCount(schoolId)
    },
    toDetail(studentClass) {
      var vm=this;
      sessionStorage.setItem('exerciseManageClassSingle-exerciseManageStudentSingle-grade',vm.grade)
      sessionStorage.setItem('exerciseManageClassSingle-exerciseManageStudentSingle-studentClass',studentClass)
      this.$router.push({ name: 'exerciseManageStudentSingle' })
    },


  },
  watch: {

  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
  //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    if(vm.orderType == ""){
       vm.orderType = "1";
    }
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;
    // vm.updateUrl =this.$axios.defaults.baseURL + '/v1/file/upload?type=excel';
    if (schoolType) {
      vm.resultColumns = vm.normal
      if ('0' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList)
      }
      // if("1"==schoolType){
      //     vm.schoolGradeList=vm.schoolGradeList.concat(vm.primaryList).concat(vm.middleList).concat(vm.highList).concat(vm.collegeList);
      // }
      if ('2' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
        vm.grade = 1
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
        vm.grade = 7
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
        vm.grade = 10
      }
      if ('5' == schoolType) {
        vm.isCollege = true
        vm.resultColumns = vm.collegeColumns
        var date=new Date;
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          // month =(month<10 ? "0"+month:month);
          // var mydate = (year.toString()+month.toString());
          vm.collegeList=[
             {
          grade: 13,
          label: (month>9?year:year-1)+'级'
        },
        {
          grade: 14,
          label: (month>9?year-1:year-2)+'级'
        },
        {
          grade: 15,
          label: (month>9?year-2:year-3)+'级'
        },
        {
          grade: 16,
          label: (month>9?year-3:year-4)+'级'
        }
          ]
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.collegeList)
        vm.getSchoolCollegeBySchoolId(vm.schoolId)
      }
    } else {
      vm.resultColumns = vm.normal
      vm.schoolGradeList = vm.schoolGradeList
        .concat(vm.primaryList)
        .concat(vm.middleList)
        .concat(vm.highList)
        .concat(vm.collegeList)
    }

    let  grade = 0;
    let  studentClass = 0;

    if(sessionStorage.getItem('exerciseManageGradeSingle-exerciseManageClassSingle-grade') ){
      grade=sessionStorage.getItem('exerciseManageGradeSingle-exerciseManageClassSingle-grade')
      sessionStorage.removeItem('exerciseManageGradeSingle-exerciseManageClassSingle-grade')
      studentClass ='';
    }else{
      grade = sessionStorage.getItem('exerciseManageClassSingle-grade');
      studentClass = sessionStorage.getItem('exerciseManageClassSingle-studentClass');
    }
    if(grade != null && grade != "" && grade != undefined && grade > 0){
        vm.grade = Number(grade);
    }
    if(studentClass != null && studentClass != "" && studentClass != undefined && studentClass > 0){
        vm.studentClass = Number(studentClass);
    }
    vm.search()
  }
}
</script>
