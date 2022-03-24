<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">补考管理</h2>
    </div>
    <div>
      <Card :dis-hover="true">
        <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>年级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span>班级：</span>
              <Select v-model="studentClass"  style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success" style="" @click="querySearch">查询</Button>
            <Button v-if="supplementStatus == '2'" disabled type="success">补考进行中</Button>
            <Button v-if="supplementStatus != '2'" @click="smsSend" type="success">开启补考</Button>
          </div>
         </div>
      </Card>
      <br>
      <Card :dis-hover="true">
          <div style="font-size:18px;height:40px;"> 数据概览</div>
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumns1" :data="resultData1"></Table>
            </div>
          </Row>
        </Card>
        <Card style="margin-top:20px;" :dis-hover="true"> 
      <div>
          <div style="font-size:18px;height:40px;"> 数据明细</div>
        <Row>
          <div style="">
            <Table border max-height="500" :loading="loading" :columns="resultColumns" :data="resultData"></Table>
          </div>
        </Row>
      </div>
       </Card>
    </div>
    <!-- <Modal
        title="提示"
        v-model="startMessage"
        @on-ok="smsSend"
        :styles="{top: '300px'}"
        >
        <p>补测开始后系统移动端“体质测试”模块将全部同步为“补测”数据，请确认是否需要开始？</p>
    </Modal> -->
    <Modal v-model="smsModalStatus" :mask-closable="false" width="420" >
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>短信验证</span>
      </p>
      <div style="">
          <p style="margin-left:40px;margin-top:10px;"><span >短信验证码：</span>
          <Input v-model="smsCode" size="small" placeholder="请输入短信验证码" style="width: 180px;"/>
          <!-- <Button type="success" size="small"   style="margin-left:10px;" :disabled="sendStatus"  @click="sendSmsCode" >发送</Button> -->
          <Button type="success" size="small"  :disabled="disable" :class="{ codeGeting:isGeting }" @click="getVerifyCode">{{getCode}}</Button>
          </p>
          <span style="margin-left:40px;color:red">{{errorMsg}}</span>
      </div>
      <div slot="footer">
        <Button type="success"  @click="cancle" >取消</Button>
        <Button type="success"  :loading="changeLoading" @click="startSupplement" :disabled="dataTf">开启补考</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
         getCode:'获取验证码',
          isGeting:false,
          count:300,
          disable:false,
      smsModalStatus:false,
      dataTf:true,
      changeLoading:false,
      smsCode:'',
      sendStatus:false,
      errorMsg:'',
        supplementStatus:"1",
      loading:false,
      schoolId: '',
      schoolType: '',
      grade: '',
      classTestName:'',
      primaryList: [
        {
          grade: 0,
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
          grade: 0,
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
          grade: 0,
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
      schoolGradeList: [],
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
      semesterType:"",
      semesterYearList:[
         
      ],
      resultColumns: [
        {
          title: '年级',
          key: 'grade',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            let gradeName = row.gradeId==1?"一年级":row.gradeId==2?"二年级":row.gradeId==3?"三年级":row.gradeId==4?"四年级":row.gradeId==5?"五年级":row.gradeId==6?"六年级":row.gradeId==7?"七年级":row.gradeId==8?"八年级":row.gradeId==9?"九年级":row.gradeId==10?"高一":row.gradeId==11?"高二":row.gradeId==12?"高三":""
            return h('div', gradeName+" ("+row.startSchool+'级)')
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            return h('div',row.studentClass+'班')
          }
        },
        {
          title: '班级总人数',
          key: 'totalStudent',
          align: 'center',
          minWidth:100,
          //   width: 150
        },
        {
          title: '考核完成度',
          key: 'testPercent',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
            return h('div',row.testPercent+'%')
          }
        },
        {
          title: '平均成绩',
          key: 'averageScore',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
            return h('div',row.averageScore?row.averageScore:0)
          }
        },
        {
          title: '优秀率',
          key: 'excellentPercent',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
            return h('div',row.excellentPercent+'%')
          }
        },
        {
          title: '良好率',
          key: 'goodPercent',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
            return h('div',row.goodPercent+'%')
          }
        },
        {
          title: '及格率',
          key: 'passPercent',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
            return h('div',row.passPercent+'%')
          }
        },
        {
          title: '不及格率',
          key: 'notPassPercent',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
           return h('div',row.notPassPercent?row.notPassPercent+'%':'0')
          }
        },
      ],
      resultData: [],
      resultColumns1: [
        {
          title: '总人数',
          key: 'totalStudent',
          align: 'center',
          minWidth:100,
          //   width: 150
        },
        {
          title: '考核完成度',
          key: 'testPercent',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
            return h('div',row.testPercent+'%')
          }
        },
        {
          title: '平均成绩',
          key: 'averageScore',
          align: 'center',
          minWidth:100,
        },
        {
          title: '优秀率',
          key: 'excellentPercent',
          align: 'center',
          minWidth:100,
           render: (h, params) => {
            const row = params.row
            return h('div',row.excellentPercent+'%')
          }
        },
        {
          title: '良好率',
          key: 'goodPercent',
          align: 'center',
          minWidth:100,

           render: (h, params) => {
            const row = params.row
            return h('div',row.goodPercent+'%')
          }
        },
        {
          title: '及格率',
          key: 'passPercent',
          align: 'center',
          minWidth:100,

           render: (h, params) => {
            const row = params.row
            return h('div',row.passPercent+'%')
          }
        },
        {
          title: '不及格率',
          key: 'notPassPercent',
          align: 'center',
          minWidth:100,

           render: (h, params) => {
            const row = params.row
           return h('div',row.notPassPercent?row.notPassPercent+'%':'0')
          }
        },
      ],
      resultData1: [],
      classTestType:"2",
      pageNum: 1,
      pageSize: 20,
      total: 0
    }
  },
  methods: {
      getVerifyCode(){
          var countDown = setInterval(()=>{
            if(this.count < 1){
              this.isGeting = false;
              this.disable = false;
              this.getCode = '获取验证码';
              this.count = 300;
              clearInterval(countDown);
              // console.log(this.count)
            }else{
              this.isGeting = true;
              this.disable = true;
              this.getCode = this.count-- + 's后重发';
              // console.log(this.count)
            }
          },1000);
          this.$once('hook:beforeDestroy', () => {
        clearInterval(countDown);
      })
          this.sendSmsCode();
        },
    cancle(){
      var vm=this;
      vm.smsModalStatus=false;
    },
    smsSend(){
      var vm=this;
      this.$axios.get('/v1/subjectReport/querySchoolReportedStatus?dataType=2').then(res => {
        if (res.data.code === 10000) {
          let {editStatus} = res.data.response
          if (editStatus === '1') {
            vm.smsModalStatus=true;
          } else {
            this.$Modal.info({
              title: '提醒',
              okText: '知道了',
              closable: false,
              content: '<p>数据已报送给教育局，无法编辑数据，若需编辑，请联系学校管理员，申请编辑权限</p>'
          });
          }
        }
      })
      
    },
    sendSmsCode(){
      var vm = this;
      vm.sendStatus=true;
      this.$axios
        .get("/v1/common/sendSmsForUpdateSensitiveData?name=examSupplement")
        .then(function(response) {
          // console.log(response)
          if (response.data.code == 10000) {
            vm.$Message.info("发送成功，请注意接收");
            vm.dataTf=false;
            vm.errorMsg="发送成功，请注意接收"
          } else {
            vm.$Message.info(response.data.msg);
             vm.dataTf=true;
            vm.errorMsg=response.data.msg
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getStudentInfoList(schoolId) {
      var vm = this
      vm.loading=true;
      vm.onshowInfo=false;
      sessionStorage.setItem('examSupplement-queryExamSemesterClassList-pageNum',vm.pageNum);
      sessionStorage.setItem('examSupplement-queryExamSemesterClassList-pageSize',vm.pageSize);
      sessionStorage.setItem('examSupplement-queryExamSemesterClassList-submitStatus',vm.submitStatus);
      sessionStorage.setItem('examSupplement-queryExamSemesterClassList-grade',vm.grade);
      sessionStorage.setItem('examSupplement-queryExamSemesterClassList-studentClass',vm.studentClass);
      sessionStorage.setItem('examSupplement-queryExamSemesterClassList-itemId',vm.itemId);
      sessionStorage.setItem('examSupplement-queryExamSemesterClassList-semesterType',vm.semesterType);

      let data={
        "classTestName": vm.classTestName,
        "examItemName":vm.examItemName,
        "gradeId": vm.grade?vm.grade:'',
        "pageNo":vm.pageNum,
        "pageSize": vm.pageSize,
        "studentClass": vm.studentClass,
        classTestType:vm.classTestType
      }

      this.$axios.post('/v1/examschool/getStudentClassTestList',data).then(res => {
        vm.loading=false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response
          
          if(res.data.response){
              let data=res.data.response;
              let totalStudent=0;
            let testStudent=0;
            let totalTest=0;
            let excellentStudent=0;
            let goodStudent=0;
            let passStudent=0;
            let notPassStudent=0;
            let totalScore=0;
              for(let i=0;i<data.length;i++){
                totalStudent+=data[i].totalStudent;
             testStudent+=data[i].testStudent;
             totalTest+=data[i].totalTest?data[i].totalTest:0;
             excellentStudent+=data[i].excellentStudent;
             goodStudent+=data[i].goodStudent;
             passStudent+=data[i].passStudent;
             notPassStudent+=data[i].notPassStudent;
             totalScore+=data[i].totalScore;
              }
            let paramTotal={
                totalStudent:totalStudent,
                testPercent:totalTest?(100*testStudent/totalTest).toFixed(2):0,
             averageScore:totalTest?(totalScore/totalTest).toFixed(2):0,
             excellentPercent:testStudent?(100*excellentStudent/testStudent).toFixed(2):0,
             goodPercent:testStudent?(100*goodStudent/testStudent).toFixed(2):0,
             passPercent:testStudent?(100*passStudent/testStudent).toFixed(2):0,
             notPassPercent:testStudent?(100*notPassStudent/testStudent).toFixed(2):0
            }
            vm.resultData1=[];
            vm.resultData1.push(paramTotal)

          }

        } else {
          if (res.data.code > 39999) {
          vm.$Message.info(res.data.msg)
          }
        }
      })
    },
    countStudentList(schoolId) {
      var vm = this
       let data={
        "classTestName": vm.classTestName,
        "examItemName":vm.examItemName,
        "gradeId": vm.grade?vm.grade:'',
        "pageNo":vm.pageNum,
        "pageSize": vm.pageSize,
        "studentClass": vm.studentClass,
        classTestType:vm.classTestType
      }
      this.$axios.post('/v1/examschool/countStudentClassTestList',data).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    getSchoolExamSupplement(){
      this.$axios.get('/v1/examschool/getSchoolExamSupplement')
        .then(res => {
          if (res.data.code == 10000) {
              this.supplementStatus=res.data.response
          }else {
            this.$Message.success(res.data.msg);
          }
        })
    },
    startSupplement(){
      this.$axios.get('/v1/examschool/startSupplement?smsCode='+this.smsCode)
        .then(res => {
           this.errorMsg=""
          if (res.data.code == 10000) {
              if(res.data.response.code=='1'){
                   this.$Message.success('操作成功！');
                    this.smsModalStatus=false;
              }else{
                   this.$Message.success(res.data.response.msg);
                    this.errorMsg=res.data.response.msg
              }
          }else{
               this.$Message.success(res.data.msg);
                    this.errorMsg=res.data.msg
          }
          this.search();
          this.getSchoolExamSupplement()
        })
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
    // restore() {
    //   var vm = this
    //   vm.grade = ''
    //   vm.pageNo = 1
    //   vm.pageSize = 10
    //   vm.registerCode = ''
    //   vm.studentClass = ''
    //   vm.studentName = ''
    //   vm.college = ''
    //   vm.major = ''

    //   let schoolId = vm.schoolId
    //   vm.getStudentInfoList(schoolId)
    //   vm.countStudentList(schoolId)
    // },
    toDetail(classId,gradeId,studentClass) {
      var vm = this
      sessionStorage.setItem( 'examAchievement1-classExamManage1-classId',classId)
      sessionStorage.setItem( 'examAchievement1-classExamManage1-gradeId',gradeId)
      sessionStorage.setItem( 'examAchievement1-classExamManage1-studentClass',studentClass)
      sessionStorage.setItem( 'examAchievement1-classExamManage1-classTestType',vm.classTestType)
      this.$router.push({ name: 'classExamManage1' })
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
   
  },
  watch: {
  },
  created() {
     
  },
  mounted() {
    //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let schoolType = sessionStorage.getItem('schoolType')
    vm.schoolType=schoolType;
    if ('2' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.primaryList)
    }
    if ('3' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
    }
    if ('4' == schoolType) {
      vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
    }

    vm.onshowInfo=true;

    let tempPageSize=sessionStorage.getItem('examSupplement-queryExamSemesterClassList-pageSize');
    let temppageNum= sessionStorage.getItem('examSupplement-queryExamSemesterClassList-pageNum');
    let tempgrade = sessionStorage.getItem('examSupplement-queryExamSemesterClassList-grade');
    let tempstudentClass = sessionStorage.getItem('examSupplement-queryExamSemesterClassList-studentClass');

    if(tempPageSize != null && tempPageSize != undefined && tempPageSize > 0 ){
      vm.pageNum = Number(temppageNum);
      vm.pageSize = Number(tempPageSize);
     
      if(tempgrade != null && tempgrade != undefined && tempgrade != ""){
        vm.grade =  Number(tempgrade);
      }
      if(tempstudentClass != null && tempstudentClass != undefined && tempstudentClass != "" && tempstudentClass > 0){
        vm.studentClass =  Number(tempstudentClass);
      }
    }
    vm.search();
    vm.getSchoolExamSupplement()
  }
}
</script>