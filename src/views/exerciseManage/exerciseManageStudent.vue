<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按学生查询</h2>
    </div>
    <div>
      <!-- 顶部查询 -->
      <Card style="min-height: 110px;">
        <div class="top-search">
          <div class="left-input">
            <!-- 选择学期(仅寒假、暑假显示) -->
            <div style="margin:5px 20px;" v-if="semesterStatus == 2 || semesterStatus == 4">
              <span>学<span style="visibility:hidden">空</span>期：</span>
              <Select v-model="semesterOver" style="width:120px;">
                <Option
                  v-for="item in semesterList"
                  :value="item.value"
                  :key="item.value"
                >
                  {{ item.label }}
                </Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span style>年<span style="visibility:hidden">空</span>级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                        v-for="item in schoolGradeList"
                        :value="item.grade"
                        :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>班<span style="visibility:hidden">空</span>级：</span>
              <Select v-model="studentClass" style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>性<span style="visibility:hidden">空</span>别：</span>
              <Select v-model="gender" style="width:120px;">
                <Option
                        v-for="item in genderList"
                        :value="item.itemId"
                        :key="item.itemId"
                >{{ item.itemName }}</Option>
              </Select>
            </div>
            <div @keydown.enter="querySearch" style="margin:5px 20px;">
              <span>姓<span style="visibility:hidden">空</span>名：</span>
              <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div @keydown.enter="querySearch" style="margin:5px 20px;">
              <span>学籍号：</span>
              <Input v-model="registerCode" placeholder="学生学籍号" style="width: 120px;" />
            </div>
            
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" @click="restore">重置查询条件</Button>
            <Button type="success" @click="toCompleteStatus">课后作业补录</Button>
          </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">数据明细</div>
        <Row>
          <div>
            <Table
                    border
                    max-height="550"
                    :loading="loading"
                    :columns="resultColumns"
                    :data="resultData"
            ></Table>
          </div>
          <br />
          <div style="float: right;">
            <Page
                    :total="total"
                    :current="pageNum"
                    :page-size="pageSize"
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
  export default {
    name: "schoolList",
    data() {
      return {
        semesterStatus: '',
        yearSemester: '',
        semesterOver: '', // 是否放假 0 放假  1 上学期 ,

        loading: false,
        updateUrl: "",
        schoolId: "",
        schoolType: "",
        grade: "",
        gender: "",
        semesterList: [
          {label: '寒假作业', value: '0'},
          {label: '上学期内作业', value: '1'}
        ],
        genderList: [
          {
            itemId: "",
            itemName: "全部",
          },
          {
            itemId: "1",
            itemName: "男",
          },
          {
            itemId: "2",
            itemName: "女",
          },
        ],
        primaryList: [
          {
            grade: "",
            label: "全部",
          },
          {
            grade: 1,
            label: "一年级",
          },
          {
            grade: 2,
            label: "二年级",
          },
          {
            grade: 3,
            label: "三年级",
          },
          {
            grade: 4,
            label: "四年级",
          },
          {
            grade: 5,
            label: "五年级",
          },
          {
            grade: 6,
            label: "六年级",
          },
        ],
        middleList: [
          {
            grade: "",
            label: "全部",
          },
          {
            grade: 7,
            label: "七年级",
          },
          {
            grade: 8,
            label: "八年级",
          },
          {
            grade: 9,
            label: "九年级",
          },
        ],
        highList: [
          {
            grade: "",
            label: "全部",
          },
          {
            grade: 10,
            label: "高一",
          },
          {
            grade: 11,
            label: "高二",
          },
          {
            grade: 12,
            label: "高三",
          },
        ],
        collegeList: [
          {
            grade: "",
            label: "全部",
          },
          {
            grade: 13,
            label: "大一",
          },
          {
            grade: 14,
            label: "大二",
          },
          {
            grade: 15,
            label: "大三",
          },
          {
            grade: 16,
            label: "大四",
          },
        ],
        schoolGradeList: [],
        studentClass: "",
        classList: [
          {
            value: "",
            label: "全部",
          },
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
        registerCode: "",
        studentName: "",
        resultColumns: [
          {
            title: "学生姓名",
            key: "studentName",
            align: "center",
            minWidth:100
          },
          {
            title: "学籍号",
            key: "registerCode",
            align: "center",
            minWidth:100,
          },
          {
            title: "性别",
            key: "gender",
            align: "center",
            width: 70,
            render: (h, params) => {
              const row = params.row;
              const text = row.gender == "1" ? "男" : "女";
              return h("div", text);
            },
          },
          {
            title: "班级",
            key: "studentClass",
            align: "center",
            width: 120,
            render: (h, params) => {
              const row = params.row;
              // const color = row.exemptId != null ? 'green' : 'red'
              const text = row.gradeName + row.studentClass + "班";
              return h("div", text);
            },
          },
          {
            title: "有效完成/考核总次数",
            key: "studentClass",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              if (row.exemptStatus == "1") {
                return h("div", "免试");
              }
              let haveCount = row.comboCount == null ? 0 : row.comboCount;
              let needCount =
                      row.needExerciseCount == null ? 0 : row.needExerciseCount;
              const text = haveCount + "/" + needCount;
              return h("div", text);
            },
          },
          {
            title: "累计锻炼总次数",
            key: "dateCount",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              if (row.exemptStatus == "1") {
                return h("div", "");
              }
              let comboCount = row.comboCount == null ? 0 : row.comboCount;
              return h("div", comboCount);
            },
          },
          {
            title: "累计锻炼总时长(分钟)",
            key: "comboTime",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              if (row.exemptStatus == "1") {
                return h("div", "");
              }
              let comboTime = row.comboTime == null ? 0 : row.comboTime;
              comboTime = comboTime / 1000 / 60;
              comboTime = comboTime.toFixed(1);
              return h("div", comboTime);
            },
          },
          {
            title: "平均每天锻炼时长(分钟)",
            key: "comboTimeDay",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              if (row.exemptStatus == "1") {
                return h("div", "");
              }
              let comboTime = row.comboTime == null ? 0 : row.comboTime;
              if (row.comboCount > 0) {
                comboTime = comboTime / row.comboCount / 1000 / 60;
                comboTime = comboTime.toFixed(1);
              } else {
                comboTime = 0;
              }
              return h("div", comboTime);
            },
          },
          {
            title: "上传视频个数",
            key: "videoCount",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              if (row.exemptStatus == "1") {
                return h("div", "");
              }
              let videoCount = row.videoCount == null ? 0 : row.videoCount;
              return h("div", videoCount);
            },
          },
          {
            title: "操作",
            key: "action",
            align: "center",
            width: 120,
            render: (h, params) => {
              const row = params.row;
              return h("div", [
                h(
                        "Button",
                        {
                          props: {
                            type: "success",
                            disabled: row.exemptStatus == "1" ? true : false,
                          },
                          style: {
                            marginRight: "5px",
                          },
                          on: {
                            click: () => {
                              this.toDetail(
                                      params.row.studentId,
                                      params.row.studentName,
                                      params.row.registerCode
                              );
                            },
                          },
                        },
                        "详情"
                ),
              ]);
            },
          },
        ],
        collegeColumns: [
          {
            title: "学生姓名",
            key: "studentName",
            align: "center",
            minWidth:100
          },
          {
            title: "学籍号",
            key: "registerCode",
            align: "center",
            minWidth:100,
          },
          {
            title: "性别",
            key: "gender",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              // const color = row.exemptId != null ? 'green' : 'red'
              const text = row.gender == "1" ? "男" : "女";
              return h("div", text);
            },
          },
          {
            title: "学院",
            key: "collegeName",
            align: "center",
            minWidth:100,
          },
          {
            title: "专业",
            key: "majorName",
            align: "center",
            minWidth:100
          },
          {
            title: "学级",
            key: "startSchool",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              const text = row.startSchool + "级";
              return h("div", text);
            },
          },
          {
            title: "班级",
            key: "studentClass",
            align: "center",
            minWidth:100,
            render: (h, params) => {
              const row = params.row;
              const text = row.studentClass + "班";
              return h("div", text);
            },
          },
        ],
        resultData: [],
        resultData1: [],
        isCollege: false,
        college: "",
        collegesList: [],
        major: "",
        majorList: [],
        chooseCollege: true,
        collegeName: "",
        semesterYear: "",
        semesterName: "",
        semesterYearList: [],
        holiday: "",
        holidayTf: false,
        pageNum: 1,
        pageSize: 10,
        total: 0,
        pageNum1: 1,
        pageSize1: 10,
        total1: 0,
      };
    },
    methods: {
      toDetail(studentId, studentName, registerCode) {
        sessionStorage.setItem(
                "exerciseManageStudent-exerciseManageStudentDetail-studentId",
                studentId
        );
        sessionStorage.setItem(
                "exerciseManageStudent-exerciseManageStudentDetail-studentName",
                studentName
        );
        sessionStorage.setItem(
                "exerciseManageStudent-exerciseManageStudentDetail-registerCode",
                registerCode
        );
        sessionStorage.setItem(
                "exerciseManageStudent-exerciseManageStudentDetail-yearSemester",
                ""
        );
        sessionStorage.setItem(
                "exerciseManageStudent-exerciseManageStudentDetail-semesterOver",
                ""
        );
        this.$router.push({ name: "exerciseManageStudentDetail" });
      },
      toCompleteStatus(){
        var vm = this;
        this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
          if (res.data.code === 10000) {
            let {editStatus} = res.data.response
            if (editStatus === '1') {
              vm.toComplete();
            } else {
              this.$Modal.info({
                title: '提醒',
                okText: '知道了',
                closable: false,
                content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
              });
            }
          }
        })
      },
      toComplete() {
        this.addChildrenExerciseSemester();
        this.$router.push({ name: "additionalRecordingStudentManage" });
      },
      addChildrenExerciseSemester() {
        var vm = this;
        this.$axios
                .get("/v1/exercise/family/addChildrenExerciseSemester?schoolId=1")
                .then((res) => {});
      },
      getStudentInfoList(schoolId) {
        var vm = this;
        sessionStorage.setItem("exerciseManageStudent-grade", vm.grade);
        sessionStorage.setItem(
                "exerciseManageStudent-studentClass",
                vm.studentClass
        );
        sessionStorage.setItem(
                "exerciseManageStudent-registerCode",
                vm.registerCode
        );
        sessionStorage.setItem(
                "exerciseManageStudent-studentName",
                vm.studentName
        );
        sessionStorage.setItem("exerciseManageStudent-pageNum", vm.pageNum);
        sessionStorage.setItem("exerciseManageStudent-pageSize", vm.pageSize);

        vm.loading = true;
        let data = {
          grade: vm.grade,
          pageNo: vm.pageNum,
          pageSize: vm.pageSize,
          registerCode: vm.registerCode,
          schoolId: schoolId,
          semesterOver: this.semesterOver, // 是否放假1是0否 ,
          studentClass: vm.studentClass,
          studentName: vm.studentName,
          gender: vm.gender,
          yearSemester:this.yearSemester
        };
        this.$axios
                .post("/v1/familyexerciseanalyze/queryExerciseStudentList", data)
                .then((res) => {
                  vm.loading = false;
                  if (res.data.code == 10000) {
                    vm.resultData = res.data.response;
                  } else {
                    if (res.data.code > 39999) {
                      vm.$Message.info(res.data.msg);
                    }
                  }
                });
      },
      countStudentList(schoolId) {
        var vm = this;
        let data = {
          grade: vm.grade,
          pageNo: vm.pageNum,
          pageSize: vm.pageSize,
          registerCode: vm.registerCode,
          schoolId: schoolId,
          studentClass: vm.studentClass,
          studentName: vm.studentName,
          gender: vm.gender,
          yearSemester: this.yearSemester,
          semesterOver: this.semesterOver, // 是否放假1是0否 ,
        };
        this.$axios
                .post("/v1/familyexerciseanalyze/queryStudentExerciseListCount", data)
                .then((res) => {
                  if (res.data.code == 10000) {
                    this.total = res.data.response;
                  } else {
                    if (res.data.code > 39999) {
                      this.$Message.info(res.data.msg);
                    }
                  }
                });
      },
      querySearch() {
        this.pageNum = 1;
        this.pageNo = 1;
        this.search();
      },
      search() {
        var vm = this;
        let schoolId = vm.schoolId;
        vm.getStudentInfoList(schoolId);
        vm.countStudentList(schoolId);
      },
      restore() {
        var vm = this;
        vm.grade = "";
        vm.pageNo = 1;
        vm.pageSize = 10;
        vm.registerCode = "";
        vm.studentClass = "";
        vm.studentName = "";
        this.semesterOver = this.semesterStatus == 2 || this.semesterStatus == 4 ? '0' : ''
        let schoolId = vm.schoolId;
        vm.querySearch();
      },

      pageNumChange(value) {
        //页码改变方法处理
        if (this.pageNum != value) {
          this.pageNum = value;
          this.search();
        }
      },
      pageSizechange(value) {
        //页面大小改变方法处理
        if (this.pageSize != value) {
          this.pageNum = 1;
          this.pageSize = value;
          this.search();
        }
      },
    },
    created() {
      /**
       * @param semesterStatus  1第一学期 2 寒假 3 第二学期 4 暑假
       */
      this.semesterStatus = sessionStorage.getItem('semesterStatus')

      if (this.semesterStatus == 2) {
        this.semesterList[0].label = '寒假作业'
        this.semesterOver = '0'
      } else if (this.semesterStatus == 4) {
        this.semesterList[0].label = '暑假作业'
        this.semesterOver = '0'
      } else {
        this.semesterOver = ''
      }
      this.yearSemester = sessionStorage.getItem('yearSemester')
    },
    mounted() {
      //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
      var vm = this;
      let schoolId = sessionStorage.getItem("schoolId");
      vm.schoolId = schoolId;
      let schoolType = sessionStorage.getItem("schoolType");
      vm.schoolType = schoolType;
      
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
      }

      let grade = sessionStorage.getItem("exerciseManageStudent-grade");
      let studentClass = sessionStorage.getItem(
              "exerciseManageStudent-studentClass"
      );
      let registerCode = sessionStorage.getItem(
              "exerciseManageStudent-registerCode"
      );
      let studentName = sessionStorage.getItem(
              "exerciseManageStudent-studentName"
      );
      let pageNum = sessionStorage.getItem("exerciseManageStudent-pageNum");
      let pageSize = sessionStorage.getItem("exerciseManageStudent-pageSize");

      if (grade != null && grade != "" && grade != undefined && grade > 0) {
        vm.grade = Number(grade);
      }
      if (
              studentClass != null &&
              studentClass != "" &&
              studentClass != undefined &&
              studentClass > 0
      ) {
        vm.studentClass = Number(studentClass);
      }
      if (
              registerCode != null &&
              registerCode != "" &&
              registerCode != undefined
      ) {
        vm.registerCode = registerCode;
      }
      if (studentName != null && studentName != "" && studentName != undefined) {
        vm.studentName = studentName;
      }
      if (
              pageNum != null &&
              pageNum != "" &&
              pageNum != undefined &&
              pageNum > 0
      ) {
        vm.pageNum = Number(pageNum);
      }
      if (
              pageSize != null &&
              pageSize != "" &&
              pageSize != undefined &&
              pageSize > 0
      ) {
        vm.pageSize = Number(pageSize);
      }
      // vm.search()
      vm.search();
    },
  };
</script>
