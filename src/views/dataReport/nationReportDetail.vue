<template>
  <div style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">
        {{ activityName }}上报数据明细
      </h2>
    </div>
    <Card style="margin-top: 20px" :dis-hover="true">
      <div class="top-search">
        <div class="left-input"></div>
        <div class="right-btns">
          <Button
            class="add-button"
            style="margin: 0 20px"
            v-on:click="exportReportStudentTestDataPre(1)"
            type="success"
            >导出体测上报数据</Button
          >
          <Button
            class="add-button"
            style="margin: 0 20px"
            v-on:click="exportReportStudentTestDataPre(2)"
            type="success"
            >导出视力上报数据</Button
          >
          <Button class="add-button" v-on:click="goBack" type="success"
            >返回</Button
          >
        </div>
      </div>
    </Card>

    <!-- 体测-当前数据 -->
    <Card style="margin-top: 20px" :dis-hover="true">
      <p>体测当前数据</p>
      <Table border :columns="PhysicalCurrentDataColumns" :data="PhysicalCurrentData" class="m10"></Table>
    </Card>

    <!-- 视力-当前数据 -->
    <Card style="margin-top: 20px" :dis-hover="true">
        <p>视力当前数据</p>
        <Table border :columns="visionCurrentDataColumns" :data="visionCurrentData" class="m10"></Table>
    </Card>

    <Card style="margin-top: 20px" :dis-hover="true">
      <div>
        <p>体测历史报送记录</p>
              <Table
                border
                :columns="resultColumnsHis"
                :data="resultDataHis"
                class="m10"
              ></Table>
      </div>
    </Card>
    <Card style="margin-top: 20px" :dis-hover="true">
      <div>
        <p>视力历史报送记录</p>
              <Table
                border
                class="m10"
                :columns="resultColumnsVisionHistory"
                :data="resultDataVisionHistory"
              ></Table>
      </div>
    </Card>
    <Modal
      v-model="exportStatusOne"
      :mask-closable="false"
      width="360"
      :closable="false"
    >
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>选择导出数据</span>
      </p>
      <div style="text-align: center">
        <CheckboxGroup v-model="schoolIds">
          <Checkbox
            :label="school.schoolId"
            v-for="(school, index) in schoolList"
            :key="index"
            >{{ school.name }}</Checkbox
          >
        </CheckboxGroup>
      </div>
      <div slot="footer">
        <Button class="add-button" v-on:click="exportTestData" type="success"
          >确定</Button
        >
        <Button class="add-button" v-on:click="cancel" type="success"
          >取消</Button
        >
      </div>
    </Modal>
    <Modal
      v-model="exportStatusTwo"
      :mask-closable="false"
      width="360"
      :closable="false"
    >
      <p slot="header" style="color: #f60; text-align: center">
        <Icon type="ios-information-circle"></Icon>
        <span>选择导出数据</span>
      </p>
      <div style="text-align: left">
        <CheckboxGroup v-model="schoolIds">
          <Checkbox
            :label="school.schoolId"
            v-for="(school, index) in schoolList"
            :key="index"
            >{{ school.name }}</Checkbox
          >
        </CheckboxGroup>
      </div>
      <div slot="footer">
        <Button
          class="add-button"
          :loading="buttonLoading"
          v-on:click="addReportHistoryData"
          type="success"
          >确定</Button
        >
        <Button class="add-button" v-on:click="cancel" type="success"
          >取消</Button
        >
      </div>
    </Modal>
    <Modal v-model="errorModal" :mask-closable="false" width="360">
      <p slot="header" style="text-align: left">
        <span>提醒</span>
      </p>
      <div style="text-align: left">
        <!-- 有未完成学生和成绩有误学生 -->
        <p v-if="errorModalType === '1'">
          本次上报共{{ exportTotalStudent }}条学生数据，其中可直接上报的学生有{{
            exportTotalStudent - exportErrorStudent
          }}人，未完成学生{{ exportNotFinished }}，成绩有误学生{{
            exportErrorStudent
          }}人。 为避免国网上报失败，请通过“成绩修正”查看并修改，完成后再导出。
        </p>
        <!-- 只有未完成的学生,支持“继续导出 -->
        <p v-if="errorModalType === '2'">
          本次上报共{{ exportTotalStudent }}条学生数据，其中可直接上报的学生有{{
            exportTotalStudent - exportErrorStudent
          }}人，未完成学生{{
            exportNotFinished
          }}人。为避免国网上报失败，请填写完整后再导出。
        </p>
      </div>
      <div slot="footer">
        <Button
          type="success"
          v-on:click="addReportHistoryDataFun"
          v-if="errorModalType === '2'"
          >继续导出</Button
        >
        <Button
          type="success"
          v-on:click="toFixResult"
          v-if="errorModalType === '1'"
          >成绩修正</Button
        >
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      exportStatusOne: false,
      exportStatusTwo: false,
      activityId: "",
      activityName: "",
      reportStatus: "",
      schoolId: "",
      schoolIds: [],
      schoolList: [],
      PhysicalCurrentDataColumns: [ // 体测-当前数据
        {
          title: "学校",
          key: "schoolName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "学生总人数",
          key: "totalStudent",
          align: "center",
          minWidth: 100,
        },
        {
          title: "系统无学籍学生数",
          key: "notSchoolStudent",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.notSchoolStudent ? params.row.notSchoolStudent : 0
              ),
            ]);
          },
        },
        {
          title: "国网无学籍学生数",
          key: "notSchoolStudent",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                params.row.notNationStudent ? params.row.notNationStudent : 0
              ),
            ]);
          },
        },
        {
          title: "免试人数",
          key: "exemptStudent",
          align: "center",
          minWidth: 100,
        },
        {
          title: "体测完成人数/体测总人数",
          key: "testStudent",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finished =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            let totalStudent =
              row.totalStudent - row.notSchoolStudent - row.exemptStudent;
            return h("div", [
              h("span", finished + "/" + (totalStudent < 0 ? 0 : totalStudent)),
            ]);
          },
        },
        {
          title: "体测平均分",
          key: "excellentStudent",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finishStudent =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            return h("div", [
              h(
                "span",
                finishStudent > 0
                  ? (row.totalScore / finishStudent / 100).toFixed(2)
                  : 0
              ),
            ]);
          },
        },
        {
          title: "优秀率（人数）",
          key: "showType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finishStudent =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            return h("div", [
              h(
                "span",
                params.row.excellentStudent != null &&
                  params.row.testStudent &&
                  finishStudent > 0
                  ? (
                      (100 * params.row.excellentStudent) /
                      finishStudent
                    ).toFixed(2) +
                      "%" +
                      " （" +
                      params.row.excellentStudent +
                      "人）"
                  : "0%" + " （" + params.row.excellentStudent + "人）"
              ),
            ]);
          },
        },
        {
          title: "良好率（人数）",
          key: "showType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finishStudent =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            return h("div", [
              h(
                "span",
                params.row.goodStudent != null &&
                  params.row.testStudent &&
                  finishStudent > 0
                  ? ((100 * params.row.goodStudent) / finishStudent).toFixed(
                      2
                    ) +
                      "%" +
                      " （" +
                      params.row.goodStudent +
                      "人）"
                  : "0%" + " （" + params.row.goodStudent + "人）"
              ),
            ]);
          },
        },
        {
          title: "及格率（人数）",
          key: "showType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finishStudent =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            return h("div", [
              h(
                "span",
                params.row.passStudent != null &&
                  params.row.testStudent &&
                  finishStudent > 0
                  ? ((100 * params.row.passStudent) / finishStudent).toFixed(
                      2
                    ) +
                      "%" +
                      " （" +
                      params.row.passStudent +
                      "人）"
                  : "0%" + " （" + params.row.passStudent + "人）"
              ),
            ]);
          },
        },
        {
          title: "不及格率（人数）",
          key: "showType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finishStudent =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            return h("div", [
              h(
                "span",
                params.row.notPassStudent != null &&
                  params.row.testStudent &&
                  finishStudent > 0
                  ? ((100 * params.row.notPassStudent) / finishStudent).toFixed(
                      2
                    ) +
                      "%" +
                      " （" +
                      params.row.notPassStudent +
                      "人）"
                  : "0%" + " （" + params.row.notPassStudent + "人）"
              ),
            ]);
          },
        },
        {
          title: "优良率（人数）",
          key: "showType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finishStudent =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            let excellent = row.excellentStudent
              ? ((100 * row.excellentStudent) / finishStudent).toFixed(2)
              : 0;
            let good = row.goodStudent
              ? ((100 * row.goodStudent) / finishStudent).toFixed(2)
              : 0;
            let all = Number(excellent) + Number(good);
            all = all.toFixed(2);
            all = all > 100 ? 100 : all;
            let excellentCount = row.excellentStudent + row.goodStudent;
            return h("div", all + "%" + " （" + excellentCount + "人）");
          },
        },
        {
          title: "合格率（人数）",
          key: "showType",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finishStudent =
              row.excellentStudent +
              row.goodStudent +
              row.passStudent +
              row.notPassStudent;
            let excellent = row.excellentStudent
              ? ((100 * row.excellentStudent) / finishStudent).toFixed(2)
              : 0;
            let good = row.goodStudent
              ? ((100 * row.goodStudent) / finishStudent).toFixed(2)
              : 0;
            let passStudent = row.passStudent
              ? ((100 * row.passStudent) / finishStudent).toFixed(2)
              : 0;
            let all = Number(excellent) + Number(good) + Number(passStudent);
            all = all.toFixed(2);
            all = all > 100 ? 100 : all;
            let count =
              row.excellentStudent + row.goodStudent + row.passStudent;
            return h("div", all + "%" + " （" + count + "人）");
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
                    padding: "5px",
                    marginRight: 0,
                  },
                  on: {
                    click: () => {
                      this.toDetailInfo(params.row);
                    },
                  },
                },
                "查看详情"
              ),
            ]);
          },
        },
      ],
      PhysicalCurrentData: [],
      resultColumnsHis: [
        {
          title: "报送学校",
          key: "schoolName",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            var vm = this;
            let row = params.row;
            let schoolName = row.schoolName;
            let list = schoolName.split(",");
            if (list.length > 1) {
              var text = "";
              for (let i = 0; i < list.length; i++) {
                let data = list[i];
                text += "<p>" + list[i] + "</p>";
              }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
            } else {
              return h("div", schoolName);
            }
          },
        },
        {
          title: "免试人数",
          key: "exemptStudent",
          align: "center",
          minWidth: 100,
        },
        {
          title: "体测完成人数/体测总人数",
          key: "testStudent",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let finished = row.finishStudent;
            let totalStudent =
              row.reportStudentNum - row.notSchoolStudent - row.exemptStudent;
            return h("div", [h("span", finished + "/" + totalStudent)]);
          },
        },
        {
          title: "平均得分",
          key: "excellentStudent",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            let schoolName = row.schoolName;
            let list = schoolName.split(",");
            if (list.length > 1) {
              return h("div", row.averageScore);
            } else {
              if (!row.finishStudent) {
                text = "0";
              } else {
                let all = row.totalScore;
                let pass = (all / row.finishStudent / 100).toFixed(2);
                text = pass;
              }
            }
            return h("div", text);
          },
        },
        {
          title: "优秀率（人数）",
          key: "activityExplain",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (!row.finishStudent) {
              text = "0" + "%";
            } else {
              let all = row.excellentStudent;
              let pass = ((all * 100) / row.finishStudent).toFixed(2);
              text = pass + "%";
            }
            text = text + " （" + row.excellentStudent + "人）";
            return h("div", text);
          },
        },
        {
          title: "良好率（人数）",
          key: "activityExplain",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (!row.finishStudent) {
              text = "0" + "%";
            } else {
              let all = row.goodStudent;
              let pass = ((all * 100) / row.finishStudent).toFixed(2);
              text = pass + "%";
            }
            text = text + " （" + row.goodStudent + "人）";
            return h("div", text);
          },
        },
        {
          title: "及格率（人数）",
          key: "activityExplain",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (!row.finishStudent) {
              text = "0" + "%";
            } else {
              let all = row.passStudent;
              let pass = ((all * 100) / row.finishStudent).toFixed(2);
              text = pass + "%";
            }
            text = text + " （" + row.passStudent + "人）";
            return h("div", text);
          },
        },
        {
          title: "不及格率（人数）",
          key: "activityExplain",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (!row.finishStudent) {
              text = "0" + "%";
            } else {
              let all = row.notPassStudent;
              let pass = ((all * 100) / row.finishStudent).toFixed(2);
              text = pass + "%";
            }
            text = text + " （" + row.notPassStudent + "人）";
            return h("div", text);
          },
        },
        {
          title: "优良率（人数）",
          key: "activityExplain",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (!row.finishStudent) {
              text = "0" + "%";
            } else {
              let excellent = row.excellentStudent
                ? ((100 * row.excellentStudent) / row.finishStudent).toFixed(2)
                : 0;
              let good = row.goodStudent
                ? ((100 * row.goodStudent) / row.finishStudent).toFixed(2)
                : 0;
              let all = Number(excellent) + Number(good);
              all = all.toFixed(2);
              all = all > 100 ? 100 : all;
              text = all + "%";
            }
            let count = row.excellentStudent + row.goodStudent;
            text = text + " （" + count + "人）";
            return h("div", text);
          },
        },
        {
          title: "合格率（人数）",
          key: "activityExplain",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            let text = "";
            if (!row.finishStudent) {
              text = "0" + "%";
            } else {
              let excellent = row.excellentStudent
                ? ((100 * row.excellentStudent) / row.finishStudent).toFixed(2)
                : 0;
              let good = row.goodStudent
                ? ((100 * row.goodStudent) / row.finishStudent).toFixed(2)
                : 0;
              let passStudent = row.passStudent
                ? ((100 * row.passStudent) / row.finishStudent).toFixed(2)
                : 0;
              let all = Number(excellent) + Number(good) + Number(passStudent);
              all = all.toFixed(2);
              all = all > 100 ? 100 : all;
              text = all + "%";
            }
            let count =
              row.excellentStudent + row.goodStudent + row.passStudent;
            text = text + " （" + count + "人）";
            return h("div", text);
          },
        },
        {
          title: "报送时间",
          key: "reportTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "报送人",
          key: "teacherName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "状态",
          key: "reportStatus",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h('div', '报送成功')
            // const row = params.row;
            // let schoolName = row.schoolName;
            // let list = schoolName.split(",");
            // if (list.length > 1) {
            //   return h("div", "--");
            // } else {
            //   let text = row.reportStatus == "1" ? "报送成功" : "报送失败";
            //   return h("div", text);
            // }
          },
        },
      ],
      resultDataHis: [],
      resultColumnsVisionHistory: [
        {
          title: "报送学校",
          key: "schoolName",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            let schoolName = row.schoolName;
            let list = schoolName.split(",");
            if (list.length > 1) {
              var text = "";
              for (let i = 0; i < list.length; i++) {
                text += "<p>" + list[i] + "</p>";
              }
              return h("div", {
                domProps: {
                  innerHTML: text,
                },
              });
            } else {
              return h("div", schoolName);
            }
          },
        },
        {
          title: "免试人数",
          key: "exemptStudent",
          align: "center",
          minWidth: 100,
        },
        {
          title: "视力完成人数/测试总人数",
          key: "visionFinishStudent",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            let row = params.row;
            return h("div", [
              h(
                "span",
                `${row.finishStudent || 0}/${row.reportStudentNum || 0}`
              ),
            ]);
          },
        },
        {
          title: "报送时间",
          key: "reportTime",
          align: "center",
          minWidth: 100,
        },
        {
          title: "报送人",
          key: "teacherName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "状态",
          key: "reportStatus",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            return h('div', '报送成功')
            // const row = params.row;
            // let schoolName = row.schoolName;
            // let list = schoolName.split(",");
            // if (list.length > 1) {
            //   return h("div", "--");
            // } else {
            //   let text = row.reportStatus == "1" ? "报送成功" : "报送失败";
            //   return h("div", text);
            // }
          },
        },
      ],
      resultDataVisionHistory: [],
      exportType: 1, //1体测2视力
      exportTotalStudent: 0,
      exportErrorStudent: 0,
      exportNotFinished: 0,
      errorModal: false,
      errorModalType: "",
      buttonLoading: false,

      /** 视力-当前数据 */
      visionCurrentDataColumns: [
        {
            title: '报送学校',
            key: 'schoolName',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                let { schoolName, schoolType } = params.row;
                return h('div', [h('span', `${schoolName || ''}${schoolType == '1' ? '(幼儿园)' : schoolType == '2' ? '(小学)' : schoolType == '3' ? '(初中)' : '(高中)'}`)])
            }
        },
        {
            title: '学生总人数',
            key: 'visionTotalStudent',
            align: 'center',
            minWidth:100,
        },
          {
            title: '系统无学籍学生数',
            key: 'notSchoolStudent',
            align: 'center',
            minWidth:100,
        },
        {
            title: '国网无学籍学生数',
            key: 'notNationStudent',
            align: 'center',
            minWidth:100,
        },
        {
            title: '完成人数/测试总人数',
            key: 'visionFinishStudent',
            align: 'center',
            minWidth:100,
            render: (h, params) => {
                let { visionTotalStudent, visionFinishStudent } = params.row;
                return h('div', [h('span', `${visionFinishStudent || 0}/${visionTotalStudent}`)])
            }
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          render: (h, params) => {
            const row = params.row;
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled: row.schoolType == 4 ? true : false,
                  },
                  style: {
                    padding: "5px",
                    marginRight: 0,
                  },
                  on: {
                    click: () => {
                      this.studentVisionTestDetail(params.row)
                    },
                  },
                },
                "查看详情"
              ),
            ]);
          },
        },
      ],
      visionCurrentData: [
        
      ]
    };
  },
  
  mounted() {
    var vm = this;
    vm.getTeacherSchoolList();
    vm.schoolYear = sessionStorage.getItem(
      "nationReport-nationReportDetail-schoolYear"
    );
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.getActivityYearDetailInfo(vm.schoolYear);
    vm.getCountryReportHisList(vm.schoolYear);
    this.getVisionNowData() // 获取实例当前数据信息
    vm.getVisionHisList(vm.schoolYear);
  },
  methods: {
    getVisionNowData() {
      this.$axios.get('/v1/vision/report/getVisionNowData').then(res => {
        if (res.data.code === 10000) {
          this.visionCurrentData = res.data.response || []
        }
      })
    },
    // 查看-学生视力成绩详情
    studentVisionTestDetail(info) {
      const data = {
        schoolId: String(info.schoolId),
        isShowEdit: true,
        reportType: '2',
        schoolYear: String(this.$route.query.schoolYear),
        yearSemester: sessionStorage.getItem('yearSemester') // 这里传当前学年
      }
      this.$router.push({name: 'visionTestStudentDetail', query: data})
    },
    //成绩修正
    toFixResult() {
      var vm = this;
      sessionStorage.setItem(
        "nationReportDetail-fixErrorData-schoolIds",
        JSON.stringify(vm.schoolIds)
      );
      this.$router.push({ name: "fixErrorData" });
    },
    //取消操作隐藏弹窗
    cancel() {
      var vm = this;
      vm.exportStatusOne = false;
      vm.exportStatusTwo = false;
    },
    //导出测试数据
    exportTestDataPre() {
      this.schoolIds = [];
      this.exportStatusOne = true;
    },
    // 确定导出
    exportTestData() {
      var vm = this;
      if (vm.schoolIds.length < 1) {
        vm.$Message.info("请选择导出学校！");
        return;
      }
      let token = sessionStorage.getItem("token") || "";
      let url = `${this.$axios.defaults.baseURL}/v1/schoolteststudent/exportStudentTestStatisticalData2?schoolYear=${vm.schoolYear}&token=${token}&schoolIds=${vm.schoolIds}`;
      window.open(url);
      vm.exportStatusOne = false;
      vm.getCountryReportHisList(vm.schoolYear);
    },
    //1.导出体测和视力上报数据展示选择学校弹窗
    exportReportStudentTestDataPre(type) {
      this.schoolIds = [];
      this.exportType = type;
      this.exportStatusTwo = true;
    },
    //2.验证是否选择导出学校
    addReportHistoryData() {
      if (this.schoolIds.length < 1) {
        this.$Message.info("请选择导出学校！");
        return;
      }
      if (this.exportType == 2) {
        //视力导出不需要做验证，导入的时候就保证数据是完整并且正确的
        this.addReportHistoryDataFun();
      } else {
        this.buttonLoading = true;
        this.getNationReportErrorStatisticalInfo();
      }
    },
    //3.查询是否有未完成学生和成绩有误学生
    getNationReportErrorStatisticalInfo() {
      var vm = this;
      this.$axios
        .get(
          `/v1/test/report/getNationReportErrorStatisticalInfo?schoolIds=${vm.schoolIds}&type=${this.exportType}`
        )
        .then((res) => {
          if (res.data.code == 10000) {
            let data = res.data.response;
            if (
              data.totalStudent > 0 &&
              data.errorStudent == 0 &&
              data.notFinished == 0
            ) {
              vm.addReportHistoryDataFun();
            } else if (
              data.totalStudent > 0 &&
              data.errorStudent == 0 &&
              data.notFinished > 0
            ) {
              //只有未完成的学生，提醒未完成学生数,支持继续导出
              vm.buttonLoading = false;
              vm.exportTotalStudent = data.totalStudent;
              vm.exportErrorStudent = data.errorStudent;
              vm.exportNotFinished = data.notFinished;
              vm.exportStatusTwo = false;
              vm.errorModal = true;
              vm.errorModalType = "2";
            } else {
              //若总人数大于0 若有未完成学生和成绩有误学生，给提醒
              vm.buttonLoading = false;
              vm.exportTotalStudent = data.totalStudent;
              vm.exportErrorStudent = data.errorStudent;
              vm.exportNotFinished = data.notFinished;
              vm.exportStatusTwo = false;
              vm.errorModal = true;
              vm.errorModalType = "1";
            }
          }
        });
    },
    //4.生成上报历史统计数据
    addReportHistoryDataFun() {
      let token = sessionStorage.getItem("token") || "";
      if (this.exportType == 1) {
        this.$axios
          .get(
            `/v1/test/report/addReportHistoryData?schoolYear=${this.schoolYear}&token=${token}&schoolIds=${this.schoolIds}`
          )
          .then((res) => {
            if (res.data.code == 10000) {
              this.buttonLoading = false;
              if (this.exportType == 1) {
                this.exportReportStudentTestData();
              } else {
                this.exportReportStudentVisionDataPre();
              }
            }
          });
      } else {
        this.$axios.get(`/v1/vision/report/addVisionReportHistoryData?schoolYear=${this.schoolYear}&token=${token}&schoolIds=${this.schoolIds}`).then((res) => {
          if (res.data.code == 10000) {
            this.buttonLoading = false;
            if (this.exportType == 1) {
              this.exportReportStudentTestData();
            } else {
              this.exportReportStudentVisionDataPre();
            }
          }
        });
      }
    },
    // 5.导出体测上报数据
    exportReportStudentTestData() {
      let token = sessionStorage.getItem("token") || "";
      let url = `${this.$axios.defaults.baseURL}/v1/test/export/exportReportStudentTestData?schoolYear=${this.schoolYear}&token=${token}&schoolIds=${this.schoolIds}`;
      window.open(url);
      this.exportStatusTwo = false;
      this.getCountryReportHisList(this.schoolYear);
    },
    // 5-1导出视力上报数据
    exportReportStudentVisionDataPre() {
      let token = sessionStorage.getItem("token") || "";
      let url = `${this.$axios.defaults.baseURL}/v1/vision/report/exportReportStudentVisionData?schoolYear=${this.schoolYear}&token=${token}&schoolIds=${this.schoolIds}`;
      window.open(url);
      this.exportStatusTwo = false;
      this.getVisionHisList(this.schoolYear);
    },
    //返回
    goBack() {
      this.$router.go(-1);
    },
    //获取该体测活动的当前数据信息
    getActivityYearDetailInfo(schoolYear) {
      this.$axios
        .get(`/v1/dataReport/getTestActivityNowData?schoolYear=${schoolYear}`)
        .then((res) => {
          if (res.data.code == 10000) {
            this.PhysicalCurrentData = res.data.response;
          }
        });
    },
    //初始数据导入 --按钮已注释
    toExportStudent() {
      var vm = this;
      sessionStorage.setItem(
        "schoolTestDetail-schoolTestStudentExport-activityId",
        vm.activityId
      );
      sessionStorage.setItem(
        "schoolTestDetail-schoolTestStudentExport-activityName",
        vm.activityName
      );
      sessionStorage.setItem(
        "schoolTestDetail-schoolTestStudentExport-taskType",
        "3"
      );
      this.$router.push({ name: "schoolTestStudentExport" });
    },
    //获取该体测活动的上报记录列表
    getCountryReportHisList(schoolYear) {
      var vm = this;
      vm.loading = true;
      vm.resultDataHis = [];
      this.$axios
        .get("/v1/dataReport/getThisTestHisList?schoolYear=" + schoolYear)
        .then(function (response) {
          vm.loading = false;
          if (response.data.code == 10000) {
            vm.dealHisData(response.data.response);
          } else {
            vm.$Message.info(response.data.msg);
          }
        });
    },
    //获取该体测活动视力的上报记录列表
    getVisionHisList() {
      var vm = this;
      vm.resultDataVisionHistory = [];
      this.$axios
        .get("/v1/vision/report/getVisionReportHisList").then(function (res) {
          if (res.data.code == 10000) {
            vm.resultDataVisionHistory = res.data.response;
          } else {
            vm.$Message.info(res.data.msg);
          }
        });
    },
    //构建体测活动上报列表数据
    dealHisData(list) {
      var vm = this;
      if (!list) {
        vm.resultDataHis = [];
      }
      if (list && list.length == 1) {
        vm.resultDataHis = list;
      }
      if (list && list.length > 1) {
        let union = {
          excellentStudent: 0,
          exemptStudent: 0,
          finishStudent: 0,
          goodStudent: 0,
          notPassStudent: 0,
          notSchoolStudent: 0,
          passStudent: 0,
          reportStudentNum: 0,
          schoolName: "",
          schoolYear: 0,
          taskModificationStatus: "string",
          taskPrimevalStatus: "string",
          teacherId: 0,
          teacherName: "--",
          reportTime: "--",
          totalScore: 0,
          averageScore: 0,
        };
        for (let i = 0; i < list.length; i++) {
          let data = list[i];
          union.excellentStudent += Number(data.excellentStudent);
          union.exemptStudent += Number(data.exemptStudent);
          union.finishStudent += Number(data.finishStudent);
          union.goodStudent += Number(data.goodStudent);
          union.notPassStudent += Number(data.notPassStudent);
          union.passStudent += Number(data.passStudent);
          union.notSchoolStudent += Number(data.notSchoolStudent);
          union.totalScore += Number(data.totalScore);
          union.reportStudentNum += Number(data.reportStudentNum);
          if (data.finishStudent) {
            union.averageScore += Number(
              (data.totalScore / data.finishStudent / 100).toFixed(2)
            );
          }
          if (i == 0) {
            union.schoolName = data.schoolName;
          } else {
            union.schoolName += "," + data.schoolName;
          }
        }
        union.averageScore = (union.averageScore / list.length).toFixed(2);
        vm.resultDataHis.push(union);
        vm.resultDataHis = vm.resultDataHis.concat(list);
      }
    },
    //当前数据列表点击查看详情
    toDetailInfo(testActivity) {
      var vm = this;
      const data = {
        schoolId: testActivity.schoolId,
        isShowEdit: true,
        reportType: '1',
        yearSemester: sessionStorage.getItem('yearSemester')
      }
      this.$router.push({ name: "physicalTestStudentDetail", query: data});
    },
    //获取该教师管理的学校列表
    getTeacherSchoolList() {
      var vm = this;
      this.$axios
        .get("/v1/dataReport/getTeacherSchoolList?schoolId=1&menuType=1")
        .then((res) => {
          if (res.data.code == 10000) {
            vm.schoolList = res.data.response;
          } else {
            if (res.data.code > 39999) {
              vm.$Message.info(res.data.msg);
            }
          }
        });
    },
  },
};
</script>
