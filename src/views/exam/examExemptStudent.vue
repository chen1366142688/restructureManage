<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">免试管理</h2>
    </div>
    <div>
      <Card>
        <div @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>年<span style="visibility: hidden;">占位</span>级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>班<span style="visibility: hidden;">占位</span>级：</span>
              <Select v-model="studentClass" style="width:120px;">
                <Option
                  v-for="item in classList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>是否免试：</span>
              <Select v-model="testTypeId" style="width:120px;">
                <Option
                  v-for="item in testTypeList"
                  :value="item.typeId"
                  :key="item.typeId"
                >{{ item.typeName }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>姓<span style="visibility: hidden;">占位</span>名：</span>
              <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 10px;">
              <span>学籍号<span style="visibility: hidden;">位</span>：</span>
              <Input v-model="registerCode" placeholder="学生学籍号" style="width: 120px;" />
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" style @click="querySearch">查询</Button>
            <Button type="success" @click="exportData">导出EXCEL</Button>
          </div>
        </div>
      </Card>
      <br />
      <div>
        <Card>
          <div style="font-size:18px;height:40px;">数据明细</div>
          <Row>
            <div style>
              <Table
                border
                :loading="loading"
                max-height="530"
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
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      schoolId: "",
      activityId: "",
      activityName: "",
      activityList: [],
      schoolType: "",
      grade: "",
      testTypeId: "",
      testTypeList: [
        {
          typeId: 2,
          typeName: "全部"
        },
        {
          typeId: 1,
          typeName: "免试"
        },
        {
          typeId: 0,
          typeName: "未免试"
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
      resultColumns: [],
      normal: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          width: 150
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
            width: 150
        },
        {
          title: "年级",
          key: "gradeName",
          align: "center",
            width: 150
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.studentClass + "班";
            return h("div", text);
          }
        },
        {
          title: "是否免试",
          key: "exemptId",
          align: "center",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            const color = row.exemptId != null ? "green" : "red";
            const text = row.exemptId != null ? "免试" : "需测试";
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color
                }
              },
              text
            );
          }
        },
        {
          title: "免试类型",
          key: "exemptType",
          align: "center",
          width: 150,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.exemptType == "1"
                ? "疾病"
                : row.exemptType == "2"
                ? "残疾"
                : "";
            return h("div", text);
          }
        },
        {
          title: "免试项目",
          key: "exemptTestName",
          align: "center",
          render: (h, params) => {
                        const row = params.row;
                        var text="";
                        if(row.exemptTestName){

                            let list=row.exemptTestName.split(',')
                            // console.log(list)
                            for(var i=0;i<list.length;i++){
                                text+="<p><lable>"+list[i]+"</lable></p>"
                            }

                        }else{
                          text="--"
                        }

                        return h("div", {
                            domProps: {
                            innerHTML: text
                            }
                        });
                },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
         width: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      resultData: [],
      isCollege: false,
      pageNum: 1,
      pageSize: 10,
      total: 0
    };
  },
  methods: {
    exportStudentTesOldData() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        '/v1/healthyExport/exportStudentHealthyQuestionList?paperId=6'+
        '&token=' +
        sessionStorage.getItem('token');
      window.open(url)
    },
    getStudentExamExemptList() {
      var vm = this;
      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        testTypeId: vm.testTypeId
      };
      sessionStorage.setItem(
        "examExemptStudent-getStudentInfoList-pageNum",
        vm.pageNum
      );
      sessionStorage.setItem(
        "examExemptStudent-getStudentInfoList-pageSize",
        vm.pageSize
      );
      sessionStorage.setItem(
        "examExemptStudent-getStudentInfoList-grade",
        vm.grade
      );
      sessionStorage.setItem(
        "examExemptStudent-getStudentInfoList-studentClass",
        vm.studentClass
      );
      sessionStorage.setItem(
        "examExemptStudent-getStudentInfoList-testTypeId",
        vm.testTypeId
      );
      sessionStorage.setItem(
        "examExemptStudent-getStudentInfoList-studentName",
        vm.studentName
      );
      sessionStorage.setItem(
        "examExemptStudent-getStudentInfoList-registerCode",
        vm.registerCode
      );

      this.$axios
        .post("/v1/examitemexempt/getStudentExamExemptList", data)
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
    countStudentList(schoolId) {
      var vm = this;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        testTypeId: vm.testTypeId
      };
      this.$axios
        .post("/v1/examitemexempt/countStudentExamExemptList", data)
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
      vm.getStudentExamExemptList();
      vm.countStudentList();
    },
    restore() {
      var vm = this;

      // vm.activityId= vm.activityId,
      vm.grade = "";
      vm.pageNum = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = "";
      vm.studentName = "";
      vm.college = "";
      vm.major = "";
      vm.testTypeId = "";

      let schoolId = vm.schoolId;
      vm.getStudentInfoList(schoolId);
      vm.countStudentList(schoolId);
    },

    toDetail(studentId) {
      var vm = this;
      sessionStorage.setItem(
        "examExemptStudent-examExemptDetail-studentId",
        studentId
      );
      console.log(studentId)
      this.$router.push({ name: "examExemptDetail" });
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
        this.pageSize = value;
        this.pageNum = 1;
        this.search();
      }
    },
    exportData() {
      var vm = this;
      if(typeof(vm.grade) == "undefined"){
                    vm.grade="";
                }
                 if(typeof(vm.registerCode) == "undefined"){
                    vm.registerCode="";
                }
                if(typeof(vm.studentClass) == "undefined"){
                    vm.studentClass="";
                }

                if(typeof(vm.studentName) == "undefined"){
                    vm.studentName="";
                }
                if(typeof(vm.testTypeId) == "undefined"){
                    vm.testTypeId="";
                }

      let url =
        this.$axios.defaults.baseURL +
        "/v1/examitemexempt/exportExamExemptList?schoolId=" +
        vm.schoolId +
        "&grade=" +
        vm.grade +
        "&registerCode=" +
        vm.registerCode +
        "&studentClass=" +
        vm.studentClass +
        "&studentName=" +
        vm.studentName +
         "&testTypeId=" +
        vm.testTypeId +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
      // vm.postExcelFile(data,url);
    }
  },
  watch: {},
  created() {},
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType) {
      vm.resultColumns = vm.normal;
      if ("0" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList);
      }
      // if("1"==schoolType){
      //     vm.schoolGradeList=vm.schoolGradeList.concat(vm.primaryList).concat(vm.middleList).concat(vm.highList).concat(vm.collegeList);
      // }
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
      }

      let tempPageSize = sessionStorage.getItem(
        "examExemptStudent-getStudentInfoList-pageSize"
      );
      let tempgrade = sessionStorage.getItem(
        "examExemptStudent-getStudentInfoList-grade"
      );
      let tempstudentClass = sessionStorage.getItem(
        "examExemptStudent-getStudentInfoList-studentClass"
      );
      let tempstudentName = sessionStorage.getItem(
        "examExemptStudent-getStudentInfoList-studentName"
      );
      let tempregisterCode = sessionStorage.getItem(
        "examExemptStudent-getStudentInfoList-registerCode"
      );
      let temptestTypeId = sessionStorage.getItem(
        "examExemptStudent-getStudentInfoList-testTypeId"
      );

      if (
        tempPageSize != null &&
        tempPageSize != undefined &&
        tempPageSize > 0
      ) {
        vm.pageNum = Number(
          sessionStorage.getItem("examExemptStudent-getStudentInfoList-pageNum")
        );
        vm.pageSize = Number(
          sessionStorage.getItem("examExemptStudent-getStudentInfoList-pageSize")
        );
        if (tempgrade != null && tempgrade != undefined && tempgrade > 0) {
          vm.grade = Number(tempgrade);
        }
        if (
          tempstudentClass != null &&
          tempstudentClass != undefined &&
          tempstudentClass > 0
        ) {
          vm.studentClass = Number(tempstudentClass);
        }
        if (
          tempstudentName != null &&
          tempstudentName != undefined &&
          tempstudentName != ""
        ) {
          vm.studentName = tempstudentName;
        }
        if (
          tempregisterCode != null &&
          tempregisterCode != undefined &&
          tempregisterCode != ""
        ) {
          vm.registerCode = tempregisterCode;
        }
        if (
          temptestTypeId != null &&
          temptestTypeId != undefined &&
          temptestTypeId != ""
        ) {
          vm.testTypeId = Number(temptestTypeId);
        }
      }
    }

    vm.search();
  }
};
</script>
