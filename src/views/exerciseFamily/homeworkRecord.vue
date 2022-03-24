<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">课后作业考核录入</h2>
    </div>
    <div>
      <Card :dis-hover="true">
        <div @keydown.enter="getStudentHomeworkList" class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>日期：</span>
              <DatePicker
                :value="dateTime"
                @on-change="startTimeChange"
                :clearable="false"
                format="yyyy-MM-dd"
                type="datetime"
                placeholder="日期"
                style="width: 120px"
                on-clear="dateClear"
              ></DatePicker>
            </div>
            <div style="margin:5px 10px;">
              <span>年级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>班级：</span>
              <Select v-model="studentClass" style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>姓名：</span>
              <Input style="width:120px;" v-model="studentName" :maxlength="20" />
            </div>
          </div>
          <div class="right-btns">
            <Button @click="getStudentHomeworkList" type="success">查询</Button>
          </div>
        </div>
      </Card>
      <br />
      <div>
        <Card :dis-hover="true">
          <div style="font-size:18px;height:40px;">
            数据明细
            <Button @click="allFinish" style="margin-left:1300px;" type="success">一键完成</Button>
            <Button @click="allCancle" style="margin-left:20px;" type="success">一键取消</Button>
          </div>
          <Row>
            <div style>
              <Table
                border
                :loading="loading"
                max-height="600"
                :columns="resultColumns"
                :data="resultData"
              ></Table>
            </div>
          </Row>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      dateTime: "",
      studentName: "",
      infostudentName: "",
      infostudentId: "",
      inforegisterCode: "",
      infogender: "",
      infogradeName: "",
      infocompleteStatus: "",
      grade: "",
      schoolGradeList: [],
      classId: "",
      studentClass: 1,
      classList: [
        // {
        //   value: "",
        //   label: '全部'
        // },
        {
          value: 1,
          label: "1班",
        },
        {
          value: 2,
          label: "2班",
        },
        {
          value: 3,
          label: "3班",
        },
        {
          value: 4,
          label: "4班",
        },
        {
          value: 5,
          label: "5班",
        },
        {
          value: 6,
          label: "6班",
        },
        {
          value: 7,
          label: "7班",
        },
        {
          value: 8,
          label: "8班",
        },
        {
          value: 9,
          label: "9班",
        },
        {
          value: 10,
          label: "10班",
        },
        {
          value: 11,
          label: "11班",
        },
        {
          value: 12,
          label: "12班",
        },
        {
          value: 13,
          label: "13班",
        },
        {
          value: 14,
          label: "14班",
        },
        {
          value: 15,
          label: "15班",
        },
        {
          value: 16,
          label: "16班",
        },
        {
          value: 17,
          label: "17班",
        },
        {
          value: 18,
          label: "18班",
        },
        {
          value: 19,
          label: "19班",
        },
        {
          value: 20,
          label: "20班",
        },
        {
          value: 21,
          label: "21班",
        },
        {
          value: 22,
          label: "22班",
        },
        {
          value: 23,
          label: "23班",
        },
        {
          value: 24,
          label: "24班",
        },
        {
          value: 25,
          label: "25班",
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
      primaryList: [
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      middleList: [
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      highList: [
        { grade: 10, label: "高一" },
        { grade: 11, label: "高二" },
        { grade: 12, label: "高三" },
      ],
      resultColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            return h("span", row.gender == "1" ? "男" : "女");
          },
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            return h("span", row.gradeName + row.studentClass + "班");
          },
        },
        {
          title: "是否完成作业",
          key: "resultValue",
          align: "center",
          width: 250,
          render: (h, params) => {
            const param = params.row;
            return h(
              "i-switch",
              {
                props: {
                  type: "primary",
                  size: "default",
                  fontSize: "2px",
                  font_size_style_values: "2px",
                  value: param.completeStatus === "1",
                },
                slots: {
                  open: "是",
                  close: "否",
                },
                on: {
                  "on-change": (status) => {
                    let type = status ? "1" : "2";
                    // console.log(status)
                    this.resultData[params.index].completeStatus = type;
                    this.infostudentId = this.resultData[
                      params.index
                    ].studentId;
                    this.infostudentName = this.resultData[
                      params.index
                    ].studentName;
                    this.infogender = this.resultData[params.index].gender;
                    this.infogradeName = this.resultData[
                      params.index
                    ].gradeName;
                    this.inforegisterCode = this.resultData[
                      params.index
                    ].registerCode;
                    this.studentClass = this.resultData[
                      params.index
                    ].studentClass;
                    this.infocompleteStatus = type;
                    this.oneStudentHomeworkQuery();
                    // console.log(param)
                    // this.updateHomeworlStatus(param.row,type);
                  },
                },
              },
              [
                h("span", {
                  slot: "open",
                  domProps: {
                    innerHTML: "是",
                  },
                }),
                h("span", {
                  slot: "close",
                  domProps: {
                    innerHTML: "否",
                  },
                }),
              ]
            );
          },
        },
      ],
      resultData: [],
      semesterStatus: "",
    };
  },
  methods: {
    cancelAllHomeWorkQuery() {
      var vm = this;
      console.log("---------------------------------------------");
      // return
      //如果是全部，需要传grade和classnum
      let data = {
        dateTime: vm.dateTime,
        gradeNum: vm.grade,
        classNum: vm.studentClass,
        semesterStatus: vm.semesterStatus,
      };
      this.$axios
        .post("/v1/schoolteststudent/cancelStudentHomeworkAllstudent", data)
        .then((res) => {
          if (res.data.code == 10000) {
            this.$Message.success("保存成功！");
            this.getStudentHomeworkList();
          } else {
            this.$Message.success(res.data.msg);
            this.getStudentHomeworkList();
          }
        });
    },

    oneStudentHomeworkQuery() {
      var vm = this;
      // console.log(vm.resultData);
      // return
      //如果是全部，需要传grade和classnum
      let data = {
        dateTime: vm.dateTime,
        semesterStatus: vm.semesterStatus,
        gradeNum: vm.grade,
        classNum: vm.studentClass,
        studentId: vm.infostudentId,
        studentName: vm.infostudentName,
        registerCode: vm.inforegisterCode,
        gender: vm.infogender,
        gradeName: vm.infogradeName,
        completeStatus: vm.infocompleteStatus,
      };
      this.$axios
        .post("/v1/schoolteststudent/upsertOneStudentHomework", data)
        .then((res) => {
          if (res.data.code == 10000) {
            this.$Message.success("保存成功！");
            this.getStudentHomeworkList();
          } else {
            this.$Message.success(res.data.msg);
            this.getStudentHomeworkList();
          }
        });
    },
    startTimeChange(time) {
      this.dateTime = time;
    },
    allFinish() {
      var vm = this;
      if (vm.resultData) {
        for (let i = 0; i < vm.resultData.length; i++) {
          this.resultData[i].completeStatus = "1";
        }
      }
      vm.saveResult();
    },
    allCancle() {
      var vm = this;
      // if(vm.resultData){
      //   for(let i=0;i<vm.resultData.length;i++){
      //     this.resultData[i].completeStatus='2';
      //   }
      // }
      vm.cancelAllHomeWorkQuery();
    },
    getStudentHomeworkList() {
      var vm = this;
      vm.resultData = [];
      vm.loading = true;
      this.$axios
        .get(
          "/v1/schoolteststudent/getStudentHomeworkList?schoolId=1&dateTime=" +
            vm.dateTime +
            "&gradeId=" +
            vm.grade +
            "&studentClass=" +
            vm.studentClass +
            "&studentName=" +
            vm.studentName
        )
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            if (data) {
              vm.semesterStatus = data.semesterStatus;
              if (data.semesterStatus == "1") {
                vm.resultData = res.data.response.list;
              }
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    updateHomeworlStatus(student, status) {
      var vm = this;
    },
    saveResult() {
      var vm = this;
      // console.log(vm.resultData);
      // return
      //如果是全部，需要传grade和classnum
      let data = {
        dateTime: vm.dateTime,
        gradeNum: vm.grade,
        classNum: vm.studentClass,
        semesterStatus: vm.semesterStatus,
      };
      this.$axios
        .post("/v1/schoolteststudent/upsertStudentHomework", data)
        .then((res) => {
          if (res.data.code == 10000) {
            this.$Message.success("保存成功！");
            this.getStudentHomeworkList();
          } else {
            this.$Message.success(res.data.msg);
            this.getStudentHomeworkList();
          }
        });
    },
  },

  created() {},
  watch: {},
  mounted() {
    var vm = this;
    var day1 = new Date();
    day1.setTime(day1.getTime() - 24 * 60 * 60 * 1000);
    vm.dateTime =
      day1.getFullYear() + "-" + (day1.getMonth() + 1) + "-" + day1.getDate();
    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType) {
      if ("0" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList);
      }
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.primaryList;
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.middleList;
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.highList;
      }
    }
    vm.grade = vm.schoolGradeList[0].grade;
    vm.getStudentHomeworkList();
  },
};
</script>
