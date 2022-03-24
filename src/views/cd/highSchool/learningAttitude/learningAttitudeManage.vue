<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学习态度管理</h2>
    </div>
    <div>
      <Card>
        <div class="top-search" @keydown.enter="querySearch">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>年级：</span>
              <Select v-model="grade" style="width:120px;">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                >{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>班级：</span>
              <Select v-model="sportsClassId" style="width:120px;">
                <Option
                  v-for="item in gradeSportsClassList"
                  :value="item.sportsClassId"
                  :key="item.sportsClassId"
                >{{ item.sportsClassName }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>姓名：</span>
              <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 20px;">
              <span>学籍号：</span>
              <Input v-model="registerCode" placeholder="学生学籍号" style="width: 120px;" />
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
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
                max-height="530"
                :loading="loading"
                @on-sort-change="sortChange"
                :columns="resultColumns"
                :data="resultData"
              >
                <template slot-scope="{ row, index }" slot="action">
                  <div
                    v-for="(item,i) in row.attitudeInfoVOS"
                    :style="row.attitudeInfoVOS.length>1&&row.attitudeInfoVOS.length-1 != i ?{borderBottom:'1px solid #eee'}:''"
                    style="margin-top: 5px;"
                  >
                    <Button
                      type="primary"
                      :disabled="item.classChoose=='1'"
                      style="margin-right: 5px;margin-bottom: 5px"
                      @click="getInfoattitude(row.sportsClassId,row.studentId,item.classTestId)"
                    >详情</Button>
                  </div>
                </template>
              </Table>
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
    </div>
  </div>
</template>

<script>
export default {
  name: "schoolList",
  data() {
    return {
      sportsClassId: "",
      loading: false,
      updateUrl: "",
      schoolId: "",
      schoolType: "",
      grade: "",
      orderType: "",
      classChoose: 0,
      classChooseList: [
        { entryStatus: 0, label: "全部" },
        { entryStatus: 1, label: "未免试" },
        { entryStatus: 2, label: "已免试" },
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
          grade: "",
          label: "全部",
        },
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
          grade: "",
          label: "全部",
        },
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
          grade: "",
          label: "全部",
        },
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
      schoolGradeList: [],
      studentClass: "",
      registerCode: "",
      studentName: "",
      resultColumns: [],
      normal: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth: 100,
          fixed: "left",
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth: 70,
          render: (h, params) => {
            const row = params.row;
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        {
          title: "班级",
          key: "sportsClassName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "项目",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (null == row.attitudeInfoVOS[i]) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].classTestName +
                      "</div>";
                  }
                } else {
                  if (null == row.attitudeInfoVOS[i]) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].classTestName +
                      "</div>";
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
          title: "剩余得分",
          key: "surplusScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (null == row.attitudeInfoVOS[i]) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].surplusScore +
                      "</div>";
                  }
                } else {
                  if (null == row.attitudeInfoVOS[i]) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].surplusScore +
                      "</div>";
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
          title: "被扣分数",
          key: "deductionScore",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (null == row.attitudeInfoVOS[i]) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].deductionScore +
                      "</div>";
                  }
                } else {
                  if (null == row.attitudeInfoVOS[i]) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].deductionScore +
                      "</div>";
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
          title: "旷课",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].truancyCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].truancyCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].truancyCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                    // text+="<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0; >"+''+"</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].truancyCount +
                      "</div>";
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
          title: "迟到",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].lateCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].lateCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].lateCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].lateCount +
                      "</div>";
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
          title: "早退",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].earlyCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].earlyCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].earlyCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].earlyCount +
                      "</div>";
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
          title: "违反纪律",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].violateDisciplineCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].violateDisciplineCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].violateDisciplineCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].violateDisciplineCount +
                      "</div>";
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
          title: "运动着装不符",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].notAccordClothing
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].notAccordClothing +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].notAccordClothing
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].notAccordClothing +
                      "</div>";
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
          title: "病假",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].sickCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].sickCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].sickCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].sickCount +
                      "</div>";
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
          title: "事假",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].thingCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].thingCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].thingCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].thingCount +
                      "</div>";
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
        // {
        //   title: '不认真',
        //   key: 'studentClass',
        //   align: 'center',
        //   width: 80,
        //   render: (h, params) => {
        //     const row = params.row;
        //     if(row.notSeriousCount == null){
        //         row.notSeriousCount=0;
        //     }
        //     return h('div', row.notSeriousCount)
        //   }
        // },
        {
          title: "大课间缺席",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].bigAbsentCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden'>" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;'>" +
                      row.attitudeInfoVOS[i].bigAbsentCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].bigAbsentCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].bigAbsentCount +
                      "</div>";
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
          title: "大课间违反纪律",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            var text = "";
            if (row.attitudeInfoVOS) {
              for (var i = 0; i < row.attitudeInfoVOS.length; i++) {
                if (i == 0) {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].bigViolateDisciplineCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;visibility: hidden' >" +
                      "-" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;width:100%;padding:10px 0;' >" +
                      row.attitudeInfoVOS[i].bigViolateDisciplineCount +
                      "</div>";
                  }
                } else {
                  if (
                    null == row.attitudeInfoVOS[i] ||
                    "-" == row.attitudeInfoVOS[i].bigViolateDisciplineCount
                  ) {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      "" +
                      "</div>";
                  } else {
                    text +=
                      "<div style='line-height:25px;text-align:center;border-top:1px #EEEEEE solid;width:100%;padding:10px 0;height:46px;' >" +
                      row.attitudeInfoVOS[i].bigViolateDisciplineCount +
                      "</div>";
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
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 100,
          fixed: "right",
          slot: "action",
        },
        // {
        //     title: '操作',
        //     key: 'action',
        //     align: 'center',
        //     width: 120,
        //     fixed:"right",
        //     render: (h, params) => {
        //         return h('div', [
        //             h(
        //                 'Button',
        //                 {
        //                     props: {
        //                         type: 'success'
        //                         // disabled:(row.taskStatus=='2' && (this.taskType=="3"?(row.errorNum1>0):(row.errorNum>0))) ?false:true
        //                     },
        //                     style: {
        //                         marginRight: '5px'
        //                     },
        //                     on: {
        //                         click: () => {
        //                             this.toDetail(params.row.studentId)
        //                         }
        //                     }
        //                 },
        //                 "详情"
        //             )
        //         ])
        //     }
        // }
      ],
      collegeColumns: [
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == "1" ? "男" : "女";
            return h("div", text);
          },
        },
        {
          title: "学院",
          key: "collegeName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "专业",
          key: "majorName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学级",
          key: "startSchool",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            const text = row.startSchool + "级";
            return h("div", text);
          },
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            const text = row.studentClass + "班";
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
                      this.toDetail(params.row.studentId);
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
      gradeSportsClassList: [],
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
    getInfoattitude(sportsClassId, studentId, classTestId) {
      var vm = this;
      sessionStorage.setItem(
        "learningAttitude-learningAttitudeHis-studentId",
        studentId
      );
      sessionStorage.setItem(
        "learningAttitude-learningAttitudeHis-sportsClassId",
        sportsClassId
      );
      sessionStorage.setItem(
        "learningAttitude-learningAttitudeHis-classTestId",
        classTestId
      );
      this.$router.push({ name: "learningAttitudeHis" });
    },
    sortChange(column) {
      if (column.order == "desc") {
        this.orderType = "2";
      } else if (column.order == "asc") {
        this.orderType = "1";
      } else {
      }
      this.search();
    },
    getStudentInfoList(schoolId) {
      var vm = this;
      if (this.grade == 0) {
        this.grade = "";
      }
      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major,
        orderType: vm.orderType,
        classChoose: vm.classChoose,
        sportsClassId: vm.sportsClassId == -1 ? "" : vm.sportsClassId,
      };

      sessionStorage.setItem("sportsClassManage-pageNum", vm.pageNum);
      sessionStorage.setItem("sportsClassManage-pageSize", vm.pageSize);
      sessionStorage.setItem("sportsClassManage-grade", vm.grade);
      sessionStorage.setItem("sportsClassManage-studentClass", vm.studentClass);
      sessionStorage.setItem(
        "sportsClassManage-sportsClassId",
        vm.sportsClassId
      );
      sessionStorage.setItem("sportsClassManage-studentName", vm.studentName);
      sessionStorage.setItem("sportsClassManage-registerCode", vm.registerCode);
      sessionStorage.setItem("sportsClassManage-orderType", vm.orderType);
      sessionStorage.setItem("sportsClassManage-classChoose", vm.classChoose);

      this.$axios
        .post("/v1/cd/high/LearningAttitude/querylearningAttitudeManage", data)
        .then((res) => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.resultData = res.data.response;
            if (vm.resultData.length > 0) {
              for (let i = 0; i < vm.resultData.length; i++) {
                for (
                  let j = 0;
                  j < vm.resultData[i].attitudeInfoVOS.length;
                  j++
                ) {
                  let attitudeInfoVO = vm.resultData[i].attitudeInfoVOS[j];
                  if (attitudeInfoVO.surplusScore != 0) {
                    attitudeInfoVO.surplusScore =
                      (10000 - attitudeInfoVO.deductionScore) / 100;
                  } else {
                    attitudeInfoVO.surplusScore = 0;
                  }
                  attitudeInfoVO.deductionScore = (
                    attitudeInfoVO.deductionScore / 100
                  ).toFixed(2);
                  if (attitudeInfoVO.classChoose == "1") {
                    if (attitudeInfoVO.exemptType == "1") {
                      attitudeInfoVO.surplusScore = 70;
                    } else if (attitudeInfoVO.exemptType == "2") {
                      attitudeInfoVO.surplusScore = 80;
                    }
                    attitudeInfoVO.deductionScore = "免试";
                    attitudeInfoVO.bigAbsentCount = "-";
                    attitudeInfoVO.bigViolateDisciplineCount = "-";
                    attitudeInfoVO.lateCount = "-";
                    attitudeInfoVO.notAccordClothing = "-";
                    attitudeInfoVO.notSeriousCount = "-";
                    attitudeInfoVO.sickCount = "-";
                    attitudeInfoVO.thingCount = "-";
                    attitudeInfoVO.truancyCount = "-";
                    attitudeInfoVO.violateDisciplineCount = "-";
                    attitudeInfoVO.earlyCount = "-";
                  }
                  vm.resultData[i].attitudeInfoVOS[j] = attitudeInfoVO;
                }
              }
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
      let schoolId = vm.schoolId;
      vm.getStudentInfoList(schoolId);
      vm.countStudentList(schoolId);
    },
    restore() {
      var vm = this;
      vm.grade = "";
      vm.pageNo = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = "";
      vm.studentName = "";
      vm.college = "";
      vm.major = "";
      vm.classChoose = "0";

      let schoolId = vm.schoolId;
      vm.getStudentInfoList(schoolId);
      vm.countStudentList(schoolId);
    },

    countStudentList(schoolId) {
      var vm = this;
      if (this.grade == 0) {
        this.grade = "";
      }
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major,
        orderType: vm.orderType,
        classChoose: vm.classChoose,
        sportsClassId: vm.sportsClassId == -1 ? "" : vm.sportsClassId,
      };
      this.$axios
        .post(
          "/v1/cd/high/LearningAttitude/querylearningAttitudeManageNum",
          data
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
    toDetail(studentId) {
      var vm = this;
      sessionStorage.setItem(
        "sportsClassManage-sportsClassStudentHis-studentId",
        studentId
      );
      sessionStorage.setItem(
        "sportsClassManage-sportsClassStudentHis-yearSemester",
        ""
      );
      this.$router.push({ name: "learningAttitudeHis" });
    },
    getSchoolData(schoolId) {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios
        .get("/v1/school/getSchoolDetail?schoolId=" + schoolId)
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            this.schoolData = data;
            this.schoolName = data.name;
          } else {
            if (res.data.code > 39999) {
              this.$Message.info(res.data.msg);
            }
          }
        });
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

    getSchoolCollegeBySchoolId(schoolId) {
      var vm = this;
      this.$axios
        .get("/v1/student/getSchoolCollegeBySchoolId?schoolId=" + schoolId)
        .then((res) => {
          if (res.data.code == 10000) {
            vm.collegesList = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    getSchoolMajorBySchoolId(schoolId, collegeCode) {
      var vm = this;
      this.$axios
        .get(
          "/v1/student/getSchoolMajorBySchoolId?schoolId=" +
            schoolId +
            "&collegeCode=" +
            collegeCode
        )
        .then((res) => {
          if (res.data.code == 10000) {
            vm.majorList = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
  },
  watch: {
    college: function () {
      var vm = this;
      vm.getSchoolMajorBySchoolId(vm.schoolId, vm.college);
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
      vm.resultColumns = vm.normal;
      if ("0" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList);
      }
      // if("1"==schoolType){
      //     vm.schoolGradeList=vm.schoolGradeList.concat(vm.primaryList).concat(vm.middleList).concat(vm.highList).concat(vm.collegeList);
      // }
      if ("2" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
      }
      if ("3" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
      }
      if ("4" == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
      }
      if ("5" == schoolType) {
        vm.isCollege = true;
        vm.resultColumns = vm.collegeColumns;
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        // month =(month<10 ? "0"+month:month);
        // var mydate = (year.toString()+month.toString());
        vm.collegeList = [
          {
            grade: 13,
            label: (month > 9 ? year : year - 1) + "级",
          },
          {
            grade: 14,
            label: (month > 9 ? year - 1 : year - 2) + "级",
          },
          {
            grade: 15,
            label: (month > 9 ? year - 2 : year - 3) + "级",
          },
          {
            grade: 16,
            label: (month > 9 ? year - 3 : year - 4) + "级",
          },
        ];
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.collegeList);
        vm.getSchoolCollegeBySchoolId(vm.schoolId);
      }
    } else {
      vm.resultColumns = vm.normal;
      vm.schoolGradeList = vm.schoolGradeList
        .concat(vm.primaryList)
        .concat(vm.middleList)
        .concat(vm.highList)
        .concat(vm.collegeList);
    }

    let tempPageSize = sessionStorage.getItem("sportsClassManage-pageSize");
    let tempgrade = sessionStorage.getItem("sportsClassManage-grade");
    let tempstudentClass = sessionStorage.getItem(
      "sportsClassManage-studentClass"
    );
    let tempstudentName = sessionStorage.getItem(
      "sportsClassManage-studentName"
    );
    let tempregisterCode = sessionStorage.getItem(
      "sportsClassManage-registerCode"
    );
    let sportsClassId = sessionStorage.getItem(
      "sportsClassManage-sportsClassId"
    );
    if (tempPageSize != null && tempPageSize != undefined && tempPageSize > 0) {
      vm.pageNum = Number(sessionStorage.getItem("sportsClassManage-pageNum"));
      vm.pageSize = Number(
        sessionStorage.getItem("sportsClassManage-pageSize")
      );
      if (tempgrade != null && tempgrade != undefined && tempgrade > 0) {
        vm.grade = Number(tempgrade);
      } else {
        vm.grade = 10;
      }
      if (
        tempstudentClass != null &&
        tempstudentClass != undefined &&
        tempstudentClass > 0
      ) {
        vm.studentClass = Number(tempstudentClass);
      }
      if (
        tempstudentName != null &&
        tempstudentName != undefined &&
        tempstudentName != ""
      ) {
        vm.studentName = tempstudentName;
      }
      if (
        tempregisterCode != null &&
        tempregisterCode != undefined &&
        tempregisterCode != ""
      ) {
        vm.registerCode = tempregisterCode;
      }
      if (
        sportsClassId != null &&
        sportsClassId != undefined &&
        sportsClassId != ""
      ) {
        vm.sportsClassId = Number(sportsClassId);
      }
      vm.orderType = sessionStorage.getItem("sportsClassManage-orderType");
    }
    vm.search();
    vm.getGradeSportsClassList();
  },
};
</script>
