<template>
  <div class="administrationManage" style="padding-left:10px;">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">项目详情</h2>
    </div>
    <Card>
      <div class="top-search addClass" @keydown.enter="querySearch">
        <div class="left-input">
          <div style="margin: 5px 20px">
            <span>项目名称：</span>
            <Select
              v-model="formList.middleItemName"
              @on-change="ProjectChange"
              style="width: 120px"
            >
              <Option
                v-for="(item, index) in itemList"
                :value="item.middleItemName"
                :key="item.middleItemName + index"
                >{{ item.middleItemName }}</Option
              >
            </Select>
          </div>
          <div style="margin: 5px 20px">
            <span>考试时间：</span>
            <Select v-model="formList.schoolConfigId" style="width: 120px">
              <Option
                v-for="(item, index) in examConfigList"
                :value="item.id"
                :key="item.id + index"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
          <div style="margin: 5px 20px">
            <span>考试状态：</span>
            <Select v-model="formList.status" style="width: 120px">
              <Option
                v-for="(item, index) in examStatus"
                :value="item.id"
                :key="item.id + index"
                >{{ item.name }}</Option
              >
            </Select>
          </div>
          <div style="margin: 5px 20px">
            <span>年<span style="visibility: hidden">空空</span>级：</span>
            <Select v-model="formList.grade" style="width: 120px">
              <Option
                v-for="(item, i) in gradeList"
                :value="item.grade"
                :key="item.grade + i"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div style="margin: 5px 20px">
            <span>班<span style="visibility: hidden">空空</span>级：</span>
            <Select v-model="formList.classId" style="width: 120px">
              <Option
                v-for="(item, i) in classList"
                :value="item.value"
                :key="item.value + i"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
        </div>
        <div class="right-btns addClass">
          <Button type="success" @click="querySearch">查询</Button>
          <Button type="success" @click="addChild">添加学生</Button>
          <Button type="success" @click="driverEX">导出EXCEL</Button>
          <Button type="success" @click="goback">返回</Button>
        </div>
      </div>
    </Card>
    <Card style="margin-top: 16px">
      <Table
        border
        :loading="loading"
        max-height="600"
        :columns="resultColumns"
        :data="resultData"
      ></Table>
      <div style="text-align:right;width:100%;margin-top:12px;">
        <Page
          :total="formList.total"
          :current="formList.pageNum"
          :page-size="formList.pageSize"
          @on-change="pageNumChange"
          @on-page-size-change="pageSizechange"
          show-total
          show-sizer
        ></Page>
      </div>
    </Card>
    <driver
      v-if="driverdisable"
      :driverdisable="driverdisable"
      @accomplish="accomplish(arguments)"
    ></driver>
    <add-children
      v-if="addChildDisable"
      :addChildDisable.sync="addChildDisable"
      :middleItemId="formList.middleItemId"
      :gradeId="formList.grade"
      @addAccomplish="addAccomplish(arguments)"
    ></add-children>
  </div>
</template>
<script>
import driver from "@/views/km/examinationItemAllocation/examinationAllocation/modal/derive.vue";
import AddChildren from "@/views/km/examinationItemAllocation/examinationAllocation/modal/addChildren.vue";
import comon from "./components/comon.js";
import api from "@/api/studentApi";
import util from "@/libs/util.js";
export default {
  mixins: [comon],
  components: {
    driver,
    AddChildren,
  },
  data() {
    return {
      loading: false,
      msgList: {},
      examConfigList: [],
      formList: {
        middleItemId: "",
        middleItemName: "",
        grade: "9999",
        classId: "9999",
        status: 0,
        schoolConfigId: "9999",
        total: 0,
        pageNum: 1,
        pageSize: 10,
      },
      resultColumns: [
        {
          title: "姓名",
          key: "studentName",
          align: "center",
          minWidth: 100,
        },
        {
          title: "性别",
          key: "sex",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const { row } = params;
            return h("div", row.gender == "1" ? "男" : "女");
          },
        },
        {
          title: "学籍号",
          key: "registerCode",
          align: "center",
          minWidth: 100,
        },
        {
          title: "班级",
          key: "studentClass",
          align: "center",
          minWidth: 100,
          render: (h, params) => {
            const { row } = params;
            return h(
              "div",
              row.studentClass ? `${row.gradeName}${row.studentClass}班` : ""
            );
          },
        },
        {
          title: "考试相关配置",
          key: "configList",
          align: "center",
          minWidth: 300,
          render: (h, params) => {
            let _this = this;
            return h("div", { class: "analysisState clearfix" }, [
              params.row.configList.map(function (item, index) {
                let teacherVal = "";
                if (item.teachers) {
                  teacherVal = item.teachers
                    .map((items) => {
                      return items.name;
                    })
                    .join(",");
                }
                return h(
                  "div",
                  {
                    class: "divCores clearfix",
                  },
                  [
                    h("div", { class: "divright" }, [
                      h(
                        "div",
                        {
                          class: "spreadName",
                        },
                        `${item.startTime}~${item.endTime}`
                      ),
                      h(
                        "div",
                        {
                          class: "spreadCount",
                        },
                        `(${teacherVal})`
                      ),
                    ]),
                  ]
                );
              }),
            ]);
          },
        },
        {
          title: "考试状态",
          key: "examStatus",
          align: "center",
          minWidth: 100,
        },
        {
          title: "项目得分",
          key: "score",
          align: "center",
          minWidth: 100,
        },
        {
          title: "操作",
          key: "action",
          align: "center",
          minWidth: 200,
          render: (h, params) => {
            const row = params.row;
            return h(
              "div",
              {
                style: {
                  display: "flex",
                  justifyContent: "center",
                },
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      disabled: false,
                    },
                    on: {
                      click: () => {
                        this.removeStudent(row.studentId);
                      },
                    },
                  },
                  "移除"
                ),
              ]
            );
          },
        },
      ],
      resultData: [],
      driverdisable: false,
      addChildDisable: false,
    };
  },
  created() {
    // let params = util.hasParams(this.$store, this.$route);
    // if(params) {
    //   let {pageNo} = params;
    //   this.formList = {
    //     ...params,
    //     pageNum:pageNo,
    //   };
    // }
  },
  mounted() {
    this.msgList = this.$route.params.val;
    this.formList.middleItemName = this.msgList.middleItemName;
    this.formList.middleItemId = this.msgList.middleItemId;
    this.formList.grade = this.msgList.gradeId;
    this.fliterForm();
    this.queryMsg();
  },
  methods: {
    //选择项目触发事件
    ProjectChange(val) {
      this.fliterForm();
    },
    //移除学生
    async removeStudent(studentId) {
      let studentIdstudentId = {
        middleItemId: this.formList.middleItemId,
        studentId: studentId,
      };
      let res = await api.removeStudent(studentIdstudentId);
      console.log(res);
      if (res.data.code == 10000) this.queryMsg();
    },
    //通过路由参数来组合数据
    fliterForm() {
      // const {gradeId, middleItemId } = this.msgList;
      // this.formList.grade = gradeId;
      // this.formList.middleItemId = middleItemId;
      this.queryExamConfig();
    },
    //查询考试相关配置
    queryExamConfig() {
      api
        .getExamConfigByItemName({
          middleItemName: this.formList.middleItemName,
        })
        .then((res) => {
          let { response } = res.data;
          this.examConfigList = this.filterConfig(response);
        });
    },
    filterConfig(arr = []) {
      const newVal = arr.map((item) => {
        return {
          id: item.schoolConfigId,
          name: `${item.startTime}~${item.endTime}`,
        };
      });
      newVal.unshift({
        name: "全部",
        id: "9999",
      });
      return newVal;
    },
    //获取table列表
    queryMsg() {
      this.loading = true;
      let { grade, classId, schoolConfigId } = this.formList;
      const params = {
        pageSize: this.pageSize,
        ...this.formList,
        pageNo: this.formList.pageNum,
        grade: grade == "9999" ? "" : grade,
        classId: classId == "9999" ? "" : classId,
        schoolConfigId: schoolConfigId == "9999" ? "" : schoolConfigId,
      };
      // this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: params});
      api
        .getMiddleExamManageDetail(params)
        .then((res) => {
          this.loading = false;
          console.log("res", res);
          const { result, pageNum, pageSize, total } = res.data.response;
          this.formList.pageNum = pageNum;
          this.formList.pageSize = pageSize;
          this.formList.total = total;
          this.resultData = result;
        })
        .catch((error) => {
          this.loading = false;
        });
    },
    goback() {
      //返回
      this.$router.go(-1);
    },
    driverEX() {
      //导出excel
      let val = this.driverdisable;
      this.driverdisable = !val;
    },
    accomplish(data) {
      //导出前置条件获取

      let grade = data[0].join(",");
      let itemId = data[1].join(",");
      // if(!grade && !itemId){
      //     this.$Message.info('请选择年级或者项目!')
      //     return
      // }
      let url = `${
        this.$axios.defaults.baseURL
      }/v1/middleManage/exportMiddleItemData?token=${sessionStorage.getItem(
        "token"
      )}&grade=${grade}&itemName=${itemId}`;
      window.open(url);
      const value = this.driverdisable;
      this.driverdisable = !value;
    },
    //时间选择回调
    startTimeChange() {},
    // 搜索回调
    querySearch() {
      this.formList.pageNum = 1;
      this.formList.pageSize = 10;
      this.queryMsg();
    },
    //获取页码
    pageNumChange(val) {
      this.formList.pageNum = val;
      this.queryMsg();
    },
    //获取条数
    pageSizechange(val) {
      this.pageSize = val;
      this.queryMsg();
    },
    addChild() {
      //添加学生
      let val = this.addChildDisable;
      this.addChildDisable = !val;
    },
    addAccomplish(data) {
      this.queryMsg();
    },
  },
};
</script>
<style lang="less" scoped>
.administrationManage {
  min-height: 84vh;
}
</style>