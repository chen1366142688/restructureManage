<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生查询</h2>
    </div>
    <div>
      <Card>
          <div class="top-search">
              <div class="left-input">
                <div style="margin:5px 20px;">
                  <span>年级：</span>
                  <Select v-model="grade" style="width:120px;">
                      <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                  </Select>
                </div>
                <div style="margin:5px 20px;">
                  <span>班级：</span>
                  <Select v-model="studentClass" style="width:120px;">
                    <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
                </div>
                <div style="margin:5px 20px;">
                  <span>姓名：</span>
                  <Input v-model="studentName" placeholder="学生姓名" style="width: 120px;" />
                </div>
                <div style="margin:5px 20px;">
                  <span>学籍号：</span>
                  <Input v-model="registerCode" placeholder="学生学籍号" style="width: 120px;" />
                </div>
              </div>
              <div class="right-btns">
                <Button type="success"  @click="querySearch">查询</Button>
                <Button type="success" @click="restore">重置查询条件</Button>
                <Button :disabled="diagnosisAble" type="success"  @click="makeTask" v-if="isShowEdit">生成学生健康报告</Button>
                <Button type="success"  @click="exportStudentArchivesPdfPre" v-if="isShowEdit">导出学生健康档案</Button>
                <Button type="success"  @click="searchHistoryData" v-if="isShowEdit">历史数据查询</Button>

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
          <div>
            <Table max-height="520" border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
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
            title="正在生成学生健康报告"
            v-model="createDiagnosisTask"
            :closable="false"
            cancel-text=""
            :mask-closable="false">
      <p><Progress :percent="diagnosisProgress" status="active"></Progress></p>
    </Modal>
        <Modal v-model="exportShow" :mask-closable="false" width="360" >
        <p slot="header" style="color:#f60;text-align:center">
          <Icon type="ios-information-circle"></Icon>
          <span>导出设置</span>
        </p>
        <div style="">
          <p>
          <span>导出年级：</span>
         <Select v-model="gradeExport" style="width:180px;" size="small">
            <Option v-for="item in schoolGradeListExport"  :value="item.grade" :key="item.grade">{{ item.label }}</Option>
          </Select>
           </p>
          <p style="margin-top:20px;">
            <span>导出内容：</span>
            <!-- <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
                <Checkbox label="1">成绩明细</Checkbox>
                <Checkbox label="2">汇总成绩</Checkbox>
                <Checkbox label="3">健康报告</Checkbox>
            </CheckboxGroup> -->
            <Checkbox @on-change="exportChange1" v-model="scoreDetail">成绩明细</Checkbox>
            <Checkbox @on-change="exportChange2" v-model="scoreStatistical">汇总成绩</Checkbox>
            <Checkbox v-model="healthReport">健康报告</Checkbox>
          </p>

        </div>
        <div slot="footer">
          <Button type="success" size="large" @click="exportStudentArchivesPdf">确定</Button>
        <Button type="success" size="large" @click="cancelexport">取消</Button>
      </div>
      </Modal>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
      yearSemester:'',
      schoolDistrict:'',
      timeNum: 0,
      diagnosisAble: false,
      timer: '',
      diagnosisProgress: 0,
      createDiagnosisTask: false,
      exportShow:false,
      gradeExport:'',
      checkAllGroup:[],
      scoreDetail:false,
      scoreStatistical:false,
      healthReport:false,
      loading:false,
      updateUrl: '',
      schoolId: '',
      schoolType: '',
      grade: '',
      primaryList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: 1,
          label: '一年级'
        },
        {
          grade: 2,
          label: '二年级'
        },
        {
          grade: 3,
          label: '三年级'
        },
        {
          grade: 4,
          label: '四年级'
        },
        {
          grade: 5,
          label: '五年级'
        },
        {
          grade: 6,
          label: '六年级'
        }
      ],
      middleList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: 7,
          label: '七年级'
        },
        {
          grade: 8,
          label: '八年级'
        },
        {
          grade: 9,
          label: '九年级'
        }
      ],
      highList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: 10,
          label: '高一'
        },
        {
          grade: 11,
          label: '高二'
        },
        {
          grade: 12,
          label: '高三'
        }
      ],
      collegeList: [
        {
          grade: "",
          label: '全部'
        },
        {
          grade: 13,
          label: '大一'
        },
        {
          grade: 14,
          label: '大二'
        },
        {
          grade: 15,
          label: '大三'
        },
        {
          grade: 16,
          label: '大四'
        }
      ],
      schoolGradeList: [],
      schoolGradeListExport: [],
      studentClass: '',
      classList: [
        {
          value: "",
          label: '全部'
        },
        {
          value: 1,
          label: '1班'
        },
        {
          value: 2,
          label: '2班'
        },
        {
          value: 3,
          label: '3班'
        },
        {
          value: 4,
          label: '4班'
        },
        {
          value: 5,
          label: '5班'
        },
        {
          value: 6,
          label: '6班'
        },
        {
          value: 7,
          label: '7班'
        },
        {
          value: 8,
          label: '8班'
        },
        {
          value: 9,
          label: '9班'
        },
        {
          value: 10,
          label: '10班'
        },
        {
          value: 11,
          label: '11班'
        },
        {
          value: 12,
          label: '12班'
        },
        {
          value: 13,
          label: '13班'
        },
        {
          value: 14,
          label: '14班'
        },
        {
          value: 15,
          label: '15班'
        },
        {
          value: 16,
          label: '16班'
        },
        {
          value: 17,
          label: '17班'
        },
        {
          value: 18,
          label: '18班'
        },
        {
          value: 19,
          label: '19班'
        },
        {
          value: 20,
          label: '20班'
        },
        {
          value: 21,
          label: '21班'
        },
        {
          value: 22,
          label: '22班'
        },
        {
            value: 23,
            label: '23班'
        },
        {
            value: 24,
            label: '24班'
        },
        {
            value: 25,
            label: '25班'
        },
        {
            value: 26,
            label: '26班'
        },
        {
            value: 27,
            label: '27班'
        },
        {
            value: 28,
            label: '28班'
        },
        {
            value: 29,
            label: '29班'
        },
        {
            value: 30,
            label: '30班'
        },{
                value: 31,
                label: '31班'
            },
            {
                value: 32,
                label: '32班'
            },
            {
                value: 33,
                label: '33班'
            },
            {
                value: 34,
                label: '34班'
            },
            {
                value: 35,
                label: '35班'
            },
            {
                value: 36,
                label: '36班'
            },
            {
                value: 37,
                label: '37班'
            },
            {
                value: 38,
                label: '38班'
            },
            {
                value: 39,
                label: '39班'
            },
            {
                value: 40,
                label: '40班'
            },
            {
                value: 41,
                label: '41班'
            },
            {
                value: 42,
                label: '42班'
            },
            {
                value: 43,
                label: '43班'
            },
            {
                value: 44,
                label: '44班'
            },
            {
                value: 45,
                label: '45班'
            },
            {
                value: 46,
                label: '46班'
            },
            {
                value: 47,
                label: '47班'
            },
            {
                value: 48,
                label: '48班'
            },
            {
                value: 49,
                label: '49班'
            },
            {
                value: 50,
                label: '50班'
            },
            {
                value: 51,
                label: '51班'
            },
            {
                value: 52,
                label: '52班'
            },
            {
                value: 53,
                label: '53班'
            },
            {
                value: 54,
                label: '54班'
            },
            {
                value: 55,
                label: '55班'
            },
            {
                value: 56,
                label: '56班'
            },
            {
                value: 57,
                label: '57班'
            },
            {
                value: 58,
                label: '58班'
            },
            {
                value: 59,
                label: '59班'
            },
            {
                value: 60,
                label: '60班'
            }
      ],
      registerCode: '',
      studentName: '',
      resultColumns: [],
      normal: [
        {
          title: '学生姓名',
          key: 'studentName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center',
          minWidth: 100
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '年级',
          key: 'gradeName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.studentClass +'班'
            return h('div', text)
          }
        },

        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row)
                    }
                  }
                },
                '健康档案'
              )
            ])
          }
        }
      ],
      collegeColumns: [
        {
          title: '学生姓名',
          key: 'studentName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center',
          minWidth: 100
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '学院',
          key: 'collegeName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '专业',
          key: 'majorName',
          align: 'center',
          minWidth: 100
        },
        {
          title: '学级',
          key: 'startSchool',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            const text = row.startSchool+'级'
            return h('div', text)
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row
            const text = row.studentClass+'班'
            return h('div', text)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '健康档案'
              )
            ])
          }
        }
      ],
      resultData: [],
      isCollege: false,
      college: '',
      collegesList: [],
      major: '',
      majorList: [],
      chooseCollege:true,
      collegeName:'',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      isShowEdit:true
    }
  },
  methods: {
    // 历史数据查询
    searchHistoryData() {
      this.$router.push({name: 'historyStudentData'})
    },
    getTaskInfoBySchoolIdFirst(){
      let vm =this;
      this.$axios.get('/v1/exam/getTaskInfoBySchoolId').then(res => {
        if (res.data.code == 10000) {
          let data = res.data.response
          if(null!=data.taskId&&'3'!=data.taskStatus){
            if(null!=data.dealNum&&null!=data.importNum){
              let dealNum = data.dealNum*100;
              let importNum = data.importNum;
              this.diagnosisProgress = parseInt(dealNum/importNum)
            }
            this.diagnosisAble = true;
            this.createDiagnosisTask = true;
            this.timer = window.setInterval(this.getTaskInfoBySchoolId, 5000);          }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    getTaskInfoBySchoolId(){
      let vm =this;
      this.$axios.get('/v1/exam/getTaskInfoBySchoolId').then(res => {
        if (res.data.code == 10000) {
            let data = res.data.response
            if(data.taskStatus=='3'){
                this.diagnosisProgress = 100;
                this.diagnosisAble = false;
                this.createDiagnosisTask = false;
                clearInterval(this.timer);
                return;
            }else{
              if((null!=data.dealNum)&&(null!=data.importNum)&&(data.dealNum==data.importNum)){
                this.diagnosisProgress = 100;
                this.diagnosisAble = false;
                this.createDiagnosisTask = false;
                clearInterval(this.timer);
                return;
              }
              if(null!=data.dealNum&&null!=data.importNum){
                let dealNum = data.dealNum*100;
                let importNum = data.importNum;
                this.diagnosisProgress = parseInt(dealNum/importNum)
              }
              this.diagnosisAble = true;
              this.timeNum = this.timeNum+1;
                if(this.diagnosisProgress==100){
                  this.diagnosisAble = false;
                  this.createDiagnosisTask = false;
                  clearInterval(this.timer);
                }
                //时间太长防止卡死
              console.log("+++++++this.timeNum+++++++++",this.timeNum);
                if(this.timeNum == 40){
                  this.diagnosisProgress = 100;
                  this.diagnosisAble = false;
                  this.createDiagnosisTask = false;
                  clearInterval(this.timer);
                }
            }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    makeTask(){
      let vm =this;
      this.diagnosisProgress = 0;
      this.timeNum = 0;
      this.$axios.get('/v1/exam/addDiagnosisTask').then(res => {
        if (res.data.code == 10000) {
          this.createDiagnosisTask = true;
          this.timer = setInterval(this.getTaskInfoBySchoolId, 5000);
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    exportChange1(e){
      console.log(e)
      var vm=this;
      if(e && vm.scoreStatistical){
        vm.scoreStatistical=false;
      }

    },
    exportChange2(e){
      console.log(e)
      var vm=this;
      if(e && vm.scoreDetail){
        vm.scoreDetail=false;
      }
    },
    checkAllGroupChange(e){
      var vm=this;
      console.log(e)
    },
    exportStudentArchivesPdfPre(){
      var vm=this;
      vm.exportShow=true;
    },
    exportStudentArchivesPdf(){
      var vm=this;
      if(!vm.gradeExport){
        vm.$Message.info('请选择导出年级!');
        return false;
      }
      if(!vm.scoreDetail && !vm.scoreStatistical && !vm.healthReport){
        vm.$Message.info('请选择导出内容!');
        return false;
      }
      let type="1";

      if(vm.scoreDetail){
        if(vm.healthReport){
          type="4"
        }
      }
      if(vm.scoreStatistical){
        if(vm.healthReport){
          type="5";
        }else{
          type='2';
        }
      }
      if(!vm.scoreDetail && ! vm.scoreStatistical && vm.healthReport){
        type="3"
      }


      let url =
        this.$axios.defaults.baseURL +
        '/v1/student/archives/exportStudentArchivesPdf?gradeId='+vm.gradeExport+'&type='+type+
        '&token=' +
        sessionStorage.getItem('token')
        +'&yearSemester='+vm.yearSemester
        window.open(url)
        vm.exportShow=false;
    },
    cancelexport(){
      var vm=this;
      vm.exportShow=false;
    },
    getStudentInfoList(schoolId) {
      var vm = this
      vm.loading=true;
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major
      }


      sessionStorage.setItem('healthRecordStudent-getStudentInfoList-pageNum',vm.pageNum);
      sessionStorage.setItem('healthRecordStudent-getStudentInfoList-pageSize',vm.pageSize);
      sessionStorage.setItem('healthRecordStudent-getStudentInfoList-grade',vm.grade);
      sessionStorage.setItem('healthRecordStudent-getStudentInfoList-studentClass',vm.studentClass);
      sessionStorage.setItem('healthRecordStudent-getStudentInfoList-studentName',vm.studentName);
      sessionStorage.setItem('healthRecordStudent-getStudentInfoList-registerCode',vm.registerCode);

      this.$axios.post('/v1/studentinfo/getStudentInfoList', data).then(res => {
        vm.loading=false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response
        } else {
          if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    inputStudent(){
        this.$router.push({ name: 'exportTaskManage', query: {
          taskType: '',
          yearSemester: ''
      }})
    },
    querySearch(){
      this.pageNum = 1;
      this.pageNo = 1
      this.search();
    },
    search() {
      var vm = this
      let schoolId = vm.schoolId
      vm.getStudentInfoList(schoolId)
      vm.countStudentList(schoolId)
    },
    restore() {
      var vm = this
      vm.grade = ''
      vm.pageNo = 1
      vm.pageSize = 10
      vm.registerCode = ''
      vm.studentClass = ''
      vm.studentName = ''
      vm.college = ''
      vm.major = ''

      let schoolId = vm.schoolId
      vm.getStudentInfoList(schoolId)
      vm.countStudentList(schoolId)
    },

    countStudentList(schoolId) {
      var vm = this
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major
      }
      this.$axios.post('/v1/studentinfo/countStudentList', data).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(row) {
      var vm = this
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-studentId',row.studentId)
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-studentName',row.studentName)
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-registerCode',row.registerCode)
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-gender',row.gender)
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-grade',row.grade)
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-startSchool',row.startSchool)
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-studentClass',row.studentClass)
        sessionStorage.setItem('healthRecordStudent-healthRecordDetail-selectTabName',"");
        let aa=sessionStorage.getItem("schoolDistrict");
        if(aa=="2000"){
          this.$router.push({ name: 'healthRecordDetailYN' })
        }else{
          this.$router.push({ name: 'healthRecordDetail' })
        }
        
    },
    getSchoolData(schoolId) {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios
        .get('/v1/school/getSchoolDetail?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            console.log(res)
            let data = res.data.response
            this.schoolData = data
            this.schoolName = data.name
          } else {
            if (res.data.code > 39999) {
            this.$Message.info(res.data.msg)
            }
          }
        })
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNum = 1;
        this.search()
      }
    },

    getSchoolCollegeBySchoolId(schoolId) {
      var vm = this
      this.$axios
        .get('/v1/student/getSchoolCollegeBySchoolId?schoolId=' + schoolId)
        .then(res => {
          if (res.data.code == 10000) {
            vm.collegesList = res.data.response
          } else {
            if (res.data.code > 39999) {
                vm.$Message.info(res.data.msg)
            }
          }
        })
    },
    getSchoolMajorBySchoolId(schoolId, collegeCode) {
      var vm = this
      this.$axios
        .get(
          '/v1/student/getSchoolMajorBySchoolId?schoolId=' +
            schoolId +
            '&collegeCode=' +
            collegeCode
        )
        .then(res => {
          if (res.data.code == 10000) {
            vm.majorList = res.data.response
          } else {
            if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg)
            }
          }
        })
    },
  },
  watch: {
    college: function() {
      var vm = this
      vm.getSchoolMajorBySchoolId(vm.schoolId, vm.college)
    },
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolDistrict=sessionStorage.getItem("schoolDistrict")
    vm.yearSemester = sessionStorage.getItem("yearSemester")
    if(vm.schoolDistrict=="2000"){
      vm.isShowEdit=false
    }
    vm.schoolType=schoolType;
    // vm.updateUrl =this.$axios.defaults.baseURL + '/v1/file/upload?type=excel';
    if (schoolType) {
      vm.resultColumns = vm.normal
      if ('0' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList
          .concat(vm.primaryList)
          .concat(vm.middleList)
          .concat(vm.highList)
          .concat(vm.collegeList)
      }

      // if("1"==schoolType){
      //     vm.schoolGradeList=vm.schoolGradeList.concat(vm.primaryList).concat(vm.middleList).concat(vm.highList).concat(vm.collegeList);
      // }
      if ('2' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
         vm.schoolGradeListExport = vm.schoolGradeListExport.concat(vm.primaryList)
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
         vm.schoolGradeListExport = vm.schoolGradeListExport.concat(vm.middleList)
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
         vm.schoolGradeListExport = vm.schoolGradeListExport.concat(vm.highList)
      }
      vm.schoolGradeListExport.splice(0,1);
      if ('5' == schoolType) {
        vm.isCollege = true
        vm.resultColumns = vm.collegeColumns
        var date=new Date;
          var year=date.getFullYear();
          var month=date.getMonth()+1;
          // month =(month<10 ? "0"+month:month);
          // var mydate = (year.toString()+month.toString());
          vm.collegeList=[
             {
          grade: 13,
          label: (month>9?year:year-1)+'级'
        },
        {
          grade: 14,
          label: (month>9?year-1:year-2)+'级'
        },
        {
          grade: 15,
          label: (month>9?year-2:year-3)+'级'
        },
        {
          grade: 16,
          label: (month>9?year-3:year-4)+'级'
        }
          ]
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.collegeList)
        vm.getSchoolCollegeBySchoolId(vm.schoolId)
      }
    } else {
      vm.resultColumns = vm.normal
      vm.schoolGradeList = vm.schoolGradeList
        .concat(vm.primaryList)
        .concat(vm.middleList)
        .concat(vm.highList)
        .concat(vm.collegeList)
    }

    let tempPageSize=sessionStorage.getItem('healthRecordStudent-getStudentInfoList-pageSize');
    let tempgrade = sessionStorage.getItem('healthRecordStudent-getStudentInfoList-grade');
    let tempstudentClass = sessionStorage.getItem('healthRecordStudent-getStudentInfoList-studentClass');
    let tempstudentName = sessionStorage.getItem('healthRecordStudent-getStudentInfoList-studentName');
    let tempregisterCode = sessionStorage.getItem('healthRecordStudent-getStudentInfoList-registerCode');


    let classGrade = sessionStorage.getItem('sportsClass-healthRecordStudent-grade');
    let classStudentClass = sessionStorage.getItem('sportsClass-healthRecordStudent-studentClass');

    if(sessionStorage.getItem('sportsClass-healthRecordStudent-grade') ){
        tempgrade = Number(classGrade);
      }
      if( sessionStorage.getItem('sportsClass-healthRecordStudent-studentClass')){
       tempstudentClass = Number(classStudentClass);;
      }

    if(tempPageSize != null && tempPageSize != undefined && tempPageSize > 0 ){
      vm.pageNum = Number(sessionStorage.getItem('healthRecordStudent-getStudentInfoList-pageNum'));
      vm.pageSize = Number(sessionStorage.getItem('healthRecordStudent-getStudentInfoList-pageSize'));
      if(tempgrade != null && tempgrade != undefined && tempgrade > 0){
        vm.grade = Number(tempgrade);
      }
      if(tempstudentClass != null && tempstudentClass != undefined && tempstudentClass > 0){
        vm.studentClass = Number(tempstudentClass);;
      }
      if(tempstudentName != null && tempstudentName != undefined && tempstudentName != "" ){
        vm.studentName = tempstudentName;
      }
      if(tempregisterCode != null && tempregisterCode != undefined && tempregisterCode != ""){
        vm.registerCode =  tempregisterCode;
      }
    }
    vm.search()
    this.getTaskInfoBySchoolIdFirst();
    //功能屏蔽
    // vm.isShowEdit  = false
    /*指定学校才展示有导出的健康报告*/
    // if(schoolId == '3209'){
    //   vm.isShowEdit = true
    // };
  }
}
</script>
