<template>
  <div>
    <TopSearch
      :params="params"
      @on-back="$router.go(-1)"
      @on-search="searchInfo"
      @on-reset="restore"
      :reportType="reportType"
      v-bind="$attrs"
    />
    <Card style="margin-top: 15px">
      <div style="font-size: 18px; height: 40px">数据明细</div>
      <Table
        border
        width="100%"
        max-height="570"
        :columns="tableColumns"
        :data="tableDatas"
      ></Table>
      <div style="display:flex;justify-content:flex-end;margin-top:15px;">
        <Page
          :total="total"
          :current="params.pageNo"
          :page-size="params.pageSize"
          @on-change="pageNumChange"
          @on-page-size-change="pageSizechange"
          show-total
          show-sizer
        ></Page>
      </div>
    </Card>
  </div>
  
</template>

<script>
import TopSearch from './top-search.vue'
import Api from '@/api/dataReport'
import {columnsOld, columnsNew, columnsBase, physicalTestColumns, subjectColumns} from '../columns'
import Util from '@/libs/util'
export default {
  inheritAttrs: true, // 继承所有父组件的内容
  props: {
    schoolYear: { // 学年(用于动态渲染视力详情表格)
      type: String,
      default: ''
    },
    isShowEdit: { // 是否显示编辑按钮
      type: Boolean,
      default: false
    },
    reportType: {
      type: String,
      default: ''
    }
  },
  components: {
    TopSearch
  },
  data() {
    return {
      total: 0,
      tableDatas: [],
      tableColumns: [],
      params: { // 表格查询参数
        grade: "ALL",
        studentClass: "ALL",
        registerCode: "",
        studentName: "",
        pageNo: 1,
        pageSize: 10,
        gender: "ALL",
        studentStatus: "ALL",
      },
    }
  },
  created() {
    this.initParams()
    this.initColumnsByType() // 根据不同的pageType初始化表格字段
  },
  mounted() {
    this.search()
  },
  methods: {
    initParams() {
      let data = Util.hasParams(this.$store, this.$route);
      if (data) {
        this.params.grade =  data.grade ? data.grade : 'ALL'
        this.params.studentClass = data.studentClass ? data.studentClass : 'ALL'
        this.params.gender = data.gender ? data.gender : 'ALL'
        this.params.registerCode = data.registerCode
        this.params.studentName = data.studentName
        this.params.pageNo = Number(data.pageNo)
        this.params.pageSize = Number(data.pageSize)
        this.params.studentStatus = data.studentStatus
      }
    },
    toClassTestDetail(data) {
      const {studentId, studentName, registerCode, gender, gradeId, startSchool, studentClass} = data
      const queryData = {
        studentId,
        studentName,
        registerCode,
        gender,
        gradeId,
        startSchool,
        studentClass
      }
      this.$router.push({ name: "classTestDetail", params: queryData});
    },
    toVisionTestDetail(data) {
      const {studentId} = data
      this.$router.push({ name: "studentVisionDetail", query: {studentId}});
    },
    search() {
      const { params } = this
      const {schoolId, yearSemester} = this.$attrs
      const payload = {
        ...params,
        schoolId,
        yearSemester
      }
      this.$store.dispatch('pageParams/saveListPagePars',{name: this.$route.name, pars: params});
      this.getDataList(payload);
      this.getDataCount(payload);
    },
    async getDataList(paylod) {
      let url = ''
      if (this.reportType === '1') { // 体质测试的接口
        url = 'getStudentTestResultList'
      } else if (this.reportType === '2') { // 视力测试的接口
        url = 'getStudentVisionList'
      } else {
        url = 'getSubjectStudentList'
      }
      const result = await Api[url](paylod)
      if (result.data.code === 10000) {
        this.tableDatas = result.data.response || []
        console.log('tableDatas', this.tableDatas);
      }
    },
    async getDataCount(paylod) {
      let url = ''
      if (this.reportType === '1') {
        url = 'countStudentTestResultListReport'
      } else if (this.reportType === '2') {
        url = 'getStudentVisionCount'
      } else {
        url = 'getSubjectStudentListCount'
      }
      const result = await Api[url](paylod)
      if (result.data.code === 10000) {
        this.total = result.data.response || 0
      }
    },
    /** 
     * 初始化表格字段
     * @param {*} reportType 1：体质测试 2：视力测试 3：学科评价
     */
    initColumnsByType() {
      const { reportType } = this
      if (reportType === '1') {
        this.setBaseColumns()
      } else if (reportType === '2') {
        this.setVisionColumns()
      } else {
        this.setBaseColumns()
      }
    },
    setBaseColumns() {
      if (this.reportType === '1') { // 根据isShowEdit来控制是否显示编辑按钮
        this.tableColumns = physicalTestColumns
        if (this.isShowEdit) {
          let column = {
            title: "操作",
            key: "action",
            align: "center",
            width: 100,
            fixed: "right",
            render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success",
                      disabled: !params.row.studentId ? true : false
                    },
                    style: {
                      marginRight: "5px",
                    },
                    on: {
                      click: () => {
                        this.toClassTestDetail(params.row);
                      },
                    },
                  },
                  "编辑"
                ),
              ]);
            }
          }
          this.tableColumns = this.tableColumns.concat(column)
        }
      } else {
        this.tableColumns = subjectColumns
      }
      console.log('渲染体测/学科评价表格', this.tableColumns);
    },
    setVisionColumns() {
      this.tableColumns = []
      if (Number(this.schoolYear) < 2021) { // 2021年以前使用旧的视力数据
        this.tableColumns = columnsBase.slice(0)
        this.tableColumns.splice(5, 0, ...columnsOld)
      } else {
        this.tableColumns = columnsBase.slice(0)
        this.tableColumns.splice(5, 0, ...columnsNew)
      }
      if (this.isShowEdit) { // 国网数据上报需要动态添加编辑按钮
        let column = [{
          title: "操作",
          key: "action",
          align: "center",
          width: 100,
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    disabled: !params.row.studentId ? true : false
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      this.toVisionTestDetail(params.row);
                    },
                  },
                },
                "编辑"
              ),
            ]);
          }
        }]
        this.tableColumns = this.tableColumns.concat(column)
      }
      console.log('渲染视力表格：', this.tableColumns);
    },
    restore() {
      this.params = {
        grade: 'ALL',
        pageNo: 1,
        pageSize: 10,
        registerCode: '',
        studentClass: 'ALL',
        gender: 'ALL',
        studentName: '',
        studentStatus: 'ALL'
      }
      this.search();
    },
    searchInfo() {
      this.params.pageNo = 1;
      this.search();
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.params.pageNo != value) {
        this.params.pageNo = value;
        this.search();
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.params.pageSize != value) {
        this.params.pageSize = value;
        this.params.pageNo = 1;
        this.search();
      }
    },
    restore() {
      this.params = {
        grade: 'ALL',
        pageNo: 1,
        pageSize: 10,
        registerCode: '',
        studentClass: 'ALL',
        gender: 'ALL',
        studentName: '',
        studentStatus: 'ALL'
      }
      this.search();
    },
  }
}
</script>

<style>

</style>