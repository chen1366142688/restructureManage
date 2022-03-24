<template>
  <div>
    <div>
      <h2>学生成绩上报</h2>
    </div>
    <div style="margin-top:15px;">
      <Card style="height: 60px;" :dis-hover="true">
          <div class="top-search">
              <div class="left-input"></div>
              <div class="right-btns">
                    <Button @click="pageToList" type="success">返回</Button>
                    <Button type="success" @click="reportData">上报</Button>
                    <Button type="success" @click="toExportStudent">初始数据导入</Button>
                    <!-- <Button type="success" @click="querySearch">查询</Button> -->
              </div>
          </div>
      </Card>
      <br />
      <Card style="height: 150px;" :dis-hover="true">
        <div>
          <p>当前数据</p>
          <Row>
            <div style>
              <Table border :loading="loading1" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </div>
      </Card>
      <br />
      <Card style="height: 600px;" :dis-hover="true">
        <div>
          <p>历史上报记录</p>
          <Row>
            <div style>
              <Table border :loading="loading" :columns="resultColumns1" :data="resultData1"></Table>
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
        </div>
      </Card>
    </div>
    <Modal v-model="modal1" width="360" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>提醒</span>
      </p>
      <div>
        <p style="text-align: center;">上报失败，有学生未完成全部项目考核。</p>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="checkStudent">查看提醒</Button>
      </div>
    </Modal>
    <Modal v-model="modal2" width="360" :closable="false" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>提醒</span>
      </p>
      <div>
        <p style="text-align: center;">上报成功。</p>
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="cancle">确定</Button>
      </div>
    </Modal>
    <Modal v-model="modal3" width="780" :mask-closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <span>尚未完成的学生列表</span>
      </p>
      <div style="height:600px;width:740px;">
        <Row>
          <div style>
            <Table border :loading="loading" :columns="resultColumnsHis" :data="resultDataHis"></Table>
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
      </div>
      <div slot="footer">
        <Button type="success" size="large" long @click="cancle1">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      loading: false,
      loading1: false,
      loading2: false,
      modal1: false,
      modal2: false,
      modal3: false,
      activityId: "",
      activityName: "",
      reportTf: true,
      resultColumns: [
        {
          title: "学期",
          key: "semesterName",
          align: "center",
          minWidth:100
        },
        {
          title: "上报学生",
          key: "reportStudentNum",
          align: "center",
          minWidth:100
        },
        {
          title: "体测平均分",
          key: "exportNum",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.reportStudentNum > 0 && row.schoolTestTotalScore>0
                ? (
                    row.schoolTestTotalScore /
                    row.reportStudentNum /
                    100
                  ).toFixed(2)
                : 0;
            return h("div", text);
          }
        },
        {
          title: "体测合格率",
          key: "dealNum1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.reportStudentNum > 0
                ? 100 *
                  (
                    (row.schoolTestPassStudent +
                      row.schoolTestGoodStudent +
                      row.schoolTestExcellentStudent) /
                    row.reportStudentNum
                  ).toFixed(2)
                : 0;
            return h("div", text + "%");
          }
        },
        {
          title: "体测优良率",
          key: "errorNum1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.reportStudentNum > 0
                ? (100 *
                  (
                    (row.schoolTestGoodStudent +
                      row.schoolTestExcellentStudent) /
                    row.reportStudentNum
                  )).toFixed(2)
                : 0;
            return h("div", text + "%");
          }
        },
        {
          title: "学科评价平均分",
          key: "createTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.finishStudent > 0
                ? (row.subjectTotalScore / row.finishStudent / 100).toFixed(2)
                : 0;
            return h("div", text);
          }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled: this.reportTf
                  },
                  style: {
                    // marginRight: "5px",
                    width: "120px"
                  },
                  on: {
                    click: () => {
                      this.toDetail();
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
      resultColumns1: [
        {
          title: "学期",
          key: "semesterName",
          align: "center",
          minWidth:100
        },
        {
          title: "上报学生",
          key: "reportStudentNum",
          align: "center",
          minWidth:100
        },
        {
          title: "体测平均分",
          key: "exportNum",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.reportStudentNum > 0 && row.schoolTestTotalScore>0
                ? (
                    row.schoolTestTotalScore /
                    row.reportStudentNum /
                    100
                  ).toFixed(2)
                : 0;
            return h("div", text);
          }
        },
        {
          title: "体测合格率",
          key: "dealNum1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.reportStudentNum > 0
                ? 100 *
                  (
                    (row.schoolTestPassStudent +
                      row.schoolTestGoodStudent +
                      row.schoolTestExcellentStudent) /
                    row.reportStudentNum
                  ).toFixed(2)
                : 0;
            return h("div", text + "%");
          }
        },
        {
          title: "体测优良率",
          key: "errorNum1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.reportStudentNum > 0
                ? (100 *
                  (
                    (row.schoolTestGoodStudent +
                      row.schoolTestExcellentStudent) /
                    row.reportStudentNum
                  )).toFixed(2)
                : 0;
            return h("div", text + "%");
          }
        },
        {
          title: "学科评价平均分",
          key: "createTime",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              row.reportStudentNum > 0
                ? (row.subjectTotalScore / row.reportStudentNum / 100).toFixed(2)
                : 0;
            return h("div", text);
          }
        },
        {
          title: "上报日期",
          key: "reportTime",
          align: "center",
          minWidth:100
        },
        {
          title: "上报人",
          key: "teacherName",
          align: "center",
          minWidth:100
        },
        {
          title: "状态",
          key: "reportStatus",
          align: "center",
          minWidth:100,
           render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =row.reportStatus=='1'?"上报成功":"上报失败" ;
            return h("div", text);
          }
        },
      ],
      resultData1: [],
      resultColumnsHis: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          }
        },
        {
          title: "学籍号",
          key: "registerCode",
          minWidth:100,
          align: "center"
        },
        {
          title: "班级",
          key: "reportStudentNum",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text =
              params.row.gradeId == 1
                ? "一年级"
                : params.row.gradeId == 2
                ? "二年级"
                : params.row.gradeId == 3
                ? "三年级"
                : params.row.gradeId == 4
                ? "四年级"
                : params.row.gradeId == 5
                ? "五年级"
                : params.row.gradeId == 6
                ? "六年级"
                : params.row.gradeId == 7
                ? "七年级"
                : params.row.gradeId == 8
                ? "八年级"
                : params.row.gradeId == 9
                ? "九年级"
                : params.row.gradeId == 10
                ? "高一"
                : params.row.gradeId == 11
                ? "高二"
                : params.row.gradeId == 12
                ? "高三"
                : "全校";

            return h("div", text + row.studentClass + "班");
          }
        },
        {
          title: "健康知识",
          key: "healthOver",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text = row.healthOver == "1" ? "已完成" : "未完成";
            return h("div", text);
          }
        },
        {
          title: "运动技能",
          key: "actionOver",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text = row.actionOver == "1" ? "已完成" : "未完成";
            return h("div", text);
          }
        },
        {
          title: "体能",
          key: "staminaOver",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text = row.staminaOver == "1" ? "已完成" : "未完成";
            return h("div", text);
          }
        },
        {
          title: "体测",
          key: "schoolTestOver",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            var vm = this;
            const row = params.row;
            let text = row.schoolTestOver == "1" ? "已完成" : "未完成";
            return h("div", text);
          }
        }
      ],
      resultDataHis: [],
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
      this.$router.go(-1);
    },
    cancle() {
      var vm = this;
      vm.modal2 = false;
      vm.getSchoolThisYearActivity();
    },
    cancle1() {
      var vm = this;
      vm.modal3 = false;
    },
    checkStudent() {
      var vm = this;
      vm.search2();
      vm.modal1 = false;
      vm.modal3 = true;
    },
    toDetail() {
      var vm = this;
      sessionStorage.setItem(
        "subjectReport-subjectReportDetail-activityId",
        vm.activityId
      );
      this.$router.push({ name: "subjectReportDetail" });
    },
    toExportStudent() {
      var vm = this;
      sessionStorage.setItem(
        "schoolTestDetail-schoolTestStudentExport-activityId",
        vm.activityId
      );
      sessionStorage.setItem(
        "schoolTestDetail-schoolTestStudentExport-activityName",
        vm.activityName
      );
      sessionStorage.setItem(
        "schoolTestDetail-schoolTestStudentExport-taskType",
        "3"
      );
      this.$router.push({ name: "schoolTestStudentExport" });
    },
    getSchoolThisYearActivity() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get("/v1/subjectReport/getSchoolThisYearActivity")
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.activityId = data.activityId;
            vm.activityName = data.activityName;
            vm.search();
            vm.getSubjectReportList(vm.activityId, "1");
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getSubjectReportList(activityId, type) {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          "/v1/subjectReport/getSubjectReportList?schoolId=1&activityId=" +
            activityId +
            "&type=" +
            type +
            "&pageNo=" +
            vm.pageNum +
            "&pageSize=" +
            vm.pageSize
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            if (type == "1") {
              vm.resultData = data;
              if (
                data[0].reportStudentNum - data[0].notSchoolStudent ==
                data[0].finishStudent && data[0].finishStudent>0
              ) {
                vm.reportTf = false;
              } else {
                vm.reportTf = true;
              }
            } else {
              vm.resultData1 = data;
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countSubjectReportList() {
      var vm = this;
      vm.loading = true;
      this.$axios.get("/v1/subjectReport/countSubjectReportList").then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          vm.total = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    getNotFinishStudentList() {
      var vm = this;
      vm.loading2 = true;
      this.$axios
        .get(
          "/v1/subjectReport/getNotFinishStudentList?activityId=" +
            vm.activityId +
            "&pageNo=" +
            vm.pageNum1 +
            "&pageSize=" +
            vm.pageSize1
        )
        .then(res => {
          vm.loading2 = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.resultDataHis = data;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countNotFinishStudentList() {
      var vm = this;
      this.$axios
        .get(
          "/v1/subjectReport/countNotFinishStudentList?activityId=" +
            vm.activityId
        )
        .then(res => {
          if (res.data.code == 10000) {
            vm.total1 = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    reportData() {
      var vm = this;
      if (vm.reportTf) {
        vm.modal1 = true;
        return false;
      }
      this.$axios
        .get("/v1/subjectReport/reportSubject?activityId=" + vm.activityId)
        .then(res => {
          if (res.data.code == 10000) {
            if (res.data.response.code == 1) {
              vm.modal2 = true;
            } else {
              vm.$Message.info(res.data.response.msg);
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
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
      vm.getSubjectReportList(vm.activityId, "2");
      vm.countSubjectReportList();
    },
    search2() {
      var vm = this;
      vm.getNotFinishStudentList();
      vm.countNotFinishStudentList();
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
        this.search2();
      }
    },
    pageSizechange1(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize1 = value;
        this.pageNum1 = 1;
        this.search2();
      }
    }
  },
  watch: {},
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm = this;
    vm.getSchoolThisYearActivity();
  }
};
</script>
