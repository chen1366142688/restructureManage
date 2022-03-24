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
</style>
<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">学生课堂心率走势详情</h2>
    </div>
    <Card style="margin-top:20px;">
      <span style="margin-right:50px;">姓名 ：{{studentData.studentName}}</span>
      <span style="margin-right:50px;">性别：{{studentData.gender=='1'?'男':'女'}}</span>
      <span style="margin-right:50px;">学籍号：{{studentData.registerCode}}</span>
      <span style="margin-right:50px;">班级：{{studentData.gradeName}}{{studentData.studentClass}}级</span>
      <span style="margin-right:50px;">监测课程：{{selectTime}}</span>
        <Button
                @click="pageToTeacherList"
                type="success"
                style="margin-right:16px;"
        >返回</Button>
    </Card>
      <Card style="margin-top: 20px">
          <div  >心率走势详情</div>
          <div style="width:99%;height:464px;background:#FFF;" id="myChart1" ></div>

      </Card>

  </div>
</template>

<script>
export default {
  name: "courseMonitoring",
  data() {
    return {
        studentData: {},
        studentId: '',
        classLearnId: '',
        selectTime: '',
        myChart1: null,
        option1: null,
        xData: [],
        yData: []
    };
  },
  methods: {
      dynamic1(){
          var vm = this;
          vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
          vm.option1 =  {
              title: {
                  text: '',
                  subtext: ''
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          backgroundColor: '#56C38A'
                      }
                  },
                  formatter: function (params) {
                      return '第'+params[0].name+'分钟'+ "<br>"+ '实时心率:'+params[0].value +'bpm'+ "<br>"+ '运动强度:'+Math.round(params[0].value/(220-vm.studentData.grade)*100) +'%'+"<br>";
                  }
              },
              legend: {
              },
              xAxis: {
                  type: 'category',
                  boundaryGap: false,
                  name: '分钟',
                  data: vm.xData
              },
              yAxis: {
                  type: 'value',
                   name: 'bpm',
                  axisLabel: {
                      formatter: '{value} '
                  }
              },
              series: [
                  {
                      type: 'line',
                      data: vm.yData,
                    label: {
                      show: true,
                      position: 'top'
                    },
                      lineStyle:{
                        color:'#56C38A' //改变折线颜色
                      },
                    markLine : {
                      symbol:"none",

                      /*symbol:"none",               //去掉警戒线最后面的箭头
                      label:{
                          position:"end"   ,       //将警示值放在哪个位置，三个值“start”,"middle","end"  开始  中点 结束


                      },*/
                      data : [{

                        silent:false,             //鼠标悬停事件  true没有，false有
                        lineStyle:{               //警戒线的样式  ，虚实  颜色
                          type:"solid",
                          color:"#FE940E",
                        },
                        label:{
                          position:'end',
                          formatter:"170bpm"
                        },
                        yAxis:170         // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值

                      },
                        {

                          silent:false,             //鼠标悬停事件  true没有，false有
                          lineStyle:{               //警戒线的样式  ，虚实  颜色
                            type:"solid",
                            color:"#DC3640",

                          },
                          label:{
                            position:'end',
                            formatter:"140bpm",
                            fontSize:'8'
                          },
                          yAxis:140           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值

                        },
                        {

                          silent:false,             //鼠标悬停事件  true没有，false有
                          lineStyle:{               //警戒线的样式  ，虚实  颜色
                            type:"solid",
                            color:"#56C38A",

                          },
                          label:{
                            position:'end',
                            formatter:"120bpm",
                            fontSize:'8'
                          },
                          yAxis:120           // 警戒线的标注值，可以有多个yAxis,多条警示线   或者采用   {type : 'average', name: '平均值'}，type值有  max  min  average，分为最大，最小，平均值

                        }
                      ]
                    }
                    // markLine: {
                      //     data: [
                      //         {type: 'average', name: '平均值',lineStyle: {
                      //             color: '#FE940E'
                      //           }},
                      //         {type: 'max', name: '最大值', lineStyle: {
                      //             color: '#DC3640'
                      //           }},
                      //         {type: 'min', name: '最小值', lineStyle: {
                      //             color: '#56C38A'
                      //           }}
                      //     ]
                      // }
                  }
              ]
          };
          vm.myChart1.setOption(vm.option1)
      },
      pageToTeacherList() {
          //返回
        localStorage.setItem('RETURN_TO_CLASS_MONITORING', '1');
          this.$router.go(-1);
      },
      getStudentBaseInfoByStudentId(studentId) {
          var vm = this;
          this.$axios
              .get("/v1/devicewristband/getStudentBaseInfoByStudentId?studentId="+studentId)
              .then(function(response) {
                  let data = response.data.response;
                  vm.studentData=data?data:{};
              })
              .catch(function(response) {
                  console.log(response);
              });
      },
      timestampToTime(timestamp) {
        var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
        var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) ;
        let   strDate = Y+M+D+h+m;
        return strDate;
    },
      getInfoByStudentId() {
          var vm = this;
          this.$axios
              .get("/v1/devicewristband/getInfoByStudentId?studentId="+this.studentId+'&classLearnId='+this.classLearnId)
              .then(function(response) {
                let data = response.data.response.recordStudentVOS;
                let {startMonitorTime, endMonitorTime} = response.data.response
                startMonitorTime = startMonitorTime.replace(/-/g,'/')
                endMonitorTime = endMonitorTime.replace(/-/g,'/')
                let startTime = new Date(startMonitorTime);
                let endTime = new Date(endMonitorTime);
                let allTime =  Math.floor((endTime - startTime) / 1000 / 60)+1
                let nowTime = vm.timestampToTime(startMonitorTime);
                if(data.length>0){
                  let nowh = 0;
                  for (let i = 0; i < allTime; i++) {
                    for (let j = 0; j <data.length ; j++) {
                        if(data[j].dataTime==nowTime){
                            nowh = data[j].hAverage
                            break
                        }
                    }
                    vm.yData.push(nowh)
                    vm.xData.push(i+1)
                    nowTime =  new Date(nowTime);
                    nowTime =  new Date(nowTime.getTime() + 1000 * 60);
                    nowTime = vm.timestampToTime(nowTime);
                  }
                  vm.dynamic1();
                }
              })
              .catch(function(response) {
                  console.log(response);
              });
      },
  },
  mounted() {
    let vm = this;
     vm.studentId = sessionStorage.getItem("classMonitoringData-classMonitoringStudentDetail-studentId");
     vm.classLearnId = sessionStorage.getItem("classMonitoringData-classMonitoringStudentDetail-classLearnId");
     vm.selectTime = sessionStorage.getItem("classMonitoringData-classMonitoringStudentDetail-selectTime");
      vm.getStudentBaseInfoByStudentId(vm.studentId);
      vm.getInfoByStudentId();
  }
};
</script>
