<style>
  .fontBolds{
    font-size:36px;
    font-family:DINPro;
    font-weight:500;
    color:rgba(81,90,110,1);
  }
  .lenged{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height:60px;
    width:476px;
  }
  .lendRarp{
    width:14px;
    height:14px;
  }
  .c1{background:#DB465F;}
  .c2{background:#E48129;}
  .c3{background:#EFCE54;}
  .c4{background:#28957B;}
  .lengens{
    width:452px;
    height:100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom:1px solid #CBCBCB;
  }
  .demo-spin-icon-load{
      animation: ani-demo-spin 1s linear infinite;
  }
    @keyframes ani-demo-spin {
      from { transform: rotate(0deg);}
      50%  { transform: rotate(180deg);}
      to   { transform: rotate(360deg);}
  }
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">课程监测数据</h2>
    </div>
    <div v-if="openStatus && classList !=null && classList.length>0" >
    <Card>
      <Tabs type="card" v-model="selectTabName" @on-click="selectTabs" >
          <TabPane :name="classInfo.studentClassName"  v-for="(classInfo,index) in classList" :key="index" :label="classInfo.studentClassName "></TabPane>
      </Tabs>
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span>切换课节 ：</span>
                    <Select v-model="model1" style="width:200px" placeholder="请选择课节" @on-change="selectedFun">
                        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" style="margin-left:40px;"  @click="exportSchoolTestData">导出报告</Button>
                <Button type="success" style="margin-left:40px;"  @click="getDeviceClassStatus">实时心率监测</Button>
            </div>
        </div>
    </Card>
    <Card style="margin-top:20px;">
      <span style="margin-right:50px;">年级 ：{{gradeName}}</span>
      <span style="margin-right:50px;">班级：{{className}}班</span>
      <span style="margin-right:50px;">监控课程类型：体育课</span>
      <span style="margin-right:50px;">课节时间：{{selectTime}}</span>
      <span style="margin-right:50px;">监控时间：{{overview.startMonitorTime}}{{overview.startMonitorTime?'~':''}}{{overview.endMonitorTime }}</span>
      <span style="margin-right:50px;">班级总人数：{{classData.totalStudent}}</span>
      <span style="margin-right:50px;">未监测人数：{{notmonitor}}</span>
    </Card>
    <Card style="margin-top:20px;font-size:18px;">
      <div style="font-size:18px;height:40px;">
              数据概览
          </div>
      <div style="padding:0 75px 0 95px;box-sizing:border-box">
        <Row style="height:100px;display:flex;align-items:center">
          <Col span="8">
            <div style="text-align: center;">
              <p><span class="fontBolds">{{overview.hAverage}}</span><span>bpm</span></p>
              <p>平均心率</p>
            </div>
          </Col>
          <Col span="8">
            <div style="text-align: center;border-left:1px solid #F0F0F0;border-right:1px solid #F0F0F0;">
              <p><span class="fontBolds">{{overview.grilHAverage}}</span><span>bpm</span></p>
              <p>女生平均心率</p>
            </div>
          </Col>
          <Col span="8">
            <div style="text-align: center;">
              <p><span class="fontBolds">{{overview.boyHAverage }}</span><span>bpm</span></p>
              <p>男生平均心率</p>
            </div>
          </Col>
        </Row>
        <div style="height:2px;background:#F0F0F0;"></div>
        <Row style="height:100px;display:flex;align-items:center">
          <Col span="8">
            <div style="text-align: center;">
              <p class="fontBolds">{{overview.stepAverage }}</p>
              <p>平均运动步数</p>
            </div>
          </Col>
          <Col span="8">
            <div style="text-align: center;border-left:1px solid #F0F0F0;border-right:1px solid #F0F0F0;">
              <p class="fontBolds">{{(overview.kilometreAverage/1000).toFixed(2)}}</p>
              <p>平均运动距离（公里）</p>
            </div>
          </Col>
          <Col span="8">
            <div style="text-align: center;">
              <p class="fontBolds">{{(overview.calorieAverage/1000).toFixed(0)}}</p>
              <p>平均消耗卡路里</p>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
    <Card style="margin-top:20px;">
      <div style="font-size:20px;height:40px;">班级平均心率区间统计</div>
      <div :style="{backgroundColor:'#FFFFFF'}">
        <Row>
          <Col span="12">
            <div id="myChart1" :style="{width: '100%', height: '300px',display:'inline-block'}"></div>
          </Col>
          <Col span="12">
            <div style="height:'300px';padding-top:20px">
              <div class="lenged" v-for="(item,index) in lengend" :key="item.stand">
                <span :class="['lendRarp', index==0?'c1':index==1?'c2':index==2?'c3':index==3?'c4':'']"></span>
                <div class="lengens">
                  <div>{{item.stand}}</div>
                  <div><span>{{item.count}}人</span><span style="margin-left:49px">{{item.proportion}}%</span></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Card>
    <div style="display:flex;justify-content:space-between;margin-top:20px">
      <div style="width:49%;height:464px;background:#FFF;" id="myChart2" ></div>
      <div style="width:49%;height:464px;background:#FFF" id="myChart3" > </div>
    </div>
    <div style="display:flex;justify-content:space-between;margin-top:20px">
      <div style="width:49%;height:464px;background:#FFF;" id="myChart4" ></div>
      <div style="width:49%;height:464px;background:#FFF" id="myChart5" > </div>
    </div>
    <Card style="margin-top:20px">
      <div style="font-size:18px;height:40px;">数据明细</div>
      <Row>
        <div style="">
          <Table border :loading="loading" max-height="530" :columns="resultColumns" :data="resultData"></Table>
        </div>
        <br>
        <!-- <div style="float: right;">
          <Page :total="total" :current="pageNum" :page-size="pageSize" @on-change='pageNumChange' @on-page-size-change='pageSizechange' show-total show-sizer></Page>
        </div> -->
      </Row>
    </Card>
   </div>
    <div v-if="!openStatus">
      <Card :dis-hover="true" style="width:100%;height:700px;">
        <div style="margin-top:340px;text-align: center;">
          <span >学校未开启手环监测教学模式</span>
        </div>
      </Card>
    </div>
    <div v-if="openStatus && (classList ==null || classList.length <= 0)">
      <Card :dis-hover="true" style="width:100%;height:700px;">
        <div style="margin-top:340px;text-align: center;">
          <span >当前没有您的课程班级数据</span>
        </div>
      </Card>
    </div>
    <Modal v-model="deviceModal" width="360">
        <p slot="header" style="color:#f60;text-align:center">
            <Icon type="ios-information-circle"></Icon>
            <span>提醒</span>
        </p>
        <div style="text-align:center">
           <p v-if="deviceStatus==1">课堂监测未开启，请在小马健康教师端开启。</p>
            <p v-if="deviceStatus==2">课堂监测已结束。</p>
        </div>
        <div slot="footer">
            <Button type="error" size="large" long  @click="cancle">知道了</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
export default {
  name: "courseMonitoring",
  data() {
    return {
      deviceModal:false,
      deviceStatus:'',
      openStatus:false,
      classAllList: ["一年级", "二年级", "三年级", "四年级", "五年级", "六年级", "七年级", "八年级", "九年级", "高一", "高二", "高三", "大一", "大二", "大三", "大四"],
      className:'',
      gradeName:'',
      selectTabName:'',
      selectTime:'',
      classLearnId:'',
      classList:[],
      cityList: [],
      model1: null,
      myChart1:null,
      option1:{},
      myChart2:null,
      option2:{},
      myChart3:null,
      option3:{},
      myChart4:null,
      option4:{},
      myChart5:null,
      option5:{},
      loading:false,
      resultColumns: [],
      resultData: [],
      columns1: [
        {
          title: '姓名',
          key: 'studentName',
          align: 'center'
        },
        {
          title: '平均心率（bpm）',
          key: 'hAverage',
          align: 'center'
        },
      {
          title: '平均运动强度',
          key: 'hAverage',
          align: 'center',
          render: (h, params) => {
              const row = params.row
              const text = row.hAverage?(row.hAverage/(220 -(this.nowGrade+5))*100).toFixed(0) + '%':''
              return h("span",text)
          }
      },
        {
          title: '心率最高值（bpm）',
          key: 'hTop',
          align: 'center'
        },
        {
          title: '心率最低值（bpm）',
          key: 'hLow',
          align: 'center'
        },
        {
          title: '运动步数',
          key: 'step',
          align: 'center',
        },
        {
          title: '运动距离（公里)',
          key: 'kilometre',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.kilometre?(row.kilometre/1000).toFixed(1):0
            return h(
              "span",
              text
            )
          }
        },
        {
          title: '消耗卡路里（kcal）)',
          key: 'calorie',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const text = row.calorie?(row.calorie/1000).toFixed(0):0
            return h(
              "span",
              text
            )
          }
        },
        {
          title: '心率状态',
          key: 'monitorStatus',
          align: 'center',
          render: (h, params) => {
            const row = params.row
            const color = row.monitorStatus== 1 ?  'black': row.monitorStatus== "0" ?  'black':'red'
            const text = row.monitorStatus ==1 ? '正常' :row.monitorStatus=="0" ? '未监测' : '异常'
            return h(
              "span",
              {
                style: {
                  color:color
                }
              },
              text
            )
          }
        },
          {
              title: "操作",
              key: "action",
              align: "center",
              minWidth: 120,
              render: (h, params) => {
                  const row = params.row;
                  return h("div", [
                      h(
                          "Button",
                          {
                              props: {
                                  type: "success"
                              },
                              style: {
                                  marginRight: "10px"
                              },
                              on: {
                                  click: () => {
                                      this.toDetail(row.studentId);
                                  }
                              }
                          },
                          "查看心率走势"
                      )
                  ]);
              }
          }
      ],
      overview:{
        "boyHAverage": 0,
        "calorieAverage": 0,
        "endMonitorTime": "",
        "grilHAverage": 0,
        "hAverage": 0,
        "kilometreAverage": 0,
        "startMonitorTime": "",
        "stepAverage": 0,
      },
      lengend:[
        {
          stand: '170bpm以上',
          count:0,
          proportion:'0'
        },
        {
          stand: '141bpm - 169bpm ',
          count:0,
          proportion:'0'
        },
        {
          stand: '121bpm - 140bpm',
          count:0,
          proportion:'0'
        },
        {
          stand: '120bpm以下',
          count:0,
          proportion:'0'
        },
      ],
      // pageNum: 1,
      // pageSize: 10,
      total: 0,
      studentNameAll:[],
      averageHeartRate:[],
      stepList:[],
      dsistanceMotion:[],
      calorieList:[],
      classData:{},
      notmonitor:0,
      nowGrade: ''
    };
  },
  methods: {
      toDetail(studentId){
          sessionStorage.setItem("classMonitoringData-classMonitoringStudentDetail-studentId", studentId);
          sessionStorage.setItem("classMonitoringData-classMonitoringStudentDetail-classLearnId", this.model1);
          sessionStorage.setItem("classMonitoringData-classMonitoringStudentDetail-selectTime", this.selectTime);
          sessionStorage.setItem("classMonitoringData-classMonitoringStudentDetail-scrollIndex", document.getElementsByClassName('single-page-con')[0].scrollTop);
          this.$router.push({ name: "classMonitoringStudentDetail" });
      },
    toWebScoket(){

    },
    cancle(){
      var vm=this;
      vm.deviceModal=false
    },
      selectTabs (name) {
          let vm = this;
          vm.selectTabName = name;
          for (let i = 0; i < vm.classList.length; i++) {
              if (name === vm.classList[i].studentClassName) {
                  vm.classId = vm.classList[i].classId;
                  vm.querySearch(vm.classId, '1');
                  localStorage.setItem('SELECT-CLASS-TAB-NAME', name);
              }
          }
      },
    selectedFun(value){
      let vm =this;
      // console.log(value)
      if(value){
          let newArr = vm.cityList.filter((val,index,arr) => {
              return val.value==value;
          });
          if(newArr){
            vm.selectTime=newArr[0].label
          }
      }
    },
    getWristbandTypeBySchoolId() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getWristbandTypeBySchoolId")
        .then(function(response) {
          let data = response.data.response;
          if (data == "1" || data == "2") {
            vm.openStatus = true;
          } else {
            vm.openStatus = false;
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSportsClassLearn(){
      let vm =this;

      this.$axios
        .get("/v1/devicewristband/queryDeviceMonitorSportsClassLearn?classLearnId="+this.model1+"&classId="+vm.classId)
        .then(function(res) {
          vm.overview = res.data.response;
          vm.resultColumns = vm.columns1
          vm.resultData =  res.data.response.studentList
          vm.total = res.data.response.studentList.length
          let level1 = [],level2=[],level3=[],level4=[],studentNameAll=[],averageHeartRate=[],stepList=[],dsistanceMotion=[],calorieList=[];
          let notmonitor=0;
          for (let val of res.data.response.studentList){
            val.studentName = val.studentName.length > 10 ? val.studentName.slice(0, 10)+'...' : val.studentName
            val.hAverage == null ? 0 : val.hAverage;
            if (val.hAverage && val.hAverage >= 170) { level1.push(val.hAverage)}
            if (val.hAverage && val.hAverage >= 141 && val.hAverage <= 169) { level2.push(val.hAverage)}
            if (val.hAverage && val.hAverage >= 121 && val.hAverage <= 140) { level3.push(val.hAverage)}
            if (val.hAverage && val.hAverage <= 120) { level4.push(val.hAverage)}
            studentNameAll.push(val.studentName)
            averageHeartRate.push(val.hAverage==null?0:val.hAverage)
            stepList.push(val.step ==null?0:val.step )
            dsistanceMotion.push(val.kilometre ==null?0:(val.kilometre/1000).toFixed(2)  )
            calorieList.push(val.calorie  ==null?0:(val.calorie/1000 ).toFixed(0))
            if(val.monitorStatus=="0"){
              notmonitor+=1;
            }
          }
          vm.notmonitor=notmonitor;
          vm.lengend[0].count = level1.length>0?level1.length:0;
          vm.lengend[1].count = level2.length>0?level2.length:0;
          vm.lengend[2].count = level3.length>0?level3.length:0;
          vm.lengend[3].count = level4.length>0?level4.length:0;
          let allCount= vm.lengend[0].count+ vm.lengend[1].count+ vm.lengend[2].count+ vm.lengend[3].count
          if(allCount==0){
            allCount=1
          }
          vm.lengend[0].proportion = ((vm.lengend[0].count / allCount)*100).toFixed(2);
          vm.lengend[1].proportion = ((vm.lengend[1].count / allCount)*100).toFixed(2);
          vm.lengend[2].proportion = ((vm.lengend[2].count / allCount)*100).toFixed(2);
          vm.lengend[3].proportion = ((vm.lengend[3].count / allCount)*100).toFixed(2);
          vm.studentNameAll = studentNameAll
          vm.averageHeartRate = averageHeartRate
          vm.stepList = stepList
          vm.dsistanceMotion = dsistanceMotion
          vm.calorieList = calorieList
          vm.drawGenSLine()
          vm.dynamic1()
          vm.dynamic2()
          vm.dynamic3()
          vm.dynamic4()
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getTeacherClassInfo() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getTeacherClassInfo")
        .then(function(response) {
          let data = response.data.response;
            vm.classList=data?data:[]
            if(data && data.length>0){
                vm.classLearnId = data ? data[0].classId : '';
                // vm.selectTabs(data[0].studentClassName);
                let tabName = localStorage.getItem('SELECT-CLASS-TAB-NAME');
                if (tabName !== null && tabName !== undefined) {
                    vm.selectTabs(tabName);
                } else {
                    vm.selectTabs(data[0].studentClassName);
                }
            }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getClassBaseInfo(classId) {
      var vm = this;
      this.$axios
        .get("/v1/devicewristband/getClassBaseInfo?classId="+classId)
        .then(function(response) {
          let data = response.data.response;
          vm.classData=data?data:{};
          if(!vm.classData){
              vm.nowGrade = vm.classData.grade
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    querySearch(classId,type){
      var vm = this;
      vm.getClassBaseInfo(vm.classId);
      this.$axios
        .get("/v1/devicewristband/querySclassSportsLearnList?classId="+classId)
        .then(function(response) {
          let newArr = response.data.response.map((val,index,arr) => {
              let json = {};
              json.value = val.classLearnId;
              json.grade = val.grade;
              json.studentClass = val.studentClass;
              json.label = `${val.learnDay}   第${val.planLearn }节`;
              return json;
          });
          vm.cityList = newArr?newArr:[]
        //  console.log(newArr)
            vm.gradeName = vm.selectTabName.substring(0,3)
            vm.className = vm.selectTabName.substring(3,4)
          if(newArr.length>0){
            if(type==='1'){
              let curr = sessionStorage.getItem('classMonitoringData-classMonitoringStudentDetail-classLearnId');
              if (curr !== null && curr !== undefined) {
                vm.model1 = parseInt(curr);
                  sessionStorage.removeItem('classMonitoringData-classMonitoringStudentDetail-classLearnId');
              } else {
                vm.model1 = newArr[0].value;
              }
              vm.selectTime = newArr[0].label;
            }
            vm.getSportsClassLearn()
          }else{
            let overview={
            "boyHAverage": 0,
            "calorieAverage": 0,
            "endMonitorTime": "",
            "grilHAverage": 0,
            "hAverage": 0,
            "kilometreAverage": 0,
            "startMonitorTime": "",
            "stepAverage": 0,
          };
          vm.model1="";
          vm.selectTime='',
          vm.overview=overview;
           vm.lengend[0].count = 0;
          vm.lengend[1].count = 0;
          vm.lengend[2].count = 0;
          vm.lengend[3].count = 0;
          vm.lengend[0].proportion =0 ;
          vm.lengend[1].proportion = 0;
          vm.lengend[2].proportion = 0;
          vm.lengend[3].proportion = 0;

          vm.studentNameAll = []
          vm.averageHeartRate =[]
          vm.stepList = []
          vm.dsistanceMotion = []
          vm.calorieList = []
          vm.drawGenSLine()
          vm.dynamic1()
          vm.dynamic2()
          vm.dynamic3()
          vm.dynamic4()
          vm.resultData=[]
          }

        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getDeviceClassStatus(){
      var vm = this;
      if(!vm.model1){
         vm.$Message.info('请选择需要监控的课节！');
         return false;
      }
      this.$axios
        .get("/v1/devicewristband/getDeviceClassStatus?classLearnId="+vm.model1)
        .then(function(response) {
          let data=response.data
          if(data.code==10000){
            vm.deviceStatus=data.response.data;
            if(vm.deviceStatus!="3"){
              vm.deviceModal=true
            }else{
              let url=vm.$axios.defaults.answerUrl+"heart-rate-detection/index.html?schoolId="+sessionStorage.getItem("schoolId")+"&classLearnId="+vm.model1+"&socketName="+new Date().getTime()
              window.open(url)
            }
          }else{
            vm.$Message.info(response.data.msg);
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    exportSchoolTestData(){
      var vm=this;
      let url = this.$axios.defaults.baseURL +
        "/v1/devicewristband/exportClassMonitoringData?classLearnId="+vm.model1+"&classId="+vm.classId+"&selectTime="+vm.selectTime+
        "&token=" +sessionStorage.getItem("token");
      window.open(url)
    },
    drawGenSLine() {
      var vm = this;
      vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      vm.option1 = {
          tooltip: {
            trigger: 'item',
            formatter: "{c}人({d}%)"
          },
          series : [
              {
                  name: '人数占比',
                  type: 'pie',
                  radius: '70%',
                  center: ['50%', '50%'],
                  data: [
                    { value: vm.lengend[0].count, name: '170bpm以上' },
                    { value: vm.lengend[1].count, name: '141bpm - 169bpm ' },
                    { value: vm.lengend[2].count, name: '121bpm - 140bpm' },
                    { value: vm.lengend[3].count, name: '120bpm以下' }
                  ],
                  itemStyle: {
                      emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                      },
                      normal:{
                        label: {
                          show: true,
                          formatter: '{d}%'
                        },
                        labelLine: { show: true },
                        color:function(params) {
                        var colorList = [
                              '#DB465F', '#E48129', '#EFCE54', '#28957B'
                            ];
                            return colorList[params.dataIndex]
                          }
                      }
                  }
              }
          ]
      };
      vm.myChart1.setOption(vm.option1)
    },
    dynamic1() {
      var vm = this;
      vm.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      vm.option2 = {
        color: ['#209C7F'],
        title : {
            top:'1%',
            left:'2%',
            text: '班级每位学生体育课平均心率',
            subtext: '',
            x:'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: '',
                label: {
                    show: true
                }
            }
        },
        calculable : true,
        grid: {
            bottom: '2%',
            left: '1%',
            right: '1%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                show: true,
                rotate:-45,
                interval:0
              },
                data : vm.studentNameAll
            }
        ],
        yAxis: [
          {
              type: 'value',
              name : 'bpm',
              scale: true,
              min: 0,
              max:200,
              splitNumber: 5,
              splitLine: {
                lineStyle: {
                  color: '#BFC9CE',
                  type: 'dotted'
                }
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: true
              },
              axisTick: {
                show: false
              }
          }
        ],
        dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 10,
              end: 90,
              orient:'horizontal',
              zoomLock:true
            }
        ],
        series : [
            {
                name: '',
                type: 'bar',
                // barWidth : 0,//柱图宽度
                barCategoryGap:'50%',//柱图间距
                data: vm.averageHeartRate,
                label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            }
        ]
      };
      vm.myChart2.setOption(vm.option2)
    },
    dynamic2() {
      var vm = this;
      vm.myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      vm.option3 = {
        color: ['#209C7F'],
        title : {
            top:'1%',
            left:'2%',
            text: '班级每位学生体育课运动步数',
            subtext: '',
            x:'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: '',
                label: {
                    show: true
                }
            }
        },
        calculable : true,
        grid: {
            bottom: '2%',
            left: '1%',
            right: '1%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  rotate:-45,
                  interval:0
                },
                data : vm.studentNameAll
            }
        ],
        yAxis: [
          {
              type: 'value',
              name : '步',
              scale: true,
              min: 0,
              // minInterval: 1,//坐标轴显示成整数
              // max:200,
              splitNumber: 5,
              splitLine: {
                lineStyle: {
                  color: '#BFC9CE',
                  type: 'dotted'
                }
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: true
              },
              axisTick: {
                show: false
              }
          }
        ],
        dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 10,
              end: 90,
              orient:'horizontal',
              zoomLock:true
            }
        ],
        series : [
            {
                name: '',
                type: 'bar',
                // barWidth : 30,//柱图宽度
                barCategoryGap:'50%',//柱图间距
                data: vm.stepList,
                label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            }
        ]
      };
      vm.myChart3.setOption(vm.option3)
    },
    dynamic3() {
      var vm = this;
      vm.myChart4 = this.$echarts.init(document.getElementById("myChart4"));
      vm.option4 = {
        color: ['#209C7F'],
        title : {
            top:'1%',
            left:'2%',
            text: '班级每位学生体育课运动距离',
            subtext: '',
            x:'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: '',
                label: {
                    show: true
                }
            }
        },
        calculable : true,
        grid: {
            bottom: '2%',
            left: '1%',
            right: '1%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  rotate:-45,
                  interval:0
                },
                data : vm.studentNameAll
            }
        ],
        yAxis: [
          {
              type: 'value',
              name : 'km',
              scale: true,
              min: 0,
              // max:200,
              splitNumber: 5,
              splitLine: {
                lineStyle: {
                  color: '#BFC9CE',
                  type: 'dotted'
                }
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: true
              },
              axisTick: {
                show: false
              }
          }
        ],
        dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 10,
              end: 90,
              orient:'horizontal',
              zoomLock:true
            }
        ],
        series : [
            {
                name: '',
                type: 'bar',
                // barWidth : 30,//柱图宽度
                barCategoryGap:'50%',//柱图间距
                data: vm.dsistanceMotion,
                label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            }
        ]
      };
      vm.myChart4.setOption(vm.option4)
    },
    dynamic4() {
      var vm = this;
      vm.myChart5 = this.$echarts.init(document.getElementById("myChart5"));
      vm.option5 = {
        color: ['#209C7F'],
        title : {
            top:'1%',
            left:'2%',
            text: '班级每位学生体育课消耗卡路里',
            subtext: '',
            x:'left'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer: {
                type: '',
                label: {
                    show: true
                }
            }
        },
        calculable : true,
        grid: {
            bottom: '2%',
            left: '1%',
            right: '1%',
            containLabel: true
        },
        xAxis: [
            {
                type : 'category',
                axisLine: {
                  show: false
                },
                axisTick: {
                  show: false
                },
                axisLabel: {
                  show: true,
                  rotate:-45,
                  interval:0
                },
                data : vm.studentNameAll
            }
        ],
        yAxis: [
          {
              type: 'value',
              name : 'kcal',
              scale: true,
              min: 0,
              // max:200,
              splitNumber: 5,
              splitLine: {
                lineStyle: {
                  color: '#BFC9CE',
                  type: 'dotted'
                }
              },
              axisLine: {
                show: false
              },
              axisLabel: {
                show: true
              },
              axisTick: {
                show: false
              }
          }
        ],
        dataZoom: [
            {
              type: 'inside',
              show: true,
              start: 10,
              end: 90,
              orient:'horizontal',
              zoomLock:true
            }
        ],
        series : [
            {
                name: '',
                type: 'bar',
                // barWidth : 30,//柱图宽度
                barCategoryGap:'50%',//柱图间距
                data: vm.calorieList ,
                label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            }
        ]
      };
      vm.myChart5.setOption(vm.option5)
    },
    //loading
    handleSpinCustom () {
        this.$Spin.show({
            render: (h) => {
                return h('div', [
                    h('Icon', {
                        'class': 'demo-spin-icon-load',
                        props: {
                            type: 'ios-loading',
                            size: 18
                        }
                    }),
                    h('div', 'Loading')
                ])
            }
        });
        setTimeout(() => {
            this.$Spin.hide();
        }, 2000);
    }
  },
  watch: {
      model1:function(){
          var vm=this;
          if(vm.model1){
              vm.querySearch(vm.classId,'2');
          }
      },
      // selectTabName:function(){
      //     var vm=this;
      //     if(vm.model1){
      //         vm.querySearch();
      //     }
      // }
  },
  created() {},
  mounted() {
    let vm = this;
    let historyIndex = sessionStorage.getItem("classMonitoringData-classMonitoringStudentDetail-scrollIndex");
    if(historyIndex&&historyIndex>0){
      this.handleSpinCustom()
    }
    let backFlag = localStorage.getItem('RETURN_TO_CLASS_MONITORING');
    if (backFlag !== null) {
        vm.selectTabName = localStorage.getItem('SELECT-CLASS-TAB-NAME');
        localStorage.removeItem('RETURN_TO_CLASS_MONITORING');
    } else {
        localStorage.removeItem('SELECT-CLASS-TAB-NAME');
        sessionStorage.removeItem('classMonitoringData-classMonitoringStudentDetail-classLearnId');
    }
    vm.getWristbandTypeBySchoolId();
    vm.getTeacherClassInfo();
    setTimeout(()=>{
      if(historyIndex&&historyIndex>0){
        vm.$parent.fatherMethod();
      }
    },500)
  }
};
</script>
