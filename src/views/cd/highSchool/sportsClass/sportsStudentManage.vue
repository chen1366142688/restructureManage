
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">体育课班级批量导入</h2>
    </div>
    <div>
      <Card style="padding-top:10px;" :dis-hover="true">
        <div style="margin-top: 10px">
          <Button
            style="margin-left:900px;width:120px;"
            type="success"
            @click="exportStudentPre"
          >导出模版格式</Button>

          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="handleSuccess"
            :format="['xls','xlsx']"
            :max-size="20480"
            :on-format-error="handleFormatError"
            :on-exceeded-size="handleMaxSize"
            :before-upload="handleBeforeUpload"
            :multiple="false"
            name="muFiles"
            type="select"
            :action="updateUrl"
            style="display: inline-block;margin-left:40px;"
          >
            <Button type="success">批量导入班级和成员</Button>
            <i style="color:#F87D00;padding-top:5px;"></i>
          </Upload>

          <Button @click="pageToList" style="margin-left:40px;width:120px;" type="success">返回</Button>
        </div>
        <div style="margin-top: 20px">
          <Row>
            <div style>
              <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
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

    <Modal v-model="exportStatus" :mask-closable="false" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <span style>导入中，请稍等</span>
      </div>
      <div slot="footer"></div>
    </Modal>

    <Modal
      v-model="allStudentStasus"
      :mask-closable="false"
      width="360"
      @on-ok="exportAllStudent"
      @on-cancel="cancelexportAllStudent"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <span>导出的学期：</span>
        <Select v-model="allSemester" style="width:120px;">
          <Option
            v-for="item in semesterYearList"
            :value="item.yearSemester"
            :key="item.yearSemester"
          >{{ item.semesterName }}</Option>
        </Select>
      </div>
      <!-- <div slot="footer"></div> -->
    </Modal>
    <Modal
      v-model="allClassPlanStasus"
      :mask-closable="false"
      width="360"
      @on-ok="exportAllClassPlan"
      @on-cancel="cancelexportAllStudent"
    >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>提示</span>
      </p>
      <div style="text-align:center">
        <span>导出的学期：</span>
        <Select v-model="allSemester" style="width:120px;">
          <Option
            v-for="item in semesterYearList"
            :value="item.yearSemester"
            :key="item.yearSemester"
          >{{ item.semesterName }}</Option>
        </Select>
      </div>
      <!-- <div slot="footer"></div> -->
    </Modal>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      updateUrlPlan: "",
      loading: false,
      loading2: false,
      isCollege: true,
      allStudentStasus: false,
      allClassPlanStasus: false,
      allSemester: "",
      semesterYear: "",
      semesterYearList: [],
      schoolId: "",
      loading: false,
      exportStatus: false,
      updateUrl: "",
      taskName: "",
      resultColumns: [
        {
          title: "任务名称",
          key: "taskName",
          align: "center",
        },
        {
          title: "导入人员",
          key: "teacherName",
          align: "center",
        },
        {
          title: "导入数量",
          key: "importNum",
          align: "center",
        },
        {
          title: "已处理数量",
          key: "dealNum",
          align: "center",
        },
        {
          title: "错误数据数量",
          key: "errorNum",
          align: "center",
        },
        {
          title: "导入状态",
          key: "taskStatus",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const color =
              row.taskStatus == "0"
                ? "gray"
                : row.taskStatus == "1"
                ? "grey"
                : row.taskStatus == "2"
                ? "yellow"
                : row.taskStatus == "3"
                ? "green"
                : "red";
            const text =
              row.taskStatus == "0"
                ? "导入中"
                : row.taskStatus == "1"
                ? "未执行"
                : row.taskStatus == "2"
                ? "处理中"
                : row.taskStatus == "3"
                ? "已处理"
                : "数据有误";
            return h(
              "Tag",
              {
                props: {
                  type: "dot",
                  color: color,
                },
              },
              text
            );
          },
        },
        {
          title: "导入时间",
          key: "createTime",
          align: "center",
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 400,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled:
                      row.taskStatus == "3" && row.errorNum > 0 ? false : true,
                  },
                  style: {
                    marginRight: "5px",
                    width: "120px",
                  },
                  on: {
                    click: () => {
                      this.exportErrorData(params.row.taskId);
                    },
                  },
                },
                "导出错误数据"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled:
                      row.taskStatus == "3" &&
                      row.errorNum + row.dealNum == row.importNum
                        ? true
                        : false,
                  },
                  style: {
                    width: "120px",
                  },
                  on: {
                    click: () => {
                      this.refreshStatus();
                    },
                  },
                },
                "刷新任务状态"
              ),
            ]);
          },
        },
      ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      schoolGradeList: [],
    };
  },
  methods: {
    exportStudentPre() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/cd/high/sportsclass/exportSportsClassTemplate?token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    exportErrorData(taskId) {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/cd/high/sportsclass/exportCDHighStudentClassErrorData?taskId=" +
        taskId +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    refreshStatus() {
      var vm = this;
      vm.search();
    },
    getStudentTaskList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          "/v1/sports/class/getStudentClassTaskList?pageNum=" +
            vm.pageNum +
            "&pageSize=" +
            vm.pageSize
        )
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
    countgetStudentTaskList() {
      var vm = this;
      this.$axios
        .get("/v1/sports/class/getStudentClassTaskListCount")
        .then((res) => {
          if (res.data.code == 10000) {
            vm.total = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    search() {
      var vm = this;
      vm.getStudentTaskList();
      vm.countgetStudentTaskList();
    },
    pageToList() {
      //返回
      this.$router.go(-1);
    },
    restore() {
      var vm = this;
      vm.peTypeId = "";
      vm.pageNo = 1;
      vm.pageSize = 10;
      // vm.schoolId = "";
      vm.peClassName = "";
      vm.querySearch();
    },

    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },

    cancel() {
      // this.$Message.info('Clicked cancel');
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
        this.querySearch();
      }
    },
    pageNumChange2(value) {
      //页码改变方法处理
      if (this.pageNum2 != value) {
        this.pageNum2 = value;
        this.search2();
      }
    },
    pageSizechange2(value) {
      //页面大小改变方法处理
      if (this.pageSize2 != value) {
        this.pageSize2 = value;
        this.querySearch2();
      }
    },
    handleSuccess(res, file) {
      var vm = this;
      vm.exportStatus = false;
      if (res.code == 10000) {
        if (res.response == 1) {
          vm.$Message.info("导入成功");
          vm.modal2 = false;
          vm.search();
          //  vm.getSemesterList();
          // vm.search();
        } else {
          vm.$Message.info("文件为空，导入失败");
        }
      } else {
        vm.$Message.info("导入失败，请稍后再试");
      }
    },
    handleClassPlanSuccess(res, file) {
      var vm = this;
      vm.exportStatus = false;
      if (res.code == 10000) {
        if (res.response == 1) {
          vm.$Message.info("导入成功");
          vm.modal2 = false;
          vm.search();
        } else {
          vm.$Message.info("文件为空，导入失败");
        }
      } else {
        vm.$Message.info("导入失败，请稍后再试");
      }
    },
    handleFormatError(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "格式错误",
        desc: "该文件格式错误，请检查后重试",
      });
    },
    handleMaxSize(file) {
      this.exportStatus = false;
      this.$Notice.warning({
        title: "文件超大",
        desc: "该文件超大了",
      });
    },
    handleBeforeUpload(file) {
      // const check = this.uploadList.length < 5;
      // if (!check) {
      //     this.$Notice.warning({
      //         title: 'Up to five pictures can be uploaded.'
      //     });
      // }
      // return check;
      var vm = this;
      vm.exportStatus = true;
      return true;
    },
    getSportsClassSingleInfo() {
      //编辑时获取场馆数据
      var vm = this;
      this.$axios
        .get(
          "/v1/sports/class/getSportsClassSingleInfo?semesterYear=" +
            vm.semesterYear
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.peClassList = res.data.response;
            if (
              sessionStorage.getItem(
                "sportsClass-sportsStudentClassManage-sportsClassId"
              )
            ) {
              vm.getInfoByKey(
                sessionStorage.getItem(
                  "sportsClass-sportsStudentClassManage-sportsClassId"
                )
              );
            } else {
              vm.peClassId = res.data.response[0].sportsClassId;
              vm.peClassName = vm.peClassList[0].sportsClassName;
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getInfoByKey(sportsClassId) {
      var vm = this;
      this.$axios
        .get("/v1/sports/class/getInfoByKey?sportsClassId=" + sportsClassId)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.yearSemester = data.yearSemester;
            vm.peClassId = data.sportsClassId;
            vm.peClassName = data.sportsClassName;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStartYearList() {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios.get("/v1/school/getStartYearList").then((res) => {
        if (res.data.code == 10000) {
          let data = res.data.response;
          let all = {
            startYear: 999,
            startName: "全部",
          };
          this.schoolGradeList.push(all);
          this.schoolGradeList = this.schoolGradeList.concat(data);

          // this.schoolName = data.name
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    getExportInfo() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getExportInfo").then((res) => {
        if (res.data.code == 10000) {
          let data = res.data.response;
          vm.exportAllNum = data.exportNum;
          vm.exportSuccessNum = data.dealSuccessNum;
          vm.exportFailNum = data.dealFailNum;
          if (data.dealFailNum > 0) {
            vm.failTf = false;
          }
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    getClassPlanExportInfo() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getClassPlanExportInfo").then((res) => {
        if (res.data.code == 10000) {
          let data = res.data.response;
          vm.exportPlanAllNum = data.exportNum;
          vm.exportPlanSuccessNum = data.dealSuccessNum;
          vm.exportPlanFailNum = data.dealFailNum;
          if (data.dealFailNum > 0) {
            vm.failTf = false;
          }
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },
    exportPeErrorData() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/sports/class/exportSportsClassErrorData?token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    exportSportsClassPlanErrorData() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/sports/class/exportSportsClassPlanErrorData?token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    exportAllStudentPre() {
      var vm = this;
      vm.allStudentStasus = true;
    },
    exportAllClassPlanPre() {
      var vm = this;
      vm.allClassPlanStasus = true;
    },
    exportAllStudent() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/sports/class/exportAllSportsClassStudent?token=" +
        sessionStorage.getItem("token") +
        "&semesterYear=" +
        vm.allSemester;
      window.open(url);
    },
    exportAllClassPlan() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/sports/class/exportAllSportsClassPlan?token=" +
        sessionStorage.getItem("token") +
        "&semesterYear=" +
        vm.allSemester;
      window.open(url);
    },
    cancelexportAllStudent() {},
    getSemesterList() {
      var vm = this;
      this.$axios.get("/v1/studentpe/getSemesterList").then((res) => {
        if (res.data.code == 10000) {
          vm.semesterYearList = res.data.response;
          if (res.data.response) {
            vm.semesterYear = res.data.response[0].yearSemester;
            vm.search();
            // vm.getSportsClassSingleInfo();
          }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    getRecentSemester() {
      var vm = this;
      this.$axios.get("/v1/sports/class/getRecentSemester").then((res) => {
        if (res.data.code == 10000) {
          vm.semesterYearList.push(res.data.response);
          if (res.data.response) {
            vm.semesterYear = res.data.response.yearSemester;
            vm.semesterName = res.data.response.semesterName;
            vm.search();
            // vm.getSportsClassSingleInfo();
          }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
  },
  watch: {
    peClassId: function () {
      var vm = this;
      vm.search2();
      for (let i = 0; i < vm.peClassList.length; i++) {
        if (vm.peClassId == vm.peClassList[i].sportsClassId) {
          vm.peClassName = vm.peClassList[i].sportsClassName;
        }
      }
    },
    semesterYear: function () {
      var vm = this;
      vm.peClassId = "";
      vm.peClassName = "";
      // vm.getSportsClassSingleInfo();
    },
  },
  created() {},
  mounted() {
    var vm = this;

    if (
      sessionStorage.getItem("sportsClass-sportsStudentManage-sportsClassId")
    ) {
      this.peClassId = Number(
        sessionStorage.getItem("sportsClass-sportsStudentManage-sportsClassId")
      );
    }
    vm.isCollege = true;
    vm.getStartYearList();
    //;
    vm.getExportInfo();
    vm.getClassPlanExportInfo();
    // vm.getSemesterList();
    vm.getRecentSemester();
    vm.updateUrl =
      this.$axios.defaults.baseURL +
      "/v1/cd/high/sportsclass/file/upload/sportsClassExport?schoolId=" +
      sessionStorage.getItem("schoolId") +
      "&token=" +
      sessionStorage.getItem("token");
    vm.updateUrlPlan =
      this.$axios.defaults.baseURL +
      "/v1/sports/class/file/upload/sportsClassPlanExport?schoolId=" +
      sessionStorage.getItem("schoolId") +
      "&token=" +
      sessionStorage.getItem("token");

    vm.search();
  },
};
</script>
