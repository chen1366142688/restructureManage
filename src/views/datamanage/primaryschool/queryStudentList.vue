<style scoped>
.width120 {width: 120px;}
.tableTitle{font-size: 18px; height: 40px}
</style>
<template>
  <div style="padding-left: 10px">
    <h2 style="margin-top: 15px; margin-bottom: 13px">按学生查询</h2>
    <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin: 5px 20px">
                <span>年<span style="visibility: hidden">占位</span>级：</span>
                <Select v-model="grade" class="width120">
                    <Option
                    v-for="item in schoolGradeList"
                    :value="item.grade"
                    :key="item.grade"
                    >{{ item.label }}</Option
                    >
                </Select>
                </div>
                <div style="margin: 5px 20px">
                <span>班<span style="visibility: hidden">占位</span>级：</span>
                <Select v-model="studentClass" class="width120">
                    <Option
                    v-for="item in classList"
                    :value="item.value"
                    :key="item.value"
                    >{{ item.label }}</Option
                    >
                </Select>
                </div>
                <div style="margin: 5px 20px">
                <span>性<span style="visibility: hidden">占位</span>别：</span>
                <Select v-model="gender" class="width120">
                    <Option
                    v-for="item in genderType"
                    :value="item.typeId"
                    :key="item.typeId"
                    >{{ item.typeName }}</Option
                    >
                </Select>
                </div>
                <div style="margin: 5px 20px">
                <span>等<span style="visibility: hidden">占位</span>级：</span>
                <Select v-model="scoreLevel" class="width120">
                    <Option
                    v-for="item in scoreLevelList"
                    :value="item.typeId"
                    :key="item.typeId"
                    >{{ item.typeName }}</Option
                    >
                </Select>
                </div>
                <div style="margin: 5px 20px">
                <span>姓<span style="visibility: hidden">占位</span>名：</span>
                <Input
                    v-model="studentName"
                    placeholder="学生姓名"
                    class="width120"
                />
                </div>
                <div style="margin: 5px 20px 5px 18px">
                <span>学&nbsp;&nbsp;籍&nbsp;&nbsp;号：</span>
                <Input
                    v-model="registerCode"
                    placeholder="学生学籍号"
                    class="width120"
                />
                </div>
                <div style="margin: 5px 20px">
                <span
                    >是否{{ (schoolDistrict = 2000 ? "免考" : "免试") }}：</span
                >
                <Select v-model="exemptStatus" class="width120">
                    <Option
                    v-for="item in exemptStatusType"
                    :value="item.typeId"
                    :key="item.typeId"
                    >{{ item.typeName }}</Option
                    >
                </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button @click="searchInfo()" type="success">查询</Button>
                <Button @click="restore()" type="success"
                >重置查询条件</Button
                >
                <Button
                type="success"
                :disabled="semesterStatus === '0' || editStatus"
                @click="toAddStudentTest"
                >体测成绩录入</Button
                >
                <!-- 第一学期才显示此按钮，第二学期且体测数据已经上报的时候，置灰 -->
                <Button
                type="success"
                v-if="semesterStatus == '1'"
                :disabled="editStatus"
                @click="inputStudentTest"
                >体测数据导入</Button
                >
                <Button
                class="add-button"
                @click="exportSchoolTestData"
                type="success"
                >体测数据导出</Button
                >
                <Button type="success" @click="exportsGroup">学生分组导出</Button>
            </div>
        </div>
    </Card>
    <Card style="margin-top: 20px">
        <div class="tableTitle">数据明细</div>
        <Table
        border
        width="100%"
        max-height="570"
        @on-sort-change="sortChange"
        :columns="resultColumns"
        :data="resultData"
        ></Table>
        <br />
        <Row type="flex" justify="end">
            <Page
                :total="total"
                :current="pageNum"
                :page-size="pageSize"
                @on-change="pageNumChange"
                @on-page-size-change="pageSizechange"
                show-total
                show-sizer
            ></Page>
        </Row>
    </Card>
    <Modal v-model="showGroup" footer-hide>
        <div class="modal-content">
          <div class="modal-title">分组设置</div>
          <Form :label-width="100" :model="formModel">
            <FormItem prop="studentNumber" label="学生总人数">
              <Input type="text" style="width: 100px;" disabled v-model="formModel.studentNumber">
              </Input>人
            </FormItem>
            <FormItem prop="groupNumber" label="每组学生人数">
              <Input type="text" style="width: 100px;" disabled v-model="formModel.groupNumber">
              </Input>人
            </FormItem>
          </Form>
          <div class="modal-btn">
            <Button type="success" @click="exportsGroupContent" style="position: relative;left: 100px;">分组导出</Button>
            <Button type="success" @click="exportsGroup" style="position: relative;left: 200px;">取消</Button>
          </div>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "queryStudentList",
  data() {
    return {
      formModel: {//分组设置
        studentNumber: 100,
        groupNumber: 10,
      },
      showGroup: false,//分组设置弹窗
      schoolDistrict: "",//学校地区
      editStatus: false,
      orderField: "student_name",
      orderSort: "",
      scorexAxisData: [],
      scoreseriesData: [],
      activityId: "",
      gradeName: "",    
      schoolId: "",
      gender: "",
      registerCode: "",
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
      semesterStatus: "0",
      classList: [
        {
          value: 999,
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
      primaryList: [
        { grade: 999, label: "全部" },
        { grade: 1, label: "一年级" },
        { grade: 2, label: "二年级" },
        { grade: 3, label: "三年级" },
        { grade: 4, label: "四年级" },
        { grade: 5, label: "五年级" },
        { grade: 6, label: "六年级" },
      ],
      middleList: [
        { grade: 999, label: "全部" },
        { grade: 7, label: "七年级" },
        { grade: 8, label: "八年级" },
        { grade: 9, label: "九年级" },
      ],
      highList: [
        { grade: 999, label: "全部" },
        { grade: 10, label: "高一" },
        { grade: 11, label: "高二" },
        { grade: 12, label: "高三" },
      ],
      scoreLevel: "",
      scoreLevelList: [
        {
          typeId: "999",
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
          typeId: 999,
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
          title: "班级",
          key: "gradeName",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("span", `${params.row.gradeName}${params.row.studentClass}班`)
            ]);
          },
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
                  ? params.row.standingJumpValue + "cm"
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
                  ? params.row.oneMinuteSitUpValue + "次"
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
                  ? params.row.runThousandValue
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
                  ? params.row.pullUpsValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "总得分",
          key: "totalScore",
          align: "center",
          sortable: "custom",
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
            let level = params.row.totalScoreLevel;
            return h("div", [
              h(
                "span",
                level == "6"
                  ? sessionStorage.getItem("schoolDistrict") == 2000
                    ? "免考"
                    : "免试"
                  : level == "1"
                  ? "优秀"
                  : level == "2"
                  ? "良好"
                  : level == "3"
                  ? "及格"
                  : level == "4"
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
          sortable: "custom",
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
            if(this.semesterStatus == "0"){//第二学期统一显示查看，但详情不能编辑
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
                )
            }else{//第一学期
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
                    this.editStatus ? '详情' : params.row.sign == '1' ? "详情" : '编辑'
                )
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
          title: "班级",
          key: "gradeName",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("span", `${params.row.gradeName}${params.row.studentClass}班`)
            ]);
          },
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
          minWidth: 70,
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
          minWidth: 80,
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
                  ? params.row.oneMinuteSitUpValue + "次"
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
                  ? params.row.oneMinuteRopeSkippingValue + "次"
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
                  ? params.row.runFiftyEightValue
                  : ""
              ),
            ]);
          },
        },
        {
          title: "总得分",
          key: "totalScore",
          align: "center",
          sortable: "custom",
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
                  ? sessionStorage.getItem("schoolDistrict") == 2000
                    ? "免考"
                    : "免试"
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
            if(this.semesterStatus == "0"){//第二学期统一显示查看，但详情不能编辑
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
                )
            }else{//第一学期可以取消签名
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
                    this.editStatus ? '详情' : params.row.sign == '1' ? "详情" : '编辑'
                )
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
          title: "班级",
          key: "gradeName",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h("span", `${params.row.gradeName}${params.row.studentClass}班`)
            ]);
          },
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
                  ? params.row.standingJumpValue + "cm"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "坐位体前屈",
          key: "sitAndReachValue",
          align: "center",
          minWidth: 80,
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
          minWidth: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runEightHundredValue != null
                  ? params.row.runEightHundredValue + `"`
                  : ""
              ),
            ]);
          },
        },
        {
          title: "一分钟仰卧起坐(女)",
          key: "oneMinuteSitUpValue",
          align: "center",
          minWidth: 130,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.oneMinuteSitUpValue != null
                  ? params.row.oneMinuteSitUpValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "1000米跑(男)",
          key: "runThousandValue",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.runThousandValue != null
                  ? params.row.runThousandValue + '"'
                  : ""
              ),
            ]);
          },
        },
        {
          title: "引体向上(男)",
          key: "pullUpsValue",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.haveExempt == "1"
                  ? ""
                  : params.row.pullUpsValue != null
                  ? params.row.pullUpsValue + "次"
                  : ""
              ),
            ]);
          },
        },
        {
          title: "总得分",
          key: "totalScore",
          align: "center",
          sortable: "custom",
          minWidth: 80,
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
                  ? sessionStorage.getItem("schoolDistrict") == 2000
                    ? "免考"
                    : "免试"
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
            if(this.semesterStatus == "0"){//第二学期统一显示查看，但详情不能编辑
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
                )
            }else{//第一学期可以取消签名
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
                    this.editStatus ? '详情' : params.row.sign == '1' ? "详情" : '编辑'
                )
            }
          }
        },
      ],
      resultColumns: [],
      resultData: [],
      exemptStatus: "",
      exemptStatusType: [
        {
          typeId: 999,
          typeName: "全部",
        },
        {
          typeId: 1,
          typeName:
            sessionStorage.getItem("schoolDistrict") == 2000 ? "免考" : "免试",
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
    exportsGroup() {
      this.showGroup = !this.showGroup;
    },
    exportsGroupContent() {
      var vm = this;

      if (typeof vm.grade == "undefined" || vm.grade == 999) {
        vm.grade = "";
      }
      if (typeof vm.studentClass == "undefined" || vm.studentClass == 999) {
        vm.studentClass = "";
      }
      if (typeof vm.gender == "undefined" || vm.gender == 999) {
        vm.gender = "";
      }
      if (typeof vm.scoreLevel == "undefined" || vm.scoreLevel == '999') {
        vm.scoreLevel = "";
      }
      if (typeof vm.studentName == "undefined") {
        vm.studentName = "";
      }
      if (typeof vm.registerCode == "undefined") {
        vm.registerCode = "";
      }
      if (typeof vm.exemptStatus == "undefined" || vm.exemptStatus == 999) {
        vm.exemptStatus = "";
      }
      let schoolId = sessionStorage.getItem("schoolId")
      let yearSemester = sessionStorage.getItem("yearSemester")
      let url =
              this.$axios.defaults.baseURL +
              `/v1/test/export/exportSportsTestStudentInfo?schoolId=${schoolId}&grade=${vm.grade == 999 ?'':vm.grade}&studentClass=${vm.studentClass == 999 ?'':vm.studentClass}&gender=${ vm.gender == 999 ?'':vm.gender}&studentName=${vm.studentName}&registerCode=${vm.registerCode}&yearSemester=${yearSemester}&token=${sessionStorage.getItem("token")}&scoreLevel=${vm.scoreLevel}&exemptStatus=${vm.exemptStatus}`;

      window.open(url);
      this.showGroup = false;
      this.searchInfo()
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
        console.log('studentInfo',studentInfo)
        const {semesterStatus} = this
        const INFO = {
            studentId: studentInfo.studentId,
            activityId: studentInfo.activityId,
            studentName: studentInfo.studentName,
            gender: studentInfo.gender,
            startSchool: studentInfo.startSchool,
            gradeName: studentInfo.gradeName,
            registerCode: studentInfo.registerCode,
            semesterStatus: semesterStatus,//0表示第二学期，1表示第一学期（不知道后台为什么这样定义字段）
            editStatus:this.editStatus,//是否报送
            isEdit: (semesterStatus == '0' ||  this.editStatus || studentInfo.sign == '1') ? false : true, //true表示可编辑
            //详情页是否可编辑：如果是第二学期或者已报送，或者已签名都不能编辑，否则是第一学期就根据签名状态判断，已签不可编辑反之亦然
        }
        this.$router.push({ name: "classTestDetail", params: INFO});
    },
    restore() {
      var vm = this;
      (vm.activityId = vm.activityId), (vm.grade = 0);
      vm.pageNum = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = 999;
      vm.gender = 999;
      vm.studentName = "";
      vm.exemptStatus = 999;
      vm.scoreLevel = "999";
      vm.grade = 999;
      let schoolId = vm.schoolId;
      vm.search();
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

    inputStudentTest() {
      this.$router.push({ name: 'hisPhysicalTestImport', query: {
            yearSemester: ''
        }})
    },
    toAddStudentTest() {
      sessionStorage.setItem(
        "queryStudentList-bathAddStudentTestResult-yearSemester",
        sessionStorage.getItem("yearSemester")
      );
      this.$router.push({ name: "bathAddStudentTestResult" });
    },

    searchInfo() {
      this.pageNum = 1;
      this.search();
    },

    search() {
      var vm = this;
      vm.grade = this.isRegData(vm.grade) ? Number(vm.grade) : 999;
      vm.studentClass = this.isRegData(vm.studentClass) ? Number(vm.studentClass) : 999;
      vm.gender = this.isRegData(vm.gender) ? Number(vm.gender) : 999;
      vm.exemptStatus = this.isRegData(vm.exemptStatus) ? Number(vm.exemptStatus) : 999;
      vm.registerCode = this.isRegData(vm.registerCode) ? vm.registerCode : '';
      vm.studentName = this.isRegData(vm.studentName) ? vm.studentName : '';
      vm.pageNum = this.isRegData(vm.pageNum) ? Number(vm.pageNum) : 1;
      vm.pageSize = this.isRegData(vm.pageSize) ? Number(vm.pageSize) : 10;
      vm.scoreLevel = this.isRegData(vm.scoreLevel) ? vm.scoreLevel : '999';
      sessionStorage.setItem("queryStudentList-grade", vm.grade);
      sessionStorage.setItem("queryStudentList-studentClass", vm.studentClass);
      sessionStorage.setItem("queryStudentList-gender", vm.gender);
      sessionStorage.setItem("queryStudentList-exemptStatus", vm.exemptStatus);
      sessionStorage.setItem("queryStudentList-registerCode", vm.registerCode);
      sessionStorage.setItem("queryStudentList-studentName", vm.studentName);
      sessionStorage.setItem("queryStudentList-pageNum", vm.pageNum);
      sessionStorage.setItem("queryStudentList-pageSize", vm.pageSize);
      sessionStorage.setItem("queryStudentList-scoreLevel", vm.scoreLevel);
      vm.getStudentTestResultList();
      vm.getStudentTestResultListCount();
    },
    getStudentTestResultList() {
      this.$axios
        .get(
          "/v1/test/query/getStudentTestResultList?schoolId=" +
            this.schoolId +
            "&gender=" +
            (this.gender == "999" ? "" : this.gender) +
            "&registerCode=" +
            this.registerCode +
            "&exemptStatus=" +
            (this.exemptStatus == "999" ? "" : this.exemptStatus) +
            "&grade=" +
            (this.grade == "999" ? "" : this.grade) +
            "&pageNo=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize +
            "&studentClass=" +
            (this.studentClass == "999" ? "" : this.studentClass) +
            "&studentName=" +
            this.studentName +
            "&scoreLevel=" +
            (this.scoreLevel == "999" ? "" : this.scoreLevel) +
            "&orderField=" +
            this.orderField +
            "&orderSort=" +
            this.orderSort +
            "&yearSemester=" +
            sessionStorage.getItem("yearSemester")
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let list = res.data.response;
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
              if (list[i].runEightHundredValue != null) {
                list[i].runEightHundredValue =
                  Math.floor(list[i].runEightHundredValue / 60) +
                  "'" +
                  (list[i].runEightHundredValue % 60);
              }
              if (list[i].runThousandValue != null) {
                list[i].runThousandValue =
                  Math.floor(list[i].runThousandValue / 60) +
                  "'" +
                  (list[i].runThousandValue % 60);
              }

              if (list[i].runFiftyEightValue != null) {
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
    getStudentTestResultListCount() {
      this.$axios
        .get(
          "/v1/test/query/getStudentTestResultListCount?schoolId=" +
            this.schoolId +
            "&gender=" +
            (this.gender == "999" ? "" : this.gender) +
            "&registerCode=" +
            this.registerCode +
            "&exemptStatus=" +
            (this.exemptStatus == "999" ? "" : this.exemptStatus) +
            "&grade=" +
            (this.grade == "999" ? "" : this.grade) +
            "&pageNo=" +
            this.pageNum +
            "&pageSize=" +
            this.pageSize +
            "&studentClass=" +
            (this.studentClass == "999" ? "" : this.studentClass) +
            "&studentName=" +
            this.studentName +
            "&scoreLevel=" +
            (this.scoreLevel == "999" ? "" : this.scoreLevel)+
            "&yearSemester=" +
            sessionStorage.getItem("yearSemester")
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.total = res.data.response;
            this.formModel.studentNumber = this.total;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    //获取当前学期是第一学期还是第二学期 0 表示第二学期
    getYearSemester() {
      this.$axios
        .get("/v1/schoolsemesternotice/getYearSemester")
        .then((res) => {
          if (res.data.code == 10000) {
            this.semesterStatus = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
    },
    exportSchoolTestData() {
      var vm = this;

      if (typeof vm.gender == "undefined") {
        vm.gender = "";
      }
      if (typeof vm.registerCode == "undefined") {
        vm.registerCode = "";
      }
      if (typeof vm.exemptStatus == "undefined") {
        vm.exemptStatus = "";
      }
      if (typeof vm.grade == "undefined") {
        vm.grade = "";
      }
      if (typeof vm.scoreLevel == "undefined") {
        vm.scoreLevel = "";
      }
      if (typeof vm.studentClass == "undefined") {
        vm.studentClass = "";
      }
      if (typeof vm.studentName == "undefined") {
        vm.studentName = "";
      }

      let url =
        this.$axios.defaults.baseURL +
        "/v1/test/export/exportStudentTest?schoolId=" +
        this.schoolId +
        "&gender=" +
        (this.gender == "999" ? "" : this.gender) +
        "&registerCode=" +
        this.registerCode +
        "&exemptStatus=" +
        (this.exemptStatus == "999" ? "" : this.exemptStatus) +
        "&grade=" +
        (this.grade == "999" ? "" : this.grade) +
        "&pageNo=1&pageSize=20000" +
        "&studentClass=" +
        (this.studentClass == "999" ? "" : this.studentClass) +
        "&studentName=" +
        this.studentName +
        "&scoreLevel=" +
        (this.scoreLevel == "999" ? "" : this.scoreLevel) +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    querySchoolReportedStatus() {
      this.$axios
        .get("/v1/subjectReport/querySchoolReportedStatus?dataType=1")
        .then((res) => {
          if (res.data.code === 10000) {
            let { editStatus } = res.data.response;
            if (editStatus === "1") {
              this.editStatus = false;
            } else {
              this.editStatus = true;
            }
          }
        });
    },
    //判断参数是否为空或者为NaN或者为undefined
    isRegData(obj){
      if(obj && (`${obj}` != 'NaN')  && (`${obj}` != 'undefined') && (`${obj}` != 'null')) return true;
      else return false;
    },
  },
  created() {
    var vm = this;
    let schoolDistrict = sessionStorage.getItem("schoolDistrict");
    let schoolId = sessionStorage.getItem("schoolId");
    this.schoolDistrict = schoolDistrict;
    let schoolType = sessionStorage.getItem("schoolType");
    let queryStudentListGread = sessionStorage.getItem("queryStudentList-grade");
    let queryStudentListStudentClass = sessionStorage.getItem("queryStudentList-studentClass");
    let queryStudentListGender = sessionStorage.getItem("queryStudentList-gender");
    let queryStudentListExemptStatus = sessionStorage.getItem("queryStudentList-exemptStatus");
    let queryStudentListRegisterCode = sessionStorage.getItem("queryStudentList-registerCode");
    let queryStudentListStudentName = sessionStorage.getItem("queryStudentList-studentName");
    let queryStudentListPageNum = sessionStorage.getItem("queryStudentList-pageNum");
    let queryStudentListPageSize = sessionStorage.getItem("queryStudentList-pageSize");
    let queryStudentListScoreLevel = sessionStorage.getItem("queryStudentList-scoreLevel");
    let queryClassListGrade = sessionStorage.getItem("query-classlist-grade");
    vm.querySchoolReportedStatus();
    if (schoolType == "2") {
      vm.resultColumns = vm.primaryColumns;
    } else if ("3" == schoolType && schoolDistrict == "1000") {
      vm.resultColumns = vm.cdMiddleSchoolColumns;
    } else {
      vm.resultColumns = vm.highSchoolColumns;
    }

    if (schoolType) {
      if ("0" == schoolType) {
        vm.schoolGradeList = [...vm.schoolGradeList,...vm.primaryList,...vm.middleList,...vm.highList]
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

    if (this.isRegData(queryStudentListGread)) {
      this.grade = Number(queryStudentListGread);
    } else {
      vm.grade = vm.schoolGradeList[0].grade;
    }

    if (this.isRegData(queryStudentListStudentClass)) {
      vm.studentClass = Number(queryStudentListStudentClass);
    } else {
      vm.studentClass = vm.classList[0].value;
    }

    if (this.isRegData(queryStudentListGender)) {
      this.gender = Number(queryStudentListGender);
    } else {
      this.gender = 999;
    }

    if (this.isRegData(queryStudentListExemptStatus)) {
      this.exemptStatus = Number(queryStudentListExemptStatus);
    } else {
      this.exemptStatus = 999;
    }

    if (this.isRegData(queryStudentListRegisterCode)) {
      this.registerCode = queryStudentListRegisterCode;
    }

    if (this.isRegData(queryStudentListStudentName)) {
      this.studentName = queryStudentListStudentName;
    }

    if (this.isRegData(queryStudentListPageNum)) {
      this.pageNum = Number(queryStudentListPageNum);
    }

    if (this.isRegData(queryStudentListPageSize)) {
      this.pageSize = Number(queryStudentListPageSize);
    }

    if (this.isRegData(queryStudentListScoreLevel)) {
      this.scoreLevel = queryStudentListScoreLevel.toString();
    } else {
      this.scoreLevel = "999";
    }
    if (this.isRegData(queryClassListGrade)) {
      /**按班级查询传过来的班级年级 */
      let queryObj = JSON.parse(queryClassListGrade);
      this.grade = queryObj.grade;
      this.studentClass = queryObj.classId;
    }else{
      this.grade = 999;
      this.studentClass = 999
    }
    this.getYearSemester();
    this.schoolId = schoolId;
    this.search();
  },
};
</script>
