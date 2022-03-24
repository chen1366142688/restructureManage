<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按日期查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style>性别：</span>
                    <Select v-model="gender"  style="width:120px;">
                        <Option v-for="item in genderList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>
                    <Input v-model="registerCode"  placeholder="学籍号" style="width: 120px;" />
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="querySearch">查询</Button>
                <Button type="success" @click="goback()">返回</Button>
                <Button type="success" @click="exportExerciseDateDataDetail">导出EXCEL</Button>
            </div>
        </div>
      </Card>
      </br>
      <div>
        <Card>
          <div style="font-size:18px;height:40px;">
            数据明细
          </div>
          <div>
            <Table max-height="650" border :columns="resultColumns" :data="resultData"></Table>
          </div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "exercisePlanList",
  data() {
    return {
      classId: "",
      dateTime: "",
      loading: false,
      statisticalData: {},
      gender: "0",
      genderList: [
        {
          name: "全部",
          value: "0"
        },
        {
          name: "男",
          value: "1"
        },
        {
          name: "女",
          value: "2"
        }
      ],
      registerCode: "",
      columns2: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            let color = row.completeStatus == "1" ? "#2E2E2E" : "#00C693";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns3: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
               "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            let color = row.completeStatus == "1" ? "#2E2E2E" : "#00C693";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns4: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划4",
          key: "name4",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name4 = row.name4;
            let minutes4 = row.minutes4;
            var text = "";
            if (name4) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name4 +
                "</div><lable> " +
                (Number(minutes4) % 60000 > 0
                  ? Math.floor(Number(minutes4) / 60000) +
                    "分" +
                    (Number(minutes4) % 60000) / 1000 +
                    "秒"
                  : Number(minutes4) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            let color = row.completeStatus == "1" ? "#2E2E2E" : "#00C693";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns5: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划4",
          key: "name4",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name4 = row.name4;
            let minutes4 = row.minutes4;
            var text = "";
            if (name4) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name4 +
                "</div><lable> " +
                (Number(minutes4) % 60000 > 0
                  ? Math.floor(Number(minutes4) / 60000) +
                    "分" +
                    (Number(minutes4) % 60000) / 1000 +
                    "秒"
                  : Number(minutes4) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划5",
          key: "name5",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name5 = row.name5;
            let minutes5 = row.minutes5;
            var text = "";
            if (name5) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name5 +
                "</div><lable> " +
                (Number(minutes5) % 60000 > 0
                  ? Math.floor(Number(minutes5) / 60000) +
                    "分" +
                    (Number(minutes5) % 60000) / 1000 +
                    "秒"
                  : Number(minutes5) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            let color = row.completeStatus == "1" ? "#2E2E2E" : "#00C693";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns6: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划4",
          key: "name4",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name4 = row.name4;
            let minutes4 = row.minutes4;
            var text = "";
            if (name4) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name4 +
                "</div><lable> " +
                (Number(minutes4) % 60000 > 0
                  ? Math.floor(Number(minutes4) / 60000) +
                    "分" +
                    (Number(minutes4) % 60000) / 1000 +
                    "秒"
                  : Number(minutes4) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划5",
          key: "name5",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name5 = row.name5;
            let minutes5 = row.minutes5;
            var text = "";
            if (name5) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name5 +
                "</div><lable> " +
                (Number(minutes5) % 60000 > 0
                  ? Math.floor(Number(minutes5) / 60000) +
                    "分" +
                    (Number(minutes5) % 60000) / 1000 +
                    "秒"
                  : Number(minutes5) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划6",
          key: "name6",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name6 = row.name6;
            let minutes6 = row.minutes6;
            var text = "";
            if (name6) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name6 +
                "</div><lable> " +
                (Number(minutes6) % 60000 > 0
                  ? Math.floor(Number(minutes6) / 60000) +
                    "分" +
                    (Number(minutes6) % 60000) / 1000 +
                    "秒"
                  : Number(minutes6) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            let color = row.completeStatus == "1" ? "#2E2E2E" : "#00C693";
            return h(
              "span",
              {
                style: {
                  color: color
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns7: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划4",
          key: "name4",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name4 = row.name4;
            let minutes4 = row.minutes4;
            var text = "";
            if (name4) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name4 +
                "</div><lable> " +
                (Number(minutes4) % 60000 > 0
                  ? Math.floor(Number(minutes4) / 60000) +
                    "分" +
                    (Number(minutes4) % 60000) / 1000 +
                    "秒"
                  : Number(minutes4) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划5",
          key: "name5",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name5 = row.name5;
            let minutes5 = row.minutes5;
            var text = "";
            if (name5) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name5 +
                "</div><lable> " +
                (Number(minutes5) % 60000 > 0
                  ? Math.floor(Number(minutes5) / 60000) +
                    "分" +
                    (Number(minutes5) % 60000) / 1000 +
                    "秒"
                  : Number(minutes5) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划6",
          key: "name6",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name6 = row.name6;
            let minutes6 = row.minutes6;
            var text = "";
            if (name6) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name6 +
                "</div><lable> " +
                (Number(minutes6) % 60000 > 0
                  ? Math.floor(Number(minutes6) / 60000) +
                    "分" +
                    (Number(minutes6) % 60000) / 1000 +
                    "秒"
                  : Number(minutes6) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划7",
          key: "name7",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name7 = row.name7;
            let minutes7 = row.minutes7;
            var text = "";
            if (name7) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name7 +
                "</div><lable> " +
                (Number(minutes7) % 60000 > 0
                  ? Math.floor(Number(minutes7) / 60000) +
                    "分" +
                    (Number(minutes7) % 60000) / 1000 +
                    "秒"
                  : Number(minutes7) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },

        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            return h(
              "span",
              {
                style: {
                  color: "#green"
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns8: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划4",
          key: "name4",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name4 = row.name4;
            let minutes4 = row.minutes4;
            var text = "";
            if (name4) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name4 +
                "</div><lable> " +
                (Number(minutes4) % 60000 > 0
                  ? Math.floor(Number(minutes4) / 60000) +
                    "分" +
                    (Number(minutes4) % 60000) / 1000 +
                    "秒"
                  : Number(minutes4) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划5",
          key: "name5",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name5 = row.name5;
            let minutes5 = row.minutes5;
            var text = "";
            if (name5) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name5 +
                "</div><lable> " +
                (Number(minutes5) % 60000 > 0
                  ? Math.floor(Number(minutes5) / 60000) +
                    "分" +
                    (Number(minutes5) % 60000) / 1000 +
                    "秒"
                  : Number(minutes5) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划6",
          key: "name6",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name6 = row.name6;
            let minutes6 = row.minutes6;
            var text = "";
            if (name6) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name6 +
                "</div><lable> " +
                (Number(minutes6) % 60000 > 0
                  ? Math.floor(Number(minutes6) / 60000) +
                    "分" +
                    (Number(minutes6) % 60000) / 1000 +
                    "秒"
                  : Number(minutes6) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划7",
          key: "name7",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name7 = row.name7;
            let minutes7 = row.minutes7;
            var text = "";
            if (name7) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name7 +
                "</div><lable> " +
                (Number(minutes7) % 60000 > 0
                  ? Math.floor(Number(minutes7) / 60000) +
                    "分" +
                    (Number(minutes7) % 60000) / 1000 +
                    "秒"
                  : Number(minutes7) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划8",
          key: "name8",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name8 = row.name8;
            let minutes8 = row.minutes8;
            var text = "";
            if (name8) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name8 +
                "</div><lable> " +
                (Number(minutes8) % 60000 > 0
                  ? Math.floor(Number(minutes8) / 60000) +
                    "分" +
                    (Number(minutes8) % 60000) / 1000 +
                    "秒"
                  : Number(minutes8) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },

        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            return h(
              "span",
              {
                style: {
                  color: "#green"
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns9: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划4",
          key: "name4",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name4 = row.name4;
            let minutes4 = row.minutes4;
            var text = "";
            if (name4) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name4 +
                "</div><lable> " +
                (Number(minutes4) % 60000 > 0
                  ? Math.floor(Number(minutes4) / 60000) +
                    "分" +
                    (Number(minutes4) % 60000) / 1000 +
                    "秒"
                  : Number(minutes4) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划5",
          key: "name5",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name5 = row.name5;
            let minutes5 = row.minutes5;
            var text = "";
            if (name5) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name5 +
                "</div><lable> " +
                (Number(minutes5) % 60000 > 0
                  ? Math.floor(Number(minutes5) / 60000) +
                    "分" +
                    (Number(minutes5) % 60000) / 1000 +
                    "秒"
                  : Number(minutes5) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划6",
          key: "name6",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name6 = row.name6;
            let minutes6 = row.minutes6;
            var text = "";
            if (name6) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name6 +
                "</div><lable> " +
                (Number(minutes6) % 60000 > 0
                  ? Math.floor(Number(minutes6) / 60000) +
                    "分" +
                    (Number(minutes6) % 60000) / 1000 +
                    "秒"
                  : Number(minutes6) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划7",
          key: "name7",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name7 = row.name7;
            let minutes7 = row.minutes7;
            var text = "";
            if (name7) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name7 +
                "</div><lable> " +
                (Number(minutes7) % 60000 > 0
                  ? Math.floor(Number(minutes7) / 60000) +
                    "分" +
                    (Number(minutes7) % 60000) / 1000 +
                    "秒"
                  : Number(minutes7) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划8",
          key: "name8",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name8 = row.name8;
            let minutes8 = row.minutes8;
            var text = "";
            if (name8) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name8 +
                "</div><lable> " +
                (Number(minutes8) % 60000 > 0
                  ? Math.floor(Number(minutes8) / 60000) +
                    "分" +
                    (Number(minutes8) % 60000) / 1000 +
                    "秒"
                  : Number(minutes8) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划9",
          key: "name9",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name9 = row.name9;
            let minutes9 = row.minutes9;
            var text = "";
            if (name9) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name9 +
                "</div><lable> " +
                (Number(minutes9) % 60000 > 0
                  ? Math.floor(Number(minutes9) / 60000) +
                    "分" +
                    (Number(minutes9) % 60000) / 1000 +
                    "秒"
                  : Number(minutes9) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },

        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            return h(
              "span",
              {
                style: {
                  color: "#green"
                }
              },
              completeStatus
            );
          }
        }
      ],
      columns10: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "学生姓名",
          key: "studentName",
          align: "center",
          minWidth:100
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth:100
        },
        {
          title: "性别",
          key: "gender",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let gender = row.gender == "1" ? "男" : "女";
            return h("span", gender);
          }
        },
        {
          title: "计划1",
          key: "name1",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name1 = row.name1;
            let minutes1 = row.minutes1;
            var text = "";
            if (name1) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name1 +
                "</div><lable> " +
                (Number(minutes1) % 60000 > 0
                  ? Math.floor(Number(minutes1) / 60000) +
                    "分" +
                    (Number(minutes1) % 60000) / 1000 +
                    "秒"
                  : Number(minutes1) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划2",
          key: "name2",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name2 = row.name2;
            let minutes2 = row.minutes2;
            var text = "";
            if (name2) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name2 +
                "</div><lable> " +
                (Number(minutes2) % 60000 > 0
                  ? Math.floor(Number(minutes2) / 60000) +
                    "分" +
                    (Number(minutes2) % 60000) / 1000 +
                    "秒"
                  : Number(minutes2) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划3",
          key: "name3",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name3 = row.name3;
            let minutes3 = row.minutes3;
            var text = "";
            if (name3) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name3 +
                "</div><lable> " +
                (Number(minutes3) % 60000 > 0
                  ? Math.floor(Number(minutes3) / 60000) +
                    "分" +
                    (Number(minutes3) % 60000) / 1000 +
                    "秒"
                  : Number(minutes3) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划4",
          key: "name4",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name4 = row.name4;
            let minutes4 = row.minutes4;
            var text = "";
            if (name4) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name4 +
                "</div><lable> " +
                (Number(minutes4) % 60000 > 0
                  ? Math.floor(Number(minutes4) / 60000) +
                    "分" +
                    (Number(minutes4) % 60000) / 1000 +
                    "秒"
                  : Number(minutes4) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划5",
          key: "name5",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name5 = row.name5;
            let minutes5 = row.minutes5;
            var text = "";
            if (name5) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name5 +
                "</div><lable> " +
                (Number(minutes5) % 60000 > 0
                  ? Math.floor(Number(minutes5) / 60000) +
                    "分" +
                    (Number(minutes5) % 60000) / 1000 +
                    "秒"
                  : Number(minutes5) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划6",
          key: "name6",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name6 = row.name6;
            let minutes6 = row.minutes6;
            var text = "";
            if (name6) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name6 +
                "</div><lable> " +
                (Number(minutes6) % 60000 > 0
                  ? Math.floor(Number(minutes6) / 60000) +
                    "分" +
                    (Number(minutes6) % 60000) / 1000 +
                    "秒"
                  : Number(minutes6) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划7",
          key: "name7",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name7 = row.name7;
            let minutes7 = row.minutes7;
            var text = "";
            if (name7) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name7 +
                "</div><lable> " +
                (Number(minutes7) % 60000 > 0
                  ? Math.floor(Number(minutes7) / 60000) +
                    "分" +
                    (Number(minutes7) % 60000) / 1000 +
                    "秒"
                  : Number(minutes7) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划8",
          key: "name8",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name8 = row.name8;
            let minutes8 = row.minutes8;
            var text = "";
            if (name8) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name8 +
                "</div><lable> " +
                (Number(minutes8) % 60000 > 0
                  ? Math.floor(Number(minutes8) / 60000) +
                    "分" +
                    (Number(minutes8) % 60000) / 1000 +
                    "秒"
                  : Number(minutes8) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划9",
          key: "name9",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name9 = row.name9;
            let minutes9 = row.minutes9;
            var text = "";
            if (name9) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name9 +
                "</div><lable> " +
                (Number(minutes9) % 60000 > 0
                  ? Math.floor(Number(minutes9) / 60000) +
                    "分" +
                    (Number(minutes9) % 60000) / 1000 +
                    "秒"
                  : Number(minutes9) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "计划10",
          key: "name10",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let name10 = row.name10;
            let minutes10 = row.minutes10;
            var text = "";
            if (name10) {
              text +=
                "<div style='margin-top:8px;margin-bottom:5px;width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;height:20px;' > " +
                name10 +
                "</div><lable> " +
                (Number(minutes10) % 60000 > 0
                  ? Math.floor(Number(minutes10) / 60000) +
                    "分" +
                    (Number(minutes10) % 60000) / 1000 +
                    "秒"
                  : Number(minutes10) / 60000 + "分钟") +
                "</lable>";
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "当日状态",
          key: "completeStatus",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let row = params.row;
            let completeStatus =
              row.completeStatus == "1" ? "已完成" : "未完成";
            return h(
              "span",
              {
                style: {
                  color: "#green"
                }
              },
              completeStatus
            );
          }
        }
      ],
      resultColumns: [],
      resultData: []
    };
  },
  methods: {
     goback(){ //返回
        this.$router.go(-1);
     },
    getDateDetailListInfo(classId, dateTime) {
      var vm = this;
      vm.loading = true;

      let data = {
        classId: classId,
        dateTimeStart: dateTime,
        gender: vm.gender != "0" ? vm.gender : "",
        registerCode: vm.registerCode
      };
      this.$axios
        .post("/v1/exercisedatamanage/getDateDetailListInfo", data)
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            vm.resultData = res.data.response.list;
            let planNum = res.data.response.planNum;
            if (planNum <= 2) {
              vm.resultColumns = vm.columns2;
            }
            if (planNum == 3) {
              vm.resultColumns = vm.columns3;
            }
            if (planNum == 4) {
              vm.resultColumns = vm.columns4;
            }
            if (planNum == 5) {
              vm.resultColumns = vm.columns5;
            }
            if (planNum == 6) {
              vm.resultColumns = vm.columns6;
            }
            if (planNum == 7) {
              vm.resultColumns = vm.columns7;
            }
            if (planNum == 8) {
              vm.resultColumns = vm.columns8;
            }
            if (planNum == 9) {
              vm.resultColumns = vm.columns9;
            }
            if (planNum >= 10) {
              vm.resultColumns = vm.columns10;
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },

    getDateDetailInfo(classId, dateTime) {
      var vm = this;
      this.$axios
        .get(
          "/v1/exercisedatamanage/getDateDetailInfo?classId=" +
            classId +
            "&dateTime=" +
            dateTime
        )
        .then(res => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            vm.statisticalData = res.data.response;
            console.log(data);
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
    examStartTimeChange(date, type) {
      var vm = this;
      vm.examStartTime = date;
    },
    exportExerciseDateDataDetail() {
      var vm = this;
      let url =
        this.$axios.defaults.baseURL +
        "/v1/exercisedatamanage/exportExerciseDateDataDetail?dateTime=" +
        vm.dateTime +
        "&classId=" +
        vm.classId +
        "&gender=" +
        (vm.gender == 0 ? "" : vm.gender) +
        "&registerCode=" +
        (vm.registerCode  ? vm.registerCode:'') +
        "&token=" +
        sessionStorage.getItem("token");
      window.open(url);
    },
    querySearch() {
      var vm = this;
      vm.pageNum = 1;
      vm.pageSize = 10;
      vm.search(vm.classId, vm.dateTime);
    },
    search(classId, dateTime) {
      var vm = this;
      vm.getDateDetailListInfo(classId, dateTime);
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value;
        this.querySearch();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value;
        this.pageNum = 1;
        this.querySearch();
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    var vm = this;
    vm.search(
      sessionStorage.getItem(
        "exerciseManageDate-exerciseManageDateDetail-classId"
      ),
      sessionStorage.getItem(
        "exerciseManageDate-exerciseManageDateDetail-dateTime"
      )
    );
    vm.classId = sessionStorage.getItem(
      "exerciseManageDate-exerciseManageDateDetail-classId"
    );
    vm.dateTime = sessionStorage.getItem(
      "exerciseManageDate-exerciseManageDateDetail-dateTime"
    );
    vm.getDateDetailInfo(
      sessionStorage.getItem(
        "exerciseManageDate-exerciseManageDateDetail-classId"
      ),
      sessionStorage.getItem(
        "exerciseManageDate-exerciseManageDateDetail-dateTime"
      )
    );
  }
};
</script>
