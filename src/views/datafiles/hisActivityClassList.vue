<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{yearSemester%2==0?((yearSemester/10).toFixed(0))+"学年第一学期":((yearSemester/10).toFixed(0) -1)+"学年第二学期"}}体质测试管理</h2>
    </div>
    <div>
      <Card>
       <div class="top-search">
          <div class="left-input">
            <div style="margin:5px 10px;">
              <span>年级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
            <div style="margin:5px 10px;">
              <span>班级：</span>
              <Select v-model="classId"  style="width:120px;">
                <Option v-for="item in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"  @click="search">查询</Button>
            <Button type="success" :disabled = "testApplyStatus" v-if="yearSemester%2==0" @click="inputStudentTest"  style="margin-left:16px;">体测数据导入</Button>
            <Button v-else disabled type="success"  style="margin-left:16px;">体测数据导入</Button>
            <Button class="add-button" style="margin-left:16px;" v-on:click="exportData" type="success">体测数据导出</Button>
            <Button type="success" style="margin-left:16px;" @click="pageToList">返回</Button>
          </div>
        </div>
      </Card>
      <br>
      
      <div style="margin-top:20px">
        <Card>
          <div style="font-size:18px;height:40px;"> 数据明细</div>
          <Row>
            <div style="">
              <Table border :loading="loading" :columns="overViewColumns" :data="overViewData"></Table>
            </div>
            <br>
            <!-- <div style="float: right;">
              <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
            </div> -->
          </Row>
        </Card>
        <Modal
            v-model="chooseWindow"
            title="选择导出数据"
            @on-ok="exportSchoolTestData"
            @on-cancel="cancelChoose"
            :mask-closable="false"
            :loading="false"
            width="550px"
        >
        
            <CheckboxGroup
              v-model="classes"
             >
             <Checkbox
             style="width:23%;"
             v-for="item in classesList"
             :key="item.grade"
                :label="item.grade"
                size = 'large'
              >{{item.label}}
              </Checkbox>
            </CheckboxGroup>
         
        </Modal>
      </div>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'schoolList',
  data() {
    return {
      chooseWindow:false,
      schoolYear:'',
      yearSemester:'',
      schoolId:'',
      loading:false,
      testApplyStatus:false,
      primaryList:[
        {grade: 99,label:'全部'},
        {grade: 1,label:'一年级'},
        {grade: 2,label:'二年级'},
        {grade: 3,label:'三年级'},
        {grade: 4,label:'四年级'},
        {grade: 5,label:'五年级'},
        {grade: 6,label:'六年级'},
      ],
      middleList:[
        {grade: 99,label:'全部'},
        {grade: 7,label:'七年级'},
        {grade: 8,label:'八年级'},
        {grade: 9,label:'九年级'},
      ],
      highList:[
        {grade: 99,label:'全部'},
        {grade:10,label:'高一'},
        {grade: 11,label:'高二'},
        {grade: 12,label:'高三'},
      ],
       primaryList1:[
        {grade: 1,label:'一年级'},
        {grade: 2,label:'二年级'},
        {grade: 3,label:'三年级'},
        {grade: 4,label:'四年级'},
        {grade: 5,label:'五年级'},
        {grade: 6,label:'六年级'},
      ],
      middleList1:[
        {grade: 7,label:'七年级'},
        {grade: 8,label:'八年级'},
        {grade: 9,label:'九年级'},
      ],
      highList1:[
        {grade:10,label:'高一'},
        {grade: 11,label:'高二'},
        {grade: 12,label:'高三'},
      ],
      classesList:[],
      classes:[],
      classId:99,
      classList: [
       {
          value: 99,
          label: "全部"
        },
        {
          value: 1,
          label: "1班"
        },
        {
          value: 2,
          label: "2班"
        },
        {
          value: 3,
          label: "3班"
        },
        {
          value: 4,
          label: "4班"
        },
        {
          value: 5,
          label: "5班"
        },
        {
          value: 6,
          label: "6班"
        },
        {
          value: 7,
          label: "7班"
        },
        {
          value: 8,
          label: "8班"
        },
        {
          value: 9,
          label: "9班"
        },
        {
          value: 10,
          label: "10班"
        },
        {
          value: 11,
          label: "11班"
        },
        {
          value: 12,
          label: "12班"
        },
        {
          value: 13,
          label: "13班"
        },
        {
          value: 14,
          label: "14班"
        },
        {
          value: 15,
          label: "15班"
        },
        {
          value: 16,
          label: "16班"
        },
        {
          value: 17,
          label: "17班"
        },
        {
          value: 18,
          label: "18班"
        },
        {
          value: 19,
          label: "19班"
        },
        {
          value: 20,
          label: "20班"
        },
        {
          value: 21,
          label: "21班"
        },
        {
          value: 22,
          label: "22班"
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
      grade:99,
      schoolGradeList:[
        {grade:99,label:'全部'}
      ],
      overViewColumns:[
         {
          title: '年级',
          key: 'grade',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            const grade = row.grade == "1" ?'一年级':row.grade == "2" ?'二年级':row.grade == "3" ?'三年级':row.grade == "4" ?'四年级':row.grade == "5" ?'五年级':row.grade == "6" ?'六年级':row.grade == "7" ?'七年级':row.grade == "8" ?'八年级':row.grade == "9" ?'九年级':row.grade == "10" ?'高一':row.grade == "11" ?'高二':row.grade == "12" ?'高三':'';
            const text = grade+'（'+row.startSchool+"级）";
            return h('div',text)
          }
        },
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            return h('div', (params.row.studentClass==null || params.row.studentClass=='') ?"全部班级":params.row.studentClass+'班')
          }
        },
        {
          title: '总人数',
          key: 'studentTotalCount',
          align: 'center',
          minWidth:100,

        },
        {
          title: '已完成/测试总人数',
          key: 'overTestCount',
          align: 'center',
                    minWidth:100,

          render: (h, params) => {
            return h('div', params.row.overTestCount+'/'+params.row.needJoinTestCount)
          }
        },
        {
          title: '免试人数',
          key: 'exemptCount',
          align: 'center',
          minWidth:100,

        },
        {
          title: '平均分',
          key: 'averageScore',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            return h('div', params.row.averageScore/100)
          }
        },
  
        {
          title: '合格率',
          key: 'qualifiedCount',
          align: 'center',
                    minWidth:100,

          render: (h, params) => {
            const row = params.row
            const text = `${params.row.passCount == 0? params.row.passCount : Math.floor(params.row.passCount/params.row.overTestCount*100)}%`
            return h('div', text)
          }
        },
        {
          title: '优良率',
          key: 'wellCount',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            const row = params.row
            const text = `${params.row.wellCount == 0? params.row.wellCount : Math.floor(params.row.wellCount/params.row.overTestCount*100)}%`
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
                    marginRight: '10px'
                  },
                  on: {
                    click: () => {
                      this.toDetail(params.row)
                    }
                  }
                },
                '详情'
              )
            ])
          }
        }
      ],
      overViewData:[],
      scorexAxisData:[],
      scoreseriesData:[],
      passSeriesData:[],
      pageNum: 1,
      pageSize: 10,
      total: 0
    }
  },
  methods: {
    pageToList() {
      this.$router.go(-1)
    },
    toDetail(item) {
      var vm = this;
      sessionStorage.setItem(
      "hisActivityStudentList-activityId",item.activityId
    );
    sessionStorage.setItem(
      "hisActivityStudentList-studentClass",item.studentClass?item.studentClass:0
    );
    sessionStorage.setItem(
      "hisActivityStudentList-gradeName",item.studentClass+'班'
    );
    sessionStorage.setItem(
      "hisActivityStudentList-startSchool",item.startSchool
    );
    sessionStorage.setItem(
      "hisActivityStudentList-schoolYear",item.schoolYear
    );
    sessionStorage.setItem(
      "hisActivityStudentList-yearSemester",this.yearSemester
    );
    sessionStorage.setItem(
      "hisActivityStudentList-grade",item.grade 
    );

    
      this.$router.push({ name: "hisActivityStudentList" });
    },
    inputStudentTest(){
        this.$router.push({ name: 'hisPhysicalTestImport', query: {
            yearSemester: this.yearSemester
        }})
    },
    exportSchoolTestData(){
      var vm = this;
      let schoolId = vm.schoolId;
      let classes = this.classes;
      let grade = '';
      for(let i = 0;i<classes.length;i++){
        grade = grade + classes[i];
        if(i != classes.length-1){
          grade = grade+','
        }
      }
      let url =
          this.$axios.defaults.baseURL +
          '/v1/test/export/exportStudentActivityData?schoolId=' +
          this.schoolId +
          '&grade=' +
          grade+
          '&pageNo=1&pageSize=20000' +
          '&yearSemester=' +
          this.yearSemester +
          '&token=' +
          sessionStorage.getItem('token');
      window.open(url);
    },
    exportData(){
      this.chooseWindow = true;
    },
    cancelChoose(){
      this.chooseWindow = false;
    },
  
    search(){
      let vm =this
      this.$axios
        .get(
          `/v1/test/query/his/queryHisYearActivityClassList?grade=${vm.grade==99?'':vm.grade}&schoolId=${vm.schoolId}&classId=${vm.classId==99?'':vm.classId}`+"&yearSemester="+vm.yearSemester
        )
        .then(res => {
          if (res.data.code == 10000) {
            this.overViewData = res.data.response
            for(let val of this.overViewData){
              this.scorexAxisData.push(val.studentClass+'班')
              this.scoreseriesData.push(val.averageScore/100)
              this.passSeriesData.push(val.qualifiedCount == 0? val.qualifiedCount : Math.floor(val.qualifiedCount/val.overTestCount*100))
            }
          }
        })
    },
  },
  watch: {
    
  },
  created() {
  },
  mounted() {
    let vm = this;
    let schoolId = sessionStorage.getItem('schoolId')
    vm.schoolId = schoolId
    let SchoolYear = sessionStorage.getItem("historyData_SchoolYear",);
    vm.schoolYear = SchoolYear

    let schoolType = sessionStorage.getItem('schoolType')
      if (schoolType) {
        if ('0' == schoolType) {
          vm.schoolGradeList = vm.schoolGradeList
            .concat(vm.primaryList)
            .concat(vm.middleList)
            .concat(vm.highList)
        }
        if ('2' == schoolType) {
          vm.schoolGradeList = vm.primaryList
        }
        if ('3' == schoolType) {
          vm.schoolGradeList = vm.middleList
        }
        if ('4' == schoolType) {
          vm.schoolGradeList = vm.highList
        }
      }
    let yearSemester = sessionStorage.getItem('hisActivityClassList-yearSemester');
    vm.yearSemester = yearSemester;
    
    if(sessionStorage.getItem('gradeTestData_grade')){
      vm.grade = Number(sessionStorage.getItem('gradeTestData_grade'))
    }else{
      vm.grade = vm.schoolGradeList[0].grade == 99 ? '' : vm.schoolGradeList[0].grade;
    }
    if(vm.grade == "" || vm.grade==99 || vm.grade==undefined){
        if ('2' == schoolType) {
          vm.grade=99;
          this.classesList = this.primaryList1;
        }
        if ('3' == schoolType) {
          vm.grade=99;
          this.classesList = this.middleList1;
        }
        if ('4' == schoolType) {
          vm.grade=99;
          this.classesList = this.highList1;
        }
    }
    let testApplyStatus = sessionStorage.getItem("dataFilsManage-testApplyStatus");
    let testReportingStatus = sessionStorage.getItem("dataFilsManage-testReportingStatus");
    if("0" == testApplyStatus && "1"==testReportingStatus){
    this.testApplyStatus = true;
    }
    vm.search()
  }
}
</script>