<style scoped>
.mar-r40 {
  margin-right: 40px;
}
.width120 {
  width: 120px;
}
@media screen and (max-width: 1650px) {
  .mar-r40 {
    margin-right: 15px;
  }
  .width120 {
    width: 100px;
  }
}
</style>
<template>
  <div style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">
        {{
          yearSemester % 2 == 0
            ? (yearSemester / 10).toFixed(0) + "学年第一学期"
            : (yearSemester / 10).toFixed(0) - 1 + "学年第二学期"
        }}体质测试管理
      </h2>
    </div>
    <Card style="margin-top: 20px">
      <div class="top-search">
        <div class="left-input">
          <div style="margin: 5px 10px">
            <span>年<span style="visibility: hidden">占位</span>级：</span>
            <Select v-model="grade" class="width120">
              <Option
                v-for="item in schoolGradeList"
                :value="item.grade"
                :key="item.grade"
                >{{ item.label }}
              </Option>
            </Select>
          </div>
          <div style="margin: 5px 10px">
            <span>班<span style="visibility: hidden">空</span>级：</span>
            <Select v-model="studentClass" class="width120">
              <Option
                v-for="item in classList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}
              </Option>
            </Select>
          </div>
          <div style="margin: 5px 10px">
            <span>性<span style="visibility: hidden">空</span>别：</span>
            <Select v-model="gender" class="width120">
              <Option
                v-for="item in genderType"
                :value="item.typeId"
                :key="item.typeId"
                >{{ item.typeName }}
              </Option>
            </Select>
          </div>
          <div style="margin: 5px 10px">
            <span>是否免试：</span>
            <Select v-model="exemptStatus" class="width120">
              <Option
                v-for="item in exemptStatusType"
                :value="item.typeId"
                :key="item.typeId"
                >{{ item.typeName }}
              </Option>
            </Select>
          </div>
          <div style="margin: 5px 10px">
            <span>姓<span style="visibility: hidden">占位</span>名：</span>
            <Input
              v-model="studentName"
              placeholder="学生姓名"
              class="width120"
            />
          </div>
          <div style="margin: 5px 10px">
            <span>学籍号：</span>
            <Input
              v-model="registerCode"
              placeholder="学生学籍号"
              class="width120"
            />
          </div>
        </div>
        <div class="right-btns">
          <Button v-on:click="searchInfo()" type="success">查询</Button>
          <Button type="success" style="margin-left: 16px" @click="pageToList"
            >返回</Button
          >
        </div>
      </div>
    </Card>
    <Card style="margin-top: 20px">
      <div style="font-size: 18px; height: 40px">数据明细</div>
      <div>
        <Row>
          <div>
            <Table
              border
              width="100%"
              max-height="570"
              @on-sort-change="sortChange"
              :columns="resultColumns"
              :data="resultData"
            ></Table>
          </div>
          <br />
          <div style="float: right">
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
</template>

<script>
import Util from '@/libs/util'
export default {
  name: "teacherList",
  data() {
    return {
      orderField: "student_name",
      yearSemester: "",
      orderSort: "",
      scorexAxisData: [],
      scoreseriesData: [],
      activityId: "",
      collegeName: "",
      majorName: "",
      gradeName: "",
      schoolYear: "",
      startSchool: "",
      schoolId: "",
      gender: "ALL",
      registerCode: "",
      allCount: 0,
      overCount: 0,
      excellentCount: 0,
      wellCount: 0,
      passCount: 0,
      noPassCount: 0,
      exemptCount: 0,
      noTestCount: 0,
      studentName: "",
      grade: "",
      schoolGradeList: [],
      classId: "",
      studentClass: "",
      classList: [
        {
          value: 0,
          label: "全部",
        },
        {
          value: 1,
          label: "1班",
        },
        {
          value: 2,
          label: "2班",
        },
        {
          value: 3,
          label: "3班",
        },
        {
          value: 4,
          label: "4班",
        },
        {
          value: 5,
          label: "5班",
        },
        {
          value: 6,
          label: "6班",
        },
        {
          value: 7,
          label: "7班",
        },
        {
          value: 8,
          label: "8班",
        },
        {
          value: 9,
          label: "9班",
        },
        {
          value: 10,
          label: "10班",
        },
        {
          value: 11,
          label: "11班",
        },
        {
          value: 12,
          label: "12班",
        },
        {
          value: 13,
          label: "13班",
        },
        {
          value: 14,
          label: "14班",
        },
        {
          value: 15,
          label: "15班",
        },
        {
          value: 16,
          label: "16班",
        },
        {
          value: 17,
          label: "17班",
        },
        {
          value: 18,
          label: "18班",
        },
        {
          value: 19,
          label: "19班",
        },
        {
          value: 20,
          label: "20班",
        },
        {
          value: 21,
          label: "21班",
        },
        {
          value: 22,
          label: "22班",
        },
        {
          value: 23,
          label: "23班",
        },
        {
          value: 24,
          label: "24班",
        },
        {
          value: 25,
          label: "25班",
        },
        {
          value: 26,
          label: "26班",
        },
        {
          value: 27,
          label: "27班",
        },
        {
          value: 28,
          label: "28班",
        },
        {
          value: 29,
          label: "29班",
        },
        {
          value: 30,
          label: "30班",
        },
        {
          value: 31,
          label: "31班",
        },
        {
          value: 32,
          label: "32班",
        },
        {
          value: 33,
          label: "33班",
        },
        {
          value: 34,
          label: "34班",
        },
        {
          value: 35,
          label: "35班",
        },
        {
          value: 36,
          label: "36班",
        },
        {
          value: 37,
          label: "37班",
        },
        {
          value: 38,
          label: "38班",
        },
        {
          value: 39,
          label: "39班",
        },
        {
          value: 40,
          label: "40班",
        },
        {
          value: 41,
          label: "41班",
        },
        {
          value: 42,
          label: "42班",
        },
        {
          value: 43,
          label: "43班",
        },
        {
          value: 44,
          label: "44班",
        },
        {
          value: 45,
          label: "45班",
        },
        {
          value: 46,
          label: "46班",
        },
        {
          value: 47,
          label: "47班",
        },
        {
          value: 48,
          label: "48班",
        },
        {
          value: 49,
          label: "49班",
        },
        {
          value: 50,
          label: "50班",
        },
        {
          value: 51,
          label: "51班",
        },
        {
          value: 52,
          label: "52班",
        },
        {
          value: 53,
          label: "53班",
        },
        {
          value: 54,
          label: "54班",
        },
        {
          value: 55,
          label: "55班",
        },
        {
          value: 56,
          label: "56班",
        },
        {
          value: 57,
          label: "57班",
        },
        {
          value: 58,
          label: "58班",
        },
        {
          value: 59,
          label: "59班",
        },
        {
          value: 60,
          label: "60班",
        },
      ],
      primaryList: [
        { grade: 'ALL', label: "全部" },
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      middleList: [
        { grade: 'ALL', label: "全部" },
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      highList: [
        { grade: 'ALL', label: "全部" },
        { grade: 10, label: "高一" },
        { grade: 11, label: "高二" },
        { grade: 12, label: "高三" },
      ],
      scoreLevel: "",
      scoreLevelList: [
        {
          typeId: "",
          typeName: "全部",
        },
        {
          typeId: "1",
          typeName: "优秀",
        },
        {
          typeId: "2",
          typeName: "良好",
        },
        {
          typeId: "3",
          typeName: "及格",
        },
        {
          typeId: "4",
          typeName: "不及格",
        },
      ],
      genderType: [
        {
          typeId: "ALL",
          typeName: "全部",
        },
        {
          typeId: 1,
          typeName: "男生",
        },
        {
          typeId: 2,
          typeName: "女生",
        },
      ],
      cdMiddleSchoolColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" ? "男" : "女"),
            ]);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 160,
        },
        {
          title: "身高",
          key: "height",
          align: "center",
          minWidth: 50,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.height != null
                  ? params.row.height + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "体重",
          key: "weight",
          align: "center",
          minWidth: 50,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.weight != null
                  ? params.row.weight + "kg"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "肺活量",
          key: "vitalCapacityValue",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.vitalCapacityValue != null
                  ? params.row.vitalCapacityValue + "ml"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "50米跑",
          key: "runFiftyValue",
          align: "center",
          minWidth: 50,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runFiftyValue != null
                  ? params.row.runFiftyValue + "s"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "立定跳远",
          key: "standingJumpValue",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.standingJumpValue != null
                  ? params.row.standingJumpValue == -1
                    ? "--"
                    : params.row.standingJumpValue + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "坐位体前屈",
          key: "sitAndReachValue",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.sitAndReachValue != null
                  ? params.row.sitAndReachValue + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "800米跑(女)",
          key: "runEightHundredValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runEightHundredValue != null
                  ? params.row.runEightHundredValue
                  : ""
              ),
            ]);
          },
        },
        {
          title: "一分钟仰卧起坐(女)",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.oneMinuteSitUpValue != null
                  ? params.row.oneMinuteSitUpValue == -1
                    ? "--"
                    : params.row.oneMinuteSitUpValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "1000米跑(男)",
          key: "runThousandValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runThousandValue != null
                  ? params.row.runThousandValue == -1
                    ? "--"
                    : params.row.runThousandValue
                  : ""
              ),
            ]);
          },
        },
        {
          title: "引体向上(男)",
          key: "pullUpsValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.pullUpsValue != null
                  ? params.row.pullUpsValue == -1
                    ? "--"
                    : params.row.pullUpsValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "总得分",
          key: "totalScore",
          align: "center",
          minWidth: 65,
          render: (h, params) => {
            if (params.row.totalScoreLevel == "5") {
              return h("div", [h("span", "--")]);
            } else {
              return h("div", [
                h(
                  "span",
                  params.row.haveExempt == "1"
                    ? ""
                    : params.row.totalScore != null
                    ? params.row.totalScore.toFixed(1) + "分"
                    : ""
                ),
              ]);
            }
          },
        },
        {
          title: "等级",
          key: "totalScoreLevel",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.totalScoreLevel == "6"
                  ? "免试"
                  : params.row.totalScoreLevel == "1"
                  ? "优秀"
                  : params.row.totalScoreLevel == "2"
                  ? "良好"
                  : params.row.totalScoreLevel == "3"
                  ? "及格"
                  : params.row.totalScoreLevel == "4"
                  ? "不及格"
                  : "--"
              ),
            ]);
          },
        },
        {
          title: "分值",
          key: "totalLevelScore",
          align: "center",
          minWidth: 65,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.totalScoreLevel == "6"
                  ? ""
                  : params.row.totalScoreLevel == "1" ||
                    params.row.totalScoreLevel == "2" ||
                    params.row.totalScoreLevel == "3" ||
                    params.row.totalScoreLevel == "4"
                  ? params.row.totalLevelScore
                  : "--"
              ),
            ]);
          },
        },
        {
          title: "是否签名",
          key: "sign",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            if (params.row.signatureStatus == 1) {
              return h("div", [h("span", "是")]);
            } else {
              return h("div", [h("span", "否")]);
            }
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            if (this.yearSemester % 2 == 1) {
              //第二学期统一显示查看，但详情不能编辑
              return h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  on: {
                    click: () => {
                      this.toClassTestDetail(params.row);
                    },
                  },
                },
                "详情"
              );
            } else {
              //第一学期
              return h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  on: {
                    click: () => {
                      this.toClassTestDetail(params.row);
                    },
                  },
                },
                params.row.sign == "1" ? "详情" : "编辑"
              );
            }
          },
        },
      ],
      primaryColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" ? "男" : "女"),
            ]);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 160,
        },
        {
          title: "身高",
          key: "height",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.height != null
                  ? params.row.height + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "体重",
          key: "weight",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.weight != null
                  ? params.row.weight + "kg"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "肺活量",
          key: "vitalCapacityValue",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.vitalCapacityValue != null
                  ? params.row.vitalCapacityValue + "ml"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "50米跑",
          key: "runFiftyValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runFiftyValue != null
                  ? params.row.runFiftyValue + "s"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "坐位体前屈",
          key: "sitAndReachValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.sitAndReachValue != null
                  ? params.row.sitAndReachValue + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "一分钟仰卧起坐",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.oneMinuteSitUpValue != null
                  ? params.row.oneMinuteSitUpValue == -1
                    ? "--"
                    : params.row.oneMinuteSitUpValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "一分钟跳绳",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.oneMinuteRopeSkippingValue != null
                  ? params.row.oneMinuteRopeSkippingValue == -1
                    ? "--"
                    : params.row.oneMinuteRopeSkippingValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "50米X8往返跑",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runFiftyEightValue != null
                  ? params.row.runFiftyEightValue == -1
                    ? "--"
                    : params.row.runFiftyEightValue
                  : ""
              ),
            ]);
          },
        },
        {
          title: "总得分",
          key: "totalScore",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            if (params.row.totalScoreLevel == "5") {
              return h("div", [h("span", "--")]);
            } else {
              return h("div", [
                h(
                  "span",
                  params.row.haveExempt == "1"
                    ? ""
                    : params.row.totalScore != null
                    ? params.row.totalScore.toFixed(1) + "分"
                    : ""
                ),
              ]);
            }
          },
        },
        {
          title: "等级",
          key: "totalScoreLevel",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.totalScoreLevel == "6"
                  ? "免试"
                  : params.row.totalScoreLevel == "1"
                  ? "优秀"
                  : params.row.totalScoreLevel == "2"
                  ? "良好"
                  : params.row.totalScoreLevel == "3"
                  ? "及格"
                  : params.row.totalScoreLevel == "4"
                  ? "不及格"
                  : "--"
              ),
            ]);
          },
        },
        {
          title: "是否签名",
          key: "sign",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            if (params.row.sign == 1) {
              return h("div", [h("span", "是")]);
            } else {
              return h("div", [h("span", "否")]);
            }
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            if (this.yearSemester % 2 == 1) {
              //第二学期统一显示查看，但详情不能编辑
              return h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  on: {
                    click: () => {
                      this.toClassTestDetail(params.row);
                    },
                  },
                },
                "详情"
              );
            } else {
              //第一学期
              return h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  on: {
                    click: () => {
                      this.toClassTestDetail(params.row);
                    },
                  },
                },
                params.row.sign == "1" ? "详情" : "编辑"
              );
            }
          },
        },
      ],
      highSchoolColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h("span", params.row.gender == "1" ? "男" : "女"),
            ]);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 160,
        },
        {
          title: "身高",
          key: "height",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.height != null
                  ? params.row.height + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "体重",
          key: "weight",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.weight != null
                  ? params.row.weight + "kg"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "肺活量",
          key: "vitalCapacityValue",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.vitalCapacityValue != null
                  ? params.row.vitalCapacityValue + "ml"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "50米跑",
          key: "runFiftyValue",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runFiftyValue != null
                  ? params.row.runFiftyValue + "s"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "立定跳远",
          key: "standingJumpValue",
          align: "center",
          minWidth: 60,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.standingJumpValue != null
                  ? params.row.standingJumpValue == -1
                    ? "--"
                    : params.row.standingJumpValue + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "坐位体前屈",
          key: "sitAndReachValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.sitAndReachValue != null
                  ? params.row.sitAndReachValue + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "800米跑(女)",
          key: "runEightHundredValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runEightHundredValue != null
                  ? params.row.runEightHundredValue
                  : ""
              ),
            ]);
          },
        },
        {
          title: "一分钟仰卧起坐(女)",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.oneMinuteSitUpValue != null
                  ? params.row.oneMinuteSitUpValue == -1
                    ? "--"
                    : params.row.oneMinuteSitUpValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "1000米跑(男)",
          key: "runThousandValue",
          align: "center",
          minWidth: 150,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runThousandValue != null
                  ? params.row.runThousandValue == -1
                    ? "--"
                    : params.row.runThousandValue
                  : ""
              ),
            ]);
          },
        },
        {
          title: "引体向上(男)",
          key: "pullUpsValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.pullUpsValue != null
                  ? params.row.pullUpsValue == -1
                    ? "--"
                    : params.row.pullUpsValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "总得分",
          key: "totalScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            if (params.row.totalScoreLevel == "5") {
              return h("div", [h("span", "--")]);
            } else {
              return h("div", [
                h(
                  "span",
                  params.row.haveExempt == "1"
                    ? ""
                    : params.row.totalScore != null
                    ? params.row.totalScore.toFixed(1) + "分"
                    : ""
                ),
              ]);
            }
          },
        },
        {
          title: "等级",
          key: "totalScoreLevel",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.totalScoreLevel == "6"
                  ? "免试"
                  : params.row.totalScoreLevel == "1"
                  ? "优秀"
                  : params.row.totalScoreLevel == "2"
                  ? "良好"
                  : params.row.totalScoreLevel == "3"
                  ? "及格"
                  : params.row.totalScoreLevel == "4"
                  ? "不及格"
                  : "--"
              ),
            ]);
          },
        },
        {
          title: "是否签名",
          key: "sign",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            if (params.row.sign == 1) {
              return h("div", [h("span", "是")]);
            } else {
              return h("div", [h("span", "否")]);
            }
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            if (this.yearSemester % 2 == 1) {
              //第二学期统一显示查看，但详情不能编辑
              return h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  on: {
                    click: () => {
                      this.toClassTestDetail(params.row);
                    },
                  },
                },
                "详情"
              );
            } else {
              //第一学期
              return h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  on: {
                    click: () => {
                      this.toClassTestDetail(params.row);
                    },
                  },
                },
                params.row.sign == "1" ? "详情" : "编辑"
              );
            }
          },
        },
      ],
      resultColumns: [],
      resultData: [],
      exemptStatus: "ALL",
      exemptStatusType: [
        {
          typeId: "ALL",
          typeName: "全部",
        },
        {
          typeId: 1,
          typeName: "免试",
        },
        {
          typeId: 2,
          typeName: "未免试",
        },
      ],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    pageToList() {
      this.$router.go(-1);
    },
    sortChange(column) {
      if (column.order == "desc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else if (column.order == "asc") {
        this.orderField = column.key;
        this.orderSort = column.order;
      } else {
        this.orderField = "student_name";
        this.orderSort = "asc";
      }
      this.search();
    },
    toClassTestDetail(studentInfo) {
      console.log("studentInfo", studentInfo);
      const { yearSemester } = this;
      console.log(yearSemester, "yearSemester----");
      const INFO = {
        studentId: studentInfo.studentId,
        activityId: studentInfo.activityId,
        studentName: studentInfo.studentName,
        gender: studentInfo.gender,
        startSchool: studentInfo.startSchool,
        gradeName: studentInfo.gradeName,
        registerCode: studentInfo.registerCode,
        yearSemester:yearSemester,
        semesterStatus: yearSemester % 2 === 1 ? "0" : "1", //1-第一学期 0-第二学期
        isEdit:
          yearSemester % 2 === 1
            ? false
            : studentInfo.sign == "1"
            ? false
            : true, //true表示可编辑-详情页是否可编辑：如果是第二学期就不能编辑，否则是第一学期就根据签名状态判断，已签不可编辑反之亦然
      };
      this.$router.push({ name: "hisActivityClassTestDetail", params: INFO });
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
    searchInfo() {
      this.pageNum = 1;
      this.search();
    },

    search() {
      var vm = this;
      sessionStorage.setItem("hisActivityStudentList-grade", vm.grade);
      sessionStorage.setItem(
        "hisActivityStudentList-studentClass",
        vm.studentClass
      );
      sessionStorage.setItem("hisActivityStudentList-gender", vm.gender);
      sessionStorage.setItem(
        "hisActivityStudentList-exemptStatus",
        vm.exemptStatus
      );
      sessionStorage.setItem(
        "hisActivityStudentList-registerCode",
        vm.registerCode
      );
      sessionStorage.setItem(
        "hisActivityStudentList-studentName",
        vm.studentName
      );
      sessionStorage.setItem("hisActivityStudentList-pageNum", vm.pageNum);
      sessionStorage.setItem("hisActivityStudentList-pageSize", vm.pageSize);
      sessionStorage.setItem(
        "hisActivityStudentList-scoreLevel",
        vm.scoreLevel
      );
      const params = {
        schoolId: this.schoolId,
        gender: this.gender,
        registerCode: this.registerCode,
        exemptStatus: this.exemptStatus,
        grade: this.grade == 0 ? '' : this.grade,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        studentClass: this.studentClass == 0 ? '' : this.studentClass,
        studentName: this.studentName,
        yearSemester: this.yearSemester
      }
      vm.getStudentTestResultList(params);
      vm.getStudentTestResultListCount(params);
    },
    getStudentTestResultList(params) {
      const url = Util.createURL('/v1/test/query/his/getHisStudentTestResultList', params)
      this.$axios.get(url).then((res) => {
          if (res.data.code == 10000) {
            let list = res.data.response;
            this.allCount = list.length;
            this.overCount = 0;
            this.excellentCount = 0;
            this.wellCount = 0;
            this.passCount = 0;
            this.noPassCount = 0;
            this.exemptCount = 0;
            this.noTestCount = 0;
            this.scorexAxisData = [];
            this.scoreseriesData = [];
            for (let i = 0; i < list.length; i++) {
              let gender = list[i].gender;
              let grade = list[i].grade;
              this.scorexAxisData.push(list[i].studentName);
              this.scoreseriesData.push(list[i].totalScore);
              if (gender == "1") {
                if (grade > 0 && grade < 3) {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].oneMinuteRopeSkippingValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                } else if (grade > 2 && grade < 5) {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].oneMinuteSitUpValue == null ||
                    list[i].oneMinuteRopeSkippingValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                } else if (grade > 4 && grade < 7) {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].oneMinuteSitUpValue == null ||
                    list[i].runFiftyEightValue == null ||
                    list[i].oneMinuteRopeSkippingValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                } else {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].standingJumpValue == null ||
                    list[i].runThousandValue == null ||
                    list[i].pullUpsValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                }
              } else {
                if (grade > 0 && grade < 3) {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].oneMinuteRopeSkippingValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                } else if (grade > 2 && grade < 5) {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].oneMinuteSitUpValue == null ||
                    list[i].oneMinuteRopeSkippingValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                } else if (grade > 4 && grade < 7) {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].oneMinuteSitUpValue == null ||
                    list[i].runFiftyEightValue == null ||
                    list[i].oneMinuteRopeSkippingValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                } else {
                  if (
                    list[i].height == null ||
                    list[i].weight == null ||
                    list[i].vitalCapacityValue == null ||
                    list[i].runFiftyValue == null ||
                    list[i].sitAndReachValue == null ||
                    list[i].oneMinuteSitUpValue == null ||
                    list[i].standingJumpValue == null ||
                    list[i].runEightHundredValue == null
                  ) {
                    list[i].totalScoreLevel = 5;
                  } else {
                    this.overCount = this.overCount + 1;
                  }
                }
              }

              if (list[i].haveExempt == "1") {
                list[i].totalScoreLevel = "6";
                this.exemptCount = this.exemptCount + 1;
              }
              if (list[i].totalScoreLevel == "1") {
                this.excellentCount = this.excellentCount + 1;
              } else if (list[i].totalScoreLevel == "2") {
                this.wellCount = this.wellCount + 1;
              } else if (list[i].totalScoreLevel == "3") {
                this.passCount = this.passCount + 1;
              } else if (list[i].totalScoreLevel == "4") {
                this.noPassCount = this.noPassCount + 1;
              } else if (list[i].totalScoreLevel == "5") {
                this.noTestCount = this.noTestCount + 1;
              }
              if (
                list[i].runEightHundredValue != null &&
                list[i].runEightHundredValue != "--"
              ) {
                list[i].runEightHundredValue =
                  Math.floor(list[i].runEightHundredValue / 60) +
                  "'" +
                  (list[i].runEightHundredValue % 60);
              }
              if (
                list[i].runThousandValue != null &&
                list[i].runThousandValue != -1
              ) {
                list[i].runThousandValue =
                  Math.floor(list[i].runThousandValue / 60) +
                  "'" +
                  (list[i].runThousandValue % 60);
              }

              if (
                list[i].runFiftyEightValue != null &&
                list[i].runFiftyEightValue != -1
              ) {
                list[i].runFiftyEightValue =
                  Math.floor(list[i].runFiftyEightValue / 60) +
                  "'" +
                  (list[i].runFiftyEightValue % 60);
              }
            }
            this.resultData = list;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    getStudentTestResultListCount(params) {
      const url = Util.createURL('/v1/test/query/his/getHisStudentTestResultListCount', params)
      this.$axios.get(url).then((res) => {
          if (res.data.code == 10000) {
            this.total = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
  },
  mounted() {
    var vm = this;
    let schoolType = sessionStorage.getItem("schoolType");
    let schoolDistrict = sessionStorage.getItem("schoolDistrict");

    if (schoolType == "2") {
      vm.resultColumns = vm.primaryColumns;
    } else if ("3" == schoolType && schoolDistrict == "1000") {
      vm.resultColumns = vm.cdMiddleSchoolColumns;
    } else {
      vm.resultColumns = vm.highSchoolColumns;
    }

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

    if (sessionStorage.getItem("hisActivityStudentList-grade")) {
      this.grade = Number(
        sessionStorage.getItem("hisActivityStudentList-grade")
      );
    } else {
      vm.grade = vm.schoolGradeList[0].grade;
    }

    if (sessionStorage.getItem("hisActivityStudentList-studentClass")) {
      vm.studentClass = Number(
        sessionStorage.getItem("hisActivityStudentList-studentClass")
      );
    } else {
      vm.studentClass = vm.classList[0].value;
    }

    if (sessionStorage.getItem("hisActivityStudentList-gender")) {
      this.gender = sessionStorage.getItem("hisActivityStudentList-gender");
    }

    if (sessionStorage.getItem("hisActivityStudentList-exemptStatus")) {
      this.exemptStatus = sessionStorage.getItem(
        "hisActivityStudentList-exemptStatus"
      );
    }

    if (sessionStorage.getItem("hisActivityStudentList-registerCode")) {
      this.registerCode = sessionStorage.getItem(
        "hisActivityStudentList-registerCode"
      );
    }

    if (sessionStorage.getItem("hisActivityStudentList-studentName")) {
      this.studentName = sessionStorage.getItem(
        "hisActivityStudentList-studentName"
      );
    }

    if (sessionStorage.getItem("hisActivityStudentList-pageNum")) {
      this.pageNum = Number(
        sessionStorage.getItem("hisActivityStudentList-pageNum")
      );
    }

    if (sessionStorage.getItem("hisActivityStudentList-pageSize")) {
      this.pageSize = Number(
        sessionStorage.getItem("hisActivityStudentList-pageSize")
      );
    }

    if (sessionStorage.getItem("hisActivityStudentList-scoreLevel")) {
      this.scoreLevel = sessionStorage.getItem(
        "hisActivityStudentList-scoreLevel"
      );
    }
    let activityId = sessionStorage.getItem(
      "hisActivityStudentList-activityId"
    );
    vm.activityId = activityId;
    let yearSemester = sessionStorage.getItem(
      "hisActivityStudentList-yearSemester"
    );
    vm.yearSemester = yearSemester;
    this.schoolId = sessionStorage.getItem("schoolId");
    this.search();
  },
};
</script>
