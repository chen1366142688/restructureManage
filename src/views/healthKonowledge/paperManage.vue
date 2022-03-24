<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">试卷管理</h2>
    </div>
    <div v-if="schoolId != 3538">
      <Card style="width:98%;height:680px;line-height:680px;" v-if="1==2">
          <div style="text-align:center;" >
              <div style="height:40px;" ><img src="../../images/healthknowledge.png" alt=""></div>
              <div style="height:50px;color:#707070;">系统正在升级更新，预计于2020年12月25日前开放。</div>
          </div>
      </Card>
    </div>
    <div  >
      <Card>
        <div @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>适用年级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" @click="creatpaper">生成试卷</Button>
          </div>
        </div>
      </Card>
      <br />

      <div>
        <Row>
          <div style>
            <Table
              border
              max-height="700"
              :loading="loading"
              :columns="resultColumns"
              :data="resultData"
            ></Table>
          </div>
          <br />
        </Row>
      </div>
      <Modal v-model="modal1" title="生成试卷" @on-ok="ok1">
        <span>适用年级：</span>
        <Select v-model="grade1" style="width:120px;" @on-change="changeStatus(grade1)">
          <Option
            v-for="item in schoolGradeList1"
            :value="item.grade"
            :key="item.grade"
          >{{ item.label }}</Option>
        </Select>
        <br />
        <div style="margin-top: 15px;height: 100px">
          <span style="float: left">适用范围：</span>
          <CheckboxGroup
            v-model="testSectionList"
            @on-change="checkGroupChange"
            style="float: left"
          >
            <Checkbox v-for="(item,key) in testSectionListGrade" :key="key" :label="item">第{{item}}节</Checkbox>
          </CheckboxGroup>
          <div v-if="showTestSetion">此年级暂无试题</div>
        </div>
      </Modal>
      <Modal v-model="modal2" title="重新生成试卷" @on-ok="ok2">
        <div style="font-size: larger;color: red">
          重新生成试卷后，所有学生成绩将清零，
          需重新考试。 请确认是否重新生成试卷？
        </div>
        <br />
        <div style="margin-top: 15px;height: 100px">
          <span style="float: left">适用范围：</span>
          <CheckboxGroup
            v-model="testSectionList"
            @on-change="checkGroupChange"
            style="float: left"
          >
            <Checkbox v-for="(item,key) in testSectionListGrade" :key="key" :label="item">第{{item}}节</Checkbox>
          </CheckboxGroup>
          <div v-if="showTestSetion">此年级暂无试题</div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
export default {
  name: "paperManage",
  data() {
    return {
      testSectionListGrade: [],
      nowGradelist: [],
      curGrade: "",
      paperId: "",
      paperCode: "",
      schoolId: "",
      testSectionList: [],
      overStudent: 0,
      grade: 99,
      grade1: 99,
      schoolGradeList: [],
      schoolGradeList1: [],
      loading: false,
      diffcultyId: 99,
      diffcultytList: [
        { diffcultyId: 99, label: "全部" },
        { diffcultyId: 1, label: "易" },
        { diffcultyId: 2, label: "中" },
        { diffcultyId: 3, label: "难" },
      ],
      nodeNumberId: 99,
      nodeNumberList: [
        { nodeNumberId: 99, label: "全部" },
        { nodeNumberId: 1, label: "1" },
        { nodeNumberId: 2, label: "2" },
        { nodeNumberId: 3, label: "3" },
        { nodeNumberId: 4, label: "4" },
        { nodeNumberId: 5, label: "5" },
        { nodeNumberId: 6, label: "6" },
        { nodeNumberId: 7, label: "7" },
        { nodeNumberId: 8, label: "8" },
        { nodeNumberId: 9, label: "9" },
        { nodeNumberId: 10, label: "10" },
      ],
      paperContent: "",
      modal1: false,
      modal2: false,
      showTestSetion: false,
      resultColumns: [
        {
          title: "试卷序号",
          key: "studentName",
          type: "index",
          align: "center",
          minWidth:120
        },
        {
          title: "适用年级",
          key: "gradeName",
          align: "center",
          minWidth:120
        },
        {
          title: "完成人数/考试总人数",
          key: "allStudent",
          align: "center",
          minWidth:120,
          render: (h, params) => {
            return h(
              "div",
              (null != params.row.jionStudent && params.row.jionStudent>0 ? params.row.jionStudent-params.row.exemptStudent : 0) +
                "/" +
                (null != params.row.allStudent && params.row.allStudent>0 ? params.row.allStudent-params.row.exemptStudent : 0)
            );
          },
        },
        {
          title: "免试人数",
          key: "exemptStudent",
          align: "center",
          minWidth:120,
          render: (h, params) => {
            return h(
              "div",
              null != params.row.exemptStudent ? params.row.exemptStudent : 0
            );
          },
        },
        {
          title: "操作",
          key: "studentName",
          align: "center",
          minWidth:500,
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "20px",
                  },
                  on: {
                    click: () => {
                      this.toManageDetail(params.row);
                    },
                  },
                },
                "详情"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    // disabled:params.row.submitStatus=='1'?true:false
                  },
                  style: {
                    marginRight: "20px",
                  },
                  on: {
                    click: () => {
                      this.createPaperAgain(params.row);
                    },
                  },
                },
                "重新生成试卷"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    // disabled:params.row.submitStatus=='1'?true:false
                  },
                  style: {
                    marginRight: "20px",
                  },
                  on: {
                    click: () => {
                      this.ExportWordPaper(params.row.paperId);
                    },
                  },
                },
                "导出Word"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    // disabled:params.row.submitStatus=='1'?true:false
                  },
                  style: {
                    marginRight: "20px",
                  },
                  on: {
                    click: () => {
                      this.getPaperOnline(params.row);
                    },
                  },
                },
                "获取在线考试地址"
              ),
            ]);
          },
        },
      ],
      resultData: [],
      primaryList: [
        { grade: 99, label: "全部" },
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      middleList: [
        { grade: 99, label: "全部" },
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      highList: [
        { grade: 99, label: "全部" },
        { grade: 10, label: "高一" },
        { grade: 11, label: "高二" },
        { grade: 12, label: "高三" },
      ],
    };
  },
  methods: {
    changeStatus(item) {
      var vm = this;
      vm.grade1 = vm.grade1;
      vm.queryTestSectionByGrade();
    },
    creatpaper() {
      var vm = this;
      this.$axios
        .get("/v1/subjectReport/querySchoolReportedStatus?dataType=2")
        .then((res) => {
          if (res.data.code === 10000) {
            let { editStatus } = res.data.response;
            if (editStatus === "1") {
              vm.modal1 = true;
              vm.queryTestSectionByGrade();
            } else {
              this.$Modal.info({
                title: "提醒",
                okText: "知道了",
                closable: false,
                content:
                  "<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>",
              });
            }
          }
        });
    },
    checkGroupChange() {},
    querySearch() {
      var vm = this;
      let gradeNum = vm.grade;
      if (gradeNum == 99) {
        gradeNum = "";
      }
      this.$axios
        .get(
          "/v1/healthyKnowledge/getGradePaperInfo?schoolId=" +
            vm.schoolId +
            "&grade=" +
            gradeNum
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.resultData = data;
            for (let i = 0; i < vm.resultData.length; i++) {
              this.nowGradelist.push(vm.resultData[i].gradeId);
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    queryTestSectionByGrade() {
      var vm = this;
      let gradeNum = vm.grade1;
      if (gradeNum == 99) {
        gradeNum = "";
      }
      this.$axios
        .get(
          "/v1/healthyKnowledge/getTestSectionByGrade?schoolId=" +
            vm.schoolId +
            "&grade=" +
            gradeNum
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.testSectionListGrade = data;
            if (data.length == 0) {
              vm.showTestSetion = true;
            } else {
              vm.showTestSetion = false;
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getNewPaper() {
      var vm = this;
      if (vm.nowGradelist.includes(vm.grade1)) {
        this.$Message.info("当前年级已有试卷");
      } else if (vm.grade1 == 99) {
        this.$Message.info("请选择适用年级");
      } else if (vm.testSectionList.length == 0) {
        this.$Message.info("请选择使用范围");
      } else {
        vm.loading = true;
        let data = {
          schoolId: vm.schoolId,
          gradeId: vm.grade1 == 99 ? "" : vm.grade1,
          testSectionList: vm.testSectionList,
        };
        this.$axios.post("/v1/healthyKnowledge/getPaper", data).then((res) => {
          if (res.data.code == 10000) {
            if (res.data.response.code == 2) {
              vm.$Message.info("试题不足");
            } else {
              this.querySearch();
              this.testSectionList = [];
              vm.$Message.info("生成试卷成功");
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
      }
      vm.loading = false;
    },
    getNewPaperAgain() {
      var vm = this;
      // vm.loading = true;
      if (vm.testSectionList.length == 0) {
        this.$Message.info("请选择使用范围");
      } else {
        let data = {
          schoolId: vm.schoolId,
          gradeId: vm.curGrade,
          testSectionList: vm.testSectionList,
          paperId: vm.paperId,
          paperCode: vm.paperCode,
        };
        this.$axios
          .post("/v1/healthyKnowledge/getPaperAgain", data)
          .then((res) => {
            // vm.loading = false;
            if (res.data.code == 10000) {
              if (res.data.response.code == 2) {
                vm.$Message.info("试题不足");
              } else {
                this.querySearch();
                this.testSectionList = [];
                vm.$Message.info("重新生成试卷成功");
              }
            } else {
              if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg);
              }
            }
          });
      }
    },
    ok1() {
      this.getNewPaper();
    },
    ok2() {
      this.getNewPaperAgain();
    },
    toManageDetail(item) {
      this.$router.push({ name: "paperManageDetail" });
      sessionStorage.setItem("paperManage-gradeId", item.gradeId);
      sessionStorage.setItem("paperManage-paperId", item.paperId);
      sessionStorage.setItem("paperManage-paperCode", item.paperCode);
    },
    createPaperAgain(item) {
      var vm = this;
      this.$axios
        .get("/v1/subjectReport/querySchoolReportedStatus?dataType=2")
        .then((res) => {
          if (res.data.code === 10000) {
            let { editStatus } = res.data.response;
            if (editStatus === "1") {
              vm.testSectionList = [];
              vm.modal2 = true;
              vm.curGrade = item.gradeId;
              vm.grade1 = item.gradeId;
              vm.paperId = item.paperId;
              vm.paperCode = item.paperCode;
              vm.queryTestSectionByGrade();
            } else {
              this.$Modal.info({
                title: "提醒",
                okText: "知道了",
                closable: false,
                content:
                  "<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>",
              });
            }
          }
        });
    },
    ExportWordPaper(paperId) {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/healthyExport/exportStudentHealthyQuestionList?paperId=" +
        paperId +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    getPaperOnline(info) {
      let vm = this;
      window.open(
        `${this.$axios.defaults.answerUrl}answer/login.html?paperCode=${info.paperCode}&paperId=${info.paperId}&schoolId=${vm.schoolId}&gradeId=${info.gradeId}`
      );
    },
  },
  created() {},
  mounted() {
    var vm = this;
    let schoolType = sessionStorage.getItem("schoolType");
    if (schoolType) {
      if ("0" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList);
        // vm.schoolGradeList1 = vm.schoolGradeList
        //     .concat([...vm.primaryList])
        //     .concat([...vm.middleList])
        //     .concat([...vm.highList]);
      }
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.primaryList;
        // vm.schoolGradeList1 = [...vm.primaryList];
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.middleList;
        // vm.schoolGradeList1 = [...vm.middleList];
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.highList;
        // vm.schoolGradeList1 = [...vm.highList];
      }
    }
    vm.schoolGradeList1 = [...vm.schoolGradeList];
    vm.schoolGradeList1.splice(0, 1);
    vm.grade1 = vm.schoolGradeList1[0].grade;
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.testSectionList = [];
    vm.querySearch();
  },
};
</script>

