<template>
  <div style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">按学生查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span style
                >年<span style="visibility: hidden">空</span>级：</span
              >
              <Select v-model="grade" style="width: 120px">
                <Option
                  v-for="item in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>班<span style="visibility: hidden">空</span>级：</span>
              <Select v-model="studentClass" style="width: 120px">
                <Option
                  v-for="(item, i) in classList"
                  :value="item.value"
                  :key="item.value + i"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>性<span style="visibility: hidden">空</span>别：</span>
              <Select v-model="gender" style="width: 120px">
                <Option
                  v-for="item in genderList"
                  :value="item.itemId"
                  :key="item.itemId"
                  >{{ item.itemName }}</Option
                >
              </Select>
            </div>
            <div @keydown.enter="querySearch" style="margin: 5px 20px">
              <span>姓<span style="visibility: hidden">空</span>名：</span>
              <Input
                v-model="studentName"
                placeholder="学生姓名"
                style="width: 120px"
              />
            </div>
            <div @keydown.enter="querySearch" style="margin: 5px 20px">
              <span>学籍号：</span>
              <Input
                v-model="registerCode"
                placeholder="学生学籍号"
                style="width: 120px"
              />
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" @click="querySearch">查询</Button>
            <!-- <Button type="success" @click="restore">重置查询条件</Button> -->
            <Button type="success" @click="toRepairScore"
              >技能/体能成绩录入</Button
            >
            <Button type="success" @click="exportSchoolTestData1"
              >导出技能/体能数据</Button
            >
            <Button type="success" @click="exportsGroup">学生分组导出</Button>
          </div>
        </div>
      </Card>
      <br />
      <Card>
        <div style="font-size: 18px; height: 40px">数据明细</div>
        <Row>
          <div>
            <Table
              border
              max-height="550"
              :loading="loading"
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
      </Card>
      <Modal v-model="showGroup" footer-hide>
        <div class="modal-content">
          <div class="modal-title">分组设置</div>
          <Form :label-width="100" :model="formModel">
            <FormItem prop="studentNumber" label="学生总人数">
              <Input type="text" disabled v-model="formModel.studentNumber">
              </Input
              >人
            </FormItem>
            <FormItem prop="groupNumber" label="每组学生人数">
              <Input type="text" disabled v-model="formModel.groupNumber">
              </Input
              >人
            </FormItem>
          </Form>
          <div class="modal-btn">
            <Button type="success" @click="exportsGroupContent"
              >分组导出</Button
            >
            <Button type="success" @click="exportsCancel">取消</Button>
          </div>
        </div>
      </Modal>
    </div>
  </div>
</template>

<script>
import util from "@/libs/util.js";
import Mixins from "./mixins.js";
export default {
  mixins: [Mixins],
  data() {
    return {
      formModel: {
        studentNumber: 100,
        groupNumber: 10,
      },
      showGroup: false,
      disabled: false,
      loading: false,
      schoolId: "",
      schoolType: "",
      grade: "",
      gender: 9999,
      genderList: [
        {
          itemId: "1",
          itemName: "男",
        },
        {
          itemId: "2",
          itemName: "女",
        },
      ],
      schoolGradeList: [],
      studentClass: 9999,
      registerCode: "",
      studentName: "",
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  methods: {
    exportsGroup() {
      this.showGroup = true;
    },
    exportsCancel() {
      this.showGroup = false;
    },
    exportsGroupContent() {
      var vm = this;

      if (typeof vm.grade == "undefined" || vm.grade == 9999) {
        vm.grade = "";
      }
      if (typeof vm.studentClass == "undefined" || vm.studentClass == 9999) {
        vm.studentClass = "";
      }
      if (typeof vm.gender == "undefined" || vm.gender == 9999) {
        vm.gender = "";
      }
      console.log(vm.studentName);
      if (typeof vm.studentName == "undefined" || vm.studentName == 9999) {
        vm.studentName = "";
      }
      if (typeof vm.registerCode == "undefined" || vm.registerCode == 9999) {
        vm.registerCode = "";
      }
      let schoolId = sessionStorage.getItem("schoolId");
      let yearSemester = sessionStorage.getItem("yearSemester");
      let url =
        this.$axios.defaults.baseURL +
        `/v1/exam/exportExamStudentInfo?schoolId=${schoolId}&grade=${
          vm.grade == 9999 ? "" : vm.grade
        }&studentClass=${
          vm.studentClass == 9999 ? "" : vm.studentClass
        }&gender=${vm.gender == 9999 ? "" : vm.gender}&studentName=${
          vm.studentName
        }&registerCode=${
          vm.registerCode
        }&yearSemester=${yearSemester}&token=${sessionStorage.getItem(
          "token"
        )}`;

      window.open(url);
      this.showGroup = false;
    },
    exportSchoolTestData() {
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
          "/v1/exam/exportExamStudentData?schoolId=1&grade=" +
          vm.grade ==
        9999
          ? ""
          : vm.grade + "&studentClass=" + vm.studentClass == 9999
          ? ""
          : vm.studentClass + "&gender=" + vm.gender == 9999
          ? ""
          : vm.gender +
            "&studentName=" +
            vm.studentName +
            "&registerCode=" +
            vm.registerCode +
            "&token=" +
            sessionStorage.getItem("token");

      window.open(url);
    },
    exportSchoolTestData1() {
      var vm = this;
      console.log(vm.grade, 8999);
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
      let name = util.Trim(vm.studentName, "g");
      let url = `${
        vm.$axios.defaults.baseURL
      }/v1/exam/exportExamStudentDataNew?schoolId=1&grade=${
        vm.grade == 9999 ? "" : vm.grade
      }
        &studentClass=${
          vm.studentClass == 9999 ? "" : vm.studentClass
        }&gender=${vm.gender == 9999 ? "" : vm.gender}${
        name ? `&studentName=${vm.studentName}` : ""
      }&registerCode=${vm.registerCode}&token=${sessionStorage.getItem(
        "token"
      )}`;
      window.open(url);
    },
    toDetail(studentInfo) {
      var vm = this;
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-studentId",
        studentInfo.studentId
      );
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-studentName",
        studentInfo.studentName
      );
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-examItemId",
        ""
      );
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-gradeId",
        studentInfo.grade
      );
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-gender",
        studentInfo.gender
      );
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-studentClass",
        studentInfo.studentClass
      );
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-classId",
        studentInfo.classId
      );
      sessionStorage.setItem(
        "classExamManage1-studentExamDetail1-classTestType",
        "2"
      );
      this.$router.push({ name: "studentExamDetail1" });
    },
    getExerciseStudentList(schoolId) {
      var vm = this;
      vm.resultData = [];
      vm.loading = true;
      let data = {
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass == 9999 ? "" : vm.studentClass,
        studentName: vm.studentName,
        grade: vm.grade == 9999 ? "" : vm.grade,
        gender: vm.gender == 9999 ? "" : vm.gender,
      };
      this.$store.dispatch("pageParams/saveListPagePars", {
        name: this.$route.name,
        pars: data,
      });
      this.$axios.post("/v1/exam/getExamStudentList2", data).then((res) => {
        vm.loading = false;
        if (res.data.code == 10000) {
          let result = res.data.response;
          if (result != null && result.length > 0) {
            for (let j = 0; j < result.length; j++) {
              //循环学生列表
              let examList = result[j].examList;
              let showTest = "";
              let showItemName = "";
              let showItemValue = "";
              let showBaseScore = "";
              let showTeacherScore = "";
              let showScore = "";
              let showScoreLevel = "";
              let showSignatureStatus = "";
              let skillTotalScore = 0;
              let skillCount = 0;
              let staminaTotalScore = 0;
              let staminaCount = 0;
              result[j].studentItem_skillCount = this.catgoryBigItemCount(examList, '2')
              result[j].studentItem_staminaCount = this.catgoryBigItemCount(examList, '3')
              console.log(`${result[j].studentName}技能完成大项数量为：${result[j].studentItem_skillCount}`)
              console.log(`${result[j].studentName}体能完成大项数量为：${result[j].studentItem_staminaCount}`)
              if (examList && examList.length > 0) {
                let selectItemId = examList[0].classTestId;

                showTest = "<div>";
                showItemName = "<div>";
                showItemValue = "<div>";
                showBaseScore = "<div>";
                showTeacherScore = "<div>";
                showScore = "<div>";
                showScoreLevel = "<div>";
                showSignatureStatus = "<div>";

                let tempHeightCount = 0;
                let tempName = "";
                let sigHeight = 30;
                let testAlllScore = 0;
                let testAlllScoreCount = 0;

                for (let i = 0; i < examList.length; i++) {
                  //循环项目列表
                  if (examList[i].score != null) {
                    //有分数
                    if (examList[i].classTestType == 2) {
                      //运动技能
                      if (skillTotalScore > -1) {
                        //技能有得分
                        if (examList[i].exemptType == "2") {
                          //免测类型
                          skillTotalScore += 80;
                        } else if (examList[i].exemptType == "1") {
                          //免测类型
                          skillTotalScore += 70;
                        } else {
                          //不免测
                          skillTotalScore += (examList[i].score * examList[i].scorePercent) / 10000;
                        }
                        skillCount += examList[i].scorePercent / 10000;
                      } else {
                        //其中一个项目是没有分数的时候，但是如果是选考也要计算分数
                        if (examList[i].examRequireType === "2") {
                          skillTotalScore = skillTotalScore < 0 ? 0 : skillTotalScore;
                          skillCount = skillCount < 0 ? 0 : skillCount;
                          skillTotalScore += (examList[i].score * examList[i].scorePercent) / 10000;
                          skillCount += examList[i].scorePercent / 10000;
                        }
                      }
                    } else if (examList[i].classTestType == 3) {
                      //体能
                      if (staminaTotalScore > -1) {
                        if (examList[i].exemptType == "2") {
                          staminaTotalScore += 80;
                        } else if (examList[i].exemptType == "1") {
                          staminaTotalScore += 70;
                        } else {
                          staminaTotalScore += (examList[i].score * examList[i].scorePercent) / 10000;
                        }
                        staminaCount += examList[i].scorePercent / 10000;
                      } else {
                        //其中一个项目是没有分数的时候，但是如果是选考也要计算分数
                        if (examList[i].examRequireType === "2") {
                          staminaTotalScore = staminaTotalScore < 0 ? 0 : staminaTotalScore;
                          staminaCount = staminaCount < 0 ? 0 : staminaCount;
                          staminaTotalScore += (examList[i].score * examList[i].scorePercent) / 10000;
                          staminaCount += examList[i].scorePercent / 10000;
                        }
                      }
                    }
                  } else {
                    //没有分数 
                    if (examList[i].classTestType == 2) {
                      //运动技能
                      if (examList[i].examRequireType === "2") { //处理选考模式下,前面的项已经有分数的情况
                        skillTotalScore = skillTotalScore < 0 ? 0 : skillTotalScore;
                        skillCount = skillCount < 0 ? 0 : skillCount;
                        skillTotalScore += (examList[i].score * examList[i].scorePercent) / 10000;
                        skillCount += examList[i].scorePercent / 10000;
                      }else {
                        skillTotalScore = -1;
                        skillCount = -1;
                      }
                    } else if (examList[i].classTestType == 3) {
                      //体能
                      if (examList[i].examRequireType === "2") {//处理选考模式下,前面的项已经有分数的情况
                        staminaTotalScore = staminaTotalScore < 0 ? 0 : staminaTotalScore;
                        staminaCount = staminaCount < 0 ? 0 : staminaCount;
                        staminaTotalScore += (examList[i].score * examList[i].scorePercent) / 10000;
                        staminaCount += examList[i].scorePercent / 10000;
                      }else {
                        staminaTotalScore = -1;
                        staminaCount = -1;
                      }
                    }
                  }
                  examList[i].classTestNameShow = examList[i].classTestName;
                  if (examList[i].signatureStatus == "1") {
                    examList[i].signatureStatus = "已签名";
                  } else {
                    examList[i].signatureStatus = "未签名";
                  }
                  if (examList[i].resultValue == null) {
                    //没有录入值
                    examList[i].resultValue = "--";
                    examList[i].baseScore = "--";
                    examList[i].teacherScore = "--";
                    examList[i].score = "--";
                    examList[i].scoreLevel = "--";
                  } else {
                    //有录入值
                    if (
                      examList[i].examUnit &&
                      examList[i].examUnit === "分.秒"
                    ) {
                      //单独处理分秒的单位返回值
                      let studentInsertValue = examList[i].resultValue; //学生录入的成绩
                      examList[i].resultValue =
                        Number(studentInsertValue) % 60 > 0
                          ? `${Math.floor(Number(studentInsertValue) / 60)}'${
                              Number(studentInsertValue) % 60
                            }"`
                          : `${Number(studentInsertValue) / 60}'`;
                    } else {
                      //正常单位直接显示值和单位
                      examList[i].resultValue =
                        examList[i].examUnit != "99"
                          ? `${examList[i].resultValue}(${examList[i].examUnit})`
                          : "--";
                    }
                    examList[i].baseScore =
                      examList[i].baseScore == null
                        ? "--"
                        : examList[i].baseScore;
                    examList[i].teacherScore =
                      examList[i].teacherScore == null
                        ? "--"
                        : examList[i].teacherScore;
                    examList[i].score =
                      examList[i].score == null ? "--" : examList[i].score;
                    let scoreLevelList = ["优秀", "良好", "及格", "不及格"];
                    //等级如果不在范围之内，就默认为不及格
                    examList[i].scoreLevel =
                      examList[i].scoreLevel > 0 && examList[i].scoreLevel < 4
                        ? scoreLevelList[examList[i].scoreLevel - 1]
                        : scoreLevelList[3];
                  }

                  if (
                    examList[i].exemptType == "1" ||
                    examList[i].exemptType == "2"
                  ) {
                    // 如果是该项目是免测
                    examList[i].classTestName = examList[i].classTestName;
                    examList[i].resultValue = "免试";
                    examList[i].score =
                      examList[i].exemptType == "1"
                        ? 70
                        : examList[i].exemptType == "2"
                        ? 80
                        : 0;
                    examList[i].scoreLevel = vm.calculationNoTestLevel(
                      examList[i].score
                    );
                  }

                  let borderStyle = "border-top:1px #DFD9DE solid;";
                  if (showTest == "<div>") {
                    borderStyle = "";
                  } else {
                    borderStyle = "border-top:1px #DFD9DE solid;";
                  }
                  if (selectItemId != examList[i].classTestId) {
                    showTest = `${showTest}<div style='text-align:center;width:100%;${borderStyle}height:${
                      tempHeightCount * sigHeight
                    }px;line-height:${
                      tempHeightCount * sigHeight
                    }px;'>${tempName}</div>`;
                    selectItemId = examList[i].classTestId;
                    tempHeightCount = 1;
                    if (
                      examList.length > i + 1 &&
                      examList[i].classTestId == examList[i + 1].classTestId
                    ) {
                      tempHeightCount = tempHeightCount + 1;
                      borderStyle = "border-top:1px #DFD9DE solid;";

                      let average = "--";
                      let averageLevel = "--";
                      testAlllScore = 0;
                      testAlllScoreCount = 0;
                      for (let k = 0; k < examList.length; k++) {
                        if ( examList[k].classTestId == examList[i].classTestId) {
                          if (examList[k].examRequireType === "1") {
                            //子项目必考
                            if (examList[k].score == "--" ||examList[k].score == null) {
                              testAlllScore = -1;
                              testAlllScoreCount = 0;
                              break;
                            } else {
                              testAlllScore =examList[k].score *(examList[k].scorePercent / 10000) + (testAlllScore <= 0 ? 0 : testAlllScore);
                              testAlllScoreCount = testAlllScoreCount + 1;
                            }
                          } else {
                            //子项目选考
                            // console.log(`1111学生：${result[i].studentName}分数：${examList[k].score}`)
                            testAlllScore =examList[k].score === "--"? 0: examList[k].score * (examList[k].scorePercent / 10000) +(testAlllScore <= 0 ? 0 : testAlllScore);
                            testAlllScore =testAlllScore == 0 ? -1 : testAlllScore;
                            testAlllScoreCount = testAlllScoreCount + 1;
                          }
                        }
                      }
                      if (testAlllScore >= 0) {
                        average = testAlllScore.toFixed(1);
                        averageLevel = vm.calculationNoTestLevel(average);
                      }
                      if (examList[i].exemptType == "1" ||examList[i].exemptType == "2") {
                        //如果免试重新计算分数和等级
                        average =examList[i].exemptType == "1"? 70: examList[i].exemptType == "2"? 80: 0;
                        averageLevel = vm.calculationNoTestLevel(average);
                      }

                      showItemName =
                        showItemName +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >" +
                        examList[i].classTestNameShow +
                        "(合计)</div>";
                      showItemValue =
                        showItemValue +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                      showBaseScore =
                        showBaseScore +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                      showTeacherScore =
                        showTeacherScore +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                      showScore =
                        showScore +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >" +
                        average +
                        "</div>";
                      showScoreLevel =
                        showScoreLevel +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >" +
                        averageLevel +
                        "</div>";
                      showSignatureStatus =
                        showSignatureStatus +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                    }
                    tempName = examList[i].classTestName;
                  } else {
                    if (i == 0 &&examList.length > 1 && examList[0].classTestId == examList[1].classTestId) {
                      tempHeightCount = tempHeightCount + 1;
                      borderStyle = "border-bottom:1px #DFD9DE solid;";

                      let average = "--";
                      let averageLevel = "--";
                      testAlllScore = 0;
                      testAlllScoreCount = 0;
                      for (let k = 0; k < examList.length; k++) {
                        if (examList[k].classTestId == examList[0].classTestId ) {
                          if (examList[k].examRequireType === "1") {    
                            //子项目必考
                            if (examList[k].score == "--" ||examList[k].score == null) {
                              testAlllScore = -1;
                              testAlllScoreCount = 0;
                              break;
                            } else {
                              testAlllScore =examList[k].score *(examList[k].scorePercent / 10000) +(testAlllScore <= 0 ? 0 : testAlllScore);
                              testAlllScoreCount = testAlllScoreCount + 1;
                            }
                          } else {
                            // console.log(`2222学生：${result[i].studentName}分数：${examList[k].score}`)
                            testAlllScore = examList[k].score === "--"? 0 : examList[k].score *(examList[k].scorePercent / 10000) +(testAlllScore <= 0 ? 0 : testAlllScore);
                            testAlllScore = testAlllScore == 0 ? -1 : testAlllScore;
                            testAlllScoreCount = testAlllScoreCount + 1;
                          }
                        }
                      }
                      if (testAlllScore >= 0) {
                        average = testAlllScore.toFixed(1);
                        averageLevel = vm.calculationNoTestLevel(average);
                      }
                      if (
                        examList[i].exemptType == "1" ||
                        examList[i].exemptType == "2"
                      ) {
                        average =
                          examList[0].exemptType == "1"
                            ? 70
                            : examList[0].exemptType == "2"
                            ? 80
                            : 0;
                        averageLevel = vm.calculationNoTestLevel(average);
                      }

                      showItemName =
                        showItemName +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >" +
                        examList[i].classTestNameShow +
                        "(合计)</div>";
                      showItemValue =
                        showItemValue +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                      showBaseScore =
                        showBaseScore +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                      showTeacherScore =
                        showTeacherScore +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                      showScore =
                        showScore +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >" +
                        average +
                        "</div>";
                      showScoreLevel =
                        showScoreLevel +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >" +
                        averageLevel +
                        "</div>";
                      showSignatureStatus =
                        showSignatureStatus +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        sigHeight +
                        "px;line-height:" +
                        sigHeight +
                        "px;' >--</div>";
                    }
                    tempHeightCount = tempHeightCount + 1;
                    tempName = examList[i].classTestName;
                  }
                  if (i == examList.length - 1) {
                    tempName = examList[i].classTestName;
                    if (examList.length > 1) {
                      showTest =
                        showTest +
                        "<div style='text-align:center;width:100%;border-top:1px #DFD9DE solid;height:" +
                        tempHeightCount * sigHeight +
                        "px;line-height:" +
                        tempHeightCount * sigHeight +
                        "px;' >" +
                        tempName +
                        "</div>";
                    } else {
                      showTest =
                        showTest +
                        "<div style='text-align:center;width:100%;" +
                        borderStyle +
                        "height:" +
                        tempHeightCount * sigHeight +
                        "px;line-height:" +
                        tempHeightCount * sigHeight +
                        "px;' >" +
                        tempName +
                        "</div>";
                    }
                  }
                  if (i == 0) {
                    borderStyle = "";
                  } else {
                    borderStyle = "border-top:1px #DFD9DE solid;";
                  }
                  let scorePercent = "";
                  if (
                    examList[i].scorePercent != null &&
                    examList[i].scorePercent > 0 &&
                    examList[i].scorePercent < 10000
                  ) {
                    examList[i].scorePercent = examList[i].scorePercent / 100;
                    scorePercent = " (" + examList[i].scorePercent + "%)";
                  }

                  showItemName =
                    showItemName +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:" +
                    sigHeight +
                    "px;line-height:" +
                    sigHeight +
                    "px;' >" +
                    examList[i].examItemName +
                    scorePercent +
                    "</div>";
                  showItemValue =
                    showItemValue +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:" +
                    sigHeight +
                    "px;line-height:" +
                    sigHeight +
                    "px;' >" +
                    examList[i].resultValue +
                    "</div>";
                  showBaseScore =
                    showBaseScore +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:" +
                    sigHeight +
                    "px;line-height:" +
                    sigHeight +
                    "px;' >" +
                    examList[i].baseScore +
                    "</div>";
                  showTeacherScore =
                    showTeacherScore +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:" +
                    sigHeight +
                    "px;line-height:" +
                    sigHeight +
                    "px;' >" +
                    examList[i].teacherScore +
                    "</div>";
                  showScore =
                    showScore +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:" +
                    sigHeight +
                    "px;line-height:" +
                    sigHeight +
                    "px;' >" +
                    examList[i].score +
                    "</div>";
                  showScoreLevel =
                    showScoreLevel +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:" +
                    sigHeight +
                    "px;line-height:" +
                    sigHeight +
                    "px;' >" +
                    examList[i].scoreLevel +
                    "</div>";
                  showSignatureStatus =
                    showSignatureStatus +
                    "<div style='text-align:center;width:100%;" +
                    borderStyle +
                    "height:" +
                    sigHeight +
                    "px;line-height:" +
                    sigHeight +
                    "px;' >" +
                    examList[i].signatureStatus +
                    "</div>";
                }
                showTest = showTest + "</div>";
                showItemName = showItemName + "</div>";
                showItemValue = showItemValue + "</div>";
                showBaseScore = showBaseScore + "</div>";
                showTeacherScore = showTeacherScore + "</div>";
                showScore = showScore + "</div>";
                showScoreLevel = showScoreLevel + "</div>";
                showSignatureStatus = showSignatureStatus + "</div>";
              }
              result[j].showItemTest = showTest;
              result[j].showItemName = showItemName;
              result[j].showItemValue = showItemValue;
              result[j].showBaseScore = showBaseScore;
              result[j].showTeacherScore = showTeacherScore;
              result[j].showScore = showScore;
              result[j].showScoreLevel = showScoreLevel;
              result[j].showSignatureStatus = showSignatureStatus;
              if (skillCount > 0 && skillTotalScore > 0 && result[j].studentItem_skillCount > 0) {
                result[j].skillTotalScore = ( skillTotalScore / result[j].studentItem_skillCount).toFixed(2);
              } else {
                result[j].skillTotalScore = "--";
              }
              if (staminaCount > 0 && staminaTotalScore > 0 && result[j].studentItem_staminaCount >0) {
                result[j].staminaTotalScore = ( staminaTotalScore / result[j].studentItem_staminaCount).toFixed(2);
              } else {
                result[j].staminaTotalScore = "--";
              }
            }
            vm.resultData = result;
          }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    countExerciseStudentList(schoolId) {
      var vm = this;
      let data = {
        grade: vm.grade == 9999 ? "" : vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass == 9999 ? "" : vm.studentClass,
        studentName: vm.studentName,
        gender: vm.gender == 9999 ? "" : vm.gender,
      };
      this.$axios.post("/v1/exam/countExamStudentList", data).then((res) => {
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
    querySearch() {
      this.pageNum = 1;
      this.pageNo = 1;
      this.search();
    },
    search() {
      var vm = this;
      vm.getExerciseStudentList(vm.schoolId);
      vm.countExerciseStudentList(vm.schoolId)
    },
    restore() {
      var vm = this;
      vm.grade = "";
      vm.pageNo = 1;
      vm.pageSize = 10;
      vm.registerCode = "";
      vm.studentClass = 9999;
      vm.studentName = "";
      vm.grade = 9999;
      vm.gender = 9999;
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
    toRepairScore() {
      var vm = this;
      sessionStorage.setItem(
        "examActionStaminaGrade-actionStaminaRepair-yearSemester",
        sessionStorage.getItem("yearSemester")
      );
      sessionStorage.setItem(
        "examActionStaminaGrade-actionStaminaRepair-grade",
        vm.grade
      );
      sessionStorage.setItem(
        "examActionStaminaGrade-actionStaminaRepair-studentClass",
        vm.studentClass
      );
      this.$router.push({ name: "examActionStaminaRepair" });
    },
  },
  watch: {},
  created() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this;
    let schoolId = sessionStorage.getItem("schoolId");
    vm.schoolId = schoolId;
    let schoolType = sessionStorage.getItem("schoolType");
    vm.schoolType = schoolType;
    if ("2" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList);
      this.grade = 1;
    }
    if ("3" == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList);
      this.grade = 7;
    }
    if ("4" == schoolType) {
      this.grade = 10;
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList);
    }
    let params = util.hasParams(this.$store, this.$route),
      search = {
        studentClass: 9999,
        registerCode: "",
        studentName: "",
        gender: 9999,
        pageNo: 1,
        pageSize: 10,
      };
    if (params) search = params;
    if (
      search.grade != null &&
      search.grade != "" &&
      search.grade != undefined &&
      search.grade > 0
    ) {
      vm.grade = Number(search.grade);
    } else;
    if (
      search.studentClass != null &&
      search.studentClass != "" &&
      search.studentClass != undefined &&
      search.studentClass > 0
    ) {
      vm.studentClass = Number(search.studentClass);
    } else vm.studentClass = 9999;
    if (
      search.registerCode != null &&
      search.registerCode != "" &&
      search.registerCode != undefined
    ) {
      vm.registerCode = search.registerCode;
    }
    if (
      search.studentName != null &&
      search.studentName != "" &&
      search.studentName != undefined
    ) {
      vm.studentName = search.studentName;
    }
    if (
      search.gender != null &&
      search.gender != "" &&
      search.gender != undefined
    ) {
      vm.gender = search.gender;
    } else vm.gender = 9999;
    if (
      search.pageNo != null &&
      search.pageNo != "" &&
      search.pageNum != undefined &&
      search.pageNo > 0
    ) {
      vm.pageNum = Number(search.pageNo);
    }
    if (
      search.pageSize != null &&
      search.pageSize != "" &&
      search.pageSize != undefined &&
      search.pageSize > 0
    ) {
      vm.pageSize = Number(search.pageSize);
    }
    // vm.search()
    if (sessionStorage.getItem("examQueryStudent-studentClass")) {
      this.studentClass = parseInt(
        sessionStorage.getItem("examQueryStudent-studentClass")
      );
    }
    if (sessionStorage.getItem("examQueryStudent-grade")) {
      this.grade = parseInt(sessionStorage.getItem("examQueryStudent-grade"));
    }
    vm.search();
  },
};
</script>
<style lang="less" scoped>
.modal-content {
  width: 90%;
  margin: auto;
  .modal-title {
    height: 70px;
    line-height: 70px;
    text-align: center;
    font-size: 18px;
  }
  .ivu-input-wrapper {
    width: 80%;
    margin-right: 10px;
  }
  .modal-btn {
    display: flex;
    justify-content: space-around;
    width: 200px;
    margin: auto;
    margin-top: 10px;
    margin-bottom: 30px;
  }
}
</style>
