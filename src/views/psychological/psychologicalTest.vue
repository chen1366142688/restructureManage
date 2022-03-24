<template>
  <div id="psychological" style="padding-left:10px">
      <h2 style="margin-top:15px;margin-bottom:13px;">心理测评详情</h2>
      <Card style="margin-bottom:18px">
          <div class="top-search">
              <div class="left-input" style="align-items:center">
                    <div style="margin:5px 20px;">
                            <span>姓名：{{studentInfo.userName}}</span>
                    </div>
                    <div style="margin:5px 20px;">
                            <span>学籍号：{{studentInfo.registerCode}}</span>
                    </div>
                    <div style="margin:5px 20px;">
                            <span>性别：{{studentInfo.gender == 1?'男':'女'}}</span>
                    </div>
                    <div style="margin:5px 20px;">
                            <span>班级：{{gradeData[studentInfo.gradeId-1]}}{{studentInfo.classId}}班</span>
                    </div>
              </div>
              <div class="right-btns">
                 <Button type="success" @click="goBack">返回</Button>
              </div>
          </div>
      </Card>
      <Card style="margin-bottom:20px;">
          <div class="levelTitle">风险程度</div>
          <div class="levelDataOne">
            <div class="levelBox">
                <img :src="dangerLevelSrc" alt="">
            </div>
            <div class="levelText">
                <div class="resultTitle">
                    <img :src="dabgerSrc" alt="">
                    <span>风险分析：</span>
                </div>
                <div class="levelText-content" v-if="reportData.dangerDescribe&&reportData.dangerDescribe.length>0">
                    <span v-for="(reportItem,index) in reportData.dangerDescribe" :key="index"><span v-if="index == 0" style="visibility:hidden">两字</span>{{reportItem}}</span>
                </div>
                <div class="levelText-content" v-else><span>暂无数据！</span></div>
            </div>
      </div>
      </Card>
      <Card>
          <div class="levelTitle">心理健康状况</div>
              <div class="levelData">
                <div class="levelEchartsData">
                    <div id="levelEcharts"></div>
                </div>
                <div class="testResuData">
                    <div class="resultTitle">
                        <img :src="analysisSrc" alt="">
                        <span>测试结果：</span>
                    </div>
                    <div class="resultSection" v-for="(testResult,i) in reportData.testResultDescribe"><span style="visibility:hidden">两字</span>{{testResult}}</div>
                    <div class="resultTitle">
                        <img :src="proposalSrc" alt="">
                        <span>建议：</span>
                    </div>
                    <div class="resultcontent">
                        <div v-if="reportData.suggestList&&reportData.suggestList.length>0" v-for="(proposalItem,j) in reportData.suggestList" :key="j">
                            <span style="visibility:hidden">两字</span>{{proposalItem}}
                        </div>
                        <div v-if="!reportData.suggestList || reportData.suggestList.length==0">暂无建议！</div>
                    </div>
                </div>
              </div>
          </Row>
      </Card>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "psychological",
  data() {
    return {
        gradeData:['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三'],
        studentInfo:{
            userName:'张三',
            registerCode:'G2938788128937091',
            gender:1,//1男2女
            gradeId:1,
            classId:1,
            studentId:''
        },
        activityId:'',
        dangerLevelSrc:null,
        analysisSrc:require('../../images/analysis.png'),
        proposalSrc:require('../../images/proposal.png'),
        dabgerSrc:require('../../images/icon-danger.png'),
        reportData:{
            dangerLevel:0,// 0  低风险 1 高风险 2 较高风险 2 极高风险
            dangerDescribe:[],//风险描述
            testResultDescribe:[],//测试结果描述
            suggestList:[],//意见建议描述
            score:{
                dangerLevel:0,// 0  低风险 1 高风险 2 较高风险 2 极高风险
                depressedScore:0,//抑郁得分
                setbackScore:0,//挫折得分
                lifeScore:0,//生命得分
                safetyScore:0,//"安全得分
                bullyScore:0,//霸凌得分
                depressedProportion:6,//抑郁得分占比  总长度 100
                setbackProportion:1,//挫折得分占比  总长度 100
                lifeProportion:5,//生命得分占比  总长度 100
                safetyProportion:3,//安全得分占比  总长度 100
                depressedWarning:0,//抑郁预警
                setbackWarning:0,//挫折预警
                lifeWarning:0,//生命预警
                safetyWarning:0,//安全预警
            },
        },
    }
  },
  methods:{
      /** 心理健康状况- 雷达图 */
    initChart (radarData) {
      let levelEcharts = this.$echarts.init(document.getElementById("levelEcharts"));
      levelEcharts.setOption(
        {
            backgroundColor: "#ffffff",
            xAxis: {
                show: false,
                color:"#BABABA"
            },
            yAxis: {
                show: false,
                color:"#BABABA"
            },
            radar: {
                splitNumber: 5,
                name: {
                textStyle: {
                    color: '#333333',
                    fontSize: 14
                }
                },
                splitArea: {
                areaStyle: {
                    color: ['rgba(0, 0, 0, 0)']
                }
                },
                axisLine: {
                lineStyle: {
                    color: '#BABABA'//竖线
                }
                },
                splitLine: {
                lineStyle: {
                    color: '#BABABA'
                }
                },
                indicator: [{
                name: '抑郁',
                max: 5
                },
                {
                name: '挫折',
                max: 5
                },
                {
                name: '安全',
                max: 5
                },
                {
                name: '生命',
                max: 5
                }
                ],
                center: ['50%', '50%'],
            },
            series: [{
                name: '心理健康状况分析',
                type: 'radar',
                data: [{
                value: radarData,
                name: '心理健康状况分析',
                symbol: 'circle',
                symbolSize:1,
                itemStyle: {
                    color: '#209C7F'
                },
                lineStyle: {
                    width: 1,
                    color: '#209C7F'
                },
                areaStyle: {
                    normal: {
                    color: '#209C7F',
                    opacity: 0.40
                    }
                },
                }
                ]
            }]
        },
        true
      );
    },
    /**查询学生心理测试报告结果**/
    queryStudentPsychologicalReport(){
        let vm = this;
        this.$axios.get(`/v1/psychological/queryStudentPsychologicalReport?studentId=${this.studentInfo.studentId}&activityId=${this.activityId}`).then(res => {
        if (res.data.code == 10000) {
            vm.reportData = res.data.response;
            let radarData = [5/100*this.reportData.score.depressedProportion,5/100*this.reportData.score.setbackProportion,5/100*this.reportData.score.safetyProportion,5/100*this.reportData.score.lifeProportion]
            this.dangerLevelSrc = vm.reportData.dangerLevel == '0'?require('../../images/danger1.png'):vm.reportData.dangerLevel == '1'?require('../../images/danger2.png'):vm.reportData.dangerLevel == '2'?require('../../images/danger3.png'):vm.reportData.dangerLevel == '3'?require('../../images/danger4.png'):'';
            this.initChart (radarData)
        }
      });
    },
    /*返回上级页面*/
    goBack() {
      this.$router.go(-1);
    },
  },
  mounted(){
      this.$Message.loading({content: '加载中...',duration: 1})
      const nextParams = this.$route.params;
      this.studentInfo.studentId = nextParams.studentId;
      this.activityId = nextParams.activityId;
      this.studentInfo.userName = nextParams.studentName;
      this.studentInfo.registerCode = nextParams.registerCode;
      this.studentInfo.gender = nextParams.gender;
      this.studentInfo.classId = nextParams.studentClass;
      this.studentInfo.gradeId = nextParams.grade;
      this.queryStudentPsychologicalReport();
  },
  components: {},
}
</script>

<style lang="less" scoped>
.levelTitle{
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #333333;
    margin-bottom:18px;
}
.levelData{
    display: flex;
}
.levelDataOne{
    margin-bottom:18px;
    min-height:133px;
    display: flex;
    .levelBox{
        width:331px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
            width:213px;
            min-height:133px;
        }
    }
    .levelText{
        flex:1;
        border-radius:4px;
        display: flex;
        flex-direction: column;
        padding:10px 30px 10px 18px;
        background: #F7F7F9;
        .resultTitle{
            height:50px;
            display: flex;
            align-items: center;
            img{
            width:13px;
            height:13px;
            margin-right:11px;
            }
            span{
                font-size:18px;
                font-family:PingFang SC;
                font-weight:bold;
                color:rgba(51,51,51,1);
            }
        }
        .levelText-content{
            flex: 1;
            font-size:13px;
            font-family:PingFang SC;
            font-weight:500;
            color:rgba(51,51,51,1);
            line-height:27px;
            padding-left:24px;
        }
    }
}

.testResuData{
    flex: 1;
    padding-left:20px;
    min-height: 253px;
    background:rgba(248,248,249,1);
    .resultTitle{
        height:50px;
        display: flex;
        align-items: center;
        img{
          width:13px;
          height:13px;
          margin-right:11px;
        }
        span{
           font-size:18px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
        }
    }
    .resultSection{
        padding-left:24px;
        font-size:13px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:22px;
        margin-bottom:5px;
    }
    .resultcontent{
        padding-left:24px;
        padding-bottom:15px;
        font-size:13px;
        font-family:PingFang SC;
        font-weight:500;
        color:rgba(51,51,51,1);
        line-height:30px;
    }
}
.levelEchartsData{
    width:331px;
    height: initial;
    display: flex;
    align-items: center;
}
#levelEcharts{
    width:100%;
    height:255px;
}
</style>
