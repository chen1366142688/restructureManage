<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生健康监测</h2>
    </div>
    <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
        <TabPane name="one" label="基本情况">
            <div>
                <div>
                    <Card>
                        <div style="font-size:18px;height:40px;">数据概览</div>
                        <Row>
                            <div style>
                            <Table
                                border
                                :loading="loading"
                                max-height="92"
                                :columns="baseStatistical"
                                :data="baseStatisticalData"
                            ></Table>
                            </div>
                        </Row>
                    </Card>
                </div>
                <Card style="margin-top:20px;">
                    <div style="font-size:18px;height:40px;">数据明细</div>
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
                                <span>身体状况：</span>
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
        </TabPane>
      <TabPane name="two" label="健康状况">
          <div>
            <Card style="margin-top:20px;">
                <div style="font-size:18px;height:40px;">数据明细</div>
                <div class="top-search">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span >日期：</span>
                            <DatePicker type="date" v-model="reportTime" placeholder="选择日期" style="width: 120px"></DatePicker>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>年级：</span>
                            <Select v-model="dayGradeId" style="width:120px;">
                                <Option
                                    v-for="item in schoolGradeList"
                                    :value="item.grade"
                                    :key="item.grade"
                                >{{ item.label }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>班级：</span>
                            <Select v-model="dayStudentClass" style="width:120px;">
                                <Option
                                    v-for="item in classList"
                                    :value="item.value"
                                    :key="item.value"
                                >{{ item.label }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="right-btns">
                        <Button type="success" style @click="querySearch1">查询</Button>
                    </div>
                </div>
              <Row>
                <div style="margin-top:20px;">
                  <Table
                    border
                    :loading="loading"
                    max-height="530"
                    :columns="dayResultColumns"
                    :data="dayResultData"
                  ></Table>
                </div>
                <br />
                <div style="float: right;">
                  <Page
                    :total="total1"
                    :current="pageNum1"
                    :page-size="pageSize1"
                    @on-change="pageNumChange1"
                    @on-page-size-change="pageSizechange1"
                    show-total
                    show-sizer
                  ></Page>
                </div>
              </Row>
            </Card>
          </div>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      selectTabName:'',
      schoolId: "",
      schoolType: "",
      baseGradeId: "",
      dayGradeId: "",
      reportTime:'',
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
      dayStudentClass: '',
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
              name:'身体健康无异常',
              value:1
          },
          {
              name:'自我隔离观察中',
              value:2
          },
          {
              name:'医院隔离观察中',
              value:3
          },
          {
              name:'确认患病',
              value:4
          },
          {
              name:'其他',
              value:5
          },
      ],
      studentName: "",
      baseStatistical:[
          {
          title: "医院隔离人数",
          key: "isolationNum",
          align: "center",
          minWidth:100
        },
        {
          title: "确认患病人数",
          key: "illNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "近期接触过湖北、重庆来蓉人数",
          key: "contactHbCqNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "近期接触过成都市范围外来蓉人数",
          key: "contactNotCdNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "1月8日后去过成都市外",
          key: "leaveCdNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "小区或者周围1公里范围内有疑似或感染人员数量",
          key: "unusualConditionNum",
          align: "center",
          minWidth:100,
        },
      ],
      baseStatisticalData:[],
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
          title: "近期是否接触湖北、重庆来蓉人员",
          key: "contactHbcq",
          align: "center",
          minWidth:100,
           render: (h, params) => {
            const row = params.row;
            const text = row.reportsStatus == '1' ? row.contactHbcq == '1' ?"接触":"未接触" : "";
            return h("div", text);
          }
        },
        {
          title: "是否接触过成都市范围外来蓉人员",
          key: "contactNotChengdu",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.reportsStatus == '1' ? row.contactNotChengdu == '1' ?"接触":"未接触" : "";
            return h("div", text);
          }
        },
        {
          title: "小区及周围1公里范围内是否有疑似或感染人员",
          key: "haveUnusualCondition",
          align: "center",
          minWidth:100,
           render: (h, params) => {
            const row = params.row;
            const text = row.reportsStatus == '1' ? row.haveUnusualCondition == '1' ?"有":"无" : "";
            return h("div", text);
          }
        },
        {
          title: "1月8日后是否去过成都市外",
          key: "leaveChengdu",
          align: "center",
          minWidth:100,
           render: (h, params) => {
            const row = params.row;
            const text = row.reportsStatus == '1' ? row.leaveChengdu == '1' ?"是":"否" : "";
            return h("div", text);
          }
        },
        {
          title: "孩子及家人身体状况",
          key: "healthStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.reportsStatus == '1' ? (row.healthStatus == '1' ?"身体健康无异常":row.healthStatus == '2' ?"自我隔离观察中":
            row.healthStatus == '3' ?"医院隔离观察中":
            row.healthStatus == '4' ?"确认患病":
            row.healthStatus == '5' ?row.healthStatusOther:"" ): "";
            return h("div", text);
          }
        }
      ],
      baseDetailData:[],
      dayResultColumns:[
        {
          title: "日期",
          key: "dayDate",
          align: "center",
          minWidth:100,
        },
        {
          title: "上报人数/总人数",
          key: "reportNum",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            const text = row.reportNum + "/"+row.totalNum;
            return h("div", text);
          }
        },
        {
          title: "上报异常人数",
          key: "abnormalNum",
          align: "center",
          minWidth:100,
        },
        {
          title: "上报正常人数",
          key: "normalNum",
          align: "center",
          minWidth:100,
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
                      this.toDetail(params.row.dayDate);
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      dayResultData:[],
      isCollege: false,
      pageNum: 1,
      pageSize: 10,
      total: 0,
      pageNum1: 1,
      pageSize1: 10,
      total1: 0
    };
  },
  methods: {
      selectTabs(name){
        this.selectTabName = name;
        sessionStorage.setItem('healthDetection-healthDetection-selectTabName',this.selectTabName);
     },
      getNCPBaseInfo(){
      var vm=this;
        this.$axios.get("/v1/healthDetection/getNCPBaseInfo").then(res => {
        if (res.data.code == 10000) {
            vm.baseStatisticalData.push(res.data.response)
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    getBaseDetailList() {
      var vm = this;
      vm.loading = true;
      let data = {
        "gradeId": vm.baseGradeId==999?"": vm.baseGradeId,
        "healthStatus": vm.healthStatus==999?"": vm.healthStatus,
        "pageNo": vm.pageNum,
        "pageSize": vm.pageSize,
        "reportsStatus": vm.reportStatus==999?"": vm.reportStatus,
        "studentClass": vm.baseStudentClass==999?"": vm.baseStudentClass,
        "studentName": vm.studentName
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
        .post("/v1/healthDetection/getBaseDetailList", data)
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
    countBaseDetailList() {
      var vm = this;
      let data = {
        "gradeId": vm.baseGradeId==999?"": vm.baseGradeId,
        "healthStatus": vm.healthStatus==999?"": vm.healthStatus,
        "pageNo": vm.pageNum,
        "pageSize": vm.pageSize,
        "reportsStatus": vm.reportStatus==999?"": vm.reportStatus,
        "studentClass": vm.baseStudentClass==999?"": vm.baseStudentClass,
        "studentName": vm.studentName
        }
      this.$axios
        .post("/v1/healthDetection/countBaseDetailList", data)
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
    getNCPDayStatisticalList() {
      var vm = this;
      vm.loading = true;
      let data = {
        "gradeId": vm.dayGradeId==999?"": vm.dayGradeId,
        "dateTime": vm.dateToStr(vm.reportTime),
        "pageNo": vm.pageNum1,
        "pageSize": vm.pageSize1,
        "studentClass": vm.dayStudentClass==999?"": vm.dayStudentClass
        }
      sessionStorage.setItem(
        "healthDetection-getNCPDayStatisticalList-pageNum",
        vm.pageNum
      );
      sessionStorage.setItem(
        "healthDetection-getNCPDayStatisticalList-pageSize",
        vm.pageSize
      );
      sessionStorage.setItem(
        "healthDetection-getNCPDayStatisticalList-gradeId",
        vm.dayGradeId
      );
      sessionStorage.setItem(
        "healthDetection-getNCPDayStatisticalList-studentClass",
        vm.dayStudentClass
      );
      sessionStorage.setItem(
        "healthDetection-getNCPDayStatisticalList-dateTime",
        vm.reportTime
      );

      this.$axios
        .post("/v1/healthDetection/getNCPDayStatisticalList", data)
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.dayResultData = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countNCPDayStatisticalList() {
      var vm = this;
      let data = {
        "gradeId": vm.dayGradeId==999?"": vm.dayGradeId,
        "dateTime":  vm.dateToStr(vm.reportTime),
        "pageNo": vm.pageNum1,
        "pageSize": vm.pageSize1,
        "studentClass": vm.dayStudentClass==999?"": vm.dayStudentClass
        }
      this.$axios
        .post("/v1/healthDetection/countNCPDayStatisticalList", data)
        .then(res => {
          if (res.data.code == 10000) {
            this.total1 = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    dateToStr(datetime){
        if(!datetime){
            return "";
        }
        var dateTime = new Date(datetime);
        var year = dateTime.getFullYear();
        var month = dateTime.getMonth()+1;//js从0开始取
        var date = dateTime.getDate();
        var hour = dateTime.getHours();
        var minutes = dateTime.getMinutes();
        var second = dateTime.getSeconds();
 
        if(month<10){
            month = "0" + month;
        }
        if(date<10){
            date = "0" + date;
        }
        if(hour <10){
            hour = "0" + hour;
        }
        if(minutes <10){
            minutes = "0" + minutes;
        }
        if(second <10){
            second = "0" + second ;
        }
 
        return year+"-"+month+"-"+date;
    },
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      this.search();
    },
    querySearch1() {
      this.pageNum1 = 1;
      this.pageNo1= 1;
      this.search1();
    },
    search() {
      var vm = this;
      vm.getBaseDetailList();
      vm.countBaseDetailList();
    },
    search1() {
      var vm = this;
      vm.getNCPDayStatisticalList();
      vm.countNCPDayStatisticalList();
    },
    toDetail(dayDate) {
      var vm = this;
      sessionStorage.setItem(
        "healthDetection-dayList-dayDate",
        dayDate
      );
      this.$router.push({ name: "dayList" });
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
    pageNumChange1(value) {
      //页码改变方法处理
      if (this.pageNum1 != value) {
        this.pageNum1 = value;
        this.search();
      }
    },
    pageSizechange1(value) {
      //页面大小改变方法处理
      if (this.pageSize1 != value) {
        this.pageSize1 = value;
        this.pageNum1 = 1;
        this.search();
      }
    },
    
  },
  watch: {},
  created() {},
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let selectTabNameInfo = sessionStorage.getItem("healthDetection-healthDetection-selectTabName");
    if(selectTabNameInfo == null || selectTabNameInfo  == "" || selectTabNameInfo == undefined){
        vm.selectTabName = "one";
    }else{
        vm.selectTabName = selectTabNameInfo;
    }
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

      let pageNo1= sessionStorage.getItem("healthDetection-getNCPDayStatisticalList-pageNum");
      let pageSize1=sessionStorage.getItem("healthDetection-getNCPDayStatisticalList-pageSize");
      let dayGradeId=sessionStorage.getItem("healthDetection-getNCPDayStatisticalList-gradeId");
      let dayStudentClass=sessionStorage.getItem("healthDetection-getNCPDayStatisticalList-studentClass" );
      let reportTime=sessionStorage.getItem( "healthDetection-getNCPDayStatisticalList-dateTime");

      if(pageNo1){
            vm.pageNum1=Number(pageNo1)
        }
        if(pageSize1){
            vm.pageSize1=Number(pageSize1)
        }
        if(dayGradeId){
            vm.dayGradeId=Number(dayGradeId)
        }
        if(dayStudentClass){
            vm.dayStudentClass=Number(dayStudentClass)
        }
        if(reportTime){
            vm.reportTime=reportTime
        }
    }
    vm.getNCPBaseInfo();
    vm.search();
    vm.search1();
  }
};
</script>