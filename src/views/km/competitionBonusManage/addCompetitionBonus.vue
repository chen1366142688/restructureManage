<template>
  <div class="add_competition_bonus">
    <h2>添加学生竞赛加分</h2>
    <!-- 赛事信息 -->
    <Card style="margin-top:16px;">
      <div style="font-weight:bold;font-size:16px;">赛事信息</div>
      <div class="top-search">
        <div class="left-input">
          <div style="margin: 5px 20px">
            <span>赛事名称：</span>
            <Input v-model="competitionInfo.competitionName" style="width: 240px;" placeholder="请输入赛事名称" :maxlength="50" :disabled="auditStatus == 1 || auditStatus == 2"></Input>
          </div>
          <div style="margin: 5px 0 5px 20px">
            <span>比赛时间：</span>
            <DatePicker
              :disabled="auditStatus == 1 || auditStatus == 2"
              :value="[competitionInfo.competitionStartTime, competitionInfo.competitionEndTime]"
              type="daterange"
              placement="bottom-end"
              placeholder="请选择比赛时间"
              style="width: 240px;"
              @on-change="changeDate"
            ></DatePicker>
          </div>
          <div style="margin: 5px 20px">
            <span>赛事级别：</span>
            <Select v-model="competitionInfo.levelId" style="width: 240px" :disabled="auditStatus == 1 || auditStatus == 2">
              <Option
                v-for="item in levels"
                :value="item.levelId"
                :key="item.levelId"
                placeholder="请选择赛事级别"
                >{{ item.levelName }}</Option
              >
            </Select>
          </div>
          <div style="margin: 5px 20px">
            <span>比赛地点：</span>
            <Input v-model="competitionInfo.competitionAddress" style="width: 240px" placeholder="请输入比赛地点" :maxlength="50" :disabled="auditStatus == 1 || auditStatus == 2"></Input>
          </div>
          
        </div>
        <div class="right-btns">
          <Button type="success" @click="saveMatchInfo" :disabled="auditStatus == 1 || auditStatus == 2">保存</Button>
          <Button type="success" @click="goBack">返回</Button>
        </div>
      </div>
    </Card>
    <!-- 参赛学生 -->
    <Card style="margin-top:16px;" v-if="competitionId">
      <div style="font-weight:bold;font-size:16px;">参赛学生</div>
      <!-- 搜索学生 -->
       <div class="top-search">
        <div class="left-input">
          <div style="margin: 5px 20px">
            <span>年&emsp;&emsp;级：</span>
            <Select style="width: 120px" v-model="params.grade">
              <Option
                v-for="item in gradeList"
                :value="item.grade"
                :key="item.grade"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div style="margin: 5px 20px">
            <span>班&emsp;&emsp;级：</span>
            <Select style="width: 120px" v-model="params.studentClass">
              <Option
                v-for="item in classList"
                :value="item.value"
                :key="item.value"
                >{{ item.label }}</Option
              >
            </Select>
          </div>
          <div style="margin:5px 20px;">
            <span>学生姓名：</span>
            <Input  style="width:120px;" placeholder="请输入学生姓名" v-model="params.studentName"></Input>
          </div>
          <div style="margin: 5px 20px">
            <span>项目类型：</span>
            <Select style="width: 120px" v-model="params.itemTypeId" @on-change="changeItemType">
              <Option
                v-for="item in itemTypes"
                :value="item.itemId"
                :key="item.itemId"
                >{{ item.itemName }}</Option
              >
            </Select>
          </div>
          <div style="margin: 5px 20px">
            <span>比赛项目：</span>
            <Select style="width: 120px" v-model="params.itemId">
              <Option
                v-for="item in itemList"
                :value="item.itemId"
                :key="item.itemId"
                >{{ item.itemName }}</Option
              >
            </Select>
          </div>
        </div>
        <div class="right-btns">
          <Button type="success" @click="querySearch">查询</Button>
          <!-- 已通过审核时禁用该按钮 -->
          <!-- 个人赛并且已经有参赛学生时禁用该按钮 -->
          <Button type="success" @click="addStudent" :disabled="auditStatus == 1 || auditStatus == 2 || (actionType == 2 && itemProperty == 1 && studentList.length > 0)">添加参赛学生</Button>
        </div>
      </div>
      
      <!-- 学生列表 -->
      <Table border :data="studentList" :columns="studentColumn" style="margin-top:10px;"/>
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
    <!-- 审核记录 -->
    <Card style="margin-top:16px;" v-if="auditList.length > 0">
      <div style="font-weight:bold;font-size:16px;">审核记录</div>
      <Table border :data="auditList" :columns="auditColumns" style="margin-top:10px;"></Table>
    </Card>
    <Modal
      v-model="previewImg"
      title="成绩凭证"
      width="1372"
    >
      <div class="preview_list">
        <img style="" :src="item" v-for="(item, index) in previewImgList" :key="index"/>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="success" @click="previewImg = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Mixins from './mixins.js'
import api from '../../../api/contestBonus'
export default {
  mixins: [ Mixins ],
  data () {
    return {
      actionType: '', // 1：新增  2：详情/编辑
      previewImg: false,
      previewImgList: [], // 图片预览数据
      studentList: [
      ],
      total: 0,
      auditList: [
      ],
      itemTypes: [], // 项目类型
      itemList: [
        {itemName: '全部', itemId: '9999'}
      ], // 比赛项目
      competitionId: 0, // 赛事Id
      competitionInfo: {
      },
      auditStatus: '', // 赛事审核状态
      pageNo: 1,
      pageSize: 10,
      params: {
        itemTypeId: '9999',
        itemId: '9999',
        grade: '9999',
        studentClass: '9999',
        studentName: ''
      },
      itemProperty: '',
      routeParams: {}, // 路由参数
    }
  },
  computed: {
    levels () {
      return this.$store.state.cometitionLevel
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'addStudentKM') {
      sessionStorage.setItem('addCompetition-routeParams', JSON.stringify(this.routeParams))
      next()
    } else { // 跳转到其他页面是清空缓存
      sessionStorage.removeItem('addCompetition-routeParams')
      next()
    }
  },
  created () {
    this.getItemTypes() // 获取赛事项目类型
  },
  mounted () {
    /**
     * 路由参数：
     * 逻辑：
     *  1.从详情进入时获取路由参数，并保存到data中的routeParams中；
     *  2.添加竞赛加分学生时需要缓存当前页面的路由参数routeParams,返回该页面时需要重新从缓存获取routeParams；
     * @competitionId 赛事id(详情过来都传该参数)
     * @actionType 操作类型： 1 新增 2 编辑/详情
     * @studentName 个人赛按学生查询详情进来时，需要传入学生姓名来查询该学生
     * @itemProperty 赛事类型  1 个人赛 2 团队赛
     */
    let pageData = null
    let routeParams = JSON.parse(sessionStorage.getItem('addCompetition-routeParams'))
    if (routeParams) {
      pageData = routeParams
      this.routeParams = routeParams
    } else {
      pageData = this.$route.params
      this.routeParams = this.$route.params
    }

    const { actionType, itemProperty, studentName, competitionId, itemId, itemTypeId } = pageData
    this.actionType = actionType // 操作类型
    this.itemProperty = itemProperty // 赛事类型
    this.competitionId = competitionId

    this.params.studentName = itemProperty == 1 ? studentName : '' // 个人赛详情时需要带入学生姓名查询
    // this.params.itemId = itemId ? itemId : '9999'
    // this.params.itemTypeId =  itemTypeId ? itemTypeId : '9999'

    if (this.competitionId) {
      this.getCompetitionInfo(this.competitionId) // 获取赛事详情
      this.search() // 查询竞赛加分学生
      this.getCompetitionAudits() // 查询赛事审核记录
    }
  },
  methods: {
    querySearch () {
      this.pageNo = 1
      this.search()
    },
    // 删除参赛学生
    async deleteItemStudent ({itemId, scoreId}) {
      const params = {
        competitionId: this.competitionId,
        itemId,
        schoolId: sessionStorage.getItem('schoolId'),
        scoreId
      }
      const res = await api.deleteItemStudent(params)
      if (res.data.code === 10000) {
        this.querySearch()
      }
    },
    // 获取赛事凭证
    async getCompetitionPoves (params) {
      const res = await api.getCompetitionPoves(params)
      if (res.data.code === 10000) {
        this.previewImgList = res.data.response
        this.previewImg = true
      }
    },
    // 查询赛事审核记录
    async getCompetitionAudits () {
      const res = await api.getCompetitionAudits(this.competitionId)
      if (res.data.code === 10000) {
        this.auditList = res.data.response
      }
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNo != value) {
        this.pageNo = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNo = 1;
        this.search()
      }
    },
    // 选择赛事时间
    changeDate (date) {
      let [competitionStartTime, competitionEndTime ] = date
      this.competitionInfo.competitionStartTime = competitionStartTime
      this.competitionInfo.competitionEndTime  = competitionEndTime 
    },
    // 根据赛事id查询赛事详情
    async getCompetitionInfo (id) {
      const res = await api.getCompetitionInfo(id)
      if (res.data.code === 10000) {
        this.competitionInfo = res.data.response
        this.auditStatus = this.competitionInfo.auditStatus
      }

    },
    // 获取项目
    async getItemList (value) {
      let parentId = value === '9999' ? '' : value
      let res = await api.getItemConfig(parentId)
      if (res.data.code === 10000) {
        this.itemList = [{itemName: '全部', itemId: '9999'}].concat(res.data.response)
        this.params.itemId = '9999'
      }
    },
    // 选择项目类型
    changeItemType (value) {
      this.getItemList(value)
    },
    // 获取赛事项目类型
    async getItemTypes () {
      let res = await api.getItemTypes()
      if (res.data.code === 10000) {
        let result = res.data.response
        this.itemTypes = [{itemName: '全部', itemId: '9999'}].concat(result)
        this.getItemList(this.params.itemTypeId)
      }
    },
    // 查询参赛学生
    async search () {
      let {itemId, studentName, grade, studentClass, itemTypeId} = this.params
      const params = {
        competitionId: this.competitionId,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        itemTypeId: itemTypeId === '9999' ? '' : itemTypeId,
        itemId: itemId === '9999' ? '' : itemId,
        grade: grade === '9999' ? '' : grade,
        studentClass: studentClass === '9999' ? '' : studentClass,
        studentName: studentName ? studentName : ''
      }
      let res = await api.getParticipationPeoples(params)
      if (res.data.code === 10000) {
        this.studentList = res.data.response.list
        this.total = res.data.response.totalCount
      }
    },
    // 添加参赛学生
    addStudent () {
      const params = {
        actionType: '1', // 1 新增  2 编辑
        levelId: this.competitionInfo.levelId, // 赛事等级
        competitionId: this.competitionId // 赛事id
      }
      this.$router.push({name: 'addStudentKM', params: params})
    },
    goBack () {
      this.$router.go(-1)
    },
    // 保存赛事信息
    async saveMatchInfo () {
      const { competitionName, levelId, competitionStartTime, competitionEndTime, competitionAddress } = this.competitionInfo
      if (!competitionName) {
        this.$Message.error('请输入赛事名称！')
        return false
      }
      if (!levelId) {
        this.$Message.error('请选择赛事级别！')
        return false
      }
      if (!competitionStartTime || !competitionEndTime) {
        this.$Message.error('请选择比赛时间！')
        return false
      }
      if (!competitionAddress) {
        this.$Message.error('请填写比赛地点！')
        return false
      }
      const params = {
        schoolId: this.schoolId,
        schoolYear: this.schoolYear,
        competitionName: competitionName,
        competitionId: this.competitionId,
        levelId: levelId, // 赛事级别
        competitionStartTime: competitionStartTime,
        competitionEndTime : competitionEndTime,
        competitionAddress: competitionAddress
      }
      let res = await api.saveCompetition(params)
      if (res.data.code === 10000) {
        this.competitionId = res.data.response.competitionId
        this.routeParams.competitionId = res.data.response.competitionId // 保存赛事id

        if (this.actionType == 1) {
          this.$Message.success('保存成功！')
        } else {
          this.$Message.success('修改成功！')
        }
        this.search()
      }
    }
  }
}
</script>

<style lang="less">
.preview_list{
  width: 100%;
  height: 640px;
  overflow-y:scroll;
  display:flex;
  flex-direction: column;
  align-items: center;
  img{
    margin:5px;
    height:auto;
    width: auto;
    max-width: 1100px;
  }
}
.ivu-date-picker>.ivu-select-dropdown{
  // left: '' !important;
}
</style>