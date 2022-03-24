<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">试卷</h2>
    </div>
    <div>
      <Card>
        <div class="top-search" @keydown.enter="querySearch">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>难度系数：</span>
                    <Select v-model="diffcultyId" style="width:120px">
                        <Option
                        v-for="item in diffcultytList"
                        :value="item.diffcultyId"
                        :key="item.diffcultyId"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>适用小节：</span>
                    <Select v-model="nodeNumberId" style="width:120px">
                        <Option
                        v-for="item in nodeNumberList"
                        :value="item.nodeNumberId"
                        :key="item.nodeNumberId"
                        >{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>题目内容：</span>
                    <Input v-model="paperContent" placeholder="题目内容" style="width: 120px;" />
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="querySearch">查询</Button>
                <Button type="success" @click="back">返回</Button>
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
      <Modal v-model="modal1" title="更换题目" @on-ok="ok1">
        <div style="font-size: larger;color: red">
          更换题目后，所有学生成绩将清零，
          需重新考试。 请确认是否更换题目？
        </div>
        <br />
        <div style="margin-top: 15px;height: 100px">
          <span style="float: left;font-size: larger">适用范围：</span>
          <CheckboxGroup
            v-model="testSectionList"
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
  name: "paperManageDetail",
  data() {
    return {
      testSectionListGrade: [],
      testSectionList: [],
      showTestSetion: null,
      paperContent: "",
      overStudent: 0,
      grade: 99,
      schoolGradeList: [],
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
      resultColumns: [
        {
          title: "题目序号",
          key: "studentName",
          align: "center",
          type: "index",
          minWidth:100,
          fixed:'left'
        },
        {
          title: "题目内容",
          key: "questionContent",
          align: "center",
          minWidth:100,
        },
        {
          title: "选项A",
          key: "optionA",
          align: "center",
          minWidth:100,
        },
        {
          title: "选项B",
          key: "optionB",
          align: "center",
          minWidth:100,
        },
        {
          title: "选项C",
          key: "optionC",
          align: "center",
          minWidth:100,
        },
        {
          title: "选项D",
          key: "optionD",
          align: "center",
          minWidth:100,
        },
        {
          title: "正确答案",
          key: "rightKey",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return h(
              "div",
              params.row.rightKey == "A"
                ? params.row.optionA
                : params.row.rightKey == "B"
                ? params.row.optionB
                : params.row.rightKey == "C"
                ? params.row.optionC
                : params.row.rightKey == "D"
                ? params.row.optionD
                : "-"
            );
          },
        },
        {
          title: "分值",
          key: "score",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return h(
              "div",params.row.score/10);
          },
        },
        {
          title: "难度系数",
          key: "difficulty",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            return h(
              "div",
              params.row.difficulty == 1
                ? "易"
                : params.row.difficulty == 2
                ? "中"
                : params.row.difficulty == 3
                ? "高"
                : "默认"
            );
          },
        },
        {
          title: "适用年级",
          key: "gradeName",
          align: "center",
          minWidth:100,
        },
        {
          title: "适用小节",
          key: "testSection",
          align: "center",
          minWidth:100,
        },
        {
          title: "操作",
          key: "studentName",
          align: "center",
          minWidth:100,
          fixed:'right',
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {},
                  on: {
                    click: () => {
                      this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
                        if (res.data.code === 10000) {
                          let {editStatus} = res.data.response
                          if (editStatus === '1') {
                            this.changeQuestion(params.row);
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
                  },
                },
                "更换题目"
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
      paperId: "",
      paperCode: "",
      gradeId: "",
      schoolId: "",
      questionId: "",
      nowIndex: "",
    };
  },
  methods: {
    queryTestSectionByGrade() {
      var vm = this;
      let gradeNum = vm.curGrade;
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
    querySearch() {
      var vm = this;
      vm.loading = true;
      let data = {
        schoolId: vm.schoolId,
        gradeId: vm.gradeId,
        paperCode: vm.paperCode,
        difficulty: vm.diffcultyId == 99 ? "" : vm.diffcultyId,
        testSection: vm.nodeNumberId == 99 ? "" : vm.nodeNumberId,
        questionContent: vm.paperContent,
      };
      this.$axios
        .post("/v1/healthyKnowledge/getGradePaperDetailInfo", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.resultData = data;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },

    ok1() {
      var vm = this;
      let data = {
        schoolId: vm.schoolId,
        gradeId: vm.curGrade,
        testSectionList: vm.testSectionList,
        paperId: vm.paperId,
        paperCode: vm.paperCode,
        paperQuestionId: vm.resultData[vm.nowIndex].paperQuestionId,
        questionId:vm.resultData[vm.nowIndex].questionId,
      };
      this.$axios
        .post("/v1/healthyKnowledge/changePaperQuestion", data)
        .then((res) => {
          // vm.loading = false;
          if (res.data.code == 10000) {
            if (res.data.response.paperId == null) {
              vm.$Message.info("题库没有未重复试题");
            } else {
              let data = res.data.response;
              vm.resultData.splice(vm.nowIndex, 1, data);
              vm.paperCode = data.paperCode;
              this.testSectionList = [];
            }
          } else if (res.data.code == 40002) {
            if (null == res.data.response) {
              vm.$Message.info("题库没有满足条件的试题");
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    changeQuestion(item) {
      let vm = this;
      vm.modal1 = true;
      vm.questionId = item.questionId;
      vm.nowIndex = item._index;
      vm.queryTestSectionByGrade();
    },
    back() {
      this.$router.go(-1);
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
      }
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.primaryList;
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.middleList;
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.highList;
      }
    }
    vm.paperId = sessionStorage.getItem("paperManage-paperId");
    vm.paperCode = sessionStorage.getItem("paperManage-paperCode");
    vm.curGrade = sessionStorage.getItem("paperManage-gradeId");
    vm.schoolId = sessionStorage.getItem("schoolId");
    this.querySearch();
  },
};
</script>


