<style>
.sportsScoreStudent .ivu-tabs {
  overflow: visible;
  overflow-x: hidden;
  overflow-y: visible;
}
</style>
<template>
  <div class="sportsScoreStudent" style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按学生查询</h2>
    </div>
    <div>
      <Card style="height: 110px;">
        <div class="top-search" @keydown.enter="queryStudentScore">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span style>年<span style="visibility:hidden">空</span>级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>班<span style="visibility:hidden">空</span>级：</span>
              <Select v-model="sportsClassId" style="width:120px;">
                <Option
                  v-for="item in gradeSportsClassList"
                  :value="item.sportsClassId"
                  :key="item.sportsClassId"
                >{{ item.sportsClassName }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>性<span style="visibility:hidden">空</span>别：</span>
              <Select v-model="gender" style="width:120px;">
                <Option
                  v-for="item in genderList"
                  :value="item.itemId"
                  :key="item.itemId"
                >{{ item.itemName }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>姓<span style="visibility:hidden">空</span>名：</span>
              <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 20px;">
              <span>学籍号：</span>
              <Input v-model="registerCode" placeholder="学生学籍号" style="width: 120px;" />
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="queryStudentScore">查询</Button>
            <Button type="success" @click="batchScore1">重新计算学期体育成绩</Button>
          </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;">
          <div style="right:100px;margin-right:100px;position:absolute;">
            统计时间：
            <font style="font-size:16px;">{{schoreCreateTime}}</font>
          </div>
        </div>
        <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
          <TabPane name="first" label="第一学期">
            <div>
              <Row>
                <div style>
                  <Table
                    border
                    max-height="530"
                    :loading="loading"
                    @on-sort-change="sortChange"
                    :columns="resultColumns"
                    :data="resultDataFirst"
                  ></Table>
                </div>
              </Row>
            </div>
            <br />
            <div v-show="totalFirst>0" style="float: right;">
              <Page
                :total="totalFirst"
                :current="pageNumFirst"
                :page-size="pageSizeFirst"
                @on-change="pageNumChangeFirst"
                @on-page-size-change="pageSizechangeFirst"
                show-total
                show-sizer
              ></Page>
            </div>
          </TabPane>
          <TabPane name="second" label="第二学期">
            <div>
              <Row>
                <div style>
                  <Table
                    border
                    :height="530"
                    :loading="loading"
                    @on-sort-change="sortChange2"
                    :columns="resultColumns"
                    :data="resultDataSecond"
                  ></Table>
                </div>
              </Row>
            </div>
            <br />
            <div v-show="totalSecond>0" style="float: right;">
              <Page
                :total="totalSecond"
                :current="pageNumSecond"
                :page-size="pageSizeSecond"
                @on-change="pageNumChangeSecond"
                @on-page-size-change="pageSizechangeSecond"
                show-total
                show-sizer
              ></Page>
            </div>
          </TabPane>
          <TabPane name="year" :label="yearName">
            <div>
              <Row>
                <div>
                  <Table
                    border
                    max-height="530"
                    :loading="loading"
                    @on-sort-change="sortChange3"
                    :columns="resultColumnsThrid"
                    :data="resultDataYear"
                  ></Table>
                </div>
              </Row>
            </div>
            <br />
            <div v-show="totalYear>0" style="float: right;">
              <Page
                :total="totalYear"
                :current="pageNumYear"
                :page-size="pageSizeYear"
                @on-change="pageNumChangeYear"
                @on-page-size-change="pageSizechangeYear"
                show-total
                show-sizer
              ></Page>
            </div>
          </TabPane>
        </Tabs>
      </Card>
    </div>
    <Modal
      title="学期成绩计算中"
      v-model="createSemesterScore"
      :closable="false"
      cancel-text
      :mask-closable="false"
    >
      <p>
        <Progress :percent="typeScore" status="active"></Progress>
      </p>
    </Modal>
    <Modal
      v-model="modal1"
      :closable="false"
      title="温馨提示"
      @on-ok="openSignatureStatus"
      @on-cancel="cancel"
    >
      <p>家长签名后的学生成绩将被锁定，无法修改，是否确定开启家长签名？</p>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      sportsClassId: "",
      gradeSportsClassList: [],
      yearName: "学年",
      repeatStatus: false,
      signatureTf: true,
      modal1: false,
      isReport: false,
      createSemesterScore: false,
      selectTabName: "",
      schoreCreateTime: "",
      loading: false,
      pageNumYear: 1,
      pageSizeYear: 10,
      totalYear: 0,
      pageNumSecond: 1,
      pageSizeSecond: 10,
      totalSecond: 0,
      pageNumFirst: 1,
      pageSizeFirst: 10,
      totalFirst: 0,
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      gender: "",
      schoolDistrict: "",
      typeScore: 0,
      genderList: [
        {
          itemId: "",
          itemName: "全部",
        },
        {
          itemId: "1",
          itemName: "男",
        },
        {
          itemId: "2",
          itemName: "女",
        },
      ],
      orderType: "",
      semesterYearList: [],
      firstYearSemester: "",
      secondYearSemester: "",
      orderField: "student_class",
      orderSort: "",
      resultColumnsThrid: [],
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth: 120,
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          width: 60,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 140,
        },

        {
          title: "班级",
          key: "sportsClassName",
          align: "center",
          width: 110,
        },
        {
          title: "体质测试得分",
          key: "testScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "体质测试等级",
          key: "testScoreLevel",
          align: "center",
          minWidth: 100,
        },
        {
          title: "体能得分",
          key: "staminaScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "健康知识得分",
          key: "healthScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "运动技能学分",
          key: "actionCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "获得总学分",
          key: "semesterCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.toDetail(row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      resultColumnsCDHighNotThird: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width: 120,
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          width: 60,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 140,
        },

        {
          title: "班级",
          key: "sportsClassName",
          align: "center",
          width: 110,
        },
        {
          title: "体质测试得分",
          key: "testScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "体质测试等级",
          key: "testScoreLevel",
          align: "center",
          minWidth: 100,
          // sortable:"custom",
        },
        {
          title: "体能得分",
          key: "staminaScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "健康知识得分",
          key: "healthScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "运动技能学分",
          key: "actionCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "获得总学分",
          key: "semesterCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.toDetail(row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      resultColumnsCDHigh: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width: 120,
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          width: 60,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 140,
        },

        {
          title: "班级",
          key: "sportsClassName",
          align: "center",
          width: 110,
        },
        {
          title: "体质测试得分",
          key: "testScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "体质测试等级",
          key: "testScoreLevel",
          align: "center",
          minWidth: 100,
          // sortable:"custom",
        },
        {
          title: "体能得分",
          key: "staminaCreditScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "体能学分",
          key: "staminaCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "健康知识得分",
          key: "healthCreditScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "健康知识学分",
          key: "healthCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "运动技能学分",
          key: "actionTotalCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "获得总学分",
          key: "semesterCredit",
          align: "center",
          sortable: "custom",
          minWidth: 100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.toDetail(row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],

      resultColumnsCD: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width: 120,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 120,
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.grade == "1"
                ? "一年级"
                : row.grade == "2"
                ? "二年级"
                : row.grade == "3"
                ? "三年级"
                : row.grade == "4"
                ? "四年级"
                : row.grade == "5"
                ? "五年级"
                : row.grade == "6"
                ? "六年级"
                : row.grade == "7"
                ? "七年级"
                : row.grade == "8"
                ? "八年级"
                : row.grade == "9"
                ? "九年级"
                : row.grade == "10"
                ? "高一"
                : row.grade == "11"
                ? "高二"
                : row.grade == "12"
                ? "高三"
                : "";
            return h("span", text + row.studentClass + "班");
          },
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable: "true",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore / 100;
            if (row.learnScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore / 100;
            if (row.healthScore < 0 || row.healthOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore / 100;
            if (row.actionScore < 0 || row.actionOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore / 100;
            if (row.staminaScore < 0 || row.staminaOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable: "true",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore / 100;
            if (row.homeworkScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学科评价得分",
          key: "semesterScore",
          align: "center",
          sortable: "true",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore / 100;
            text = text.toFixed(1);
            return h("span", text);
          },
        },
        {
          title: "学科评价等级",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore / 100;
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else {
              showInfo = "不及格";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "体质测试得分",
          key: "testScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (this.secondYearSemester) {
              text = text.toFixed(1);
            } else {
              if (row.testScore <= 0) {
                text = "-";
              } else {
                text = text.toFixed(1);
              }
            }
            return h("span", text);
          },
        },
        {
          title: "体质测试等级",
          key: "athleticContestScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (this.secondYearSemester) {
              text = text.toFixed(1);
            } else {
              if (row.testScore <= 0) {
                text = "-1";
              } else {
                text = text.toFixed(1);
              }
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text >= 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.toDetailCD(row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      resultColumnsCDOther: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width: 120,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 120,
        },
        {
          title: "性别",
          key: "studentName",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.grade == "1"
                ? "一年级"
                : row.grade == "2"
                ? "二年级"
                : row.grade == "3"
                ? "三年级"
                : row.grade == "4"
                ? "四年级"
                : row.grade == "5"
                ? "五年级"
                : row.grade == "6"
                ? "六年级"
                : row.grade == "7"
                ? "七年级"
                : row.grade == "8"
                ? "八年级"
                : row.grade == "9"
                ? "九年级"
                : row.grade == "10"
                ? "高一"
                : row.grade == "11"
                ? "高二"
                : row.grade == "12"
                ? "高三"
                : "";
            return h("span", text + row.studentClass + "班");
          },
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          sortable: "true",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore / 100;
            if (row.learnScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore / 100;
            if (row.healthScore < 0 || row.healthOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "运动技能",
          key: "actionScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore / 100;
            if (row.actionScore < 0 || row.actionOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体能",
          key: "staminaScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.staminaScore / 100;
            if (row.staminaScore < 0 || row.staminaOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          sortable: "true",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore / 100;
            if (row.homeworkScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学科评价得分",
          key: "semesterScore",
          align: "center",
          sortable: "true",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore / 100;
            text = text.toFixed(1);
            return h("span", text);
          },
        },
        {
          title: "学科评价等级",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.semesterScore / 100;
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else {
              showInfo = "不及格";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "体质测试得分",
          key: "testScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (this.secondYearSemester) {
              text = text.toFixed(1);
            } else {
              if (row.testScore <= 0) {
                text = "-";
              } else {
                text = text.toFixed(1);
              }
            }
            return h("span", text);
          },
        },
        {
          title: "体质测试等级",
          key: "athleticContestScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (this.secondYearSemester) {
              text = text.toFixed(1);
            } else {
              if (row.testScore <= 0) {
                text = "-1";
              } else {
                text = text.toFixed(1);
              }
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text >= 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.toDetailCD(row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      resultDataYear: [],
      resultDataSecond: [],
      resultDataFirst: [],
      resultColumnsYear: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width: 120,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 120,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.grade == "1"
                ? "一年级"
                : row.grade == "2"
                ? "二年级"
                : row.grade == "3"
                ? "三年级"
                : row.grade == "4"
                ? "四年级"
                : row.grade == "5"
                ? "五年级"
                : row.grade == "6"
                ? "六年级"
                : row.grade == "7"
                ? "七年级"
                : row.grade == "8"
                ? "八年级"
                : row.grade == "9"
                ? "九年级"
                : row.grade == "10"
                ? "高一"
                : row.grade == "11"
                ? "高二"
                : row.grade == "12"
                ? "高三"
                : "";
            return h("span", text + row.studentClass + "班");
          },
        },
        {
          title: "学习态度",
          key: "learnScore",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            const row = params.row;
            let text = row.learnScore / 100;
            if (row.learnScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "健康教育知识",
          key: "healthScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.healthScore / 100;
            if (row.healthScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "技能体能",
          key: "actionScore",
          align: "center",
          sortable: "custom",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.actionScore / 100;
            if (row.actionScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体育课后作业",
          key: "homeworkScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.homeworkScore / 100;
            if (row.homeworkScore < 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体质测试",
          key: "finishCount",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (this.secondYearSemester) {
              text = text.toFixed(1);
            } else {
              if (row.testScore <= 0) {
                text = "-";
              } else {
                text = text.toFixed(1);
              }
            }
            return h("span", text);
          },
        },
        {
          title: "学年总成绩得分",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            if (row.semesterScore <= 0) {
              return h("span", "-");
            }
            let text = (row.semesterScore + row.athleticContestScore) / 100;
            text = text.toFixed(1);
            return h("span", text);
          },
        },
        {
          title: "等级",
          key: "semesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            if (row.semesterScore <= 0) {
              return h("span", "-");
            }
            let contest =
              row.athleticContestScore == -1 ? 0 : row.athleticContestScore;
            let text = (row.semesterScore + contest) / 100;
            if (text >= 90) {
              text = "优秀";
            } else if (text >= 80) {
              text = "良好";
            } else if (text >= 60) {
              text = "及格";
            } else {
              text = "不及格";
            }
            return h("span", text);
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "10px",
                  },
                  on: {
                    click: () => {
                      this.toDetail(row);
                    },
                  },
                },
                "详情"
              ),
            ]);
          },
        },
      ],
      resultColumnsYearCD: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width: 120,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 150,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          width: 40,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width: 110,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.grade == "1"
                ? "一年级"
                : row.grade == "2"
                ? "二年级"
                : row.grade == "3"
                ? "三年级"
                : row.grade == "4"
                ? "四年级"
                : row.grade == "5"
                ? "五年级"
                : row.grade == "6"
                ? "六年级"
                : row.grade == "7"
                ? "七年级"
                : row.grade == "8"
                ? "八年级"
                : row.grade == "9"
                ? "九年级"
                : row.grade == "10"
                ? "高一"
                : row.grade == "11"
                ? "高二"
                : row.grade == "12"
                ? "高三"
                : "";
            return h("span", text + row.studentClass + "班");
          },
        },
        {
          title: "体测得分",
          key: "testScore",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (row.testScore <= 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体测等级",
          key: "testScoreLevel",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (row.testScore <= 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "体测分值",
          key: "testScoreScore",
          align: "center",

          width: 70,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (row.testScore <= 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
              let score = 0;
              if (row.grade == "7" || row.grade == "8") {
                if (text >= 90) {
                  score += 1;
                } else if (text >= 80 && text < 90) {
                  score += 0.75;
                } else if (text >= 60 && text < 80) {
                  score += 0.5;
                } else {
                  score += 0.25;
                }
              } else if (row.grade == "9") {
                if (text >= 90) {
                  score += 2;
                } else if (text >= 80 && text < 90) {
                  score += 1.5;
                } else if (text >= 60 && text < 80) {
                  score += 1;
                } else {
                  score += 0.5;
                }
              }
              text = score;
            }
            return h("span", text);
          },
        },
        {
          title: "第一学期学科评价得分",
          key: "firstSemesterScore",
          width: 80,

          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = row.firstSemesterScore / 100;
            if (row.firstSemesterScore == null) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "第一学期学科评价等级",
          width: 80,
          key: "firstSemesterLevel",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = row.firstSemesterScore / 100;
            if (row.firstSemesterScore == null) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "第二学期学科评价得分",
          width: 80,
          key: "secondSemesterScore",

          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = row.secondSemesterScore / 100;
            if (row.secondSemesterScore == null) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "第二学期学科评价等级",
          width: 80,
          key: "secondSemesterLevel",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text = row.secondSemesterScore / 100;
            if (row.secondSemesterScore == null) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "学年学科评价平均分",
          width: 100,
          key: "yearScore",

          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            if (row.secondOver == "0" || row.firstOver == "0") {
              text = "-";
            } else {
              text = text / 2;
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学年学科评价等级",
          key: "yearScoreLevel",
          width: 120,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            let text =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            if (row.secondOver == "0" || row.firstOver == "0") {
              text = "-";
            } else {
              text = text / 2;
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "学年学科评价分值",
          key: "yearScoreLevelScore",
          align: "center",
          minWidth: 100,

          render: (h, params) => {
            const row = params.row;
            let text =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            if (row.secondOver == "0" || row.firstOver == "0") {
              text = "-";
            } else {
              text = text / 2;
              text = text.toFixed(1);
              let score = 0;
              if (text >= 90) {
                score += 2;
              } else if (text >= 80 && text < 90) {
                score += 1.5;
              } else if (text >= 60 && text < 80) {
                score += 1;
              } else {
                score += 0.5;
              }
              text = score;
            }
            return h("span", text);
          },
        },
        {
          title: "中考体育考试分值",
          key: "allScore",
          align: "center",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            let textSemester =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            let testScore = row.testScore / 100;
            if (
              row.secondOver == "0" ||
              row.firstOver == "0" ||
              row.testScore <= 0
            ) {
              return h("span", "-");
            } else {
              textSemester = textSemester / 2;
              textSemester = textSemester.toFixed(1);
              let scoreSemester = 0;
              if (textSemester >= 90) {
                scoreSemester += 2;
              } else if (textSemester >= 80 && textSemester < 90) {
                scoreSemester += 1.5;
              } else if (textSemester >= 60 && textSemester < 80) {
                scoreSemester += 1;
              } else {
                scoreSemester += 0.5;
              }
              let scoreTestInfo = 0;
              if (row.grade == "7" || row.grade == "8") {
                if (testScore >= 90) {
                  scoreTestInfo += 1;
                } else if (testScore >= 80 && testScore < 90) {
                  scoreTestInfo += 0.75;
                } else if (testScore >= 60 && testScore < 80) {
                  scoreTestInfo += 0.5;
                } else {
                  scoreTestInfo += 0.25;
                }
              } else if (row.grade == "9") {
                if (testScore >= 90) {
                  scoreTestInfo += 2;
                } else if (testScore >= 80 && testScore < 90) {
                  scoreTestInfo += 1.5;
                } else if (testScore >= 60 && testScore < 80) {
                  scoreTestInfo += 1;
                } else {
                  scoreTestInfo += 0.5;
                }
              }
              scoreTestInfo = scoreTestInfo + scoreSemester;
              return h("span", scoreTestInfo);
            }
          },
        },
        {
          title: "学年体育素质综合评价成绩",
          key: "allScoreShow",
          align: "center",
          width: 120,
          render: (h, params) => {
            const row = params.row;
            let textSemester =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            let testScore = row.testScore / 100;
            if (
              row.secondOver == "0" ||
              row.firstOver == "0" ||
              row.testScore <= 0
            ) {
              return h("span", "-");
            } else {
              textSemester = textSemester / 2;
              textSemester = textSemester.toFixed(1);
              let allScoreShow = Number(textSemester) + Number(testScore);
              allScoreShow = allScoreShow / 2;
              allScoreShow = allScoreShow.toFixed(1);
              return h("span", allScoreShow);
            }
          },
        },
      ],
      resultColumnsYearCDOther: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          width: 120,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          width: 150,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          width: 40,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("span", text);
          },
        },
        {
          title: "班级",
          key: "grade",
          align: "center",
          width: 110,
          render: (h, params) => {
            const row = params.row;
            const text =
              row.grade == "1"
                ? "一年级"
                : row.grade == "2"
                ? "二年级"
                : row.grade == "3"
                ? "三年级"
                : row.grade == "4"
                ? "四年级"
                : row.grade == "5"
                ? "五年级"
                : row.grade == "6"
                ? "六年级"
                : row.grade == "7"
                ? "七年级"
                : row.grade == "8"
                ? "八年级"
                : row.grade == "9"
                ? "九年级"
                : row.grade == "10"
                ? "高一"
                : row.grade == "11"
                ? "高二"
                : row.grade == "12"
                ? "高三"
                : "";
            return h("span", text + row.studentClass + "班");
          },
        },
        {
          title: "体测得分",
          key: "testScore",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (row.testScore <= 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "体测等级",
          key: "testScoreLevel",
          align: "center",
          width: 70,
          render: (h, params) => {
            const row = params.row;
            let text = row.testScore / 100;
            if (row.testScore <= 0) {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "第一学期学科评价得分",
          key: "firstSemesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.firstSemesterScore / 100;
            if (row.firstOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "第一学期学科评价等级",
          key: "firstSemesterLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.firstSemesterScore / 100;
            if (row.firstOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "第二学期学科评价得分",
          key: "secondSemesterScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.secondSemesterScore / 100;
            if (row.secondOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "第二学期学科评价等级",
          key: "secondSemesterLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = row.secondSemesterScore / 100;
            if (row.secondOver == "0") {
              text = "-";
            } else {
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "学年学科评价平均分",
          key: "yearScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            if (row.secondOver == "0" || row.firstOver == "0") {
              text = "-";
            } else {
              text = text / 2;
              text = text.toFixed(1);
            }
            return h("span", text);
          },
        },
        {
          title: "学年学科评价等级",
          key: "yearScoreLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            if (row.secondOver == "0" || row.firstOver == "0") {
              text = "-";
            } else {
              text = text / 2;
              text = text.toFixed(1);
            }
            let showInfo = "";
            if (text >= 90) {
              showInfo = "优秀";
            } else if (text >= 80) {
              showInfo = "良好";
            } else if (text >= 60) {
              showInfo = "及格";
            } else if (text > 0) {
              showInfo = "不及格";
            } else {
              showInfo = "-";
            }
            return h("span", showInfo);
          },
        },
        {
          title: "学年体育素质综合评价成绩",
          key: "allScoreShow",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let textSemester =
              row.firstSemesterScore / 100 + row.secondSemesterScore / 100;
            let testScore = row.testScore / 100;
            if (
              row.secondOver == "0" ||
              row.firstOver == "0" ||
              row.testScore <= 0
            ) {
              return h("span", "-");
            } else {
              textSemester = textSemester / 2;
              textSemester = textSemester.toFixed(1);
              let allScoreShow = Number(textSemester) + Number(testScore);
              allScoreShow = allScoreShow / 2;
              allScoreShow = allScoreShow.toFixed(1);
              return h("span", allScoreShow);
            }
          },
        },
      ],
      orderTypeList: [
        {
          value: "1",
          label: "降序",
        },
        {
          value: "2",
          label: "升序",
        },
      ],
      primaryList: [
        {
          grade: 1,
          label: "一年级",
        },
        {
          grade: 2,
          label: "二年级",
        },
        {
          grade: 3,
          label: "三年级",
        },
        {
          grade: 4,
          label: "四年级",
        },
        {
          grade: 5,
          label: "五年级",
        },
        {
          grade: 6,
          label: "六年级",
        },
      ],
      middleList: [
        {
          grade: 7,
          label: "七年级",
        },
        {
          grade: 8,
          label: "八年级",
        },
        {
          grade: 9,
          label: "九年级",
        },
      ],
      highList: [
        // {
        //   grade: "",
        //   label: '全部'
        // },
        {
          grade: 10,
          label: "高一",
        },
        {
          grade: 11,
          label: "高二",
        },
        {
          grade: 12,
          label: "高三",
        },
      ],
      collegeList: [
        {
          grade: 13,
          label: "大一",
        },
        {
          grade: 14,
          label: "大二",
        },
        {
          grade: 15,
          label: "大三",
        },
        {
          grade: 16,
          label: "大四",
        },
      ],
      classList: [
            {
                value: '',
                label: '全部'
            },
            {
                value: 1,
                label: '1班'
            },
            {
                value: 2,
                label: '2班'
            },
            {
                value: 3,
                label: '3班'
            },
            {
                value: 4,
                label: '4班'
            },
            {
                value: 5,
                label: '5班'
            },
            {
                value: 6,
                label: '6班'
            },
            {
                value: 7,
                label: '7班'
            },
            {
                value: 8,
                label: '8班'
            },
            {
                value: 9,
                label: '9班'
            },
            {
                value: 10,
                label: '10班'
            },
            {
                value: 11,
                label: '11班'
            },
            {
                value: 12,
                label: '12班'
            },
            {
                value: 13,
                label: '13班'
            },
            {
                value: 14,
                label: '14班'
            },
            {
                value: 15,
                label: '15班'
            },
            {
                value: 16,
                label: '16班'
            },
            {
                value: 17,
                label: '17班'
            },
            {
                value: 18,
                label: '18班'
            },
            {
                value: 19,
                label: '19班'
            },
            {
                value: 20,
                label: '20班'
            },
            {
                value: 21,
                label: '21班'
            },
            {
                value: 22,
                label: '22班'
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
      schoolGradeList: [],
      studentClass: "",
      registerCode: "",
      studentName: "",
      isCollege: false,
      college: "",
      collegesList: [],
      major: "",
      majorList: [],
      chooseCollege: true,
      collegeName: "",
      pageNum: 1,
      pageSize: 10,
      total: 0,
      selectYear: "1",
    };
  },
  methods: {
    getGradeSportsClassList() {
      var vm = this;
      this.$axios
        .get(
          "/v1/cd/high/skills/getGradeSportsClassList?schoolId=" +
            vm.schoolId +
            "&gradeId=" +
            vm.grade
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            let a = {
              sportsClassId: -1,
              sportsClassName: "全部",
            };
            vm.gradeSportsClassList = data;
            vm.gradeSportsClassList.unshift(a);
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    sortChange(column) {
      if (column.order == "desc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else if (column.order == "asc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else {
        this.orderField = "student_class";
        this.orderSort = "";
      }

      this.search(1);
    },
    sortChange2(column) {
      if (column.order == "desc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else if (column.order == "asc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else {
        this.orderField = "student_class";
        this.orderSort = "";
      }

      this.search(2);
    },
    sortChange3(column) {
      if (column.order == "desc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else if (column.order == "asc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else {
        this.orderField = "student_class";
        this.orderSort = "";
      }

      this.search(3);
    },
    openSignature() {
      var vm = this;
      vm.modal1 = true;
    },
    cancel() {
      var vm = this;
      vm.modal1 = false;
    },
    openSignatureStatus() {
      var vm = this;
      if (vm.repeatStatus) {
        return false;
      }
      vm.repeatStatus = true;
      this.$axios.get("/v1/parentSignature/openParentSignature").then((res) => {
        vm.repeatStatus = false;
        if (res.data.code == 10000) {
          this.signatureTf = true;
          vm.$Message.info("开启成功");
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    search(type) {
      var vm = this;
      let schoolId = vm.schoolId;
      vm.queryYearSemesterList(type);
      //vm.getExerciseListCount(schoolId)
    },
    selectTabs(name) {
      this.selectTabName = name;
      sessionStorage.setItem(
        "sportsScoreStudent-selectTabName",
        this.selectTabName
      );
    },
    queryStudentScoreYearListCD(type) {
      var vm = this;
      vm.loading = true;
      let yearSemesterQuery = "";
      let pageNum = 0;
      let pageSize = 0;
      let data = {
        orderField: vm.orderField,
        orderSort: vm.orderSort,
        grade: vm.grade,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        registerCode: vm.registerCode,
        gender: vm.gender,
      };
      data.firstYearSemester = vm.firstYearSemester;
      data.secondYearSemester = vm.secondYearSemester;
      data.pageNo = vm.pageNumYear;
      data.pageSize = vm.pageSizeYear;
      this.$axios
        .post("/v1/semesterScore/queryStudentScoreYearListCD", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.resultDataYear = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },

    queryYearSemesterList(type) {
      // if(this.schoolDistrict == '1000' && type ==3){
      //   this.queryStudentScoreYearListCD();
      //   return ;
      // }
      var vm = this;
      vm.loading = true;
      let yearSemesterQuery = "";
      let pageNum = 0;
      let pageSize = 0;

      let data = {
        grade: vm.grade,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        registerCode: vm.registerCode,
        gender: vm.gender,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        orderField: vm.orderField,
        orderSort: vm.orderSort,
        sportsClassId: vm.sportsClassId == -1 ? "" : vm.sportsClassId,
      };

      if (type == 1) {
        data.pageNo = vm.pageNumFirst;
        data.pageSize = vm.pageSizeFirst;
        data.firstYearSemester = vm.firstYearSemester;
        data.selectYear = "1";
      } else if (type == 2) {
        data.secondYearSemester = vm.secondYearSemester;
        data.pageNo = vm.pageNumSecond;
        data.pageSize = vm.pageSizeSecond;
        data.selectYear = "2";
      } else if (type == 3) {
        data.firstYearSemester = vm.firstYearSemester;
        data.secondYearSemester = vm.secondYearSemester;
        data.pageNo = vm.pageNumYear;
        data.pageSize = vm.pageSizeYear;
        data.selectYear = "3";
      }
      // this.$axios.post("/v1/semesterScore/queryStudentScoreList",data).then(res => {
      this.$axios
        .post("/v1/cd/high/semester/querylHighYearSemesterScore", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            if (type == 1) {
              // res.data.response[9].healthOver="1"
              vm.resultDataFirst = res.data.response;
              for (let i = 0; i < vm.resultDataFirst.length; i++) {
                if (vm.resultDataFirst[i].testScore != null) {
                  if (vm.grade == 12) {
                    vm.resultDataFirst[i].semesterCredit =
                      vm.resultDataFirst[i].actionCredit;
                  }
                  vm.resultDataFirst[i].testScore = (
                    vm.resultDataFirst[i].testScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataFirst[i].staminaScore != null) {
                  vm.resultDataFirst[i].staminaScore = (
                    vm.resultDataFirst[i].staminaScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataFirst[i].healthScore != null) {
                  vm.resultDataFirst[i].healthScore = (
                    vm.resultDataFirst[i].healthScore / 100
                  ).toFixed(2);
                }

                let level = "";
                if (vm.resultDataFirst[i].testScore != null) {
                  if (vm.resultDataFirst[i].testScore >= 90) {
                    level = "优秀";
                  } else if (
                    vm.resultDataFirst[i].testScore >= 80 &&
                    vm.resultDataFirst[i].testScore < 90
                  ) {
                    level = "良好";
                  } else if (
                    vm.resultDataFirst[i].testScore >= 60 &&
                    vm.resultDataFirst[i].testScore < 80
                  ) {
                    level = "及格";
                  } else {
                    level = "不及格";
                  }
                }
                vm.resultDataFirst[i].testScoreLevel = level;
              }
              // if(vm.secondYearSemester!=""){
              // for(let i=0;i<vm.resultDataFirst.length;i++){
              // res.data.response[i].healthOver="1"
              // res.data.response[i].actionOver="1"
              // res.data.response[i].staminaOver="1"
              //  }
              // }
            } else if (type == 2) {
              vm.resultDataSecond = res.data.response;
              for (let i = 0; i < vm.resultDataSecond.length; i++) {
                if (vm.grade == 12) {
                  vm.resultDataSecond[i].semesterCredit =
                    vm.resultDataSecond[i].actionCredit;
                }
                if (vm.resultDataSecond[i].testScore != null) {
                  vm.resultDataSecond[i].testScore = (
                    vm.resultDataSecond[i].testScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataSecond[i].staminaScore != null) {
                  vm.resultDataSecond[i].staminaScore = (
                    vm.resultDataSecond[i].staminaScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataSecond[i].healthScore != null) {
                  vm.resultDataSecond[i].healthScore = (
                    vm.resultDataSecond[i].healthScore / 100
                  ).toFixed(2);
                }
                let level = "";
                if (vm.resultDataSecond[i].testScore != null) {
                  if (vm.resultDataSecond[i].testScore >= 90) {
                    level = "优秀";
                  } else if (
                    vm.resultDataSecond[i].testScore >= 80 &&
                    vm.resultDataSecond[i].testScore < 90
                  ) {
                    level = "良好";
                  } else if (
                    vm.resultDataSecond[i].testScore >= 60 &&
                    vm.resultDataSecond[i].testScore < 80
                  ) {
                    level = "及格";
                  } else {
                    level = "不及格";
                  }
                }
                vm.resultDataSecond[i].testScoreLevel = level;
              }
            } else if (type == 3) {
              if (vm.grade == 12) {
                vm.resultColumnsThrid = vm.resultColumnsCDHigh;
              } else {
                vm.resultColumnsThrid = vm.resultColumnsCDHighNotThird;
              }
              vm.resultDataYear = res.data.response;
              for (let i = 0; i < vm.resultDataYear.length; i++) {
                if (vm.grade == 12) {
                  vm.resultDataYear[i].semesterCredit =
                    vm.resultDataYear[i].staminaCredit +
                    vm.resultDataYear[i].healthCredit +
                    vm.resultDataYear[i].actionTotalCredit;
                }
                if (vm.resultDataYear[i].testScore != null) {
                  vm.resultDataYear[i].testScore = (
                    vm.resultDataYear[i].testScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataYear[i].staminaScore != null) {
                  vm.resultDataYear[i].staminaScore = (
                    vm.resultDataYear[i].staminaScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataYear[i].healthScore != null) {
                  vm.resultDataYear[i].healthScore = (
                    vm.resultDataYear[i].healthScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataYear[i].healthCreditScore != null) {
                  vm.resultDataYear[i].healthCreditScore = (
                    vm.resultDataYear[i].healthCreditScore / 100
                  ).toFixed(2);
                }
                if (vm.resultDataYear[i].staminaCreditScore != null) {
                  vm.resultDataYear[i].staminaCreditScore = (
                    vm.resultDataYear[i].staminaCreditScore / 100
                  ).toFixed(2);
                }
                let level = "";
                if (vm.resultDataYear[i].testScore != null) {
                  if (vm.resultDataYear[i].testScore >= 90) {
                    level = "优秀";
                  } else if (
                    vm.resultDataYear[i].testScore >= 80 &&
                    vm.resultDataYear[i].testScore < 90
                  ) {
                    level = "良好";
                  } else if (
                    vm.resultDataYear[i].testScore >= 60 &&
                    vm.resultDataYear[i].testScore < 80
                  ) {
                    level = "及格";
                  } else {
                    level = "不及格";
                  }
                }
                vm.resultDataYear[i].testScoreLevel = level;
              }
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    queryYearSemesterListCount(type) {
      var vm = this;
      if (this.grade == 0) {
        this.grade = "";
      }
      let data = {
        grade: vm.grade,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        registerCode: vm.registerCode,
        gender: vm.gender,
        sportsClassId: vm.sportsClassId == -1 ? "" : vm.sportsClassId,
      };
      if (type == 1) {
        data.pageNo = vm.pageNumFirst;
        data.pageSize = vm.pageSizeFirst;
        data.firstYearSemester = vm.firstYearSemester;
      } else if (type == 2) {
        data.secondYearSemester = vm.secondYearSemester;
        data.pageNo = vm.pageNumSecond;
        data.pageSize = vm.pageSizeSecond;
      } else if (type == 3) {
        data.yearSemester = vm.firstYearSemester;
        data.pageNo = vm.pageNumYear;
        data.pageSize = vm.pageSizeYear;
      }
      this.$axios
        .post("/v1/cd/high/semester/queryHighStudentScoreCount", data)
        .then((res) => {
          if (res.data.code == 10000) {
            if (type == 1) {
              this.totalFirst = res.data.response;
            } else if (type == 2) {
              this.totalSecond = res.data.response;
            } else if (type == 3) {
              this.totalYear = res.data.response;
            }
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    toDetail(row) {
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-studentId",
        row.studentId
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-studentName",
        row.studentName
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-registerCode",
        row.registerCode
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-gender",
        row.gender
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-grade",
        row.grade
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-startSchool",
        row.startSchool
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-studentClass",
        row.studentClass
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-firstYearSemester",
        this.firstYearSemester
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-secondYearSemester",
        this.secondYearSemester
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-selectTabName",
        ""
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-selectYear",
        this.selectYear
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-sportsClassName",
        row.sportsClassName
      );
      this.$router.push({ name: "sportsYearSemesterScoreStudentDetail" });
    },
    toDetailCD(row) {
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-studentId",
        row.studentId
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-studentName",
        row.studentName
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-registerCode",
        row.registerCode
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-gender",
        row.gender
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-grade",
        row.grade
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-startSchool",
        row.startSchool
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-studentClass",
        row.studentClass
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-firstYearSemester",
        this.firstYearSemester
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-secondYearSemester",
        this.secondYearSemester
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsScoreStudentDetail-selectTabName",
        ""
      );
      this.$router.push({ name: "sportsScoreStudentDetailCD" });
    },
    dataReport() {
      var vm = this;
      vm.isReport = true;
      vm.batchScore();
    },
    pageNumChangeFirst(value) {
      //页码改变方法处理
      if (this.pageNumFirst != value) {
        this.pageNumFirst = value;
        this.queryYearSemesterList(1);
      }
    },
    pageSizechangeFirst(value) {
      //页面大小改变方法处理
      if (this.pageSizeFirst != value) {
        this.pageSizeFirst = value;
        this.pageNumFirst = 1;
        this.queryYearSemesterList(1);
      }
    },

    pageNumChangeSecond(value) {
      //页码改变方法处理
      if (this.pageNumSecond != value) {
        this.pageNumSecond = value;
        this.queryYearSemesterList(2);
      }
    },
    pageSizechangeSecond(value) {
      //页面大小改变方法处理
      if (this.pageSizeSecond != value) {
        this.pageSizeSecond = value;
        this.pageNumSecond = 1;
        this.queryYearSemesterList(2);
      }
    },

    pageNumChangeYear(value) {
      //页码改变方法处理
      if (this.pageNumYear != value) {
        this.pageNumYear = value;
        this.queryYearSemesterList(3);
      }
    },
    pageSizechangeYear(value) {
      //页面大小改变方法处理
      if (this.pageSizeYear != value) {
        this.pageSizeYear = value;
        this.pageNumYear = 1;
        this.queryYearSemesterList(3);
      }
    },
    querySportsScoreCreateTime() {
      var vm = this;
      this.$axios
        .get("/v1/cd/high/semester/queryHighSportsScoreCreateTime")
        .then((res) => {
          if (res.data.code == 10000) {
            this.schoreCreateTime = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getSchoolParentSignatureStatus() {
      var vm = this;
      this.$axios
        .get("/v1/parentSignature/getSchoolParentSignatureStatus")
        .then((res) => {
          if (res.data.code == 10000) {
            if (res.data.response.data == "1") {
              this.signatureTf = true;
            } else {
              this.signatureTf = false;
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    batchScore1() {
      //重新计算学期-学习态度
      this.typeScore = 0;
      this.createSemesterScore = true;
      this.$axios
        .get("/v1/cd/high/semester/batchInsertHighLearnScore")
        .then((res) => {
          if (res.data.code == 10000) {
            this.batchScore2();
            this.typeScore = 15;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    batchScore2() {
      //重新计算学期-课外锻炼
      this.$axios
        .get("/v1/cd/high/semester/batchInsertHighHomeworkScore")
        .then((res) => {
          if (res.data.code == 10000) {
            this.batchScore3();
            this.typeScore = 30;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    batchScore3() {
      //重新计算学期-技能考试  需要先计算 课外锻炼 和 学习态度
      this.$axios
        .get("/v1/cd/high/semester/batchInsertHighExamActionScore")
        .then((res) => {
          if (res.data.code == 10000) {
            this.batchScore4();
            this.typeScore = 45;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    batchScore4() {
      //只有第一学期 才会真正执行
      this.$axios
        .get("/v1/cd/high/semester/batchInsertHighTestScore")
        .then((res) => {
          if (res.data.code == 10000) {
            this.batchScore5();
            this.typeScore = 60;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    batchScore5() {
      //重新计算学期-健康知识
      this.$axios
        .get("/v1/cd/high/semester/batchInsertHighHealthyScore")
        .then((res) => {
          if (res.data.code == 10000) {
            this.batchScore6();
            this.typeScore = 75;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    batchScore6() {
      //重新计算学期-体能
      this.$axios
        .get("/v1/cd/high/semester/batchInsertHighStaminaScore")
        .then((res) => {
          if (res.data.code == 10000) {
            this.batchScore7();
            this.typeScore = 90;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    batchScore7() {
      //重新计算学期-总分数
      this.$axios
        .get("/v1/cd/high/semester/batchInsertHighSemesterScore")
        .then((res) => {
          if (res.data.code == 10000) {
            if (this.isReport) {
              this.$router.push({ name: "subjectReport" });
            } else {
              this.querySportsScoreCreateTime();
              this.getSchoolAllYearSemester();
              this.typeScore = 100;
              this.createSemesterScore = false;
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    queryStudentScore() {
      let vm = this;
      vm.pageNumYear=1;
      vm.pageNumSecond=1;
      vm.pageNumFirst=1;
      vm.pageNum=1;
      vm.getSchoolParentSignatureStatus();
      sessionStorage.setItem("sportsScoreStudent-grade", vm.grade);
      sessionStorage.setItem(
        "sportsScoreStudent-studentClass",
        vm.studentClass
      );
      sessionStorage.setItem(
        "sportsScoreStudent-sportsClassId",
        vm.sportsClassId
      );
      sessionStorage.setItem(
        "sportsScoreStudent-registerCode",
        vm.registerCode
      );
      sessionStorage.setItem("sportsScoreStudent-gender", vm.gender);
      sessionStorage.setItem("sportsScoreStudent-studentName", vm.studentName);
      sessionStorage.setItem("sportsScoreStudent-pageNum", vm.pageNum);
      sessionStorage.setItem("sportsScoreStudent-pageSize", vm.pageSize);
      if (vm.grade == 12) {
        vm.yearName = "学段";
      } else {
        vm.yearName = "学年";
      }
      if (vm.firstYearSemester != "") {
        this.queryYearSemesterList(1);
        this.queryYearSemesterListCount(1);
      }
      if (vm.secondYearSemester != "") {
        this.queryYearSemesterList(2);
        this.queryYearSemesterListCount(2);
        if (vm.schoolDistrict == "1000") {
        } else {
          this.queryYearSemesterList(3);
          this.queryYearSemesterListCount(3);
        }
      }
      if (vm.schoolDistrict == "1000") {
        this.queryYearSemesterList(3);
        this.queryYearSemesterListCount(3);
      }
    },
    getSchoolAllYearSemester() {
      var vm = this;
      this.$axios
        .get("/v1/sports/class/getSchoolAllYearSemester")
        .then((res) => {
          if (res.data.code == 10000) {
            vm.semesterYearList = res.data.response;
            if (res.data.response) {
              let yearSemester = res.data.response[0].yearSemester;
              if (yearSemester % 2 == 1) {
                vm.secondYearSemester = yearSemester;
                vm.firstYearSemester = yearSemester - 10 + 1;
              } else {
                vm.firstYearSemester = yearSemester;
                vm.secondYearSemester = "";
              }
              vm.queryStudentScore();
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    exportStudentScore() {
      var vm = this;
      if (typeof vm.grade == "undefined") {
        vm.grade = "";
      }
      if (typeof vm.studentClass == "undefined") {
        vm.studentClass = "";
      }
      if (typeof vm.gender == "undefined") {
        vm.gender = "";
      }
      if (typeof vm.studentName == "undefined") {
        vm.studentName = "";
      }
      if (typeof vm.registerCode == "undefined") {
        vm.registerCode = "";
      }
      let url =
        this.$axios.defaults.baseURL +
        "/v1/semesterScore/exportStudentScorePdf?grade=" +
        vm.grade +
        "&studentClass=" +
        vm.studentClass +
        "&gender=" +
        vm.gender +
        "&studentName=" +
        vm.studentName +
        "&registerCode=" +
        vm.registerCode +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    exportData() {
      var vm = this;
      if (
        vm.selectYear == "2" &&
        (vm.resultDataSecond == null || vm.resultDataSecond.length <= 0)
      ) {
        vm.$Message.info("没有第二学期数据！");
        return false;
      }
      if (typeof vm.grade == "undefined") {
        vm.grade = "";
      }
      if (typeof vm.studentClass == "undefined") {
        vm.studentClass = "";
      }
      if (typeof vm.selectYear == "undefined") {
        vm.selectYear = "";
      }
      if (typeof vm.gender == "undefined") {
        vm.gender = "";
      }
      if (typeof vm.studentName == "undefined") {
        vm.studentName = "";
      }
      if (typeof vm.registerCode == "undefined") {
        vm.registerCode = "";
      }
      if (typeof vm.schoolDistrict == "undefined") {
        vm.schoolDistrict = "";
      }
      let url =
        this.$axios.defaults.baseURL +
        "/v1/semesterScore/exportStudentListV2?grade=" +
        vm.grade +
        "&studentClass=" +
        vm.studentClass +
        "&selectYear=" +
        vm.selectYear +
        "&gender=" +
        vm.gender +
        "&studentName=" +
        vm.studentName +
        "&registerCode=" +
        vm.registerCode +
        "&schoolDistrict=" +
        vm.schoolDistrict +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
  },
  watch: {
    college: function () {
      var vm = this;
      vm.getSchoolMajorBySchoolId(vm.schoolId, vm.college);
    },
    selectTabName: function () {
      var vm = this;
      if (vm.selectTabName == "first") {
        vm.selectYear = "1";
      } else if (vm.selectTabName == "second") {
        vm.selectYear = "2";
      } else if (vm.selectTabName == "year") {
        vm.selectYear = "3";
      }
    },
    grade: function () {
      var vm = this;
      vm.getGradeSportsClassList();
    },
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    if (vm.orderType == "") {
      vm.orderType = "1";
    }
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.schoolType = schoolType;
    // vm.updateUrl =this.$axios.defaults.baseURL + '/v1/file/upload?type=excel';
    if (schoolType) {
      if ("0" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList);
      }
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
        vm.grade = 1;
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
        vm.grade = 7;
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
        vm.grade = 10;
      }
    } else {
      vm.schoolGradeList = vm.schoolGradeList
        .concat(vm.primaryList)
        .concat(vm.middleList)
        .concat(vm.highList)
        .concat(vm.collegeList);
    }

    this.selectTabName = sessionStorage.getItem(
      "sportsScoreStudent-selectTabName"
    );
    if (this.selectTabName == undefined) {
      this.selectTabName = "";
    }

    let grade = sessionStorage.getItem("sportsScoreStudent-grade");
    let studentClass = sessionStorage.getItem(
      "sportsScoreStudent-studentClass"
    );
    let registerCode = sessionStorage.getItem(
      "sportsScoreStudent-registerCode"
    );
    let studentName = sessionStorage.getItem("sportsScoreStudent-studentName");
    let pageNum = sessionStorage.getItem("sportsScoreStudent-pageNum");
    let pageSize = sessionStorage.getItem("sportsScoreStudent-pageSize");
    let gender = sessionStorage.getItem("sportsScoreStudent-gender");
    let sportsClassId = Number(
      sessionStorage.getItem("sportsScoreStudent-sportsClassId")
    );
    if (
      sportsClassId != null &&
      sportsClassId != "" &&
      sportsClassId != undefined &&
      sportsClassId > 0
    ) {
      vm.sportsClassId = sportsClassId;
    }

    if (grade != null && grade != "" && grade != undefined && grade > 0) {
      vm.grade = Number(grade);
    }
    if (
      studentClass != null &&
      studentClass != "" &&
      studentClass != undefined &&
      studentClass > 0
    ) {
      vm.studentClass = Number(studentClass);
    }
    if (
      registerCode != null &&
      registerCode != "" &&
      registerCode != undefined
    ) {
      vm.registerCode = registerCode;
    }
    if (studentName != null && studentName != "" && studentName != undefined) {
      vm.studentName = studentName;
    }
    if (gender != null && gender != "" && typeof gender == "undefined") {
      vm.gender = gender;
    }
    if (
      pageNum != null &&
      pageNum != "" &&
      pageNum != undefined &&
      pageNum > 0
    ) {
      vm.pageNum = Number(pageNum);
    }
    if (
      pageSize != null &&
      pageSize != "" &&
      pageSize != undefined &&
      pageSize > 0
    ) {
      vm.pageSize = Number(pageSize);
    }
    vm.schoolDistrict = sessionStorage.getItem("schoolDistrict");
    vm.querySportsScoreCreateTime();
    vm.getSchoolAllYearSemester();
    vm.getGradeSportsClassList();
  },
};
</script>
