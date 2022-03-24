<template>
  <div>
    <Card>
      <div class="top-search">
        <div class="left-input">
          <div style="margin:5px 20px;">
            <span>年级：</span>
            <Select v-model="params.grade" style="width:120px;">
              <Option v-for="item in gradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>班&emsp;级：</span>
            <Select v-model="params.studentClass" style="width:120px;margin-left:14px;">
              <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>赛事级别：</span>
            <Select v-model="params.levelId" style="width:120px;">
              <Option v-for="item in levels" :value="item.levelId" :key="item.levelId">{{ item.levelName }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>待审核：</span>
            <Select v-model="params.auditStatus" style="width:120px;">
              <Option v-for="(item, index) in reviewStatus" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>姓名：</span>
            <Input v-model="params.studentName" style="width:120px;"></Input>
          </div>
          <div style="margin:5px 20px;">
            <span>学籍号：</span>
            <Input v-model="params.registerCode" style="width:120px;margin-left:14px;"></Input>
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="search">查询</Button>
          <Button type="success" @click="handleToAdd">添加学生竞赛加分</Button>
          <Button type="success" @click="exportData">导出EXCEL</Button>
        </div>
      </div>
    </Card>
    <Card style="margin-top:16px;">
      <Table :data="studentList" :columns="searchByStudentColumn" border></Table>
      <div style="text-align:right;margin-top:12px;">
        <Page 
          :total="total"
          :current="pageNo" :page-size="pageSize"
          @on-change='pageNumChange'
          @on-page-size-change='pageSizechange'
          show-total show-sizer>
        </Page>
      </div>
    </Card>
  </div>
  
</template>

<script>
import api from '@/api/contestBonus.js';
import mixins from '../mixins.js';
export default {
  mixins: [ mixins ],
  data () {
    return {
      isAdmin: sessionStorage.getItem('isAdmin'), // 是否是管理员  1：是  0：否
      pageNo: 1,
      pageSize: 10,
      params: {
        levelId: '9999', // 赛事级别
        auditStatus: '9999', // 赛事状态
        grade: '9999',
        studentClass: '9999',
        studentName: '',
        registerCode: ''
      },
      studentList: [
      ], // 赛事列表
      
      total: 0,
      showReviewModal: false, // 是否显示审核弹出框
      reviewType: '', // 选择的审核状态
      failureReason: '', // 未通过审核原因
    }
  },
  computed: {
    levels () {
      let cometitionLevel = [{levelId: '9999', levelName: '全部'}].concat(this.$store.state.cometitionLevel)
      return cometitionLevel
    }
  },
  created () {
    if (sessionStorage.getItem('competitionManage-searchStudent')) {
      let searchData = JSON.parse(sessionStorage.getItem('competitionManage-searchStudent'))
      this.params = searchData.params
      this.pageNo = searchData.pageNo
      this.pageSize = searchData.pageSize
    }
  },
  mounted () {
    this.getStudentCompetitionList() // 按学生查询
  },
  methods: {
    // 导出数据
    exportData () {
      const {auditStatus, levelId, studentName, grade, studentClass, registerCode} = this.params
      const params = {
        grade: grade === '9999' ? '' : grade,
        studentClass: studentClass === '9999' ? '' : studentClass,
        auditStatus: auditStatus === '9999' ? '' : auditStatus, // 审核状态
        studentName: studentName,
        registerCode,
        levelId: levelId === '9999' ? '' : levelId, // 级别id
        token: sessionStorage.getItem('token')
      }
      let url = api.createURL(`${this.$axios.defaults.baseURL}/v1/studentCompetition/studentCompetitionExport`, params)
      window.open(url);
    },
    handleToAdd () {
      const params = {
        actionType: '1'
      }
      this.$router.push({name: 'addCompetitionBonusKM', params: params})
    },
    search () {
      this.pageNo = 1
      this.getStudentCompetitionList()
    },
    // 按学生查询
    async getStudentCompetitionList () {
      const {auditStatus, levelId, studentName, grade, studentClass, registerCode} = this.params
      const params = {
        grade: grade === '9999' ? '' : grade,
        studentClass: studentClass === '9999' ? '' : studentClass,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        auditStatus: auditStatus === '9999' ? '' : auditStatus, // 审核状态
        studentName: studentName,
        registerCode,
        levelId: levelId === '9999' ? '' : levelId, // 级别id
      }
      let searchData = {
        params: this.params,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      sessionStorage.setItem('competitionManage-searchStudent', JSON.stringify(searchData))
      let res = await api.getStudentCompetitionList(params)
      console.log('按学生查询', res)
      if (res.data.code === 10000) {
        this.studentList = res.data.response.list || []
        this.total = res.data.response.totalCount
      }
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value
        this.getStudentCompetitionList()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNo = 1;
        this.getStudentCompetitionList()
      }
    },
  }
}
</script>

<style lang="less" scoped>

</style>