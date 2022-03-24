<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">按年级查询</h2>
    </div>
    <Tabs type="card" :value="selectTabName" @on-click="selectTabs">
      <TabPane
              :name="examType.id"
              :label="examType.val"
              v-for="examType in examTypeList"
              :key="examType.id"
      >
      </TabPane>
    </Tabs>
    <div>
      <Card>
        <div class="top-search">
          <div class="left-input">
            <div>
              <span>年级：</span>
              <Select  v-model="grade" disabled  style="width:120px;">
                <Option v-for="item in schoolGradeList" :value="item.grade" :key="item.grade">{{ item.label }}</Option>
              </Select>
            </div>
          </div>
          <div class="right-btns">
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
          <div style="font-size:20px;height:40px;">
              数据分析
          </div>
          <div :style="{backgroundColor:'#FFFFFF'}">
            <Row :style="{textAlign:'center'}">
              <div id="myChart1" :style="{width: '40%', height: '400px', marginTop: '50px',display: 'inline-block'}"></div>
              <div id="myChart2" :style="{width: '40%', height: '400px', marginTop: '50px',display: 'inline-block'}"></div>
            </Row>
          </div>
        </Card>
      </div>
      <div :style="{marginTop:'10px'}">
        <Card>
          <div style="font-size:20px;height:40px;">
              平均分
          </div>
          <div id="myChart3" :style="{width: '100%', height: '400px'}"></div>
        </Card>
      </div>
      <div :style="{marginTop:'10px'}">
        <Card>
          <div style="font-size:20px;height:40px;">
              合格率
          </div>
          <div id="myChart4" :style="{width: '100%', height: '400px'}"></div>
        </Card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      schoolYear:'',
      schoolId:'',
      loading:false,
      grade:99,
      myChart1:null,
      option1:{},
      myChart2:null,
      option2:{},
      myChart3:null,
      option3:{},
      myChart4:null,
      option4:{},
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
            let data=params.row.studentCount?((params.row.examOverCount!=null?params.row.examOverCount:0)+'/'+params.row.studentCount):"";
            return h('div', data)
          }
        },
        {
          title: '平均分',
          key: 'examScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', params.row.examScore?params.row.examScore/100:"0")
          }
        },
        {
          title: '优秀率（人数）',
          key: 'goodCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = (params.row.goodCount && params.row.examOverCount)?((params.row.goodCount/params.row.examOverCount*100).toFixed(2)+"%" )+' （' + (params.row.goodCount===null?0:params.row.goodCount) + '人）': "0.00%" + ' （' + (params.row.goodCount===null?0:params.row.goodCount) + '人）' ;
            return h('div', text)
          }
        },
        {
          title: '良好率（人数）',
          key: 'wellCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = (params.row.wellCount && params.row.examOverCount)?((params.row.wellCount/params.row.examOverCount*100).toFixed(2)+"%") + ' （' + (params.row.wellCount===null?0:params.row.wellCount) + '人）': "0.00%"+ ' （' + (params.row.wellCount===null?0:params.row.wellCount) + '人）' ;
            return h('div', text)
          }
        },
        {
          title: '及格率（人数）',
          key: 'passCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const text = (params.row.passCount && params.row.examOverCount)?((params.row.passCount/params.row.examOverCount*100).toFixed(2)+"%") + ' （' + (params.row.passCount===null?0:params.row.passCount) + '人）': "0.00%" + ' （' + (params.row.passCount===null?0:params.row.passCount) + '人）';
            return h('div', text)
          }
        },
        {
          title: '优良率（人数）',
          key: 'excellent',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            let count = (row.goodCount?row.goodCount:0) + (row.wellCount?row.wellCount:0);
            const text = (count && params.row.examOverCount)?((count/params.row.examOverCount*100).toFixed(2)+'%')+ ' （' + count + '人）':"0.00%" + ' （' + count + '人）';
            return h('div', text)
          }
        },
        {
          title: '合格率（人数）',
          key: 'qualifiedCount',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            let count = (row.goodCount?row.goodCount:0)+(row.passCount?row.passCount:0)+(row.wellCount?row.wellCount:0);
            const text = (count && params.row.examOverCount)?((count/params.row.examOverCount*100).toFixed(2)+'%') + ' （' + count + '人）':"0.00%" + ' （' + count + '人）';
            return h('div', text)
          }
        },
      ],
      resultData:[],
      overViewColumns:[
        {
          title: '年级',
          key: 'grade',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', params.row.grade == 1 ? '一年级':
            params.row.grade==2? '二年级':
            params.row.grade ==3?'三年级':
            params.row.grade ==4?'四年级':
            params.row.grade ==5?'五年级':
            params.row.grade ==6?'六年级':
            params.row.grade ==7?'七年级':
            params.row.grade ==8?'八年级':
            params.row.grade ==9?'九年级':
            params.row.grade ==10?'高一':
            params.row.grade ==11?'高二':
            params.row.grade ==12?'高三':'全校')
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
          title: '平均分',
          key: 'examScore',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            return h('div', params.row.examScore/100)
          }
        },
        {
          title: '优秀率（人数）',
          key: 'goodCount',
          minWidth:100,
          align: 'center',
          render: (h, params) => {
            const text = `${params.row.examOverCount <= 0? "0.00" : (params.row.goodCount/params.row.examOverCount*100).toFixed(2)}%` + ' （' + params.row.goodCount + '人）'
            return h('div', text)
          }
        },
        {
          title: '良好率（人数）',
          key: 'wellCount',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            const row = params.row
            const text = `${params.row.examOverCount <= 0? "0.00" : (params.row.wellCount/params.row.examOverCount*100).toFixed(2)}%` + ' （' + params.row.wellCount + '人）'
            return h('div', text)
          }
        },
        {
          title: '及格率（人数）',
          key: 'passCount',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            const text = `${params.row.examOverCount <= 0? "0.00" : (params.row.passCount/params.row.examOverCount*100).toFixed(2)}%` + ' （' + params.row.passCount + '人）'
            return h('div', text)
          }
        },
        {
          title: '优良率（人数）',
          key: 'excellent',
          align: 'center',
          minWidth:100,
          render: (h, params) => {
            const row = params.row
            let count = row.goodCount+row.wellCount;
            let text = params.row.examOverCount <= 0?"0.00%":(count/params.row.examOverCount*100).toFixed(2)+'%';
            text = text + ' （' + count + '人）'
            return h('div', text)
          }
        },
        {
          title: '合格率（人数）',
          key: 'qualifiedCount',
          align: 'center',
          minWidth:100,

          render: (h, params) => {
            const row = params.row
            let count = row.goodCount+row.passCount+row.wellCount;
            let text = params.row.examOverCount <= 0?"0.00%": (count/params.row.examOverCount*100).toFixed(2)+'%';
            text = text + ' （' + count + '人）'
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
      total: 0,
      examTypeList: [{
        id: '2', val: "运动技能"
      },{
        id: '3', val: "体能"
      }],
      selectTabName: '2'
    }
  },
  methods: {
    pageToList() {
      this.$router.go(-1)
    },
    toDetail(item) {
      var vm = this;
      sessionStorage.setItem("examQueryClass_grade",item.grade);
      sessionStorage.setItem("examQueryClass_examType",vm.selectTabName);
      this.$router.push({ name: "examQueryClass" });
    },
    querySearch(){
      this.pageNum = 1;
      this.pageNo = 1
      // this.search();
    },
    search() {
      var vm = this
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
      let url =
        this.$axios.defaults.baseURL +
        '/v1/exam/exportExamGradeData?schoolId=1&token=' + sessionStorage.getItem('token')+ '&examType=' + vm.selectTabName
        window.open(url)
    },
    drawGenSLine() {
      var vm = this;
      vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      vm.option1 = {
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
              data: ['完成率','未参加率','已参加未完成率']
          },
          series : [
              {
                  name: '占比',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[
                      {value:vm.resultData[0].examOverCount, name:'完成率'},
                      {value:vm.resultData[0].examNotStartCount, name:'未参加率'},
                      {value:vm.resultData[0].examStartNotOverCount, name:'已参加未完成率'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal:{
                            color:function(params) {
                            var colorList = [
                                    '#4fa995', '#f1d776', '#e99954',
                                ];
                                return colorList[params.dataIndex]
                              }
                          }
                  },
                  label:{
                      show: true,
                      formatter:'{b} : ({d}%)'
                  },
              }
          ]
      };
      vm.myChart1.setOption(vm.option1)
    },
    drawGenSLine2() {
      var vm = this;
      vm.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      vm.option2 = {
          title : {
              text: '等级情况图形分布',
              subtext: '',
              x:'center'
          },
          tooltip : {
              trigger: 'item',
              formatter: "{a} <br/>{b} : {d}%"
          },
          legend: {
              orient: 'vertical',
              left: 'left',
              data: ['优秀率','良好率','及格率','不及格率']
          },
          series : [
              {
                  name: '占比',
                  type: 'pie',
                  radius : '55%',
                  center: ['50%', '50%'],
                  data:[
                      {value:vm.resultData[0].goodCount , name:'优秀率',itemStyle:{}},
                      {value:vm.resultData[0].wellCount , name:'良好率'},
                      {value:vm.resultData[0].passCount , name:'及格率'},
                      {value:vm.resultData[0].notPassCount , name:'不及格率'}
                  ],
                  itemStyle: {
                      emphasis: {
                          shadowBlur: 10,
                          shadowOffsetX: 0,
                          shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal:{
                        color:function(params) {
                        var colorList = [
                               '#4abce4','#699bc9','#bdd685','#95c685'
                            ];
                            return colorList[params.dataIndex]
                          }
                      }
                  },
                  label:{
                      show: true,
                      formatter:'{b} : ({d}%)'
                  },
              }
          ]
      };
      vm.myChart2.setOption(vm.option2)
    },
    drawBar1() {
      var vm = this;
      vm.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      vm.option3 = {
          title:{
              // text: '平均分',
              subtext: ''
          },
          color:'#00C693',
          xAxis: {
              type: 'category',
              name:'年级',
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
      };
      vm.myChart3.setOption(vm.option3)
    },
    drawBar2() {
      var vm = this;
      vm.myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      vm.option4 = {
          title:{
              // text: '合格率',
              subtext: ''
          },
          color:'#00C693',
          xAxis: {
              type: 'category',
              name:'年级',
              data: vm.scorexAxisData
          },
          yAxis: {
              type: 'value',
              name:'%'
          },
          series: [{
              data: vm.passSeriesData,
              barCategoryGap:'50%',//柱图间距
              barWidth : 60,//柱图宽度
              type: 'bar',
              label:{
                show:true,
                position:'top'
              }
          }]
      };
      vm.myChart4.setOption(vm.option4)
    },
    search(){
      let vm =this
      let examType = vm.selectTabName;
      this.$axios
        .get('/v1/exam/queryStudentExamData?selectType=0&examType='+ examType)
        .then(res => {
          if (res.data.code == 10000) {
            this.resultData = res.data.response
            this.drawGenSLine()
            this.drawGenSLine2()
            this.$axios
              .get('/v1/exam/queryStudentExamData?selectType=1&examType='+ examType)
              .then(res => {
                if (res.data.code == 10000) {
                  if(res.data.response && res.data.response.length>0){
                    this.scorexAxisData = []
                    this.scoreseriesData = []
                    this.passSeriesData = []
                    this.overViewData = res.data.response
                    for(let val of this.overViewData){
                      val.examScore=val.examScore==null?0:val.examScore;
                      this.scorexAxisData.push(val.grade == 1 ? '一年级':val.grade==2? '二年级':val.grade ==3?'三年级':val.grade ==4?'四年级':val.grade ==5?'五年级':val.grade ==6?'六年级':val.grade ==7?'七年级':val.grade ==8?'八年级':val.grade ==9?'九年级':val.grade ==10?'高一':val.grade ==11?'高二':val.grade ==12?'高三':'全校')
                      this.scoreseriesData.push(val.examScore/100)
                      let passAll= val.goodCount+val.wellCount+val.passCount;
                      this.passSeriesData.push(passAll == 0? passAll : Math.floor(passAll/val.examOverCount*100))
                    }
                    this.drawBar1()
                    this.drawBar2()
                  }else{
                    this.overViewData = []
                  }
                }
              })
          }
        })
    },
    selectTabs(name){
      this.selectTabName = name;
      this.search();
    }
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
    this.schoolYear = SchoolYear
    this.search()
  }
}
</script>
