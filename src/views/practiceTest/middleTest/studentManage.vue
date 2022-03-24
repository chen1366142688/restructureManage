<template>
  <div class="project-student">
      <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">项目学生管理</h2>
    </div>
    <div class="project-search">
      <Card>
        <div class="top-search addClass" @keydown.enter="querySearch">
            <div class="left-input">
                <!-- <div style="margin:5px 20px;">
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
                <div style="margin:5px 20px;">
                    <span>项目名称：</span>
                    <Input
                        style="width:100px;"
                        v-model="formList.classTestName"
                        :maxlength="20"
                      />
                </div> -->
            </div>
            <div  class="right-btns addClass">
                <!-- <Button type="success" @click="querySearch">查询</Button> -->
                <Button type="success" @click="exportStudent">导入选考项目学生</Button>
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
  data() {
    return {
      formList:{
        activityId:'',
        total:0,
        pageNo:1,
        pageSize:10,
        classTestName:'',
        itemId:9999,
        grade:'9999'
      },
      gradeList:[],
      testList: [
        {label:'test1',value:1}
      ],
      dataColumns:[
        // {
        //   title: "年级",
        //   key: "grade",
        //   align: "center",
        //   render:(h,parmas) => {
        //     let row = parmas.row,text;
        //     if(row.grade) {
        //       text = `${this.transitionCn(row.grade)}年级`
        //     }else text = '';
        //     return h('div',text)
        //   }
        // },
        {
          title: "项目名称",
          key: "classTestName",
          align: "center",
        },
        {
          title: "项目编号",
          key: "orderIndex",
          align: "center",
        },
        {
          title: "项目类型",
          key: "itemName",
          align: "center",
        },
        {
          title: "考试类别",
          key: "testType",
          align: "center",
          render:(h,parmas) => {
            let row = parmas.row;
            return h('div',row.testType == '1'?'必考':'自主选考')
          }
        },
        {
          title: "考核学生总数",
          key: "studentNum",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
            width: 400,
          render: (h, params) => {
             const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props:{
                    disabled:row.testType == '1'?true:false,
                    type:'primary',
                  },
                  on: {
                    click: () => {
                      this.studentManage(params.row.grade,params.row.classTestId,params.row.classTestName);
                    }
                  }
                },
                "学生管理"
              ),
            ]);
          }
        }
      ],
      itemsList:[],//项目列表
      dataResult:[{name:1,id:2}]
    }
  },
  created() {
    let params = util.hasParams(this.$store, this.$route);
    if(params) this.formList = params;
    this.formList.activityId = this.$route.query.activityId;
    this.queryGradeList();
    this.queryProjectStudent();
    this.queryItemList();
  },
  methods: {
    transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
    exportStudent() {
      const obj = {
        title: "选考项目学生",
        import: {
          importUrl: "/v1/examItemConfig/file/upload/studentDataImport", //导入url地址
          params: {
            //请求参数设置
            schoolId: sessionStorage.getItem("schoolId"),
            schoolYear: sessionStorage.getItem("schoolYear"),
            yearSemester: sessionStorage.getItem("yearSemester"),
            teacherId: sessionStorage.getItem("teacherId"),
            activityId:this.formList.activityId,
            token: sessionStorage.getItem("token"),
          },
        },
        exportTemplate: {
          exportTemplateUrl: "/v1/examItemConfig/getImportTemplate", //导出模板url地址
          params: {
            //请求参数设置
            token: sessionStorage.getItem("token"),
          },
        },
        exportError: {
          exportErrorUrl: "/v1/examItemConfig/exportErrorChooseExport", //导出错误数据url地址
          params: {
            //请求参数设置
            token: sessionStorage.getItem("token"),
          },
        },
        queryTaskNum: {
          queryTaskNumUrl: "/v1/examItemConfig/countTaskListNum", //查询导出列表数据条数的地址
          params: {
            //请求参数设置
          },
        },
        getImportList: {
          getImportListUrl: "/v1/examItemConfig/getTaskList", //获取导入列表
          params: {
            //请求参数设置
            activityId:this.formList.activityId,
          },
        },
      };
      this.$router.push({
        name: "exportDataKM",
        params: {
          obj: obj,
        },
      });
    },

    async queryItemList() { //获取项目类型列表
      let res = await api.getExerciseConfigList({activityId:this.$route.query.activityId});
      // let res = await api.getExamItemList();
      if(res.data.code == 10000) {
        this.itemsList = res.data.response;
        this.itemsList.unshift({itemId:9999,itemName:'全部'})
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
        this.queryProjectStudent();
      }
    },
    async queryProjectStudent() {//查询项目学生管理数据
      let parmas = {
        ...this.formList,
        grade:this.formList.grade == '9999' ? '' : this.formList.grade,
        itemId:this.formList.itemId == 9999 ? '' : this.formList.itemId,
      };
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: this.formList});
      let res = await api.getExamItemActivityDetail(parmas);
      if(res.data.code == 10000) {
        this.formList.total = res.data.response.total;
        this.dataResult = res.data.response.result;
      }
    },
    studentManage(grade,id,name){//跳转学生管理详情
      this.$router.push({name:'middleStudentitemmanage',query:{grade:grade,classTestId:id,activityId:this.$route.query.activityId,classTestName:name}});
    },
    back() {
      this.$router.go(-1);
    },
    querySearch() {//查询
      this.formList.pageNo = 1;
      this.queryProjectStudent();
    },
    pageNumChange(val) {
      this.formList.pageNo = val;
      this.queryProjectStudent();
    },
    pageSizechange(val) {
      this.formList.pageSize = val;
      this.formList.pageNo = 1;
      this.queryProjectStudent();
    }
  }
}
</script>

<style lang="less" scoped>
  .table-msg{
    padding-top:20px;
  }
</style>