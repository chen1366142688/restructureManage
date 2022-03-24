<template>
  <div>
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{projectName}}-学生管理</h2>
    </div>
    <div class="project-search">
      <Card>
        <div class="top-search addClass" @keydown.enter="querySearch">
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
                    <Select v-model="formList.classId" style="width:120px">
                        <Option
                        v-for="(item,index) in classList"
                        :value="item.value"
                        :key="item.value+index"
                        >{{ item.name }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>测试状态：</span>
                    <Select v-model="formList.examStatus" style="width:120px;">
                        <Option
                        v-for="(item,i) in testList"
                        :value="item.value"
                        :key="item.value+i"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div  class="right-btns addClass">
                <Button type="success" @click="querySearch">查询</Button>
                <Button type="success" @click="addStuedent">添加学生</Button>
                <Button type="success" @click="driverFiles">导出EXCEL</Button>
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
                :current="formList.pageNum"
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
    <Modal
      v-model="remindDisable"
      title="提醒"
      @on-ok="succse"
      @on-cancel="testCancel($event)"
      ok-text="移除"
      cancel-text="取消"
    >
      <p style="color: #515a6e; font-size: 16px">该学生已考核，移除学生后，其成绩对应删除，是否确认移除该学生？</p>
    </Modal>
    <add-modal
      v-if="addChildDisable"
      :addChildDisable.sync="addChildDisable"
      :middleItemId="1"
      :schoolGradeList="[]"
      gradeId="9999"
      :classId="formList.classId"
      :activityId="formList.activityId"
      :disabled="false"
      @updataData= "queryStudentMsg"
    ></add-modal>
  </div>
</template>

<script>
import util from '@/libs/util.js'
import api from '@/api/testProject.js'
import _ from 'lodash'
import addModal from '@/components/addChildren/index.vue'
export default {
  components:{
    addModal
  },
  // props:['projectName'],
  data() {
    return {
      projectName:this.$route.query.classTestName,//项目名称
      remindDisable:false,//提醒弹窗
      addChildDisable:false,
      formList:{
        total:0,
        pageNo:1,
        pageSize:10,
        examStatus:'2',
        classId:'9999',
        grade:'9999',
        classTestId:this.$route.query.classTestId,
        activityId:this.$route.query.activityId,
      },
      studentId:'',//需要移除的学生id
      classList:[{name:'全部班级',value:'9999'}],
      gradeOldList:[],
      gradeList:[],
      testList:[
        {label:'未测试',value:'0'},
        {label:'已测试',value:'1'},
        {label:'全部',value:'2'},
      ],
      itemsList:[],//项目列表
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
          render: (h,params) => {
                const {row} = params;
                return h('div', row.gender == '1'?'男':'女')
              }
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          render:(h,parmas) => {
            let row = parmas.row;
            return h('div',`${this.transitionCn(row.grade)}年级${row.studentClass}班`)
          }
        },
        {
          title: "测试状态",
          key: "examStatus",
          align: "center",
          render: (h,parmas) => {
            let row = parmas.row;
            return h('div',row.examStatus == '0' ?'未测试':'已测试')
          }
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
                    type:'primary',
                  },
                  on: {
                    click: () => {
                      this.exportData(params.row);
                    }
                  }
                },
                "移除"
              ),
            ]);
          }
        }
      ],
      dataResult:[{name:'1',id:1}],
    }
  },
  created() {
    this.queryGradeList();
    this.projectName = this.$route.query.classTestName;
  },
  methods: {
    transitionCn(val) {//转换中文文字
      return util.NumberToChinese(val);
    },
    driverFiles() {//导出学生
      let ProjectUrl = `${this.$axios.defaults.baseURL}/v1/examItemConfig/exportItemStudent?activityId=${this.formList.activityId}&grade=${this.formList.grade=='9999'?'':this.formList.grade}&classId=${this.formList.classId=='9999'?'':this.formList.classId}&classTestId=${this.formList.classTestId=='9999'?'':this.formList.classTestId}&token=${sessionStorage.getItem('token')}&examStatus=${this.formList.examStatus}`;
      window.open(ProjectUrl);
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
        this.formList.grade = this.gradeList[0].value;
        this.selectClass(this.formList.grade);
        this.queryStudentMsg();
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
    async queryStudentMsg() { //查询学生项目管理详情
      let parmas = {
        ...this.formList,
        grade:this.formList.grade == '9999'?'':this.formList.grade,
        classId:this.formList.classId == '9999'?'':Number(this.formList.classId),
        activityId:Number(this.formList.activityId)
      },number = this.formList.pageNo;
      let res = await api.getExamItemActivityStudent(parmas);
      if(res.data.code == 10000) {
        let data = res.data.response.result;
        if(data.length) this.formList.pageNo = number;
        else this.formList.pageNo = number - 1;
        if(this.formList.pageNo<=0) this.formList.pageNo = 1;
        this.formList.total = res.data.response.total;
        this.dataResult = res.data.response.result;
      }
    },
    querySearch() {
      this.formList.pageNo =1;
      this.queryStudentMsg()
    },
    pageNumChange(val) {
      this.formList.pageNo = val;
      this.queryStudentMsg();
    },
    pageSizechange(val) {
      this.formList.pageSize = val;
      this.formList.pageNo = 1;
      this.queryStudentMsg();
    },
    back() {
      this.$router.go(-1)
    },
    async exportData(row) {//移除学生
      this.studentId = row.studentId;
      let parmas = {
        activityId:Number(this.formList.activityId),
        classTestId:Number(this.formList.classTestId),
        studentId:row.studentId,
        status:'0'
      };
      let res = await api.deleteActivityStudent(parmas);
      let currentPageTotal = String((this.formList.total / this.formList.pageSize) * this.formList.pageSize)
      if(currentPageTotal.split('')[1] == '1'){
        this.formList.pageNo -= 1;
      }
      if(res.data.response.code == '1') {
        this.$Message.info('移除成功');
        this.queryStudentMsg();
      }else {
        this.remindDisable = true;
      }
    },
    testCancel() { //取消提醒弹窗
      this.remindDisable = false;
    },
    async succse() { //确认移除回调
      let parmas = {
        activityId:Number(this.formList.activityId),
        classTestId:Number(this.formList.classTestId),
        studentId:this.studentId,
        status:'1',
      };
      let res = await api.deleteActivityStudent(parmas);
      if(res.data.code == 10000) {
        this.$Message.info('移除成功');
        this.queryStudentMsg();
      }
      else this.$Message.error(res.data.msg )
    },
    addStuedent() {//添加学生
      this.addChildDisable = true;
    }
  }
}
</script>

<style lang="less" scoped>
  .table-msg{
    padding-top:20px;
  }
</style>