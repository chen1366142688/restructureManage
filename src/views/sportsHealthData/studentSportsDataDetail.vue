<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">{{studentInfo.studentName}}</h2>
    </div>
    <div >
      <Card :dis-hover="true">
        <div class="top-search">
            <div class="left-input">
                <div style="margin:5px 20px;">
                    <span style>年级：{{studentInfo.gradeName}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：{{studentInfo.studentClass}}班</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：{{studentInfo.gender==1?"男":"女"}}</span>
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：{{studentInfo.registerCode}}</span>
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="pageToLast">返回</Button>
                <Button type="success" style="margin-left:40px;" @click="exportModel">导出EXCEL</Button>
            </div>
        </div>
      </Card>
      <Tabs style="margin-top:20px;" :value="selectTabName" @on-click="selectTabs"  type="card" >
        <TabPane name="体育课监测" label="体育课监测">
              <Card :dis-hover="true" style="width:49%;display: inline-table;">
                  <p style="font-weight: bold;text-align:center">总数据</p>
                  <div style="margin-top:20px;">
                  <Row>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsTotalInfo.totalClass?sportsTotalInfo.totalClass:"-"}}</p>
                      <p>总课时</p>
                      </div>
                      </Col>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsTotalInfo.heartRate?sportsTotalInfo.heartRate:"-"}}</p>
                      <p>平均心率</p>
                      </div >
                      </Col>
                  </Row>
                  <Row>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsTotalInfo.stepNum?sportsTotalInfo.stepNum:"-"}}</p>
                      <p>运动步数累计</p>
                      </div>
                      </Col>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsTotalInfo.distance?(sportsTotalInfo.distance/1000).toFixed(1):"-"}}</p>
                      <p>运动距离累计（公里）</p>
                      </div >
                      </Col>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsTotalInfo.calories?(sportsTotalInfo.calories/1000).toFixed(0):"-"}}</p>
                      <p>消耗卡路里累计</p>
                      </div >
                      </Col>
                  </Row>
              </div>
              </Card>
              <Card :dis-hover="true" style="width:49%;display: inline-table;float:right">
                  <p style="font-weight: bold;text-align:center">上节课({{lastClass.dateTime}}第{{lastClass.classSort}}节)</p>
                  <div style="margin-top:20px;">
                  <Row>
                      <Col span="12">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{lastClass.heartRate?lastClass.heartRate:"-"}}</p>
                      <p>平均心率</p>
                      </div>
                      </Col>
                      <Col span="12">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{lastClass.stepNum?lastClass.stepNum:"-"}}</p>
                      <p>运动步数</p>
                      </div >
                      </Col>
                  </Row>
                  <Row>
                      <Col span="12">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{lastClass.distance?(lastClass.distance/1000).toFixed(1):"-"}}</p>
                      <p>运动距离（公里）</p>
                      </div>
                      </Col>
                      <Col span="12">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{lastClass.calories?(lastClass.calories/1000).toFixed(0):"-"}}</p>
                      <p>消耗卡路里</p>
                      </div >
                      </Col>
                  </Row>
              </div>
              </Card>
            <Card :dis-hover="true" style="margin-top:20px;">
            <div>
                <Row>
                  <Col span="24">
                  <p style="font-weight: bold;">平均心率变化趋势</p>
                      <div id="myChartHeart" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>
          <Card :dis-hover="true" style="margin-top:20px;">
            <div>
                <Row>
                  <Col span="24">
                  <p style="font-weight: bold;">平均消耗卡路里变化趋势</p>
                      <div id="myChartCalories" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>
          <Card :dis-hover="true" style="margin-top:20px;">
            <div>
                <Row>
                  <Col span="24">
                      <p style="font-weight: bold;">平均运动步数变化趋势</p>
                      <div id="myChartStep" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>
          <Card :dis-hover="true" style="margin-top:20px;">
            <div>
                <Row>
                  <Col span="24">
                      <p style="font-weight: bold;">平均运动距离变化趋势</p>
                      <div id="myChartDistance" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
            </Card>
        </TabPane>
        </TabPane>
        <TabPane name="运动量" label="运动量">
              <Card :dis-hover="true" style="">
                  <p style="font-size:18px;">数据概览<span style="margin-left:20px;color:#6ACFC9">{{sportsNumStatistical.dateTime?sportsNumStatistical.dateTime:"-"}}</span></p>
                  <div style="margin-top:20px;">
                  <Row>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsNumStatistical.heartRate?sportsNumStatistical.heartRate:"-"}}</p>
                      <p>平均心率</p>
                      </div>
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsNumStatistical.stepNum?sportsNumStatistical.stepNum:"-"}}</p>
                      <p>运动步数</p>
                      </div >
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsNumStatistical.distance?sportsNumStatistical.distance:"-"}}</p>
                      <p>运动距离（公里）</p>
                      </div>
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportsNumStatistical.calories?sportsNumStatistical.calories:"-"}}</p>
                      <p>消耗卡路里</p>
                      </div >
                      </Col>
                  </Row>
              </div>
              </Card>
            <Card :dis-hover="true" style="margin-top:20px;">
              <div>
                <Row>
                  <Col span="24">
                  <p style="font-weight: bold;">{{sportsNumStatistical.dateTime?sportsNumStatistical.dateTime:"-"}}心率变化趋势</p>
                      <div id="sportsChartHeart" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>
          <Card style="margin-top:20px;">
            <span style>开始时间：</span>
                 <DatePicker v-model="startTime"   @on-change="sportStartTimeChange" format="yyyy-MM-dd" type="date" placeholder="选择开始时间" style="width: 200px"></DatePicker>
                <span style="margin-left:40px;">结束时间：</span>
                 <DatePicker  v-model="endTime"  @on-change="sportEndTimeChange" format="yyyy-MM-dd" type="date" placeholder="选择结束时间" style="width: 200px"></DatePicker>

         </Card>
          <Card :dis-hover="true" style="margin-top:20px;">
            <div>
               <p style="font-size:18px;">数据概览</p>
                  <div style="margin-top:20px;">
                  <Row>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportTimeStatistical.totalStepNum?sportTimeStatistical.totalStepNum:"-"}}</p>
                      <p>运动步数累计</p>
                      </div>
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportTimeStatistical.totalDistance?sportTimeStatistical.totalDistance:"-"}}</p>
                      <p>运动距离累计（公里）</p>
                      </div >
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportTimeStatistical.totalCalories?sportTimeStatistical.totalCalories:"-"}}</p>
                      <p>消耗卡路里累计</p>
                      </div>
                      </Col>
                  </Row>
                  <Row>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportTimeStatistical.heartRateAverage?sportTimeStatistical.heartRateAverage:"-"}}</p>
                      <p>平均心率</p>
                      </div>
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportTimeStatistical.stepNumAverage?sportTimeStatistical.stepNumAverage:"-"}}</p>
                      <p>平均运动步数</p>
                      </div >
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportTimeStatistical.distanceAverage?sportTimeStatistical.distanceAverage:"-"}}</p>
                      <p>平均运动距离（公里）</p>
                      </div>
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sportTimeStatistical.caloriesAverage?sportTimeStatistical.caloriesAverage:"-"}}</p>
                      <p>平均消耗卡路里</p>
                      </div >
                      </Col>
                  </Row>
              </div>
            </div>
          </Card>

          <Card :dis-hover="true" style="margin-top:20px;width:49%;display: inline-table;">
            <div>
                <Row>
                  <Col span="24">
                      <p style="font-weight: bold;">平均每天心率变化趋势</p>
                      <div id="one" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>
          <Card :dis-hover="true" style="margin-top:20px;width:49%;display: inline-table;">
            <div>
                <Row>
                  <Col span="24">
                      <p style="font-weight: bold;">平均每天运动步数变化趋势</p>
                      <div id="two" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>
          <Card :dis-hover="true" style="margin-top:20px;width:49%;display: inline-table;">
            <div>
                <Row>
                  <Col span="24">
                      <p style="font-weight: bold;">平均每天运动距离变化趋势</p>
                      <div id="three" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>
          <Card :dis-hover="true" style="margin-top:20px;width:49%;display: inline-table;">
            <div>
                <Row>
                  <Col span="24">
                      <p style="font-weight: bold;">平均每天消耗卡路里变化趋势</p>
                      <div id="four" :style="{width: '100%', height: '400px'}"></div>
                  </Col>
                </Row>
            </div>
          </Card>

          <Card :dis-hover="true" style="margin-top:20px;">
            <div>
                <Row>
                  <div>
                    <Table border :columns="resultColumns" :data="resultData"></Table>
                  </div>
                </Row>
            </div>
            </Card>
        </TabPane>
        <TabPane name="睡眠" label="睡眠">
              <Card :dis-hover="true" style="">
                  <p style="font-size:18px;">数据概览<span style="margin-left:20px;color:#6ACFC9">{{sleepStatistical.dataTime?sleepStatistical.dataTime:"-"}}</span></p>
                  <div style="margin-top:20px;">
                  <Row>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepStatistical.sleepTime?sleepStatistical.sleepTime:"-"}}</p>
                      <p>入睡时间</p>
                      </div>
                      </Col>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepStatistical.wakeTime?sleepStatistical.wakeTime:"-"}}</p>
                      <p>醒来时间</p>
                      </div >
                      </Col>
                  </Row>
                  <Row>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepStatistical.sleepMin?(sleepStatistical.sleepMin % 60 > 0? Math.floor(Number(sleepStatistical.sleepMin) / 60) + "小时" +(sleepStatistical.sleepMin % 60) +"分钟": Math.floor(Number(sleepStatistical.sleepMin) / 60) + "小时"):"-"}}</p>
                      <p>睡眠时长</p>
                      </div>
                      </Col>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepStatistical.lightSleepMin?(sleepStatistical.lightSleepMin % 60 > 0? Math.floor(Number(sleepStatistical.lightSleepMin) / 60) + "小时" +(sleepStatistical.lightSleepMin % 60) +"分钟": Math.floor(Number(sleepStatistical.lightSleepMin) / 60) + "小时"):"-"}}</p>
                      <p>浅睡时长</p>
                      </div >
                      </Col>
                      <Col span="8">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepStatistical.deepSleepMin?(sleepStatistical.deepSleepMin % 60 > 0? Math.floor(Number(sleepStatistical.deepSleepMin) / 60) + "小时" +(sleepStatistical.deepSleepMin % 60) +"分钟": Math.floor(Number(sleepStatistical.deepSleepMin) / 60) + "小时"):"-"}}</p>
                      <p>深睡时长</p>
                      </div>
                      </Col>
                  </Row>
              </div>
              </Card>

          <Card style="margin-top:20px;">
            <span style>开始时间：</span>
                 <DatePicker v-model="startTime1"   @on-change="sleepStartTimeChange" format="yyyy-MM-dd" type="date" placeholder="选择开始时间" style="width: 200px"></DatePicker>
                <span style="margin-left:40px;">结束时间：</span>
                 <DatePicker  v-model="endTime1"  @on-change="sleepEndTimeChange" format="yyyy-MM-dd" type="date" placeholder="选择结束时间" style="width: 200px"></DatePicker>

         </Card>
          <Card :dis-hover="true" style="margin-top:20px;">
            <div>
               <p style="font-size:18px;">数据概览</p>
                  <div style="margin-top:20px;">
                  <Row>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepTimeData.sleepMin?(sleepTimeData.sleepMin % 60 > 0? Math.floor(Number(sleepTimeData.sleepMin) / 60) + "小时" +(sleepTimeData.sleepMin % 60) +"分钟": Math.floor(Number(sleepTimeData.sleepMin) / 60) + "小时"):"-"}}</p>
                      <p>日均睡眠时长</p>
                      </div>
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepTimeData.lightSleepMin?(sleepTimeData.lightSleepMin % 60 > 0? Math.floor(Number(sleepTimeData.lightSleepMin) / 60) + "小时" +(sleepTimeData.lightSleepMin % 60) +"分钟": Math.floor(Number(sleepTimeData.lightSleepMin) / 60) + "小时"):"-"}}</p>
                      <p>日均浅睡时长</p>
                      </div >
                      </Col>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{sleepTimeData.deepSleepMin?(sleepTimeData.deepSleepMin % 60 > 0? Math.floor(Number(sleepTimeData.deepSleepMin) / 60) + "小时" +(sleepTimeData.deepSleepMin % 60) +"分钟": Math.floor(Number(sleepTimeData.deepSleepMin) / 60) + "小时"):"-"}}</p>
                      <p>日均深睡时长</p>
                      </div>
                      </Col>
                  </Row>
              </div>
            </div>
          </Card>
          <Card :dis-hover="true" style="margin-top:20px;">
            <div>
                <Row>
                  <div>
                    <Table border :columns="resultColumns1" :data="resultData1"></Table>
                  </div>
                </Row>
            </div>
            </Card>
        </TabPane>

      </Tabs>

    </div>
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolId: "",
      studentId:'',
      selectTabName: "",
      type:"1",
      studentInfo:{},
      sportsTotalInfo:{},
      lastClass:{},
      dataTime:[],
        heratLine:[],
        setpLine:[],
        distanceLine:[],
        caloriesLine:[],
        sportsNumStatistical:{},
        sportsTodayDateList:[],
        sportsTodayHeartRate:[],
        sportsStartTime:'',
        startTime:'',
        sportsEndTime:'',
        endTime:'',
        sportTimeStatistical:{},
        oneData:[],
        twoData:[],
        threeData:[],
        fourData:[],
        fourDate:[],
        resultData: [],
      resultColumns: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "平均心率（bpm）",
          key: "heartRate",
          align: "center",
          minWidth:100
        },
        {
          title: "运动步数",
          key: "heartRate",
          align: "center",
          minWidth:100
        },
        {
          title: "运动距离（公里）",
          key: "distance",
          align: "center",
          minWidth:100
        },
        {
          title: "消耗卡路里（kcal）",
          key: "calories",
          align: "center",
          minWidth:100
        },
      ],
      sleepStatistical:{},
      sleepStartTime:'',
      sleepEndTime:'',
      startTime1:'',
      endTime1:'',
      sleepTimeData:{},
      resultData1: [],
      resultColumns1: [
        {
          title: "日期",
          key: "dateTime",
          align: "center",
          minWidth:100
        },
        {
          title: "昨日入睡",
          key: "sleepTime",
          align: "center",
          minWidth:100
        },
        {
          title: "今日醒来",
          key: "wakeTime",
          align: "center",
          minWidth:100
        },
        {
          title: "睡眠时长",
          key: "sleepMin",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            let data = params.row.sleepMin;
            let test = "";
            if (data) {
              test =
                data % 60 > 0
                  ? Math.floor(Number(data) / 60) +
                    "小时" +
                    (data % 60) +
                    "分钟"
                  : Math.floor(Number(data) / 60) + "小时";
            }
            return "span", test;
          }
        },
      ],

    };
  },
  methods: {
    selectTabs(name) {
      var vm = this;
      this.selectTabName = name;
    },
    getStudentBaseInfo(studentId) {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getStudentBaseInfo?studentId="+studentId)
        .then(function(response) {
          let data = response.data.response;
          vm.studentInfo=data;
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getStudentSportsMonitoringInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getStudentSportsMonitoringInfo?studentId=" +studentId
        )
        .then(function(response) {
          let data = response.data.response;
          vm.sportsTotalInfo=data;
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getStudentLastClassInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getStudentLastClassInfo?studentId=" +studentId
        )
        .then(function(response) {
          let data = response.data.response;
          vm.lastClass=data?data:{};
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getStudentChartsInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getStudentChartsInfo?studentId=" +studentId
        )
        .then(function(response) {
          let data = response.data.response;
          vm.dealData(data);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    dealData(data){
      var vm=this;

      vm.heratLine=[];
          vm.setpLine=[];
          vm.distanceLine=[];
          vm.caloriesLine=[];
          vm.dateTimeList=[];

      if(data){
        let changeList=data.changeList;
        let dateList=data.dateList;
        for(var i=0;i<changeList.length;i++){
          vm.heratLine.push(changeList[i].heartRate?changeList[i].heartRate:0)
          vm.setpLine.push(changeList[i].stepNum?changeList[i].stepNum:0)
          vm.distanceLine.push(changeList[i].distance?changeList[i].distance:0)
          vm.caloriesLine.push(changeList[i].calories?changeList[i].calories:0)
        }

        for(var i=0;i<dateList.length;i++){
          vm.dateTimeList.push(dateList[i].dateTime+"(第"+dateList[i].classSort+"节)")
        }

      vm.drawLineHeart();
      vm.drawLineCalories();
      vm.drawLineStep();
      vm.drawLineDistance();

      }
    },
    drawLineHeart(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChartHeart'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'课程时间',
                data: vm.dateTimeList,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'bpm',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.heratLine
            }]
        });
    },
    drawLineCalories(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChartCalories'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'课程时间',
                data: vm.dateTimeList,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'kcal',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.caloriesLine
            }]
        });
    },
    drawLineStep(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChartStep'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'课程时间',
                data: vm.dateTimeList,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'步',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.setpLine
            }]
        });
    },
    drawLineDistance(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChartDistance'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'课程时间',
                data: vm.dateTimeList,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'km',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.distanceLine
            }]
        });
    },


    //运动量
    getSportsNumStatisticalInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getSportsNumStatisticalInfo?studentId=" +studentId
        )
        .then(function(response) {
          let data = response.data.response;
          vm.sportsNumStatistical=data
          if(data.dateTime){
            vm.getSportsNumHeartRate(studentId,data.dateTime)
          }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSportsNumHeartRate(studentId,dateTime) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getSportsNumHeartRate?studentId=" +studentId+"&dateTime="+dateTime
        )
        .then(function(response) {
          let data = response.data.response;
          vm.sportsTodayDateList=data.dateTime
          vm.sportsTodayHeartRate=data.heartRate
          vm.drawTodayHeart()
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    gerStudentSportsTimeInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/gerStudentSportsTimeInfo?studentId=" +studentId+"&startTime="+vm.sportsStartTime+"&endTime="+vm.sportsEndTime
        )
        .then(function(response) {
          let data = response.data.response;
          vm.sportTimeStatistical=data
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSportsNumCharts(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getSportsNumCharts?studentId=" +studentId+"&startTime="+vm.sportsStartTime+"&endTime="+vm.sportsEndTime
        )
        .then(function(response) {
          let data = response.data.response;
          vm.dealFourData(data);
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSportsNumTimeDetailList(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getSportsNumTimeDetailList?studentId=" +studentId+"&startTime="+vm.sportsStartTime+"&endTime="+vm.sportsEndTime
        )
        .then(function(response) {
          let data = response.data.response;
          vm.resultData=data
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    dealFourData(data){
      var vm=this;

       vm.oneData=[];
          vm.twoData=[];
          vm.threeData=[];
          vm.fourData=[];
          vm.fourDate=[];

      if(data){
        let changeList=data.changeList;
        let dateList=data.dateList;
        for(var i=0;i<changeList.length;i++){
          vm.oneData.push(changeList[i].heartRate)
          vm.twoData.push(changeList[i].stepNum)
          vm.threeData.push(changeList[i].distance)
          vm.fourData.push(changeList[i].calories)
        }

        for(var i=0;i<dateList.length;i++){
          vm.fourDate.push(dateList[i].dateTime.substring(5,10))
        }
      }

      vm.drawLineOne();
      vm.drawLineTwo();
      vm.drawLineThree();
      vm.drawLineFour();

    },
    drawLineOne(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('one'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'时间（天）',
                data: vm.fourDate,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'bpm',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.oneData
            }]
        });
    },
    drawLineTwo(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('two'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'时间（天）',
                data: vm.fourDate,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'步',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.twoData
            }]
        });
    },
    drawLineThree(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('three'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'时间（天）',
                data: vm.fourDate,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'km',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.threeData
            }]
        });
    },
    drawLineFour(){
        var vm=this;
        // vm.dealData(response);
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('four'))
        // 绘制图表
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'时间（天）',
                data: vm.fourDate,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'kcal',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.fourData
            }]
        });
    },
    sportStartTimeChange(date,type){
      var vm=this;
        vm.sportsStartTime=date
    },
    sportEndTimeChange(date,type){
      var vm=this;
        vm.sportsEndTime=date
    },
    drawTodayHeart(){
        var vm=this;
        let myChart = this.$echarts.init(document.getElementById('sportsChartHeart'))
        myChart.setOption({

             tooltip: {
                trigger:'item',
                padding:[0,10,0,10],
                formatter:'{a} </br>{b}:{c}%'
            },
            xAxis: {
                show:true,
                name:'时间（小时）',
                data: vm.sportsTodayDateList,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15]
                },
                axisTick:{
                  length:1
                },
                axisLabel:{
                //    rotate:270,
                }
            },
            yAxis: {
                type : 'value',
                name:'bpm',
                nameTextStyle:{
                  align:'right'
                },
                nameGap:20,
                axisLine:{
                  symbol:['none', 'arrow'],
                  symbolSize:[10,15],
                  symbolOffset:[0,11]
                },
            },
            series: [{
                type: 'line',
                itemStyle:{
                  normal:{
                    color:"#cc6600",
                    label:{
                      show:true,
                      position:'top',
                      color:'#333',
                      formatter:'{c}'
                    }
                  }
                },
                barWidth:20,
                data:vm.sportsTodayHeartRate
            }]
        });
    },
    //睡眠
    sleepStartTimeChange(date,type){
      var vm=this;
        vm.sleepStartTime=date
    },
    sleepEndTimeChange(date,type){
      var vm=this;
        vm.sleepEndTime=date
    },
    getStudentSleepStatisticalInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getStudentSleepStatisticalInfo?studentId=" +studentId
        )
        .then(function(response) {
          let data = response.data.response;
          vm.sleepStatistical=data
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSleepTimeInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getSleepTimeInfo?studentId=" +studentId+"&startTime="+vm.sleepStartTime+"&endTime="+vm.sleepEndTime
        )
        .then(function(response) {
          let data = response.data.response;
          vm.sleepTimeData= response.data.response? response.data.response:{};
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getStudentSleepListInfo(studentId) {
      var vm = this;
      this.$axios
        .get(
          "/v1/wristbandmonitor/getStudentSleepListInfo?studentId=" +studentId+"&startTime="+vm.sleepStartTime+"&endTime="+vm.sleepEndTime
        )
        .then(function(response) {
          let data = response.data.response;
          vm.resultData1= response.data.response
        })
        .catch(function(response) {
          console.log(response);
        });
    },

    exportModel() {
      var vm = this;
      let url ="";
      if(vm.selectTabName=="体育课监测"){
        url= this.$axios.defaults.baseURL +
        "/v1/wristbandmonitor/exportStudentSportsMonitoringData?studentId="+vm.studentId+
        "&token=" +sessionStorage.getItem("token");
      }else if(vm.selectTabName=="运动量"){
        url= this.$axios.defaults.baseURL +
        "/v1/wristbandmonitor/exportStudentSportsNumData?studentId="+vm.studentId+"&startTime="+vm.sportsStartTime+"&endTime="+vm.sportsEndTime+
        "&token=" +sessionStorage.getItem("token");
      }else{
        url= this.$axios.defaults.baseURL +
        "/v1/wristbandmonitor/exportStudentSleepData?studentId="+vm.studentId+"&startTime="+vm.sleepStartTime+"&endTime="+vm.sleepEndTime+
        "&token=" +sessionStorage.getItem("token");
      }
      window.open(url);
    },
    pageToLast() {
      var vm = this;
        this.$router.go(-1);
        localStorage.setItem('RETURN_TO_STUDENT_SPORTS', '1');
    },

  },
  watch: {
   sportsStartTime:function(){
     var vm=this;
     vm.sportTimeStatistical={};
      vm.oneData=[];
          vm.twoData=[];
          vm.threeData=[];
          vm.fourData=[];
          vm.fourDate=[];
          vm.resultData=[];
     if(vm.sportsEndTime){
       vm.gerStudentSportsTimeInfo(vm.studentId);
       vm.getSportsNumCharts(vm.studentId);
       vm.getSportsNumTimeDetailList(vm.studentId)
     }
   },
   sportsEndTime:function(){
     var vm=this;
      vm.sportTimeStatistical={};
      vm.oneData=[];
          vm.twoData=[];
          vm.threeData=[];
          vm.fourData=[];
          vm.fourDate=[];
          vm.resultData=[];
     if(vm.sportsEndTime){
       vm.gerStudentSportsTimeInfo(vm.studentId)
       vm.getSportsNumCharts(vm.studentId);
       vm.getSportsNumTimeDetailList(vm.studentId)
     }
   },
   sleepStartTime(){
     var vm=this;
     vm.sleepTimeData={};
     vm.resultData1=[];
     if(vm.sleepEndTime){
       vm.getSleepTimeInfo(vm.studentId);
       vm.getStudentSleepListInfo(vm.studentId)
     }
   },
   sleepEndTime(){
     var vm=this;
     vm.sleepTimeData={};
     vm.resultData1=[];
     if(vm.sleepStartTime){
       vm.getSleepTimeInfo(vm.studentId);
       vm.getStudentSleepListInfo(vm.studentId)
     }
   }
  },
  created() {
  },
  mounted() {
    var vm = this;
    vm.schoolId = sessionStorage.getItem("schoolId");
    vm.studentId=sessionStorage.getItem("studentSportsData-studentSportsDataDetail-studentId");
    vm.type=sessionStorage.getItem("studentSportsData-studentSportsDataDetail-type");
    vm.getStudentBaseInfo(sessionStorage.getItem("studentSportsData-studentSportsDataDetail-studentId"));
    // if(sessionStorage.getItem("studentSportsData-studentSportsDataDetail-type")==1){

      vm.selectTabName="体育课监测";
       vm.getStudentSportsMonitoringInfo(sessionStorage.getItem("studentSportsData-studentSportsDataDetail-studentId"));
       vm.getStudentLastClassInfo(sessionStorage.getItem("studentSportsData-studentSportsDataDetail-studentId"));
       vm.getStudentChartsInfo(sessionStorage.getItem("studentSportsData-studentSportsDataDetail-studentId"));
    // }else{
      let date=new Date;
        let now=new Date;
        var mon = date.getMonth() + 1;
        var day = date.getDate();
        var nowDay = date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
        now.setDate(now.getDate()-7);

        var mon1 = now.getMonth() + 1;
        var day1 = now.getDate();
        var nowDay1 = now.getFullYear() + "-" + (mon1<10?"0"+mon1:mon1) + "-" +(day1<10?"0"+day1:day1);

        vm.sportsStartTime=nowDay1;
        vm.sportsEndTime=nowDay;
        vm.sleepStartTime=nowDay1;
        vm.sleepEndTime=nowDay;
        vm.startTime=now;
        vm.endTime=nowDay;
        vm.startTime1=now;
        vm.endTime1=nowDay;
      // vm.selectTabName="运动量";
       vm.getSportsNumStatisticalInfo(sessionStorage.getItem("studentSportsData-studentSportsDataDetail-studentId"));
      if(nowDay && nowDay1 && now ){
      vm.getStudentSleepStatisticalInfo(sessionStorage.getItem("studentSportsData-studentSportsDataDetail-studentId"));
      }

    // }

  }
};
</script>
