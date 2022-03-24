<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按班级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style="" >年级：</span>
                    <Select v-model="grade"  style="width:120px;">
                        <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass" style="width:120px;">
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="queryStudentScore">查询</Button>
            </div>
         </div>
      </Card>
      <br/>
      <Card>
       <div style="font-size:18px;height:40px;">
            数据明细
        </div>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
      <TabPane name="first" label="第一学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" @on-sort-change='sortChange' :columns="resultColumns" :data="resultDataFirst"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div style="float: right;">
          <Page :total="totalFirst" :current="pageNumFirst" :page-size="pageSizeFirst" @on-change='pageNumChangeFirst' @on-page-size-change='pageSizechangeFirst' show-total show-sizer></Page>
        </div>
       </TabPane>
       <TabPane name="second" label="第二学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" @on-sort-change='sortChange2' :columns="resultColumns" :data="resultDataSecond"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div style="float: right;">
          <Page :total="totalSecond" :current="pageNumSecond" :page-size="pageSizeSecond" @on-change='pageNumChangeSecond' @on-page-size-change='pageSizechangeSecond' show-total show-sizer></Page>
        </div>
       </TabPane>
        <TabPane  name="year" label="学年">
        <div>
          <Row>
            <div style>
              <Table border max-height="550"  :loading="loading" @on-sort-change='sortChange3' :columns="resultColumnsYear" :data="resultDataYear"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div style="float: right;">
          <Page :total="totalYear" :current="pageNumYear" :page-size="pageSizeYear" @on-change='pageNumChangeYear' @on-page-size-change='pageSizechangeYear' show-total show-sizer></Page>
        </div>
       </TabPane>
      </Tabs>
      </Card>
    </div>
  </div>
</template>

<script>
import gradeData from '@/libs/grade'
import classList from '@/libs/classList'
import util from '@/libs/util'
export default {
  name: 'schoolList',
  data() {
    return {
      selectTabName:'first',
      loading:false,
      pageNumYear: 1,
      pageSizeYear: 10,
      totalYear: 0,
      pageNumSecond: 1,
      pageSizeSecond: 10,
      totalSecond: 0,
      pageNumFirst: 1,
      pageSizeFirst: 10,
      totalFirst: 0,
      updateUrl: '',
      schoolId: '',
      schoolType: '',
      grade: '9999',
      orderType:"",
      semesterYearList:[],
      firstYearSemester:"",
      secondYearSemester:"",
      orderField:"student_class",
      orderSort:"asc",
      schoolDistrict:"",
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
          title: "班级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let text = row.studentClass+"班"
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
            let text = row.actionScore/row.allCount;
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
            let text = row.staminaScore/row.allCount;
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
            let text = row.healthScore/row.allCount;
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
            let text = row.semesterScore/row.allCount;
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
          title: "班级",
          key: "grade",
          align: "center",
          width:80,
          render: (h, params) => {
            const row = params.row;
            let text = row.studentClass+"班"
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
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.semesterScore < 0){
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
          key: "semesterScore",
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
      schoolGradeList: [],
      studentClass: '',
      classList: classList,
      registerCode: '',
      studentName: '',
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
      selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('sportsScoreStudent-selectTabName',this.selectTabName);
    },
    sortChange(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = 'asc';
       }
      
       this.search(1);
    },
    sortChange2(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = 'asc';
       }
      
       this.search(2);
    },
    sortChange3(column){
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = 'asc';
       }
      
       this.search(3);
    },
    search(type) {
      var vm = this
      let schoolId = vm.schoolId
      vm.queryYearSemesterList(type)
     //vm.getExerciseListCount(schoolId)
    },
    queryYearSemesterList(type) {
      var vm = this;
      vm.loading = true;
      let yearSemesterQuery="";
      let  pageNum = 0;
      let  pageSize = 0;
     let orderField=vm.orderField;
      let orderSort=vm.orderSort

      if(type==1){
          yearSemesterQuery = "&firstYearSemester="+vm.firstYearSemester;
          pageNum = vm.pageNumFirst;
          pageSize = vm.pageSizeFirst;
         
      }else if(type==2){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester;
          pageNum = vm.pageNumSecond;
          pageSize = vm.pageSizeSecond;
          
      }else if(type==3){
          yearSemesterQuery = "&secondSeyearSemester="+vm.secondYearSemester+"&firstYearSemester="+vm.firstYearSemester;
          pageNum = vm.pageNumYear;
          pageSize = vm.pageSizeYear;
      }
      let grade = vm.grade;
      let studentClass = vm.studentClass;
      if(!grade){
        vm.grade = '';
      }
      if(!studentClass){
        vm.studentClass = '';
      }
      
      this.$axios.get("/v1/semesterScore/km/queryStudentSemesterSportsByClassGradeYN?studentClassSelect=1&grade="+vm.grade+yearSemesterQuery+"&pageNo="+pageNum+"&pageSize="+pageSize+"&studentClass="+(vm.studentClass == '9999'?'':vm.studentClass)+"&orderField="+orderField+"&orderSort="+orderSort).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
           if(type == 1){
              vm.resultDataFirst = res.data.response;
           }else if(type==2){
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
    queryYearSemesterListCount(type) {
      var vm = this
      let studentClass = vm.studentClass;
      if(!vm.grade){
        vm.grade = '';
      }
      if(!studentClass){
        vm.studentClass = '';
      }
      let yearSemesterQuery="";
      if(type==1){
          yearSemesterQuery = "&yearSemester="+vm.firstYearSemester;
      }else if(type==2){
          yearSemesterQuery = "&yearSemester="+vm.secondYearSemester;
      }else if(type==3){
          yearSemesterQuery = "&yearSemester="+vm.secondYearSemester;
      }
      
      this.$axios.get('/v1/semesterScore/km/queryStudentSemesterSportsByClassGradeCountYN?studentClassSelect=1&grade='+vm.grade+"&studentClass="+(vm.studentClass == '9999'?'':vm.studentClass)+yearSemesterQuery).then(res => {
        if (res.data.code == 10000) {
              if(type==1){
                  this.totalFirst = res.data.response
              }else if(type==2){
                  this.totalSecond = res.data.response
              }else if(type==3){
                  this.totalYear = res.data.response
              }
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(grade,studentClass) {
      let queryData ={
        grade:grade,
        studentClass:studentClass,
        selectTabName:this.selectTabName,
      }
      this.$router.push({ name: 'sportsScoreStudentKM',params:{previous:queryData}})
    },
    pageNumChangeFirst(value) {
      //页码改变方法处理
      if (this.pageNumFirst != value) {
          this.pageNumFirst = value
          this.queryYearSemesterList(1)
      }
    },
    pageSizechangeFirst(value) {
      //页面大小改变方法处理
      if (this.pageSizeFirst != value) {
          this.pageSizeFirst = value
          this.pageNumFirst = 1;
          this.queryYearSemesterList(1)
      }
    },

    pageNumChangeSecond(value) {
      //页码改变方法处理
      if (this.pageNumSecond != value) {
        this.pageNumSecond = value
        this.queryYearSemesterList(2)
      }
    },
    pageSizechangeSecond(value) {
      //页面大小改变方法处理
      if (this.pageSizeSecond != value) {
        this.pageSizeSecond = value
        this.pageNumSecond = 1;
        this.queryYearSemesterList(2)
      }
    },


    pageNumChangeYear(value) {
      //页码改变方法处理
      if (this.pageNumYear != value) {
        this.pageNumYear = value
        this.queryYearSemesterList(3)
      }
    },
    pageSizechangeYear(value) {
      //页面大小改变方法处理
      if (this.pageSizeYear != value) {
        this.pageSizeYear = value
        this.pageNumYear = 1;
        this.queryYearSemesterList(3)
      }
    },

    queryStudentScore(){
      let vm = this;
      let data = {
        grade:this.grade,
        studentClass:this.studentClass,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        selectTabName:this.selectTabName,
      }
      this.$store.dispatch('pageParams/saveListPagePars',{name:this.$route.name,pars:data}); 
      this.queryYearSemesterList(1)
      this.queryYearSemesterListCount(1);
      this.queryYearSemesterList(2);
      this.queryYearSemesterListCount(2);
      this.queryYearSemesterList(3);
      this.queryYearSemesterListCount(3);
    },
    getSchoolAllYearSemester() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getSchoolAllYearSemester").then(res => {
        if (res.data.code == 10000) {
          vm.semesterYearList =res.data.response;
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
  created() {
    let vm = this
    vm.schoolType = sessionStorage.getItem('schoolType')
    this.schoolGradeList = gradeData.inOf(vm.schoolType,1)
    this.grade = this.schoolGradeList[0].grade
    let {previous} = this.$route.params
    if(previous){//班级过来的
      this.grade = previous.grade
      this.studentClass = '9999'
      this.selectTabName = previous.selectTabName
    }else{
      let params = util.hasParams(this.$store, this.$route);
      if(params){
        let {grade, studentClass, pageNum, pageSize, selectTabName} = params;
        this.grade = grade
        this.studentClass = studentClass
        this.pageNum = pageNum
        this.pageSize = pageSize
        this.selectTabName = selectTabName
      }
    }
  },
  mounted() {
  //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    if(vm.orderType == ""){
       vm.orderType = "1";
    }
    vm.schoolId = sessionStorage.getItem('schoolId')
    vm.schoolDistrict = sessionStorage.getItem('schoolDistrict')
    vm.getSchoolAllYearSemester()
  },
  beforeDestroy(){
  },
}
</script>
