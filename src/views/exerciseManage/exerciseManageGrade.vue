<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按年级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>年级：</span>
                    <Select v-model="grade" style="width:120px;">
                        <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="getExerciseList">查询</Button>
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
          grade: "",
          label: '全部'
        },
        {
          grade: "1",
          label: '一年级'
        },
        {
          grade: "2",
          label: '二年级'
        },
        {
          grade: "3",
          label: '三年级'
        },
        {
          grade: "4",
          label: '四年级'
        },
        {
          grade: "5",
          label: '五年级'
        },
        {
          grade: "6",
          label: '六年级'
        }
      ],
      middleList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: "7",
          label: '七年级'
        },
        {
          grade: "8",
          label: '八年级'
        },
        {
          grade: "9",
          label: '九年级'
        }
      ],
      highList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: "10",
          label: '高一'
        },
        {
          grade: "11",
          label: '高二'
        },
        {
          grade: "12",
          label: '高三'
        }
      ],
      resultColumns: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三','大一','大二','大三','大四']
            const text = row.grade?gradeList[row.grade-1]:'';
            return h("span", text);
          }
        },
        {
          title: "年级总人数",
          key: "stduentCount",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.boyCount+ row.girlCount;
            return h("span", text);
          }
        },
        {
          title: '完成考核人数/考核总人数',
          key: 'finishCount',
          align: 'center',
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            if(row.needComboCount > 0){
                const text = (row.boyFinishCount+row.girlFinishCount)+"/"+(row.boyCount+row.girlCount-row.boyCountExempt-row.girlCountExempt)
                return h('div', text)
            }else{
                return h('div', 0)
            }
          }
        },
        {
          title: '免试人数',
          key: 'studentCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.boyCountExempt+row.girlCountExempt
            return h('div', text)
          }
        },
        {
          title: "完成人数/考核总人数(男生)",
          key: "boyFinishCount",
          align: "center",
          width: 140,
          render: (h, params) => {
            const row = params.row;
            if(row.needComboCount > 0){
                const text = row.boyFinishCount+'/'+ (row.boyCount-row.boyCountExempt);
                return h("span", text);
            }else{
              return h("span", '0/'+ row.boyCount);
            }
          }
        },
         {
          title: "完成人数/考核总人数(女生)",
          key: "girlFinishCount",
          align: "center",
          width: 140,
          render: (h, params) => {
            const row = params.row;
            if(row.needComboCount > 0){
                const text = row.girlFinishCount+'/'+ (row.girlCount-row.girlCountExempt);
                return h("span", text);
            }else{
              return h("span", '0/'+ row.girlCount);
            } 
          }
        },
         {
          title: "男生完成率",
          key: "boyFinishCountRatio",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.boyCount > 0){
                let text = (row.boyFinishCount+row.boyCountExempt)*100/row.boyCount;
                text = text.toFixed(2)+'%';
                return h("span", text);
            }else{
              return h("span", "0.00%");
            }            
          }
        },
         {
          title: "女生完成率",
          key: "girlFinishCountRatio",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.girlCount > 0){
                let text = (row.girlFinishCount+row.girlCountExempt)*100/row.girlCount;
                text = text.toFixed(2)+'%';
                return h("span", text);
            }else{
              return h("span", "0.00%");
            }         
          }
        },
         {
          title: "总完成率",
          key: "finishCountRatio",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.girlCount+row.boyCount > 0){
                let text = (row.girlFinishCount+row.boyFinishCount+row.boyCountExempt+row.girlCountExempt)*100/(row.girlCount+row.boyCount);
                text = text.toFixed(2)+'%';
                return h("span", text);
            }else{
              return h("span", "0.00%");
            }
          }
        },
        {
          title: "上传视频总数",
          key: "videoCount",
          align: "center",
          sortable:'true',
          minWidth:100
        },
        {
          title: "完成进度",
          key: "finishComboRatio",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.needComboCount > 0){
              let text = row.finishComboCount*100/row.needComboCount;
              text = text.toFixed(2)+'%';
              return h("span", text);
            }else{
              return h("span", "0.00%");
            }
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "10px"
                  },
                  on: {
                    click: () => {
                      this.toDetail(row.grade);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      resultData: [],
      resultDataTotal:[],
      resultColumnsTotal: [
        {
          title: "总考核人数",
          key: "allNeedCount",
          align: "center",
          minWidth:100
        },
        {
          title: "总完成考核",
          key: "finishCount",
          align: "center",
          minWidth:100,
        },
        {
          title: "总完成率",
          key: "finishRatio",
          align: "center",
          minWidth:100,
        },
        {
          title: "男生考核",
          key: "allNeedBoyCount",
          align: "center",
          minWidth:100,
        },
         {
          title: "男生完成考核",
          key: "finishBoyCount",
          align: "center",
          minWidth:100,
        },
         {
          title: "男生完成率",
          key: "finishBoyRatio",
          align: "center",
          minWidth:100,
        },
         {
          title: "女生考核",
          key: "allNeedGirlCount",
          align: "center",
          minWidth:100,
        },
         {
          title: "女生完成考核",
          key: "finishGirlCount",
          align: "center",
          minWidth:100,
        },
        {
          title: "女生完成率",
          key: "finishGirlRatio",
          align: "center",
          minWidth:100,
        }
      ],

      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    getExerciseList() {
      var vm = this;
      if(vm.grade != ""){
        vm.showAll = false;
      }else{
        vm.showAll = true;
      }
      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: 1,
        pageSize: 10,
        type:1,
        orderField:'grade',
        orderSort:'asc'
      };
      this.$axios.post("/v1/familyexerciseanalyze/queryStudentExerciseGrade", data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response;
          if(vm.resultData != null && vm.resultData.length>0){
             if(vm.grade == ''){
                vm.allNeedCount=0;
                vm.allNeedBoyCount=0;
                vm.allNeedGirlCount=0;
                vm.finishCount=0;
                vm.finishBoyCount=0;
                vm.finishGirlCount=0;
                vm.finishRatio=0;
                vm.finishBoyRatio=0;
                vm.finishGirlRatio=0;

                for(let i=0;i<vm.resultData.length;i++){
                   if(vm.resultData[i].needComboCount > 0){
                      vm.allNeedCount=vm.allNeedCount+vm.resultData[i].boyCount+vm.resultData[i].girlCount;
                      vm.allNeedBoyCount=vm.allNeedBoyCount+vm.resultData[i].boyCount;
                      vm.allNeedGirlCount=vm.allNeedGirlCount+vm.resultData[i].girlCount;
                      vm.finishCount=vm.finishCount+vm.resultData[i].boyFinishCount+vm.resultData[i].girlFinishCount;
                      vm.finishBoyCount=vm.finishBoyCount+vm.resultData[i].boyFinishCount;
                      vm.finishGirlCount=vm.finishGirlCount+vm.resultData[i].girlFinishCount;
                   }
                }
                if(vm.allNeedCount != null && vm.allNeedCount > 0 ){
                    vm.finishRatio=vm.finishCount*100/vm.allNeedCount;
                    vm.finishRatio=vm.finishRatio.toFixed(2)+'%';
                }else{
                    vm.finishRatio="0.00%";
                }
                if(vm.allNeedBoyCount != null && vm.allNeedBoyCount > 0){
                    vm.finishBoyRatio=vm.finishBoyCount*100/vm.allNeedBoyCount;
                    vm.finishBoyRatio=vm.finishBoyRatio.toFixed(2)+'%';
                }else{
                    vm.finishBoyRatio="0.00%";
                }
                if(vm.allNeedGirlCount != null && vm.allNeedGirlCount > 0){
                    vm.finishGirlRatio=vm.finishGirlCount*100/vm.allNeedGirlCount;
                    vm.finishGirlRatio=vm.finishGirlRatio.toFixed(2)+'%';
                }else{
                    vm.finishGirlRatio="0.00%";
                }
                
                vm.resultDataTotal = [{
                      allNeedCount:vm.allNeedCount,
                      allNeedBoyCount:vm.allNeedBoyCount,
                      allNeedGirlCount:vm.allNeedGirlCount,
                      finishCount:vm.finishCount,
                      finishBoyCount:vm.finishBoyCount,
                      finishGirlCount:vm.finishGirlCount,
                      finishRatio:vm.finishRatio,
                      finishBoyRatio:vm.finishBoyRatio,
                      finishGirlRatio:vm.finishGirlRatio
                }];
             }
          }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    toDetail(grade){
        sessionStorage.setItem('exerciseManageClass-grade',grade)
        this.$router.push({name: 'exerciseManageClass'})
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
    this.getExerciseList();
  }
};
</script>