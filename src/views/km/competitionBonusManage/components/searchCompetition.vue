<template>
  <div>
    <Card>
      <div class="top-search">
        <div class="left-input">
          <div style="margin:5px 20px;">
            <span>赛事名称：</span>
            <Input v-model="params.competitionName" style="width:120px;"></Input>
          </div>
          <div style="margin:5px 20px;">
            <span>赛事级别：</span>
            <Select v-model="params.levelId" style="width:120px;">
              <Option v-for="item in levels" :value="item.levelId" :key="item.levelId">{{ item.levelName }}</Option>
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>待审核：</span>
            <Select v-model="params.status" style="width:120px;">
              <Option v-for="(item, index) in reviewStatus" :value="item.value" :key="index">{{ item.label }}</Option>
            </Select>
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="querySearch">查询</Button>
          <Button type="success" @click="handleToAdd">添加学生竞赛加分</Button>
          <Button type="success" @click="exportData">导出EXCEL</Button>
        </div>
      </div>
    </Card>
    <Card style="margin-top:16px;">
      <Table :data="competitionList" :columns="searchByMatchColumn" border></Table>
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

    <Modal
      v-model="auditModal"
      title="审核管理"
      :mask-closable="false"
    >
      <RadioGroup v-model="auditType" style="margin-left:70px;">
        <Radio label="1">
          <span>审核通过</span>
        </Radio>
        <Radio label="3">
          <span>审核不通过</span>
        </Radio>
      </RadioGroup>
      <div style="display:flex;margin-top:16px;" v-if="auditType === '3'">
        <span>未通过原因：</span>
         <Input v-model="remark" type="textarea" :rows="4" style="width:380px;" :maxlength="100"/>
      </div>
      <div slot="footer" class="footer">
        <Button type="text"  @click="handleCancelAudit">取消</Button> 
        <Button type="success"  @click="handleToAudit">确认</Button>
      </div>
    </Modal>

    <!-- 删除赛事 -->
    <Modal v-model="deleteCompetitionModal" title="提  醒" @on-ok="handleOkDeleteCompetition">
      <p style="font-size: 16px">删除赛事后，您添加的赛事和参赛学生信息将全部删除，是否确定删除？</p>
    </Modal>
  </div>
</template>

<script>
import api from '@/api/contestBonus.js';
import mixins from '../mixins'
import Util from "@/libs/util.js"
export default {
  mixins: [ mixins ],
  data () {
    return {
      isAdmin: sessionStorage.getItem('isAdmin'), // 是否是管理员  1：是  0：否
      pageNo: 1,
      pageSize: 10,
      params: {
        competitionName: '', // 赛事名称
        levelId: '9999', // 赛事级别
        status: '9999', // 赛事状态
        sourceType: '',
      },
      competitionList: [
      ], // 赛事列表
      total: 0,
      deleteCompetitionModal: false, // 删除赛事Modal
      deleteCompetitionId: '', // 删除赛事的id
      currentCompetitionId: '', // 当前需要审核的赛事id
      auditModal: false, // 是否显示审核弹出框
      auditType: '', // 选择的审核状态
      remark: '', // 未通过审核原因
      testList: []
    }
  },
  computed: {
    levels () {
      let cometitionLevel = [{levelId: '9999', levelName: '全部'}].concat(this.$store.state.cometitionLevel)
      return cometitionLevel
    }
  },
  created () {
    if (sessionStorage.getItem('competitionManage-searchCompetition')) {
      let searchData = JSON.parse(sessionStorage.getItem('competitionManage-searchCompetition'))
      this.params = searchData.params
      this.pageNo = searchData.pageNo
      this.pageSize = searchData.pageSize
    }
    this.testList.push({
      name: 'test',
      id: 1
    })
  },
  mounted () {
    this.getCompetitions() // 按赛事查询
  },
  methods: {
    // 确认删除赛事
    handleOkDeleteCompetition () {
      const data = {
        competitionId: this.deleteCompetitionId
      }
      this.deleteCompetition(data)
    },
    querySearch () {
      this.pageNo = 1
      this.getCompetitions()
    },
    handleCancelAudit () {
      this.auditModal = false
    },
    // 管理员审核
    async handleToAudit () {
      if (this.auditType == 2) {
        this.$Message.error('请选择审核状态！')
        return false
      }
      const params = {
        auditStatus: this.auditType,
        remark: this.remark,
        competitionId: this.currentCompetitionId
      }
      const res = await api.competitionAudit(params)
      if (res.data.code === 10000) {
        this.auditType = ''
        this.auditModal = false
        this.$Message.success('提交成功！')
        this.getCompetitions()
      }
    },
    // 撤回审核
    async revocationAudit (competitionId) {
      const res = await api.revocationAudit({competitionId: competitionId})
      if (res.data.code === 10000) {
        this.$Message.success('撤销成功！')
        this.getCompetitions()
      }
    },
    // 提交审核
    async submitAudit (competitionId) {
      const res = await api.submitAudit({competitionId: competitionId})
      if (res.data.code === 10000) {
        this.$Message.success('提交成功！')
        this.getCompetitions()
      }
    },
    // 删除赛事
    async deleteCompetition (data) {
      const res = await api.deleteCompetition(data)
      if (res.data.code === 10000) {
        this.deleteCompetitionModal = false
        this.deleteCompetitionId = ''
        this.$Message.success('删除成功！')
        this.querySearch()
      }
    },
    // 导出
    exportData () {
      const {status, levelId, competitionName} = this.params
      const params = {
        status: status === '9999' ? '' : status,
        levelId: levelId === '9999' ? '' : levelId,
        competitionName,
        token: sessionStorage.getItem('token'),
        // sourceType: this.isAdmin // 0:竞赛加分管理列表，1：竞赛加分审核列表
      }
      let url = api.createURL(`${this.$axios.defaults.baseURL}/v1/competitionAudit/competitionExport`, params)
      window.open(url);
    },
    // 按赛事查询
    async getCompetitions () {
      const {status, levelId, competitionName} = this.params
      const params = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        status: status === '9999' ? '' : status,
        levelId: levelId === '9999' ? '' : levelId,
        competitionName,
        sourceType: this.isAdmin // 0:竞赛加分管理列表，1：竞赛加分审核列表
      }
      let searchData = {
        params: this.params,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
      sessionStorage.setItem('competitionManage-searchCompetition', JSON.stringify(searchData))
      let res = await api.getCompetitions(params)
      if (res.data.code === 10000) {
        let list = res.data.response.list || []
        this.competitionList = list
        this.total = res.data.response.totalCount
        console.log('按赛事查询', res.data.response)
      }
    },
    // 添加学生竞赛加分
    handleToAdd () {
      const params = {
        actionType: '1'
      }
      this.$router.push({name: 'addCompetitionBonusKM', params: params})
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value
        this.getCompetitions()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNo = 1;
        this.getCompetitions()
      }
    },
  }
}
</script>

<style lang="less" scoped>

</style>