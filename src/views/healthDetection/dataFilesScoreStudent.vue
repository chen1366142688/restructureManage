<style>
   .sportsScoreStudent .ivu-tabs {
        overflow: visible;
        overflow-x: hidden;
        overflow-y: visible;

    }
</style>
<template>
  <div class= "sportsScoreStudent" style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按学生查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style>年级：</span>
                    <Select v-model="grade"  style="width:120px;">
                        <Option
                        v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>
                    <Select v-model="studentClass"  style="width:120px;">
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：</span>
                    <Select v-model="gender"  style="width:120px;">
                        <Option
                        v-for="item in genderList"
                        :value="item.itemId"
                        :key="item.itemId"
                        >{{ item.itemName }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>姓名：</span>
                    <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>
                    <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="queryStudentScore">查询</Button>
                <Button type="success" @click="addStudent">新增学生</Button>
                <Button type="success" @click="createStudentInfo" :disabled="(testReportingStatus=='1'&&testApplyStatus=='0')||(subjectReportingStatus=='1'&&subjectApplyStatus=='0')">按当前系统生成学生数据</Button>
                <Button type="success" @click="toExport" :disabled="(testReportingStatus=='1'&&testApplyStatus=='0')||(subjectReportingStatus=='1'&&subjectApplyStatus=='0')">导入</Button>
                <Button type="success" @click="exportStudentInfo">导出</Button>
                <Button type="success" @click="pageToList">返回</Button>
            </div>
        </div>
      </Card>
      <br/>
      <Card>
          <div>
              <Row>
                  <div style>
                      <Table border  :loading="loading" @on-sort-change='sortChange' :columns="resultColumn" :data="resultDataFirst"></Table>
                  </div>
                  <br>
                  <div  style="float: right;">
                      <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                  </div>
              </Row>
          </div>
      </Card>
    </div>
    <Modal
        title="学期成绩计算中"
        v-model="createSemesterScore"
        :closable="false"
        cancel-text=""
        :mask-closable="false">
        <p><Progress :percent="typeScore" status="active"></Progress></p>
    </Modal>
    <item-modal :modal="modal" @cancel="onCancel" @save="emitWrap">
      <div v-if="remind.disable">
        {{remind.title}}
      </div>
      <Form
        v-if="!remind.disable"
        :model="formList"
      >
        <Form-item
          label="学籍号："
          prop="id"
        >
          <Input v-model="formList.registerCode" placeholder="请输入学生学籍号" style="width:60%;"></Input>
        </Form-item>
        <Form-item
          v-if="failDisable"
          label="年级："
          prop="id"
        >
          <Select v-model="formList.grade" disabled style="width:60%">
              <Option v-for="(item,index) in myGradeList" :value="item.grade" :key="index">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item
          v-if="failDisable"
          label="班级："
          prop="id"
        >
           <Select v-model="formList.classId" style="width:60%">
              <Option v-for="(item,index) in myClassList" :value="item.classId" :key="index">{{ `${item.studentClass}班` }}</Option>
          </Select>
        </Form-item>
      </Form>
    </item-modal>
  </div>
</template>

<script>
import itemModal from '@/components/Modal/index.vue'
import gradeData from '@/libs/grade'//年级
import failApi from '@/api/studentApi.js'
import Util from '@/libs/util.js'
export default {
  components:{
    itemModal
  },
  name: 'schoolList',
  data() {
    return {
      formList:{
        registerCode:'',
        grade:'',
        classId:'',
        studentId:'',
        status:1,
      },
      failDisable:false,//留级是否出现
      remind: {
        disable:true,
        title:''
      },
      modal: {
        visable: false,
        title: '提醒',
        affirmName:'删除',
        onclickName:'pageToList',
        cancelDsiable:true,
      },
      myGradeList:[],//单独需要的年级列表
      myClassList:[],//单独需要的班级
      studentMsg:{},//根据学籍号查出的学生信息
        testApplyStatus: '',
        subjectApplyStatus: '',
        testReportingStatus: '',
        subjectReportingStatus: '',
      exportShow:false,
      exportYearmester:'',
      exportYearsesterList:[],
      repeatStatus:false,
      signatureTf:true,
      modal1:false,
      isReport:false,
      createSemesterScore:false,
      selectTabName:"",
      schoreCreateTime:"",
      loading:false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      updateUrl: '',
      schoolId: '',
      schoolType: '',
      grade: '',
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
        resultColumn: [],
      resultColumnsNotTest: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          minWidth:70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == '1'?"男":"女";
            return h("span", text);
          }
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text+row.studentClass+"班");
          }
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {

            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/100;
            if(row.actionScore < 0  ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore/100;
            if(row.staminaScore < 0 ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "学科评价得分",
          key: "semesterScore",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore/100;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "学科评价等级",
          key: "semesterScore",
          align: "center",
          minWidth:100,

          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore/100;
            let showInfo = "";
            if(text >= 90 ){
              showInfo="优秀";
            }else if(text >= 80 ){
              showInfo="良好";
            }else if(text >= 60 ){
              showInfo="及格";
            }else{
              showInfo="不及格";
            }
            return h("span", showInfo);
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
        resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth:100,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100,
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          minWidth:70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == '1'?"男":"女";
            return h("span", text);
          }
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            return h("span", text+row.studentClass+"班");
          }
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore/100;
            if(row.learnScore < 0 ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {

            const row = params.row;
            let text = row.healthScore/100;
            if(row.healthScore < 0 ){
              //alert(row.healthOver)
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore/100;
            if(row.actionScore < 0  ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore/100;
            if(row.staminaScore < 0 ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore/100;
            if(row.homeworkScore < 0 ){
                text = "0.0";
            }else{
                 text = text.toFixed(1);
            }
            return h("span", text);
          }
        },
        {
          title: "学科评价得分",
          key: "semesterScore",
          align: "center",
          sortable:'true',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore/100;
            text = text.toFixed(1);
            return h("span", text);
          }
        },
        {
          title: "学科评价等级",
          key: "semesterScore",
          align: "center",
          minWidth:100,

          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore/100;
            let showInfo = "";
            if(text >= 90 ){
              showInfo="优秀";
            }else if(text >= 80 ){
              showInfo="良好";
            }else if(text >= 60 ){
              showInfo="及格";
            }else{
              showInfo="不及格";
            }
            return h("span", showInfo);
          }
        },
        {
          title: "体质测试得分",
          key: "testScore",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "0.0";
              }else{
                  text = text.toFixed(1);
              }
            }
            return h("span", text);
          }
        },
        {
          title: "体质测试等级",
          key: "athleticContestScore",
          align: "center",
          minWidth:100,

          render: (h, params) => {
            const row = params.row;
            let text = row.testScore/100;
            if(this.secondYearSemester){
                text = text.toFixed(1);
            }else{
              if(row.testScore <= 0 ){
                text = "-1";
              }else{
                  text = text.toFixed(1);
              }
            }
            let showInfo = "";
            if(text >= 90 ){
              showInfo="优秀";
            }else if(text >= 80 ){
              showInfo="良好";
            }else if(text >= 60 ){
              showInfo="及格";
            }else if(text >= 0){
              showInfo="不及格";
            }else{
              showInfo="不及格";
            }
            return h("span", showInfo);
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
      resultDataFirst: [],
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
      primaryList: [
        {
          grade: '',
          label: '全部'
        },{
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
          grade: "",
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
      collegeList: [
        {
          grade: 13,
          label: '大一'
        },
        {
          grade: 14,
          label: '大二'
        },
        {
          grade: 15,
          label: '大三'
        },
        {
          grade: 16,
          label: '大四'
        }
      ],
      schoolGradeList: [],
      studentClass: '',
      classList: [
        {
          value: "",
          label: '全部'
        },
        {
          value: 1,
          label: '1班'
        },
        {
          value: 2,
          label: '2班'
        },
        {
          value: 3,
          label: '3班'
        },
        {
          value: 4,
          label: '4班'
        },
        {
          value: 5,
          label: '5班'
        },
        {
          value: 6,
          label: '6班'
        },
        {
          value: 7,
          label: '7班'
        },
        {
          value: 8,
          label: '8班'
        },
        {
          value: 9,
          label: '9班'
        },
        {
          value: 10,
          label: '10班'
        },
        {
          value: 11,
          label: '11班'
        },
        {
          value: 12,
          label: '12班'
        },
        {
          value: 13,
          label: '13班'
        },
        {
          value: 14,
          label: '14班'
        },
        {
          value: 15,
          label: '15班'
        },
        {
          value: 16,
          label: '16班'
        },
        {
          value: 17,
          label: '17班'
        },
        {
          value: 18,
          label: '18班'
        },
        {
          value: 19,
          label: '19班'
        },
        {
          value: 20,
          label: '20班'
        },
        {
          value: 21,
          label: '21班'
        },
        {
          value: 22,
          label: '22班'
        },
        {
            value: 23,
            label: '23班'
        },
        {
            value: 24,
            label: '24班'
        },
        {
            value: 25,
            label: '25班'
        },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
      ],
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
      yearSemester: '',
      reportingStatus: '',
        semesterName: ''
    }
  },
  methods: {
    onCancel() {//取消弹窗清除所有数据
      this.modal.visable = false;
      let inital = this.$options.data();
      this.formList = inital.formList;
      this.modal = inital.modal;
      this.remind = inital.remind;
    },
    async queryClassList(gradeId,classId) {//查询班级列表
      let params = {
        grade:gradeId,
        schoolId:sessionStorage.getItem('schoolId'),
      };
      let res = await api.queryStudentClassByGrade(params);
      if(res.data.code == 10000) {
        this.myClassList = res.data.response;
        this.seleteActiveClass(this.myClassList,classId);

      }
    },
    seleteActiveClass(arr,classId) {//筛选留级是否有相同班级
      arr.forEach(element => {
        if(element.studentClass == classId) this.formList.classId = element.classId
      });
      if(!this.formList.classId) this.formList.classId = arr[0].classId;
    },
    deleteClick(data) {//删除学生方法
    },
    emitWrap(eventList) {//保存触发的方法
      let clilckList = {addMethod:'addMethod',movePage:'movePage',failMthod:'failMthod',onCancel:'onCancel',saveFail:'saveFail'};
      const d = this[clilckList[eventList.name]];
      d&&d(eventList.data);
    },
    async addMethod() {//弹窗新增回调函数
    let yearSemester = this.yearSemester
      if(!this.formList.registerCode) {
        this.$Message.error('请输入学生学籍号');
        return false;
      };
      let res =  await failApi.queryStudentInsertInfo({registerCode:this.formList.registerCode,yearSemester});
      if(res.data.code == 10000) {
        let data = res.data.response,studentCode = res.data.response.statusCode;
        this.studentMsg = data;
        if(studentCode == '3') this.movePage();
        if(studentCode == '0') {
          this.remind = {
            disable:true,
            title:'该学生已经存在，请验证后重新添加'
          };
          this.modal.cancelDsiable = false;
          this.modal.affirmName = '知道了'
          this.modal.onclickName = 'onCancel'
        }
        if(studentCode == '1' ) {
          this.modal.title="提醒"
          this.modal.cancelDsiable = true;
          this.remind.disable = true;
          this.remind.title = `系统检测到该学生已经存在，且按时间推算，当前学期年级为${Util.NumberToChinese(Number(this.studentMsg.grade))}年级，是否继续添加该学生？`
          this.modal.affirmName = '继续添加'
          this.modal.onclickName = 'movePage'
        }
        if(studentCode == '2') {
          this.remind = {
            disable:true,
            title:'该学生已毕业。历史数据中不允许添加已毕业的学生'
          };
          this.modal.cancelDsiable = false;
          this.modal.affirmName = '知道了'
          this.modal.onclickName = 'onCancel'
        }
      }
    },
    failMthod() {//留级回调函数
      this.remind = {
        disable:false,
        title:'该学生已经毕业，是否留级？'
      };
      this.failDisable = true;
      this.formList.grade = data.grade - 1
      this.queryClassList(this.formList.grade,this.studentMsg.studentClass);
      this.modal.onclickName = 'saveFail';
      this.modal.title = '留级设置'
    },
    async saveFail() {//保存留级操作
      let res = await api.repeaterStudent(this.formList);
      if(res.data.code == 10000) this.$router.go(-1);
      else this.$Message.error(res.data.msg);
    },
    movePage() { //跳转到新增页面
      var vm = this
      sessionStorage.removeItem('studentInfoManage-studentInfoDetail-studentId')
      this.$router.push({
        name: 'studentInfoDetail',
        query:{
          registerCode:this.formList.registerCode,
          yearSemester:this.yearSemester,
          whetherData:this.studentMsg.studentId?true:false,
          editStatus:'2',
        }
      })
    },
    addStudent() {//新增学生
      this.modal.visable = true;
      this.modal.title="新增学生"
      this.modal.affirmName = '新增'
      this.remind.disable = false;
      this.modal.onclickName = 'addMethod'
    },
      exportStudentInfo(){
          var vm = this;

        if(typeof(vm.grade) == "undefined"){
            vm.grade="";
        }
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

          let url =this.$axios.defaults.baseURL +
              '/v1/datafiles/exportDataFilesStudentScoreList?schoolId='+
              this.schoolId +
              '&grade=' +
              (this.grade==0?"":this.grade)+
              '&yearSemester=' +
              this.yearSemester +
              '&studentName=' +
              this.studentName +
              '&registerCode=' +
              this.registerCode +
              '&gender=' +
              this.gender +
              '&studentClass=' +
              (this.studentClass=="0"?"":this.studentClass) +
              '&token=' +sessionStorage.getItem("token")
          window.open(url);
      },
      createStudentInfo(){
          let vm =  this;
          this.$axios.get("/v1/datafiles/createStudentInfo?schoolId="+this.schoolId+"&yearSemester="+this.yearSemester).then(res => {
              if (res.data.code == 10000) {
                  // vm.$Message.info("正在生成，点击导入查看进度");
                  this.$router.push({ name: "exportDataFilesStudnetTaskManage" });
              } else {
                  if (res.data.code > 39999) {
                      vm.$Message.info(res.data.msg);
                  }
              }
          });
      },
      toExport(){
          this.$router.push({ name: "exportDataFilesStudnetTaskManage" });
      },
      pageNumChange(value) {
          //页码改变方法处理
          if (this.pageNum != value) {
              this.pageNum = value;
              this.queryYearSemesterList();
              this.queryYearSemesterListCount();          }
      },
      pageSizechange(value) {
          //页面大小改变方法处理
          if (this.pageSize != value) {
              this.pageNum = 1;
              this.pageSize = value;
              this.queryYearSemesterList();
              this.queryYearSemesterListCount();          }
      },
      pageToList() {
          this.$router.go(-1)
      },
    sortChange(column){
      console.log(column)
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

       this.queryStudentScore();
    },
    sortChange2(column){
      console.log(column)
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

        this.queryStudentScore();
    },
    sortChange3(column){
      console.log(column)
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
        this.queryStudentScore();
    },
    queryYearSemesterList() {
      var vm = this;
      vm.loading = true;
        if(this.grade == 0){
            this.grade="";
        }
      let data = {
          grade:vm.grade,
          studentClass:vm.studentClass,
          studentName:vm.studentName,
          registerCode:vm.registerCode,
          gender:vm.gender,
          pageNo: vm.pageNum,
          pageSize: vm.pageSize,
          orderField: vm.orderField,
          orderSort: vm.orderSort,
          yearSemester: vm.yearSemester
      };

      this.$axios.post("/v1/datafiles/queryDataFilesStudentScoreList",data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
              vm.resultDataFirst = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      })
    },
    queryYearSemesterListCount() {
      var vm = this
      if(this.grade == 0){
        this.grade="";
      }
      let data = {
          grade:vm.grade,
          studentClass:vm.studentClass,
          studentName:vm.studentName,
          registerCode:vm.registerCode,
          gender:vm.gender,
         pageNo: vm.pageNum,
         pageSize: vm.pageSize,
         yearSemester: vm.yearSemester
      };

      this.$axios.post('/v1/datafiles/queryDataFilesStudentScoreListCount',data).then(res => {
        if (res.data.code == 10000) {
            this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(row){
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-studentId',row.studentId)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-studentName',row.studentName)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-registerCode',row.registerCode)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-gender',row.gender)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-grade',row.grade)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-startSchool',row.startSchool)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-studentClass',row.studentClass)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-yearSemester',this.yearSemester)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-reportingStatus',this.reportingStatus)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-semesterName',this.semesterName)
        sessionStorage.setItem('dataFiles-sportsScoreStudentDetail-classId',row.classId)
        this.$router.push({name: 'dataFilesScoreStudentDetail',query:{studentId: row.studentId}})
    },
    dataReport(){
      var vm=this;
      vm.isReport=true;
      vm.batchScore();
    },
    queryStudentScore(){
      let vm = this;
      sessionStorage.setItem('dataFiles-sportsScoreStudent-grade',vm.grade)
      sessionStorage.setItem('dataFiles-sportsScoreStudent-studentClass',vm.studentClass)
      sessionStorage.setItem('dataFiles-sportsScoreStudent-registerCode',vm.registerCode)
      sessionStorage.setItem('dataFiles-sportsScoreStudent-gender',vm.gender)
      sessionStorage.setItem('dataFiles-sportsScoreStudent-studentName',vm.studentName)
      sessionStorage.setItem('dataFiles-sportsScoreStudent-pageNum',vm.pageNum)
      sessionStorage.setItem('dataFiles-sportsScoreStudent-pageSize',vm.pageSize)
        vm.pageNum = 1;
      this.queryYearSemesterList();
      this.queryYearSemesterListCount();
    },
    exportStudentScore(){
      var vm=this;
      if(typeof(vm.grade) == "undefined"){
          vm.grade="";
      }
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
        '/v1/semesterScore/exportStudentScorePdf?grade='+vm.grade+'&studentClass='+vm.studentClass+
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
      // console.log(vm.selectYear)
       if(typeof(vm.grade) == "undefined"){
                    vm.grade="";
                }
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
        '/v1/semesterScore/exportStudentListV2?grade='+vm.grade+'&studentClass='+vm.studentClass+"&selectYear="+vm.exportYearmester+
        '&gender='+vm.gender+'&studentName='+vm.studentName+'&registerCode='+vm.registerCode+'&schoolDistrict='+vm.schoolDistrict+
        '&token=' +
        sessionStorage.getItem('token')
        console.log(url)
        window.open(url)
        vm.exportShow=false;
    }

  },
  watch: {
  },
  created() {
  },
  mounted() {
  //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    if(vm.orderType == ""){
       vm.orderType = "1";
    }
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;
    if (schoolType) {
      if ('0' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList)
      }
      if ('2' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
      }
    } else {
      vm.schoolGradeList = vm.schoolGradeList
        .concat(vm.primaryList)
        .concat(vm.middleList)
        .concat(vm.highList)
        .concat(vm.collegeList)
    }
    let  grade = sessionStorage.getItem('dataFiles-sportsScoreStudent-grade');
    let  studentClass = sessionStorage.getItem('dataFiles-sportsScoreStudent-studentClass');
    let  registerCode = sessionStorage.getItem('dataFiles-sportsScoreStudent-registerCode');
    let  studentName = sessionStorage.getItem('dataFiles-sportsScoreStudent-studentName');
    let  pageNum = sessionStorage.getItem('dataFiles-sportsScoreStudent-pageNum');
    let  pageSize = sessionStorage.getItem('dataFiles-sportsScoreStudent-pageSize');
    let  gender = sessionStorage.getItem('dataFiles-sportsScoreStudent-gender');

    vm.yearSemester = Number(sessionStorage.getItem('dataFiles-sportsScoreStudent-yearSemester'));
    vm.reportingStatus = sessionStorage.getItem('dataFiles-sportsScoreStudent-reportingStatus');
    vm.semesterName = sessionStorage.getItem("dataFiles-sportsScoreStudent-semesterName");


      vm.testApplyStatus =  sessionStorage.getItem("dataFilsManage-testApplyStatus");
      vm.subjectApplyStatus = sessionStorage.getItem("dataFilsManage-subjectApplyStatus");
      vm.testReportingStatus =  sessionStorage.getItem("dataFilsManage-testReportingStatus");
      vm.subjectReportingStatus =  sessionStorage.getItem("dataFilsManage-subjectReportingStatus");

      if(grade != null && grade != "" && grade != 'undefined' && grade > 0){
        vm.grade = Number(grade);
    }
    if(studentClass != null && studentClass != "" && studentClass != undefined && studentClass > 0){
        vm.studentClass = Number(studentClass);
    }
    if(registerCode != null && registerCode != "" && registerCode != undefined ){
        vm.registerCode = registerCode;
    }
    if(studentName != null && studentName != "" && studentName != undefined ){
        vm.studentName = studentName;
    }
    if(gender != null && gender != "" && gender != 'undefined' ){
        vm.gender = gender;
    }
    if(pageNum != null && pageNum != "" && pageNum != undefined && pageNum > 0){
        vm.pageNum = Number(pageNum);
    }
    if(pageSize != null && pageSize != "" && pageSize != undefined && pageSize > 0){
        vm.pageSize = Number(pageSize);
    }
    if(vm.yearSemester%2 == 0){
        vm.resultColumn=vm.resultColumns;
    }else {
        vm.resultColumn=vm.resultColumnsNotTest;
    }
      vm.queryStudentScore();
  }
}
</script>
