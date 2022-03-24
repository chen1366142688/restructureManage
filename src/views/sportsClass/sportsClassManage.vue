<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学习态度管理</h2>
    </div>
    <div>
      <Card>
        <div  @keydown.enter="querySearch" class="top-search">
          <div class="left-input">
            <div style="margin:5px 20px;">
              <span>年<span style="visibility: hidden;">占位</span>级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span >班<span style="visibility: hidden;">占位</span>级：</span>
              <Select v-model="studentClass"  style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 20px;">
              <span  >姓<span style="visibility: hidden;">占位</span>名：</span>
              <Input v-model="studentName"  placeholder="学生姓名" style="width: 120px;" />
            </div>
            <div style="margin:5px 20px;">
              <span>学籍号<span style="visibility:hidden">占</span>：</span>
              <Input v-model="registerCode"  placeholder="学生学籍号" style="width: 120px;" />
            </div>
            <div style="margin:5px 20px;">
              <span>是否免试：</span>
              <Select v-model="classChoose" style="width:120px;">
                <Option
                  v-for="item in classChooseList"
                  :value="item.entryStatus"
                  :key="item.entryStatus"
                >{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"  @click="querySearch">查询</Button>
            <Button type="success"  @click="restore">重置查询条件</Button>
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
            <Table border max-height="530" :loading="loading" @on-sort-change='sortChange' :columns="resultColumns" :data="resultData"></Table>
          </div>
          <br>
          <div style="float: right;">
            <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
          </div>
        </Row>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
      loading:false,
      updateUrl: '',
      schoolId: '',
      schoolType: '',
      grade: '',
      orderType:"",
      classChoose:0,
      classChooseList: [
        { entryStatus: 0, label: "全部" },
        { entryStatus: 1, label: "未免试" },
        { entryStatus: 2, label: "已免试" }
      ],
      orderTypeList:[
        {
          value: "1",
          label: '降序'
        },
        {
          value: "2",
          label: '升序'
        }
      ],
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
          minWidth:100,
          fixed:'left',
          //   minWidth: 250
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center',
          minWidth: 150
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            const row = params.row
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '年级班级',
          key: 'studentClass',
          align: 'center',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = row.gradeName+row.studentClass +'班'
            return h('div', text)
          }
        },
        {
          title: '剩余得分',
          key: 'surplusScore',
          align: 'center',
          sortable:'custom',
          minWidth: 120,
          render: (h, params) => {
            const row = params.row
            var  text = 100-(row.deductionScore/100).toFixed(2);
            text=text<0?0:text;
            return h('div', ('1' != params.row.classChoose?text : params.row.exemptType == 1? '70':params.row.exemptType == 2?'80':'' ));
            //return h('div', text)
          }
        },
        {
          title: '被扣分数',
          key: 'deductionScore',
          align: 'center',
          minWidth:90,
          render: (h, params) => {
            const row = params.row
            // const color = row.exemptId != null ? 'green' : 'red'
            const text = (row.deductionScore/100).toFixed(2)
            return h('div', ('1' != params.row.classChoose?text : '免试'));
          }
        },
        {
          title: '旷课',
          key: 'studentClass',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            const row = params.row;
            if(row.truancyCount == null){
                row.truancyCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.truancyCount : ''));
            //return h('div', row.truancyCount)
          }
        },
        {
          title: '迟到',
          key: 'studentClass',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            const row = params.row;
            if(row.lateCount == null){
                row.lateCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.lateCount : ''));
            //return h('div', row.lateCount)
          }
        },
        {
          title: '早退',
          key: 'studentClass',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            const row = params.row;
            if(row.earlyCount == null){
                row.earlyCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.earlyCount: ''));
            //return h('div', row.earlyCount)
          }
        },
        {
          title: '违反纪律',
          key: 'studentClass',
          align: 'center',
          minWidth: 90,
          render: (h, params) => {
            const row = params.row;
            if(row.violateDisciplineCount == null){
                row.violateDisciplineCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.violateDisciplineCount: ''));
            //return h('div', row.violateDisciplineCount)
          }
        },
        {
          title: '运动着装不符',
          key: 'studentClass',
          align: 'center',
          minWidth: 80,
          render: (h, params) => {
            const row = params.row;
            if(row.notAccordClothing == null){
                row.notAccordClothing=0;
            }
            return h('div', ('1' != params.row.classChoose?row.notAccordClothing: ''));
            //return h('div', row.notAccordClothing)
          }
        },
        {
          title: '病假',
          key: 'studentClass',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            const row = params.row;
            if(row.sickCount == null){
                row.sickCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.sickCount: ''));
            //return h('div', row.sickCount)
          }
        },
        {
          title: '事假',
          key: 'studentClass',
          align: 'center',
          minWidth: 70,
          render: (h, params) => {
            const row = params.row;
            if(row.thingCount == null){
                row.thingCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.thingCount: ''));
            //return h('div', row.thingCount)
          }
        },
        // {
        //   title: '不认真',
        //   key: 'studentClass',
        //   align: 'center',
        //   width: 80,
        //   render: (h, params) => {
        //     const row = params.row;
        //     if(row.notSeriousCount == null){
        //         row.notSeriousCount=0;
        //     }
        //     return h('div', row.notSeriousCount)
        //   }
        // },
        {
          title: '大课间缺席',
          key: 'studentClass',
          align: 'center',
          minWidth: 80,
          render: (h, params) => {
            const row = params.row;
            if(row.bigAbsentCount == null){
                row.bigAbsentCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.bigAbsentCount: ''));
            //return h('div', row.bigAbsentCount)
          }
        },
        {
          title: '大课间违反纪律',
          key: 'studentClass',
          align: 'center',
          minWidth: 100,
          render: (h, params) => {
            const row = params.row;
            if(row.bigViolateDisciplineCount == null){
                row.bigViolateDisciplineCount=0;
            }
            return h('div', ('1' != params.row.classChoose?row.bigViolateDisciplineCount: ''));
            //return h('div', row.bigViolateDisciplineCount)
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          minWidth: 120,
          fixed:"right",
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  attrs: {
                      disabled:params.row.classChoose == '1'?true:false
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                "详情"
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
          minWidth: 250
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center',
          minWidth: 150
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth:90,
          render: (h, params) => {
            const row = params.row
            const text = row.gender == '1' ? '男' : '女'
            return h('div', text)
          }
        },
        {
          title: '学院',
          key: 'collegeName',
          align: 'center',
          minWidth:120,
        },
        {
          title: '专业',
          key: 'majorName',
          align: 'center',
          minWidth:120
        },
        {
          title: '学级',
          key: 'startSchool',
          align: 'center',
          minWidth:120,
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
          minWidth:120,
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
          minWidth: 200,
          render: (h, params) => {
            return h('div', [
              h(
                'Button',
                {
                  props: {
                    type: 'success'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row.studentId)
                    }
                  }
                },
                '详情'
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
      total: 0
    }
  },
  methods: {

    sortChange(column){
      console.log(column.key);
      console.log(column.order);
       if(column.order=='desc'){
          this.orderType = '2'
       }else if(column.order=='asc'){
          this.orderType = '1'
       }else{

       }
       this.search();
    },
    getStudentInfoList(schoolId) {
      var vm = this
      if(this.grade == 0){
        this.grade="";
      }
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
        majorCode: vm.major,
        orderType:vm.orderType,
        classChoose:vm.classChoose
      }


      sessionStorage.setItem('sportsClassManage-pageNum',vm.pageNum);
      sessionStorage.setItem('sportsClassManage-pageSize',vm.pageSize);
      sessionStorage.setItem('sportsClassManage-grade',vm.grade);
      sessionStorage.setItem('sportsClassManage-studentClass',vm.studentClass);
      sessionStorage.setItem('sportsClassManage-studentName',vm.studentName);
      sessionStorage.setItem('sportsClassManage-registerCode',vm.registerCode);
      sessionStorage.setItem('sportsClassManage-orderType',vm.orderType);
      sessionStorage.setItem('sportsClassManage-classChoose',vm.classChoose);


      this.$axios.post('/v1/sports/learn/querySportsClassManage', data).then(res => {
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
      vm.classChoose = '0'

      let schoolId = vm.schoolId
      vm.getStudentInfoList(schoolId)
      vm.countStudentList(schoolId)
    },

    countStudentList(schoolId) {
      var vm = this
      if(this.grade == 0){
        this.grade="";
      }
      let data = {
        grade: vm.grade,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        registerCode: vm.registerCode,
        schoolId: schoolId,
        studentClass: vm.studentClass,
        studentName: vm.studentName,
        collegeCode: vm.college,
        majorCode: vm.major,
        orderType:vm.orderType,
        classChoose:vm.classChoose
      }
      this.$axios.post('/v1/sports/learn/querySportsClassManageCount', data).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(studentId) {
      var vm = this
      sessionStorage.setItem('sportsClassManage-sportsClassStudentHis-studentId',studentId)
      sessionStorage.setItem('sportsClassManage-sportsClassStudentHis-yearSemester',"")
      this.$router.push({ name: 'sportsClassStudentHis' })
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
  created() {
    //  this.getProvinceList();
  },
  mounted() {
  //    0 未知类型 1 幼儿园 2小学 3初中 4高中5大学
    var vm = this
    if(vm.orderType == ""){
       vm.orderType = "1";
    }
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let schoolType = sessionStorage.getItem('schoolType')
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
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
      }
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

    let tempPageSize=sessionStorage.getItem('sportsClassManage-pageSize');
    let tempgrade = sessionStorage.getItem('sportsClassManage-grade');
    let tempstudentClass = sessionStorage.getItem('sportsClassManage-studentClass');
    let tempstudentName = sessionStorage.getItem('sportsClassManage-studentName');
    let tempregisterCode = sessionStorage.getItem('sportsClassManage-registerCode');

    if(tempPageSize != null && tempPageSize != undefined && tempPageSize > 0 ){
      vm.pageNum = Number(sessionStorage.getItem('sportsClassManage-pageNum'));
      vm.pageSize = Number(sessionStorage.getItem('sportsClassManage-pageSize'));
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
      vm.orderType = sessionStorage.getItem('sportsClassManage-orderType');
    }
    vm.search()
  }
}
</script>
