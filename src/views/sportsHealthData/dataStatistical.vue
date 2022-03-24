<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">数据概况</h2>
    </div>
    <div v-if="openStatus">
        <Card :dis-hover="true">
          <p style="font-weight: bold;">学校数据</p>
            <div>
                <Row>
                    <Col span="6">
                    <div style="text-align: center;">
                    <p style="font-weight: bold;">{{schoolData.heartRate?schoolData.heartRate:"-"}}</p>
                    <p>学生平均心率</p>
                    </div>
                    </Col>
                    <Col span="6" style="border-left:1px solid #F0F0F0">
                    <div style="text-align: center;">
                    <p style="font-weight: bold;">{{schoolData.stepNum?schoolData.stepNum:"-"}}</p>
                    <p>学生平均运动步数</p>
                    </div >
                    </Col>
                    <Col span="6" style="border-left:1px solid #F0F0F0">
                    <div style="text-align: center;">
                    <p style="font-weight: bold;">{{schoolData.distance?schoolData.distance:"-"}}</p>
                    <p>学生平均运动距离（公里）</p>
                    </div>
                    </Col>
                    <Col span="6" style="border-left:1px solid #F0F0F0">
                    <div style="text-align: center;">
                    <p style="font-weight: bold;">{{schoolData.calories?schoolData.calories:"-"}}</p>
                    <p>学生平均消耗卡路里</p>
                    </div>
                    </Col>
                </Row>
            </div>
        </Card>
        <div v-show="classList==null || classList.length <= 0" >
            <Card :dis-hover="true" style="line-height:600px;text-align:center;">
                当前没有您的课程班级数据
            </Card>
        </div>
        <div v-show="classList != null && classList.length > 0 " >
          <Tabs style="margin-top:20px;" type="card" :value="selectTabName" @on-click="selectTabs" >
              <TabPane :name="classInfo.studentClassName"  v-for="(classInfo,index) in classList" :key="index" :label="classInfo.studentClassName ">
              </TabPane>
          </Tabs>
          <Card :dis-hover="true"  >
            <p style="font-size:18px;">数据概览</p>
            <div>
                  <Row>
                      <Col span="6">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{classData.heartRate?classData.heartRate:"-"}}</p>
                      <p>平均心率</p>
                      </div>
                      </Col>
                      <Col span="6" style="border-left:1px solid #F0F0F0">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{classData.stepNum?classData.stepNum:"-"}}</p>
                      <p>平均运动步数</p>
                      </div >
                      </Col>
                      <Col span="6" style="border-left:1px solid #F0F0F0">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{classData.distance?classData.distance:"-"}}</p>
                      <p>平均运动距离（公里）</p>
                      </div>
                      </Col>
                      <Col span="6" style="border-left:1px solid #F0F0F0">
                      <div style="text-align: center;">
                      <p style="font-weight: bold;">{{classData.calories?classData.calories:"-"}}</p>
                      <p>平均消耗卡路里</p>
                      </div>
                      </Col>
                  </Row>
              </div>
          </Card>
            <div style="display:flex;justify-content: space-between;margin-top:20px;">
                  <div style="width:74%;background:#FFF;padding:21px 0 0 15px">
                    <p style="font-weight: bold;">平均心率变化趋势</p>
                    <div id="myChartHeart" :style="{width: '100%', height: '400px'}"></div>
                  </div>
                  <div style="width:25%;background:#FFF;padding:21px 25px 0 20px">
                    <Row>
                      <Col span="12">
                      <p style="text-align:left"><span style="font-weight: bold;">平均心率排行榜</span></p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span style="font-weight: bold;">bpm</span></p>
                      </Col>
                      </Row>
                      <Row v-for="(item,index) in rankListHeartRate" :key="index">
                      <Col span="12">
                      <p style="text-align:left">
                        <span >{{index+1}}.{{item.studentName}}</span>
                      </p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span >{{item.heartRate}}</span></p>
                      </Col>
                      </Row>
                  </div>
            </div>
              <div style="display:flex;justify-content: space-between;margin-top:20px;">
                <div style="width:74%;background:#FFF;padding:21px 0 0 15px">
                  <p style="font-weight: bold;">平均消耗卡路里变化趋势</p>
                      <div id="myChartCalories" :style="{width: '100%', height: '400px'}"></div>
                  </div>
                  <div style="width:25%;background:#FFF;padding:21px 25px 0 20px">
                    <Row>
                      <Col span="12">
                      <p style="text-align:left"><span style="font-weight: bold;">平均消耗卡路里排行榜</span></p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span style="font-weight: bold;">kcal</span></p>
                      </Col>
                      </Row>
                      <Row v-for="(item,index) in rankListCalories" :key="index">
                      <Col span="12">
                      <p style="text-align:left">
                        <span >{{index+1}}.{{item.studentName}}</span>
                      </p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span >{{item.calories}}</span></p>
                      </Col>
                      </Row>
                  </Col>
                </div>
            </div>
              
              <div style="display:flex;justify-content: space-between;margin-top:20px;">
                <div style="width:74%;background:#FFF;padding:21px 0 0 15px">
                      <p style="font-weight: bold;">平均运动步数变化趋势</p>
                      <div id="myChartStep" :style="{width: '100%', height: '400px'}"></div>
                  </div>
                  <div style="width:25%;background:#FFF;padding:21px 25px 0 20px">
                    <Row>
                      <Col span="12">
                      <p style="text-align:left"><span style="font-weight: bold;">平均运动步数排行榜</span></p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span style="font-weight: bold;">步</span></p>
                      </Col>
                      </Row>
                      <Row v-for="(item,index) in rankListStep" :key="index">
                      <Col span="12">
                      <p style="text-align:left">
                        <span >{{index+1}}.{{item.studentName}}</span>
                      </p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span >{{item.step}}</span></p>
                      </Col>
                      </Row>
                  </Col>
                </div>
            </div>
              <div style="display:flex;justify-content: space-between;margin-top:20px;">
                <div style="width:74%;background:#FFF;padding:21px 0 0 15px">
                      <p style="font-weight: bold;">平均运动距离变化趋势</p>
                      <div id="myChartDistance" :style="{width: '100%', height: '400px'}"></div>
                  </div>
                  <div style="width:25%;background:#FFF;padding:21px 25px 0 20px">
                    <Row>
                      <Col span="12">
                      <p style="text-align:left"><span style="font-weight: bold;">平均运动距离排行榜</span></p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span style="font-weight: bold;">km</span></p>
                      </Col>
                      </Row>
                      <Row v-for="(item,index) in rankListDistance" :key="index">
                      <Col span="12">
                      <p style="text-align:left">
                        <span >{{index+1}}.{{item.studentName}}</span>
                      </p>
                      </Col>
                      <Col span="12">
                      <p style="text-align:right"><span >{{item.distance}}</span></p>
                      </Col>
                      </Row>
                  </Col>
                </div>
            </div>
        </div>
    </div>
    <div v-if="!openStatus">
        <Card :dis-hover="true" style="width:100%;height:700px;">
          <div style="margin-top:340px;text-align: center;">
          <span>学校未开启手环监测教学模式</span>
        </div>
        </Card>
    </div>
        
  </div>
</template>

<script>
export default {
  name: "teacherList",
  data() {
    return {
      schoolId: "",
      openStatus:false,
        schoolData:{},
        selectTabName:'',
        classList:[],
        classId:'',
        classData:{},
        heratLine:[],
        setpLine:[],
        distanceLine:[],
        caloriesLine:[],
        dateTimeList:[],
        rankListCalories:'',
        rankListDistance:'',
        rankListHeartRate:'',
        rankListStep:''
    };
  },
  methods: {
     selectTabs(name){
         var vm=this;
        this.selectTabName = name;
        for(let i=0;i<vm.classList.length;i++){
            if(name==vm.classList[i].studentClassName){
                vm.classId=vm.classList[i].classId
            }
        }
     },
     getWristbandTypeBySchoolId() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getWristbandTypeBySchoolId")
        .then(function(response) {
          let data = response.data.response;
            if(data=="1" || data == "2"){
                vm.openStatus=true;
                vm.getSchoolAverageData();
                vm.getTeacherClassInfo();
            }else{
                vm.openStatus=false
            }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getSchoolAverageData() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getSchoolAverageData")
        .then(function(response) {
          let data = response.data.response;
            vm.schoolData=data?data:{}
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
                vm.selectTabs(data[0].studentClassName)
            }
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getClassAverageData() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getClassAverageData?classId="+vm.classId)
        .then(function(response) {
          let data = response.data.response;
            vm.classData=data?data:{};
            // console.log(vm.classData)
        })
        .catch(function(response) {
          console.log(response);
        });
    },
    getChartData() {
      var vm = this;
      this.$axios
        .get("/v1/wristbandmonitor/getChartData?classId="+vm.classId)
        .then(function(response) {
          let data = response.data.response;
          if(data){
            vm.dealData(data)
          }
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
        vm.rankListCalories=data.rankListCalories;
        vm.rankListDistance=data.rankListDistance;
        vm.rankListHeartRate=data.rankListHeartRate;
        vm.rankListStep=data.rankListStep;



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
  },
  watch: {
      classId:function(){
          var vm=this;
        //   console.log(vm.classId)
          if(vm.classId){
              vm.getClassAverageData();
              vm.getChartData();
          }
      }
  },
  created() {
    //  this.getProvinceList();
  },
  mounted() {
    var vm=this;
    this.schoolId = sessionStorage.getItem("schoolId");
    vm.getWristbandTypeBySchoolId();
  }
};
</script>