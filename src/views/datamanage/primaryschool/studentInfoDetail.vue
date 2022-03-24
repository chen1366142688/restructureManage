
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生详情</h2>
    </div>
    <div>
      <Card :dis-hover="true" style="font-size:13px">
        <Row>
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">姓名：</span>
            <Input v-model="studentName" placeholder="学生姓名" style="width: 50%;" />
          </Col>
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">学籍号：</span>
            <Input v-model="registerCode" :disabled="whetherAdd" placeholder="学籍号" style="width: 50%;" />
          </Col>
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">性别：</span>
            <Select v-model="gender" style="width:50%;" :disabled="modification || possessData.gender!=''">
              <Option
                v-for="(item, index) in genderList"
                :value="item.type"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </Col>
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">民族代码：</span>
            <Input style="width: 50%;" v-model="nationCode" placeholder="民族代码"></Input>
          </Col>
        </Row>
        <Row style="margin-top:20px;">
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">年级：</span>
            <Select v-model="grade" style="width:50%;" :disabled="modification || possessData.grade!='' ">
              <Option
                v-for="(item, index) in gradeList"
                :value="item.grade"
                :key="index"
              >{{ item.gradeName }}</Option>
            </Select>
          </Col>
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">班级：</span>
            <Select v-model="classId" style="width:50%;">
              <Option
                v-for="(item,index) in classList"
                :value="item.studentClass"
                :key="index"
              >{{ item.className }}</Option>
            </Select>
          </Col>
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">生日：</span>
            <DatePicker
              v-model="birthdayview"
              @on-change="examStartTimeChange"
              format="yyyy-MM-dd"
              type="date"
              placeholder="选择日期"
              style="width: 50%"
            ></DatePicker>
          </Col>
          <Col span="6">
            <span style="display:inline-block;width:76px;text-align:right">状态：</span>
            <Select v-model="transferStatus" style="width:50%;" :disabled="modification || possessData.transferStatus!= ''">
              <Option
                v-for="(item,index) in transferList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </Col>
        </Row>
        <Row style="margin-top:20px;">
          <span style="display:inline-block;width:76px;text-align:right">家庭地址：</span>
          <Input style="width: 70%;" v-model="addrDetail" placeholder="家庭地址"></Input>
        </Row>
      </Card>
      <div style="margin-top:30px;text-align:center">
        <Button @click="pageToList" style="margin-right:50px;" type="success">返回</Button>
        <Button v-if="modification" @click="deleteStudent" style="margin-right:50px;" type="success">删除</Button>
        <!-- 仅管理员显示 -->
        <Button @click="fail" v-if="modification&&(grade!=1&&grade!=7&&schoolType!=4&&schoolType!=5 && isAdmin == 1)" style="margin-right:50px;" type="success">留级</Button>
        <Button @click="submit" type="success">保存</Button>
      </div>
    </div>
    <item-modal :modal="modal" @cancel="onCancel" @save="emitWrap">
      <div v-if="remind.disable">
        {{remind.title}}
      </div>
      <Form
        v-else
        :model="formList"
      >
        <Form-item
          label="年级："
          prop="id"
        >
          <Select v-model="formList.grade" disabled style="width:60%">
              <Option v-for="(item,index) in myGradeList" :value="item.grade" :key="index">{{ item.label }}</Option>
          </Select>
        </Form-item>
        <Form-item
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
import gradeData from '@/libs/grade'//年级
import api from '@/api/studentApi.js'
import itemModal from '@/components/Modal/index.vue'
export default {
  components:{
    itemModal,
  },
  data() {
    return {
      isAdmin: sessionStorage.getItem('isAdmin'), // :是否是系统管理员  1是 0否
      possessData: {//是否已查询到的数据
        grade:'',
        transferStatus:'',
        gender:'',
      },
      formList:{
        grade:'',
        classId:'',
      },
      remind: {
        disable:true,
        title:'删除学生后，该学生的所有数据将清空，且无法恢复，故删除学生前，请自行保存学生数据，以免误删后导致数据丢失。若学生转学请停用该学生。'
      },
      modal: {
        visable: false,
        title: '提醒',
        affirmName:'删除',
        onclickName:'pageToList',
        cancelDsiable:true,
      },
      disabled: false,
      schoolId: "",
      studentId: "",
      studentName: "",
      registerCode: "",
      gender: "",
      schoolName: "",
      collegeName: "",
      majorName: "",
      gradeName: "",
      studentClass: "",
      nationCode: "",
      birthday: "",
      birthdayview: "",
      addrDetail: "",
      transferStatus: "0",
      transferList: [
        {
          name: "正常",
          value: "0"
        },
        // {
        //   name:"已转学",
        //   value:"1"
        // },
        // {
        //   name:"非学籍",
        //   value:"2"
        // },
        {
          name: "已停用",
          value: "3"
        },
        {
          name: "留级",
          value: "4"
        },
        {
          name: "停用",
          value: "5"
        },
      ],
      auditStatus: "",
      genderList: [
        {
          type: "1",
          name: "男"
        },
        {
          type: "2",
          name: "女"
        }
      ],
      grade: "",
      gradeList: [],
      myGradeList:[],//单独需要的年级列表
      myClassList:[],//单独需要的班级
      classList: [],
      classId: ""
    };
  },
  watch: {
    grade: function() {
      var vm = this;
      if (vm.grade) {
        vm.classList = [];
         if(this.$route.query.editStatus == '2') vm.getNewClassList(vm.schoolId, vm.grade,vm.$route.query.yearSemester);
          else vm.getClassList(vm.schoolId, vm.grade);
      }
    }
  }, //以V-model绑定数据时使用的数据变化监测
  computed:{
    modification() {
      return this.$route.query.modification || false
    },
    schoolType() {
      return sessionStorage.getItem('schoolType');
    },
    whetherAdd() {
      if(this.$route.query.registerCode) {
        this.registerCode = this.$route.query.registerCode; 
        return true
      }
      else return false;
    }
  },
  created: function() {},
  methods: {
    onCancel() {
      this.modal.visable = false;
      let inital = this.$options.data();
      this.formList = inital.formList;
      this.modal = inital.modal;
      this.remind = inital.remind;
    },
    async deleteClick(data) {//删除学生方法
      let res = await api.deleteStudentAndSave({studentId:this.studentId});
      console.log(res,'删除学生')
      if(res.data.response.code == '1') {
        this.$Message.info('删除成功');
        this.$router.go(-1);
      };
    },
    async queryClassList(gradeId) {//查询班级列表
      let params = {
        grade:gradeId,
        schoolId:sessionStorage.getItem('schoolId'),
      };
      let res = await api.queryStudentClassByGrade(params);
      if(res.data.code == 10000) {
        this.myClassList = res.data.response;
        this.seleteActiveClass(this.myClassList);

      }
    },
    seleteActiveClass(arr) {//筛选留级是否有相同班级
      arr.forEach(element => {
        if(element.studentClass == this.studentClass) this.formList.classId = element.classId
      });
      if(!this.formList.classId) this.formList.classId = arr[0].classId;
    },
    emitWrap(eventList) {//保存触发的方法
      let clilckList = {deleteClick:'deleteClick',failClick:'failClick',failMthod:'failMthod'};
      const d = this[clilckList[eventList.name]];
      d&&d(eventList.data);
    },
    deleteStudent() {//删除学生
      this.modal.visable= true;
      this.modal.onclickName = 'deleteClick'
    },
    failClick() {//留级回调函数
      this.remind.disable = false;
      this.formList.grade =  this.grade - 1;
      this.queryClassList(this.formList.grade);
      this.modal.title = '留级设置'
      this.modal.affirmName = '保存'
      this.modal.onclickName = 'failMthod'
    },
    async failMthod() {//留级方法回调   
      let parmas = {
        studentId:this.studentId,
        classId:this.formList.classId,
        status:0
      };
      let res = await api.repeaterStudent(parmas);
      if(res.data.code == 10000) this.$router.go(-1);
      else this.$Message.error(res.data.msg);
    },
    fail() {//留级
      this.modal.visable= true;
      this.modal.affirmName = '留级'
      this.modal.title = '提醒'
      this.modal.onclickName = 'failClick';
      this.remind.title="学生留级后，系统中其当前学年数据和上学年数据都将清空，且无法恢复，是否确认留级？";     
    },
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    examStartTimeChange(date, type) {
      var vm = this;
      vm.birthday = date;
    },
    async queryStudentMsg() { //通过学籍号查询学生数据

      let res = await api.queryStudentInsertInfo({
        registerCode:this.$route.query.registerCode,
        yearSemester:this.$route.query.yearSemester,
      }),that = this;
      let data = res.data.response;
          that.possessData = data;
          that.studentId = data.studentId ? data.studentId : "";
          that.registerCode = data.registerCode ? data.registerCode :this.$route.query.registerCode?this.$route.query.registerCode: "";
          that.studentName = data.studentName ? data.studentName : "";
          that.gradeName = data.startSchool + "级";
          that.grade = data.grade ? data.grade : "";
          that.studentClass = data.studentClass ? data.studentClass : "";
          that.major = data.majorCode ? data.majorCode : "";
          that.gender = data.gender ? data.gender : "";
          that.schoolName = data.schoolName ? data.schoolName : "";
          that.college = data.collegeCode ? data.collegeCode : "";
          that.nationCode = data.nationCode ? data.nationCode : "";
          that.birthday = data.birthday ? data.birthday : "";
          that.birthdayview = data.birthday ? data.birthday : "";
          that.addrDetail = data.addrDetail ? data.addrDetail : "";
          that.auditStatus = data.auditStatus ? data.auditStatus : "";
          that.classId = data.classId ? data.classId : "";
          that.transferStatus = data.transferSchoolStatus
            ? data.transferSchoolStatus
            : "0";
    },
    getStudentBaseInfoByStudentId(studentId) {
      var that = this;
      this.$axios
        .get(
          "/v1/studentinfo/getStudentBaseInfoByStudentId?studentId=" + studentId
        )
        .then(function(response) {
          let data = response.data.response;
          that.studentId = data.studentId ? data.studentId : "";
          that.registerCode = data.registerCode ? data.registerCode :this.$route.query.registerCode?this.$route.query.registerCode: "";
          that.studentName = data.studentName ? data.studentName : "";
          that.gradeName = data.startSchool + "级";
          that.grade = data.grade ? data.grade : "";
          that.studentClass = data.studentClass ? data.studentClass : "";
          that.major = data.majorCode ? data.majorCode : "";
          that.gender = data.gender ? data.gender : "";
          that.schoolName = data.schoolName ? data.schoolName : "";
          that.college = data.collegeCode ? data.collegeCode : "";
          that.nationCode = data.nationCode ? data.nationCode : "";
          that.birthday = data.birthday ? data.birthday : "";
          that.birthdayview = data.birthday ? data.birthday : "";
          that.addrDetail = data.addrDetail ? data.addrDetail : "";
          that.auditStatus = data.auditStatus ? data.auditStatus : "";
          that.classId = data.classId ? data.classId : "";
          that.transferStatus = data.transferSchoolStatus
            ? data.transferSchoolStatus
            : "0";
        })
        .catch(function(response) {
        });
    },
    async getNewSchoolGradeList(schoolId,yearSemester) { //查询历史学期的年级
      let res = await api.getHistorySchoolGradeList({
        schoolId,
        yearSemester,
      });
      if(res.data.code == 10000) this.gradeList = res.data.response;
    },
    async getNewClassList(schoolId, grade,yearSemester) {//获取历史学期对应年级的班级
      let res = await api.getHistoryClassList({
        schoolId,
        grade,
        yearSemester,
      });
      if(res.data.code == 10000) this.classList = res.data.response;
    },
    getSchoolGradeList(schoolId) { 
      var vm = this;
      this.$axios
        .get("/v1/studentinfo/getSchoolGradeList?schoolId=" + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            vm.gradeList = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getClassList(schoolId, grade) {
      var vm = this;
      this.$axios
        .get(
          "/v1/studentinfo/getClassList?schoolId=" +
            schoolId +
            "&grade=" +
            grade
        )
        .then(res => {
          if (res.data.code == 10000) {
            vm.classList = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    submit() {
      var vm = this;
      if (
        !vm.studentName ||
        vm.studentName == null ||
        vm.studentName == "" ||
        vm.studentName.trim() == ""
      ) {
        vm.$Message.info("学生姓名不能为空！");
        return false;
      }
      if (
        !vm.registerCode ||
        vm.registerCode == null ||
        vm.registerCode == "" ||
        vm.registerCode.trim() == ""
      ) {
        vm.$Message.info("学生学籍号不能为空！");
        return false;
      }

      if (vm.gender == null || vm.gender == "") {
        vm.$Message.info("请选择性别！");
        return false;
      }
      if (vm.grade == null || vm.grade == "") {
        vm.$Message.info("请选择年级！");
        return false;
      }
      if (vm.classId == null || vm.classId == "") {
        vm.$Message.info("请选择班级！");
        return false;
      }
      vm.studentName = vm.studentName.trim();
      vm.registerCode = vm.registerCode.trim();
      let data = {
        addrDetail: vm.addrDetail,
        auditStatus: vm.auditStatus,
        birthday: vm.birthday,
        classId: vm.classId,
        gender: vm.gender,
        grade: vm.grade,
        nationCode: vm.nationCode,
        registerCode: vm.registerCode,
        schoolId: vm.schoolId,
        schoolName: vm.schoolName,
        startSchool: vm.startSchool,
        studentClass: vm.studentClass,
        studentId: vm.studentId,
        studentName: vm.studentName,
        transferSchoolStatus: vm.transferStatus,
        editStatus:this.modification?'0':this.$route.query.editStatus?this.$route.query.editStatus :'1',
        yearSemester:this.$route.query.yearSemester?this.$route.query.yearSemester :'',

      };
      let yearSemester = this.$route.query.yearSemester
      this.$axios.get(`/v1/subjectReport/querySchoolReportedStatus?dataType=2&yearSemester=${yearSemester}`).then(res => {
        if (res.data.code === 10000) {
          let {editStatus} = res.data.response
          if (editStatus === '1') { // 可编辑
            this.$axios.post("/v1/studentinfo/updateStudentInfo", data).then(function(res) {
                if (res.data.code == 10000) {
                  if (res.data.response.code == 1) {
                    vm.$Message.info(res.data.response.msg);
                    vm.pageToList();
                  } else {
                    vm.$Message.info(res.data.response.msg);
                  }
                } else {
                  if (res.data.code > 39999) {
                    vm.$Message.info(res.data.msg);
                  }
                }
              })
              .catch(function(response) {
              });
          } else { // 不可编辑
            this.$Modal.info({
              title: '提醒',
              okText: '知道了',
              closable: false,
              content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>',
            });
            return false
          }
        }
      })
    }
  },
  mounted() {
    this.myGradeList = gradeData.inOf(sessionStorage.getItem('schoolType'));
    var vm = this;
    let studentId = sessionStorage.getItem(
      "studentInfoManage-studentInfoDetail-studentId"
    )
    if (
      sessionStorage.getItem("studentInfoManage-studentInfoDetail-studentId")
    ) {
      vm.disabled = true;
      vm.getStudentBaseInfoByStudentId(
        sessionStorage.getItem("studentInfoManage-studentInfoDetail-studentId")
      );
    }
    if(this.$route.query.whetherData) this.queryStudentMsg();
    let schoolId = sessionStorage.getItem("schoolId");
    vm.studentId = studentId;
    vm.schoolId = schoolId;
    if(vm.$route.query.editStatus == '2') vm.getNewSchoolGradeList(sessionStorage.getItem("schoolId"),vm.$route.query.yearSemester);
    else vm.getSchoolGradeList(sessionStorage.getItem("schoolId"));
  }
};
</script>
