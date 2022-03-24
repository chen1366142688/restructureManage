<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{yearSemester%2==0?((yearSemester/10).toFixed(0))+"学年第一学期":((yearSemester/10).toFixed(0) -1)+"学年第二学期"}}{{semesterOver == '0'?(yearSemester%2==0?"寒假":"暑假"):""}}课后作业管理</h2>
    </div>
    <div>
      <Card style="height: 110px;">
        <!-- 第一行 -->
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span style>年级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>班级：</span>
              <Select v-model="studentClass"  style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>姓名：</span>
              <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 10px;">
              <span>学籍号：</span>
              <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success"  @click="exportData">成绩导出</Button>
            <Button type="success"  @click="pageToList">返回</Button>
          </div>
        </div>
        <!-- 第二行 -->
        <!-- <div style="margin-top: 15px;"  @keydown.enter="querySearch" >
          <span>姓名：</span>
          <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
          <span>学籍号：</span>
          <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
        </div> -->
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">
            数据明细
        </div>
        <Row>
          <div>
            <Table border max-height="550" :loading="loading" :columns="resultColumns" :data="resultData"></Table>
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
      loading: false,
      yearSemester:'',
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      gender:"",
      semesterOver:'',
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
      primaryList: [
        {
          grade: "",
          label: "全部"
        },
        {
          grade: 1,
          label: "一年级"
        },
        {
          grade: 2,
          label: "二年级"
        },
        {
          grade: 3,
          label: "三年级"
        },
        {
          grade: 4,
          label: "四年级"
        },
        {
          grade: 5,
          label: "五年级"
        },
        {
          grade: 6,
          label: "六年级"
        }
      ],
      middleList: [
        {
          grade: "",
          label: "全部"
        },
        {
          grade: 7,
          label: "七年级"
        },
        {
          grade: 8,
          label: "八年级"
        },
        {
          grade: 9,
          label: "九年级"
        }
      ],
      highList: [
        {
          grade: "",
          label: "全部"
        },
        {
          grade: 10,
          label: "高一"
        },
        {
          grade: 11,
          label: "高二"
        },
        {
          grade: 12,
          label: "高三"
        }
      ],
      collegeList: [
        {
          grade: "",
          label: "全部"
        },
        {
          grade: 13,
          label: "大一"
        },
        {
          grade: 14,
          label: "大二"
        },
        {
          grade: 15,
          label: "大三"
        },
        {
          grade: 16,
          label: "大四"
        }
      ],
      schoolGradeList: [],
      studentClass: "",
      classList: [
        {
          value: "",
          label: "全部"
        },
        {
          value: 1,
          label: "1班"
        },
        {
          value: 2,
          label: "2班"
        },
        {
          value: 3,
          label: "3班"
        },
        {
          value: 4,
          label: "4班"
        },
        {
          value: 5,
          label: "5班"
        },
        {
          value: 6,
          label: "6班"
        },
        {
          value: 7,
          label: "7班"
        },
        {
          value: 8,
          label: "8班"
        },
        {
          value: 9,
          label: "9班"
        },
        {
          value: 10,
          label: "10班"
        },
        {
          value: 11,
          label: "11班"
        },
        {
          value: 12,
          label: "12班"
        },
        {
          value: 13,
          label: "13班"
        },
        {
          value: 14,
          label: "14班"
        },
        {
          value: 15,
          label: "15班"
        },
        {
          value: 16,
          label: "16班"
        },
        {
          value: 17,
          label: "17班"
        },
        {
          value: 18,
          label: "18班"
        },
        {
          value: 19,
          label: "19班"
        },
        {
          value: 20,
          label: "20班"
        },
        {
          value: 21,
          label: "21班"
        },
        {
          value: 22,
          label: "22班"
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
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center"
          //   minWidth: 250
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center"
          //   width: 150
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
          }
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
          }
        },
        {
          title: "有效完成/考核总次数",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            if(row.exemptStatus=='1'){
              return h("div", '免试');
            }
            let haveCount = row.comboCount == null ? 0 : row.comboCount;
            let teacherCount =row.teacherCount == null ? 0 : row.teacherCount;
            let needCount =
              row.needExerciseCount == null ? 0 : row.needExerciseCount;
            const text = haveCount+teacherCount + "/" + needCount;
            return h("div", text);
          }
        },
        {
          title: "课后作业得分",
          key: "dateCount",
          align: "center",
          //   minWidth: 250
          render: (h, params) => {
            const row = params.row;
             if(row.exemptStatus=='1'){
               if(row.exemptType == '1'){
                  return h("div", '70');
               }else{
                  return h("div", '80');
               }

            }
             let haveCount = row.comboCount == null ? 0 : row.comboCount;
            let teacherCount =row.teacherCount == null ? 0 : row.teacherCount;
            let needCount =
              row.needExerciseCount == null ? 0 : row.needExerciseCount;
            if((haveCount+teacherCount) < needCount){
            let text = (haveCount+teacherCount) / needCount;
            let score= (text*100).toFixed(0);
            return h("div", score);
            }else{
              return h("div", 100);
            }

          }
        },
        {
          title: "上传视频数量",
          key: "videoCount",
          align: "center"
        },
         {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 120,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    disabled: params.row.videoCount>=1?false:true
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId,params.row.studentName,params.row.registerCode,params.row.gradeName + params.row.studentClass,params.row.gender)
                    }
                  }
                },
                "查看视频"
              )
            ])
          }
        }
      ],
      collegeColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center"
          //   minWidth: 250
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center"
          //   width: 150
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          }
        },
        {
          title: "学院",
          key: "collegeName",
          align: "center"
          //   width: 150
        },
        {
          title: "专业",
          key: "majorName",
          align: "center"
          //   width: 150
        },
        {
          title: "学级",
          key: "startSchool",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.startSchool + "级";
            return h("div", text);
          }
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.studentClass + "班";
            return h("div", text);
          }
        }
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
      total1: 0
    };
  },
  methods: {
     pageToList() {
      //返回
      this.$router.go(-1)
    },
    exportData(){
    var vm=this;
    if(typeof(vm.grade) == "undefined"){
                  vm.grade="";
              }
              if(typeof(vm.studentClass) == "undefined"){
                  vm.studentClass="";
              }
    let url =
      this.$axios.defaults.baseURL +
      '/v1/datafiles/exportHisExerciseStudentList?grade='+(vm.grade==99?'':vm.grade)+'&schoolId=1&studentClass=' +(vm.studentClass==99?'':vm.studentClass)+
       '&yearSemester=' + vm.yearSemester+'&studentName=' + vm.studentName+ '&registerCode=' + vm.registerCode+'&semesterOver=' + vm.semesterOver+
       '&token=' +sessionStorage.getItem('token')
    window.open(url)
    },
    getStudentInfoList(schoolId) {
     var vm = this;
      sessionStorage.setItem('hisExerciseManageStudent-grade',vm.grade);
      sessionStorage.setItem('hisExerciseManageStudent-studentClass',vm.studentClass);
      sessionStorage.setItem('hisExerciseManageStudent-registerCode',vm.registerCode);
      sessionStorage.setItem('hisExerciseManageStudent-studentName',vm.studentName);
      sessionStorage.setItem('hisExerciseManageStudent-pageNum',vm.pageNum);
      sessionStorage.setItem('hisExerciseManageStudent-pageSize',vm.pageSize);

      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        // gender:vm.gender,
        yearSemester:vm.yearSemester,
        semesterOver:vm.semesterOver
      };
      this.$axios
        .post("/v1/datafiles/queryHisExerciseStudentList", data)
        .then(res => {
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
    toDetail(studentId,studentName,registerCode,studentClass,gender){
      sessionStorage.setItem('hisExerciseStudentDetail-semesterOver',this.semesterOver)
      sessionStorage.setItem('hisExerciseStudentDetail-yearSemester',this.yearSemester)
      sessionStorage.setItem('hisExerciseStudentDetail-studentId',studentId)
      sessionStorage.setItem('hisExerciseStudentDetail-studentName',studentName)
      sessionStorage.setItem('hisExerciseStudentDetail-registerCode',registerCode)
      sessionStorage.setItem('hisExerciseStudentDetail-studentClass',studentClass)
       sessionStorage.setItem('hisExerciseStudentDetail-gender',gender)
      this.$router.push({ name: 'hisExerciseStudentDetail' })

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
        //gender:vm.gender,
        yearSemester:vm.yearSemester,
        semesterOver:vm.semesterOver
         
      };
      this.$axios
        .post("/v1/datafiles/queryHisStudentExerciseListCount", data)
        .then(res => {
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
    // restore() {
    //   var vm = this;
    //   vm.grade = "";
    //   vm.pageNo = 1;
    //   vm.pageSize = 10;
    //   vm.registerCode = "";
    //   vm.studentClass = "";
    //   vm.studentName = "";

    //   let schoolId = vm.schoolId;
    //   vm.querySearch();
    // },

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
  watch: {

  },
  created() {
    //  this.getProvinceList();
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

    let  grade = sessionStorage.getItem('hisExerciseManageStudent-grade');
    let  studentClass = sessionStorage.getItem('hisExerciseManageStudent-studentClass');
    let  registerCode = sessionStorage.getItem('hisExerciseManageStudent-registerCode');
    let  studentName = sessionStorage.getItem('hisExerciseManageStudent-studentName');
    let  pageNum = sessionStorage.getItem('hisExerciseManageStudent-pageNum');
    let  pageSize = sessionStorage.getItem('hisExerciseManageStudent-pageSize');

    let yearSemester = sessionStorage.getItem('hisExerciseManageStudent-yearSemester');
    vm.semesterOver = sessionStorage.getItem('hisExerciseManageStudent-semesterOver');
    vm.yearSemester = yearSemester;

    if(grade != null && grade != "" && grade != undefined && grade > 0){
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
    if(pageNum != null && pageNum != "" && pageNum != undefined && pageNum > 0){
        vm.pageNum = Number(pageNum);
    }
    if(pageSize != null && pageSize != "" && pageSize != undefined && pageSize > 0){
        vm.pageSize = Number(pageSize);
    }
    // vm.search()
    vm.search();
  }
};
</script>
