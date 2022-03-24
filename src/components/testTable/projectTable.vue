<template>
  <div class="projectTable"> 
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">项目详情</h2>
    </div>
    <div class="project-search">
      <Card>
        <div class="top-search addClass" @keydown.enter="querySearch">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>年级：</span>
                    <Select v-model="formList.grade" :disabled='gradeDisabled' style="width:120px" @on-change="selectClass">
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
                    <span>测试状态：</span>
                    <Select v-model="formList.status" style="width:120px;">
                        <Option
                        v-for="(item,i) in statusList"
                        :value="item.value"
                        :key="item.value+i"
                        >{{ item.name }}</Option>
                    </Select>
                </div>
            </div>
            <div  class="right-btns addClass">
                <Button type="success" @click="querySearch">查询</Button>
                <Button type="success" @click="driverMsgFiles">导出Excel</Button>
                <Button type="success" @click="back">返回</Button>
            </div>
        </div>
      </Card>
    </div>
    <div class="table-msg">
      <Card>
        <Row>
            <div style>
              <Table
                border
                max-height="650"
                :columns="dataColumns"
                :data="dataResult"
              ></Table>
            </div>
            <br />
            <div style="float: right;">
                <Page
                :total="formList.total"
                :current="formList.pageNo"
                :page-size="formList.pageSize"
                @on-change="pageNumChange"
                @on-page-size-change="pageSizechange"
                show-total
                show-sizer
                ></Page>
            </div>
          </Row>
        </Card>
    </div>
  </div>
</template>
<script>
import util from '@/libs/util.js'
import api from '@/api/testProject.js'
import _ from 'lodash'
export default {
  props:['disabled'],
  data() {
    return {
      formList:{
        grade:'',
        status:'9999',
        classId:'9999',
        total:0,
        pageNo:1,
        pageSize:10,
        examItemId:this.$route.query.examItemId,
        classTestId:this.$route.query.classTestId,
        activityId:this.$route.query.activityId,
      },
      dataColumns:[
        {
          title: "姓名",
          key: "studentName",
          align: "center",
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render:(h,parmas) => {
            let row = parmas.row;
            return h('div',row.gender=='1'?'男':'女')
          }
        },
        {
          title: "班级",
          key: "className",
          align: "center",
        },
        {
          title: "测试状态",
          key: "status",
          align: "center",
          render:(h,parmas) => {
            let row = parmas.row;
            return h('div',row.status=='1'?'已测试':'未测试')
          }
        },
        {
          title: "考试成绩",
          key: "resultValue",
          align: "center",
          render:(h,parmas) => {
            let row = parmas.row,text='',mine,sconed;
            text = `${row.resultValue?row.resultValue:''}${row.examUnit?row.examUnit:''}`;
            if(row.examUnit == "分.秒") {
              mine = parseInt(Number(row.resultValue)/60);
              sconed = row.resultValue%60;
              text = `${mine}'${sconed}`
            };
            return h('div',text);
          }
        },
        {
          title: "项目得分",
          key: "score",
          align: "center",
        },
      ],
      dataResult:[],
      statusList:[
        {name:'全部',value:'9999'},
        {name:'未测试',value:'2'},
        {name:'已测试',value:'1'},
      ],
      gradeList:[],
      classList:[],
      gradeOldList:[],
    }
  },
  computed:{
    gradeDisabled() {
      return this.disabled
    }
  },
  created() {
    this.queryGradeList();
  },
  methods: {
    transitionCn(val) {//转换中文文字
        return util.NumberToChinese(val);
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
        this.gradeList = newGrade;
        if(!this.disabled) {
            newGrade.unshift({
            name:'全部年级',
            value:'9999'
          })
         this.formList.grade = this.$route.query.grade;
        }else {
          this.formList.grade = this.$route.query.grade;
        }
        this.selectClass(this.formList.grade)
        this.queryDeailsProject();
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
      this.formList.classId = this.classList[0].value;
    },
    async queryDeailsProject() {//查询项目详情
      let parmas = {
        ...this.formList,
        classId:this.formList.classId=='9999'?0:this.formList.classId,
        status:this.formList.status=='9999'?'':this.formList.status,
        grade:this.formList.grade=='9999'?'':this.formList.grade,
      }
      let res = await api.getTestDataExamineByItemDetails(parmas);
      if(res.data.code == 10000) {
        this.dataResult = res.data.response.list;
        this.formList.total = res.data.response.totalCount;
      }
    },
    querySearch() {//搜索
    this.formList.pageNo = 1;
      this.queryDeailsProject();
    },
    back() {
      this.$router.go(-1)
    },
    pageNumChange(val) {
      this.formList.pageNo = val;
      this.queryDeailsProject();
    },
    pageSizechange(val) {
      this.formList.pageSize = val;
      this.formList.pageNo = 1;
      this.queryDeailsProject();
    },
    driverMsgFiles() {
      let ProjectUrl = `${this.$axios.defaults.baseURL}/v1/exam/file/upload/getTestDataExamineByItemDetailsExport?activityId=${this.formList.activityId}&grade=${this.formList.grade=='9999'?0:this.formList.grade}&classTestId=${this.formList.classTestId=="9999"?'':this.formList.classTestId}&token=${sessionStorage.getItem('token')}&classId=${this.formList.classId=='9999'?0:this.formList.classId}&status=${this.formList.status=='9999'?'':this.formList.status}&examItemId=${this.formList.examItemId}`;
      window.open(ProjectUrl);
    }
  }
}
</script>
<style lang="less" scoped>
  .projectTable{
    padding-left: 10px;
  }
  .project-search{
    
  }
  .table-msg{
    margin-top:20px;
  }
</style>