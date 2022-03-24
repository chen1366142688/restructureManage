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
                <Button type="success"  @click="queryStudentScore">查询</Button>
            </div>
        </div>
      </Card>
      <br>
      <Card>
       <div style="font-size:18px;height:40px;">
            数据明细
        </div>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
       <TabPane name="first" label="第一学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" :columns="resultColumns" :data="resultDataFirst"></Table>
            </div>
          </Row>
        </div>
       </TabPane>
       <TabPane name="second" label="第二学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" :columns="resultColumns" :data="resultDataSecond"></Table>
            </div>
          </Row>
        </div>
       </TabPane>
       <TabPane name="year" label="学年">
        <div>
          <Row>
            <div style>
              <Table border max-height="550" :loading="loading" :columns="resultColumnsYear" :data="resultDataYear"></Table>
            </div>
          </Row>
        </div>
       </TabPane>
      </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
import gradeData from '@/libs/grade'
export default {
  name: "schoolList",
  data() {
    return {
      selectTabName:'',
      loading: false,
      grade: '9999',
      schoolDistrict:"",
      showAll:true,
      schoolGradeList:[],
      semesterYearList:[],
      firstYearSemester:"",
      secondYearSemester:"",
      resultColumns: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三',]
            const text = row.grade>0&&row.grade<13?gradeList[row.grade-1]:'';
            return h("span", text);
          }
        },
        {
          title: "总人数",
          key: "allCount",
          align: "center",
          sortable:'custom',
          width:110,
        },
        {
          title: "专项技能",
          key: "actionScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore;
            if(row.actionScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "基础体能",
          key: "staminaScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore;
            if(row.staminaScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体质健康监测",
          key: "healthScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore;
            if(row.healthScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "学期平均得分",
          key: "semesterScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
                return h("span", '-');
            }
            let text = row.semesterScore;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:100,
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
                      this.toDetail(row.grade,row.studentClass);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      resultDataYear:[],
      resultDataSecond: [],
      resultDataFirst: [],
      resultColumnsYear: [
        {
          title: "年级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三',]
            const text = row.grade>0&&row.grade<13?gradeList[row.grade-1]:'';
            return h("span", text);
          }
        },
        {
          title: "总人数",
          key: "allCount",
          align: "center",
          width:80,
        },
        {
          title: "上学期平均得分",
          key: "semesterFirstScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterFirstScore < 0){
                return h("span", '-');
            }
            let text = row.semesterFirstScore/row.allCount;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "下学期平均得分",
          key: "semesterSecondScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterSecondScore < 0){
                return h("span", '-');
            }
            let text = row.semesterSecondScore/row.allCount;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "平均竞赛加分",
          key: "contestScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.contestScore/row.allCount;
            if(row.contestScore < 0 ){
                text = "-";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width:100,
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
                      this.toDetail(row.grade,row.studentClass);
                    }
                  }
                },
                "详情"
              ),
            ]);
          }
        }
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
      sortChange(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = '';
       }
    },
      selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('sportsScoreStudent-selectTabName',this.selectTabName);
    },
    queryYearSemesterList(type) {
      var vm = this;
      vm.loading = true;
      let yearSemesterQuery="";
      if(type==1){
          yearSemesterQuery = "&firstYearSemester="+vm.firstYearSemester;
      }else if(type==2){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester;
      }else if(type==3){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester+"&firstYearSemester="+vm.firstYearSemester;
      }
      if(!vm.grade){
        vm.grade = '';
      }
      vm.grade = vm.grade == '9999'?'':vm.grade
      this.$axios.get("/v1/semesterScore/km/queryStudentSemesterSportsByClassGradeYN?studentClassSelect=0&grade="+vm.grade+yearSemesterQuery+"&pageNo=1&pageSize=15").then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          
            if(type == 1){
              
              for(let i=0;i<res.data.response.length;i++){
            res.data.response[i].staminaScore=res.data.response[i].staminaScore/res.data.response[i].allCount
             res.data.response[i].healthScore=res.data.response[i].healthScore/res.data.response[i].allCount
              res.data.response[i].learnScore=res.data.response[i].learnScore/res.data.response[i].allCount
                  res.data.response[i].actionScore=res.data.response[i].actionScore/res.data.response[i].allCount
                   res.data.response[i].semesterScore=res.data.response[i].semesterScore/res.data.response[i].allCount
                    }
                    vm.resultDataFirst = res.data.response;
           }else if(type==2){
              for(let i=0;i<res.data.response.length;i++){
                 res.data.response[i].staminaScore=res.data.response[i].staminaScore/res.data.response[i].allCount
                 res.data.response[i].healthScore=res.data.response[i].healthScore/res.data.response[i].allCount
                res.data.response[i].learnScore=res.data.response[i].learnScore/res.data.response[i].allCount
                  res.data.response[i].actionScore=res.data.response[i].actionScore/res.data.response[i].allCount
                  res.data.response[i].semesterScore=res.data.response[i].semesterScore/res.data.response[i].allCount
              }
              vm.resultDataSecond = res.data.response;
           }else if(type==3){
             vm.resultDataYear = res.data.response;
           }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    queryStudentScore(){
      this.queryYearSemesterList(1)
      this.queryYearSemesterList(2);
      this.queryYearSemesterList(3);
    },
    toDetail(grade){
        let queryData ={
        grade:grade,
        selectTabName:this.selectTabName,
      }
      this.$router.push({ name: 'sportsScoreClassYN',params:{previous:queryData}})
    },
    getSchoolAllYearSemester() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getSchoolAllYearSemester").then(res => {
        if (res.data.code == 10000) {
          vm.semesterYearList =res.data.response ;
          if(res.data.response){
              let yearSemester=res.data.response[0].yearSemester;
              if(yearSemester%2 == 1){//第二学期
                 vm.secondYearSemester = yearSemester;
                 vm.firstYearSemester = (yearSemester-9);
              }else{
                 vm.firstYearSemester = yearSemester;
                 vm.secondYearSemester = (yearSemester+9);
              }          
            vm.queryStudentScore()
          }
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
  created() {},
  mounted() {
    let vm = this;
    vm.schoolType = sessionStorage.getItem('schoolType')
    this.schoolGradeList = gradeData.inOf(vm.schoolType,1)
    this.grade = this.schoolGradeList[0].grade
    this.getSchoolAllYearSemester();
  },
  beforeDestroy(){
    
  },
};
</script>