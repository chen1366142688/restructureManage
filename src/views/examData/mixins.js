/**运动技能/体能项目得分规则修改相关**/
const mixins = {
  data () {
    return {
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
      classList: [
        {
          value: 9999,
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
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          width: 180,
          align: "center",
          fixed: "left",
        },
        {
          title: "性别",
          key: "gender",
          width: 80,
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
          width: 180,
          align: "center",
        },
        {
          title: "班级",
          key: "studentClass",
          width: 150,
          align: "center",
          render: (h, params) => {
            const row = params.row;
            const text = row.gradeName + row.studentClass + "班";
            return h("div", text);
          },
        },
        {
          title: "项目名称",
          key: "showItemTest",
          align: "center",
          type: "html",
          width: 250,
        },
        {
          title: "考核项目",
          key: "showItemName",
          align: "center",
          type: "html",
          width: 250,
        },
        {
          title: "成绩",
          key: "showItemValue",
          align: "center",
          type: "html",
          width: 100,
        },
        {
          title: "基础得分",
          key: "showBaseScore",
          align: "center",
          type: "html",
          width: 100,
        },
        {
          title: "技评得分",
          key: "showTeacherScore",
          align: "center",
          type: "html",
          width: 100,
        },
        {
          title: "项目得分",
          key: "showScore",
          align: "center",
          type: "html",
          width: 100,
        },
        {
          title: "等级",
          key: "showScoreLevel",
          align: "center",
          type: "html",
          width: 100,
        },
        {
          title: "技能总分",
          key: "skillTotalScore",
          align: "center",
          width: 80,
        },
        {
          title: "体能总分",
          key: "staminaTotalScore",
          align: "center",
          width: 80,
        },
        {
          title: "是否签名",
          key: "signatureStatus",
          align: "center",
          width: 80,
          render: (h, params) => {
            const row = params.row;
            const text = row.signatureStatus == "1" ? "已签名" : "未签名";
            return h("div", text);
          },
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          width: 120,
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
    }
  },
  mounted() {
  },
  methods: {
    /**根据分数计算免测的等级**/
    calculationNoTestLevel(score) { 
      return score >= 90 ? '优秀' : score >= 80 ? '良好' : score >= 60 ? '及格' : score >= 0 ? '不及格' : '';
    },
    /**获取学生大项数量 
     * @classTestType ： 2 技能 3 体能
     * @examList 当前学生的小项目集合
     * @return 当前学生的体能或者技能的完成大项数量
     * **/
    catgoryBigItemCount(examList, classTestType) { 
      let examExtend = this.factoryArray(examList)
      let skillCount = 0, staminaCount = 0, skillListCount=0, staminaListCount =0; //listCount 代表所有大项数量
      for (let val of examExtend) { 
        if (val.classTestType === '2') { skillCount += this.actoryIsOk(val.data, classTestType, 0); skillListCount += 1;}
        if (val.classTestType === '3') { staminaCount += this.actoryIsOk(val.data, classTestType, 0); staminaListCount += 1;}
      }
      if (classTestType === '2') {
        return skillListCount ===skillCount ? skillCount : 0;
      } else { 
        return staminaListCount === staminaCount ? staminaCount : 0;
      }
    },
    actoryIsOk(arr, classTestType, finishCount){ //循环子项目
      for (let val of arr) {
        if (val.examRequireType === '2') { //选考
          //技能
          if (classTestType === '2' && val.score > 0) { finishCount += 1;break; }
          //体能
          if (classTestType === '3' && val.score > 0) { finishCount += 1;break;}
        } else { //必考
          if (classTestType === '2') {//技能
            let skillStatus = arr.every((val, index, arr) => { return val.score > 0; });//所有子项都完成
            if (skillStatus) { finishCount += 1 ;break;}
          }
          if (classTestType === '3') {//体能
            let staminaStatus = arr.every((val, index, arr) => { return val.score > 0; });//所有子项都完成
            if (staminaStatus) { finishCount += 1; break;}
          }
        }
      }
      return finishCount;
    },
    /*多个classtestId相同的项目合并子项*/
   factoryArray(arr){
    let map = {},dest = [];
    for (let i = 0; i < arr.length; i++) {
      let ai = arr[i];
      if (!map[ai.classTestId]) {
        dest.push({
          baseScore: ai.baseScore,
          classTestId: ai.classTestId,
          classTestName: ai.classTestName,
          classTestType:ai.classTestType,
          createTime: ai.createTime,
          examItemId: ai.examItemId,
          examItemName: ai.examItemName,
          examRequireType: ai.examRequireType,
          examType: ai.examType,
          examUnit: ai.examUnit,
          exemptStatus: ai.exemptStatus,
          exemptType: ai.exemptType,
          resultValue: ai.resultValue,
          score: ai.score,
          scoreLevel: ai.scoreLevel,
          scorePercent: ai.scorePercent,
          signatureStatus: ai.signatureStatus,
          teacherName: ai.teacherName,
          teacherScore: ai.teacherScore,
          data: [ai],
        });
        map[ai.classTestId] = ai;
      } else {
        for (let j = 0; j < dest.length; j++) {
          let dj = dest[j];
          if (dj.classTestId == ai.classTestId) {
            dj.data.push(ai);
            break;
          }
        }
      }
    }
    return dest;
  },
    
  }
}
export default mixins;