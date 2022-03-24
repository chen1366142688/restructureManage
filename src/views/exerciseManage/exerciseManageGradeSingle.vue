<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按年级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div>
              <span>年级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"  @click="querySearch">查询</Button>
          </div>
        </div>
      </Card>
      <br  v-if="showAll">
      <Card v-if="showAll">
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
            <div style>
              <Table border max-height="450" :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
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
      loading: false,
      grade: '',
      showAll:true,
      schoolGradeList:[],
      allNeedCount:0,
      allNeedBoyCount:0,
      allNeedGirlCount:0,
      finishCount:0,
      finishBoyCount:0,
      finishGirlCount:0,
      finishRatio:0,
      finishBoyRatio:0,
      finishGirlRatio:0,
      primaryList: [
         {
          grade: '',
          label: '全部'
        },
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
          grade: '',
          label: '全部'
        },
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
          grade: '',
          label: '全部'
        },
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
      resultColumns: [
        {
          title: '年级',
          key: 'grade',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.grade==1?"一年级":row.grade==2?"二年级":row.grade==3?"三年级":row.grade==4?"四年级":
            row.grade==5?"五年级":row.grade==6?"六年级":row.grade==7?"七年级":row.grade==8?"八年级":row.grade==9?"九年级":row.grade==10?"高一":row.grade==11?"高二":row.grade==12?"高三":'--';
            return h('div', text)
          }
        },
        {
          title: '总人数',
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
                      this.toDetail(params.row.grade)
                    }
                  }
                },
                "详情"
              )
            ])
          }
        }
      ],
      resultData: [],
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

      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    getTestClassSingle() {
      var vm = this;
      vm.loading = true;
      this.$axios.get("/v1/schoolteststudent/getTestClassSingle?schoolId=1&gradeId="+vm.grade).then(res => {
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
    getTestGradeSingleList() {
      var vm = this;
      vm.loading = true;
      this.$axios.get("/v1/schoolteststudent/getTestGradeSingleList?schoolId=1&gradeId="+vm.grade).then(res => {
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
      var vm=this;
      this.pageNum = 1;
      this.pageNo = 1
      this.search();
      sessionStorage.setItem('exerciseManageGradeSingle-grade',vm.grade)
    },
    search() {
      var vm = this
      vm.getTestGradeSingleList()
      vm.getTestClassSingle()
    },
    toDetail(grade){
      var vm=this;
        sessionStorage.setItem('exerciseManageGradeSingle-exerciseManageClassSingle-grade',grade)
        this.$router.push({name: 'exerciseManageClassSingle'})
    }
  },
  watch: {
    
  },
  created() {},
  mounted() {
    let vm = this;
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;
    if ('2' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
    }
    if ('3' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
    }
    if ('4' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
    }
    let  grade = sessionStorage.getItem('exerciseManageGradeSingle-grade');
    if(grade != null && grade != "" && grade != undefined && grade > 0){
        vm.grade = Number(grade);
    }
    this.search();
  }
};
</script>