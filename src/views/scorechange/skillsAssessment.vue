<style>
    
</style>

<template>
  <div style="padding-left:10px;">
    <div>
      <h2 style="margin-top:15px;margin-bottom:13px;">运动技能分析</h2>
    </div>
    <div>
        <Form :label-width="100" class="function">
            <Card>
                <!-- <h3 style="margin-bottom:10px">{{semesterName}}</h3> -->
                <div class="top-search">
                    <div class="left-input">
                        <div style="margin:5px 20px;">
                            <span>年级：</span>
                            <Select v-model="grade"  style="width:120px;">
                                <Option
                                v-for="item in schoolGradeList"
                                :value="item.gradeId"
                                :key="item.gradeId"
                                >{{ item.gradeName }}</Option>
                            </Select>
                        </div>
                    </div>
                    <div class="right-btns">
                        <Button type="success" @click="querySearch">查询</Button>
                    </div>
                </div>
           </Card>
           <br/>
           <Card>
            <div style="font-size:18px;height:40px;">
              数据概览
          </div>
                <FormItem label="考核情况：">
                    <Row>
                        <Col span="4">
                            学生总：{{allStudentCount}}人
                        </Col>
                        <Col span="4">
                            参与考核：{{needExamCount}}人
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="完成情况：">
                    <Row>
                        <Col span="4">
                            完成：{{completeCount}}人
                        </Col>
                        <Col span="4">
                            未完成：{{hangInTheAirCount}}人
                        </Col>
                    </Row>
                </FormItem>
                <FormItem label="等级情况：">
                    <Row>
                        <Col span="4">
                            及格数：{{passCount}}人
                        </Col>
                        <Col span="4">
                            不及格数：{{failCount}}人
                        </Col>
                    </Row>
                </FormItem>
            </Card>
        </Form>
        <br/>
        <Card>
           <div style="font-size:18px;height:40px;">
              数据分析
          </div>
          <div>
          <div id="myChart1" :style="{width: '100%', height: '300px'}"></div>
          </div>
        </Card>
        <br/>
        <Card>
        <div :style="{backgroundColor:'#FFFFFF'}">
                    <div style="font-size:18px;height:40px;">
              数据明细
          </div>
          <Row>
              <div>
                  <Table border :loading="loading" :columns="resultColumns" :data="resultData"></Table>
              </div>
          </Row>
        </div>
       </Card>
</div>
<div style="width:100%;height:50px"></div>     
</div>
</template>

<script>
var gradeList=['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三','大一','大二','大三','大四'];
export default {
    name: 'teacherDetail'
    ,data(){
        return {
            semesterName:'',
            myChart1:null,
            option1:{},
            loading: false,
            resultColumns: [
              {
                title: '年级',
                key: 'grade',
                align: 'center',
                minWidth:100,
                render: (h, params) => {
                  return h('div', [h('span', gradeList[params.row.grade-1])])
                }
              },
              {
                title: '总人数',
                key: 'allStudentCount',
                align: 'center',
                minWidth:100,
              },
              {
                title: '参与考核人数',
                key: 'allStudentCount',
                align: 'center',
                minWidth:100,
                render: (h, params) => {
                  return h('div', [h('span', params.row.allStudentCount - params.row.actionGirlNotJoinStudentCount -params.row.actionBoyNotJoinStudentCount)])
                }
              },
              {
                title: '及格人数',
                key: '',
                align: 'center',
                minWidth:100,
                render: (h, params) => {
                  return h('div', [h('span', params.row.actionBoyPassStudentCount+params.row.actionGirlPassStudentCount)])
                }
              },
              {
                title: '及格男生人数',
                key: 'actionBoyPassStudentCount',
                align: 'center',
                minWidth:100,
              },
              {
                title: '及格女生人数',
                key: 'actionGirlPassStudentCount',
                align: 'center',
                minWidth:100,
              }
            ],
            resultData:[],
            gradeListData:[],
            passListData:[],
            failListData:[],
            allStudentCount:0, 
            needExamCount:0,
            completeCount:0,
            hangInTheAirCount:0,
            passCount:0,
            failCount:0,
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
            this.queryGradeStudentShow();
        },
        queryGradeStudentShow(){
            var vm=this;
          this.$axios.get('/v1/examschool/queryGradeStudentShow?gradeId='+(vm.grade==999?'':vm.grade)+'&studentClass='+(vm.studentClass==999?'':vm.studentClass)).then(res => {
              if (res.data.code == 10000) {
                  this.resultData = res.data.response?res.data.response:[];
                  this.semesterName = this.resultData[0].semesterName
                  let gradeListData = [],passListData=[],failListData=[];

                  this.allStudentCount =0;
                    this.completeCount =0;
                    this.hangInTheAirCount=0;
                    this.passCount =0;
                    this.failCount =0;
                    this.needExamCount = 0 ;
                  for(let val of this.resultData){
                    this.allStudentCount += val.allStudentCount
                    this.completeCount += ((val.boyStudentCount - val.actionBoyNotOverStudentCount - val.actionBoyNotJoinStudentCount) + (val.girlStudentCount - val.actionGirlNotOverStudentCount-val.actionGirlNotJoinStudentCount));
                    
                    this.hangInTheAirCount += (val.actionBoyNotOverStudentCount + val.actionGirlNotOverStudentCount );
                    this.passCount += (val.actionBoyPassStudentCount + val.actionGirlPassStudentCount);
                    this.failCount += ((val.boyStudentCount - val.actionBoyPassStudentCount-val.actionBoyNotOverStudentCount-val.actionBoyNotJoinStudentCount) + (val.girlStudentCount - val.actionGirlPassStudentCount-val.actionGirlNotOverStudentCount-val.actionGirlNotJoinStudentCount));
                    this.needExamCount += val.allStudentCount - val.actionGirlNotJoinStudentCount - val.actionBoyNotJoinStudentCount;
                    gradeListData.push(gradeList[val.grade-1])
                    passListData.push(val.actionBoyPassStudentCount+val.actionGirlPassStudentCount );
                    failListData.push((val.boyStudentCount - val.actionBoyPassStudentCount-val.actionBoyNotOverStudentCount-val.actionBoyNotJoinStudentCount) + (val.girlStudentCount - val.actionGirlPassStudentCount-val.actionGirlNotOverStudentCount-val.actionGirlNotJoinStudentCount));
                  }
                  this.gradeListData = gradeListData;
                  this.passListData = passListData;
                  this.failListData = failListData;
                  this.drawGenSLine()
              }
          })
        },
        drawGenSLine() {
          var vm = this;
          vm.myChart1 = this.$echarts.init(document.getElementById("myChart1"));
          vm.option1 = {
            title: {
                text: '',
            },
              tooltip : {
                  trigger: 'axis',
                  axisPointer : { 
                      type : ''
                  }
              },
              legend: {
                  data:['未及格人数','及格人数']
              },
              grid: {
                  left: '3%',
                  right: '4%',
                  bottom: '3%',
                  containLabel: true
              },
              xAxis : [
                  {
                      type : 'category',
                      data : vm.gradeListData,
                      name:'年级'
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      name:'人数'
                  }
              ],
              series : [
                  {
                      name:'及格人数',
                      type:'bar',
                      stack: '人数',
                      barWidth:'15%',
                      barMaxWidth:'15%',
                      data:vm.passListData,
                      itemStyle:{
                        color:'#119670'
                      }
                  },
                  {
                      name:'不及格人数',
                      type:'bar',
                      stack: '人数',
                      barWidth:'15%',
                      barMaxWidth:'15%',
                      data:vm.failListData,  
                      itemStyle:{
                        color:'#f8c31d'
                      }
                  },
              ]
          };
          vm.myChart1.setOption(vm.option1)
        },  
        getStartYearList() {
      //编辑时获取场馆数据
      // this.pageTitle = '学校编辑'
      this.$axios.get("/v1/school/getStartYearList").then(res => {
        if (res.data.code == 10000) {
          //   console.log(res);
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
        this.queryGradeStudentShow();
        this.getStartYearList();
    }
    ,watch: {

    }   
};
</script>