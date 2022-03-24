const gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三']
const columnsOld = [
  {
    title: '串镜',
    key: 'createTime',
    minWidth: 170,
    align: 'center',
    render: (h, params) => {
      const row = params.row;
      let text = ""
      if(row.leftVision && row.rightVision){
        text+="<div style='text-align:center;'>&nbsp;&nbsp;左眼："+(row.leftMirror=="0"?"正常":row.leftMirror=="1"?"正片上升、负片下降":row.leftMirror=="-1"?"正片下降、负片上升":row.leftMirror=="2"?"其他":row.leftMirror=="9"?"未测试":"--")+"</div>"
          text+='<div style="text-align:center;">&nbsp;&nbsp;右眼：'+(row.rightMirror=="0"?"正常":row.rightMirror=="1"?"正片上升、负片下降":row.rightMirror=="-1"?"正片下降、负片上升":row.rightMirror=="2"?"其他":row.rightMirror=="9"?"未测试":"--")+"</div>"
      } else {
        text="未测试"
      }
      return h("div", {
        domProps: {
          innerHTML: text
        } 
      });
    }
  },
  {
    title: '屈光不正',
    key: 'createTime',
    align: 'center',
    minWidth: 170,
    render: (h, params) => {
      const row = params.row
      let text = ""
      if (row.leftVision && row.rightVision) {
        text+="<div style='text-align:center;' >&nbsp;&nbsp;左眼："+(row.leftLight=="0"?"正常":row.leftLight=="1"?"近视":row.leftLight=="2"?"远视":row.leftLight=="3"?"其他":"未测试")+"</div>"
          text+='<div  style="text-align:center;">&nbsp;&nbsp;右眼：'+(row.rightLight=="0"?"正常":row.rightLight=="1"?"近视":row.rightLight=="2"?"远视":row.rightLight=="3"?"其他":"未测试")+"</div>"
      } else {
        text="未测试"
      }
      return h("div", {
        domProps: {
          innerHTML: text
        }
      });
    }
  },
]
const columnsNew = [
  {
    title: "屈光球镜S",
    key: "createTime",
    minWidth: 150,
    align: "center",
    render: (h, params) => {
      const row = params.row;
      var text = "";
      if (row.leftBall && row.rightBall) {
        text += `<div style='text-align:center;'>&nbsp;&nbsp;左眼：${row.leftBall}</div>`;
        text += `<div style='text-align:center;'>&nbsp;&nbsp;右眼：${row.rightBall}</div>`;
      } else {
        text = "未测试";
      }
      return h("div", {
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  {
    title: "屈光柱镜C",
    key: "createTime",
    align: "center",
    minWidth: 150,
    render: (h, params) => {
      const row = params.row;
      var text = "";
      if (row.leftColumn && row.rightColumn) {
        text += `<div style='text-align:center;'>&nbsp;&nbsp;左眼：${row.leftColumn}</div>`;
        text += `<div style='text-align:center;'>&nbsp;&nbsp;右眼：${row.rightColumn}</div>`;
      } else {
        text = "未测试";
      }
      return h("div", {
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  {
    title: "屈光轴位A",
    key: "createTime",
    align: "center",
    minWidth: 150,
    render: (h, params) => {
      const row = params.row;
      var text = "";
      if (row.leftAxis && row.rightAxis) {
        text += `<div style='text-align:center;'>&nbsp;&nbsp;左眼：${row.leftAxis}</div>`;
        text += `<div style='text-align:center;'>&nbsp;&nbsp;右眼：${row.rightAxis}</div>`;
      } else {
        text = "未测试";
      }

      return h("div", {
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  {
    title: "是否为角膜塑形镜（OK镜）佩戴者",
    key: "glassesWearer",
    align: "center",
    minWidth: 200,
    render: (h, params) => {
      const row = params.row;
      var text = row.glassesWearer == '1' ? '是' : row.glassesWearer == '0' ?  '否':"未测试";
      return h("div", {
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
]
const columnsBase = [
  {
    title: "姓名",
    key: "studentName",
    align: "center",
    minWidth: 100,
    fixed: "left",
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
    minWidth: 120,
  },
  {
    title: "班级",
    key: "studentClass",
    align: "center",
    minWidth: 120,
    render: (h, params) => {
      let text
      if (params.row.studentId) {
        text = `${params.row.gradeName}${params.row.studentClass}班`
      } else {
        text = '系统无数据'
      }
      return h('div', text)
    }
  },
  {
    title: "裸眼视力",
    key: "resultValue",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      const row = params.row;
      var text = "";
      if (row.leftVision && row.rightVision) {
        text += `<div style='text-align:center;'>&nbsp;&nbsp;左眼：${row.leftVision}</div>`;
        text += `<div style='text-align:center;'>&nbsp;&nbsp;右眼：${row.rightVision}</div>`;
      } else {
        text = "未测试";
      }
      return h("div", {
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  {
    title: "状态",
    key: "",
    align: "center",
    minWidth: 100,
    sortable: "custom",
    render: (h, params) => {
      const { testOver } = params.row
      const text = testOver == 1 ? '已测完' : '未测试'
      return h('div', text)
    }
  },
]
const subjectColumns = [
  {
    title: "姓名",
    key: "studentName",
    align: "center",
    minWidth: 100,
    fixed: "left",
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
    minWidth: 120,
  },
  {
    title: "班级",
    key: "grade",
    align: "center",
    minWidth: 120,
    render: (h, params) => {
      let text = ''
      if (params.row.studentId) {
       text = `${gradeList[params.row.grade-1]}${params.row.studentClass}班`
      } else {
        text = '系统无数据'
      }
      return h('div', text)
    }
  },
  {
    title: "学习态度",
    key: "vitalCapacityValue",
    align: "center",
    render: (h, params) => {
      let row = params.row;
      let text = "";
      if (row.learnExempt == "1") {
        if (row.exemptType == "2") {
          text = "<span>80(免试)</span>";
        } else {
          text = "<span>70(免试)</span>";
        }
      } else {
        if (row.learnScore == null) {
          text = "<span style=''>未完成</span>";
        } else {
          text = "<span>" + (row.learnScore / 100).toFixed(2) + "</span>";
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
    title: "健康教育知识",
    key: "runFiftyValue",
    align: "center",
    render: (h, params) => {
      let row = params.row;
      let text = "";
      if (row.healthExempt == "1") {
        if (row.exemptType == "2") {
          text = "<span>80(免试)</span>";
        } else {
          text = "<span>70(免试)</span>";
        }
      } else {
        if (!row.healthOver == null || row.healthOver == "0") {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" + (row.healthScore / 100).toFixed(2) + "</span>";
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
    title: "运动技能",
    key: "sitAndReachValue",
    align: "center",
    render: (h, params) => {
      let row = params.row;
      let text = "";
      if (row.actionExempt == "1") {
        if (!row.actionOver || row.actionOver == "0") {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" +
            (row.actionScore / 100).toFixed(2) +
            "(部分免试)</span>";
        }
      } else if (row.actionExempt == "2") {
        if (!row.actionOver || row.actionOver == "0") {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" +
            (row.actionScore / 100).toFixed(2) +
            "(免试)</span>";
        }
      } else {
        if (!row.actionOver || row.actionOver == "0") {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" + (row.actionScore / 100).toFixed(2) + "</span>";
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
    title: "体能",
    key: "oneMinuteSitUpValue",
    align: "center",
    render: (h, params) => {
      let row = params.row;
      let text = "";
      if (row.staminaExempt == "1") {
        if (!row.staminaOver || row.staminaOver == "0") {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" +
            (row.staminaScore / 100).toFixed(2) +
            "(部分免试)</span>";
        }
      } else if (row.staminaExempt == "2") {
        if (!row.staminaOver || row.staminaOver == "0") {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" +
            (row.staminaScore / 100).toFixed(2) +
            "(免试)</span>";
        }
      } else {
        if (!row.staminaOver || row.staminaOver == "0") {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" + (row.staminaScore / 100).toFixed(2) + "</span>";
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
    title: "课后作业",
    key: "oneMinuteSitUpValue",
    align: "center",
    render: (h, params) => {
      let row = params.row;
      let text = "";
      if (row.homeworkExempt == "1") {
        if (row.exemptType == "2") {
          text = "<span>80(免试)</span>";
        } else {
          text = "<span>70(免试)</span>";
        }
      } else {
        if (row.homeworkScore == null) {
          text = "<span style=''>未完成</span>";
        } else {
          text =
            "<span>" + (row.homeworkScore / 100).toFixed(2) + "</span>";
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
    title: "学科评价得分",
    key: "oneMinuteSitUpValue",
    align: "center",
    render: (h, params) => {
      let row = params.row;
      let text = "";

      if (!row.subjectScore) {
        text = "<span style=''>未完成</span>";
      } else {
        text = "<span>" + (row.subjectScore / 100).toFixed(2) + "</span>";
      }
      return h("div", {
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  {
    title: "学科评价等级",
    key: "resultValue",
    align: "center",
    render: (h, params) => {
      let row = params.row;
      let text = "";
      if (!row.subjectScore) {
        text = "<span>--</span>";
      } else {
        let aa =
          row.subjectLevel == "1"
            ? "优秀"
            : row.subjectLevel == "2"
            ? "良好"
            : row.subjectLevel == "3"
            ? "及格"
            : row.subjectLevel == "4"
            ? "不及格"
            : "--";
        text = "<span>" + aa + "</span>";
      }
      return h("div", {
        domProps: {
          innerHTML: text,
        },
      });
    },
  },
  {
    title: "状态",
    align: "center",
    minWidth: 100,
    render: (h, params) => {
      let text;
      const {innerSchool, finishStatus} = params.row
      if (innerSchool == 1) {
        text = '在校'
        if (finishStatus == 1) {
          text = '已完成'
        } else {
          text = '未完成'
          }
      } else {
        text = '不在校'
      }
      return h('div', text)
    }

  },
]
const physicalTestColumns = [
  { title: "姓名", key: "studentName", align: "center", minWidth: 100, fixed: "left" },
  {
    title: "性别", key: "gender", align: "center", minWidth: 60,
    render: (h, params) => {
      return h("div", [
        h("span", params.row.gender == "1" ? "男" : "女"),
      ]);
    },
  },
  { title: "学籍号", key: "registerCode", align: "center", minWidth: 120 },
  {
    title: "班级", key: "className", align: "center", minWidth: 120,
    render: (h, params) => {
      let text = ''
      if (params.row.studentId) {
       text = `${gradeList[params.row.grade-1]}${params.row.studentClass}班`
      } else {
        text = '系统无数据'
      }
      return h('div', text)
    }
  },
  {
    title: "身高", key: "height", align: "center", minWidth: 60,
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
    title: "体重", key: "weight", align: "center", minWidth: 60,
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
    title: "肺活量", key: "vitalCapacityValue", align: "center", minWidth: 60,
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
    title: "50米跑", key: "runFiftyValue", align: "center", minWidth: 60,
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
    title: "立定跳远", key: "standingJumpValue", align: "center", minWidth: 60,
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
    title: "坐位体前屈", key: "sitAndReachValue", align: "center", minWidth: 60,
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
    title: "800米跑(女)", key: "runEightHundredValue", align: "center", minWidth: 60,
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
    title: "一分钟仰卧起坐(女)", key: "oneMinuteSitUpValue", align: "center", minWidth: 60,
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
    title: "1000米跑(男)", key: "runThousandValue", align: "center", minWidth: 60,
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
    title: "引体向上(男)", key: "pullUpsValue", align: "center", minWidth: 60,
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
    title: "总得分", key: "totalScore", align: "center", sortable: "custom", minWidth: 60,
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
    minWidth: 60,
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
    title: "状态",
    minWidth: 60,
    align: "center",
    render: (h, params) => {
      let text;
      const {innerSchool, haveExempt, testOver} = params.row
      if (innerSchool == 1) {
        text = '在校'
        if (haveExempt == 1) {
          text = '免试'
        } else {
          if (testOver == 1) {
            text = '已完成'
          } else {
            text = '未完成'
          }
        }
      } else {
        text = '不在校'
      }
      return h('div', text)
    }
  },
]
module.exports = {
  columnsOld,
  columnsNew,
  columnsBase,
  physicalTestColumns,
  subjectColumns
}