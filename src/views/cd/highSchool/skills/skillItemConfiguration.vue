<style scoped>
.configure {
  position: absolute;
  top: 9px;
  right: 38%;
}
.one {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}
.gradeItem {
  width: 300px;
  height:100%;
  border: 1px solid rgba(191, 201, 206, 1);
  margin: 22px 7px;
  border-radius: 5px 5px 0px 0px;
  /* text-align: center; */
}
.top {
  width: 100%;
  height: 41px;
  background: rgba(240, 240, 240, 1);
  border-bottom: 1px solid rgba(191, 201, 206, 1);
  border-radius: 5px 5px 0px 0px;
  line-height: 42px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}
.sections {
  width: 100%;
  height:296px;
  box-sizing: border-box;
  padding:18px 0;
  overflow-y:scroll;
}
.sectionNot {
  width: 100%;
  height: 296px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 198, 147, 1);
}
.title {
  width: 100%;
  height: 46px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: rgba(0, 198, 147, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  padding-right: 150px;
}
.itemsData {
  width: 100%;
  height: 30px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #515a6e;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #ffffff;
}
.bottom {
  width: 100%;
  height: 40px;
  background: rgba(240, 240, 240, 1);
  border-top: 1px solid rgba(191, 201, 206, 1);
  line-height: 41px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(81, 90, 110, 1);
}
.text-green {
  color: #00c693;
}
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">考核项目配置</h2>
    </div>
    <div style="position:relative">
      <Card>
        <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
          <TabPane
            :name="grade.gradeId"
            :label="grade.val"
            v-for="grade in gradeList"
            :key="grade.gradeId"
          >
            <div class="one">
              <div
                class="gradeItem"
                v-for="item in gradeAllList"
                :value="item.sportsClassId"
                :key="item.sportsClassId"
              >
                <div class="top">{{item.sportsClassName}}</div>
                <div class="sections" v-if="item.showList.length>0">
                  <div v-for="exam in item.showList" style="margin-bottom:30px;">
                    <p style="text-align:left;margin-left:20px;color:#00C693;font-size:16px;line-height:28px;"><b>{{exam.classTestName}}</b></p>
                    <p style="text-align:left;margin-left:40px;line-height:28px;">学习时间：{{exam.learnTime}}</p>
                    <p style="text-align:left;margin-left:40px;line-height:28px;">课时：{{exam.classTime}}</p>
                  </div>
                </div>
                <div class="sectionNot" v-else>暂无考核项目</div>
                <div class="bottom">考核项目总数：{{item.examItemClassNum}}</div>
              </div>
            </div>
          </TabPane>
        </Tabs>
        <Button type="success" class="configure" @click="goConfigure">配置</Button>
      </Card>
    </div>
  </div>
</template>


<script>
export default {
  name: "skillItemConfiguration",
  data() {
    return {
      schoolId: "",
      selectTabName: "",
      loading: false,
      gradeList: [],
      gradeAllList: []
    };
  },
  methods: {
    selectTabs(name) {
      this.selectTabName = name;
      this.gradeAllList = [];
      sessionStorage.setItem(
        "examItemClassList-selectTabName",
        this.selectTabName
      );
      this.getHighSchoolGradeSkillList();
    },
    goConfigure() {
      var vm = this;
      sessionStorage.setItem(
        "examItemClassList-selectTabName",
        this.selectTabName
      );
      this.$router.push({ name: "skillItemConfigurationDetail" });
    },
    getHighSchoolGradeSkillList() {
      var vm = this;
      vm.loading = true;
      this.$axios
        .get(
          "/v1/cd/high/skills/getHighSchoolGradeSkillList?schoolId=" +
            vm.schoolId +
            "&gradeId=" +
            vm.selectTabName +
            "&classTestType=2"
        )
        .then(res => {
          vm.loading = false;
          if (res.data.code == 10000) {
            let data = res.data.response;
            if (data) {
              for (let i = 0; i < data.length; i++) {
                let examInfo = data[i];
                examInfo.showList = [];
                let list = examInfo.list;
                let itemArr = [];
                if (list.length > 0) {
                  for (let j = 0; j < list.length; j++) {
                    let week = list[j];
                    let show = {
                      classTestName: week.classTestName,
                      learnTime: [],
                      classTime: ""
                    };
                    let learnTime =
                      "第" + week.weekStart + "~" + week.weekEnd + "周";
                    let preClassTime = week.forecastClassTimes;
                    let classTime = week.classTimes;
                    if (itemArr.indexOf(week.classTestId) > -1) {
                      continue;
                    } else {
                      itemArr.push(week.classTestId);
                      for (let k = j + 1; k < list.length; k++) {
                        let otherWeek = list[k];
                        if (otherWeek.classTestId == week.classTestId) {
                          learnTime +=
                            "，" +
                            otherWeek.weekStart +
                            "~" +
                            otherWeek.weekEnd +
                            "周";
                          preClassTime += otherWeek.forecastClassTimes;
                        }
                      }
                    }

                    show.learnTime = learnTime;
                    show.classTime =
                      preClassTime +
                      "课时" +
                      (classTime > 0
                        ? "(实际课时：" + classTime + "课时)"
                        : "");
                    examInfo.showList.push(show);
                  }
                }
              }
              vm.gradeAllList = data;
            } else {
              vm.gradeAllList = [];
            }
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    }
  },
  watch: {},
  created() {},
  beforeDestroy() {},
  mounted() {
    var vm = this;
    // vm.countNotExcute();
    let type = sessionStorage.getItem("schoolType");
    vm.gradeList = [
      { val: "高一", gradeId: "10" },
      { val: "高二", gradeId: "11" },
      { val: "高三", gradeId: "12" }
    ];

    let selectTabNameInfo = sessionStorage.getItem(
      "examItemClassList-selectTabName"
    );
    if (
      selectTabNameInfo == null ||
      selectTabNameInfo == "" ||
      selectTabNameInfo == undefined
    ) {
      vm.selectTabName = vm.gradeList[0].gradeId;
    } else {
      vm.selectTabName = selectTabNameInfo;
    }
    sessionStorage.setItem("examItemClassList-selectTabName", vm.selectTabName);
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.getHighSchoolGradeSkillList();
  }
};
</script>
