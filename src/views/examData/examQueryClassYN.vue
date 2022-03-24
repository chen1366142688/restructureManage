<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">班级数据查询</h2>
    </div>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div>
              <span>年级：</span>
              <Select v-model="grade"  style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
            <Button type="success"  @click="querySearch">查询</Button>
            <Button type="success"  @click="exportSchoolTestData">导出EXCEL</Button>
          </div>
        </div>
      </Card>
      <br>
      <div>
        <Card>
          <div style="font-size:18px;height:40px;"> 数据概览</div>
          <Row>
            <div>
              <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
            </div>
          </Row>
        </Card> 
      </div>
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
      </div>
      <div :style="{marginTop:'20px'}">
        <Card>
          <div style="font-size:18px;height:40px;">
              数据分析
          </div>
          <div :style="{backgroundColor:'#FFFFFF'}">
            <Row :style="{textAlign:'center'}">
              <div id="myChart1" :style="{width: '40%', height: '400px', marginTop: '50px',display: 'inline-block'}"></div>
            </Row>
          </div>
        </Card>
      </div>
      <div :style="{marginTop:'10px'}">
        <Card>
          <div style="font-size:18px;height:40px;">
              平均得分
          </div>
          <div id="myChart3" :style="{width: '100%', height: '400px'}"></div>
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
      schoolYear:'',
      schoolId:'',
      loading:false,
      myChart1:null,
      option1:{},
      myChart2:null,
      option2:{},
      myChart3:null,
      option3:{},
      myChart4:null,
      option4:{},
      primaryList:[
        {grade: 1,label:'一年级'},
        {grade: 2,label:'二年级'},
        {grade: 3,label:'三年级'},
        {grade: 4,label:'四年级'},
        {grade: 5,label:'五年级'},
        {grade: 6,label:'六年级'},
      ],
      middleList:[
        {grade: 7,label:'七年级'},
        {grade: 8,label:'八年级'},
        {grade: 9,label:'九年级'},
      ],
      highList:[
        {grade:10,label:'高一'},
        {grade: 11,label:'高二'},
        {grade: 12,label:'高三'},
      ],
      classId:99,
      classList:[
        {classId:99,label:'全部'}
      ],
      grade:99,
      schoolGradeList:[
        {grade:99,label:'全部'}
      ],
      resultColumns:[
        {
          title: '总人数',
          key: 'studentCount',
          align: 'center',
          minWidth:100,
        },
        {
          title: '已完成/考核总人数',
          key: 'examOverCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', params.row.examOverCount+'/'+params.row.studentCount)
          }
        },
        {
          title: '平均得分',
          key: 'examScore',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            return h('div', params.row.examScore/100)
          }
        },
      ],
      resultData:[],
      overViewColumns:[
        {
          title: '班级',
          key: 'studentClass',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', params.row.studentClass+'班')
          }
        },
        {
          title: '总人数',
          key: 'studentCount',
          align: 'center',
          minWidth:100,

        },
        {
          title: '已完成/考核总人数',
          key: 'examOverCount',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            return h('div', params.row.examOverCount+'/'+params.row.studentCount)
          }
        },
        {
          title: '平均得分',
          key: 'examScore',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            return h('div', params.row.examScore/100)
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
        sessionStorage.setItem("examQueryStudent-studentClass",item.studentClass);
        sessionStorage.setItem("examQueryStudent-grade",item.grade);
        sessionStorage.setItem("examQueryStudent-gender","");
        sessionStorage.setItem("examQueryStudent-studentName","");
        sessionStorage.setItem("examQueryStudent-registerCode","");
        this.$router.push({ name: "examQueryStudentYN" });
    },
    querySearch(){
      let vm = this;
      this.pageNum = 1;
      this.pageNo = 1
      this.scorexAxisData=[];
      this.scoreseriesData=[];                  
      this.passSeriesData=[];
      this.resultData=[];
      this.search();
    },
    restore() {
      var vm = this
      vm.activityId= vm.activityId,
      vm.grade = ''
      vm.pageNo = 1
      vm.pageSize = 10
      vm.registerCode = ''
      vm.studentClass = ''
      vm.studentName = ''
      vm.college = ''
      vm.major = ''
      vm.testTypeId=""
      vm.submitStatus=""
      let schoolId = vm.schoolId
    },
    pageNumChange(value) {
      //页码改变方法处理
      if (this.pageNum != value) {
        this.pageNum = value
        // this.search()
      }
    },
    pageSizechange(value) {
      //页面大小改变方法处理
      if (this.pageSize != value) {
        this.pageSize = value
        this.pageNum = 1;
        // this.search()
      }
    },
    exportSchoolTestData(){
      var vm=this;
      if(typeof(vm.grade) == "undefined"){
                    vm.grade="";
                }
               
      let url =
        this.$axios.defaults.baseURL +
        '/v1/exam/exportExamClassData?grade='+(vm.grade==99?'':vm.grade)+'&schoolId=1&token=' + sessionStorage.getItem('token')
        window.open(url)
    },
    drawGenSLine(data) {
      var vm = this;
      var myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      myChart1.setOption({
          title : {
              text: '考核情况图形分布',
              subtext: '',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} :  {d}%"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['完成人数','未参加人数','已参加未完成人数']
          },
          series : [
              {
                  name: '占比',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:data,
                  itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          },
                          normal:{
                            color:function(params) {
                            var colorList = [          
                                    '#4fa995', '#e99954', '#e58467'  
                                ];
                                return colorList[params.dataIndex]
                              }
                          }
                      }
                      ,
                  label:{ 
                      show: true, 
                      formatter:'{b} : {c} ({d}%)'
                  }, 
              }
          ]
      },true)
    },  
    drawBar1() {
      var vm = this;
      var myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      myChart3.setOption({
          title:{
              // text: '平均得分',
              subtext: ''
          },
          color:'#00C693',
          xAxis: {
              type: 'category',
              name:'班级',
              data: vm.scorexAxisData
          },
          yAxis: {
              type: 'value',
              name:'分'
          },
          series: [{
              data: vm.scoreseriesData,
              barCategoryGap:'50%',//柱图间距
              barWidth : 60,//柱图宽度
              type: 'bar',
              label:{
                show:true,
                position:'top'
              }
          }]
      },true)
    }, 
    search(){
      let vm =this
      this.$axios
        .get('/v1/exam/queryStudentExamData?selectType=1&examType=1&grade='+vm.grade)
        .then(res => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response
            let data=[],datas=[];
            if(res.data.response.length<=0){
              data =[
                      {value:0, name:'完成人数'},
                      {value:0, name:'未参加人数'},
                      {value:0, name:'已参加未完成人数'}
                  ]
              datas = [
                  {value:0 , name:'优秀数',itemStyle:{}},  
                  {value:0 , name:'良好数'},
                  {value:0 , name:'及格数'},
                  {value:0 , name:'不及格数'}
              ]
            }else{
              data = [
                      {value:vm.resultData[0].examOverCount, name:'完成人数'},
                      {value:vm.resultData[0].examNotStartCount, name:'未参加人数'},
                      {value:vm.resultData[0].examStartNotOverCount, name:'已参加未完成人数'}
                  ]
              datas = [
                  {value:vm.resultData[0].goodCount , name:'优秀数',itemStyle:{}},  
                  {value:vm.resultData[0].wellCount , name:'良好数'},
                  {value:vm.resultData[0].passCount , name:'及格数'},
                  {value:vm.resultData[0].notPassCount , name:'不及格数'}
              ]
            }
              this.drawGenSLine(data)


            let schoolType = sessionStorage.getItem('schoolType')
            if(vm.grade == "" || vm.grade==99 || vm.grade==undefined){
              if ('2' == schoolType) {
                vm.grade=1;
              }
              if ('3' == schoolType) {
                vm.grade=7;
              }
              if ('4' == schoolType) {
                vm.grade=10;
              }
            }

            this.$axios
              .get('/v1/exam/queryStudentExamData?selectType=2&examType=1&grade='+vm.grade)
              .then(res => {
                if (res.data.code == 10000) {
                  this.overViewData = res.data.response
                  for(let val of this.overViewData){
                    this.scorexAxisData.push(val.studentClass+'班')
                    this.scoreseriesData.push(val.examScore/100)
                    let passAll= val.goodCount+val.wellCount+val.passCount;
                    this.passSeriesData.push(passAll == 0? passAll : Math.floor(passAll/val.examOverCount*100))
                  }
                  this.drawBar1()
                }
              })
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
    
    if(sessionStorage.getItem('examQueryClass_grade')){
      vm.grade = Number(sessionStorage.getItem('examQueryClass_grade'))
    }else{
      vm.grade = vm.schoolGradeList[0].grade == 99 ? '' : vm.schoolGradeList[0].grade;
    }

    if(vm.grade == "" || vm.grade==99 || vm.grade==undefined){
        if ('2' == schoolType) {
          vm.grade=1;
        }
        if ('3' == schoolType) {
          vm.grade=7;
        }
        if ('4' == schoolType) {
          vm.grade=10;
        }
    }
    
    console.log(vm.grade)
    vm.search()
  }
}
</script>