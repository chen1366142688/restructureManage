<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生详情</h2>
    </div>
    <div>
      <Card :dis-hover="true" style="height:210px;">
        <Row>
          <Col span="6">
            姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名：
            <Input v-model="studentName" placeholder="学生姓名" style="width: 50%;" />
          </Col>
          <Col span="6">
            学生编号：
            <Input v-model="registerCode" placeholder="学籍号" style="width: 50%;" />
          </Col>
          <Col span="6">
            性别：
            <Select v-model="gender" style="width:50%;">
              <Option
                v-for="(item, index) in genderList"
                :value="item.type"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </Col>
          <Col span="6">
            民族代码：
            <Input style="width: 50%;" v-model="nationCode" placeholder="民族代码"></Input>
          </Col>
        </Row>
        <Row style="margin-top:20px;">
          <Col span="6">
            年&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：
            <Select v-model="grade" style="width:50%;">
              <Option
                v-for="(item, index) in gradeList"
                :value="item.grade"
                :key="index"
              >{{ item.gradeName }}</Option>
            </Select>
          </Col>
          <Col span="6">
            班&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;级：
            <Select v-model="classId" style="width:50%;">
              <Option
                v-for="(item,index) in classList"
                :value="item.studentClass"
                :key="index"
              >{{ item.className }}</Option>
            </Select>
          </Col>
          <Col span="6">
            生日：
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
            状&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;态：
            <Select v-model="transferStatus" style="width:50%;">
              <Option
                v-for="(item,index) in transferList"
                :value="item.value"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </Col>
        </Row>
        <Row style="margin-top:20px;">
          家庭地址：
          <Input style="width: 70%;" v-model="addrDetail" placeholder="家庭地址"></Input>
        </Row>
      </Card>
      <div style="margin-top:10px;text-align:center">
        <Button @click="pageToList" style="margin-right:50px;width:100px" type="success">返回</Button>
        <Button @click="submit" style="width:100px" type="success">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        {
          name: "已停用",
          value: "3"
        }
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
      classList: [],
      classId: ""
    };
  },
  watch: {
    grade: function() {
      var vm = this;
      if (vm.grade) {
        vm.classList = [];
        vm.getClassList(vm.schoolId, vm.grade);
      }
    }
  }, //以V-model绑定数据时使用的数据变化监测

  methods: {
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    examStartTimeChange(date, type) {
      var vm = this;
      vm.birthday = date;
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
          that.registerCode = data.registerCode ? data.registerCode : "";
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
          console.log(response);
        });
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
        vm.$Message.info("姓名不能为空！");
        return false;
      }
      if (
        !vm.registerCode ||
        vm.registerCode == null ||
        vm.registerCode == "" ||
        vm.registerCode.trim() == ""
      ) {
        vm.$Message.info("学生编号不能为空！");
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
      if (vm.birthday == null || vm.birthday == "") {
        vm.$Message.info("请选择生日！");
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
        transferSchoolStatus: vm.transferStatus
      };
      this.$axios.get(`/v1/subjectReport/querySchoolReportedStatus?dataType=2`).then(res => {
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
                console.log(response);
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
    const vm = this;
    let studentId = this.$route.params.studentId
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.studentId = studentId;
    if (studentId) {//编辑
      vm.disabled = true;
      vm.getStudentBaseInfoByStudentId(studentId);
    }
    vm.getSchoolGradeList(vm.schoolId);
  },
  destroyed() {
  }
};
</script>
