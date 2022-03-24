<template>
  <div class="add_student">
    <h2>添加参赛学生</h2>

    <!-- 项目类型 -->
    <Card style="margin-top:16px;">
      <div class="flex-c">
        <div>
          <span>项目类型：</span>
          <Select v-model="itemTypeId" style="width: 120px" :value="itemTypeName" :disabled="actionType === '2' || groupList.length > 0 || isDisabled" @on-change="changeItemType">
            <Option
              v-for="item in itemTypes"
              :value="item.itemId"
              :key="item.itemId"
              placeholder="请选择项目类型"
              >{{ item.itemName }}</Option
            >
          </Select>
        </div>
        <div style="margin-left:80px;">
          <span>参赛项目：</span>
          <Select v-model="itemId" style="width: 120px" :value="itemName" :disabled="actionType === '2' || groupList.length > 0 || isDisabled" @on-change="changeItems" @on-select="selectItems">
            <Option
              v-for="item in itemList"
              :value="item.itemId"
              :key="item.itemId"
              placeholder="请选择参赛项目"
              >{{ item.itemName }}</Option
            >
          </Select>
        </div>
        <div style="margin-left:80px;">
          <span>项目比赛性质：</span>
          <!-- 根据itemProperty动态显示个人赛还是团体赛 -->
          <Input disabled :value="itemProperty == 1 ? '个人赛' : itemProperty == 2 ? '团体赛' : ''" style="width:120px;" disabled></Input>
        </div>
      </div>
    </Card>

    <!-- 项目成绩凭证 -->
    <Card style="margin-top:16px;">
      <div style="display:flex;">
        <span style="width:110px;">项目成绩凭证：</span>
        <div class="file_urls">
          <div>
            <div class="demo-upload-list" v-for="(item, index) in itemFileUrls" :key="index">
              <img :src="item">
              <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(index)" v-if="!isDisabled"></Icon>
              </div>
            </div>
          </div>
          <Upload
            ref="upload"
            :show-upload-list="false"
            :on-success="uploadProjectResultImg"
            :format="['jpg','jpeg','png']"
            :max-size="80048"
            :action="updateUrl"
            name="muFiles"
            style="display: inline-block;"
          >
            <Button type="success" size="small"  :disabled="isDisabled">点击上传</Button>
          </Upload>
        </div>
      </div>
      <div style="color:#F87D00;font-size:12px;margin-top:6px;margin-left:108px;">可选择上传个人成绩凭证或项目成绩凭证。</div>
    </Card>

    <!-- （学生/团队）列表 -->
    <div v-for="(item, index) in groupList" :key="index">
      <!-- 团队 -->
      <Card style="margin:10px 0;" v-if="itemProperty == 2">
        <div class="flex-c">
          <div class="line"></div>
          <div class="line_title">团队{{index+1}}</div>
          <!-- 删除团队（仅团队赛显示） -->
          <Button type="success" size="small" v-if="groupList.length > 0 && actionType == 1" @click="removeGroup(index)">删除团队</Button>
        </div>
        <!-- 比赛成绩、比赛名次、竞赛加分 -->
        <div class="flex-c" style="margin-top:16px;border-bottom:1px solid #eee;padding-bottom:10px;">
          <div class="flex-c">
            <span><span style="visibility:hidden">空空</span>比赛成绩：</span>
            <Input style="width:180px;" v-model="item.score" :disabled="isDisabled"></Input>
          </div>
          <div class="flex-c" style="margin-left:60px;">
            <span>比赛名次：</span>
            <Select v-model="item.addScoreId" style="width: 120px" @on-change="($event) => {getAddScore(item, $event)}" :disabled="isDisabled">
              <Option
                v-for="item in levelAddScroes"
                :value="item.id"
                :key="item.id"
                placeholder="请选择参赛项目"
                >{{ item.levelRank }}</Option
              >
            </Select>
          </div>
          <div class="flex-c" style="margin-left:72px;">
            <span>竞赛加分：</span>
            <Input style="width:180px;" disabled :value="item.addScore"></Input>
          </div>
          <div class="flex-c" style="margin-left:72px;">
            <!-- 仅团队赛显示该按钮 -->
            <Button type="success" size="small" style="margin:10px;" @click="addGroupStudent(index)" :disabled="isDisabled">添加团队成员</Button>
          </div>
        </div>
        <!-- 学生集合 -->
        <div :class="['studentBox',{borB:item.teamStudents.length>0}]">
          <!-- 单个学生 -->
          <div 
            :class="[
              'studentData',
              {paddL16:(indexa+1)%2 === 0},
              {borL:(indexa+1)%2 === 0},
              {noBorB: item.teamStudents.length<3 || (indexa>=2&&item.teamStudents.length-indexa === 1) || (indexa>=2&&(indexa+1)%2!==0&&item.teamStudents.length-indexa === 2)}]" 
            v-if="item.teamStudents.length > 0" 
            v-for="(val, indexa) in item.teamStudents" 
            :key="indexa">
            <div class="flex-c" style="margin-top:20px">
              <span><span style="visibility:hidden">空空</span>参赛学生：</span>
              <div class="student_item">
                <div style="font-size:12px;">{{val.studentName}}</div>
                <!-- 删除团队成员（仅团队赛显示该按钮） -->
                <Icon type="ios-trash-outline" v-if="!isDisabled" @click="removeGroupStudent(item, indexa)"/>
              </div>
            </div>
            <div class="flex-c" style="align-items:flex-start;margin-top:20px">
              <span>个人成绩凭证：</span>
              <div style="flex:1">
                <div class="file_urls">
                  <!-- 团队赛显示 -->
                  <template>
                    <div class="demo-upload-list" v-for="(img, imgIndex) in val.fileUrls" :key="imgIndex">
                      <img :src="img">
                      <div class="demo-upload-list-cover">
                        <Icon type="ios-eye-outline" @click.native="handleView(img)"></Icon>
                        <Icon type="ios-trash-outline" @click.native="removeSoloFileImg('1', index, imgIndex, indexa)" v-if="!isDisabled"></Icon>
                      </div>
                    </div>
                  </template>
                  <Upload
                    v-if="val.fileUrls.length <2"
                    ref="upload"
                    :show-upload-list="false"
                    :on-success="($event) => {uploadStudentResultImg(index, $event,indexa)}"
                    :format="['jpg','jpeg','png']"
                    :max-size="80048"
                    :action="updateUrl"
                    name="muFiles"
                    style="display: inline-block;width:240px;"
                  >
                    <Button type="success" size="small" style="margin-left:10px;" :disabled="isDisabled">点击上传</Button>
                  </Upload>
                </div>
                <div style="color:#F87D00;font-size:12px;margin-top:6px;margin-left:10px;">可选择上传个人成绩凭证或项目成绩凭证。</div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <!-- 个人 -->
      <Card style="margin:10px 0;" v-else>
        <div class="flex-c">
          <span style="width:76px;">参赛学生：</span>
          <!-- 参赛学生（个人） -->
          <div style="margin-left:10px;">{{item.studentName}}</div>
          <!-- 仅个人赛才新增显示该按钮 -->
          <Button type="success" size="small" style="margin:0 10px 0 10px;" @click="deleteStudent(index)" v-if="actionType == 1">删除学生</Button>
          <!-- 仅个人赛编辑显示该按钮） -->
          <Button type="success" size="small" style="margin-left:10px;" v-if="actionType == 2" @click="changeStudent" :disabled="isDisabled">更换学生</Button>
        </div>

        <!-- 比赛成绩、比赛名次、竞赛加分 -->
        <div class="flex-c" style="margin-top:16px;">
          <div class="flex-c">
            <span>比赛成绩：</span>
            <Input style="width:180px;margin-left:10px;" v-model="item.score" :disabled="isDisabled"></Input>
          </div>
          <div class="flex-c" style="margin-left:60px;">
            <span>比赛名次：</span>
            <Select v-model="item.addScoreId" style="width: 120px" @on-change="($event) => {getAddScore(item, $event)}" :disabled="isDisabled">
              <Option
                v-for="item in levelAddScroes"
                :value="item.id"
                :key="item.id"
                placeholder="请选择参赛项目"
                >{{ item.levelRank }}</Option
              >
            </Select>
          </div>
          <div class="flex-c" style="margin-left:72px;">
            <span>竞赛加分：</span>
            <Input style="width:180px;" disabled :value="item.addScore"></Input>
          </div>
        </div>

        <!-- （学生）成绩凭证上传 -->
        <div style="display:flex;margin-top:16px;">
          <span style="width:76px;">成绩凭证：</span>
          <div>
            <div class="file_urls">
              <!-- 个人赛显示 -->
              <template>
                <div class="demo-upload-list" v-for="(img, imgIndex) in item.fileUrls" :key="imgIndex">
                  <img :src="img">
                  <div class="demo-upload-list-cover">
                    <Icon type="ios-eye-outline" @click.native="handleView(img)"></Icon>
                    <Icon type="ios-trash-outline" @click.native="removeSoloFileImg('2', index, imgIndex)" v-if="!isDisabled"></Icon>
                  </div>
                </div>
              </template>
              <Upload
                ref="upload"
                :show-upload-list="false"
                :on-success="($event) => {uploadStudentResultImg(index, $event)}"
                :format="['jpg','jpeg','png']"
                :max-size="80048"
                :action="updateUrl"
                name="muFiles"
                style="display: inline-block;width:240px;"
              >
                <Button type="success" size="small" style="margin-left:10px;" :disabled="isDisabled">点击上传</Button>
              </Upload>
            </div>
            <div style="color:#F87D00;font-size:12px;margin-top:6px;margin-left:10px;">可选择上传个人成绩凭证或项目成绩凭证。</div>
          </div>
        </div>
      </Card>
    </div>

    <!-- 添加团队 -->
    <div style="width:100%;text-align:center;margin-top:16px;" class="footer_content">
      <Button type="success" @click="addStudent" :disabled="!itemId" v-if="itemProperty == 1 && actionType == 1">添加学生</Button>
      <Button type="success" @click="addGroup" :disabled="!itemId" v-if="itemProperty == 2 && actionType == 1">添加团队</Button>
      <Button type="success" @click="submit">保存</Button>
      <Button type="success" @click="cancel">取消</Button>
    </div>

    <!-- 图片预览 -->
    <Modal title="预览" v-model="previewImgModal">
      <img :src="previewUrl" style="width:100%">
    </Modal>
    <!-- 添加学生 -->
    <Modal title="添加学生" v-model="addStudentModal" width="1200" footer-hide :mask-closable="false">
      <!-- 顶部查询 -->
      <div class="flex-c">
        <span>学生姓名：</span>
        <Input style="width:140px;" size="small" v-model="condition.studentName"></Input>
        <span style="margin-left:50px;">学籍号：</span>
        <Input style="width:140px;" size="small" v-model="condition.registerCode"></Input>
        <span style="margin-left:50px;">年级：</span>
        <Select style="width: 120px" size="small" v-model="condition.gradeId">
          <Option
            v-for="(item, index) in gradeList"
            :value="item.grade"
            :key="index"
            >{{ item.label }}</Option
          >
        </Select>
        <span style="margin-left:50px;">班级：</span>
        <Select style="width: 120px" size="small" v-model="condition.classId">
          <Option
            v-for="(item, index) in classList"
            :value="item.value"
            :key="index"
            >{{ item.label }}</Option
          >
        </Select>
        <Button type="success" style="margin-left:88px;" @click="getAllStudents">查询</Button>
      </div>
      <!-- 学生列表 -->
      <Table border style="margin-top:16px;" :columns="simpleStudentColumns" :data="allStudentList" height="500"></Table>
    </Modal>

    <!-- 新增参赛项目 -->
    <Modal title="参赛项目" v-model="addItemModal" :width="400" @on-ok="addCompetitionItem" @on-cancel="clearNewItemInfo()" :mask-closable="false">
      <div>
        <span style="width:84px;display:inline-block;">项目名称：</span>
        <Input type="text" style="width:70%;" v-model="newItemName"></Input>
      </div>
      <div style="margin-top:20px;">
        <span>项目比赛性质：</span>
        <Select v-model="newItemProperty" style="width: 70%">
          <Option value="1">个人赛</Option>
          <Option value="2">团体赛</Option>
        </Select>
      </div>
    </Modal>
  </div>
</template>

<script>
  import Mixins from './mixins.js';
  import api from '@/api/contestBonus.js';
  export default {
    mixins: [ Mixins ],
    data () {
      return {
        itemProperty: '', // 比赛性质  1：个人赛  2：团体赛
        actionType: '', // 页面操作类型 1：新增  2：编辑
        isChangeStudent: false, // 是否是更换学生
        levelId: '',
        groupIndex: '', // 当前点击的团队
        competitionId: '', // 赛事id
        auditStatus: '', // 审核状态 0:待提交审核，1：审核通过，2待审核，3：审核不通过
        teamId: 0,
        updateUrl: '', // 图片上传地址
        previewImgModal: false,
        previewUrl: '', // 图片预览，链接
        itemTypeId: '', // 比赛项目类型id
        itemId: '', // 比赛项目id
        itemTypes: [], // 项目类型
        itemTypeName: '',
        itemName: '',
        itemList: [], // 比赛项目
        itemFileUrls: [], // 项目成绩凭证
        teamFileUrls: [], // 单人赛/团队赛证书
        groupList: [], // 参赛团队
        levelAddScroes: [],
        addStudentModal: false, // 添加学生Modal
        allStudentList: [], // 所有学生列表（添加学生弹出框表格数据）
        condition: { // 查询学生数据
          studentName: '',
          registerCode: '',
          gradeId: '9999',
          classId: '9999'
        },
        scoreId: '',
        addItemModal: false, // 新增参赛项目Modal
        newItemName: '', // 新增参赛项目名称
        newItemProperty: '1' // 新增参赛项目类型 1：个人  2：团队
      }
    },
    computed: {
      // 审核状态为待审核、审核通过时禁用所有操作
      isDisabled () {
        let flag = this.auditStatus == 1 || this.auditStatus == 2 ? true : false
        return flag
      }
    },
    mounted () {
      let { actionType, levelId, competitionId, auditStatus } = this.$route.params
      this.actionType = actionType // 1 新增  2 编辑/查看详情
      this.levelId = levelId // 赛事等级id
      this.competitionId = competitionId // 赛事id
      this.auditStatus = auditStatus // 赛事审核状态
      this.updateUrl = this.$axios.defaults.baseURL + '/v1/file/upload?type=manage_img'
      if (actionType == 2) { // 编辑
        let routeData = this.$route.params
        this.itemProperty = routeData.itemProperty
        this.scoreId = routeData.scoreId
        if (this.itemProperty == 1) {
          this.getPersonalCompetitionDetail(routeData) // 获取个人赛详情
        } else {
          this.getTeamDetail(routeData) // 获取团队赛详情
        }
      }
      this.getLevelAddScore() // 获取比赛等级、竞赛加分
      this.getAllStudents() // 获取新增赛事学生列表（用于Modal里面数据）
      this.getItemTypes() // 获取赛事配置
    },
    methods: {
      /** 清除新增参赛项目数据 */
      clearNewItemInfo() {
        this.newItemName = ''
        this.newItemProperty = ''
      },
      /** 新增参赛项目 */
      async addCompetitionItem() {
        const params = {
          itemName: this.newItemName,
          itemProperty: this.newItemProperty,
          parentId: this.itemTypeId,
          schoolId: sessionStorage.getItem('schoolId')
        }
        const res = await api.addCompetitionItem(params)
        if(res.data.code === 10000) {
          this.$Message.success('新增成功')
          this.getItemList(this.itemTypeId) // 重新查询参赛项目
          this.clearNewItemInfo() // 数据清理
        }
      },
      changeStudent () {
        this.isChangeStudent = true
        this.addStudentModal = true
      },
      // 获取团队赛详情
      async getTeamDetail (data) {
        const {competitionId, itemId, teamId} = data
        const params = {
          competitionId,
          itemId,
          teamId
        }
        const res = await api.getTeamDetail(params)
        if (res.data.code === 10000) {
          let result = res.data.response
          console.log('获取团队赛详情', res.data.response)
          this.itemTypeName = result.itemTypeName
          this.itemId = result.itemId // 项目id
          this.itemFileUrls = result.itemFileUrls // 团队成绩凭证
          this.itemTypeId = result.itemTypeId // 项目类型id
          this.teamId = result.teamId
          this.getItemList(this.itemTypeId) // 查询项目

          this.groupList.push({
            addScore: result.addScore,
            score: result.score,
            addScoreId: result.addScoreId,
            rank: result.rank,
            teamStudents: result.teamStudents
          })
          this.groupList[0].teamFileUrls = result.teamFileUrls
        }
      },
      // 获取个人赛详情
      async getPersonalCompetitionDetail (data) {
        const {competitionId, itemId, scoreId} = data
        const params = {
          competitionId,
          itemId,
          scoreId
        }
        const res = await api.getPersonalDetail(params)
        if (res.data.code === 10000) {
          let result = res.data.response
          console.log('获取个人赛详情', res.data.response)
          this.itemTypeName = result.itemTypeName
          this.itemId = result.itemId // 项目id
          this.itemFileUrls = result.itemFileUrls // 团队成绩凭证
          this.itemTypeId = result.itemTypeId // 项目类型id
          this.getItemList(this.itemTypeId) // 查询项目
          this.groupList.push(result.competitionScoreVO)
        }
      },
      // 个人赛保存
      async savePersonalCompetition () {
        let { groupList } = this
        let students = []
        groupList.forEach(item => {
          students.push({
            studentName: item.studentName,
            studentId: item.studentId,
            addScore: item.addScore, // 竞赛加分
            score: item.score, // 分数
            rank: item.rank,
            addScoreId: item.addScoreId,
            scoreId: item.scoreId, // 分数id
            fileUrls: item.fileUrls,
          })
        })
        
        if (students.length <= 0) {
          this.$Message.error('请选择参赛学生！')
          return false
        }
        for (let i = 0; i < students.length; i++) {
          let item = students[i]
          // if (!item.score) {
          //   this.$Message.error('请填写学生完整的比赛信息！')
          //   return false
          // }
          if (!item.addScoreId) {
            this.$Message.error('请填写学生完整的比赛信息！')
            return false
          }
          if (this.itemFileUrls.length <= 0 && item.fileUrls.length <= 0) {
            this.$Message.error(`请上传${item.studentName}的成绩凭证`)
            return false
          }
        }
        const params = {
          competitionId: Number(this.competitionId), // 赛事id
          itemId: this.itemId,
          schoolId: Number(sessionStorage.getItem('schoolId')),
          schoolYear: Number(sessionStorage.getItem('schoolYear')),
          itemFileUrls: this.itemFileUrls, // 项目证书
          students: students,
        }
        let res = await api.saveAlonCompetition(params)
        if (res.data.code === 10000) {
          this.$router.go(-1)
          this.$Message.success('保存成功')
        } else if (res.data.code === 60002) {
          this.$Message.error(res.data.msg)
          return false
        }
      },
      // 保存团队赛
      async saveTeamCompetition () {
        let { groupList } = this
        console.log('提交保存：',groupList)
        let teamStudents = []
        // 必填项验证
        if (groupList.length <= 0) {
          this.$Message.error('请添加参赛团队！')
          return false
        } else {
          for (let i = 0; i < groupList.length; i++) {
            let item = groupList[i]
            if (item.teamStudents.length <= 0) {
              this.$Message.error('请添加团队成员！')
              return false
            }
            if (!item.addScoreId) {
              this.$Message.error('请填写团队完整的比赛信息！')
              return false
            }
            for(let j = 0; j < item.teamStudents.length; j++){
              let studentItem = item.teamStudents[j]
              if(studentItem.fileUrls  <= 0){
                this.$Message.error(`请上传${item.teamStudents[0].studentName}${item.teamStudents.length>1?'等':''}学生的成绩凭证`)
                return false
              }
            }
          }
        }
        groupList.forEach(item => {
          // item.studentIds = item.teamStudents.map(val => {
          //   return val.studentId
          // })
          let studentInfos = item.teamStudents.map(val => {
            let json = {}
            json.fileUrls = val.fileUrls;
            json.studentId = val.studentId
            return json
          })
          teamStudents.push({
            addScore: item.addScore, // 竞赛加分
            addScoreId: item.addScoreId,
            rank: item.rank,
            score: item.score,
            studentInfos:studentInfos,
            teamFileUrls: item.teamFileUrls, // 团队赛项目凭证
            // studentIds: item.studentIds,
            teamId: this.teamId
          })
        })
        
        const params = {
          competitionId: Number(this.competitionId), // 赛事id
          itemFileUrls: this.itemFileUrls, // 项目证书
          itemId: this.itemId,
          schoolId: Number(sessionStorage.getItem('schoolId')),
          schoolYear: Number(sessionStorage.getItem('schoolYear')),
          teamStudents: teamStudents,
        }

        let res = await api.saveTeamCompetition(params)
        if (res.data.code === 10000) {
          this.$router.go(-1)
          this.$Message.success('保存成功')
        } else if (res.data.code === 60002) {
          this.$Message.error(res.data.msg)
          return false
        }
      },
      // 个人赛（添加学生）
      addStudent () {
        this.addStudentModal = true
      },
      // 删除团队
      removeGroup (index) {
        this.groupList.splice(index, 1)
      },
      // 删除团队赛成员
      removeGroupStudent (item, index) {
        item.teamStudents.splice(index, 1)
      },
      // 添加团队赛成员
      addGroupStudent (index) {
        this.groupIndex = index
        this.addStudentModal = true
      },
      selectItems(value) {
        if(value === 999) {
          console.log('新增参赛项目');
          this.addItemModal = true
        }
      },
      // 选择参赛项目
      changeItems (value) {
        let itemObj = this.itemList.find(item => {
          return item.itemId == value
        })
        this.itemProperty = itemObj.itemProperty
      },
      // 获取项目类型
      async getItemList (value) {
        let { actionType } = this.$route.params
        let res = await api.getItemConfig(value)
        if (res.data.code === 10000) {
          if (res.data.response.length > 0) {
            this.itemList = res.data.response.concat({itemId: 999, itemName: '新增项目'})
            if(actionType != 2){//新增
              this.itemId = res.data.response[0].itemId // 获取默认的项目
              this.itemProperty = res.data.response[0].itemProperty // 获取默认的比赛性质
            }//编辑不用重新赋值
          } else {
            this.itemId = ''
            this.itemProperty = ''
          }
        }
      },
      // 选择项目类型
      changeItemType (value) {
        if(value == 404) { // 选择其他时，不用请求数据
          this.itemList = [{itemId: 999, itemName: '新增项目'}]
        }
        this.getItemList(value)
      },
      // 获取赛事项目类型
      async getItemTypes () {
        let res = await api.getItemTypes()
        if (res.data.code === 10000) {
          let result = res.data.response
          this.itemTypes = result
          console.log('项目类型：', this.itemTypes)
        }
      },
      // 获取竞赛加分
      getAddScore (item, event) {
        let current = this.levelAddScroes.find(item => {
          return item.id == event
        })
        item.addScore = current.addScore
        item.rank = current.levelRank
      },
      // 获取比赛等级、竞赛加分
      async getLevelAddScore () {
        let res = await api.getLevelAddScore(this.levelId)
        if (res.data.code === 10000) {
          this.levelAddScroes = res.data.response || []
        }
      },
      deleteStudent (index) {
        this.groupList.splice(index, 1)
      },
      // 获取新增赛事学生列表（用于Modal里面数据）
      async getAllStudents () {
        const { studentName, registerCode, gradeId, classId } = this.condition
        const params = {
          studentName: studentName,
          registerCode: registerCode,
          grade: gradeId === '9999' ? '' : gradeId,
          studentClass: classId === '9999' ? '' : classId
        }
        let res = await api.getAllStudentList(params)
        if (res.data.code === 10000) {
          this.allStudentList = res.data.response.list || []
        }
      },
      // 添加团队
      addGroup () {
        // 构建团队数据结构
        this.groupList.push({
          teamStudents: [],
          score: '', // 比赛成绩
          addScoreId: '', // 竞赛加分id
          addScore: '', // 竞赛加分
          studentIds: [],
          rank: '',
          scoreId: 0,
          teamFileUrls:[]
        })
        console.log('1构建团队数据：',this.groupList)
      },
      // 移除学生成绩凭证
      removeSoloFileImg (type, studentIndex, imgIndex, indexa) {
        /**
         * @param type 1 团队赛  2 个人赛
         * @param studentIndex 当前学生所在团队index
         * @param imgIndex 当前学生的当前点击的成绩凭证index
         * @param indexa 当前点击的学生index
         */
        let groupList = this.groupList.slice(0)
        if (type === '1') {
          groupList[studentIndex].teamStudents[indexa].fileUrls.splice(imgIndex, 1)
        } else {
          groupList[studentIndex].fileUrls.splice(imgIndex, 1)
        }
        this.groupList = groupList
        console.log('删除当个图片后的数组this.groupList',this.groupList)
      },
      // 学生成绩凭证上传
      uploadStudentResultImg (index, res, indexa, file, fileList) {
        let img = res.response[0]
        let groupList = this.groupList.slice(0)
        if (this.itemProperty == 2) { // 团队赛
          groupList[index].teamStudents[indexa].fileUrls.push(img)
        } else { // 个人赛
          groupList[index].fileUrls.push(img)
        }
        this.groupList = groupList
      },
      // 图片预览
      handleView (item) {
        this.previewUrl = item
        this.previewImgModal = true
      },
      // 移除图片
      handleRemove (index) {
        this.itemFileUrls.splice(index, 1)
      },
      // 项目成绩图片上传
      uploadProjectResultImg(res, file, fileList){//上传图片
        this.itemFileUrls.push(res.response[0])
      },
      // 保存参赛学生
      submit () {
        if (!this.itemId) {
          this.$Message.error('请选择参赛项目！')
          return false
        }
        if (this.itemProperty == 2) { // 团队赛保存
          this.saveTeamCompetition()
        } else {
          this.savePersonalCompetition() // 个人赛保存
        }
      },
      cancel () {
        this.$router.go(-1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .oss_file{
    width:100%;
    height:100%;
    position: relative;
    margin-left:12px;
    input{
      position: absolute;
      left:0;
      top:0;
      opacity: 0;
      height:100%;
    }
  }
  .itemFileUrls{
    width:240px;height:135px;border-radius:5px;margin-right:10px;margin-bottom:10px;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list{
    width:240px;height:135px;border-radius:5px;
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
  .footer_content{
    button{
      margin:0 20px;
    }
  }
  .student_item{
    display:flex;
    justify-content: space-between;
    align-items: center;
    min-width:120px;
    border:1px solid #DCDEE2;
    height:30px;
    line-height:30px;
    border-radius: 4px;
    padding: 0 12px;
  }
  .file_urls{
    flex:1;
    display: flex;
    align-items: center;
    flex-wrap:wrap;
  }
  .line{
    width:4px;
    height: 18px;
    background:#00C693;
    border-radius:2px;
    margin-right:10px;
  }
  .line_title{
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    width: 100px;
  }
  .studentBox{
    display: flex;
    flex-wrap: wrap;
    box-sizing: border-box;
    .studentData{
      width: 50%;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      padding-bottom:20px;
    }
    .borL{border-left:1px solid #eee;}
    .noBorR{border-right:none}
    .noBorB{border-bottom:none}
    .paddL16{padding-left:16px}
    
  }
  .borB{border-bottom: 1px solid #eee;}
</style>