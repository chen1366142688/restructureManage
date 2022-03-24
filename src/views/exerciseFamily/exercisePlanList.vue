<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">锻炼计划管理</h2>
    </div>
        <div>
              <Card>
                <div class="top-search" @keydown.enter="classQuery(1)">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>适合性别：</span>
                            <Select v-model="sexId" style="width: 120px" placeholder="适合性别" clearable>
                                <Option v-for="item in sexList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>等<span style="visibility:hidden">班级</span>级：</span>
                            <Select v-model="levelId" style="width: 120px"  placeholder="等级" clearable>
                                <Option v-for="item in levelList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>类<span style="visibility:hidden">班级</span>型：</span>
                            <Select v-model="orientationId" style="width: 120px"  placeholder="类型" clearable>
                                <Option v-for="item in orientationList" :value="item.itemCode" :key="item.itemCode">{{ item.itemName }}</Option>
                            </Select>
                        </div>
                        <div style="margin:5px 20px;">
                            <span style="">计划名称：</span>
                            <Input v-model="planName" style="width: 120px"  placeholder="输入计划名称关键字"></Input>
                        </div>
                        <div style="margin:5px 20px;">
                            <span>审核状态：</span>
                            <Select v-model="auditStatus" style="width: 120px"   :clearable="false">
                                <Option v-for="item in auditStatusList" :value="item.value" :key="item.value">{{ item.name }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="right-btns">
                        <Button type="success" style="" @click="classQuery(1)">查询</Button>
                        <Button type="success"  @click="addPlan">新增锻炼计划</Button>
                    </div>
                </div>
              </Card>
            <br>
            <div>
            <Card>
              <div style="font-size:18px;height:40px;">
                  数据明细
              </div>
                <Row>
                    <div style="">
                        <Table border max-height="530" :columns="resultColumns" :data="resultData"></Table>
                    </div>
                    <br>
                    <div style="float: right;">
                        <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
                    </div>
                </Row>
                </Card>
            </div>
        </div>
        <Modal
              v-model="deleteModel"
              title="提  醒"
              @on-ok="deletePlan">
        <p style="color: red;font-size: 18px">是否确认删除该计划？</p>
      </Modal>
      <Modal v-model="auditModel" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <span>审核</span>
        </p>
        <div style="text-align:center">
            <RadioGroup v-model="newAuditStatus">
                <Radio label="1">审核通过</Radio>
                <Radio label="2" style="margin-left:20px;">审核不通过</Radio>
            </RadioGroup>
        </div>
        <div slot="footer">
            <Button type="success"    @click="cancle">取消</Button>
            <Button type="success"   :loading="modal_loading" @click="auditPlan">确定</Button>
        </div>
    </Modal>
    </div>
</template>

<script>
export default {
  name: 'exercisePlanList',
  data() {
    return {
      schoolId:'',
      deleteModel:false,
      auditModel:false,
      modal_loading:false,
      oldAuditStatus:'',
      newAuditStatus:'2',
      isAdmin:"",
      planId:'',
      sexList: [
        {
          itemCode: '1',
          itemName: '男'
        },
        {
          itemCode: '2',
          itemName: '女'
        }
      ],
      sexId: '',
      openStatusList: [
        {
          itemCode: '1',
          itemName: '开启'
        },
        {
          itemCode: '0',
          itemName: '关闭'
        }
      ],
      openStatus: '',
      defaultStatusList: [
        {
          itemCode: '1',
          itemName: '默认'
        },
        {
          itemCode: '0',
          itemName: '非默认'
        }
      ],
      defaultStatus: '',
      ageList: [
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16,
        17,
        18,
        19,
        20
      ],
      orientationList: [],
      orientationId: '',
      levelList: [],
      levelId: '',
      planName: '',
      ageStart: '',
      ageEnd: '',
      auditStatus:'999',
      auditStatusList:[
        {
          name:'全部',
          value:'999'
        },
        {
          name:'待平台审核',
          value:'0'
        },
         {
          name:'审核通过',
          value:'1'
        },
         {
          name:'审核不通过',
          value:'2'
        },
      ],
      resultColumns: [
        {
          title: '计划名称',
          key: 'planName',
          align: 'center',
          minWidth:100
        },
        {
          title: '类型',
          key: 'itemOrientationName',
          align: 'center',
          minWidth:100,
        },
        {
          title: '难度',
          key: 'itemLevelName',
          align: 'center',
          minWidth:100,
        },
        {
          title: '适合年龄段（岁）',
          key: 'ageScope',
          align: 'center',
          minWidth:100,
        },
        {
          title: '适合性别',
          key: 'sex',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', [h('span', params.row.sex == '1' ? '男' : '女')])
          }
        },
        {
          title: '训练时长(分钟)',
          key: 'planDuration',
          align: 'center',
          minWidth:100,
        },
        {
          title: '来源',
          key: 'sex',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', [h('span', (params.row.planSource == '2' && params.row.schoolId==this.schoolId) ? '学校配置':'平台推荐')])
          }
        },
        {
          title: '状态',
          key: 'sex',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', [h('span',(params.row.planSource == '1' || params.row.schoolId != this.schoolId) ? '--':params.row.auditStatus == '0' ? '待平台审核' :params.row.auditStatus == '1' ? '审核通过' :params.row.auditStatus == '2' ? '审核不通过' : '')])
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', 
           [
                h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    margin: '5px'
                  },
                  on: {
                    click: () => {
                      this.pageToExercisePlanDetail(params.row.planId,params.row.planSource,params.row.schoolId)
                    }
                  }
                },
                '编辑'
              ),
              h(
                'Button',
                {
                  props: {
                    type: 'success',
                    disabled:params.row.schoolId==this.schoolId?false:true
                  },
                  style: {
                    margin: '5px'
                  },
                  on: {
                    click: () => {
                      this.deleteStatusChange(params.row.planId)
                    }
                  }
                },
                '删除'
              )
            ])
          }
        }
      ],
      resultData: [],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    getOrientationList() {
      //获取类别信息
      this.$axios
        .get(
          '/v1/exercise/family/getExerciseConfigByItemType?itemType=plan_orientation'
        )
        .then(res => {
          this.orientationList = res.data.response
        })
    },
    getLevelList() {
      //获取类别信息
      this.$axios
        .get('/v1/exercise/family/getExerciseConfigByItemType?itemType=plan_level')
        .then(res => {
          this.levelList = res.data.response
        })
    },
    classQuery(QueryMethod) {
      //查询方法  QueryMethod 查询方式 1:查询按钮；0 翻页

      if (QueryMethod == 1) {
        //查询按钮查询页码设置为1
        this.pageNum = 1
      }
      let queryData = {
        planName: this.planName,
        sex: this.sexId,
        itemLevelCode: this.levelId,
        itemOrientationCode: this.orientationId,
        defaultPlan: "",
        openStatus: '1',
        ageStart: "",
        ageEnd: "",
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        auditStatus:this.auditStatus=='999'?'':this.auditStatus
      }
      this.$axios
        .post('/v1/exercise/family/getExercisePlanList', queryData)
        .then(res => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response.result
            if(this.resultData && this.resultData.length > 0){
                for(let i=0;i<this.resultData.length;i++){
                  this.resultData[i].isAdmin=this.isAdmin;
                  this.resultData[i].optionSchoolId = this.schoolId;
                }
            }
            this.pageNum = res.data.response.pageNum
            this.pageSize = res.data.response.pageSize
            this.total = res.data.response.total
          } else {
            this.$Message.info(res.data.msg)
          }
        })
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.classQuery(0)
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNum = 1;
        this.classQuery(1)
      }
    },
    
    pageToExercisePlanDetail(planId,source,schoolId) {
      //编辑
      let queryData = {
        planName: this.planName,
        sex: this.sexId,
        itemLevelCode: this.levelId,
        itemOrientationCode: this.orientationId,
        defaultPlan: this.defaultStatus,
        openStatus: this.openStatus,
        ageStart: this.ageStart,
        ageEnd: this.ageEnd,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        auditStatus:this.auditStatus
      }
      //缓存查询条件
      sessionStorage.setItem(
        'exercisePlanList-queryData',
        JSON.stringify(queryData)
      )

      sessionStorage.setItem(
        'exercisePlanList-exercisePlanDetail-planId',
        planId
      )
      sessionStorage.setItem(
        'exercisePlanList-exercisePlanDetail-schoolId',
        schoolId
      )
      if(source=='1'){
        this.$router.push({ name: 'exercisePlanDetail' })
      }else{
        this.$router.push({ name: 'exciseSchoolDetail' })
      }
      
    },
    addPlan(){
      let queryData = {
        planName: this.planName,
        sex: this.sexId,
        itemLevelCode: this.levelId,
        itemOrientationCode: this.orientationId,
        defaultPlan: this.defaultStatus,
        openStatus: this.openStatus,
        ageStart: this.ageStart,
        ageEnd: this.ageEnd,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        auditStatus:this.auditStatus
      }
      //缓存查询条件
      sessionStorage.setItem(
        'exercisePlanList-queryData',
        JSON.stringify(queryData)
      )
      sessionStorage.removeItem('exercisePlanList-exercisePlanDetail-planId')
       this.$router.push({ name: 'exciseSchoolDetail' })
    },
    pageToEditor(planId){
      let queryData = {
        planName: this.planName,
        sex: this.sexId,
        itemLevelCode: this.levelId,
        itemOrientationCode: this.orientationId,
        defaultPlan: this.defaultStatus,
        openStatus: this.openStatus,
        ageStart: this.ageStart,
        ageEnd: this.ageEnd,
        pageNo: this.pageNum,
        pageSize: this.pageSize,
        auditStatus:this.auditStatus
      }
      //缓存查询条件
      sessionStorage.setItem(
        'exercisePlanList-queryData',
        JSON.stringify(queryData)
      )

      sessionStorage.setItem(
        'exercisePlanList-exciseSchoolDetail-planId',
        planId
      )
        this.$router.push({ name: 'exciseSchoolDetail' })
    },
    deleteStatusChange(planId){
      this.planId=planId;
      this.deleteModel=true;
    },
    deletePlan(){
      this.$axios
        .get('/v1/exercise/family/deleteExcisePlan?planId='+this.planId)
        .then(res => {
          if (res.data.code == 10000) {
           this.$Message.info(res.data.msg)
           this.classQuery(0)
          } else {
            this.$Message.info(res.data.msg)
          }
        })
    },
    auditPlanChange(planId,status){
      var vm=this;
      vm.planId=planId;
      vm.oldAuditStatus=status;
      vm.auditModel=true;
    },
    cancle(){
      this.auditModel=false;
    },
    auditPlan(){
      if(this.oldAuditStatus==this.newAuditStatus){
        this.$Message.info("成功")
        this.auditModel=false;
        return;
      }
      // this.newAuditStatus=this.oldAuditStatus=='1' || this.oldAuditStatus=='0'?'2':'1'
      this.modal_loading=true;
      this.$axios
        .get('/v1/exercise/family/auditExcisePlan?planId='+this.planId+'&status='+this.newAuditStatus)
        .then(res => {
          this.modal_loading=false;
          this.auditModel=false;
          if (res.data.code == 10000) {
           this.$Message.info(res.data.msg)
           this.classQuery(0)
          } else {
            this.$Message.info(res.data.msg)
          }
        })
    }
    
  },
  watch: {
    //   provinceId:'getCityList',
  },
  created() {
    this.getOrientationList()
  },
  mounted() {
    var vm=this;
    vm.schoolId=sessionStorage.getItem('schoolId');
    vm.isAdmin = sessionStorage.getItem('isAdmin');
    if (
      sessionStorage.getItem('exercisePlanList-queryData') != undefined &&
      sessionStorage.getItem('isExercisePlanDetailBack') != undefined
    ) {
      //页面返回时 根据缓存的查询条件查询
      let queryData = JSON.parse(
        sessionStorage.getItem('exercisePlanList-queryData')
      )
      this.planName = queryData.planName
      this.sexId = queryData.sex
      this.levelId = queryData.itemLevelCode
      this.orientationId = queryData.itemOrientationCode
      this.defaultStatus = queryData.defaultPlan
      this.openStatus = queryData.openStatus
      this.ageStart = queryData.ageStart
      this.ageEnd = queryData.ageEnd
      this.pageNum = queryData.pageNo
      this.pageSize = queryData.pageSize
      this.auditStatus=queryData.auditStatus
      this.classQuery(0)
       sessionStorage.removeItem('exercisePlanList-queryData')
    sessionStorage.removeItem('isExercisePlanDetailBack')
    } else {
      this.classQuery(1)
    }
   
  }
}
</script>