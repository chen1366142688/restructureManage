<template>
  <div style="padding-left: 10px">
    <div>
      <h2 style="margin-top: 15px; margin-bottom: 13px">考试管理</h2>
    </div>
    <div>
      <Card>
        <div class="top-search addClass" @keydown.enter="querySearch">
          <div class="left-input">
            <div style="margin: 5px 20px">
              <span>项目名称：</span>
              <Select
                v-model="formList.middleItemName"
                :clearable="true"
                style="width: 120px"
              >
                <Option
                  v-for="(item, index) in itemList"
                  :value="item.middleItemName"
                  :key="item.middleItemId + index"
                  >{{ item.middleItemName }}</Option
                >
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>项目类型：</span>
              <Select
                v-model="formList.middleItemType"
                :clearable="true"
                style="width: 120px"
              >
                <Option
                  v-for="(item, index) in projectType"
                  :value="item.value"
                  :key="item.value + index"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
            <div style="margin: 5px 20px">
              <span>年<span style="visibility: hidden">年级</span>级：</span>
              <Select
                v-model="formList.grade"
                :clearable="true"
                style="width: 120px"
              >
                <Option
                  v-for="(item, i) in schoolGradeList"
                  :value="item.grade"
                  :key="item.grade + i"
                  >{{ item.label }}</Option
                >
              </Select>
            </div>
          </div>
          <div class="right-btns addClass">
            <Button type="success" @click="querySearch">查询</Button>
            <Button type="success" @click="exportData">导入选考数据</Button>
            <Button type="success" @click="goPassSyem">考试预约</Button>
          </div>
        </div>
      </Card>
      <br />
      <div>
        <Card>
          <Row>
            <div style>
              <Table
                border
                max-height="650"
                :loading="loading"
                :columns="resultColumns"
                :data="resultData"
              ></Table>
            </div>
            <br />
            <div style="float: right">
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
          </Row>
        </Card>
      </div>
    </div>

    <add-children
      v-if="addChildDisable"
      :schoolGradeList="schoolGradeList"
      :addChildDisable.sync="addChildDisable"
      :gradeId="gradeId"
      :middleItemId="middleItemId"
      @addAccomplish="addAccomplish(arguments)"
    ></add-children>
    <derive v-if="dreiveDisable" :driverdisable.sync="dreiveDisable"></derive>
    <Modal
      v-model="modalMsg.remind"
      title="提  醒"
      @on-ok="succse"
      @on-cancel="testCancel($event)"
      :ok-text="modalMsg.okText"
      :cancel-text="modalMsg.cancelText"
    >
      <p style="color: #515a6e; font-size: 16px">{{ modalMsg.content }}</p>
    </Modal>
    <Modal
      v-model="gotModl"
      title="提  醒"
      @on-ok="testCancel($event)"
      ok-text="知道了"
      @on-cancel="testCancel($event)"
      cancel-text=" "
    >
      <p style="color: #515a6e; font-size: 16px">
        该项目已经有学生选择考核，无法停用，
        若需停用该项目，请先移除选择的学生。
      </p>
    </Modal>
  </div>
</template>

<script>
import AddChildren from "@/views/km/examinationItemAllocation/examinationAllocation/modal/addChildren.vue";
import gradeData from "@/libs/grade";
import api from "@/api/studentApi";
import mixins from "./mixins.js";
import derive from "@/views/km/examinationItemAllocation/examinationAllocation/modal/derive.vue";
import util from "@/libs/util.js";
export default {
  mixins: [mixins],
  name: "schoolList",
  components: {
    AddChildren,
    derive,
  },
  data() {
    return {
      updateUrl: "", //导入地址
      dreiveDisable: false, //导出数据弹窗
      middleItemId: "", //单个数据的id
      loading: false,
      gradeId: "9999",
      gotModl: false,
      modalMsg: {
        remind: false, // 修改状态提醒弹窗
        okText: "停用",
        cancelText: "取消",
        content: "项目停用后，学生将无法选择该项目进行考核，是否确定停用？",
        rowVal: "",
      },
      itemList: [], //项目名称
      schoolGradeList: [],
      addChildDisable: false, //控制添加学生弹窗
      resultData: [],
    };
  },
  methods: {
    //导入设置
    exportData() {
      const obj = {
        title: "选考数据",
        import: {
          importUrl: "/v1/middleManage/file/upload/examConfigExport", //导入url地址
          params: {
            //请求参数设置
            schoolId: sessionStorage.getItem("schoolId"),
            schoolYear: sessionStorage.getItem("schoolYear"),
            yearSemester: sessionStorage.getItem("yearSemester"),
            teacherId: sessionStorage.getItem("teacherId"),
            token: sessionStorage.getItem("token"),
          },
        },
        exportTemplate: {
          exportTemplateUrl: "/v1/middleManage/getVisionImportTemplate", //导出模板url地址
          params: {
            //请求参数设置
            token: sessionStorage.getItem("token"),
          },
        },
        exportError: {
          exportErrorUrl: "/v1/middleManage/exportErrorChooseExport", //导出错误数据url地址
          params: {
            //请求参数设置
            token: sessionStorage.getItem("token"),
          },
        },
        queryTaskNum: {
          queryTaskNumUrl: "/v1/middleManage/countTaskListNum", //查询导出列表数据条数的地址
          params: {
            //请求参数设置
          },
        },
        getImportList: {
          getImportListUrl: "/v1/middleManage/getTaskList", //获取导入列表
          params: {
            //请求参数设置
          },
        },
      };
      this.$router.push({
        name: "exportDataKM",
        params: {
          obj: obj,
        },
      });
    },
    //筛选符合标准的数据
    selectProject(arr = [],key) {
      var obj = {};
      arr = arr.reduce(function(item, next) {
          obj[next.middleItemName] ? '' : obj[next.middleItemName] = true && item.push(next);
        return item;
      }, []);
      return arr;
    },
    //查询所有项目
    queryProject() {
      //dadad
      api.getExamItem().then((res) => {
        let { response } = res.data;
      let isData = this.selectProject(response);
        this.itemList = isData;
        this.itemList.unshift({
          middleItemName: "全部",
          middleItemId: "全部",
        });
      });
    },
    //取消弹窗
    testCancel(val) {
      this.queryMiddleList();
      this.resultData = [];
    },
    async addAccomplish(val) {
      //关闭添加学生
      let value = val;
      this.addChildDisable = !value;
      await this.queryMiddleList();
    },
    addChild(middleId, gradeId) {
      //添加学生
      let disable = this.addChildDisable;
      this.middleItemId = middleId;
      this.gradeId = gradeId;
      this.addChildDisable = !disable;
    },
    configuration(val) {
      // 考试相关配置
      // debugger;
      this.$router.push({
        name: `configurationKM`,
        params: {
          middleItemId: val.middleItemId,
          title: val.middleItemName,
          gradeId: val.gradeId,
          configLength: val.configList.length || 0,
        },
      });
    },
    //导出学生名单
    ecportCall(row) {
      let grade = row.gradeId;
      let itemId = row.middleItemName; 
      let url = `${
        this.$axios.defaults.baseURL
      }/v1/middleManage/exportMiddleItemData?token=${sessionStorage.getItem(
        "token"
      )}&grade=${grade}&itemName	=${itemId}`;
      window.open(url);
    },
    // 搜索列表
    querySearch() {
      this.formList.pageNum = 1;
      this.formList.pageSize = 10;
      this.queryMiddleList();
    },
    //更改状态
    updateItemStatus(disable, row) {
      this.modalMsg.rowVal = row;
      if (!disable) {
        this.modalMsg.remind = true;
      } else {
        this.updateStatus();
      }
    },
    //更新方法
    updateStatus() {
      const { rowVal } = this.modalMsg;
      const parmas = {
        middleItemId: rowVal.middleItemId,
        grade: rowVal.gradeId,
        infoStatus: rowVal.infoStatus == "0" ? "1" : "0",
      };
      api.updateItemStatus(parmas).then((res) => {
        if (res.data.code == 45000) this.gotModl = true;
        else this.queryMiddleList();
      });
    },
    //状态停用回调
    succse() {
      this.updateStatus();
    },
    // 获取中考考试列表
    queryMiddleList() {
      this.loading = true;
      const { grade, middleItemName, middleItemType } = this.formList;
      let params = {
        grade: grade == "9999" ? "" : grade,
        middleItemName: middleItemName == "全部" ? "" : middleItemName,
        middleItemType: middleItemType == "22" ? "" : middleItemType,
        pageNo: this.formList.pageNum,
        pageSize: this.formList.pageSize,
      };
      this.$store.dispatch("pageParams/saveListPagePars", {
        name: this.$route.name,
        pars: params,
      });
      api
        .getMiddleManageList(params)
        .then((res) => {
          this.loading = false;
          const { pageNum, pageSize, total, result } = res.data.response;
          this.formList.pageNum = pageNum;
          this.formList.pageSize = pageSize;
          this.formList.total = total;
          this.resultData = result;
        })
        .catch((err) => {
          this.loading = false;
          // this.$Message.error()
        });
    },
    pageNumChange(value) {
      this.formList.pageNum = value;
      this.queryMiddleList();
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      this.formList.pageSize = value;
      this.queryMiddleList();
    },
    //导入数据
    toDetail(data) {
      this.$router.push({
        name: "administrationManageKM",
        params: { val: data },
      });
    },
    goPassSyem() {
      let url = `${this.$axios.defaults.answerUrl}examinationSystem/login.html?schoolId=${sessionStorage.getItem('schoolId')}&code=${Math.random()
        .toString(36)
        .substr(2)}`;
      window.open(url);
    },
  },
  watch: {},
  created() {
    let params = util.hasParams(this.$store, this.$route);
    if (params) {
      let { pageNo } = params;
      this.formList = {
        ...params,
        pageNum: pageNo,
        grade:params.grade == ""?"9999":params.grade,
        middleItemName:params.middleItemName == ""?"全部":params.middleItemName,
        middleItemType:params.middleItemType == ""?"22":params.middleItemType,
      };
    }
  },
  beforeDestroy() {},
  mounted() {
    var vm = this;
    let schoolType = sessionStorage.getItem("schoolType");
    this.schoolId = sessionStorage.getItem("schoolId");
    this.schoolGradeList = gradeData.inOf(schoolType);
    this.queryMiddleList();
    this.queryProject();
  },
};
</script>
<style lang="less" scoped>
</style>
