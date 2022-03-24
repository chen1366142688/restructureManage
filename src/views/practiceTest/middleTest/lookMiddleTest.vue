<template>
  <div>
    <tabs
    :myLoading="myLoading"
      :dataColumns="cutColumns"
      :dataResult="resultsData"
      @searchData="searchData"
      @tabsClick="tabsClick"
      :propsFormList='formList'
      title="中考模拟明细"
    >
      <template v-slot:search>
        <div>
            <Card>
                <div v-if="tabarIndex == '0'" class="top-search addClass" @keydown.enter="querySearch">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>年级：</span>
                            <Select v-model="formList.grade" style="width:120px" @on-change="selectClass">
                                <Option
                                v-for="(item,index) in gradeList"
                                :value="item.value"
                                :key="item.value+index"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>班级：</span>
                            <Select v-model="formList.classId" style="width:120px;">
                                <Option
                                v-for="(item,i) in classList"
                                :value="item.value"
                                :key="item.value+i"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>姓名：</span>
                            <Input v-model="formList.studentName" placeholder="学生姓名" style="width: 120px" />
                        </div>
                        <div style="margin:5px 20px;">
                            <span>学籍号：</span>
                            <Input v-model="formList.registerCode" placeholder="填写学籍号" style="width: 120px" />
                        </div>
                        <div style="margin:5px 20px;">
                            <span>模拟考等级：</span>
                            <Select v-model="formList.level" style="width:120px;">
                                <Option
                                v-for="(item,i) in levellist"
                                :value="item.value"
                                :key="item.value+i"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>状态：</span>
                            <Select v-model="formList.status" style="width:120px;">
                                <Option
                                v-for="(item,i) in statusList"
                                :value="item.value"
                                :key="item.value+i"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div  class="right-btns addClass searchBtn" >
                        <Button type="success" @click="querySearch">查询</Button>
                        <Button type="success" @click="driverFiles">导出EXCEL</Button>
                        <Button type="success" @click="back">返回</Button>
                    </div>
                </div>
                <div  v-if="tabarIndex == '1'" class="top-search addClass" @keydown.enter="querySearch">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>年级：</span>
                            <Select v-model="formList.grade" style="width:120px">
                                <Option
                                v-for="(item,index) in gradeList"
                                :value="item.value"
                                :key="item.value+index"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>项目类型：</span>
                            <Select v-model="formList.itemId" style="width:120px">
                                <Option
                                v-for="(item,index) in itemsList"
                                :value="item.itemId"
                                :key="item.itemId+index"
                                >{{ item.itemName }}</Option>
                            </Select>
                        </div>
                        <!-- <div style="margin:5px 20px;">
                            <span>项目名称：</span>
                            <Input
                              style="width:100px;"
                              v-model="formList.examItemName"
                              :maxlength="20"
                            />
                        </div> -->
                    </div>
                    <div  class="right-btns addClass searchBtn" >
                        <Button type="success" @click="querySearch">查询</Button>
                        <Button type="success" @click="driverFiles">导出EXCEL</Button>
                        <Button type="success" @click="back">返回</Button>
                    </div>
                </div>
            </Card>
        </div>
      </template>
    </tabs>
  </div>

</template>

<script>
import util from '@/libs/util.js'
import api from '@/api/testProject.js'
import _ from 'lodash'
import tabs from '@/components/tabs/tabs.vue'
import common from './components/common.js'
export default {
  mixins: [common],
  components: {
    tabs
  },
  data() {
    return {
      myLoading:false,
      loading:false,
      tabarIndex:'0', //默认切换数据
      cutColumns:[],
      formList: {
        total:0,
        pageNo:1,
        pageSize:10,
        examItemName:'',
        grade:'9999',
        classId:'9999',
        level:'9999',
        registerCode:'',
        studentName:'',
        itemId:'9999',
        activityId:'',
        status:9999
      },
      statusList:[
        {name:'全部',value:9999},
        {name:'未完成考核',value:1},
        {name:'已完成考核',value:2},
        {name:'配置项目不足',value:3},
      ],
      gradeList:[],
      gradeOldList:[],
      classList:[{name:'全部班级',value:'9999'}],
      levellist:[
        {name:'全部',value:'9999'},
        {name:'优秀',value:'1'},
        {name:'良好',value:'2'},
        {name:'及格',value:'3'},
        {name:'不及格',value:'4'},
        // {name:'未完成',value:'5'},
      ],
      testList:[
        {label:'ceshi',value:1},
        {label:'ceshi2',value:2},
      ],
      itemsList:[],//项目列表
    }
  },
  watch: {
    tabarIndex(newVal) {
      if(newVal == '0') {
        this.cutColumns = this.studentColumns;
        this.formList.grade = this.gradeList[0].value
        this.queryStudentData()
      }else {
        this.cutColumns = this.projectColumns;
         this.formList.grade = this.gradeList[0].value
        this.queryProjectData();
      }
    }
  },
  created() {
    this.formList.activityId = this.$route.query.activityId;
    this.cutColumns = this.studentColumns;
    this.queryGradeList();
    this.queryItemList();
  },
  methods: {
    transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
    async queryItemList() { //获取项目类型列表
      let res = await api.getExerciseConfigList({activityId:this.$route.query.activityId});
      // let res = await api.getExamItemList();
      if(res.data.code == 10000) {
        this.itemsList = res.data.response;
        this.itemsList.unshift({itemId:'9999',itemName:'全部'})
      }
    },
    selectClass(val) { //筛选班级
      let list = [],gradeList = this.gradeOldList;
      gradeList.forEach(element => {
        if(element.grade == val) {
          let newClass = element.classVOS.map((child) => {
            return {name:`${child.studentClass}班`,value:child.classId}
          });
          list = newClass
        }
      });
      list.unshift({name:'全部班级',value:'9999'});
      this.classList = list;
      if(sessionStorage.getItem("lookMiddleTest-classId") && sessionStorage.getItem("lookMiddleTest-classId") != '0'
      && sessionStorage.getItem("lookMiddleTest-classId") != '9999'){
          this.formList.classId = Number(sessionStorage.getItem("lookMiddleTest-classId"));
          sessionStorage.setItem("lookMiddleTest-classId", '0');
      }else{
          this.formList.classId = this.classList[0].value;
      }
    },
    async queryGradeList() {//查询学校所有年级
      let res = await api.queryActivityGradeClass({activityId:this.formList.activityId});
      if(res.data.code == 10000) {
        let resData = res.data.response,newGrade;
        this.gradeOldList = resData;
        newGrade = resData.map((item)=>{
          return {
            name:`${this.transitionCn(item.grade)}年级`,
            value:item.grade,
          }
        });
        newGrade.unshift({
          name:'全部年级',  
          value:'9999'
        })
        this.gradeList = newGrade;
        this.formList.grade = newGrade[0].value;
        let params = util.hasParams(this.$store, this.$route);
        if(params) this.formList = params;
        this.selectClass(this.formList.grade)
        if(this.tabarIndex == '0') this.queryStudentData();
        else this.queryProjectData();
      }
    },
    async queryStudentData() {//测试数据查看按学生查询
      this.myLoading = true;
      let parmas = {
        ...this.formList,
        level:this.formList.level == '9999'? '':this.formList.level,
        grade:this.formList.grade == '9999'? '':this.formList.grade,
        classId:this.formList.classId == '9999'? '':this.formList.classId,
        itemId:this.formList.itemId == '9999'?'':this.formList.itemId, 
        status:this.formList.status == '9999'? '':this.formList.status,
      }
      let res = await api.getTestDataExamineByStudentList(parmas);
      this.resultsData = [];
      if(res.data.code == 10000) {
        this.resultsData = res.data.response.list || [];
        this.formList.total = res.data.response.totalCount;
        this.myLoading = false;
      }
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars:this.formList});
    },
    async queryProjectData() { //按项目查询
      this.myLoading = true;
      let parmas = {
        activityId:this.formList.activityId,
        grade:this.formList.grade == '9999'?'':this.formList.grade,
        pageSize:this.formList.pageSize,
        pageNo:this.formList.pageNo,
        itemId:this.formList.itemId == '9999'?'':this.formList.itemId,
        examItemName:this.formList.examItemName,
      };
      let res = await api.getTestDataExamineByItem(parmas);
      this.resultsData = [];
      if(res.data.code == 10000) {
        this.resultsData = res.data.response.list || [];
        this.formList.total = res.data.response.totalCount 
        this.myLoading = false;
      }
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars:this.formList});
    },
    querySearch() {// 查询
    this.formList.pageNo = 1;
      if(this.tabarIndex == '1') {
        this.queryProjectData();
      }else {
        this.queryStudentData();
      }
    },
    driverFiles() {//导出文件
      let ProjectUrl = `${this.$axios.defaults.baseURL}/v1/exam/file/upload/getTestDataExamineByItemExport?activityId=${this.formList.activityId}&grade=${this.formList.grade=='9999'?'':this.formList.grade}&itemId=${this.formList.itemId=='9999'?'':this.formList.itemId}&examItemName=${this.formList.examItemName}&token=${sessionStorage.getItem('token')}`;
      let studentUrl = `${this.$axios.defaults.baseURL}/v1/exam/getTestDataExamineByStudentExport?activityId=${this.formList.activityId}&grade=${this.formList.grade=='9999'?'':this.formList.grade}&classId=${this.formList.classId=='9999'?'':this.formList.classId}&studentName=${this.formList.studentName}&registerCode=${this.formList.registerCode}&level=${this.formList.level=='9999'?'':this.formList.level}&token=${sessionStorage.getItem('token')}`
      if(this.tabarIndex == '1'){
         window.open(ProjectUrl)
      }else {
        window.open(studentUrl);
      }
    },
    tabsClick(val) { //切换table
      let oldFormList = this.$options.data().formList;
      oldFormList.activityId = this.$route.query.activityId;
      this.formList = oldFormList;
      this.tabarIndex = val;
      this.formList.grade = this.gradeList[0].value;
      // if(val == '0') {
      //   this.queryStudentData();
      // }else {
      //   this.queryProjectData();
      // }
    },
    searchData(obj) {//搜索回调
      this.formList = obj;
      if(this.tabarIndex == '1') this.queryProjectData();
      else this.queryStudentData();
    },
    back() {
      this.$router.go(-1);
    },
    pageNumChange(val) {

    },
    pageSizechange(val) {

    },
  }
}
</script>

<style lang="less" scoped>
  .searchBtn{
    display:flex;
    align-items:center;
  }
</style>