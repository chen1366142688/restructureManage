<template>
  <div style="padding-left:10px;">
      <h2 style="margin-top:15px;margin-bottom:13px;">学习态度记录</h2>
      <Table border max-height="700" :columns="resultColumns" :data="resultData"></Table>
      <br/>
      <div style="text-align:center;padding-bottom:50px">
        <Button type="success" @click="pageToList">返回</Button>
      </div>
  </div>
</template>

<script>
export default {
  name: 'learningAttitudeHis',
  data() {
    return {
      resultData: [],
      studentId:"",
      classTestId:"",
      sportsClassId:"",
      yearSemester:"",
      resultColumns: [
        {
          title: '学生姓名',
          key: 'studentName',
          align: 'center',
          minWidth:100,
        },
        {
          title: '授课老师',
          key: 'teacherName',
          align: 'center',
          minWidth:100,
        },
        {
          title: '上课时间',
          key: 'week',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            let {week, classType, planLearn} = params.row
            const weekList = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日']
            let weekName = weekList[week-1] || '';
            if(classType == 1){
              weekName = `${weekName}       ${planLearn}节`;
            }else{
              weekName = `${weekName}       大课间`;
            }
            return h('div', weekName)
          }
        },
        {
          title: '被扣分数',
          key: 'deductionScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', (params.row.deductionScore/100).toFixed(2))
          }
        },
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
          title: '大课间违反纪律',
          key: 'bigViolateDisciplineCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.bigViolateDisciplineCount == null){
                row.bigViolateDisciplineCount=0;
            }
            return h('div', row.bigViolateDisciplineCount)
          }
        },
        {
          title: '大课间缺席',
          key: 'bigAbsentCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.bigAbsentCount == null){
                row.bigAbsentCount=0;
            }
            return h('div', row.bigAbsentCount)
          }
        },
        {
          title: '扣分时间',
          key: 'createTime',
          align: 'center',
          minWidth:100,
        },
      ],

    }
  },
  methods: {
    //返回
    pageToList() {
      this.$router.go(-1);
    },
    querySportsClassStudentHis() {
      var vm = this
      this.$axios.get('/v1/cd/high/LearningAttitude/queryHighSportsClassStudentHis?studentId='+vm.studentId+'&sportsClassId='+vm.sportsClassId+'&classTestId='+vm.classTestId).then(res => {
        vm.loading=false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response
        } else {
          if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg)
          }
        }
      })
    },
  },
  mounted() {
    this.studentId = Number(sessionStorage.getItem('learningAttitude-learningAttitudeHis-studentId'));
    this.sportsClassId = Number(sessionStorage.getItem('learningAttitude-learningAttitudeHis-sportsClassId'));
    this.classTestId = Number(sessionStorage.getItem('learningAttitude-learningAttitudeHis-classTestId'));
    this.querySportsClassStudentHis();
  }
}
</script>
