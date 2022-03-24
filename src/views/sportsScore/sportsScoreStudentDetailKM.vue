<template>
  <div style="padding-left:10px;">
    <h2 style="margin-top:15px;margin-bottom:13px;">学生成绩详情</h2>
    <div>
      <!-- 学生信息 -->
      <Card :dis-hover="true">
        <div class="top-search">
            <div class="left-input" style="align-items:center">
                <div style="margin:5px 20px;">
                    <span >姓名：</span>{{userInfo.studentName }}
                </div>
                <div style="margin:5px 20px;">
                    <span>学籍号：</span>{{userInfo.registerCode}}
                </div>
                <div style="margin:5px 20px;">
                    <span>班级：</span>{{gradeName}}{{userInfo.studentClass}}班
                </div>
                <div style="margin:5px 20px;">
                    <span>性别：</span>{{userInfo.gender=="1"?"男":"女"}}
                </div>
                <div style="margin:5px 20px;">
                    <span>中考得分：</span>{{sportsScoreData.middleScore}}分 (学年综合得分：{{sportsScoreData.contestYearScore }}分)
                </div>
            </div>
            <div class="right-btns">
                <Button type="success" @click="goback">返回</Button>
            </div>
        </div>
      </Card>
      <br>
      <!-- 第一学期 -->
      <Card>
        <h4 style="margin-bottom:10px">第一学期   总得分：{{sportsScoreData.firstSemesterScore }}分{{sportsScoreData.firstExemptionStatus === '1'?'（免考）':''}}</h4>
        <div>
          <div style="font-size：16px;margin:10px 0" v-if="sportsScoreData.firstStaminaScore>0">基础体能  总得分：{{sportsScoreData.firstStaminaScore }}分</div>
          <Table border max-height="550" :columns="testColumns" :data="firstPhysical" v-if="firstPhysical.length>0"></Table>
          <div style="font-size：16px;margin:10px 0" v-if="sportsScoreData.firstActionScore>0">专项技能  总得分：{{sportsScoreData.firstActionScore }}分</div>
          <Table border max-height="550" :columns="testColumns" :data="firstSkills" v-if="firstSkills.length>0"></Table>
          <div style="font-size：16px;margin:10px 0" v-if="sportsScoreData.firstHealthScore>0">体质健康监测  总得分：{{sportsScoreData.firstHealthScore }}分</div>
          <Table border max-height="550" :columns="testColumns" :data="firstHealthData" style="margin-bottom:20px" v-if="firstHealthData.length>0"></Table>
        </div>
      </Card>
      <!-- 第二学期 -->
      <Card style="margin-top:20px">
        <h4 style="margin-bottom:10px">第二学期   总得分：{{sportsScoreData.secondSemesterScore }}分{{sportsScoreData.secondExemptionStatus === '1'?'（免考）':''}}</h4>
        <div >
          <div style="font-size：16px;margin:10px 0" v-if="sportsScoreData.secondStaminaScore>0">基础体能  总得分：{{sportsScoreData.secondStaminaScore }}分</div>
          <Table border max-height="550" :columns="testColumns" :data="secondPhysical" style="margin-bottom:20px" v-if="secondPhysical.length>0"></Table>
          <div style="font-size：16px;margin:10px 0" v-if="sportsScoreData.secondActionScore>0">专项技能  总得分：{{sportsScoreData.secondActionScore }}分</div>
          <Table border max-height="550" :columns="testColumns" :data="secondSkills" style="margin-bottom:20px" v-if="secondSkills.length>0"></Table>
          <div style="font-size：16px;margin:10px 0" v-if="sportsScoreData.secondHealthScore>0">体质健康监测  总得分：{{sportsScoreData.secondHealthScore }}分</div>
          <Table border max-height="550" :columns="testColumns" :data="secondHealthData" style="margin-bottom:20px" v-if="secondHealthData.length>0"></Table>
        </div>
      </Card>
      <!-- 竞赛加分 -->
      <Card style="margin-top:20px">
        <h4>竞赛加分   总得分：{{sportsScoreData.competitionScore }}分</h4>
        <Table border max-height="550" :columns="examColumns" :data="examMatch" style="margin:20px auto"></Table>
      </Card>
    </div>
  </div>
</template>
<script>
import util from '@/libs/util'
import api from '@/api/baseApi'
export default {
  name: "kmcomprehensive",
  data() {
    return {
      /*****新增更改*****/
      testColumns: [
        {
          title: "项目名称",
          key: "middleItemName",
          align: "center",
          minWidth:100
        },
        {
          title: "考试内容",
          key: "smallItemName",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.data&&row.data.length>1){
              row.data.forEach(function(val,index){
                if(index == row.data.length-1){
                  text+= `<div style='padding:15px 0'>${val.smallItemName}</div>`;
                }else{
                  text+= `<div style='padding:15px 0;border-bottom:1px solid #EEE'>${val.smallItemName}</div>`;
                }
              })
            }else if(row.data&&row.data.length == 1){
              text = row.data[0].smallItemName;
            }else{
              text = row.smallItemName;
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "考试类型",
          key: "testType",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.data&&row.data.length>1){
              row.data.forEach(function(val,index){
                if(index == row.data.length-1){
                  text+= `<div style='padding:15px 0'>${val.testType === '1'?'选考':'必考'}</div>`;
                }else{
                  text+= `<div style='padding:15px 0;border-bottom:1px solid #EEE'>${val.testType === '1'?'选考':'必考'}</div>`;
                }
              })
            }else if(row.data&&row.data.length == 1){
              text = row.data[0].testType === '1'?'选考':'必考';
            }else{
              text = row.testType === '1'?'选考':'必考';
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "成绩",
          key: "achievementValue",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const that = this;
            const row = params.row;
            var text="";
            if(row.data&&row.data.length>1){
              row.data.forEach(function(val,index){
                if(index == row.data.length-1){
                  text+= `<div style='padding:15px 0'>${that.catgoryHeal(val)}</div>`;
                }else{
                  text+= `<div style='padding:15px 0;border-bottom:1px solid #EEE'>${that.catgoryHeal(val)}</div>`;
                }
              })
            }else if(row.data&&row.data.length == 1){
              text = that.catgoryHeal(row.data[0])
            }else{
              text = that.catgoryHeal(row)
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        },
        {
          title: "得分",
          key: "score",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            var text="";
            if(row.data&&row.data.length>1){
              row.data.forEach(function(val,index){
                if(index == row.data.length-1){
                  text+= `<div style='padding:15px 0'>${val.score}</div>`;
                }else{
                  text+= `<div style='padding:15px 0;border-bottom:1px solid #EEE'>${val.score}</div>`;
                }
              })
            }else if(row.data&&row.data.length == 1){
              text = row.data[0].score;
            }else{
              text = row.score;
            }
            return h("div", {
              domProps: {
                innerHTML: text
              }
            });
          }
        }
      ],
      examColumns: [
        {
          title: "赛事级别",
          key: "levelName",
          align: "center",
          minWidth:100,
        },
        {
          title: "赛事名称",
          key: "competitionName",
          align: "center",
          minWidth:100,
        },
        {
          title: "赛事项目",
          key: "itemName",
          align: "center",
          minWidth:100,
        },
        {
          title: "比赛成绩",
          key: "competitionScore",
          align: "center",
          minWidth:100,
        },
        {
          title: "比赛名次",
          key: "competitionRank",
          align: "center",
          minWidth:100,
        },
        {
          title: "竞赛加分",
          key: "addScore",
          align: "center",
          minWidth:100,
          render: (h, params) => {
            const row = params.row;
            var text=`${row.addScore}分`;
            return h("div", text);
          }
        },
      ],
      onePhysical:[],//第一学期基础体能数据
      examMatch:[],//竞赛加分
      userInfo:{},
      schoolYear:'',
      sportsScoreData:{},
      firstPhysical:[],
      secondPhysical:[],
      firstSkills:[],
      secondSkills:[],
      firstHealthData:[],
      secondHealthData:[],
    };
  },
  computed:{
    gradeName:function(){
      let gradeList = ['一年级','二年级','三年级','四年级','五年级','六年级','七年级','八年级','九年级','高一','高二','高三',]
      let text = this.userInfo.grade>0&&this.userInfo.grade<13?gradeList[this.userInfo.grade-1]:'';
      return text;
    }
  },
  methods: {
    /**返回**/
    goback(){ this.$router.go(-1);},
    /**综合评价查询学生体育成绩**/
    async queryStudentScoreByStudentIdKM(){
      let that = this;
      try {
        let res = await api.queryStudentScoreByStudentIdKM(that.userInfo.studentId, that.schoolYear)
        that.errorInfo(res)
        that.sportsScoreData = res.data.response;
      } catch (error) {
        console.log(error)
      }     
    },
    /**查询昆明学生学年体育竞赛加分**/
    async queryStudentSemesterCompetionDetail(){
      let that = this;
      try {
        let res = await api.queryStudentSemesterCompetionDetail(this.userInfo.studentId, this.schoolYear)
        that.errorInfo(res)
        that.examMatch = res.data.response;
      } catch (error) {
        console.log(error)
      }
    },
    /**查询学生学年体质健康数据**/
    async queryStudentSemesterSportsScoreKmBodyMonitor(){
      let that = this;
      try {
        let res = await api.queryStudentSemesterSportsScoreKmBodyMonitor(this.userInfo.studentId, this.schoolYear)
        that.errorInfo(res)
        let result = res.data.response
        let arrList = [
          {
            testTime:'',
            middleItemName:'体重指数',
            smallItemName:'体重指数',
            testType:'2',
            achievementValue:result.bmiValue,
            score:result.bmiScore,
            yearSemester:result.yearSemester,
            beforeVal:result.bmiValueBefore,
            grade:result.grade,
            unit:'',
            exemptionStatus:result.exemptionStatus
          },
          {
            testTime:'',
            middleItemName:'肺活量体重指数',
            smallItemName:'肺活量体重指数',
            testType:'2',
            achievementValue:result.vitalCapacityExponent,
            score:result.vitalCapacityScore,
            yearSemester:result.yearSemester,
            beforeVal:result.vitalCapacityExponentBefore,
            grade:result.grade,
            unit:'',
            exemptionStatus:result.exemptionStatus
          },
        ]
        let firstHealthData = arrList.filter((val) => {return val.yearSemester%2 != 1;});//第一学期体质健康列表
        let secondHealthData = arrList.filter((val) => {return val.yearSemester%2 == 1;});//第二学期体质健康列表
        that.firstHealthData = firstHealthData;
        that.secondHealthData = secondHealthData;
      } catch (error) {
        console.log(error)
      }
    },
    /**查询学生学期中考体能技能情况**/
    async queryStudentSemesterSportsScoreKmMiddleExamination(){
      let that = this;
      try {
        let res = await api.queryStudentSemesterSportsScoreKmMiddleExamination(this.userInfo.studentId, this.schoolYear)
        that.errorInfo(res)
        let resultData = res.data.response;
        let firstPhysical = resultData.filter((val) => {return val.middleItemType === '1'&&val.yearSemester%2 != 1;});//第一学期基础体能列表
        let secondPhysical = resultData.filter((val) => {return val.middleItemType === '1'&&val.yearSemester%2 == 1;});//第二学期基础体能列表
        let firstSkills = resultData.filter((val) => {return val.middleItemType === '2'&&val.yearSemester%2 != 1;});//第一学期专项技能列表
        let secondSkills = resultData.filter((val) => {return val.middleItemType === '2'&&val.yearSemester%2 == 1;});//第二学期专项技能列表
        that.firstPhysical = firstPhysical;
        that.secondPhysical = secondPhysical;
        that.firstSkills = that.catgoryArrFun(firstSkills);
        that.secondSkills = that.catgoryArrFun(secondSkills)//只有第二学期才有专项技能
      } catch (error) {
        console.log(error)
      }
    },
    /**合并项目id相同的数据在同一个数组中**/
    catgoryArrFun(arrData){
      var obj={},newArr=[];
      arrData.forEach(function(item,suffix){
        //根据对象的属性是唯一的，将值作为对象的属性名
        if(!obj[item.middleItemId]){
          var arr=[];
          arr.push(item);
          newArr.push({middleItemName:item.middleItemName,middleItemId:item.middleItemId,data:arr});
          obj[item.middleItemId]=item;
        }else{
          newArr.forEach(function(value,index){
            //如果已经存在  就循环新组的值将值插入属性相同的数组里   为了防止重复添加   只要和第一个比较就可以了
            if(value.data[0].middleItemId==item.middleItemId){
                value.data.push(item)
            }
          })
        }
      })
      return newArr;
    },
    /**计算合并数组后的单项输出**/
    catgoryHeal(row){
      let text = ''
      if(row.achievementValue){
        if(row.beforeVal){//体质健康监测才会有的字段
          text = `${row.achievementValue}(${row.grade-1 ===7?'七年级':row.grade-1 ===8?'八年级':'九年级'}${row.beforeVal})`
        }else{
          if (row.unit === "分.秒") {
            text = util.s_to_hs(row.achievementValue)
          } else if (row.unit === "99") {
            text = `${row.achievementValue}分`
          } else if (row.unit === "个数") {
            text = `${row.achievementValue}个`
          } else {
            text = row.achievementValue+row.unit
          }
        }
      }else{
        text = row.exemptionStatus === '1' ? '免考' : '';
      }
      return text;
    },
    /**错误统一提示**/
    errorInfo(res){
      if(res.data&&res.data.code != 10000){
        this.$Message.info(res.data.msg)
        return;
      }
    }
  },
  watch: {},
  created() {},
  mounted() {
    let params = this.$route.params
    this.userInfo = params
    this.queryStudentSemesterSportsScoreKmMiddleExamination()
    this.queryStudentSemesterSportsScoreKmBodyMonitor()
    this.queryStudentSemesterCompetionDetail()
    this.queryStudentScoreByStudentIdKM()
  }
};
</script>
