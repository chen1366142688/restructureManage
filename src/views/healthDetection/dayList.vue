<template>
    <div style="padding-left:10px;">
        <h2 style="margin-top:15px;margin-bottom:13px;">学生健康监测</h2>
        <div>
            <Card style="margin-top:20px;">
                <div class="top-search">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>年<span style="visibility:hidden">班级</span>级：</span>
                            <Select v-model="baseGradeId" style="width:120px;">
                                <Option
                                v-for="item in schoolGradeList"
                                :value="item.grade"
                                :key="item.grade"
                                >{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>班<span style="visibility:hidden">班级</span>级：</span>
                            <Select v-model="baseStudentClass" style="width:120px;">
                                <Option
                                    v-for="item in classList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>上报状态：</span>
                            <Select v-model="reportStatus" style="width:120px;">
                            <Option
                                v-for="item in reportStatusList"
                                :value="item.value"
                                :key="item.value"
                            >{{ item.name }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>学生姓名：</span>
                            <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
                        </div>
                        <div style="margin:5px 20px;">
                            <span>健康状况：</span>
                            <Select v-model="healthStatus" style="width:120px;">
                                <Option
                                    v-for="item in healthStatusList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.name }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="right-btns">
                        <Button type="success" style @click="querySearch">查询</Button>
                        <!-- <Button type="success" @click="exportData">导出EXCEL</Button> -->
                    </div>
                </div>
                <Row>
                    <div style="margin-top:20px;">
                        <Table
                            border
                            :loading="loading"
                            max-height="530"
                            :columns="baseDetail"
                            :data="baseDetailData"
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
      loading: false,
      dayDate:'',
      schoolId: "",
      schoolType: "",
      baseGradeId: "",
      primaryList: [
        {
          grade: 999,
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
          grade:999,
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
          grade: 999,
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
          grade: 999,
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
      baseStudentClass: '',
      classList: [
        {
          value: 999,
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
          label: "23班"
        },
        {
          value: 24,
          label: "24班"
        },
        {
          value: 25,
          label: "25班"
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
      reportStatus:'',
      reportStatusList:[
          {
              name:'全部',
              value:999
          },
          {
              name:'已上报',
              value:1
          },
          {
              name:'未上报',
              value:2
          },
      ],
      healthStatus:'',
      healthStatusList:[
          {
              name:'全部',
              value:999
          },
          {
              name:'正常',
              value:1
          },
          {
              name:'异常',
              value:2
          },
      ],
      studentName: "",
      baseDetail: [
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
          title: "年级",
          key: "gradeId",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return h('div', params.row.gradeId == 1 ? '一年级':
            params.row.gradeId==2? '二年级':
            params.row.gradeId ==3?'三年级':
            params.row.gradeId ==4?'四年级':
            params.row.gradeId ==5?'五年级':
            params.row.gradeId ==6?'六年级':
            params.row.gradeId ==7?'七年级':
            params.row.gradeId ==8?'八年级':
            params.row.gradeId ==9?'九年级':
            params.row.gradeId ==10?'高一':
            params.row.gradeId ==11?'高二':
            params.row.gradeId ==12?'高三':'全校')
          }
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.studentClass + "班";
            return h("div", text);
          }
        },
        {
          title: "上报状态",
          key: "exemptId",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.reportsStatus == '1' ? "已上报" : "未上报";
            return h("div", text);
          }
        },
        {
          title: "健康状态",
          key: "abnormalStatus",
          align: "center",
          minWidth:100,
           render: (h, params) => {
            const row = params.row;
            const text = row.reportsStatus == '1' ? row.abnormalStatus == '1' ?"异常":"正常" : "";
            return h("div", text);
          }
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
                    type: "success",
                    // disabled:params.row.dayId?false:true
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId,params.row.childrenId,params.row.dayId,params.row.studentName);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      baseDetailData:[],
      isCollege: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
     
    };
  },
  methods: {
    getDayStudentList() {
      var vm = this;
      vm.loading = true;
      let data = {
        "gradeId": vm.baseGradeId==999?"": vm.baseGradeId,
        "healthStatus": vm.healthStatus==999?"": vm.healthStatus,
        "pageNo": vm.pageNum,
        "pageSize": vm.pageSize,
        "reportsStatus": vm.reportStatus==999?"": vm.reportStatus,
        "studentClass": vm.baseStudentClass==999?"": vm.baseStudentClass,
        "studentName": vm.studentName,
        "dateTime":sessionStorage.getItem("healthDetection-dayList-dayDate")
        }
      sessionStorage.setItem(
        "healthDetection-getBaseDetailList-pageNum",
        vm.pageNum
      );
      sessionStorage.setItem(
        "healthDetection-getBaseDetailList-pageSize",
        vm.pageSize
      );
      sessionStorage.setItem(
        "healthDetection-getBaseDetailList-gradeId",
        vm.baseGradeId
      );
      sessionStorage.setItem(
        "healthDetection-getBaseDetailList-baseStudentClass",
        vm.baseStudentClass
      );
      sessionStorage.setItem(
        "healthDetection-getBaseDetailList-healthStatus",
        vm.healthStatus
      );
      sessionStorage.setItem(
        "healthDetection-getBaseDetailList-reportStatus",
        vm.reportStatus
      );
      sessionStorage.setItem(
        "healthDetection-getBaseDetailList-studentName",
        vm.studentName
      );

      this.$axios
        .post("/v1/healthDetection/getDayStudentList", data)
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.baseDetailData = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countDayStudentList() {
      var vm = this;
      let data = {
        "gradeId": vm.baseGradeId==999?"": vm.baseGradeId,
        "healthStatus": vm.healthStatus==999?"": vm.healthStatus,
        "pageNo": vm.pageNum,
        "pageSize": vm.pageSize,
        "reportsStatus": vm.reportStatus==999?"": vm.reportStatus,
        "studentClass": vm.baseStudentClass==999?"": vm.baseStudentClass,
        "studentName": vm.studentName,
        "dateTime":sessionStorage.getItem("healthDetection-dayList-dayDate")
        }
      this.$axios
        .post("/v1/healthDetection/countDayStudentList", data)
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
      vm.getDayStudentList();
      vm.countDayStudentList();
    },
    
    toDetail(studentId,childrenId,dayId,studentName) {
      var vm = this;
      sessionStorage.setItem("dayList-childrenNCPDetailInfo-studentId",studentId);
      sessionStorage.setItem("dayList-childrenNCPDetailInfo-childrenId",childrenId);
      sessionStorage.setItem("dayList-childrenNCPDetailInfo-dayId",dayId);
      sessionStorage.setItem("dayList-childrenNCPDetailInfo-studentName",studentName);
      console.log(childrenId)
      this.$router.push({ name: "childrenNCPDetailInfo" });
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
    
  },
  watch: {},
  created() {},
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this; 
    vm.dayDate = sessionStorage.getItem("healthDetection-dayList-dayDate");
    
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType) {
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

        let pageNo=sessionStorage.getItem("healthDetection-getBaseDetailList-pageNum");
        let pageSize=  sessionStorage.getItem("healthDetection-getBaseDetailList-pageSize");
        let baseGradeId=  sessionStorage.getItem("healthDetection-getBaseDetailList-gradeId");
        let baseStudentClass=  sessionStorage.getItem("healthDetection-getBaseDetailList-baseStudentClass");
        let healthStatus=  sessionStorage.getItem("healthDetection-getBaseDetailList-healthStatus");
        let reportStatus= sessionStorage.getItem("healthDetection-getBaseDetailList-reportStatus");
        let studentName= sessionStorage.getItem("healthDetection-getBaseDetailList-studentName");

        if(pageNo){
            vm.pageNum=Number(pageNo)
        }
        if(pageSize){
            vm.pageSize=Number(pageSize)
        }
        if(baseGradeId){
            vm.baseGradeId=Number(baseGradeId)
        }
        if(baseStudentClass){
            vm.baseStudentClass=Number(baseStudentClass)
        }
        if(healthStatus){
            vm.healthStatus=Number(healthStatus)
        }
        if(reportStatus){
            vm.reportStatus=Number(reportStatus)
        }
        if(studentName){
            vm.studentName=studentName
        }
      
    }
    vm.search();
  }
};
</script>