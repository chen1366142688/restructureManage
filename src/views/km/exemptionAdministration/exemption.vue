<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">免考管理</h2>
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
              <span>是否免考：</span>
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
            <div style="margin:5px 10px 5px 8px;">
              <span>学&nbsp;&nbsp;籍&nbsp;&nbsp;号：</span>
              <!-- <div class="input_label"><span>学籍号</span><span>：</span></div> -->
              <Input v-model="registerCode" placeholder="学生学籍号"  style="width: 120px;"/>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" style @click="querySearch">查询</Button>
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
                :current="pageNo"
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
import gradeData from '@/libs/grade'//年级
import classList from '@/libs/classList'//班级
import api from '@/api/baseApi'//班级
import util from '@/libs/util.js'
export default {
  name: "exemption",
  data() {
    return {
      loading: false,
      schoolId: "",
      schoolType: "",
      grade: "9999",
      testTypeId: 2,
      testTypeList: [
        {
          typeId: 2,
          typeName: "全部",
        },
        {
          typeId: 1,
          typeName: "免考",
        },
        {
          typeId: 0,
          typeName: "未免考",
        },
      ],
      schoolGradeList: [],
      studentClass: "9999",
      classList: classList,
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "学生姓名",
          key: "name",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 120,
        },
        {
          title: "年级",
          key: "grade",
          align: "center",
          minWidth: 90,
          render: (h, params)=>{
            let row = params.row;
            let gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级',]
            let text = gradeList[row.grade-1];
            return h("div", text);
          }
        },
        {
          title: "班级",
          key: "sportsClassName",
          align: "center",
          minWidth: 90,
        },
        {
          title: "是否免考",
          key: "isExempt",
          align: "center",
          minWidth: 90,
          render: (h, params) => {
            const row = params.row;
            const text = row.isExempt == '1' ? "免考" : "未免考";
            return h("div", text);
          },
        },
        {
          title: "免考类型",
          key: "exemptionType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;//增加三年连续免考和年度免考两种类型
            const text =
              row.exemptionType == "1"
                ? "三年免考"
                : row.exemptionType == "0"
                ? "年度免考"
                : "";
            return h("div", text);
          },
        },
        {
          title: "免考原因",
          key: "exemptionReason",
          align: "center",
          minWidth:120,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.exemptionReason == "1"
                ? "残疾"
                : row.exemptionReason == "0"
                ? "疾病"
                : "";
            return h("div", text);
          },
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
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      resultData: [],
      pageNo: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    //查询列表数据
    async getStudentExamExemptList() {
      let vm = this;
      vm.loading = true;
      let data = {
        "classId": vm.studentClass == '9999'?'':vm.studentClass,
        "grade": vm.grade == '9999'?'':vm.grade,
        "isExempt": vm.testTypeId == 2?'':vm.testTypeId,
        "pageNo": vm.pageNo,
        "pageSize": vm.pageSize,
        "registerCode": vm.registerCode,
        "schoolId": vm.schoolId,
        "studentName": vm.studentName,
      }
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: data});
      let res = await api.getExemptList(data)
      vm.loading = false;
      if (res.data.code == 10000) {
        vm.resultData = res.data.response;
      } else {
        if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg);
        }
      }
      /**列表数量**/
      let res1 = await api.countExemptList(data)
      if (res1.data.code == 10000) {
        this.total = res1.data.response;
      } else {
        if (res1.data.code > 39999) {
          this.$Message.info(res1.data.msg);
        }
      }
    },
    querySearch() {
      this.pageNo = 1;
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
      vm.getStudentExamExemptList();
    },
    toDetail(studentInfo) {
      this.$router.push({ name: "exemptionDetail" ,params:{studentInfo:studentInfo}});
    },
    pageNumChange(value) {
      if (this.pageNo != value) {
        this.pageNo = value;
        this.search();
      }
    },
    pageSizechange(value) {
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNo = 1;
        this.search();
      }
    },
  },
  watch: {},
  created() {
    let queryData = util.hasParams(this.$store, this.$route);
    if(queryData){//数据回显
      this.grade = queryData.grade == ""?"9999":queryData.grade;
      this.studentClass = queryData.classId == ""?"9999":queryData.classId;
      this.studentName = queryData.studentName
      this.registerCode = queryData.registerCode
      this.testTypeId = queryData.testTypeId == undefined?2:queryData.testTypeId
      this.pageNo = queryData.pageNo
      this.pageSize = queryData.pageSize
    }
  },
  mounted() {
    const vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType) {
      this.schoolGradeList = gradeData.inOf(schoolType)
    }
    vm.search();
  }
};
</script>