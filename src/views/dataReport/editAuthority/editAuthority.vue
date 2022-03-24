<template>
  <div style="padding-left: 10px">
    <h2 style="margin-top: 15px; margin-bottom: 13px">编辑权限申请</h2>
    <Card style="margin-bottom: 20px" :dis-hover="true">
      <div class="top-search">
        <div class="left-input">
          <div style="margin: 5px 20px">
            <span>审核状态：</span>
            <Select v-model="auditStatus" clearable style="width: 200px">
              <Option
                v-for="item in statusList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
        </div>
        <div class="right-btns">
          <Button v-on:click="queryReportedList(1)" type="success">查询</Button>
          <Button v-on:click="showApplyWindow" type="primary"
            >申请编辑权限</Button
          >
        </div>
      </div>
    </Card>
    <Card style="margin-bottom: 20px" :dis-hover="true">
      <Table border :columns="resultColumns" :data="resultData"></Table>
      <section style="text-align: right">
        <br />
        <Page
          :total="total"
          :current="pageNum"
          :page-size="pageSize"
          @on-change="pageNumChange"
          @on-page-size-change="pageSizechange"
          show-total
          show-sizer
        ></Page>
      </section>
    </Card>
    <Modal
      v-model="applyWindow"
      title="编辑权限申请"
      :mask-closable="false"
      :loading="false"
      width="550px"
    >
      <div style="margin-top: 10px">
        <Row>
          <Col span="4">
            <span>编辑数据：</span>
          </Col>
          <Col span="18">
            <RadioGroup v-model="applyData.applyType" @on-change="queryStatus">
              <Radio
                v-for="(item, index) in typeList"
                :key="index"
                :label="item.value"
              >
                {{ item.label }}
              </Radio>
            </RadioGroup>
            <p style="color: red" v-if="!reportStatus">
              该数据还没有完成数据报送，现有数据编辑权限，无需向相关单位申请。
            </p>
          </Col>
        </Row>
        <br />
        <Row>
          <Col span="4">
            <span>申请内容：</span>
          </Col>
          <Col span="18">
            <Input
              v-model="applyData.applyDescribe"
              placeholder="请输入申请内容"
              :maxlength="50"
            />
          </Col>
        </Row>
      </div>
      <div slot="footer">
        <Button type="success" @click="closeApplyWindow">取消</Button>
        <Button type="success" @click="submitApply">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "editAuthority",
  data() {
    return {
      yearSemester: "",
      typeList: [
        {
          value: "1",
          label: "体质测试",
        },
        {
          value: "2",
          label: "学科评价",
        },
        {
          value: "3",
          label: "视力测试",
        },
      ],

      auditList: [
        {
          value: "1",
          label: "教育局",
        },
        {
          value: "2",
          label: "管理平台",
        },
      ],
      applyWindow: false,
      noReportWindow: false,
      repeatWindow: false,
      statusList: [
        // {
        //     value: '0',
        //     label: '全部'
        // },
        {
          value: "1",
          label: "待审批",
        },
        {
          value: "2",
          label: "已拒绝",
        },
        {
          value: "3",
          label: "数据编辑中",
        },
        {
          value: "4",
          label: "数据已报送",
        },
        // {
        //     value: '',
        //     label: '已关闭'
        // },
      ],
      resultColumns: [
        {
          title: "申请人",
          key: "applyTeacherName",
          align: "center",
        },
        {
          title: "申请时间",
          key: "applyTime",
          align: "center",
        },
        {
          title: "申请编辑数据",
          key: "applyType",
          align: "center",
          render: (h, params) => {
            const data = params.row;
            let text = data.applyType == "1" ? "体质测试" : data.applyType == 2 ? "学科评价" : '视力测试';
            let suffix =
              this.yearSemester == data.applyYearSemester
                ? ""
                : "(" + data.applyYearSemesterName + ")";
            text = text + suffix;
            return h("div", [h("span", text)]);
          },
        },
        {
          title: "审批单位",
          key: "auditType",
          align: "center",
          render: (h, params) => {
            const data = params.row;
            let auditType = data.auditType;
            return h("div", [
              h(
                "span",
                auditType == "1"
                  ? "教育局"
                  : auditType == "2"
                  ? "管理平台"
                  : "未知"
              ),
            ]);
          },
        },
        {
          title: "申请内容",
          key: "applyDescribe",
          align: "center",
        },
        {
          title: "状态",
          key: "auditStatus",
          align: "center",
          render: (h, params) => {
            const data = params.row;
            let auditStatus = data.auditStatus;
            return h("div", [
              h(
                "span",
                auditStatus == "1"
                  ? "待审批"
                  : auditStatus == "2"
                  ? "已拒绝"
                  : auditStatus == "3"
                  ? "数据编辑中"
                  : "数据已报送"
              ),
            ]);
          },
        },
      ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      auditStatus: "",
      reportStatus: true,
      applyData: {
        auditType: "",
        applyType: "",
        applyDescribe: "",
        // applyYearSemester:'',
      },
    };
  },
  methods: {
    queryStatus() {
      this.$axios
        .get(
          "/v1/subjectReport/querySchoolReportedStatus?dataType=" +
            this.applyData.applyType
        )
        .then((res) => {
          if (res.data.code == 10000) {
            if (res.data.response.reportedPatriarchStatus == "1") {
              this.applyData.auditType = "2";
              this.reportStatus = true;
            } else if (res.data.response.reportedOrganStatus == "1") {
              this.applyData.auditType = "1";
              this.reportStatus = true;
            } else {
              this.applyData.auditType = "";
              this.reportStatus = false;
            }
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },
    noticeWindow(type) {
      switch (type) {
        case "2":
          this.$Modal.info({
            title: "未上报提醒",
            content:
              "您还没有完成数据报送，现有数据编辑权限，无需向相关单位申请。",
          });
          break;
        case "3":
          this.$Modal.info({
            title: "重复申请提醒",
            content:
              "您已经申请过相同数据的编辑权限，请联系相关单位审批，无需重复申请。",
          });
          break;
      }
    },
    showApplyWindow() {
      this.applyWindow = true;
    },
    closeApplyWindow() {
      this.applyWindow = false;
    },
    submitApply() {
      var vm = this;
      if (!vm.applyData.applyType) {
        this.$Message.info("请选择编辑数据类型！");
        return;
      }
      this.$axios
        .post(
          "/v1/subjectReport/saveSchoolSemesterReportedApply",
          this.applyData
        )
        .then((res) => {
          vm.applyWindow = false;
          if (res.data.code == 10000) {
            if (res.data.response == "1") {
              this.applyData.applyDescribe = "";
              this.queryReportedList(1);
              this.$Message.info("申请成功！");
            } else if (res.data.response == "2") {
              this.noticeWindow("2");
            } else if (res.data.response == "3") {
              this.noticeWindow("3");
            }
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value;
        this.queryReportedList(0);
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value;
        this.queryReportedList(1);
      }
    },
    queryReportedList(QueryMethod) {
      //查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页
      if (QueryMethod == 1) {
        //查询按钮查询页码设置为1
        this.pageNum = 1;
        if (this.auditStatus == null) {
          this.auditStatus = "";
        }
      }

      this.$axios
        .get(
          "/v1/subjectReport/querySchoolReportedApplyList?auditStatus=" +
            this.auditStatus +
            "&pageNo=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response.result;
            this.pageNum = res.data.response.pageNum;
            this.pageSize = res.data.response.pageSize;
            this.total = res.data.response.total;
          } else {
            this.$Message.info(res.data.msg);
          }
        });
    },
  },
  created() {},
  mounted() {
    this.yearSemester = sessionStorage.getItem("yearSemester");
    this.queryReportedList(1);
  },
};
</script>

<style scoped>
</style>
