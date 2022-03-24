<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生运动数据</h2>
    </div>
    <div v-if="openStatus && classList !=null && classList.length>0">
      <Tabs style="margin-top:20px;" type="card" v-model="selectTabName" @on-click="selectTabs">
        <TabPane
          :name="classInfo.studentClassName"
          v-for="(classInfo,index) in classList"
          :label="classInfo.studentClassName "
          :key="index"
        ></TabPane>
      </Tabs>
      <Card>
        <div @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>学生姓名：</span>
              <Input v-model="studentName" placeholder="学生姓名" style="width:120px;"></Input>
            </div>
            <div style="margin:5px 10px;">
              <span>学籍号<span style="visibility:hidden">占</span>：</span>
              <Input v-model="registerCode" placeholder="学籍号" style="width:120px;"></Input>
            </div>
            <div style="margin:5px 10px;">
              <span>性<span style="visibility: hidden;">占位</span>别：</span>
              <Select v-model="gender" style="width:120px;">
                <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.name }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success"  @click="exportModel">导出EXCEL</Button>
          </div>
        </div>
      </Card>
      <Card :dis-hover="true" style="margin-top:20px">
        <p style="font-size:18px;">数据概览</p>
        <div>
          <Row>
            <div>
              <Table border :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </div>
      </Card>
      <Card :dis-hover="true" style="margin-top:20px;">
        <p style="font-size:18px;">数据明细</p>
        <div>
          <Row>
            <div>
              <Table border :columns="resultColumns1" :data="resultData1"></Table>
            </div>
          </Row>
        </div>
      </Card>
    </div>
    <div v-if="!openStatus">
      <Card :dis-hover="true" style="width:100%;height:700px;">
        <div style="margin-top:340px;text-align: center;">
          <span >学校未开启手环监测教学模式</span>
        </div>
      </Card>
    </div>
    <div v-if="openStatus && (classList ==null || classList.length <= 0)">
      <Card :dis-hover="true" style="width:100%;height:700px;">
        <div style="margin-top:340px;text-align: center;">
          <span >当前没有您的课程班级数据</span>
        </div>
      </Card>
    </div>


  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolId: "",
      type:"1",
      openStatus: false,
      selectTabName: "",
      classList: [],
      classId: "",
      studentName: "",
      registerCode: "",
      gender: "3",
      genderList: [
        {
          name: "男",
          value: "1"
        },
        {
          name: "女",
          value: "2"
        },
        {
          name: "全部",
          value: "3"
        }
      ],
      resultColumns: [
      ],
      r1:[{
          title: "班级总人数",
          key: "studentNum",
          align: "center",
          minWidth:100
        },
        {
          title: "平均心率（bpm）",
          key: "heartRate",
          align: "center",
          minWidth:100
        },
        {
          title: "平均每人每天消耗卡路里（kcal）",
          key: "calories",
          align: "center",
          minWidth:200
        },
        {
          title: "平均每人每天运动步数",
          key: "stepNum",
          align: "center",
          minWidth:100
        },
        {
          title: "平均每人每天运动距离（km）",
          key: "distance",
          align: "center",
          minWidth:100
        },
        {
          title: "平均每人每天睡眠（小时）",
          key: "sleep",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let data = params.row.sleep;
            let test =
              data % 60 > 0
                ? Math.floor(Number(data) / 60) + "小时" + (data % 60) + "分钟"
                : Math.floor(Number(data) / 60) + "小时";
            return "span", test;
          }
        }],
      r2:[{
          title: "班级总人数",
          key: "studentNum",
          align: "center",
          minWidth:100
        },
        {
          title: "平均心率（bpm）",
          key: "heartRate",
          align: "center",
          minWidth:100

        },
        {
          title: "平均每人每天消耗卡路里（kcal）",
          key: "calories",
          align: "center",
          minWidth:100

        },
        {
          title: "平均每人每天运动步数",
          key: "stepNum",
          align: "center",
          minWidth:100

        },
        {
          title: "平均每人每天运动距离（km）",
          key: "distance",
          align: "center",
          minWidth:100

        },
        ],
      resultData: [],
      resultColumns1: [

      ],
      rr1:[
          {
          title: "序号",
          key: "gradeName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return "span", params.index + 1;
          }
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100,

        },
        {
          title: "年级",
          key: "gradeName",
          align: "center",
          minWidth:100,

        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth:100,

          render: (h, params) => {
            return "span", params.row.studentClass + "班";
          }
        },
        {
          title: "平均心率（bpm）",
          key: "heartRate",
          minWidth:100,

          align: "center"
        },
        {
          title: "平均每天消耗卡路里（kcal）",
          key: "calories",
          minWidth:100,

          align: "center"
        },
        {
          title: "平均每天运动步数",
          key: "stepNum",
          minWidth:100,

          align: "center"
        },
        {
          title: "平均每天运动距离（km）",
          key: "distance",
          minWidth:100,

          align: "center"
        },
        {
          title: "平均每天睡眠（小时）",
          key: "sleep",
          align: "center",
          minWidth:100,

          render: (h, params) => {
            let data = params.row.sleep;
            let test = "";
            if (data) {
              test =
                data % 60 > 0
                  ? Math.floor(Number(data) / 60) +
                    "小时" +
                    (data % 60) +
                    "分钟"
                  : Math.floor(Number(data) / 60) + "小时";
            }
            return "span", test;
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled: params.row.heartRate || params.row.sleep ? false : true
                  },
                  style: {
                    // marginRight: "0px"
                  },
                  on: {
                    click: () => {
                      var vm = this;
                      vm.pageToDetail(
                        params.row.studentId
                      );
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      rr2:[
          {
          title: "序号",
          key: "gradeName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return "span", params.index + 1;
          }
        },
        {
          title: "学生姓名",
          key: "studentName",
          minWidth:100,

          align: "center"
        },
        {
          title: "年级",
          key: "gradeName",
          minWidth:100,

          align: "center"
        },
        {
          title: "班级",
          key: "studentClass",
          minWidth:100,

          align: "center",
          render: (h, params) => {
            return "span", params.row.studentClass + "班";
          }
        },
        {
          title: "平均心率（bpm）",
          key: "heartRate",
          minWidth:100,

          align: "center"
        },
        {
          title: "平均每天消耗卡路里（kcal）",
          key: "calories",
          minWidth:100,

          align: "center"
        },
        {
          title: "平均每天运动步数",
          key: "stepNum",
          minWidth:100,

          align: "center"
        },
        {
          title: "平均每天运动距离（km）",
          key: "distance",
          minWidth:100,

          align: "center"
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled: params.row.heartRate || params.row.sleep? false : true
                  },
                  style: {
                    // marginRight: "0px"
                  },
                  on: {
                    click: () => {
                      var vm = this;
                      vm.pageToDetail(
                        params.row.studentId
                      );
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      resultData1: []
    };
  },
  methods: {
    selectTabs(name) {
      let vm = this;
      this.selectTabName = name;
      for (let i = 0; i < vm.classList.length; i++) {
        if (name === vm.classList[i].studentClassName) {
          vm.classId = vm.classList[i].classId;
          localStorage.setItem('STUDENT-SPORT-SELECT-CLASS-TAB-NAME', name);
        }
      }
    },
    getWristbandTypeBySchoolId() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getWristbandTypeBySchoolId")
        .then(function(response) {
          let data = response.data.response;
          if (data == "1" || data == "2") {
            vm.openStatus = true;
            vm.type=data;
            if(data=="1"){
                vm.resultColumns=vm.r2;
                vm.resultColumns1=vm.rr2;
            }else{
                vm.resultColumns=vm.r1;
                vm.resultColumns1=vm.rr1
            }
            vm.getTeacherClassInfo();
          } else {
            vm.openStatus = false;
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSportsClassStatisticalInfo() {
      var vm = this;
      vm.resultData = [];
      this.$axios
        .get(
          "/v1/wristbandmonitor/getSportsClassStatisticalInfo?classId=" +
            vm.classId
        )
        .then(function(response) {
          let data = response.data.response;
          if(data){
            vm.resultData.push(data);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSportsStudentInfoList() {
      var vm = this;
      vm.resultData1 = [];
      let params = {
        classId: vm.classId,
        gender: vm.gender,
        registerCode: vm.registerCode,
        studentName: vm.studentName
      };
      this.$axios
        .post("/v1/wristbandmonitor/getSportsStudentInfoList", params)
        .then(function(response) {
          let data = response.data.response;
          vm.resultData1 = data;
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getTeacherClassInfo() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getTeacherClassInfo")
        .then(function(response) {
          let data = response.data.response;
          vm.classList = data ? data : [];
          if (data && data.length>0) {
            // vm.selectTabs(data[0].studentClassName);
            let tabName = localStorage.getItem('STUDENT-SPORT-SELECT-CLASS-TAB-NAME');
            if (tabName !== null && tabName !== undefined) {
              vm.selectTabs(tabName);
            } else {
              vm.selectTabs(data[0].studentClassName);
            }
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    exportModel() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/wristbandmonitor/exportStudentSportsDeviceData?classId="+vm.classId+"&gender="+vm.gender+"&registerCode="+vm.registerCode+
        "&studentName="+vm.studentName+"&type="+vm.type+
        "&token=" +sessionStorage.getItem("token");
      window.open(url);
    },
    querySearch() {
      var vm = this;
      vm.getSportsStudentInfoList();
    },
    pageToDetail(studentId) {
      var vm=this;
      sessionStorage.setItem("studentSportsData-studentSportsDataDetail-studentId", studentId);
      sessionStorage.setItem("studentSportsData-studentSportsDataDetail-type", vm.type);
      this.$router.push({ name: "studentSportsDataDetail" });
    },
  },
  watch: {
    classId: function() {
      var vm = this;
      if (vm.classId) {
        vm.getSportsClassStatisticalInfo();
        vm.getSportsStudentInfoList();
      }
    }
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm = this;
    this.schoolId = sessionStorage.getItem("schoolId");
    vm.getWristbandTypeBySchoolId();
    let backFlag = localStorage.getItem('RETURN_TO_STUDENT_SPORTS');
    if (backFlag !== null) {
      vm.selectTabName = localStorage.getItem('STUDENT-SPORT-SELECT-CLASS-TAB-NAME');
      localStorage.removeItem('RETURN_TO_STUDENT_SPORTS');
    } else {
      localStorage.removeItem('STUDENT-SPORT-SELECT-CLASS-TAB-NAME');
    }
  }
};
</script>
