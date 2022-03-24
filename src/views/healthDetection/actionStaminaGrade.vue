<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{title}}</h2>
    </div>
    <div>
      <Card>
       <div class="top-search">
           <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>年级：</span>
                    <Select v-model="grade" class="width120">
                        <Option
                        v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass" class="width120">
                        <Option
                        v-for="item in classList"
                        :value="item.value"
                        :key="item.value"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
               <Button type="success"  @click="querySearch">查询</Button>
               <Button type="success" :disabled="disabled"  @click="toActionStaminaConfige">技能/体能项目配置</Button>
               <Button type="success" :disabled="disabled"  @click="toRepairScore">技能/体能成绩补录</Button>
               <Button type="success"  @click="pageToList">返回</Button>
            </div>
        </div>
      </Card>
      <br>
      <div>
        <Card>
          <!-- <div style="font-size:18px;height:40px;"> 数据概览</div> -->
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
      schoolId:'',
      loading:false,
      disabled:true,
      title:'',
      yearSemester:'',
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
      resultColumns:[
        {
          title: '年级',
          key: 'studentCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let data=params.row.gradeId==1?"一年级":params.row.gradeId==2?"二年级":params.row.gradeId==3?"三年级":params.row.gradeId==4?"四年级":
            params.row.gradeId==5?"五年级":params.row.gradeId==6?"六年级":params.row.gradeId==7?"七年级":params.row.gradeId==8?"八年级":
            params.row.gradeId==9?"九年级":"--";
            data=data+"("+params.row.startSchool+"级)"
            return h('div', data)
          }
        },
        {
          title: '班级',
          key: 'examOverCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
              var vm=this;
            let data=vm.gradeStatus=="0"?"全部班级":params.row.studentClass+"班"
            return h('div', data)
          }
        },
        {
          title: '总人数',
          key: 'totalStudent',
          align: 'center',
          minWidth:100,
        },
        {
          title: '技能已完成人数/总人数',
          key: 'finishStudentAction',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.finishStudentAction+"/"+row.totalStudent;
            return h('div', text)
          }
        },
        {
          title: '技能平均分',
          key: 'wellCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text =row.totalStudent==0?"": ((row.totalScoreAction/row.totalStudent)/100).toFixed(1);
            return h('div', text)
          }
        },
        {
          title: '技能合格率',
          key: 'passCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text =row.totalStudent==0?"": (100*(row.excellentStudentAction+row.goodStudentAction+row.passStudentAction)/row.totalStudent).toFixed(1)+"%";
            return h('div', text)
          }
        },
        {
          title: '技能优良率',
          key: 'qualifiedCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text =row.totalStudent==0?"": (100*(row.excellentStudentAction+row.goodStudentAction)/row.totalStudent).toFixed(1)+"%";
            return h('div', text)
          }
        },
        {
          title: '体能已完成人数/总人数',
          key: 'finishStudentAction',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.finishStudentStamina+"/"+row.totalStudent;
            return h('div', text)
          }
        },
        {
          title: '体能平均分',
          key: 'wellCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text =row.totalStudent==0?"": ((row.totalScoreStamina/row.totalStudent)/100).toFixed(1);
            return h('div', text)
          }
        },
        {
          title: '体能合格率',
          key: 'passCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text =row.totalStudent==0?"": (100*(row.excellentStudentStamina+row.goodStudentStamina+row.passStudentStamina)/row.totalStudent).toFixed(1)+"%";
            return h('div', text)
          }
        },
        {
          title: '体能优良率',
          key: 'qualifiedCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text =row.totalStudent==0?"": (100*(row.excellentStudentStamina+row.goodStudentStamina)/row.totalStudent).toFixed(1)+"%";
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', [
              h(
                      'Button',
                      {
                        props: {
                          type: 'success'
                        },
                        style: {
                          marginRight: '10px'
                        },
                        on: {
                          click: () => {
                            this.toDetail(params.row)
                          }
                        }
                      },
                      '详情'
              )
            ])
          }
        }
      ],
      resultData:[],
      gradeStatus:""
    }
  },
  methods: {
    pageToList() {
      this.$router.go(-1)
    },
    toDetail(item) {
      var vm = this;
      console.log(item)
      let grade=item.gradeId;

      sessionStorage.setItem("actionStaminaGrade-actionStaminaStudentList-yearSemester",vm.yearSemester);
      sessionStorage.setItem("actionStaminaGrade-actionStaminaStudentList-grade",grade);
      sessionStorage.setItem("actionStaminaGrade-actionStaminaStudentList-studentClass",vm.studentClass);
      this.$router.push({ name: "actionStaminaStudentList" });
    },
    toActionStaminaConfige(){
        var vm=this;
        sessionStorage.setItem("actionStaminaGrade-actionStaminaHisConfige-yearSemester",vm.yearSemester);
      this.$router.push({ name: "actionStaminaHisConfige" });
    },
    toRepairScore(){
        var vm=this;
        sessionStorage.setItem("actionStaminaGrade-actionStaminaRepair-yearSemester",vm.yearSemester);
      sessionStorage.setItem("actionStaminaGrade-actionStaminaRepair-grade",vm.grade);
      sessionStorage.setItem("actionStaminaGrade-actionStaminaRepair-studentClass",vm.studentClass);
      this.$router.push({ name: "actionStaminaRepair" });
    },
    querySearch(){
      this.search();
    },
    search() {
      var vm = this
      sessionStorage.setItem('actionStaminaGrade-grade', vm.grade);
      sessionStorage.setItem('actionStaminaGrade-studentClass', vm.studentClass);

      vm.getActionStaminaGradeHisList(vm.yearSemester);
    },
    querySchoolReportedStatus(){
      var vm = this;
      this.$axios
              .get("/v1/actionStamina/querySchoolReportedStatus?dataType=2&yearSemester="+vm.yearSemester)
              .then(function(response) {
                if(response.data.code==10000){
                    if(response.data.response.editStatus==1){
                        vm.disabled=false;
                    }
                }
              })
              .catch(function(response) {
                console.log(response);
              });
    },
    getActionStaminaGradeHisList (yearSemester) {
        var vm=this;
                this.$axios
                    .get(
                        '/v1/actionStamina/getActionStaminaGradeHisList?schoolId=1&gradeId='+(vm.grade==999?"":vm.grade)+
                        '&studentClass='+(vm.studentClass==999?"":vm.studentClass)+'&yearSemester=' +yearSemester
                    )
                    .then(res => {
                      if(vm.grade==999 && vm.studentClass==999){
                        vm.gradeStatus="0"
                      }else{
                        vm.gradeStatus="1"
                      }
                        if (res.data.code == 10000) {
                            this.resultData = res.data.response;
                        } else {
                            if (res.data.code > 39999) {
                                this.$Message.info(res.data.msg);
                            }
                        }
                    });
            },




    paramsCheck(){
        let vm = this;
        let schoolId = sessionStorage.getItem('schoolId')
        let schoolType = sessionStorage.getItem("schoolType");
        vm.schoolId = schoolId
        vm.yearSemester=Number(sessionStorage.getItem("dataFilesGradeInfo-actionStaminaGrade-yearSemester"));

        if(vm.yearSemester%2==1){
            vm.title=(vm.yearSemester-9+"").substring(0,4)+"学年第二学期技能/体能管理"
        }else{
            vm.title=(vm.yearSemester+"").substring(0,4)+"学年第一学期技能/体能管理"
        }

        if (schoolType) {
            if ("2" == schoolType) {
                vm.schoolGradeList = vm.primaryList;
            }
            if ("3" == schoolType) {
                vm.schoolGradeList = vm.middleList;
            }
        }
        if (sessionStorage.getItem('actionStaminaGrade-grade')) {
                this.grade = Number(sessionStorage.getItem('actionStaminaGrade-grade'));
            } else {
                vm.grade = vm.schoolGradeList[0].grade;
            }

            if (sessionStorage.getItem('actionStaminaGrade-studentClass')) {
                vm.studentClass = isNaN(Number(sessionStorage.getItem('actionStaminaGrade-studentClass')))?'':Number(sessionStorage.getItem('actionStaminaGrade-studentClass'));
            } else {
                vm.studentClass = vm.classList[0].value;
            }
        vm.getActionStaminaGradeHisList(vm.yearSemester);
        vm.querySchoolReportedStatus();
    }

  },
  watch: {

  },
  created() {
  },
  mounted() {
    let vm = this;
    vm.paramsCheck()
  }
}
</script>
