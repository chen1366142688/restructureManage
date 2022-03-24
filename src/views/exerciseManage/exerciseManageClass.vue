<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按班级查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style="" >年级：</span>
                    <Select v-model="grade"  style="width:120px;">
                        <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
                    </Select>
                </div>
                <div style="margin:5px 20px;">
                    <span style="margin-left:40px;">班级：</span>
                    <Select v-model="studentClass" style="width:120px;">
                        <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success"  @click="querySearch">查询</Button>
            </div>
         </div>
      </Card>
      <br   v-if="showAll" >
      <Card   v-if="showAll">
        <div style="font-size:18px;height:40px;">
            数据概览
        </div>
        <div>
          <Row>
            <div style>
              <Table border :loading="loading" :columns="resultColumnsTotal" :data="resultDataTotal"></Table>
            </div>
          </Row>
        </div>
      </Card>
      </br>
      <Card>
       <div style="font-size:18px;height:40px;">
            数据明细
        </div>
        <div>
          <Row>
            <div style="">
              <Table border max-height="430" :loading="loading" @on-sort-change='sortChange' :columns="resultColumns" :data="resultData"></Table>
            </div>
            <br>
            <div style="float: right;">
              <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
            </div>
          </Row>
        </div>
      </Card>
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
      allNeedCount:0,
      allNeedBoyCount:0,
      allNeedGirlCount:0,
      finishCount:0,
      finishBoyCount:0,
      finishGirlCount:0,
      finishRatio:0,
      finishBoyRatio:0,
      finishGirlRatio:0,
      boyTime:0,
      girlTime:0,
      orderField:"student_class",
      orderSort:"asc",
      showAll:true,
      resultDataTotal:[],
      resultColumnsTotal: [
        {
          title: "总考核人数",
          key: "allNeedCount",
          align: "center",
          minWidth:100
        },
        {
          title: "总完成考核",
          key: "finishCount",
          align: "center",
          minWidth:100,
        },
        {
          title: "总完成率",
          key: "finishRatio",
          align: "center",
          minWidth:100,
        },
        {
          title: "男生考核",
          key: "allNeedBoyCount",
          align: "center",
          minWidth:100,
        },
         {
          title: "男生完成考核",
          key: "finishBoyCount",
          align: "center",
          minWidth:100,
        },
         {
          title: "男生完成率",
          key: "finishBoyRatio",
          align: "center",
          minWidth:100,
        },
        {
          title: "男生平均每天锻炼时长",
          key: "boyTime",
          align: "center",
          minWidth:100,
        },
         {
          title: "女生考核",
          key: "allNeedGirlCount",
          align: "center",
          minWidth:100,
        },
         {
          title: "女生完成考核",
          key: "finishGirlCount",
          align: "center",
          minWidth:100,
        },
        {
          title: "女生完成率",
          key: "finishGirlRatio",
          align: "center",
          minWidth:100,
        },
        {
          title: "女生平均每天锻炼时长",
          key: "girlTime",
          align: "center",
          minWidth:100,
        }
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
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.studentClass +'班'
            return h('div', text)
          }
        },
        {
          title: '班级总人数',
          key: 'studentCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.boyCount+row.girlCount
            return h('div', text)
          }
        },
        {
          title: '完成考核人数/考核总人数',
          key: 'finishCount',
          align: 'center',
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            if(row.needComboCount > 0){
                const text = (row.boyFinishCount+row.girlFinishCount)+"/"+(row.boyCount+row.girlCount-row.boyCountExempt-row.girlCountExempt)
                return h('div', text)
            }else{
                return h('div', 0)
            }
          }
        },
        {
          title: '免试人数',
          key: 'studentCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const text = row.boyCountExempt+row.girlCountExempt
            return h('div', text)
          }
        },
        {
          title: "完成人数/考核总人数(男生)",
          key: "boyFinishCount",
          align: "center",
          width: 140,
          render: (h, params) => {
            const row = params.row;
            if(row.needComboCount > 0){
                const text = row.boyFinishCount+'/'+ (row.boyCount-row.boyCountExempt);
                return h("span", text);
            }else{
              return h("span", '0/'+ row.boyCount);
            }
          }
        },
         {
          title: "完成人数/考核总人数(女生)",
          key: "girlFinishCount",
          align: "center",
          width: 140,
          render: (h, params) => {
            const row = params.row;
            if(row.needComboCount > 0){
                const text = row.girlFinishCount+'/'+ (row.girlCount-row.girlCountExempt);
                return h("span", text);
            }else{
              return h("span", '0/'+ row.girlCount);
            }
          }
        },
        {
          title: '男生平均每天锻炼时长(分钟)',
          key: 'averageBoyTime',
          align: 'center',
          sortable:'custom',
          width: 170,
          render: (h, params) => {
            const row = params.row
            if(row.needComboCount > 0 && row.boyDateCount > 0){
                const text = (row.boyTimeDuration/1000/60/row.boyDateCount).toFixed(2)
                return h('div', text)
            }else{
                return h('div', 0)
            }
          }
        },
        {
          title: '女生平均每天锻炼时长(分钟)',
          key: 'averageGirlTime',
          align: 'center',
          sortable:'custom',
          width: 170,
          render: (h, params) => {
            const row = params.row
            if(row.needComboCount > 0 && row.girlDateCount > 0){
                const text = (row.girlTimeDuration/1000/60/row.girlDateCount).toFixed(2)
                return h('div', text)
            }else{
                return h('div', 0)
            }
          }
        },
         {
          title: "完成率",
          key: "finishCountRatio",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.needComboCount > 0){
                let text = (row.girlFinishCount+row.boyFinishCount+row.boyCountExempt+row.girlCountExempt)*100/(row.girlCount+row.boyCount);
                text = text.toFixed(2)+'%';
                return h("span", text);
            }else{
              return h("span", "0.00%");
            }
          }
        },
        {
          title: "上传视频总数",
          key: "videoCount",
          align: "center",
          sortable:'custom',
          minWidth:100
        },
        {
          title: "完成进度",
          key: "finishComboRatio",
          align: "center",
          sortable:'custom',
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            if(row.needComboCount > 0){
              let text = row.finishComboCount*100/row.needComboCount;
              text = text.toFixed(2)+'%';
              return h("span", text);
            }else{
              return h("span", "0.00%");
            }
          }
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 120,
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
                      this.toDetail(params.row.grade,params.row.studentClass)
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
          minWidth:100
        },
        {
          title: '学籍号',
          key: 'registerCode',
          align: 'center',
          minWidth:100
        },
        {
          title: '性别',
          key: 'gender',
          align: 'center',
          minWidth:100,
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
          minWidth:100
        },
        {
          title: '专业',
          key: 'majorName',
          align: 'center',
          minWidth:100
        },
        {
          title: '学级',
          key: 'startSchool',
          align: 'center',
          minWidth:100,
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
          minWidth:100,
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
          minWidth:100,
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
       if(column.order=='desc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else if(column.order=='asc'){
          this.orderField = column.key;
          this.orderSort = column.order;
       }else{
          this.orderField = "student_class";
          this.orderSort = 'asc';
       }
       this.search();
    },
    getExerciseGradeList() {
      var vm = this;
      if(vm.grade != ""){
        vm.showAll = false;
      }else{
        vm.showAll = true;
      }
      vm.loading = true;
      let data = {
        grade: vm.grade,
        pageNo: 1,
        pageSize: 10,
        type:1,
        orderField:'grade',
        orderSort:'asc'
      };
      this.$axios.post("/v1/familyexerciseanalyze/queryStudentExerciseGrade", data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          let resultData = res.data.response;
          if(resultData != null && resultData.length>0){
                vm.allNeedCount=0;
                vm.allNeedBoyCount=0;
                vm.allNeedGirlCount=0;
                vm.finishCount=0;
                vm.finishBoyCount=0;
                vm.finishGirlCount=0;
                vm.finishRatio=0;
                vm.finishBoyRatio=0;
                vm.finishGirlRatio=0;
                vm.boyTime=0;
                vm.girlTime=0;
                let tempBoyTime=0;
                let tempGirlTime=0;
                let tempBoyDateCount=0;
                let tempGirlDateCount=0;
                for(let i=0;i<resultData.length;i++){
                   if(resultData[i].needComboCount > 0){
                      vm.allNeedCount=vm.allNeedCount+resultData[i].boyCount+resultData[i].girlCount;
                      vm.allNeedBoyCount=vm.allNeedBoyCount+resultData[i].boyCount;
                      vm.allNeedGirlCount=vm.allNeedGirlCount+resultData[i].girlCount;
                      vm.finishCount=vm.finishCount+resultData[i].boyFinishCount+resultData[i].girlFinishCount;
                      vm.finishBoyCount=vm.finishBoyCount+resultData[i].boyFinishCount;
                      vm.finishGirlCount=vm.finishGirlCount+resultData[i].girlFinishCount;
                      tempBoyTime = tempBoyTime+resultData[i].boyTimeDuration;
                      tempGirlTime = tempGirlTime+resultData[i].girlTimeDuration;
                      tempBoyDateCount = tempBoyDateCount + resultData[i].boyDateCount;
                      tempGirlDateCount = tempGirlDateCount + resultData[i].girlDateCount;
                   }
                }
                vm.finishCount = vm.finishCount == ""?0:vm.finishCount;
                vm.finishBoyCount = vm.finishBoyCount == ""?0:vm.finishBoyCount;
                vm.finishGirlCount = vm.finishGirlCount == ""?0:vm.finishGirlCount;

                if(vm.allNeedCount > 0){
                    vm.finishRatio=vm.finishCount*100/vm.allNeedCount;
                    vm.finishRatio=vm.finishRatio.toFixed(2)+'%';
                }else{
                    vm.finishRatio='0.00%';
                }

                if(vm.allNeedGirlCount > 0){
                    vm.finishGirlRatio=vm.finishGirlCount*100/vm.allNeedGirlCount;
                    vm.finishGirlRatio=vm.finishGirlRatio.toFixed(2)+'%';
                }else{
                    vm.finishGirlRatio='0.00%';
                }
                if(vm.allNeedBoyCount > 0){
                    vm.finishBoyRatio=vm.finishBoyCount*100/vm.allNeedBoyCount;
                    vm.finishBoyRatio=vm.finishBoyRatio.toFixed(2)+'%';
                }else{
                    vm.finishBoyRatio='0.00%';
                }
                if(tempBoyDateCount > 0){
                    vm.boyTime=tempBoyTime/tempBoyDateCount/1000/60;
                    vm.boyTime=vm.boyTime.toFixed(2)+'分钟';
                }else{
                    vm.boyTime='0分钟';
                }
                if(tempGirlDateCount > 0){
                    vm.girlTime=tempGirlTime/tempGirlDateCount/1000/60;
                    vm.girlTime=vm.girlTime.toFixed(2)+'分钟';
                }else{
                    vm.girlTime='0分钟';
                }
                vm.resultDataTotal = [{
                      allNeedCount:vm.allNeedCount,
                      allNeedBoyCount:vm.allNeedBoyCount,
                      allNeedGirlCount:vm.allNeedGirlCount,
                      finishCount:vm.finishCount,
                      finishBoyCount:vm.finishBoyCount,
                      finishGirlCount:vm.finishGirlCount,
                      finishRatio:vm.finishRatio,
                      finishBoyRatio:vm.finishBoyRatio,
                      finishGirlRatio:vm.finishGirlRatio,
                      boyTime:vm.boyTime,
                      girlTime:vm.girlTime,
                }];
          }
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    getExerciseList() {
      var vm = this;
      if(vm.studentClass != ""){
        vm.showAll = false;
      }else{
        this.getExerciseGradeList();
        vm.showAll = true;
      }
      vm.loading = true;
      let data = {
        grade: vm.grade,
        studentClass:vm.studentClass,
        pageNo: vm.pageNum,
        pageSize: vm.pageSize,
        type:2,
        orderField: vm.orderField,
        orderSort: vm.orderSort
      };
      this.$axios.post("/v1/familyexerciseanalyze/queryStudentExerciseGrade", data).then(res => {
        vm.loading = false;
        if (res.data.code == 10000) {
          vm.resultData = res.data.response;
        } else {
          if (res.data.code > 39999) {
            vm.$Message.info(res.data.msg);
          }
        }
      });
    },
    querySearch(){
      this.pageNum = 1;
      this.pageNo = 1
      this.search();
    },
    search() {
      var vm = this
      let schoolId = vm.schoolId
      vm.getExerciseList(schoolId)
      vm.getExerciseListCount(schoolId)
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
      vm.getExerciseList(schoolId)
      vm.getExerciseListCount(schoolId)
    },

    getExerciseListCount(schoolId) {
      var vm = this
      if(this.grade == 0){
        this.grade="";
      }
      let data = {
        grade: vm.grade,
        studentClass:vm.studentClass
      };
      this.$axios.post('/v1/familyexerciseanalyze/queryStudentExerciseGradeCount', data).then(res => {
        if (res.data.code == 10000) {
          this.total = res.data.response
        } else {
          if (res.data.code > 39999) {
          this.$Message.info(res.data.msg)
          }
        }
      })
    },
    toDetail(grade,studentClass) {
      sessionStorage.setItem('exerciseManageStudent-grade',grade)
      sessionStorage.setItem('exerciseManageStudent-studentClass',studentClass)
      sessionStorage.setItem('exerciseManageStudent-registerCode',"")
      sessionStorage.setItem('exerciseManageStudent-studentName',"")
      sessionStorage.setItem('exerciseManageStudent-pageNum',"")
      sessionStorage.setItem('exerciseManageStudent-pageSize',"")
      this.$router.push({ name: 'exerciseManageStudent' })
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
        this.pageNum = 1;
        this.pageSize = value
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
        vm.grade = 1
      }
      if ('3' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.middleList)
        vm.grade = 7
      }
      if ('4' == schoolType) {
        vm.schoolGradeList = vm.schoolGradeList.concat(vm.highList)
        vm.grade = 10
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

    let grade = sessionStorage.getItem('exerciseManageClass-grade');
    if(grade != null && grade != "" && grade != undefined && grade > 0){
        vm.grade = Number(grade);
    }
    vm.search()
  }
}
</script>
