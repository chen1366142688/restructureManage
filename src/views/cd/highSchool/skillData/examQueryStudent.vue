
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按学生查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>年<span style="visibility:hidden">空</span>级：</span>
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
                  v-for="(item,i) in classList"
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
              <span>免<span style="visibility:hidden">空</span>试：</span>
              <Select v-model="exempt" style="width:120px;">
                <Option
                  v-for="item in exemptList"
                  :value="item.value"
                  :key="item.value"
                >{{ item.name }}</Option>
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
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" @click="batchScore1">重新计算学期体育成绩</Button>
            <Button type="success" @click="exportSchoolTestData1">导出EXCEL</Button>
            <!--<Button type="success" @click="exportSchoolTestData1">导出EXCEL1</Button>-->
          </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size:18px;height:40px;">数据明细</div>
        <Row>
          <div>
            <Table
              border
              max-height="550"
              ref="id"
              :loading="loading"
              :columns="resultColumns"
              :data="resultData"
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
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      showPage:0,
      createSemesterScore: false,
      typeScore: 0,
      loading: false,
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      gender: "",
      exempt: "",
      exemptList: [
        {
          value: "3",
          name: "全部",
        },
        {
          value: "1",
          name: "免试",
        },
        {
          value: "2",
          name: "未免试",
        },
      ],
      genderList: [
        {
          itemId: "3",
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
      highList: [
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
      schoolGradeList: [],
      sportsClassId: "",
      classList: [],
      registerCode: "",
      studentName: "",
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          minWidth: 180,
          align: "center",
          fixed: "left",
        },
        {
          title: "性别",
          key: "gender",
          minWidth: 80,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          minWidth: 180,
          align: "center",
        },
        {
          title: "班级",
          key: "sportsClassName",
          minWidth: 150,
          align: "center",
        },
        {
          title: "项目名称",
          key: "showItemTest",
          align: "center",
          minWidth: 250,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let data = list[i];
                let itemLength = data.itemList.length;
                if (itemLength > 1) {
                  // let middel=itemLength%2==1?(Number((itemLength/2).toFixed(0))):itemLength/2;
                  if (i + 1 == list.length) {
                    text +=
                      "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  if (data.commonStatus == "1") {
                    text += "<p>" + data.classTestName + "</p></div>";
                  } else {
                    text +=
                      "<p >" +
                      data.classTestName +
                      "(" +
                      data.sportsClassName +
                      ")</p></div>";
                  }
                } else {
                  if (list.length == i + 1) {
                    text +=
                      "<div style='width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  if (data.commonStatus == "1") {
                    text += "<p>" + data.classTestName + "</p></div>";
                  } else {
                    text +=
                      "<p >" +
                      data.classTestName +
                      "(" +
                      data.sportsClassName +
                      ")</p></div>";
                  }
                }
              }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "考核内容",
          key: "showItemName",
          align: "center",
          minWidth: 250,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let classTest = list[i];
                for (let j = 0; j < classTest.itemList.length; j++) {
                  let data = classTest.itemList[j];
                  if (
                    i + 1 == list.length &&
                    j + 1 == classTest.itemList.length
                  ) {
                    text +=
                      "<div style=';width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >";
                  }
                  text += "<p>" + data.examItemName + "</p></div>";
                }
              }
            } else {
              text += "<p>--</p>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "成绩",
          key: "showItemValue",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let classTest = list[i];
                for (let j = 0; j < classTest.itemList.length; j++) {
                  let data = classTest.itemList[j];
                  let showData = null;
                  if (data.resultValue) {
                    if (data.resultUnit && data.resultUnit == "分.秒") {
                      showData =
                        Number(data.resultValue) % 60 > 0
                          ? Math.floor(Number(data.resultValue) / 60) +
                            "'" +
                            (Number(data.resultValue) % 60) +
                            '"'
                          : Number(data.resultValue) / 60 + "'";
                    } else {
                      showData =
                        data.resultUnit != "99"
                          ? data.resultValue + "(" + data.resultUnit + ")"
                          : data.resultValue;
                    }
                  }
                  if (
                    i + 1 == list.length &&
                    j + 1 == classTest.itemList.length
                  ) {
                    text +=
                      "<div style=';width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >";
                  }
                  if (data.exemptStatus == "0") {
                    text += "<p>" + (showData ? showData : "--") + "</p></div>";
                  } else {
                    text += "<p>免试</p></div>";
                  }
                }
              }
            } else {
              text += "<p>--</p>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "基础得分",
          key: "showBaseScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let classTest = list[i];
                for (let j = 0; j < classTest.itemList.length; j++) {
                  let data = classTest.itemList[j];
                  if (
                    i + 1 == list.length &&
                    j + 1 == classTest.itemList.length
                  ) {
                    text +=
                      "<div style=';width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >";
                  }
                  if (data.exemptStatus == "0") {
                    text +=
                      "<p>" +
                      (data.baseScore ? data.baseScore : "--") +
                      "</p></div>";
                  } else {
                    text += "<p></p></div>";
                  }
                }
              }
            } else {
              text += "<p>--</p>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "技评得分",
          key: "showTeacherScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let classTest = list[i];
                for (let j = 0; j < classTest.itemList.length; j++) {
                  let data = classTest.itemList[j];
                  if (
                    i + 1 == list.length &&
                    j + 1 == classTest.itemList.length
                  ) {
                    text +=
                      "<div style=';width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style=';width:100%;border-bottom:1px #DFD9DE solid;height:30px;line-height:30px;' >";
                  }
                  if (data.exemptStatus == "0") {
                    text +=
                      "<p>" +
                      (data.teacherScore ? data.teacherScore : "--") +
                      "</p></div>";
                  } else {
                    text += "<p></p></div>";
                  }
                }
              }
            } else {
              text += "<p>--</p>";
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "学习态度",
          key: "learnAttitudeScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let data = list[i];
                let itemLength = data.itemList.length;
                if (itemLength > 1) {
                  // let middel=itemLength%2==1?(Number((itemLength/2).toFixed(0))):itemLength/2;
                  if (i + 1 == list.length) {
                    text +=
                      "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text +=
                    "<p>" +
                    (data.learnAttitudeExempt == "1"
                      ? "免试"
                      : data.learnAttitudeScore / 100) +
                    "</p></div>";
                } else {
                  if (list.length == i + 1) {
                    text +=
                      "<div style='width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text +=
                    "<p>" +
                    (data.learnAttitudeExempt == "1"
                      ? "免试"
                      : data.learnAttitudeScore / 100) +
                    "</p></div>";
                }
              }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "课外锻炼",
          key: "homeworkScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let data = list[i];
                let itemLength = data.itemList.length;
                if (itemLength > 1) {
                  let middel =
                    itemLength % 2 == 1
                      ? Number((itemLength / 2).toFixed(0))
                      : itemLength / 2;
                  if (i + 1 == list.length) {
                    text +=
                      "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text +=
                    "<p>" +
                    (data.homeworkExempt == "1"
                      ? "免试"
                      : data.homeworkScore / 100) +
                    "</p></div>";
                } else {
                  if (list.length == i + 1) {
                    text +=
                      "<div style='width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text +=
                    "<p>" +
                    (data.homeworkExempt == "1"
                      ? "免试"
                      : data.homeworkScore / 100) +
                    "</p></div>";
                }
              }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "最终得分",
          key: "actionScore",
          align: "center",
          minWidth: 80,
          render: (h, params) => {
            const row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let data = list[i];
                let itemLength = data.itemList.length;
                if (itemLength > 1) {
                  // let middel=itemLength%2==1?(Number((itemLength/2).toFixed(0))):itemLength/2;
                  if (i + 1 == list.length) {
                    text +=
                      "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text += "<p>" + data.actionScore / 100 + "</p></div>";
                } else {
                  if (list.length == i + 1) {
                    text +=
                      "<div style='width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text += "<p>" + data.actionScore / 100 + "</p></div>";
                }
              }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "模块等第",
          key: "modelLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let data = list[i];
                let itemLength = data.itemList.length;
                if (itemLength > 1) {
                  if (i + 1 == list.length) {
                    text +=
                      "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text +=
                    "<p>" +
                    (data.modelLevel == 5
                      ? "A"
                      : data.modelLevel == 4
                      ? "B"
                      : data.modelLevel == 3
                      ? "C"
                      : data.modelLevel == 2
                      ? "D"
                      : data.modelLevel == 1
                      ? "E"
                      : "") +
                    "</p></div>";
                } else {
                  if (list.length == i + 1) {
                    text +=
                      "<div style='width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text +=
                    "<p>" +
                    (data.modelLevel == 5
                      ? "A"
                      : data.modelLevel == 4
                      ? "B"
                      : data.modelLevel == 3
                      ? "C"
                      : data.modelLevel == 2
                      ? "D"
                      : data.modelLevel == 1
                      ? "E"
                      : "") +
                    "</p></div>";
                }
              }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "获得学分",
          key: "showScoreLevel",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let list = row.list;
            var text = "";
            if (list.length > 0) {
              for (let i = 0; i < list.length; i++) {
                let data = list[i];
                let itemLength = data.itemList.length;
                if (itemLength > 1) {
                  let middel =
                    itemLength % 2 == 1
                      ? Number((itemLength / 2).toFixed(0))
                      : itemLength / 2;
                  if (i + 1 == list.length) {
                    text +=
                      "<div style='width:100%;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text += "<p>" + data.credit + "</p></div>";
                } else {
                  if (list.length == i + 1) {
                    text +=
                      "<div style='width:100%;height:30px;line-height:30px;' >";
                  } else {
                    text +=
                      "<div style='width:100%;border-bottom:1px #DFD9DE solid;height:" +
                      30 * itemLength +
                      "px;line-height:" +
                      30 * itemLength +
                      "px;' >";
                  }
                  text += "<p>" + data.credit + "</p></div>";
                }
              }
            }
            return h("div", {
              domProps: {
                innerHTML: text,
              },
            });
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 120,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                  },
                  style: {
                    marginRight: "0px",
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
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
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
              this.typeScore = 100;
              this.createSemesterScore = false;
            }
            this.search();
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    exportSchoolTestData1() {
      var vm = this;
      if (typeof vm.grade == "undefined") {
        vm.grade = "";
      }
      if (typeof vm.sportsClassId == "undefined") {
        vm.sportsClassId = "";
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
        "/v1/cd/high/skills/exportExamStudentDataNew?schoolId=1&gradeId=" +
        vm.grade +
        "&sportsClassId=" +
        vm.sportsClassId +
        "&gender=" +
        (vm.gender == "3" ? "" : vm.gender) +
        "&exempt=" +
        vm.exempt +
        "&studentName=" +
        vm.studentName +
        "&registerCode=" +
        vm.registerCode +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    toDetail(studentInfo) {
      var vm = this;
      sessionStorage.setItem(
        "examQueryStudent-studentExamDetailHighCD-studentId",
        studentInfo.studentId
      );
      sessionStorage.setItem(
        "examQueryStudent-studentExamDetailHighCD-studentName",
        studentInfo.studentName
      );
      sessionStorage.setItem(
        "examQueryStudent-studentExamDetailHighCD-gradeId",
        vm.grade
      );
      sessionStorage.setItem(
        "examQueryStudent-studentExamDetailHighCD-gender",
        studentInfo.gender
      );
      sessionStorage.setItem(
        "examQueryStudent-studentExamDetailHighCD-sportsClassName",
        studentInfo.sportsClassName
      );
      sessionStorage.setItem(
        "examQueryStudent-studentExamDetailHighCD-sportsClassId",
        studentInfo.sportsClassId
      );
      sessionStorage.setItem(
        "examQueryStudent-studentExamDetailHighCD-registerCode",
        studentInfo.registerCode
      );
      this.$router.push({ name: "studentExamDetailHighCD" });
    },
    getGradeSportsClassList(type) {
      var vm = this;
      this.$axios
        .get(
          "/v1/cd/high/skills/getGradeSportsClassList?schoolId=1&gradeId=" +
            vm.grade
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let result = res.data.response;
            vm.classList = result;
            if (type == "1") {
              if (!sessionStorage.getItem("examQueryStudent-sportsClassId")) {
                vm.sportsClassId = result[0].sportsClassId;
                vm.search();
              }
            } else {
              vm.sportsClassId = result[0].sportsClassId;
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getHighSchoolSkillStudentList(sportsClassId) {
      var vm = this;
      sessionStorage.setItem("examQueryStudent-grade", vm.grade);
      sessionStorage.setItem("examQueryStudent-sportsClassId", sportsClassId);
      sessionStorage.setItem("examQueryStudent-registerCode", vm.registerCode);
      sessionStorage.setItem("examQueryStudent-studentName", vm.studentName);
      sessionStorage.setItem("examQueryStudent-gender", vm.gender);
      sessionStorage.setItem("examQueryStudent-pageNum", vm.pageNum);
      sessionStorage.setItem("examQueryStudent-pageSize", vm.pageSize);
      sessionStorage.setItem("examQueryStudent-exempt", vm.exempt);
      vm.resultData = [];
      vm.loading = true;

      this.$axios
        .get(
          "/v1/cd/high/skills/getHighSchoolSkillStudentList?schoolId=1&gradeId=" +
            vm.grade +
            "&sportsClassId=" +
            sportsClassId +
            "&gender=" +
            (vm.gender == "3" ? "" : vm.gender) +
            "&exempt=" +
            vm.exempt +
            "&studentName=" +
            vm.studentName +
            "&registerCode=" +
            vm.registerCode +
            "&pageNo=" +
            vm.pageNum +
            "&pageSize=" +
            vm.pageSize
        )
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let result = res.data.response;
            vm.resultData = result;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    countHighSchoolSkillStudentList(sportsClassId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/cd/high/skills/countHighSchoolSkillStudentList?schoolId=1&gradeId=" +
            vm.grade +
            "&sportsClassId=" +
            sportsClassId +
            "&gender=" +
            (vm.gender == "3" ? "" : vm.gender) +
            "&exempt=" +
            vm.exempt +
            "&studentName=" +
            vm.studentName +
            "&registerCode=" +
            vm.registerCode
        )
        .then((res) => {
          if (res.data.code == 10000) {
            this.total = res.data.response;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
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
      let sportsClassId = vm.sportsClassId;
      vm.resultData = [];
      vm.getHighSchoolSkillStudentList(sportsClassId);
      vm.countHighSchoolSkillStudentList(sportsClassId);
      this.$tableScroll(this.$refs.id);
    },
    restore() {
      var vm = this;
      vm.grade = "";
      vm.pageNo = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = "";
      vm.studentName = "";
      vm.gender = "";
      let schoolId = vm.schoolId;
      vm.querySearch();
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
  },
  watch: {
    grade: function () {
      var vm = this;
      if(vm.showPage == 1){
        
      }else{
        vm.getGradeSportsClassList("2");
      }
      vm.showPage = 0;
    },
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    vm.showPage=1;
    vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);

    let grade = sessionStorage.getItem("examQueryStudent-grade");
    let sportsClassId = sessionStorage.getItem(
      "examQueryStudent-sportsClassId"
    );
    let registerCode = sessionStorage.getItem("examQueryStudent-registerCode");
    let studentName = sessionStorage.getItem("examQueryStudent-studentName");
    let gender = sessionStorage.getItem("examQueryStudent-gender");
    let pageNum = sessionStorage.getItem("examQueryStudent-pageNum");
    let pageSize = sessionStorage.getItem("examQueryStudent-pageSize");
    let exempt = sessionStorage.getItem("examQueryStudent-exempt");

    if (grade != null && grade != "" && grade != undefined && grade > 0) {
      vm.grade = Number(grade);
    } else {
      vm.grade = vm.schoolGradeList[0].grade;
    }
    vm.getGradeSportsClassList("1");

    if (
      sportsClassId != null &&
      sportsClassId != "" &&
      sportsClassId != undefined &&
      sportsClassId > 0
    ) {
      vm.sportsClassId = Number(sportsClassId);
    }
    if (
      registerCode != null &&
      registerCode != "" &&
      registerCode != undefined
    ) {
      vm.registerCode = registerCode;
    }
    if (exempt != null && exempt != "" && exempt != undefined) {
      vm.exempt = exempt;
    }
    if (studentName != null && studentName != "" && studentName != undefined) {
      vm.studentName = studentName;
    }
    if (gender != null && gender != "" && gender != undefined) {
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
    if (!vm.gender) {
      vm.gender = "3";
    }
    if (!vm.exempt) {
      vm.exempt = "3";
    }
    if (vm.sportsClassId) {
      vm.search();
    }
  },
};
</script>
