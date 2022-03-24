<style>
    
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">课后作业分析</h2>
    </div>
    <div>
      <Form :label-width="100" class="function">
        <Card>
          <div class="top-search">
            <div class="left-input">
              <div style="margin:5px 10px;">
                <span>年级：</span>
                <Select v-model="grade"  style="width:120px;">
                  <Option
                    v-for="item in schoolGradeList"
                    :value="item.gradeId"
                    :key="item.gradeId"
                  >{{ item.gradeName }}</Option>
                </Select>
              </div>
              <div style="margin:5px 10px;">
                <span style="margin-left:40px;">班级：</span>
                <Select v-model="studentClass"  style="width:120px;">
                  <Option v-for="(item,index) in classList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
              </div>
            </div>
            <div class="right-btns">
              <Button type="success"  @click="querySearch">查询</Button>
            </div>
          </div>
        </Card>
        </br>
        <Card>
          <div style="font-size:18px;height:40px;">
              数据概览
          </div>
          <FormItem label="考核情况：">
              <Row>
                  <Col span="4">
                      学生总：{{totalStudent}}人
                  </Col>
                  <Col span="4">
                      无需考核：{{notNeedExamine}}人 
                  </Col>
                  <Col span="4">
                      需要考核：{{needExamine}}人
                  </Col>
              </Row>
            </FormItem>
          <FormItem label="参与情况：">
              <Row>
                  <Col span="4">
                      未参加：{{notJoinStudent}}人
                  </Col>
                  <Col span="4">
                      已参加：{{joinStudent}}人
                  </Col>
              </Row>
          </FormItem>
          <FormItem label="完成情况：">
              <Row>
                  <Col span="4">
                      完成：{{finishStudent}}人
                  </Col>
                  <Col span="4">
                      未完成：{{notFinishStudent}}人
                  </Col>
                  
              </Row>
          </FormItem>
        </Card>
        <Spin size="large" fix v-if="spinShow"></Spin>
      </Form>  
      </br>
      <Card>
          <div style="font-size:18px;height:40px;">
          数据分析
          </div>
          <span style>开始时间：</span>
                <DatePicker v-model="startTime"   @on-change="examStartTimeChange" format="yyyy-MM-dd" type="date" placeholder="选择开始时间" style="width: 200px"></DatePicker>
              <span style="margin-left:40px;">结束时间：</span>
                <DatePicker  v-model="endTime"  @on-change="examEndTimeChange" format="yyyy-MM-dd" type="date" placeholder="选择结束时间" style="width: 200px"></DatePicker>
              <Button
                type="success"
                style="margin-left:40px;"
                @click="getSchoolExerciseAnalyze"
              >查询</Button>

              <div>
                  <div id="myChart1" :style="{width: '45%', height: '400px', marginTop: '50px',display: 'inline-block'}"></div>
                  <div id="myChart2" :style="{width: '45%', height: '400px', marginTop: '50px',display: 'inline-block'}"></div>
              </div>
        </Card>
        </br>
        <Card>
          <div style="font-size:18px;height:40px;">
          数据明细
          </div>
            <Table border  :columns="resultColumns" :data="resultData"></Table>            
      </Card>     
      <div style="width:100%;height:50px"></div>       
</div>
</div>
</template>

<script>
import md5 from 'js-md5';
export default {
    name: 'teacherDetail'
    ,data(){
        return {
            spinShow:false,
            semesterName:'',
            totalStudent:'',
            needExamine:'',
            notNeedExamine:'',
            joinStudent:'',
            notJoinStudent:'',
            finishStudent:'',
            notFinishStudent:'',
            joinList:[],
            finishList:[],
            testInfo:{},
            myChart1:null,
            option1:{},
            myChart2:null,
            option2:{},
            resultData: [],
            resultColumns: [
                {
                title: "时间",
                key: "dateTime",
                align: "center"
                //   minWidth: 250
                },
                {
                title: "参与次数",
                key: "joinNum",
                align: "center"
                //   width: 150
                },
                {
                title: "完成次数",
                key: "finishNum",
                align: "center",
                }
            ],
            oneData:[],
            twoData:[],
            examStartTime:'',
            examEndTime:'',
            startTime:'',
            endTime:'',
             grade: 999,
      schoolGradeList: [],
      studentClass: 999,
      classList: [
        {
          value: 999,
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
        }
    }
    ,methods:{
        querySearch(){
            this.getSchoolExerciseStatistical();
            this.getSchoolExerciseAnalyze();
        },
        getSchoolExerciseStatistical(){
            var vm=this;
          this.$axios.get('/v1/familyexerciseanalyze/getSchoolExerciseStatistical?gradeId='+(vm.grade==999?'':vm.grade)+'&studentClass='+(vm.studentClass==999?'':vm.studentClass)).then(res => {
              if (res.data.code == 10000) {
                  
                  let data=res.data.response;
                  vm.semesterName=data.semesterName;
                  vm.totalStudent=data.totalStudent;
                  vm.needExamine=data.needExamine;
                  vm.notNeedExamine=data.notNeedExamine;
                  vm.joinStudent=data.joinStudent;
                  vm.notJoinStudent=data.notJoinStudent;
                  vm.finishStudent=data.finishStudent;
                  vm.notFinishStudent=data.notFinishStudent
                  
              }
          })
        },
        getSchoolExerciseAnalyze(){
            var vm = this
            if(!vm.examStartTime){
                vm.$Message.info("请选择开始时间")
                return
            }
            if(!vm.examEndTime){
                vm.$Message.info("请选择结束时间")
                return
            }
            vm.spinShow=true;
            let data={
            "endTime": vm.examEndTime,
            "startTime": vm.examStartTime,
            gradeId:vm.grade==999?'':vm.grade,
            studentClass:vm.studentClass==999?'':vm.studentClass
            }
            this.$axios.post('/v1/familyexerciseanalyze/getSchoolExerciseAnalyze',data)
                .then(res => {
                    vm.spinShow=false;
                if (res.data.code == 10000) {
                   let data=res.data.response;
                   vm.joinList=data.joinList?data.joinList:[];
                   vm.finishList=data.finishList?data.finishList:[];
                   vm.resultData=data.dateList?data.dateList:[];
                   vm.oneData=[];
                   vm.twoData=[];
                   if(vm.joinList.length>0){
                        this.drawGenSLine()
                   }
                   if(vm.finishList.length>0){
                        this.drawGenSLine2()
                   }
                } else {
                    if (res.data.code > 39999) {
                        vm.$Message.info(res.data.msg)
                    }
                }
            })
        },
        pageToClassList(){ //返回
          this.$router.go(-1);  
        },   
        examStartTimeChange(date,type){
      var vm=this;
        vm.examStartTime=date
    },
    examEndTimeChange(date,type){
      var vm=this;
        vm.examEndTime=date
    },  
        drawGenSLine() {
          var vm = this;
          let leftData=[];
          for(var i =0;i<vm.joinList.length;i++){
              let param={value:vm.joinList[i].studentNum, name:vm.joinList[i].gradeName};
              vm.oneData.push(param);
              leftData.push(vm.joinList[i].gradeName)
          }
          
          vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
          vm.option1 = {
              title : {
                  text: vm.examStartTime+'至'+vm.examEndTime+'参与课后作业的次数分布',
                //   subtext: '等级图形的分布状态',
                  x:'center'
              },
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: leftData
              },
              series : [
                  {
                      name: '次数',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '60%'],
                      data:vm.oneData,
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          },
                          normal:{
                            // color:function(params) {
                            // var colorList = [          
                            //         '#119670', '#f8c31d', '#ff9639', 'red','gray', '#b5c263', '#ed3c46'
                            //     ];
                            //     return colorList[params.dataIndex]
                            //   }
                          }
                      }
                  }
              ]
          };
          vm.myChart1.setOption(vm.option1)
        },  
        drawGenSLine2() {
          var vm = this;
          let leftData=[];
          for(var i =0;i<vm.finishList.length;i++){
              let param={value:vm.finishList[i].studentNum, name:vm.finishList[i].gradeName};
              vm.twoData.push(param);
              leftData.push(vm.finishList[i].gradeName)
          }
          vm.myChart2 = this.$echarts.init(document.getElementById("myChart2"));
          vm.option2 = {
              title : {
                  text: vm.examStartTime+'至'+vm.examEndTime+'完成课后作业的次数分布',
                //   subtext: '体测图形的分布状态',
                  x:'center'
              },
              tooltip : {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                  orient: 'vertical',
                  left: 'left',
                  data: leftData
              },
              series : [
                  {
                      name: '次数',
                      type: 'pie',
                      radius : '55%',
                      center: ['50%', '60%'],
                      data:vm.twoData,
                      itemStyle: {
                          emphasis: {
                              shadowBlur: 10,
                              shadowOffsetX: 0,
                              shadowColor: 'rgba(0, 0, 0, 0.5)'
                          }
                      }
                  }
              ]
          };
          vm.myChart2.setOption(vm.option2)
        },   
        getStartYearList() {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios.get("/v1/school/getStartYearList").then(res => {
        if (res.data.code == 10000) {
          let data = res.data.response;
          let all = {
            gradeId: 999,
            gradeName: "全部"
          };
          this.schoolGradeList.push(all);
          this.schoolGradeList = this.schoolGradeList.concat(data);

          // this.schoolName = data.name
        } else {
          if (res.data.code > 39999) {
            this.$Message.info(res.data.msg);
          }
        }
      });
    },    
    }
    ,mounted(){
        var vm=this;
        let date=new Date;
        let now=new Date;
        var mon = date.getMonth() + 1;
        var day = date.getDate();
        var nowDay = date.getFullYear() + "-" + (mon<10?"0"+mon:mon) + "-" +(day<10?"0"+day:day);
        now.setDate(now.getDate()-7);  

        var mon1 = now.getMonth() + 1;
        var day1 = now.getDate();
        var nowDay1 = now.getFullYear() + "-" + (mon1<10?"0"+mon1:mon1) + "-" +(day1<10?"0"+day1:day1);

        vm.examStartTime=nowDay1;
        vm.examEndTime=nowDay;
        vm.startTime=now;
        vm.endTime=nowDay;
        vm.getSchoolExerciseAnalyze();
        this.getSchoolExerciseStatistical();
        this.getStartYearList() ;
    }
    ,watch: {

    }   
};
</script>