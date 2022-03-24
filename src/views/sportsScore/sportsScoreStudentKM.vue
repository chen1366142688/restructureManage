<style>
   .sportsScoreStudent .ivu-tabs {
        overflow: visible;
        overflow-x: hidden;
        overflow-y: visible;
    }
</style>
<template>
  <div class="sportsScoreStudent" style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按学生查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span style>年<span style="visibility:hidden">空</span>级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>班<span style="visibility:hidden">空</span>级：</span>
              <Select v-model="studentClass"  style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div  style="margin:5px 20px;">
              <span>性<span style="visibility:hidden">空</span>别：</span>
              <Select v-model="gender"  style="width:120px;">
                <Option
                  v-for="item in genderList"
                  :value="item.itemId"
                  :key="item.itemId"
                >{{ item.itemName }}</Option>
              </Select>
            </div>
            <div @keydown.enter="queryStudentScore" style="margin:5px 20px;">
              <span>姓<span style="visibility:hidden">空</span>名：</span>
              <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 20px;" @keydown.enter="queryStudentScore">
              <span>学籍号：</span>
              <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
            </div>
          </div>
          <!-- 操作按钮 -->
          <div class="right-btns">
              <Button type="success" @click="queryStudentScore">查询</Button>
              <Button type="success" @click="batchScore">重新计算学期体育成绩</Button>
              <Button type="success" @click="exportDataPre">导出综合评价成绩</Button>
          </div>
        </div>
      </Card>
      <br/>
      <Card>
      <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
       <TabPane name="first" label="第一学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="530"  :loading="loading" @on-sort-change='sortChange' :columns="resultColumns" :data="resultDataFirst"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div v-show="totalFirst>0" style="float: right;">
          <Page :total="totalFirst" :current="pageNumFirst" :page-size="pageSizeFirst" @on-change='pageNumChangeFirst' @on-page-size-change='pageSizechangeFirst' show-total show-sizer></Page>
        </div>
       </TabPane>
       <TabPane  name="second" label="第二学期">
        <div>
          <Row>
            <div style>
              <Table border max-height="530"  :loading="loading"  @on-sort-change='sortChange2' :columns="resultColumns" :data="resultDataSecond"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div v-show="totalSecond>0" style="float: right;">
          <Page :total="totalSecond" :current="pageNumSecond" :page-size="pageSizeSecond" @on-change='pageNumChangeSecond' @on-page-size-change='pageSizechangeSecond' show-total show-sizer></Page>
        </div>
       </TabPane>
        <TabPane  name="year" label="学年">
        <div>
          <Row>
            <div>
              <Table border max-height="530"  :loading="loading" @on-sort-change='sortChange3' :columns="resultColumnsYear" :data="resultDataYear"></Table>
            </div>
          </Row>
        </div>
        <br>
        <div v-show="totalYear>0" style="float: right;">
            <Page :total="totalYear" :current="pageNumYear" :page-size="pageSizeYear" @on-change='pageNumChangeYear' @on-page-size-change='pageSizechangeYear' show-total show-sizer></Page>
        </div>
       </TabPane>
      </Tabs>
      </Card>
    </div>
    <Modal
        :title="categorySemesterTitle"
        v-model="createSemesterScore"
        :closable="true"
        :mask-closable="false"
        :footer-hide="true"
        >
        <p><Progress :percent="typeScore" status="active"></Progress></p>
    </Modal>
    <!-- <Modal v-model="modal1" :closable="false" title="温馨提示" @on-ok="openSignatureStatus" @on-cancel="cancel">
        <p>家长签名后的学生成绩将被锁定，无法修改，是否确定开启家长签名？</p>
    </Modal> -->
    <Modal v-model="exportShow" :mask-closable="false" width="360" height="800">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>综合评价导出设置</span>
      </p>
      <div style="text-align:center">
        <span>导出学期：</span>
        <Select v-model="exportYearmester" size="small" style="width:180px;">
              <Option v-for="item in exportYearsesterList" :value="item.value" :key="item.value">{{ item.name }}</Option>
            </Select>
      </div>
      <div slot="footer">
        <Button type="success" size="large" @click="exportData">确定</Button>
        <Button type="success" size="large" @click="cancelexport">取消</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import gradeData from '@/libs/grade'
import classList from '@/libs/classList'
import util from '@/libs/util';
import api from '@/api/baseApi';
export default {
  name: 'schoolList',
  data() {
    return {
      categorySemesterTitle:'学期成绩计算中',
      exportShow:false,
      exportYearmester:'',
      exportYearsesterList:[],
      repeatStatus:false,
      signatureTf:false,
      modal1:false,
      isReport:false,
      createSemesterScore:false,
      selectTabName:"",
      schoreCreateTime:"",
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
      gender:"",
      schoolDistrict:"",
      typeScore:0,
      genderList:[
        {
          itemId:"",
          itemName:"全部"
        },
        {
          itemId:"1",
          itemName:"男"
        },
        {
          itemId:"2",
          itemName:"女"
        }
      ],
      orderType:"",
      semesterYearList:[],
      firstYearSemester:"",
      secondYearSemester:"",
      orderField:"student_class",
      orderSort:"",
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width:120,

        },
        {
            title: "性别",
            key: "studentName",
            align: "center",
            width:60,
            render: (h, params) => {
                const row = params.row;
                const text = row.gender == '1'?"男":"女";
                return h("span", text);
            }
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width:140
        },

        {
          title: "班级",
          key: "grade",
          align: "center",
          width:110,
          render: (h, params) => {
            const row = params.row;
            let gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三',]
            let text = row.grade>0&&row.grade<13?gradeList[row.grade-1]:'';
            return h("span", text+row.studentClass+"班");
          }
        },
        {
          title: "专项技能",
          key: "actionScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = ''
            if(row.actionScore || row.actionScore === 0){//有得分
              if(row.exemptionStatus == '1'){//免考
                text = `${row.actionScore.toFixed(1)}（免考）`
              }else{//有得分不免考
                text = row.actionScore.toFixed(1)
              }
            }
            return h("span", text);
          }
        },
        {
          title: "基础体能",
          key: "staminaScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = ''
            if(row.staminaScore || row.staminaScore === 0){//有得分
              if(row.exemptionStatus == '1'){//免考
                text = `${row.staminaScore.toFixed(1)}（免考）`
              }else{//有得分不免考
                text = row.staminaScore.toFixed(1)
              }
            }
            return h("span", text);
          }
        },
        {
          title: "体质健康监测",
          key: "healthScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = this.showScoreEmpt(row,'healthScore')
            return h("span", text);
          }
        },
        {
          title: "学期总得分",
          key: "semesterScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
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
                      this.toDetail(row);
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
          title: "姓名",
          key: "studentName",
          align: "center",
          width:120
        },
        {
            title: "性别",
            key: "gender",
            align: "center",
            width:70,
            render: (h, params) => {
                const row = params.row;
                const text = row.gender == '1'?"男":"女";
                return h("span", text);
            }
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width:120
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width:120,
          render: (h, params) => {
            const row = params.row;
            let gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三',]
            let text = row.grade>0&&row.grade<13?gradeList[row.grade-1]:'';
            return h("span", text+row.studentClass+"班");
          }
        },
        {
          title: "上学期总得分",
          key: "semesterUpScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterUpScore;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "下学期总得分",
          key: "semesterDownScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterDownScore;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "竞赛加分",
          key: "competitionScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.competitionScore;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "得分总和",
          key: "contestYearScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.contestYearScore;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "学年中考得分",
          key: "middleScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.middleScore;
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
                      this.toDetail(row);
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
      total: 0,
      selectYear:'1',
    }
  },
  methods: {
    /**整合分数展示**/
    showScoreEmpt(row,key){
      let text = '';
      if(row.grade == '7'){//七年级一二学期都显示-
        text = '—'
      }
      if(row.grade == '8' || row.grade == '9'){//八九年级
        if(row.yearSemester%2 == 1){//第二学期
          if(row[key] || row[key] === 0){//有得分
            if(row.exemptionStatus == '1'){//免考
              text = `${row[key].toFixed(1)}（免考）`
            }else{//有得分不免考
              text = row[key].toFixed(1)
            }
          }else{//没有得分
            text = ''
          }
        }else{//第一学期
          text = '—'
        }
      }
      return text;
    },
    /**学生学期中考技能体能项目成绩**/
    async batchDisposeMiddleExamination(){
      this.typeScore=0;
      this.categorySemesterTitle = '学期成绩计算中'
      this.createSemesterScore = true;
      let res1 = await api.batchDisposeMiddleExamination();
      if(res1.data.code == 10000){
        this.typeScore=25;
        let res2 = await api.competitionAddScoreStatistics();
        if(res2.data.code == 10000){
          this.typeScore=50;
          let res3 = await api.synchronizationStudentBodyMonitorToScore();
          if(res3.data.code == 10000){
            this.typeScore=75;
            let res4 = await api.batchDisposeStudentScore();
            if(res4.data.code == 10000){
              this.typeScore=100;
              this.categorySemesterTitle = '学期成绩计算完成'
              this.createSemesterScore = false;
              this.getSchoolAllYearSemester();
            }else{
              this.createSemesterScore = false;
              this.$Message.info(res4.data.msg)
            }
          }else{
            this.createSemesterScore = false;
            this.$Message.info(res3.data.msg)
          }
        }else{
          this.createSemesterScore = false;
          this.$Message.info(res2.data.msg)
        }
      }else{
        this.createSemesterScore = false;
        this.$Message.info(res1.data.msg)
      }
    },
    toLessonReport () {
      this.$router.push({name: 'lessonReport'})
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
          this.orderSort = '';
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
          this.orderSort = '';
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
          this.orderSort = '';
       }

       this.search(3);
    },
    openSignature(){
      var vm=this;
      vm.modal1=true;
    },
    cancel() {
      var vm=this;
      vm.modal1=false;
    },
     search(type) {
      var vm = this
      vm.queryYearSemesterList(type)
    },
    selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('sportsScoreStudent-selectTabName',this.selectTabName);
    },
    queryStudentScoreYearListCD(type) {
      var vm = this;
      vm.loading = true;
      let data = {
          orderField: vm.orderField,
          orderSort: vm.orderSort,
          grade:vm.grade == '9999'?'':vm.grade,
          studentClass:vm.studentClass,
          studentName:vm.studentName,
          registerCode:vm.registerCode,
          gender:vm.gender
      };
      data.firstYearSemester = vm.firstYearSemester;
      data.secondYearSemester = vm.secondYearSemester;
      data.pageNo = vm.pageNumYear;
      data.pageSize = vm.pageSizeYear;
      this.$axios.post("/v1/semesterScore/km/queryStudentScoreYearListCD",data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
           vm.resultDataYear = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    queryYearSemesterList(type) {
      var vm = this;
      vm.loading = true;
      let data = {
          grade:vm.grade == '9999'?'':vm.grade,
          studentClass:vm.studentClass == '9999'?'':vm.studentClass,
          studentName:vm.studentName,
          registerCode:vm.registerCode,
          gender:vm.gender,
          pageNo: vm.pageNum,
          pageSize: vm.pageSize,
          orderField: vm.orderField,
          orderSort: vm.orderSort
      };
      if(type==1){
          data.pageNo = vm.pageNumFirst;
          data.pageSize  = vm.pageSizeFirst;
          data.firstYearSemester = vm.firstYearSemester;
      }else if(type==2){
          data.secondYearSemester = vm.secondYearSemester;
          data.pageNo = vm.pageNumSecond;
          data.pageSize = vm.pageSizeSecond;
      }else if(type==3){
          data.firstYearSemester = vm.firstYearSemester;
          data.secondYearSemester = vm.secondYearSemester;
          data.pageNo = vm.pageNumYear;
          data.pageSize = vm.pageSizeYear;
      }
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: data});
      this.$axios.post("/v1/semesterScore/km/queryStudentScoreListKM",data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          if(type == 1){
              vm.resultDataFirst = res.data.response;
            if(vm.secondYearSemester!=""){
              for(let i=0;i<vm.resultDataFirst.length;i++){
                res.data.response[i].healthOver="1"
                res.data.response[i].actionOver="1"
                res.data.response[i].staminaOver="1"
              }
            }
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
      if(this.grade == 0){
        this.grade="";
      }
      let data = {
          grade:vm.grade == '9999'?'':vm.grade,
          studentClass:vm.studentClass == '9999'?'':vm.studentClass,
          studentName:vm.studentName,
          registerCode:vm.registerCode,
          gender:vm.gender
      };
      if(type==1){
          data.pageNo = vm.pageNumFirst;
          data.pageSize  = vm.pageSizeFirst;
          data.yearSemester = vm.firstYearSemester;
      }else if(type==2){
          data.yearSemester = vm.secondYearSemester;
          data.pageNo = vm.pageNumSecond;
          data.pageSize = vm.pageSizeSecond;
      }else if(type==3){
          data.yearSemester = vm.firstYearSemester;
           data.yearSemester = vm.firstYearSemester;
          data.pageNo = vm.pageNumYear;
          data.pageSize = vm.pageSizeYear;
      }
      this.$axios.post('/v1/semesterScore/km/queryStudentScoreListCountKM',data).then(res => {
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
    toDetail(row){
      let vm = this;
      let data = {
          grade:vm.grade == '9999'?'':vm.grade,
          studentClass:vm.studentClass,
          studentName:vm.studentName,
          registerCode:vm.registerCode,
          gender:vm.gender,
          pageNo: vm.pageNum,
          pageSize: vm.pageSize,
          orderField: vm.orderField,
          orderSort: vm.orderSort,
          selectTabName:vm.selectTabName
      };
        this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: data});
        this.$router.push({name: 'sportsScoreStudentDetailKM',params:row})
    },
    dataReport(){
      var vm=this;
      vm.isReport=true;
      vm.batchScore();
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
        this.pageNumYear=1;
        this.queryYearSemesterList(3)
      }
    },
    /**重新批量计算学期体育成绩**/
    batchScore(){
      this.batchDisposeMiddleExamination()
    },

    queryStudentScore(){
      let vm = this;
      let pars =  {//核心的，列表页面的统一参数，整个后台管理系统的列表页都统一这种格式
        filter: {
          grade: vm.grade,
          studentClass: vm.studentClass,
          gender: vm.gender,
          studentName: vm.studentName,
          registerCode: vm.registerCode,
        },
        pageData:{
          pageNum: vm.pageNum,
          pageSize: vm.pageSize,
          orderField:vm.orderField, //排序字段
          orderType:vm.orderType, //排序方式
          selectTabName:vm.selectTabName, //Tabs选中项
        },
      };
      this.$store.dispatch('pageParams/saveListPagePars',{name:this.$route.name,pars:pars}); 
      sessionStorage.setItem('sportsScoreStudent-grade',vm.grade)
      sessionStorage.setItem('sportsScoreStudent-studentClass',vm.studentClass)
      sessionStorage.setItem('sportsScoreStudent-registerCode',vm.registerCode)
      sessionStorage.setItem('sportsScoreStudent-gender',vm.gender)
      sessionStorage.setItem('sportsScoreStudent-studentName',vm.studentName)
      sessionStorage.setItem('sportsScoreStudent-pageNum',vm.pageNum)
      sessionStorage.setItem('sportsScoreStudent-pageSize',vm.pageSize)
      if(vm.firstYearSemester != ""){
         this.queryYearSemesterList(1)
         this.queryYearSemesterListCount(1);
      }
      if(vm.secondYearSemester != ""){
         this.queryYearSemesterList(2);
         this.queryYearSemesterListCount(2);
        this.queryYearSemesterList(3);
        this.queryYearSemesterListCount(3);
      }
    },
    /**获取学校所有学期**/
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
                 vm.exportYearsesterList=[
                   {
                     name:"第一学期",
                     value:"1"
                   },
                   {
                     name:"第二学期",
                     value:"2"
                   },
                   {
                     name:"学年",
                     value:"3"
                   },
                 ]
              }else{
                 vm.firstYearSemester = yearSemester;
                 vm.secondYearSemester = (yearSemester+9);
                  vm.exportYearsesterList=[
                      {
                          name:"第一学期",
                          value:"1"
                      },
                      {
                          name:"第二学期",
                          value:"2"
                      },
                      {
                          name:"学年",
                          value:"3"
                      },
                  ]
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
    exportStudentScore(){
      var vm=this;
      if(typeof(vm.grade) == "undefined"){
          vm.grade="";
      }
      vm.grade = vm.grade == '9999'?'':vm.grade
      if(typeof(vm.studentClass) == "undefined"){
          vm.studentClass="";
      }
      if(typeof(vm.gender) == "undefined"){
          vm.gender="";
      }
        if(typeof(vm.studentName) == "undefined"){
          vm.studentName="";
      }
      if(typeof(vm.registerCode) == "undefined"){
          vm.registerCode="";
      }
      let url =
        this.$axios.defaults.baseURL +
        '/v1/semesterScore/km/exportStudentScorePdf?grade='+vm.grade+'&studentClass='+vm.studentClass+
        '&gender='+vm.gender+'&studentName='+vm.studentName+'&registerCode='+vm.registerCode+
        '&token=' +
        sessionStorage.getItem('token')
        window.open(url)
    },
    exportDataPre(){
      var vm=this;
      vm.exportYearmester="";
      vm.exportShow=true;
    },
    cancelexport(){
      var vm=this;
      vm.exportShow=false;
    },
    exportData(){
      var vm=this;
      if(!vm.exportYearmester){
        vm.$Message.info('请选择导出的学期!');
        return false;
      }
      if( vm.exportYearmester==1 && (vm.resultDataFirst == null || vm.resultDataFirst.length <=0)  ){
          vm.$Message.info('没有第一学期数据！');
          return false;
      }
      if( vm.exportYearmester==2 && (vm.resultDataSecond == null || vm.resultDataSecond.length <=0)  ){
          vm.$Message.info('没有第二学期数据！');
          return false;
      }
       if(typeof(vm.grade) == "undefined"){
                    vm.grade="";
                }
                vm.grade = vm.grade == '9999'?'':vm.grade
                if(typeof(vm.studentClass) == "undefined"){
                    vm.studentClass="";
                }
                 if(typeof(vm.selectYear) == "undefined"){
                    vm.selectYear="";
                }
                if(typeof(vm.gender) == "undefined"){
                    vm.gender="";
                }
                 if(typeof(vm.studentName) == "undefined"){
                    vm.studentName="";
                }
                if(typeof(vm.registerCode) == "undefined"){
                    vm.registerCode="";
                }
                if(typeof(vm.schoolDistrict) == "undefined"){
                    vm.schoolDistrict="";
                }
      let url =
        this.$axios.defaults.baseURL +
        '/v1/semesterScore/km/exportStudentListKM?grade='+vm.grade+'&studentClass='+vm.studentClass+"&selectYear="+vm.exportYearmester+
        '&gender='+vm.gender+'&studentName='+vm.studentName+'&registerCode='+vm.registerCode+'&schoolDistrict='+vm.schoolDistrict+
        '&token=' +
        sessionStorage.getItem('token')
        window.open(url)
        vm.exportShow=false;
    }

  },
  watch: {
    college: function() {
      var vm = this
      vm.getSchoolMajorBySchoolId(vm.schoolId, vm.college)
    },
    selectTabName:function(){
      var vm=this;
      if(vm.selectTabName=="first"){
          vm.selectYear="1"
        }else if(vm.selectTabName=="second"){
          vm.selectYear="2"
        }else if(vm.selectTabName=="year"){
          vm.selectYear="3"
        }
    }
  },
  created() {
    this.schoolType = sessionStorage.getItem('schoolType')
    this.schoolGradeList = gradeData.inOf(this.schoolType,1)
    let {previous} = this.$route.params
    if(previous){//班级过来的
      this.grade = previous.grade
      this.studentClass = previous.studentClass
      this.selectTabName = previous.selectTabName
    }else{//自己查询存储的
      let params = util.hasParams(this.$store, this.$route);
      if(params){
        let {grade, studentClass, registerCode, studentName, gender, pageNum, pageSize, selectTabName} = params;
        this.grade = grade
        this.gender = gender
        this.studentClass = studentClass
        this.registerCode = registerCode
        this.studentName = studentName
        this.pageNum = pageNum
        this.pageSize = pageSize
        this.selectTabName = selectTabName
      }else{
        this.grade = '9999'
      }
    }
  },
  mounted() {
    const vm = this
    vm.schoolId = sessionStorage.getItem('schoolId')
    vm.schoolDistrict = sessionStorage.getItem('schoolDistrict')
    vm.getSchoolAllYearSemester();
  },
}
</script>
